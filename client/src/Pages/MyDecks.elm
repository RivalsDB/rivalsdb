module Pages.MyDecks exposing (Model, Msg, page)

import API.Decklist
import Data.Collection exposing (Collection)
import Data.Deck exposing (Deck)
import Data.User exposing (User)
import Effect exposing (Effect)
import Gen.Params.MyDecks exposing (Params)
import Html exposing (div, li, text, ul)
import Html.Attributes exposing (class)
import Page
import Request
import Shared
import UI.DeckCard
import UI.Layout.Template
import UI.Text
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared _ =
    Page.protected.advanced
        (\user ->
            { init = init shared.collection user
            , update = update
            , view = view shared
            , subscriptions = always Sub.none
            }
        )



-- INIT


type Model
    = Loading
    | Viewing (List Deck)


init : Collection -> User -> ( Model, Effect Msg )
init collection user =
    ( Loading
    , API.Decklist.indexForUser collection FetchedDecklists user.token user.id
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

        FetchedDecklists (Err _) ->
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


viewDecklists : Shared.Model -> List Deck -> View Msg
viewDecklists shared model =
    UI.Layout.Template.view FromShared
        shared
        [ div [ class "page-my-decks__content" ]
            [ UI.Text.header [ text "My Decklists" ]
            , ul [ class "page-my-decks__decks" ]
                (model
                    |> List.map (\deck -> li [] [ UI.DeckCard.viewPublic deck ])
                )
            ]
        ]
