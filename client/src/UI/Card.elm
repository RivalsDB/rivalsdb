module UI.Card exposing (eager, lazy)

import Cards exposing (Card)
import Html exposing (Attribute, Html, div, img)
import Html.Attributes exposing (attribute, class, src, title)


lazy : Card -> Html msg
lazy =
    common (attribute "loading" "lazy")


eager : Card -> Html msg
eager =
    common (attribute "loading" "eager")


common : Attribute msg -> Card -> Html msg
common loading card =
    div [ class "cardimage" ]
        [ img
            [ class "cardimage"
            , title <| Cards.name card
            , src <| Cards.image card
            , loading
            ]
            []
        ]
