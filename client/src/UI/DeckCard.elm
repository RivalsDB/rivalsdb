module UI.DeckCard exposing (viewPrivate, viewPublic)

import Cards
import Data.Deck as Deck exposing (Deck)
import Data.GameMode as GameMode
import Data.Visibility as Visibility
import Gen.Route as Route
import Html exposing (Html, a, div, p, span, text)
import Html.Attributes exposing (class, href)
import UI.Card
import UI.Icon.V2 as Icon
import UI.Username


type Style
    = All
    | Mine


viewPublic : Deck -> Html msg
viewPublic =
    view All


viewPrivate : Deck -> Html msg
viewPrivate =
    view Mine


view : Style -> Deck -> Html msg
view style deck =
    a [ class "deckcard", href <| Route.toHref (Route.Deck__View__Id_ { id = deck.meta.id }) ]
        [ div [ class "deckcard__illustration" ] [ illustrationImage deck.decklist ]
        , div [ class "deckcard__content" ]
            [ p [ class "deckcard__name" ] [ text <| Deck.displayName deck.meta.name ]
            , p [ class "deckcard__game-mode" ] [ text <| GameMode.shortName deck.meta.gameMode ]
            , p [ class "deckcard__subtitle" ]
                (if style == All then
                    [ text "by "
                    , UI.Username.view deck.meta.patronage (Deck.ownerDisplayName deck.meta)
                    ]

                 else
                    [ text <| Visibility.toString deck.meta.visibility ]
                )
            , p [ class "deckcard__clans" ]
                (Deck.clansInFaction deck.decklist.faction
                    |> List.map
                        (Tuple.first
                            >> Icon.clan Icon.Negative
                            >> List.singleton
                            >> span [ class "deckcard__clan" ]
                        )
                )
            , p [ class "deckcard__summary" ]
                ([ Deck.leader deck.decklist |> Maybe.map (.name >> summaryItem)
                 , deck.decklist.haven |> Maybe.map (.name >> summaryItem)
                 , deck.decklist.agenda |> Maybe.map (.name >> summaryItem)
                 ]
                    |> List.filterMap identity
                    |> List.intersperse (text " • ")
                )
            ]
        ]


summaryItem : String -> Html msg
summaryItem name =
    span [ class "deckcard__summary-item" ] [ text name ]


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
