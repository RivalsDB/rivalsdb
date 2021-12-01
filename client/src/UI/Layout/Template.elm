module UI.Layout.Template exposing (view)

import Html exposing (Html, div)
import Html.Attributes exposing (class)
import Shared
import UI.Layout.Footer
import UI.Layout.Header
import UI.Layout.Modal
import Util exposing (htmlList)
import View exposing (View)


view : (Shared.Msg -> msg) -> Shared.Model -> List (Html msg) -> View msg
view sharedMsg shared content =
    htmlList
        [ ( UI.Layout.Header.view sharedMsg shared.user, True )
        , ( UI.Layout.Modal.view sharedMsg, Shared.isModalOpen shared )
        , ( div [ class "page-content" ] content, True )
        , ( UI.Layout.Footer.view, True )
        ]
