port module Shared exposing
    ( Collection
    , Flags
    , ModalState(..)
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
    { collection : Collection, user : Maybe User, modal : ModalState }


type alias User =
    { token : String, id : String }


type ModalState
    = Open
    | Closed


port signInReceiver : (Json.Value -> msg) -> Sub msg


port initiateLogin : String -> Cmd msg


port signOut : () -> Cmd msg


type Msg
    = InitiateSignIn String
    | GotSignIn Json.Value
    | SignOut
    | OpenModal
    | CloseModal


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
    ( { collection = collection, user = Nothing, modal = Closed }, Cmd.none )


update : Request -> Msg -> Model -> ( Model, Cmd Msg )
update _ msg model =
    case msg of
        GotSignIn json ->
            case Json.decodeValue userDecoder json of
                Ok user ->
                    ( { model | user = Just user }, Cmd.none )

                Err _ ->
                    ( { model | user = Nothing }, Cmd.none )

        InitiateSignIn email ->
            ( { model | modal = Closed }, initiateLogin email )

        SignOut ->
            ( model, signOut () )

        OpenModal ->
            ( { model | modal = Open }, Cmd.none )

        CloseModal ->
            ( { model | modal = Closed }, Cmd.none )


subscriptions : Request -> Model -> Sub Msg
subscriptions _ _ =
    signInReceiver GotSignIn


userDecoder : Json.Decoder User
userDecoder =
    Json.map2 User (Json.field "token" Json.string) (Json.field "user" Json.string)
