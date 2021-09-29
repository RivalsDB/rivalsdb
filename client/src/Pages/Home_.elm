module Pages.Home_ exposing (Model, Msg, page)

import Effect exposing (Effect)
import Gen.Params.Home_ exposing (Params)
import Html exposing (..)
import Page
import Request
import Shared
import UI.Layout.Header
import UI.Layout.Modal
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
    { header : UI.Layout.Header.Model, modal : UI.Layout.Modal.Model }


init : Request.With Params -> ( Model, Effect Msg )
init req =
    ( { header = UI.Layout.Header.init req, modal = UI.Layout.Modal.init }, Effect.none )


type Msg
    = FromHeader UI.Layout.Header.Msg
    | FromModal UI.Layout.Modal.Msg


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case msg of
        FromHeader subMsg ->
            UI.Layout.Header.update subMsg model.header
                |> Tuple.mapFirst (\newHeader -> { model | header = newHeader })

        FromModal subMsg ->
            UI.Layout.Modal.update subMsg model.modal
                |> Tuple.mapFirst (\newModal -> { model | modal = newModal })


view : Shared.Model -> Model -> View Msg
view shared _ =
    UI.Layout.Template.view FromHeader FromModal shared []
