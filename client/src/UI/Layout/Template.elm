module UI.Layout.Template exposing (view)

import Html exposing (Html, div)
import Html.Attributes exposing (class)
import Shared
import UI.Layout.Footer
import UI.Layout.Header
import UI.Layout.Modal
import View exposing (View)


view : (UI.Layout.Header.Msg -> msg) -> (UI.Layout.Modal.Msg -> msg) -> Shared.Model -> List (Html msg) -> View msg
view headerMsg modalMsg shared content =
    htmlList
        [ ( UI.Layout.Header.view headerMsg shared.user, True )
        , ( UI.Layout.Modal.view modalMsg, shared.modal == Shared.Open )
        , ( div [ class "page-content" ] content, True )
        , ( UI.Layout.Footer.view, True )
        ]


htmlList : List ( Html msg, Bool ) -> List (Html msg)
htmlList =
    List.filterMap listItemIfEnabled


listItemIfEnabled : ( Html msg, Bool ) -> Maybe (Html msg)
listItemIfEnabled ( element, isEnabled ) =
    if isEnabled then
        Just element

    else
        Nothing
