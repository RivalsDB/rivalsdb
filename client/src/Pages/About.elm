module Pages.About exposing (Model, Msg, page)

import Effect exposing (Effect)
import Gen.Params.About exposing (Params)
import Html exposing (Html, div, li, span, text, ul)
import Html.Attributes exposing (class)
import Page
import Request
import Shared
import UI.Icon as Icon
import UI.Layout.Template
import UI.Text
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.advanced
        { init = init req
        , update = update
        , view = view shared
        , subscriptions = always Sub.none
        }


type Msg
    = FromShared Shared.Msg


type alias Model =
    { attributions : List Attribution }


type alias Attribution =
    ( Icon.IconImage, String )


init : Request.With Params -> ( Model, Effect Msg )
init _ =
    ( { attributions =
            [ ( Icon.Library, "Library by Adrien Coquet from thenounproject.com" )
            , ( Icon.UnhostedAction, "Tai Chi by Adrien Coquet from thenounproject.com" )
            , ( Icon.Action, "Action by Adrien Coquet from thenounproject.com" )
            , ( Icon.Special, "Cold by Adrien Coquet from thenounproject.com" )
            , ( Icon.Menu, "Menu by Star and Anchor Design from thenounproject.com" )
            , ( Icon.City, "City by Bakunetsu Kaito from thenounproject.com" )
            , ( Icon.Ongoing, "Infinity by Cengiz SARI from thenounproject.com" )
            , ( Icon.Scheme, "Vote by Clea Doltz from thenounproject.com" )
            , ( Icon.InfluenceModifier, "Handshake by Cuputo from thenounproject.com" )
            , ( Icon.Title, "Medal by Deemak Daksina from thenounproject.com" )
            , ( Icon.Edit, "Edit by Gelso Designs from thenounproject.com" )
            , ( Icon.Ritual, "Ritual by Koson Rattanaphan from thenounproject.com" )
            , ( Icon.Delete, "Delete by Lagot Design from thenounproject.com" )
            , ( Icon.Faction, "Group by mikicon from thenounproject.com" )
            , ( Icon.AgendaCard, "Crown by Marcy Boles from thenounproject.com" )
            , ( Icon.Alchemy, "Alchemy by Ragal Kartidev from thenounproject.com" )
            , ( Icon.Leader, "Star by Sergey Demushkin from thenounproject.com" )
            , ( Icon.Haven, "Moon by Tawny Whatmore from thenounproject.com" )
            , ( Icon.Attack, "Cross Swords by Vectors Point from thenounproject.com" )
            , ( Icon.Conspiracy, "Global processing by Vectors Point from thenounproject.com" )
            , ( Icon.Reaction, "Shield by Viktor Vorobyev from thenounproject.com" )
            , ( Icon.HandOfCards, "Hand Of Cards by Daniel Solis from thenounproject.com" )
            , ( Icon.Animal, "Animal by Rfourtytwo from thenounproject.com" )
            , ( Icon.Trap, "Wolf Trap by Lorc from game-icons.net" )
            , ( Icon.Ghoul, "Zombie by Hada Arkanda from game-icons.net" )
            , ( Icon.Monster, "Werewolf by Ian Savage from thenounproject.com" )
            , ( Icon.Relic, "Grail by Danil Polshen from thenounproject.com" )
            , ( Icon.Vehicle, "Car by Maxie from thenounproject.com" )
            , ( Icon.Ordnance, "Time Dynamite by Delapouite from game-icons.net" )
            , ( Icon.DroneJockey, "Delivery Drone by Delapouite from game-icons.net" )
            , ( Icon.Arsenal, "Colt M1911 by Skoll from game-icons.net" )
            , ( Icon.Fleet, "Car by Fasobrun Jamil from thenounproject.com" )
            , ( Icon.Gift, "Talent by iconbysonny from thenounproject.com" )
            , ( Icon.Rite, "Bonfire by Mol Media from thenounproject.com" )
            ]
      }
    , Effect.none
    )


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case msg of
        FromShared subMsg ->
            ( model, Effect.fromShared subMsg )


view : Shared.Model -> Model -> View Msg
view shared model =
    UI.Layout.Template.view FromShared
        shared
        [ div [ class "page-about__content" ]
            [ div [ class "page-about__attribution" ]
                [ UI.Text.header [ text "Icon Attributions" ]
                , ul [ class "attribution-list" ] (List.map viewAttribution model.attributions)
                ]
            ]
        ]


viewAttribution : Attribution -> Html msg
viewAttribution ( iconImg, attribution ) =
    li [ class "attribution-item" ]
        [ span [ class "attribution-icon" ] [ Icon.icon ( iconImg, Icon.Standard ) ]
        , span [] [ text attribution ]
        ]
