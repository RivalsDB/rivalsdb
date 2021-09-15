module Shared exposing
    ( Collection
    , Flags
    , Model
    , Msg
    , init
    , subscriptions
    , update
    )

import Cards exposing (cardsDecoder)
import Dict
import Json.Decode as Json
import Request exposing (Request)


type alias Flags =
    Json.Value


type alias Collection =
    Dict.Dict Cards.Id Cards.Card


type alias Model =
    { collection : Collection }


type Msg
    = NoOp


init : Request -> Flags -> ( Model, Cmd Msg )
init _ flags =
    let
        model =
            case Json.decodeValue cardsDecoder flags of
                Ok cards ->
                    { collection = cards }

                Err _ ->
                    { collection = Dict.empty }
    in
    ( model, Cmd.none )


update : Request -> Msg -> Model -> ( Model, Cmd Msg )
update _ msg model =
    case msg of
        NoOp ->
            ( model, Cmd.none )


subscriptions : Request -> Model -> Sub Msg
subscriptions _ _ =
    Sub.none
