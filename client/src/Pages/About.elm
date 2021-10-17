module Pages.About exposing (page)

import Gen.Params.About exposing (Params)
import Html exposing (..)
import Html.Attributes exposing (class)
import Page exposing (Page)
import Request
import Shared
import UI.Icon as Icon
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page
page _ _ =
    Page.static
        { view = view
        }


view : View msg
view =
    [ ul [ class "iconlist" ] (List.map item items) ]


items : List ( Icon.IconImage, String )
items =
    [ ( Icon.Library, "Library by Adrien Coquet from the Noun Project" )
    , ( Icon.UnhostedAction, "Tai Chi by Adrien Coquet from the Noun Project" )
    , ( Icon.Action, "action by Adrien Coquet from the Noun Project" )
    , ( Icon.InfluenceModifier, "Handshake by Cuputo from the Noun Project" )
    , ( Icon.Faction, "group by mikicon from the Noun Project" )
    , ( Icon.AgendaCard, "Crown by Marcy Boles from the Noun Project" )
    , ( Icon.Leader, "Star by Sergey Demushkin from the Noun Project" )
    , ( Icon.Haven, "Moon by Tawny Whatmore from the Noun Project" )
    , ( Icon.Attack, "Cross swords by Vectors Point from the Noun Project" )
    , ( Icon.Reaction, "Shield by Viktor Vorobyev from the Noun Project" )

    -- NEW
    , ( Icon.Action, "Global processing by Vectors Point from the Noun Project" )
    ]


item : ( Icon.IconImage, String ) -> Html msg
item ( iconImg, attribution ) =
    li [ class "iconlist-item" ]
        [ span [ class "iconlist-icon" ] [ Icon.icon ( iconImg, Icon.Standard ) ]
        , span [] [ text attribution ]
        ]
