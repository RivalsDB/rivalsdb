port module Shared exposing
    ( Collection
    , Flags
    , Model
    , Msg(..)
    , Token
    , User
    , init
    , isModalOpen
    , subscriptions
    , update
    )

import Browser.Navigation exposing (Key)
import Cards exposing (cardsDecoder)
import Dict
import Gen.Route as Route
import Json.Decode as Json
import Request exposing (Request)


type alias Flags =
    Json.Value


type alias Collection =
    Dict.Dict Cards.Id Cards.Card


type alias Model =
    { collection : Collection
    , user : Maybe User
    , modal : ModalState
    , headerSearch : Maybe String
    , key : Key
    }


type alias User =
    { token : Token, id : String }


type alias Token =
    String


type ModalState
    = Open (Maybe String)
    | Closed


isModalOpen : Model -> Bool
isModalOpen model =
    case model.modal of
        Open _ ->
            True

        _ ->
            False


port signInReceiver : (Json.Value -> msg) -> Sub msg


port initiateLogin : String -> Cmd msg


port signOut : () -> Cmd msg


type Msg
    = GotSignIn Json.Value
    | ModalClose
    | ModalChangedEmail String
    | ModalSubmit
    | HeaderClickedSignIn
    | HeaderClickedSignOut
    | HeaderSearchQueryChanged String
    | HeaderSearchQuerySubmitted


init : Request -> Flags -> ( Model, Cmd Msg )
init req flags =
    let
        collection =
            case Json.decodeValue cardsDecoder flags of
                Ok cards ->
                    cards

                Err _ ->
                    Dict.empty
    in
    ( { collection = collection
      , user = Nothing
      , modal = Closed
      , headerSearch = Nothing
      , key = req.key
      }
    , Cmd.none
    )


update : Request -> Msg -> Model -> ( Model, Cmd Msg )
update _ msg model =
    case msg of
        GotSignIn json ->
            case Json.decodeValue userDecoder json of
                Ok user ->
                    ( { model | user = Just user }, Cmd.none )

                Err _ ->
                    ( { model | user = Nothing }, Cmd.none )

        ModalClose ->
            ( { model | modal = Closed }, Cmd.none )

        ModalChangedEmail emailInput ->
            ( { model
                | modal =
                    Open
                        (case String.trim emailInput of
                            "" ->
                                Nothing

                            str ->
                                Just str
                        )
              }
            , Cmd.none
            )

        ModalSubmit ->
            case model.modal of
                Open (Just email) ->
                    ( { model | modal = Closed }, initiateLogin email )

                _ ->
                    ( model, Cmd.none )

        HeaderClickedSignIn ->
            ( { model | modal = Open Nothing }, Cmd.none )

        HeaderClickedSignOut ->
            ( { model | user = Nothing }, signOut () )

        HeaderSearchQueryChanged query ->
            ( { model
                | headerSearch =
                    case String.trim query of
                        "" ->
                            Nothing

                        trimmed ->
                            Just trimmed
              }
            , Cmd.none
            )

        HeaderSearchQuerySubmitted ->
            case model.headerSearch of
                Just search ->
                    ( model, Browser.Navigation.pushUrl model.key <| Route.toHref Route.Search ++ "?search=" ++ search )

                _ ->
                    ( model, Cmd.none )


subscriptions : Request -> Model -> Sub Msg
subscriptions _ _ =
    signInReceiver GotSignIn


userDecoder : Json.Decoder User
userDecoder =
    Json.map2 User (Json.field "token" Json.string) (Json.field "user" Json.string)
