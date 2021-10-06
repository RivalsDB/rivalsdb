module UI.Layout.Header exposing (Model, Msg(..), init, update, view)

import Browser.Navigation exposing (Key)
import Dict
import Effect exposing (Effect)
import Gen.Params.Search exposing (Params)
import Gen.Route as Route
import Html exposing (Html, a, button, div, form, header, input, li, nav, span, text, ul)
import Html.Attributes exposing (class, href, placeholder, spellcheck, type_)
import Html.Events exposing (onClick, onInput, onSubmit)
import Request
import Shared


type alias Model =
    { key : Key, queryString : Maybe String }


init : Request.With Params -> Model
init req =
    { key = req.key
    , queryString = Dict.get "search" req.query
    }


type Msg
    = SearchQueryChanged String
    | Submitted
    | SignIn
    | SignOut


update : Msg -> Model -> ( Model, Effect msg )
update msg model =
    case msg of
        SearchQueryChanged query ->
            let
                search =
                    case String.trim query of
                        "" ->
                            Nothing

                        trimmed ->
                            Just trimmed
            in
            ( { model | queryString = search }, Effect.none )

        Submitted ->
            let
                url =
                    case model.queryString of
                        Nothing ->
                            Route.toHref Route.Search

                        Just search ->
                            Route.toHref Route.Search ++ "?search=" ++ search
            in
            ( model, Browser.Navigation.pushUrl model.key url |> Effect.fromCmd )

        SignIn ->
            ( model, Effect.fromShared Shared.OpenModal )

        SignOut ->
            ( model, Effect.fromShared Shared.SignOut )


view : (Msg -> msg) -> Maybe Shared.User -> Html msg
view msg user =
    header [ class "page-header", class "header" ]
        [ div [ class "header-logo" ]
            [ a [ href <| Route.toHref Route.Home_ ] [ span [] [ text "Rivals DB" ] ] ]
        , nav [ class "header-nav" ]
            [ ul []
                [ li [] [ a [ href <| Route.toHref Route.Build ] [ text "New Deck" ] ]
                , li [] [ a [ href <| Route.toHref Route.Search ] [ text "Cards" ] ]
                ]
            ]
        , div [ class "header-search" ]
            [ form [ onSubmit (msg Submitted) ]
                [ input
                    [ onInput (SearchQueryChanged >> msg)
                    , placeholder "Card search"
                    , type_ "search"
                    , spellcheck False
                    ]
                    []
                ]
            ]
        , div [ class "header-login" ]
            [ case user of
                Just _ ->
                    button [ class "login_button", class "login_button--out", onClick (msg SignOut) ] [ text "Sign Out" ]

                Nothing ->
                    button [ class "login_button", class "login_button--in", onClick (msg SignIn) ] [ text "Sign In" ]
            ]
        ]
