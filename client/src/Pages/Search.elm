module Pages.Search exposing (Model, Msg, page)

import Browser.Navigation exposing (Key)
import Cards exposing (Card)
import Dict
import Fuzzy
import Gen.Params.Search exposing (Params)
import Gen.Route as Route
import Html exposing (..)
import Html.Attributes exposing (class, placeholder, spellcheck, src, type_)
import Html.Events exposing (onInput, onSubmit)
import Page
import Request
import Shared exposing (Collection)
import UI.Logo
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.element
        { init = init shared.collection req
        , update = update
        , view = view
        , subscriptions = always Sub.none
        }


type alias Model =
    { key : Key
    , search : Maybe String
    , queryString : Maybe String
    , matches : List Card
    }


init : Collection -> Request.With Params -> ( Model, Cmd Msg )
init collection req =
    let
        queryString =
            Dict.get "search" req.query

        matches =
            case queryString of
                Nothing ->
                    Dict.values collection

                Just q ->
                    Dict.keys collection |> fuzzySort q |> List.take 3 |> List.filterMap (\k -> Dict.get k collection)
    in
    ( { queryString = queryString, matches = matches, key = req.key, search = queryString }
    , Cmd.none
    )


fuzzySort : String -> List String -> List String
fuzzySort query items =
    let
        simpleMatch config separators needle hay =
            Fuzzy.match config separators needle hay |> .score
    in
    List.sortBy (simpleMatch [] [] query) items



-- UPDATE


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



-- VIEW


view : Model -> View Msg
view model =
    [ header [ class "page-header" ]
        [ div [ class "header-logo" ] [ UI.Logo.logo ]
        , div [ class "header-search" ]
            [ form [ onSubmit Submitted ]
                [ input [ onInput SearchQueryChanged, placeholder "search", type_ "search", spellcheck False ] [] ]
            ]
        ]
    , div [ class "page-content" ]
        [ div []
            [ p []
                [ text "Query: "
                , text <| Maybe.withDefault "" model.queryString
                ]
            , h3 [] [ text "matches" ]
            , div [] <| List.map (\c -> img [ src <| Cards.image c ] []) model.matches
            ]
        ]
    , footer [ class "page-footer" ]
        [ small [ class "footer-legal" ]
            [ p [] [ text "This site is not owned, endorsed or supported by Renegade Game Studios" ]
            , p [] [ text "The information presented above about Vampire the Masquerade Rivals, both literal and graphical, is © Renegade Game Studio. All Rights reserved." ]
            , p [] [ text "© 2020 Renegade Game Studios, Paradox Interactive®, Vampire The Masquerade®, World of Darkness®, Copyright 2020 Paradox Interactive AB (publ)." ]
            ]
        ]
    ]
