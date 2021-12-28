module Pages.Deck.New exposing (Model, Msg, page)

import API.Decklist
import Auth
import Cards
import Data.GameMode exposing (GameMode)
import Deck exposing (DeckPreSave, Name(..))
import Effect exposing (Effect)
import Gen.Params.Deck.New exposing (Params)
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
page shared _ =
    Page.protected.advanced
        (\user ->
            { init = init
            , update = update user
            , view = view shared
            , subscriptions = always Sub.none
            }
        )



-- INIT


type alias Model =
    { deck : DeckPreSave
    , builderOptions : DeckbuildSelections.Model Msg
    , isSaving : Bool
    }


init : ( Model, Effect Msg )
init =
    ( { deck = Deck.init
      , builderOptions = DeckbuildSelections.init
      , isSaving = False
      }
    , Effect.none
    )


type Msg
    = FromShared Shared.Msg
    | FromBuilderOptions DeckbuildSelections.Msg
    | ChoseLeader Cards.Faction
    | Save
    | SavedDecklist API.Decklist.ResultCreate
    | StartRenameDeck
    | DeckNameChanged String
    | SetGameMode GameMode
    | SaveNewDeckName


update : Auth.User -> Msg -> Model -> ( Model, Effect Msg )
update user msg model =
    case msg of
        FromShared subMsg ->
            ( model, Effect.fromShared subMsg )

        FromBuilderOptions (DeckbuildSelections.ChangedDecklist change) ->
            let
                oldDeck =
                    model.deck
            in
            ( { model | deck = { oldDeck | decklist = Deck.setCard oldDeck.decklist change } }, Effect.none )

        FromBuilderOptions subMsg ->
            let
                ( subModel, subEffect ) =
                    DeckbuildSelections.update subMsg model.builderOptions
            in
            ( { model | builderOptions = subModel }, subEffect )

        ChoseLeader leader ->
            let
                oldDeck =
                    model.deck
            in
            ( { model | deck = { oldDeck | decklist = Deck.setLeader oldDeck.decklist leader } }, Effect.none )

        Save ->
            if model.isSaving then
                ( model, Effect.none )

            else
                case Deck.encode (Deck.PreSave model.deck) of
                    Nothing ->
                        ( model, Effect.none )

                    Just encodedDeck ->
                        ( { model | isSaving = True }, API.Decklist.create SavedDecklist user.token encodedDeck |> Effect.fromCmd )

        SavedDecklist (Ok deckId) ->
            ( { model | isSaving = False }, Effect.fromShared <| Shared.GoTo (Route.Deck__View__Id_ { id = deckId }) )

        SavedDecklist (Err _) ->
            ( { model | isSaving = False }, Effect.none )

        StartRenameDeck ->
            let
                oldDeck =
                    model.deck

                oldMeta =
                    oldDeck.meta
            in
            ( { model | deck = { oldDeck | meta = { oldMeta | name = BeingNamed "" } } }, Effect.none )

        DeckNameChanged newName ->
            let
                oldDeck =
                    model.deck

                oldMeta =
                    oldDeck.meta
            in
            case model.deck.meta.name of
                BeingNamed _ ->
                    ( { model | deck = { oldDeck | meta = { oldMeta | name = BeingNamed newName } } }, Effect.none )

                _ ->
                    ( model, Effect.none )

        SaveNewDeckName ->
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
                            ( { model | deck = { oldDeck | meta = { oldMeta | name = Unnamed } } }, Effect.none )

                        trimmedName ->
                            ( { model | deck = { oldDeck | meta = { oldMeta | name = Named trimmedName } } }, Effect.none )

                _ ->
                    ( model, Effect.none )

        SetGameMode gameMode ->
            let
                oldDeck =
                    model.deck

                oldMeta =
                    oldDeck.meta
            in
            ( { model | deck = { oldDeck | meta = { oldMeta | gameMode = gameMode } } }, Effect.none )


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
        [ UI.Layout.Deck.writeMode
            { actions = Lazy.lazy UI.ActionBar.view actions
            , decklist = Lazy.lazy2 UI.Decklist.viewCreate decklistActions model.deck
            , selectors = DeckbuildSelections.view shared.collection FromBuilderOptions model.builderOptions model.deck.decklist
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
