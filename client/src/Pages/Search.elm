module Pages.Search exposing (Model, Msg, page)

import Dict exposing (Dict)
import Gen.Params.Search exposing (Params)
import Html exposing (..)
import Page
import Request
import Shared
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page _ req =
    Page.sandbox
        { init = init req.query
        , update = update
        , view = view
        }


type alias Model =
    { query : Dict String String }


init : Dict String String -> Model
init query =
    { query = query }



-- UPDATE


type Msg
    = ReplaceMe


update : Msg -> Model -> Model
update msg model =
    case msg of
        ReplaceMe ->
            model



-- VIEW


view : Model -> View Msg
view model =
    model.query |> Dict.toList |> List.map (\( k, v ) -> p [] [ text k, text ": ", text v ]) |> div [] |> List.singleton
