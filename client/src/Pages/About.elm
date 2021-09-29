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
    [ ul [ class "iconlist" ]
        [ li [ class "iconlist-item" ]
            [ span [ class "iconlist-icon" ] [ UI.Icon.leader ]
            , span [] [ text "Star by Sergey Demushkin from the Noun Project" ]
            ]
        , li [ class "iconlist-item" ]
            [ span [ class "iconlist-icon" ] [ UI.Icon.leader ]
            , span [] [ text "User by Creative Stall from the Noun Project" ]
            ]
        ]
    ]
