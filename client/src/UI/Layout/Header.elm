module UI.Layout.Header exposing (Model, Msg(..), init, update, view)

import Browser.Navigation exposing (Key)
import Dict
import Gen.Params.Search exposing (Params)
import Gen.Route as Route
import Html exposing (Html, a, div, form, header, input, li, nav, text, ul)
import Html.Attributes exposing (class, href, placeholder, spellcheck, type_)
import Html.Events exposing (onInput, onSubmit)
import Request
import UI.Logo


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


update : Msg -> Model -> ( Model, Cmd msg )
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
            ( { model | queryString = search }, Cmd.none )

        Submitted ->
            let
                url =
                    case model.queryString of
                        Nothing ->
                            Route.toHref Route.Search

                        Just search ->
                            Route.toHref Route.Search ++ "?search=" ++ search
            in
            ( model, Browser.Navigation.pushUrl model.key url )


view : (Msg -> msg) -> Html msg
view msg =
    header [ class "page-header" ]
        [ div [ class "header-logo" ]
            [ a [ href <| Route.toHref Route.Home_ ]
                [ UI.Logo.logo
                ]
            ]
        , nav [ class "header-nav" ]
            [ ul []
                [ li []
                    [ a [ href <| Route.toHref Route.Search ]
                        [ text "Cards"
                        ]
                    ]
                ]
            ]
        , div [ class "header-search" ]
            [ form [ onSubmit (msg Submitted) ]
                [ input
                    [ onInput (\s -> msg <| SearchQueryChanged s)
                    , placeholder "search"
                    , type_ "search"
                    , spellcheck False
                    ]
                    []
                ]
            ]
        ]
