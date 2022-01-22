module Pages.Deck.New exposing (Model, Msg, page)

import API.Decklist
import Auth
import Cards
import Data.Deck as Deck exposing (Deck, Name(..))
import Data.GameMode exposing (GameMode)
import Effect exposing (Effect)
import Gen.Params.Deck.New exposing (Params)
import Gen.Route as Route
import Html
import Html.Lazy as Lazy
import Page
import Port.UniqueId exposing (UniqueId)
import Request
import Shared
import UI.ActionBar
import UI.DeckbuildSelections as DeckbuildSelections
import UI.Decklist
import UI.Icon as Icon
import UI.Layout.Deck
import UI.Layout.Template
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared _ =
    Page.protected.advanced
        (\user ->
            { init = init
            , update = update user
            , view = view shared
            , subscriptions = subscriptions
            }
        )



-- INIT


type Model
    = Loading
    | Deckbuilding DeckbuildingModel


type alias DeckbuildingModel =
    { deck : Deck
    , builderOptions : DeckbuildSelections.Model Msg
    , isSaving : Bool
    }


init : ( Model, Effect Msg )
init =
    ( Loading, Effect.fromCmd Port.UniqueId.requestId )


subscriptions : Model -> Sub Msg
subscriptions _ =
    Port.UniqueId.onReceiveId ReceivedId


type Msg
    = FromShared Shared.Msg
    | ReceivedId (Maybe UniqueId)
    | FromBuilderOptions DeckbuildSelections.Msg
    | ChoseLeader Cards.Faction
    | Save
    | SavedDecklist API.Decklist.ResultUpdate
    | StartRenameDeck
    | DeckNameChanged String
    | SetGameMode GameMode
    | SaveNewDeckName


update : Auth.User -> Msg -> Model -> ( Model, Effect Msg )
update user msg model =
    case ( model, msg ) of
        ( _, FromShared subMsg ) ->
            ( model, Effect.fromShared subMsg )

        ( Loading, ReceivedId maybeId ) ->
            case maybeId of
                Just uniqueId ->
                    ( Deckbuilding
                        { deck = Deck.create uniqueId user.id Nothing
                        , builderOptions = DeckbuildSelections.init
                        , isSaving = False
                        }
                    , Effect.none
                    )

                Nothing ->
                    ( model, Effect.none )

        ( Deckbuilding _, ReceivedId _ ) ->
            ( model, Effect.none )

        ( Loading, _ ) ->
            ( model, Effect.none )

        ( Deckbuilding model2, FromBuilderOptions (DeckbuildSelections.ChangedDecklist change) ) ->
            let
                oldDeck =
                    model2.deck
            in
            ( Deckbuilding { model2 | deck = { oldDeck | decklist = Deck.setCard oldDeck.decklist change } }, Effect.none )

        ( Deckbuilding model2, FromBuilderOptions subMsg ) ->
            let
                ( subModel, subEffect ) =
                    DeckbuildSelections.update subMsg model2.builderOptions
            in
            ( Deckbuilding { model2 | builderOptions = subModel }, subEffect )

        ( Deckbuilding model2, ChoseLeader leader ) ->
            let
                oldDeck =
                    model2.deck
            in
            ( Deckbuilding { model2 | deck = { oldDeck | decklist = Deck.setLeader oldDeck.decklist leader } }, Effect.none )

        ( Deckbuilding model2, Save ) ->
            if model2.isSaving then
                ( model, Effect.none )

            else
                case Deck.encode model2.deck of
                    Nothing ->
                        ( model, Effect.none )

                    Just encodedDeck ->
                        ( Deckbuilding { model2 | isSaving = True }, API.Decklist.update SavedDecklist user.token model2.deck.meta.id encodedDeck |> Effect.fromCmd )

        ( Deckbuilding model2, SavedDecklist (Ok _) ) ->
            ( Deckbuilding { model2 | isSaving = False }, Effect.fromShared <| Shared.GoTo (Route.Deck__View__Id_ { id = model2.deck.meta.id }) )

        ( Deckbuilding model2, SavedDecklist (Err _) ) ->
            ( Deckbuilding { model2 | isSaving = False }, Effect.none )

        ( Deckbuilding model2, StartRenameDeck ) ->
            let
                oldDeck =
                    model2.deck

                oldMeta =
                    oldDeck.meta
            in
            ( Deckbuilding { model2 | deck = { oldDeck | meta = { oldMeta | name = BeingNamed "" } } }, Effect.none )

        ( Deckbuilding model2, DeckNameChanged newName ) ->
            let
                oldDeck =
                    model2.deck

                oldMeta =
                    oldDeck.meta
            in
            case model2.deck.meta.name of
                BeingNamed _ ->
                    ( Deckbuilding { model2 | deck = { oldDeck | meta = { oldMeta | name = BeingNamed newName } } }, Effect.none )

                _ ->
                    ( model, Effect.none )

        ( Deckbuilding model2, SaveNewDeckName ) ->
            let
                oldDeck =
                    model2.deck

                oldMeta =
                    oldDeck.meta
            in
            case model2.deck.meta.name of
                BeingNamed newName ->
                    case String.trim newName of
                        "" ->
                            ( Deckbuilding { model2 | deck = { oldDeck | meta = { oldMeta | name = Unnamed } } }, Effect.none )

                        trimmedName ->
                            ( Deckbuilding { model2 | deck = { oldDeck | meta = { oldMeta | name = Named trimmedName } } }, Effect.none )

                _ ->
                    ( model, Effect.none )

        ( Deckbuilding model2, SetGameMode gameMode ) ->
            let
                oldDeck =
                    model2.deck

                oldMeta =
                    oldDeck.meta
            in
            ( Deckbuilding { model2 | deck = { oldDeck | meta = { oldMeta | gameMode = gameMode } } }, Effect.none )


decklistActions : UI.Decklist.Actions Msg
decklistActions =
    { setLeader = ChoseLeader
    , startNameChange = StartRenameDeck
    , changeName = DeckNameChanged
    , endNameChange = SaveNewDeckName
    , setGameMode = SetGameMode
    }


view : Shared.Model -> Model -> View Msg
view shared model =
    UI.Layout.Template.view FromShared
        shared
        [ case model of
            Loading ->
                Html.text "Loading..."

            Deckbuilding { deck, builderOptions } ->
                UI.Layout.Deck.writeMode
                    { actions = Lazy.lazy UI.ActionBar.view actions
                    , decklist = Lazy.lazy2 UI.Decklist.viewWrite decklistActions deck
                    , selectors = DeckbuildSelections.view shared.collection FromBuilderOptions builderOptions deck.decklist
                    }
        ]


actions : List (UI.ActionBar.Model Msg)
actions =
    [ { name = "Save"
      , icon = Icon.Save
      , action = Just Save
      , href = Nothing
      }
    ]
