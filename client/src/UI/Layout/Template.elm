module UI.Layout.Template exposing (view)

import Html exposing (Html, div)
import Html.Attributes exposing (class)
import Html.Lazy as Lazy
import Shared
import UI.Layout.Footer as Footer
import UI.Layout.Header as Header
import UI.Layout.Toast as Toast
import View exposing (View)


view : (Shared.Msg -> msg) -> Shared.Model -> List (Html msg) -> View msg
view sharedMsg shared content =
    [ div [ class "page" ]
        [ Lazy.lazy2 Header.view sharedMsg shared
        , Lazy.lazy viewContent content
        , Footer.view
        , Lazy.lazy Toast.view shared.toast
        ]
    ]


viewContent : List (Html msg) -> Html msg
viewContent =
    div [ class "page-content" ]
