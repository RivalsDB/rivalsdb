module Pages.Deck.View.Id_ exposing (Model, Msg, page)

import API.Decklist
import API.ErrorHandler
import Data.Collection exposing (Collection)
import Data.Deck as Deck exposing (Deck)
import Effect exposing (Effect)
import Gen.Params.Deck.View.Id_ exposing (Params)
import Gen.Route as Route
import Html exposing (Html, text)
import Http
import Page
import Port.Auth exposing (User)
import Port.Event
import Request
import Shared
import UI.ActionBar
import UI.Decklist
import UI.HandTester exposing (HandTest)
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
    | Viewing Deck HandTest


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
    | DrawTestHand
    | NewHand HandTest


update : Shared.Model -> Msg -> Model -> ( Model, Effect Msg )
update shared msg model =
    case ( model, msg ) of
        ( _, FromShared subMsg ) ->
            ( model, Effect.fromShared subMsg )

        ( _, FetchedDecklist (Err e) ) ->
            ( model, API.ErrorHandler.standardAlert e )

        ( _, DeletedDecklist (Ok _) ) ->
            ( model
            , Effect.batch
                [ Effect.fromShared (Shared.Redirect Route.MyDecks)
                , Effect.fromShared (Shared.ToastSuccess "Deck deleted!" Nothing)
                ]
            )

        ( _, DeletedDecklist (Err e) ) ->
            ( model, API.ErrorHandler.standardAlert e )

        ( Loading, FetchedDecklist (Ok deck) ) ->
            ( Viewing deck [], Effect.none )

        ( Loading, _ ) ->
            ( model, Effect.none )

        ( Viewing _ _, FetchedDecklist (Ok deck) ) ->
            ( Viewing deck UI.HandTester.empty, Effect.none )

        ( Viewing deck _, Delete ) ->
            case shared.user of
                Just user ->
                    ( model, API.Decklist.delete DeletedDecklist user.token deck.meta.id |> Effect.fromCmd )

                Nothing ->
                    ( model, Effect.none )

        ( Viewing deck hand, DrawTestHand ) ->
            ( model
            , Effect.batch
                [ Effect.fromCmd <| UI.HandTester.generateHand NewHand deck.decklist
                , if UI.HandTester.isNotSet hand then
                    Effect.none

                  else
                    Effect.fromCmd <| Port.Event.track (Port.Event.HandSimulatorUsed "deck_view")
                ]
            )

        ( Viewing deck _, NewHand newHand ) ->
            ( Viewing deck newHand, Effect.none )


view : Shared.Model -> Model -> View Msg
view shared model =
    case model of
        Loading ->
            UI.Layout.Template.view FromShared shared [ text "Loading" ]

        Viewing deck hand ->
            viewDecklist shared deck hand


viewDecklist : Shared.Model -> Deck -> HandTest -> View Msg
viewDecklist shared deck hand =
    UI.Layout.Template.view FromShared
        shared
        [ UI.Layout.Deck.readMode
            { actions = viewActions shared.user deck.meta
            , decklist = UI.Decklist.viewRead deck
            , aside = UI.HandTester.view hand
            }
        ]


viewActions : Maybe User -> Deck.MetaPostSave -> Html Msg
viewActions maybeUser meta =
    case maybeUser of
        Nothing ->
            UI.ActionBar.view loggedOutActions

        Just user ->
            if user.id == meta.ownerId then
                UI.ActionBar.view (loggedOutActions ++ loggedInActions meta)

            else
                UI.ActionBar.view loggedOutActions


loggedInActions : Deck.MetaPostSave -> List (UI.ActionBar.Model Msg)
loggedInActions meta =
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


loggedOutActions : List (UI.ActionBar.Model Msg)
loggedOutActions =
    [ { icon = Icon.HandOfCards
      , name = "Hand Test"
      , action = Just DrawTestHand
      , href = Nothing
      }
    ]
