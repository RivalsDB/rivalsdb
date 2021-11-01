module UI.CardName exposing (withOverlay)

import Cards exposing (Card)
import Html exposing (Html, span, text)
import Html.Attributes exposing (class)
import UI.Card


withOverlay : Card -> Html msg
withOverlay card =
    span [ class "card-name" ]
        [ span [ class "card-name__name" ] [ text (Cards.name card) ]
        , span [ class "card-name__image" ] [ UI.Card.lazy card ]
        ]
