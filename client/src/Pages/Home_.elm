module Pages.Home_ exposing (Model, Msg, page)

import Gen.Params.Home_ exposing (Params)
import Html exposing (..)
import Html.Attributes exposing (class)
import Page
import Pages.Search exposing (Model, Msg)
import Request
import Shared exposing (init, update)
import UI.Layout.Footer
import UI.Layout.Header
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.element
        { init = init req
        , update = update
        , view = view shared
        , subscriptions = always Sub.none
        }


type alias Model =
    { header : UI.Layout.Header.Model }


init : Request.With Params -> ( Model, Cmd Msg )
init req =
    ( { header = UI.Layout.Header.init req }, Cmd.none )


type Msg
    = FromHeader UI.Layout.Header.Msg


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        FromHeader headerMsg ->
            let
                ( newHeader, headerCmd ) =
                    UI.Layout.Header.update headerMsg model.header
            in
            ( { model | header = newHeader }, headerCmd )


view : Shared.Model -> Model -> View Msg
view _ _ =
    [ UI.Layout.Header.view FromHeader
    , div [ class "page-content" ] []
    , UI.Layout.Footer.view
    ]
