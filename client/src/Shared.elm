port module Shared exposing
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
    { token : String, id : String }


port signInReceiver : (Json.Value -> msg) -> Sub msg


port initiateLogin : () -> Cmd msg


port signOut : () -> Cmd msg


type Msg
    = InitiateSignIn
    | GotSignIn Json.Value
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
update _ msg model =
    case msg of
        GotSignIn json ->
            case Json.decodeValue userDecoder json of
                Ok user ->
                    ( { model | user = Just user }, Cmd.none )

                Err _ ->
                    ( { model | user = Nothing }, Cmd.none )

        InitiateSignIn ->
            ( model, initiateLogin () )

        SignOut ->
            ( model, signOut () )


subscriptions : Request -> Model -> Sub Msg
subscriptions _ _ =
    signInReceiver GotSignIn


userDecoder : Json.Decoder User
userDecoder =
    Json.map2 User (Json.field "token" Json.string) (Json.at [ "user", "sub" ] Json.string)
