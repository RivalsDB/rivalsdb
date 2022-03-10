module Shared exposing
    ( Flags
    , Model
    , Msg(..)
    , Token
    , init
    , subscriptions
    , update
    )

import Browser.Navigation as Navigation exposing (Key)
import Cards exposing (cardsDecoder)
import Data.Collection exposing (Collection)
import Dict
import Gen.Route as Route exposing (Route)
import Json.Decode as Json
import Port.Auth exposing (User)
import Port.Event
import Request exposing (Request)
import UI.Layout.Toast as Toast


type alias Flags =
    Json.Value


type alias Model =
    { collection : Collection
    , user : Maybe User
    , burgerMenu : Bool
    , headerSearchInput : String
    , headerSearch : Maybe String
    , toast : Toast.Model
    , key : Key
    }


type alias Token =
    String


type Msg
    = GotSignIn (Maybe User)
    | InitiateSignin
    | HeaderClickedSignIn
    | HeaderClickedSignOut
    | HeaderSearchQueryChanged String
    | HeaderSearchQuerySubmitted
    | ToggleBurgerMenu
    | Redirect Route
    | GoTo Route
    | FromToast Toast.Msg
    | ToastSuccess String (Maybe String)
    | ToastError String (Maybe String)


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
      , burgerMenu = False
      , headerSearchInput = ""
      , headerSearch = Nothing
      , toast = Toast.init
      , key = req.key
      }
    , Cmd.none
    )


update : Request -> Msg -> Model -> ( Model, Cmd Msg )
update _ msg model =
    case msg of
        FromToast subMsg ->
            ( { model | toast = Toast.update subMsg model.toast }, Cmd.none )

        ToastSuccess title subtitle ->
            ( model, Cmd.map FromToast <| Toast.create Toast.Success title subtitle )

        ToastError title subtitle ->
            ( model, Cmd.map FromToast <| Toast.create Toast.Error title subtitle )

        GotSignIn maybeUser ->
            ( { model | user = maybeUser }, Cmd.none )

        ToggleBurgerMenu ->
            ( { model | burgerMenu = not model.burgerMenu }, Cmd.none )

        InitiateSignin ->
            ( model, Port.Auth.startSignin )

        HeaderClickedSignIn ->
            ( model, Port.Auth.startSignin )

        HeaderClickedSignOut ->
            ( { model | user = Nothing }
            , Cmd.batch
                [ Port.Auth.startSignout
                , Port.Event.track Port.Event.SignedOut
                ]
            )

        HeaderSearchQueryChanged query ->
            ( { model
                | headerSearchInput = query
                , headerSearch =
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
                Nothing ->
                    ( model, Cmd.none )

                Just search ->
                    ( { model | headerSearchInput = "" }
                    , Cmd.batch
                        [ Navigation.pushUrl model.key <| Route.toHref Route.Search ++ "?search=" ++ search
                        , Port.Event.track (Port.Event.HeaderSearchUsed search)
                        ]
                    )

        Redirect route ->
            ( model, Route.toHref route |> Navigation.replaceUrl model.key )

        GoTo route ->
            ( model, Route.toHref route |> Navigation.pushUrl model.key )


subscriptions : Request -> Model -> Sub Msg
subscriptions _ _ =
    Sub.batch
        [ Port.Auth.receivedSignin GotSignIn
        , Sub.map FromToast Toast.subscriptions
        ]
