module UI.Layout.Template exposing (..)

import Html exposing (Html, div)
import Html.Attributes exposing (class)
import Shared
import UI.Layout.Footer
import UI.Layout.Header
import View exposing (View)


view : (UI.Layout.Header.Msg -> msg) -> Maybe Shared.User -> List (Html msg) -> View msg
view headerMsg user content =
    [ UI.Layout.Header.view headerMsg user
    , div [ class "page-content" ] content
    , UI.Layout.Footer.view
    ]
