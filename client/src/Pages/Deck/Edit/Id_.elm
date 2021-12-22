module Pages.Deck.Edit.Id_ exposing (Model, Msg, page)

import API.Decklist
import Auth
import Browser.Navigation as Navigation exposing (Key)
import Cards
import Data.Collection exposing (Collection)
import Data.GameMode exposing (GameMode)
import Deck exposing (DeckPostSave, Name(..))
import Effect exposing (Effect)
import Gen.Params.Deck.Edit.Id_ exposing (Params)
import Gen.Route as Route
import Html.Lazy as Lazy
import Page
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
page shared req =
    Page.protected.advanced
        (\user ->
            { init = init shared.collection req.key req.params.id
            , update = update user
            , view = view shared
            , subscriptions = always Sub.none
            }
        )



-- INIT


type Model
    = Loading Key
    | Editing Key Data


type alias Data =
    { deck : DeckPostSave
    , builderOptions : DeckbuildSelections.Model Msg
    }


init : Collection -> Key -> String -> ( Model, Effect Msg )
init collection key deckId =
    ( Loading key
    , Effect.fromCmd <| API.Decklist.read collection FetchedDecklist deckId
    )


type Msg
    = FromShared Shared.Msg
    | FromBuilderOptions DeckbuildSelections.Msg
    | ChoseLeader Cards.Faction
    | Save
    | SavedDecklist API.Decklist.ResultUpdate
    | Delete
    | DeletedDecklist API.Decklist.ResultDelete
    | StartRenameDeck
    | DeckNameChanged String
    | SaveNewDeckName
    | SetGameMode GameMode
    | FetchedDecklist API.Decklist.ResultRead


update : Auth.User -> Msg -> Model -> ( Model, Effect Msg )
update user msg modelx =
    case ( modelx, msg ) of
        ( _, FromShared subMsg ) ->
            ( modelx, Effect.fromShared subMsg )

        ( Loading key, FetchedDecklist (Ok deck) ) ->
            ( Editing key { deck = deck, builderOptions = DeckbuildSelections.init }, Effect.none )

        ( _, FetchedDecklist (Err _) ) ->
            ( modelx, Effect.none )

        ( Loading _, _ ) ->
            ( modelx, Effect.none )

        ( Editing key oldModel, FetchedDecklist (Ok deck) ) ->
            ( Editing key { oldModel | deck = deck }, Effect.none )

        ( Editing key oldModel, FromBuilderOptions (DeckbuildSelections.ChangedDecklist change) ) ->
            let
                oldDeck =
                    oldModel.deck
            in
            ( Editing key { oldModel | deck = { oldDeck | decklist = Deck.setCard oldDeck.decklist change } }, Effect.none )

        ( Editing key oldModel, FromBuilderOptions subMsg ) ->
            let
                ( subModel, subEffect ) =
                    DeckbuildSelections.update subMsg oldModel.builderOptions
            in
            ( Editing key { oldModel | builderOptions = subModel }, subEffect )

        ( Editing key model, ChoseLeader leader ) ->
            let
                oldDeck =
                    model.deck
            in
            ( Editing key { model | deck = { oldDeck | decklist = Deck.setLeader oldDeck.decklist leader } }, Effect.none )

        ( Editing key model, Save ) ->
            case Deck.encode (Deck.PostSave model.deck) of
                Just encodedDeck ->
                    ( Editing key model, API.Decklist.update SavedDecklist user.token model.deck.meta.id encodedDeck |> Effect.fromCmd )

                _ ->
                    ( Editing key model, Effect.none )

        ( Editing key model, SavedDecklist _ ) ->
            ( Editing key model, Effect.none )

        ( Editing key model, Delete ) ->
            ( Editing key model, API.Decklist.delete DeletedDecklist user.token model.deck.meta.id |> Effect.fromCmd )

        ( Editing key model, DeletedDecklist _ ) ->
            ( Editing key model, Route.toHref Route.MyDecks |> Navigation.replaceUrl key |> Effect.fromCmd )

        ( Editing key model, StartRenameDeck ) ->
            let
                oldDeck =
                    model.deck

                oldMeta =
                    oldDeck.meta
            in
            ( Editing key { model | deck = { oldDeck | meta = { oldMeta | name = Deck.BeingNamed "" } } }, Effect.none )

        ( Editing key model, DeckNameChanged newName ) ->
            let
                oldDeck =
                    model.deck

                oldMeta =
                    oldDeck.meta
            in
            case model.deck.meta.name of
                BeingNamed _ ->
                    ( Editing key { model | deck = { oldDeck | meta = { oldMeta | name = Deck.BeingNamed newName } } }, Effect.none )

                _ ->
                    ( Editing key model, Effect.none )

        ( Editing key model, SaveNewDeckName ) ->
            let
                oldDeck =
                    model.deck

                oldMeta =
                    oldDeck.meta
            in
            case model.deck.meta.name of
                BeingNamed newName ->
                    case String.trim newName of
                        "" ->
                            ( Editing key { model | deck = { oldDeck | meta = { oldMeta | name = Deck.Unnamed } } }, Effect.none )

                        trimmedName ->
                            ( Editing key { model | deck = { oldDeck | meta = { oldMeta | name = Deck.Named trimmedName } } }, Effect.none )

                _ ->
                    ( Editing key model, Effect.none )

        ( Editing key model, SetGameMode gameMode ) ->
            let
                oldDeck =
                    model.deck

                oldMeta =
                    oldDeck.meta
            in
            ( Editing key { model | deck = { oldDeck | meta = { oldMeta | gameMode = gameMode } } }, Effect.none )


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
    case model of
        Loading _ ->
            UI.Layout.Template.view FromShared shared []

        Editing _ data ->
            UI.Layout.Template.view FromShared
                shared
                [ UI.Layout.Deck.writeMode
                    { actions = Lazy.lazy UI.ActionBar.view actions
                    , decklist = Lazy.lazy2 UI.Decklist.viewEdit decklistActions data.deck
                    , selectors = DeckbuildSelections.view shared.collection FromBuilderOptions data.builderOptions data.deck.decklist
                    }
                ]


actions : List (UI.ActionBar.Model Msg)
actions =
    [ { icon = Icon.Save, name = "Save", action = Just Save, href = Nothing }
    , { icon = Icon.Delete, name = "Delete", action = Just Delete, href = Nothing }
    ]
