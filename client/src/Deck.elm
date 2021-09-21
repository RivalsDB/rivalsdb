module Deck exposing (Deck, Faction, copiesInDeck, empty, isLeader, isLegal, leader, setCard, setLeader)

import Cards
import Dict exposing (Dict)


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
