module Data.Collection exposing (Collection, groupByStack)

import Cards
import Dict


type alias Collection =
    Dict.Dict Cards.Id Cards.Card


type alias GroupedByStacks =
    { agendaStack : List Cards.Agenda
    , factionStack : List Cards.Faction
    , havenStack : List Cards.Haven
    , libraryStack : List Cards.Library
    }


groupByStack : Collection -> GroupedByStacks
groupByStack =
    Dict.values
        >> List.foldl
            (\card grouped ->
                case card of
                    Cards.AgendaCard c ->
                        { grouped | agendaStack = c :: grouped.agendaStack }

                    Cards.FactionCard c ->
                        { grouped | factionStack = c :: grouped.factionStack }

                    Cards.HavenCard c ->
                        { grouped | havenStack = c :: grouped.havenStack }

                    Cards.LibraryCard c ->
                        { grouped | libraryStack = c :: grouped.libraryStack }
            )
            { agendaStack = []
            , factionStack = []
            , havenStack = []
            , libraryStack = []
            }
