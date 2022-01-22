module Pages.Deck.View.Id_ exposing (Model, Msg, page)

import API.Decklist
import Data.Collection exposing (Collection)
import Data.Deck as Deck exposing (Deck)
import Effect exposing (Effect)
import Gen.Params.Deck.View.Id_ exposing (Params)
import Gen.Route as Route
import Html exposing (Html, div, text)
import Page
import Port.Auth exposing (User)
import Request
import Shared
import UI.ActionBar
import UI.Decklist
import UI.Icon as Icon
import UI.Layout.Deck
import UI.Layout.Template
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.advanced
        { init = init shared.collection req.params.id
        , update = update shared
        , view = view shared
        , subscriptions = always Sub.none
        }



-- INIT


type Model
    = Loading
    | Viewing Deck


init : Collection -> String -> ( Model, Effect Msg )
init collection deckId =
    ( Loading
    , Effect.fromCmd <| API.Decklist.read collection FetchedDecklist deckId
    )


type Msg
    = FromShared Shared.Msg
    | FetchedDecklist API.Decklist.ResultRead
    | Delete
    | DeletedDecklist API.Decklist.ResultDelete


update : Shared.Model -> Msg -> Model -> ( Model, Effect Msg )
update shared msg model =
    case ( model, msg ) of
        ( _, FromShared subMsg ) ->
            ( model, Effect.fromShared subMsg )

        ( _, FetchedDecklist (Err _) ) ->
            ( model, Effect.none )

        ( Loading, FetchedDecklist (Ok deck) ) ->
            ( Viewing deck, Effect.none )

        ( Loading, Delete ) ->
            ( model, Effect.none )

        ( Loading, DeletedDecklist _ ) ->
            ( model, Effect.fromShared <| Shared.Redirect Route.MyDecks )

        ( Viewing _, FetchedDecklist (Ok deck) ) ->
            ( Viewing deck, Effect.none )

        ( Viewing deck, Delete ) ->
            case shared.user of
                Just user ->
                    ( model, API.Decklist.delete DeletedDecklist user.token deck.meta.id |> Effect.fromCmd )

                Nothing ->
                    ( model, Effect.none )

        ( Viewing _, DeletedDecklist _ ) ->
            ( model, Effect.fromShared <| Shared.Redirect Route.MyDecks )


view : Shared.Model -> Model -> View Msg
view shared model =
    case model of
        Loading ->
            UI.Layout.Template.view FromShared shared [ text "Loading" ]

        Viewing deck ->
            viewDecklist shared deck


viewDecklist : Shared.Model -> Deck -> View Msg
viewDecklist shared deck =
    UI.Layout.Template.view FromShared
        shared
        [ UI.Layout.Deck.readMode
            { actions = viewActions shared.user deck.meta
            , decklist = UI.Decklist.viewRead deck
            }
        ]


noView : Html Msg
noView =
    div [] []


viewActions : Maybe User -> Deck.MetaPostSave -> Html Msg
viewActions maybeUser meta =
    case maybeUser of
        Nothing ->
            noView

        Just user ->
            if user.id == meta.ownerId then
                UI.ActionBar.view
                    [ { icon = Icon.Edit
                      , name = "Edit"
                      , action = Nothing
                      , href = Just (Route.Deck__Edit__Id_ { id = meta.id })
                      }
                    , { icon = Icon.Delete
                      , name = "Delete"
                      , action = Just Delete
                      , href = Nothing
                      }
                    ]

            else
                noView
