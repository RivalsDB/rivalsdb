module UI.Layout.Template exposing (view)

import Html exposing (Html, div)
import Html.Attributes exposing (class)
import Html.Lazy as Lazy
import Shared
import UI.Layout.Footer
import UI.Layout.Header
import UI.Layout.Modal
import Util exposing (htmlList)
import View exposing (View)


view : (Shared.Msg -> msg) -> Shared.Model -> List (Html msg) -> View msg
view sharedMsg shared content =
    htmlList
        [ ( Lazy.lazy2 UI.Layout.Header.view sharedMsg shared, True )
        , ( UI.Layout.Modal.view sharedMsg, Shared.isModalOpen shared )
        , ( div [ class "page-content" ] content, True )
        , ( UI.Layout.Footer.view, True )
        ]
