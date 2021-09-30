module UI.Layout.Modal exposing (Model, Msg(..), init, update, view)

import Effect exposing (Effect)
import Html exposing (Html, button, div, form, input, label, p, text)
import Html.Attributes exposing (class, type_)
import Html.Events exposing (onClick, onInput, onSubmit)
import Shared


type alias Model =
    { email : Maybe String }


init : Model
init =
    { email = Nothing }


type Msg
    = CloseModal
    | Submit
    | ChangedEmail String


update : Msg -> Model -> ( Model, Effect msg )
update msg model =
    case msg of
        ChangedEmail emailInput ->
            ( { model
                | email =
                    case String.trim emailInput of
                        "" ->
                            Nothing

                        str ->
                            Just str
              }
            , Effect.none
            )

        CloseModal ->
            ( model, Effect.fromShared Shared.CloseModal )

        Submit ->
            case model.email of
                Just email ->
                    ( model, Effect.fromShared <| Shared.InitiateSignIn email )

                Nothing ->
                    ( model, Effect.none )


view : (Msg -> msg) -> Html msg
view msg =
    div [ class "modal" ]
        [ div [ class "modal-bg", onClick (msg CloseModal) ] []
        , div [ class "modal-content" ]
            [ p [ class "modal-header" ]
                [ text "Sign In" ]
            , div [ class "modal-close", onClick (msg CloseModal) ]
                [ text "[x] Close" ]
            , form [ onSubmit (msg Submit) ]
                [ div [ class "modal-form" ]
                    [ label [ onInput (msg << ChangedEmail) ]
                        [ text "Email: "
                        , input [ type_ "email" ] []
                        ]
                    ]
                , div [ class "modal-submit" ]
                    [ button [ type_ "submit" ]
                        [ text "Sign in" ]
                    ]
                ]
            ]
        ]
