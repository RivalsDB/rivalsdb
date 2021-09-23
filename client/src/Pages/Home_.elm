module Pages.Home_ exposing (Model, Msg, page)

import Effect exposing (Effect)
import Gen.Params.Home_ exposing (Params)
import Html exposing (..)
import Page
import Request
import Shared
import UI.Layout.Header
import UI.Layout.Template
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.advanced
        { init = init req
        , update = update
        , view = view shared.user
        , subscriptions = always Sub.none
        }


type alias Model =
    { header : UI.Layout.Header.Model }


init : Request.With Params -> ( Model, Effect Msg )
init req =
    ( { header = UI.Layout.Header.init req }, Effect.none )


type Msg
    = FromHeader UI.Layout.Header.Msg


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case msg of
        FromHeader subMsg ->
            UI.Layout.Header.update subMsg model.header
                |> Tuple.mapFirst (\newHeader -> { model | header = newHeader })


view : Maybe Shared.User -> Model -> View Msg
view user _ =
    UI.Layout.Template.view FromHeader user []
