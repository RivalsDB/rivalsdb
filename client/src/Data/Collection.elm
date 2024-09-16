module Data.Collection exposing (Collection, groupByStack, playerCards)

import Cards
import Dict


type alias Collection =
    Dict.Dict Cards.Id Cards.Card


type alias GroupedByStacks =
    { agendaStack : List Cards.Agenda
    , factionStack : List Cards.Faction
    , havenStack : List Cards.Haven
    , libraryStack : List Cards.Library
    , cityStack : List Cards.City
    , monsterStack : List Cards.Monster
    , formStack : List Cards.Form
    }


playerCards : Collection -> Collection
playerCards =
    Dict.filter (\_ card -> (Cards.stack card /= Cards.CityStack) && (Cards.stack card /= Cards.MonsterStack) && (Cards.stack card /= Cards.FormStack))


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

                    Cards.CityCard c ->
                        { grouped | cityStack = c :: grouped.cityStack }

                    Cards.MonsterCard c ->
                        { grouped | monsterStack = c :: grouped.monsterStack }

                    Cards.FormCard c ->
                        { grouped | monsterStack = c :: grouped.formStack }
            )
            { agendaStack = []
            , factionStack = []
            , havenStack = []
            , libraryStack = []
            , cityStack = []
            , monsterStack = []
            , formStack = []
            }
