module Pages.Home_ exposing (Model, Msg, page)

import Browser.Navigation exposing (Key)
import Gen.Params.Home_ exposing (Params)
import Gen.Route as Route
import Html exposing (..)
import Html.Attributes exposing (class, placeholder, spellcheck, type_)
import Html.Events exposing (onInput, onSubmit)
import Page
import Pages.Search exposing (Model, Msg)
import Request
import Shared exposing (init, update)
import UI.Logo
import Url.Parser exposing (query)
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page _ req =
    Page.element
        { init = init req.key
        , update = update
        , view = view
        , subscriptions = subscriptions
        }


type alias Model =
    { key : Key, search : Maybe String }


init : Key -> ( Model, Cmd Msg )
init key =
    ( { key = key, search = Nothing }, Cmd.none )


type Msg
    = SearchQueryChanged String
    | Submitted


update : Msg -> Model -> ( Model, Cmd Msg )
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
            ( { model | search = search }, Cmd.none )

        Submitted ->
            let
                url =
                    case model.search of
                        Nothing ->
                            Route.toHref Route.Search

                        Just search ->
                            Route.toHref Route.Search ++ "?search=" ++ search
            in
            ( model, Browser.Navigation.pushUrl model.key url )


view : Model -> View Msg
view _ =
    [ header [ class "page-header" ]
        [ div [ class "header-logo" ] [ UI.Logo.logo ]
        , div [ class "header-search" ]
            [ form [ onSubmit Submitted ]
                [ input [ onInput SearchQueryChanged, placeholder "search", type_ "search", spellcheck False ] [] ]
            ]
        ]
    , div [ class "page-content" ] []
    , footer [ class "page-footer" ]
        [ small [ class "footer-legal" ]
            [ p [] [ text "This site is not owned, endorsed or supported by Renegade Game Studios" ]
            , p [] [ text "The information presented above about Vampire the Masquerade Rivals, both literal and graphical, is © Renegade Game Studio. All Rights reserved." ]
            , p [] [ text "© 2020 Renegade Game Studios, Paradox Interactive®, Vampire The Masquerade®, World of Darkness®, Copyright 2020 Paradox Interactive AB (publ)." ]
            ]
        ]
    ]


subscriptions : Model -> Sub Msg
subscriptions _ =
    Sub.none
