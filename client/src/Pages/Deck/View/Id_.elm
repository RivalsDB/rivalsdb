module Pages.Deck.View.Id_ exposing (Model, Msg, page)

import API.Decklist
import API.ErrorHandler
import Data.Deck as Deck exposing (Deck)
import Effect exposing (Effect)
import Gen.Params.Deck.View.Id_ exposing (Params)
import Gen.Route as Route
import Html exposing (Html, button, div, h1, h2, nav, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Markdown
import Page
import Port.Auth exposing (User)
import Port.Event
import Request
import Shared
import UI.ActionBar
import UI.Decklist
import UI.HandTester as HandTest
import UI.Icon as Icon
import UI.Layout.TSplit
import UI.Layout.Template
import UI.TopTabs
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.advanced
        { init = init shared req.params.id
        , update = update shared
        , view = view shared
        , subscriptions = always Sub.none
        }



-- INIT


type Model
    = Loading
    | Viewing ViewingModel


type Tab
    = Description
    | Hand


type alias ViewingModel =
    { deck : Deck
    , handTest : HandTest.Model
    , sidebarTabs : UI.TopTabs.Model Tab
    }


init : Shared.Model -> String -> ( Model, Effect Msg )
init { collection, user } deckId =
    ( Loading
    , API.Decklist.read collection FetchedDecklist (Maybe.map .token user) deckId
        |> Effect.fromCmd
    )


type Msg
    = FromShared Shared.Msg
    | FetchedDecklist API.Decklist.ResultRead
    | Delete
    | DeletedDecklist API.Decklist.ResultDelete
    | DrawTestHand
    | FromHandTest HandTest.Msg
    | FromTopTabs (UI.TopTabs.Msg Tab)


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

        ( _, FetchedDecklist (Ok deck) ) ->
            ( Viewing
                { deck = deck
                , handTest = HandTest.init deck.decklist
                , sidebarTabs =
                    UI.TopTabs.init
                        ( ( Description, "Description" )
                        , [ ( Hand, "Draw Simulator" )
                          ]
                        )
                }
            , Effect.none
            )

        ( Loading, _ ) ->
            ( model, Effect.none )

        ( Viewing { deck }, Delete ) ->
            case shared.user of
                Just user ->
                    ( model, API.Decklist.delete DeletedDecklist user.token deck.meta.id |> Effect.fromCmd )

                Nothing ->
                    ( model, Effect.none )

        ( Viewing { handTest }, DrawTestHand ) ->
            ( model
            , Effect.batch
                [ HandTest.shuffle handTest |> Cmd.map FromHandTest |> Effect.fromCmd
                , if HandTest.isNotSet handTest then
                    Effect.none

                  else
                    Port.Event.track (Port.Event.HandSimulatorUsed "deck_view") |> Effect.fromCmd
                ]
            )

        ( Viewing vmodel, FromHandTest subMsg ) ->
            HandTest.update subMsg vmodel.handTest
                |> Tuple.mapBoth
                    (\newHand -> Viewing { vmodel | handTest = newHand })
                    (Cmd.map FromHandTest >> Effect.fromCmd)

        ( Viewing vmodel, FromTopTabs subMsg ) ->
            ( Viewing { vmodel | sidebarTabs = UI.TopTabs.update subMsg vmodel.sidebarTabs }, Effect.none )


view : Shared.Model -> Model -> View Msg
view shared model =
    case model of
        Loading ->
            UI.Layout.Template.view FromShared shared [ text "Loading" ]

        Viewing vmodel ->
            viewDecklist shared vmodel


viewDecklist : Shared.Model -> ViewingModel -> View Msg
viewDecklist shared vmodel =
    UI.Layout.Template.view FromShared
        shared
        [ UI.Layout.TSplit.view
            { bar = viewActions shared.user vmodel.deck.meta
            , main = UI.Decklist.viewRead vmodel.deck
            , secondary = viewSidebar vmodel
            }
        ]


viewActions : Maybe User -> Deck.Meta -> Html Msg
viewActions maybeUser meta =
    case maybeUser of
        Nothing ->
            UI.ActionBar.view []

        Just user ->
            if user.id == meta.ownerId then
                UI.ActionBar.view (loggedInActions meta)

            else
                UI.ActionBar.view []


loggedInActions : Deck.Meta -> List (UI.ActionBar.Model Msg)
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


viewSidebar : ViewingModel -> Html Msg
viewSidebar vmodel =
    div [ class "deckview__aside" ]
        [ nav []
            [ Html.map FromTopTabs <| UI.TopTabs.view vmodel.sidebarTabs
            ]
        , case UI.TopTabs.activeTab vmodel.sidebarTabs of
            Hand ->
                div [ class "deckview__drawsimulator" ]
                    [ button [ class "deckview__drawtrigger", onClick DrawTestHand ] [ text "Draw hand" ]
                    , Html.map FromHandTest <| HandTest.view vmodel.handTest
                    ]

            Description ->
                div [ class "deckview__description" ]
                    [ Maybe.map (Markdown.toHtml []) vmodel.deck.meta.description
                        |> Maybe.withDefault (div [] [])
                    ]
        ]
