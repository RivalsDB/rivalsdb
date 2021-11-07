module Pages.Signin exposing (Model, Msg, page)

import Effect exposing (Effect)
import Gen.Params.Signin exposing (Params)
import Html exposing (button, div, form, h1, h2, input, label, text)
import Html.Attributes exposing (disabled, type_)
import Html.Events exposing (onInput, onSubmit)
import Page
import Request
import Shared
import UI.Layout.Template
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared _ =
    Page.advanced
        { init = init
        , update = update
        , view = view shared
        , subscriptions = always Sub.none
        }


type alias Model =
    { email : String, canSubmit : Bool }


init : ( Model, Effect Msg )
init =
    ( { email = "", canSubmit = False }, Effect.none )


type Msg
    = FromShared Shared.Msg
    | Send
    | ChangedEmail String


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case msg of
        FromShared subMsg ->
            ( model, Effect.fromShared subMsg )

        ChangedEmail rawInput ->
            case String.trim rawInput of
                "" ->
                    ( { model | email = "", canSubmit = False }, Effect.none )

                email ->
                    ( { model | email = email, canSubmit = True }, Effect.none )

        Send ->
            ( model, Effect.fromShared <| Shared.InitiateSignin model.email )


view : Shared.Model -> Model -> View Msg
view shared model =
    UI.Layout.Template.view FromShared
        shared
        [ h1 [] [ text "You must be signed in to access the page you requested" ]
        , h2 [] [ text "Sign in now" ]
        , form [ onSubmit Send ]
            [ div []
                [ label [ onInput ChangedEmail ]
                    [ text "Email: "
                    , input [ type_ "email" ] []
                    ]
                ]
            , div []
                [ button [ type_ "submit", disabled (not model.canSubmit) ] [ text "Sign in" ] ]
            ]
        ]
