module Pages.View.Id_ exposing (Model, Msg, page)

import API.Decklist
import Deck exposing (Deck)
import Effect exposing (Effect)
import Gen.Params.View.Id_ exposing (Params)
import Html exposing (Html, div, text, ul)
import Html.Attributes exposing (class)
import Page
import Request
import Shared
import UI.Decklist
import UI.Layout.Template
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.advanced
        { init = init shared req
        , update = update
        , view = view shared
        , subscriptions = always Sub.none
        }



-- INIT


type Model
    = Loading
    | Viewing Deck


init : Shared.Model -> Request.With Params -> ( Model, Effect Msg )
init shared req =
    ( Loading
    , Effect.fromCmd <| API.Decklist.read shared.collection FetchedDecklist req.params.id
    )


type Msg
    = FromShared Shared.Msg
    | FetchedDecklist API.Decklist.ResultRead


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case msg of
        FromShared subMsg ->
            ( model, Effect.fromShared subMsg )

        FetchedDecklist (Ok deck) ->
            ( Viewing deck, Effect.none )

        FetchedDecklist (Err _) ->
            ( model, Effect.none )


view : Shared.Model -> Model -> View Msg
view shared model =
    case model of
        Loading ->
            UI.Layout.Template.view FromShared shared [ text "Loading" ]

        Viewing deck ->
            viewDecklist shared deck


viewDecklist : Shared.Model -> Deck -> View Msg
viewDecklist shared model =
    UI.Layout.Template.view FromShared
        shared
        [ div [ class "deckbldr" ]
            [ viewActions
            , div [ class "deckbldr-decklist" ]
                [ UI.Decklist.view model
                ]
            , div [ class "deckbldr-choices" ] []
            ]
        ]


viewActions : Html Msg
viewActions =
    div [ class "deckbldr-actions" ]
        [ ul [ class "actions-list" ] [] ]
