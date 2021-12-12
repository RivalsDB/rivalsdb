module Pages.Decks exposing (Model, Msg, page)

import API.Decklist
import Deck exposing (DeckPostSave)
import Effect exposing (Effect)
import Gen.Params.Decks exposing (Params)
import Html exposing (div, h2, text)
import Page
import Request
import Shared
import UI.DecklistsIndex
import UI.Layout.Template
import UI.Text
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared _ =
    Page.advanced
        { init = init shared
        , update = update
        , view = view shared
        , subscriptions = always Sub.none
        }



-- INIT


type Model
    = Loading
    | Viewing (List DeckPostSave)


init : Shared.Model -> ( Model, Effect Msg )
init shared =
    ( Loading
    , API.Decklist.index shared.collection FetchedDecklists
        |> Effect.fromCmd
    )



-- UPDATE


type Msg
    = FromShared Shared.Msg
    | FetchedDecklists API.Decklist.ResultIndex


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case msg of
        FromShared subMsg ->
            ( model, Effect.fromShared subMsg )

        FetchedDecklists (Ok decks) ->
            ( Viewing decks, Effect.none )

        FetchedDecklists (Err a) ->
            ( model, Effect.none )



----------
-- VIEW
----------


view : Shared.Model -> Model -> View Msg
view shared model =
    case model of
        Loading ->
            UI.Layout.Template.view FromShared shared [ text "Loading" ]

        Viewing ddd ->
            viewDecklists shared ddd


viewDecklists : Shared.Model -> List DeckPostSave -> View Msg
viewDecklists shared model =
    UI.Layout.Template.view FromShared
        shared
        [ div []
            [ UI.Text.header [ text "Decklists" ]
            , UI.DecklistsIndex.view model
            ]
        ]
