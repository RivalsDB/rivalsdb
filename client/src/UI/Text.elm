module UI.Text exposing (header, subheader)

import Html exposing (Html, h1, h2)
import Html.Attributes exposing (class)


header : List (Html msg) -> Html msg
header content =
    h1 [ class "text__header" ] content


subheader : List (Html msg) -> Html msg
subheader content =
    h2 [ class "text__subheader" ] content
