module Pages.Home_ exposing (Model, Msg, page)

import Effect exposing (Effect)
import Gen.Params.Home_ exposing (Params)
import Html exposing (..)
import Page
import Request
import Shared
import UI.Layout.Template
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.advanced
        { init = init req
        , update = update
        , view = view shared
        , subscriptions = always Sub.none
        }


type alias Model =
    {}


init : Request.With Params -> ( Model, Effect Msg )
init _ =
    ( {}, Effect.none )


type Msg
    = FromShared Shared.Msg


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case msg of
        FromShared subMsg ->
            ( model, Effect.fromShared subMsg )


view : Shared.Model -> Model -> View Msg
view shared _ =
    UI.Layout.Template.view FromShared shared []
