module Pages.Build exposing (Model, Msg, page)

import Gen.Params.Build exposing (Params)
import Html exposing (..)
import Page
import Request
import Shared
import UI.Layout.Header
import UI.Layout.Template
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.element
        { init = init req
        , update = update
        , view = view
        , subscriptions = always Sub.none
        }



-- INIT


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


view : Model -> View Msg
view _ =
    UI.Layout.Template.view FromHeader []
