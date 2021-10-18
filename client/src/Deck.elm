module Deck exposing
    ( Deck
    , Decklist
    , Faction
    , copiesInDeck
    , decoder
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
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode
import Shared exposing (Collection)


type alias Deck =
    { decklist : Decklist
    , meta : Meta
    }


type alias Decklist =
    { agenda : Agenda
    , haven : Haven
    , faction : Faction
    , library : Library
    }


type alias Meta =
    { id : String
    , name : String
    , owner : String
    }


type alias Agenda =
    Maybe Cards.Agenda


type alias Haven =
    Maybe Cards.Haven


type alias Faction =
    Dict Cards.Id ( Cards.Faction, Bool )


type alias Library =
    Dict Cards.Id ( Cards.Library, Int )


empty : Decklist
empty =
    { agenda = Nothing
    , haven = Nothing
    , faction = Dict.empty
    , library = Dict.empty
    }


isLegal : Decklist -> Bool
isLegal deck =
    case ( deck.agenda, deck.haven ) of
        ( Just _, Just _ ) ->
            (Dict.size deck.faction == 7)
                && (Dict.size deck.library >= 40)

        ( _, _ ) ->
            False


setCard : Decklist -> ( Cards.Card, Int ) -> Decklist
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


copiesInDeck : Decklist -> Cards.Card -> Int
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


isLeader : Decklist -> Cards.Faction -> Bool
isLeader deck character =
    Dict.get character.id deck.faction |> Maybe.map Tuple.second |> Maybe.withDefault False


leader : Decklist -> Maybe Cards.Faction
leader deck =
    Dict.values deck.faction |> List.filter Tuple.second |> List.head |> Maybe.map Tuple.first


setLeader : Decklist -> Cards.Faction -> Decklist
setLeader deck newLeader =
    { deck | faction = Dict.map (\_ ( char, _ ) -> ( char, char.id == newLeader.id )) deck.faction }


isValidFaction : Decklist -> Bool
isValidFaction deck =
    Dict.isEmpty deck.faction
        || ((leader deck |> Maybe.map (always True) |> Maybe.withDefault False)
                && (Dict.size deck.faction == 7)
           )


isValidLibrary : Decklist -> Bool
isValidLibrary deck =
    let
        deckSize =
            List.foldl (\( _, n ) sum -> sum + n) 0 <| Dict.values deck.library
    in
    (deckSize == 0) || (deckSize >= 40 && deckSize <= 60)


demoDeck : Collection -> Decklist
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


encode : String -> Decklist -> Maybe Encode.Value
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


decoder : Collection -> Decoder Deck
decoder collection =
    Decode.map2 Deck
        (decklistDecoder collection)
        metaDecoder


metaDecoder : Decoder Meta
metaDecoder =
    Decode.map3 Meta
        (Decode.field "id" Decode.string)
        (Decode.field "name" Decode.string)
        (Decode.field "creatorId" Decode.string)


decklistDecoder : Collection -> Decoder Decklist
decklistDecoder collection =
    Decode.map4 Decklist
        (agendaDecoder collection)
        (havenDecoder collection)
        (factionDecoder collection)
        (libraryDecoder collection)


agendaDecoder : Collection -> Decoder Agenda
agendaDecoder collection =
    decodeCardId "agenda" |> getInCollection collection |> mapToAgenda


havenDecoder : Collection -> Decoder Haven
havenDecoder collection =
    decodeCardId "haven" |> getInCollection collection |> mapToHaven


decodeCardId : String -> Decoder String
decodeCardId fieldName =
    Decode.field fieldName Decode.string


getInCollection : Collection -> Decoder String -> Decoder (Maybe Cards.Card)
getInCollection collection =
    Decode.map (cardFromCollection collection)


mapToAgenda : Decoder (Maybe Cards.Card) -> Decoder Agenda
mapToAgenda =
    Decode.andThen
        (\collectionCard ->
            case collectionCard of
                Just (Cards.AgendaCard agenda) ->
                    Decode.succeed (Just agenda)

                _ ->
                    Decode.fail "Bad Agenda"
        )


mapToHaven : Decoder (Maybe Cards.Card) -> Decoder Haven
mapToHaven =
    Decode.andThen
        (\collectionCard ->
            case collectionCard of
                Just (Cards.HavenCard haven) ->
                    Decode.succeed (Just haven)

                _ ->
                    Decode.fail "Bad Haven"
        )


factionDecoder : Collection -> Decoder Faction
factionDecoder collection =
    decodeDictAsList "factionDeck" Decode.bool |> mapInCollection collection |> mapToFaction


libraryDecoder : Collection -> Decoder Library
libraryDecoder collection =
    decodeDictAsList "libraryDeck" Decode.int |> mapInCollection collection |> mapToLibrary


decodeDictAsList : String -> Decoder a -> Decoder (List ( String, a ))
decodeDictAsList fieldName valueDecoder =
    Decode.field fieldName (Decode.keyValuePairs valueDecoder)


mapInCollection : Collection -> Decoder (List ( String, a )) -> Decoder (List ( Maybe Cards.Card, a ))
mapInCollection collection =
    Decode.map (List.map (Tuple.mapFirst (cardFromCollection collection)))


mapToLibrary : Decoder (List ( Maybe Cards.Card, Int )) -> Decoder Library
mapToLibrary =
    Decode.andThen
        (\maybeLibrary ->
            let
                unwrappedLibrary =
                    List.filterMap extractLibrary maybeLibrary
            in
            if List.length unwrappedLibrary == List.length maybeLibrary then
                Decode.succeed (Dict.fromList unwrappedLibrary)

            else
                Decode.fail "Bad Library"
        )


mapToFaction : Decoder (List ( Maybe Cards.Card, Bool )) -> Decoder Faction
mapToFaction =
    Decode.andThen
        (\maybeFaction ->
            let
                unwrappedFaction =
                    List.filterMap extractFaction maybeFaction
            in
            if List.length unwrappedFaction == List.length maybeFaction then
                Decode.succeed (Dict.fromList unwrappedFaction)

            else
                Decode.fail "Bad Faction"
        )


extractLibrary : ( Maybe Cards.Card, Int ) -> Maybe ( Cards.Id, ( Cards.Library, Int ) )
extractLibrary ( maybeCard, l ) =
    maybeCard
        |> Maybe.andThen
            (\collectionCard ->
                case collectionCard of
                    Cards.LibraryCard card ->
                        Just ( card.id, ( card, l ) )

                    _ ->
                        Nothing
            )


extractFaction : ( Maybe Cards.Card, Bool ) -> Maybe ( Cards.Id, ( Cards.Faction, Bool ) )
extractFaction ( maybeCard, l ) =
    maybeCard
        |> Maybe.andThen
            (\collectionCard ->
                case collectionCard of
                    Cards.FactionCard card ->
                        Just ( card.id, ( card, l ) )

                    _ ->
                        Nothing
            )


cardFromCollection : Collection -> Cards.Id -> Maybe Cards.Card
cardFromCollection collection id =
    Dict.get id collection
