module Pages.Profile exposing (Model, Msg, page)

import API.ErrorHandler
import API.User
import Auth
import Effect exposing (Effect)
import Gen.Params.Profile exposing (Params)
import Html exposing (Html, button, form, h1, input, label, text)
import Html.Attributes exposing (class, disabled, placeholder, type_, value)
import Html.Events exposing (onInput, onSubmit)
import Page
import Request
import Shared
import UI.Layout.Template
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared _ =
    Page.protected.advanced
        (\user ->
            { init = init user
            , update = update user
            , view = view shared
            , subscriptions = always Sub.none
            }
        )



-- INIT


type Model
    = Loading
    | Loaded { displayName : Maybe String }
    | Editing { previousDisplayName : Maybe String, newDisplayName : String }


init : Auth.User -> ( Model, Effect Msg )
init user =
    ( Loading, Effect.fromCmd <| API.User.read FetchedUser user.id )



-- UPDATE


type Msg
    = FromShared Shared.Msg
    | DisplayNameInput String
    | DisplayNameSave
    | FetchedUser API.User.ResultRead
    | SavedDisplayName API.User.ResultSaveDisplayName


update : Auth.User -> Msg -> Model -> ( Model, Effect Msg )
update user msg model =
    case ( model, msg ) of
        ( _, FromShared subMsg ) ->
            ( model, Effect.fromShared subMsg )

        ( _, FetchedUser (Ok { displayName }) ) ->
            ( Loaded { displayName = displayName }, Effect.none )

        ( _, FetchedUser (Err e) ) ->
            ( Loading, API.ErrorHandler.standardAlert e )

        ( Loading, _ ) ->
            ( model, Effect.none )

        ( Loaded data, DisplayNameInput text ) ->
            ( Editing { previousDisplayName = data.displayName, newDisplayName = String.trim text }, Effect.none )

        ( Editing data, DisplayNameInput text ) ->
            ( Editing { data | newDisplayName = String.trim text }, Effect.none )

        ( Editing { newDisplayName }, DisplayNameSave ) ->
            ( model, Effect.fromCmd <| API.User.saveDisplayName SavedDisplayName user.token user.id newDisplayName )

        ( _, DisplayNameSave ) ->
            ( model, Effect.none )

        ( _, SavedDisplayName (Ok _) ) ->
            ( model, Effect.fromShared (Shared.ToastSuccess "Saved!" (Just "Nickname saved")) )

        ( _, SavedDisplayName (Err e) ) ->
            ( model, API.ErrorHandler.standardAlert e )



-- VIEW


view : Shared.Model -> Model -> View Msg
view shared model =
    UI.Layout.Template.view FromShared
        shared
        (case model of
            Loading ->
                [ text "Loading..." ]

            Loaded data ->
                [ viewHeader
                , viewForm
                    [ onInput DisplayNameInput
                    , placeholder "My Cool Nickname"
                    , value <| Maybe.withDefault "" data.displayName
                    ]
                    False
                ]

            Editing data ->
                [ viewHeader
                , viewForm
                    [ onInput DisplayNameInput
                    , placeholder "My Cool Nickname"
                    , value data.newDisplayName
                    ]
                    True
                ]
        )


viewHeader : Html msg
viewHeader =
    h1 [ class "profile__header" ] [ text "My Profile" ]


viewForm : List (Html.Attribute Msg) -> Bool -> Html Msg
viewForm inputAttrs canSave =
    form [ onSubmit DisplayNameSave ]
        [ label [ class "profile__item" ]
            [ text "Display Name:"
            , input inputAttrs []
            ]
        , button
            [ class "profile__save"
            , type_ "submit"
            , disabled (not canSave)
            ]
            [ text "save" ]
        ]
