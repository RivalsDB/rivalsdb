module Pages.Search exposing (Model, Msg, page)

import Browser.Navigation exposing (Key)
import Cards exposing (Card)
import Dict
import Fuzzy
import Gen.Params.Search exposing (Params)
import Gen.Route as Route
import Html exposing (..)
import Html.Attributes exposing (class, href, placeholder, spellcheck, type_)
import Html.Events exposing (onInput, onSubmit)
import Page
import Request
import Shared exposing (Collection)
import UI.Card
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
    , collection : Collection
    }


init : Collection -> Request.With Params -> ( Model, Cmd Msg )
init collection req =
    let
        queryString =
            Dict.get "search" req.query
    in
    ( { queryString = queryString
      , matches = matchesForQuery collection queryString
      , key = req.key
      , search = queryString
      , collection = collection
      }
    , Cmd.none
    )


matchesForQuery : Collection -> Maybe String -> List Card
matchesForQuery collection query =
    case query of
        Nothing ->
            Dict.values collection

        Just q ->
            Dict.keys collection |> fuzzySort q |> List.take 3 |> List.filterMap (\k -> Dict.get k collection)


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
            ( { model | matches = matchesForQuery model.collection model.search }, Browser.Navigation.pushUrl model.key url )



-- VIEW


view : Model -> View Msg
view model =
    [ header [ class "page-header" ]
        [ div [ class "header-logo" ] [ a [ href <| Route.toHref Route.Home_ ] [ UI.Logo.logo ] ]
        , nav [ class "header-nav" ]
            [ ul []
                [ li [] [ a [ href <| Route.toHref Route.Search ] [ text "Cards" ] ]
                ]
            ]
        , div [ class "header-search" ]
            [ form [ onSubmit Submitted ]
                [ input [ onInput SearchQueryChanged, placeholder "search", type_ "search", spellcheck False ] [] ]
            ]
        ]
    , div [ class "page-content" ]
        [ p []
            [ text "Query: "
            , text <| Maybe.withDefault "" model.queryString
            ]
        , h3 [] [ text "matches" ]
        , ul [ class "search-results" ]
            (model.matches
                |> List.map
                    (\card ->
                        li [ class "search-result" ]
                            [ UI.Card.lazy card
                            ]
                    )
            )
        ]
    , footer [ class "page-footer" ]
        [ small [ class "footer-legal" ]
            [ p [] [ text "This site is not owned, endorsed or supported by Renegade Game Studios" ]
            , p [] [ text "The information presented above about Vampire the Masquerade Rivals, both literal and graphical, is © Renegade Game Studio. All Rights reserved." ]
            , p [] [ text "© 2020 Renegade Game Studios, Paradox Interactive®, Vampire The Masquerade®, World of Darkness®, Copyright 2020 Paradox Interactive AB (publ)." ]
            ]
        ]
    ]
