module Shared exposing
    ( Collection
    , Flags
    , Model
    , Msg(..)
    , User
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
    { collection : Collection, user : Maybe User }


type alias User =
    { id : String, accessToken : String }


type Msg
    = SignIn Json.Value
    | SignOut


init : Request -> Flags -> ( Model, Cmd Msg )
init _ flags =
    let
        collection =
            case Json.decodeValue cardsDecoder flags of
                Ok cards ->
                    cards

                Err _ ->
                    Dict.empty
    in
    ( { collection = collection, user = Nothing }, Cmd.none )


update : Request -> Msg -> Model -> ( Model, Cmd Msg )
update req msg model =
    case msg of
        _ ->
            ( model, Cmd.none )


subscriptions : Request -> Model -> Sub Msg
subscriptions _ _ =
    Sub.none
