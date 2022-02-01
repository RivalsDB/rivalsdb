module UI.DecklistsIndex exposing (viewAll, viewMine)

import Cards
import Data.Deck as Deck exposing (Deck)
import Data.GameMode as GameMode
import Data.Visibility as Visibility
import Gen.Route as Route
import Html exposing (Html, a, div, li, p, span, text)
import Html.Attributes exposing (class, href)
import Html.Keyed exposing (ul)
import UI.Card
import UI.Icon.V2 as Icon


type Style
    = All
    | Mine


viewAll : List Deck -> Html msg
viewAll decklists =
    ul [ class "deckindex" ]
        (decklists |> List.map (viewDecklistEntry All))


viewMine : List Deck -> Html msg
viewMine decklists =
    ul [ class "deckindex" ]
        (decklists |> List.map (viewDecklistEntry Mine))


viewDecklistEntry : Style -> Deck -> ( String, Html msg )
viewDecklistEntry style deck =
    ( deck.meta.id
    , li [ class "deckindexitem" ]
        [ a [ class "deckindexcard", href <| Route.toHref (Route.Deck__View__Id_ { id = deck.meta.id }) ]
            [ div [ class "deckindexcard__illustration" ] [ illustrationImage deck.decklist ]
            , div [ class "deckindexcard__content" ]
                [ p [ class "deckindexcard__name" ] [ text <| Deck.displayName deck.meta.name ]
                , p [ class "deckindexcard__game-mode" ] [ text <| GameMode.shortName deck.meta.gameMode ]
                , p [ class "deckindexcard__subtitle" ]
                    (if style == All then
                        [ text "by ", text <| Deck.ownerDisplayName deck.meta ]

                     else
                        [ text <| Visibility.toString deck.meta.visibility ]
                    )
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
                    ([ Deck.leader deck.decklist |> Maybe.map (.name >> summaryItem)
                     , deck.decklist.haven |> Maybe.map (.name >> summaryItem)
                     , deck.decklist.agenda |> Maybe.map (.name >> summaryItem)
                     ]
                        |> List.filterMap identity
                        |> List.intersperse (text " • ")
                    )
                ]
            ]
        ]
    )


summaryItem : String -> Html msg
summaryItem name =
    span [ class "deckindexcard__summary-item" ] [ text name ]


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
