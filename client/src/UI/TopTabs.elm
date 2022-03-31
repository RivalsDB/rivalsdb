module UI.TopTabs exposing (Model, Msg, activeTab, init, update, view)

import Html exposing (Html, li, ol, text)
import Html.Attributes exposing (class, classList)
import Html.Events exposing (onClick)


type alias Model tab =
    { activeTab : tab
    , tabs : List ( tab, String )
    }


init : ( ( tab, String ), List ( tab, String ) ) -> Model tab
init ( defaultTab, otherTabs ) =
    { activeTab = Tuple.first defaultTab
    , tabs = defaultTab :: otherTabs
    }


type Msg tab
    = ActivateTab tab


update : Msg tab -> Model tab -> Model tab
update msg model =
    case msg of
        ActivateTab newActiveTab ->
            { model | activeTab = newActiveTab }


view : Model tab -> Html (Msg tab)
view model =
    ol [ class "toptabs" ]
        (List.map
            (\( tab, name ) ->
                li
                    [ onClick (ActivateTab tab)
                    , classList
                        [ ( "toptabs__tab", True )
                        , ( "toptabs__tab--active", model.activeTab == tab )
                        ]
                    ]
                    [ text name ]
            )
            model.tabs
        )


activeTab : Model tab -> tab
activeTab =
    .activeTab
