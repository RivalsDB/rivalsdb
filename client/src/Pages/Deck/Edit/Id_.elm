module Pages.Deck.Edit.Id_ exposing (Model, Msg, page)

import API.Decklist
import API.ErrorHandler
import Auth
import Cards
import Data.Collection as Collection exposing (Collection)
import Data.Deck as Deck exposing (Deck, Name(..))
import Data.GameMode exposing (GameMode)
import Data.Visibility exposing (Visibility)
import Effect exposing (Effect)
import Gen.Params.Deck.Edit.Id_ exposing (Params)
import Gen.Route as Route
import Html
import Html.Lazy as Lazy
import Page
import Request
import Shared exposing (Token)
import UI.ActionBar
import UI.DeckbuildSelections as DeckbuildSelections
import UI.Decklist
import UI.Icon as Icon
import UI.Layout.TSplit
import UI.Layout.Template
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.protected.advanced
        (\user ->
            { init = init shared.collection user.token req.params.id
            , update = update shared user
            , view = view shared
            , subscriptions = always Sub.none
            }
        )



-- INIT


type Model
    = Loading
    | Editing Data


type alias Data =
    { deck : Deck
    , builderOptions : DeckbuildSelections.Model
    , isSaving : Bool
    }


init : Collection -> Token -> String -> ( Model, Effect Msg )
init collection token deckId =
    ( Loading, Effect.fromCmd <| API.Decklist.read collection FetchedDecklist (Just token) deckId )


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
    | SetVisibility Visibility
    | FetchedDecklist API.Decklist.ResultRead
    | ChangedCard ( Cards.Card, Int )


update : Shared.Model -> Auth.User -> Msg -> Model -> ( Model, Effect Msg )
update shared user msg modelx =
    case ( modelx, msg ) of
        ( _, FromShared subMsg ) ->
            ( modelx, Effect.fromShared subMsg )

        ( Loading, FetchedDecklist (Ok deck) ) ->
            ( Editing
                { isSaving = False
                , deck = deck
                , builderOptions = DeckbuildSelections.init shared.strictFilterInitial
                }
            , Effect.none
            )

        ( _, FetchedDecklist (Err _) ) ->
            ( modelx, Effect.none )

        ( Loading, _ ) ->
            ( modelx, Effect.none )

        ( Editing oldModel, FetchedDecklist (Ok deck) ) ->
            ( Editing { oldModel | deck = deck }, Effect.none )

        ( Editing model, ChoseLeader leader ) ->
            let
                oldDeck =
                    model.deck
            in
            ( Editing { model | deck = { oldDeck | decklist = Deck.setLeader oldDeck.decklist leader } }, Effect.none )

        ( Editing model, Save ) ->
            if model.isSaving then
                ( Editing model, Effect.none )

            else
                case Deck.encode model.deck of
                    Nothing ->
                        ( Editing model, Effect.none )

                    Just encodedDeck ->
                        ( Editing { model | isSaving = True }, API.Decklist.update SavedDecklist user.token model.deck.meta.id encodedDeck |> Effect.fromCmd )

        ( Editing model, SavedDecklist (Ok _) ) ->
            ( Editing { model | isSaving = False }, Effect.fromShared (Shared.ToastSuccess "Deck saved!" Nothing) )

        ( Editing model, SavedDecklist (Err e) ) ->
            ( Editing { model | isSaving = False }, API.ErrorHandler.standardAlert e )

        ( Editing model, Delete ) ->
            ( Editing model, API.Decklist.delete DeletedDecklist user.token model.deck.meta.id |> Effect.fromCmd )

        ( Editing model, DeletedDecklist (Ok _) ) ->
            ( Editing model
            , Effect.batch
                [ Effect.fromShared (Shared.Redirect Route.MyDecks)
                , Effect.fromShared (Shared.ToastSuccess "Deck deleted" Nothing)
                ]
            )

        ( Editing model, DeletedDecklist (Err e) ) ->
            ( Editing model, API.ErrorHandler.standardAlert e )

        ( Editing model, StartRenameDeck ) ->
            let
                oldDeck =
                    model.deck

                oldMeta =
                    oldDeck.meta
            in
            ( Editing { model | deck = { oldDeck | meta = { oldMeta | name = Deck.BeingNamed "" } } }, Effect.none )

        ( Editing model, DeckNameChanged newName ) ->
            let
                oldDeck =
                    model.deck

                oldMeta =
                    oldDeck.meta
            in
            case model.deck.meta.name of
                BeingNamed _ ->
                    ( Editing { model | deck = { oldDeck | meta = { oldMeta | name = Deck.BeingNamed newName } } }, Effect.none )

                _ ->
                    ( Editing model, Effect.none )

        ( Editing model, SaveNewDeckName ) ->
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
                            ( Editing { model | deck = { oldDeck | meta = { oldMeta | name = Deck.Unnamed } } }, Effect.none )

                        trimmedName ->
                            ( Editing { model | deck = { oldDeck | meta = { oldMeta | name = Deck.Named trimmedName } } }, Effect.none )

                _ ->
                    ( Editing model, Effect.none )

        ( Editing model, SetGameMode gameMode ) ->
            let
                oldDeck =
                    model.deck

                oldMeta =
                    oldDeck.meta
            in
            ( Editing { model | deck = { oldDeck | meta = { oldMeta | gameMode = gameMode } } }, Effect.none )

        ( Editing model, SetVisibility visibility ) ->
            let
                oldDeck =
                    model.deck

                oldMeta =
                    oldDeck.meta
            in
            ( Editing { model | deck = { oldDeck | meta = { oldMeta | visibility = visibility } } }, Effect.none )

        ( Editing model, ChangedCard choice ) ->
            let
                oldDeck =
                    model.deck

                oldDecklist =
                    oldDeck.decklist
            in
            ( Editing { model | deck = { oldDeck | decklist = Deck.setCard oldDecklist choice } }, Effect.none )

        ( Editing oldModel, FromBuilderOptions subMsg ) ->
            case subMsg of
                DeckbuildSelections.Internal _ ->
                    let
                        ( subModel, subEffect ) =
                            DeckbuildSelections.update subMsg oldModel.builderOptions
                    in
                    ( Editing { oldModel | builderOptions = subModel }, subEffect )

                DeckbuildSelections.External (DeckbuildSelections.ChangedDecklist change) ->
                    let
                        oldDeck =
                            oldModel.deck
                    in
                    ( Editing { oldModel | deck = { oldDeck | decklist = Deck.setCard oldDeck.decklist change } }, Effect.none )

                DeckbuildSelections.External (DeckbuildSelections.DescriptionChanged newDescription) ->
                    let
                        oldDeck =
                            oldModel.deck

                        oldMeta =
                            oldDeck.meta
                    in
                    ( Editing { oldModel | deck = { oldDeck | meta = { oldMeta | description = Just newDescription } } }
                    , Effect.none
                    )


decklistActions : UI.Decklist.Actions Msg
decklistActions =
    { setLeader = ChoseLeader
    , startNameChange = StartRenameDeck
    , changeName = DeckNameChanged
    , endNameChange = SaveNewDeckName
    , setGameMode = SetGameMode
    , setVisibility = SetVisibility
    , changeCard = ChangedCard
    }


view : Shared.Model -> Model -> View Msg
view shared model =
    case model of
        Loading ->
            UI.Layout.Template.view FromShared shared []

        Editing data ->
            UI.Layout.Template.view FromShared
                shared
                [ UI.Layout.TSplit.view
                    { bar = Lazy.lazy UI.ActionBar.view actions
                    , main = Lazy.lazy2 UI.Decklist.viewWrite decklistActions data.deck
                    , secondary =
                        Html.map FromBuilderOptions <|
                            DeckbuildSelections.view
                                (Collection.playerCards shared.collection)
                                data.builderOptions
                                data.deck.decklist
                                data.deck.meta.description
                    }
                ]


actions : List (UI.ActionBar.Model Msg)
actions =
    [ { icon = Icon.Save, name = "Save", action = Just Save, href = Nothing }
    , { icon = Icon.Delete, name = "Delete", action = Just Delete, href = Nothing }
    ]
