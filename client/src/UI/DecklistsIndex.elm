module UI.DecklistsIndex exposing (view)

import Cards
import Deck exposing (DeckPostSave)
import Gen.Route as Route
import Html exposing (Html, a, div, li, p, span, text, ul)
import Html.Attributes exposing (class, href)
import UI.Card
import UI.Icon as Icon


view : List DeckPostSave -> Html unknown
view decklists =
    ul [ class "deckindex" ]
        (decklists |> List.map viewDecklistEntry)


viewDecklistEntry : DeckPostSave -> Html msg
viewDecklistEntry deck =
    li [ class "deckindexitem" ]
        [ a [ class "deckindexcard", href <| Route.toHref (Route.Deck__View__Id_ { id = deck.meta.id }) ]
            [ div [ class "deckindexcard__illustration" ] [ illustrationImage deck.decklist ]
            , div [ class "deckindexcard__content" ]
                [ p [ class "deckindexcard__name" ] [ text <| Deck.displayName deck.meta.name ]
                , p [ class "deckindexcard__byline" ] [ text "by ", text <| Deck.ownerDisplayName deck.meta ]
                , p [ class "deckindexcard__clans" ]
                    (Deck.clansInFaction deck.decklist.faction
                        |> List.map
                            (Tuple.first
                                >> Icon.clan Icon.Negative
                                >> List.singleton
                                >> span [ class "deckindexcard__clan" ]
                            )
                    )
                , p [ class "deckindexcard__summary" ]
                    ([ Deck.leader deck.decklist |> Maybe.map summaryItem
                     , deck.decklist.haven |> Maybe.map summaryItem
                     , deck.decklist.agenda |> Maybe.map summaryItem
                     ]
                        |> List.filterMap identity
                        |> List.intersperse (text " • ")
                    )
                ]
            ]
        ]


summaryItem : { a | name : String } -> Html msg
summaryItem a =
    span [ class "deckindexcard__summary-item" ] [ text a.name ]


illustrationImage : Deck.Decklist -> Html msg
illustrationImage decklist =
    case Deck.leader decklist of
        Just leader ->
            characterBackground leader

        Nothing ->
            case Deck.fallbackLeader decklist of
                Just fallbackLeader ->
                    characterBackground fallbackLeader

                Nothing ->
                    span [] []


characterBackground : Cards.Faction -> Html msg
characterBackground character =
    div [ class "char-bg" ]
        [ div [ class "char-bg__img" ] [ UI.Card.lazy (Cards.FactionCard character) ]
        , div [ class "char-bg__mask" ] []
        ]
