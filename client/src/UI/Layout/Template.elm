module UI.Layout.Template exposing (..)

import Html exposing (Html, div)
import Html.Attributes exposing (class)
import UI.Layout.Footer
import UI.Layout.Header
import View exposing (View)


view : (UI.Layout.Header.Msg -> msg) -> List (Html msg) -> View msg
view headerMsg content =
    [ UI.Layout.Header.view headerMsg
    , div [ class "page-content" ] content
    , UI.Layout.Footer.view
    ]
