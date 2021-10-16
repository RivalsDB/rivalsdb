module Pages.About exposing (page)

import Gen.Params.About exposing (Params)
import Html exposing (..)
import Html.Attributes exposing (class)
import Page exposing (Page)
import Request
import Shared
import UI.Icon
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page
page _ _ =
    Page.static
        { view = view
        }


view : View msg
view =
    [ ul [ class "iconlist" ] (List.map item items) ]


items : List ( Html msg, String )
items =
    [ ( UI.Icon.leader, "Star by Sergey Demushkin from the Noun Project" )
    , ( UI.Icon.faction, "group by mikicon from the Noun Project" )
    , ( UI.Icon.library, "Library by Adrien Coquet from the Noun Project" )
    , ( UI.Icon.agendaCard, "Crown by Marcy Boles from the Noun Project" )
    , ( UI.Icon.haven, "Moon by Tawny Whatmore from the Noun Project" )
    , ( UI.Icon.unhostedAction, "Tai Chi by Adrien Coquet from the Noun Project" )
    , ( UI.Icon.action, "action by Adrien Coquet from the Noun Project" )
    ]


item : ( Html msg, String ) -> Html msg
item ( icon, attribution ) =
    li [ class "iconlist-item" ]
        [ span [ class "iconlist-icon" ] [ icon ]
        , span [] [ text attribution ]
        ]
