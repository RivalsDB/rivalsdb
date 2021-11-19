module UI.Text exposing (header)

import Html exposing (Html, h1)
import Html.Attributes exposing (class)


header : List (Html msg) -> Html msg
header content =
    h1 [ class "text__header" ] content
