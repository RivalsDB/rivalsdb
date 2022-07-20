module UI.Markdown exposing (..)

import Html exposing (Html)
import Html.Attributes exposing (class)
import Markdown


view : String -> Html msg
view md =
    Markdown.toHtml [ class "md" ] md
