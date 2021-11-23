module Pages.Deck.Edit.Id_ exposing (Model, Msg, page)

import API.Decklist
import Auth
import Cards
import Deck exposing (DeckPostSave, Name(..))
import Effect exposing (Effect)
import Gen.Params.Deck.Edit.Id_ exposing (Params)
import Html exposing (Html, div, li, span, text, ul)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Page
import Request
import Shared
import UI.Decklist
import UI.DecklistOptions as DecklistOptions
import UI.Icon as Icon
import UI.Layout.Template
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.protected.advanced
        (\user ->
            { init = init shared.collection req.params.id
            , update = update user
            , view = view shared
            , subscriptions = always Sub.none
            }
        )



-- INIT


type Model
    = Loading
    | Editing Data


type alias Data =
    { deck : DeckPostSave
    , builderOptions : DecklistOptions.Model Msg
    }


init : Shared.Collection -> String -> ( Model, Effect Msg )
init collection deckId =
    ( Loading
    , Effect.fromCmd <| API.Decklist.read collection FetchedDecklist deckId
    )


type Msg
    = FromShared Shared.Msg
    | FromBuilderOptions DecklistOptions.Msg
    | ChoseLeader Cards.Faction
    | Save
    | SavedDecklist API.Decklist.ResultUpdate
    | StartRenameDeck
    | DeckNameChanged String
    | SaveNewDeckName
    | FetchedDecklist API.Decklist.ResultRead


update : Auth.User -> Msg -> Model -> ( Model, Effect Msg )
update user msg modelx =
    case ( modelx, msg ) of
        ( _, FromShared subMsg ) ->
            ( modelx, Effect.fromShared subMsg )

        ( Loading, FetchedDecklist (Ok deck) ) ->
            ( Editing { deck = deck, builderOptions = DecklistOptions.init }, Effect.none )

        ( _, FetchedDecklist (Err _) ) ->
            ( modelx, Effect.none )

        ( Loading, _ ) ->
            ( modelx, Effect.none )

        ( Editing oldModel, FetchedDecklist (Ok deck) ) ->
            ( Editing { oldModel | deck = deck }, Effect.none )

        ( Editing oldModel, FromBuilderOptions (DecklistOptions.ChangedDecklist change) ) ->
            let
                oldDeck =
                    oldModel.deck
            in
            ( Editing { oldModel | deck = { oldDeck | decklist = Deck.setCard oldDeck.decklist change } }, Effect.none )

        ( Editing oldModel, FromBuilderOptions subMsg ) ->
            ( Editing { oldModel | builderOptions = DecklistOptions.update subMsg oldModel.builderOptions }, Effect.none )

        ( Editing model, ChoseLeader leader ) ->
            let
                oldDeck =
                    model.deck
            in
            ( Editing { model | deck = { oldDeck | decklist = Deck.setLeader oldDeck.decklist leader } }, Effect.none )

        ( Editing model, Save ) ->
            case Deck.encode (Deck.PostSave model.deck) of
                Just encodedDeck ->
                    ( Editing model, API.Decklist.update SavedDecklist user.token model.deck.meta.id encodedDeck |> Effect.fromCmd )

                _ ->
                    ( Editing model, Effect.none )

        ( Editing model, SavedDecklist _ ) ->
            ( Editing model, Effect.none )

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


decklistActions : UI.Decklist.Actions Msg
decklistActions =
    { setLeader = ChoseLeader
    , startNameChange = StartRenameDeck
    , changeName = DeckNameChanged
    , endNameChange = SaveNewDeckName
    }


view : Shared.Model -> Model -> View Msg
view shared model =
    case model of
        Loading ->
            UI.Layout.Template.view FromShared shared []

        Editing data ->
            UI.Layout.Template.view FromShared
                shared
                [ div [ class "deckbldr" ]
                    [ viewActions
                    , div [ class "deckbldr-decklist" ]
                        [ UI.Decklist.viewEdit decklistActions data.deck ]
                    , div [ class "deckbldr-choices" ] <|
                        DecklistOptions.view shared.collection FromBuilderOptions data.builderOptions data.deck.decklist
                    ]
                ]


viewActions : Html Msg
viewActions =
    div [ class "deckbldr-actions" ]
        [ ul [ class "actions-list" ]
            [ li [ class "actions-item", onClick Save ]
                [ span [ class "actions-icon" ] [ Icon.icon ( Icon.Save, Icon.Standard ) ]
                , span [ class "actions-description" ] [ text "Save" ]
                ]
            ]
        ]
