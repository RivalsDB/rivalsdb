module Deck exposing
    ( Deck
    , Faction
    , copiesInDeck
    , demoDeck
    , empty
    , encode
    , isLeader
    , isLegal
    , isValidFaction
    , isValidLibrary
    , leader
    , setCard
    , setLeader
    )

import Cards
import Dict exposing (Dict)
import Json.Encode as Encode
import Shared exposing (Collection)


type alias Deck =
    { agenda : Agenda
    , haven : Haven
    , faction : Faction
    , library : Library
    }


type alias Agenda =
    Maybe Cards.Agenda


type alias Haven =
    Maybe Cards.Haven


type alias Faction =
    Dict Cards.Id ( Cards.Faction, Bool )


type alias Library =
    Dict Cards.Id ( Cards.Library, Int )


empty : Deck
empty =
    { agenda = Nothing
    , haven = Nothing
    , faction = Dict.empty
    , library = Dict.empty
    }


isLegal : Deck -> Bool
isLegal deck =
    case ( deck.agenda, deck.haven ) of
        ( Just _, Just _ ) ->
            (Dict.size deck.faction == 7)
                && (Dict.size deck.library >= 40)

        ( _, _ ) ->
            False


setCard : Deck -> ( Cards.Card, Int ) -> Deck
setCard deck entry =
    case entry of
        ( Cards.AgendaCard _, 0 ) ->
            { deck | agenda = Nothing }

        ( Cards.HavenCard _, 0 ) ->
            { deck | haven = Nothing }

        ( Cards.AgendaCard agenda, 1 ) ->
            { deck | agenda = Just agenda }

        ( Cards.HavenCard haven, 1 ) ->
            { deck | haven = Just haven }

        ( Cards.FactionCard { id }, 0 ) ->
            { deck | faction = Dict.remove id deck.faction }

        ( Cards.FactionCard faction, _ ) ->
            { deck | faction = Dict.insert faction.id ( faction, False ) deck.faction }

        ( Cards.LibraryCard { id }, 0 ) ->
            { deck | library = Dict.remove id deck.library }

        ( Cards.LibraryCard library, n ) ->
            { deck | library = Dict.insert library.id ( library, n ) deck.library }

        ( _, _ ) ->
            deck


copiesInDeck : Deck -> Cards.Card -> Int
copiesInDeck deck card =
    case card of
        Cards.AgendaCard { id } ->
            deck.agenda
                |> Maybe.map
                    (\agenda ->
                        if agenda.id == id then
                            1

                        else
                            0
                    )
                |> Maybe.withDefault 0

        Cards.HavenCard { id } ->
            deck.haven
                |> Maybe.map
                    (\haven ->
                        if haven.id == id then
                            1

                        else
                            0
                    )
                |> Maybe.withDefault 0

        Cards.FactionCard { id } ->
            if Dict.member id deck.faction then
                1

            else
                0

        Cards.LibraryCard { id } ->
            Dict.get id deck.library |> Maybe.map Tuple.second |> Maybe.withDefault 0


isLeader : Deck -> Cards.Faction -> Bool
isLeader deck character =
    Dict.get character.id deck.faction |> Maybe.map Tuple.second |> Maybe.withDefault False


leader : Deck -> Maybe Cards.Faction
leader deck =
    Dict.values deck.faction |> List.filter Tuple.second |> List.head |> Maybe.map Tuple.first


setLeader : Deck -> Cards.Faction -> Deck
setLeader deck newLeader =
    { deck | faction = Dict.map (\_ ( char, _ ) -> ( char, char.id == newLeader.id )) deck.faction }


isValidFaction : Deck -> Bool
isValidFaction deck =
    Dict.isEmpty deck.faction
        || ((leader deck |> Maybe.map (always True) |> Maybe.withDefault False)
                && (Dict.size deck.faction == 7)
           )


isValidLibrary : Deck -> Bool
isValidLibrary deck =
    let
        deckSize =
            List.foldl (\( _, n ) sum -> sum + n) 0 <| Dict.values deck.library
    in
    (deckSize == 0) || (deckSize >= 40 && deckSize <= 60)


demoDeck : Collection -> Deck
demoDeck collection =
    let
        agenda =
            Dict.get "core-base-of-power" collection
                |> Maybe.andThen
                    (\c ->
                        case c of
                            Cards.AgendaCard a ->
                                Just a

                            _ ->
                                Nothing
                    )

        haven =
            Dict.get "core-artist-lofts" collection
                |> Maybe.andThen
                    (\c ->
                        case c of
                            Cards.HavenCard a ->
                                Just a

                            _ ->
                                Nothing
                    )

        toCardCount n _ c =
            ( c, n )

        faction =
            collection
                |> Dict.toList
                |> List.filterMap
                    (\( k, c ) ->
                        case c of
                            Cards.FactionCard f ->
                                Just ( k, ( f, f.name == "Aurora Nix" ) )

                            _ ->
                                Nothing
                    )
                |> List.take 7
                |> Dict.fromList

        library =
            collection
                |> Dict.toList
                |> List.filterMap
                    (\( k, c ) ->
                        case c of
                            Cards.LibraryCard l ->
                                Just ( k, l )

                            _ ->
                                Nothing
                    )
                |> List.take 14
                |> Dict.fromList
                |> Dict.map (toCardCount 3)
    in
    { agenda = agenda
    , haven = haven
    , faction = faction
    , library = library
    }



----------
-- ENCODER
----------


encode : String -> Deck -> Maybe Encode.Value
encode name deck =
    case ( deck.agenda, deck.haven ) of
        ( Just agenda, Just haven ) ->
            Just <|
                Encode.object
                    [ ( "name", Encode.string name )
                    , ( "agenda", Encode.string agenda.id )
                    , ( "haven", Encode.string haven.id )
                    , ( "factionDeck"
                      , Encode.object
                            (Dict.values deck.faction
                                |> List.map (Tuple.mapBoth .id Encode.bool)
                            )
                      )
                    , ( "libraryDeck"
                      , Encode.object
                            (Dict.values deck.library
                                |> List.map (Tuple.mapBoth .id Encode.int)
                            )
                      )
                    ]

        ( _, _ ) ->
            Nothing
