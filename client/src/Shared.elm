port module Shared exposing
    ( Flags
    , Model
    , Msg(..)
    , Token
    , User
    , init
    , isModalOpen
    , subscriptions
    , update
    )

import Browser.Navigation as Navigation exposing (Key)
import Cards exposing (cardsDecoder)
import Data.Collection exposing (Collection)
import Dict
import Gen.Route as Route exposing (Route)
import Json.Decode as Json
import Json.Encode as Encode
import Request exposing (Request)


type alias Flags =
    Json.Value


type alias Model =
    { collection : Collection
    , user : Maybe User
    , modal : ModalState
    , burgerMenu : Bool
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


port trackEvent : Json.Value -> Cmd msg


port signOut : () -> Cmd msg


type Msg
    = GotSignIn Json.Value
    | ModalClose
    | ModalChangedEmail String
    | ModalSubmit
    | InitiateSignin String
    | TrackEvent String (Maybe Encode.Value)
    | HeaderClickedSignIn
    | HeaderClickedSignOut
    | HeaderSearchQueryChanged String
    | HeaderSearchQuerySubmitted
    | ToggleBurgerMenu
    | Redirect Route
    | GoTo Route


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
      , burgerMenu = False
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

        ToggleBurgerMenu ->
            ( { model | burgerMenu = not model.burgerMenu }, Cmd.none )

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

        InitiateSignin email ->
            ( model, initiateLogin email )

        TrackEvent name extra ->
            ( model, trackEvent (encodeEvent name extra) )

        HeaderClickedSignIn ->
            ( { model | modal = Open Nothing }, Cmd.none )

        HeaderClickedSignOut ->
            ( { model | user = Nothing }
            , Cmd.batch
                [ signOut ()
                , trackEvent (encodeEvent "Signed out" Nothing)
                ]
            )

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
                Nothing ->
                    ( model, Cmd.none )

                Just search ->
                    ( model
                    , Cmd.batch
                        [ Navigation.pushUrl model.key <| Route.toHref Route.Search ++ "?search=" ++ search
                        , trackEvent (encodeEvent "Used header search" Nothing)
                        ]
                    )

        Redirect route ->
            ( model, Route.toHref route |> Navigation.replaceUrl model.key )

        GoTo route ->
            ( model, Route.toHref route |> Navigation.pushUrl model.key )


subscriptions : Request -> Model -> Sub Msg
subscriptions _ _ =
    signInReceiver GotSignIn


userDecoder : Json.Decoder User
userDecoder =
    Json.map2 User (Json.field "token" Json.string) (Json.field "user" Json.string)



------------------
-- EVENT TRACKING
------------------


encodeEvent : String -> Maybe Encode.Value -> Encode.Value
encodeEvent name extra =
    Encode.object
        (( "name", Encode.string name )
            :: (Maybe.map (\ex -> [ ( "extra", ex ) ]) extra
                    |> Maybe.withDefault []
               )
        )
