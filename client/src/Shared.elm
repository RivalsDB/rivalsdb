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
import Cards exposing (Card, Id, cardsDecoder)
import Data.Collection exposing (Collection)
import Data.Deck exposing (Deck)
import Data.User as User exposing (User)
import Dict
import Gen.Route as Route exposing (Route)
import Json.Decode as Json exposing (Decoder)
import Port.Auth
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
    , cachedDecks : List Deck
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
    | CacheDecks (List Deck)


init : Request -> Flags -> ( Model, Cmd Msg )
init req flags =
    let
        { collection, user } =
            case Json.decodeValue flagsDecoder flags of
                Ok decoded ->
                    decoded

                Err _ ->
                    { collection = Dict.empty, user = Nothing }
    in
    ( { collection = collection
      , user = user
      , burgerMenu = False
      , headerSearchInput = ""
      , headerSearch = Nothing
      , toast = Toast.init
      , key = req.key
      , cachedDecks = []
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

        CacheDecks decks ->
            ( { model | cachedDecks = decks }, Cmd.none )


subscriptions : Request -> Model -> Sub Msg
subscriptions _ _ =
    Sub.batch
        [ Port.Auth.receivedSignin GotSignIn
        , Sub.map FromToast Toast.subscriptions
        ]


type alias DecodedFlags =
    { collection : Dict.Dict Id Card, user : Maybe User }


flagsDecoder : Decoder DecodedFlags
flagsDecoder =
    Json.map2 DecodedFlags
        (Json.field "cards" cardsDecoder)
        (Json.maybe <| Json.field "userData" User.decode)
