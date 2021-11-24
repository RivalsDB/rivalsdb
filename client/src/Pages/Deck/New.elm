module Pages.Deck.New exposing (Model, Msg, page)

import API.Decklist
import Auth
import Browser.Navigation as Navigation exposing (Key)
import Cards
import Deck exposing (DeckPreSave, Name(..))
import Effect exposing (Effect)
import Gen.Params.Deck.New exposing (Params)
import Gen.Route as Route
import Html exposing (Html, div, li, span, text, ul)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Page
import Request
import Shared
import UI.Deckbuilder as Deckbuilder
import UI.Decklist
import UI.Icon as Icon
import UI.Layout.Template
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.protected.advanced
        (\user ->
            { init = init req.key
            , update = update user
            , view = view shared
            , subscriptions = always Sub.none
            }
        )



-- INIT


type alias Model =
    { key : Key
    , deck : DeckPreSave
    , builderOptions : Deckbuilder.Model Msg
    }


init : Navigation.Key -> ( Model, Effect Msg )
init key =
    ( { key = key
      , deck = Deck.init
      , builderOptions = Deckbuilder.init
      }
    , Effect.none
    )


type Msg
    = FromShared Shared.Msg
    | FromBuilderOptions Deckbuilder.Msg
    | ChoseLeader Cards.Faction
    | Save
    | SavedDecklist API.Decklist.ResultCreate
    | StartRenameDeck
    | DeckNameChanged String
    | SaveNewDeckName


update : Auth.User -> Msg -> Model -> ( Model, Effect Msg )
update user msg model =
    case msg of
        FromShared subMsg ->
            ( model, Effect.fromShared subMsg )

        FromBuilderOptions (Deckbuilder.ChangedDecklist change) ->
            let
                oldDeck =
                    model.deck
            in
            ( { model | deck = { oldDeck | decklist = Deck.setCard oldDeck.decklist change } }, Effect.none )

        FromBuilderOptions subMsg ->
            ( { model | builderOptions = Deckbuilder.update subMsg model.builderOptions }, Effect.none )

        ChoseLeader leader ->
            let
                oldDeck =
                    model.deck
            in
            ( { model | deck = { oldDeck | decklist = Deck.setLeader oldDeck.decklist leader } }, Effect.none )

        Save ->
            case Deck.encode (Deck.PreSave model.deck) of
                Just encodedDeck ->
                    ( model, API.Decklist.create SavedDecklist user.token encodedDeck |> Effect.fromCmd )

                _ ->
                    ( model, Effect.none )

        SavedDecklist (Ok deckId) ->
            ( model, Route.toHref (Route.Deck__View__Id_ { id = deckId }) |> Navigation.pushUrl model.key |> Effect.fromCmd )

        SavedDecklist (Err _) ->
            ( model, Effect.none )

        StartRenameDeck ->
            let
                oldDeck =
                    model.deck
            in
            ( { model | deck = { oldDeck | meta = { name = BeingNamed "" } } }, Effect.none )

        DeckNameChanged newName ->
            let
                oldDeck =
                    model.deck
            in
            case model.deck.meta.name of
                BeingNamed _ ->
                    ( { model | deck = { oldDeck | meta = { name = BeingNamed newName } } }, Effect.none )

                _ ->
                    ( model, Effect.none )

        SaveNewDeckName ->
            let
                oldDeck =
                    model.deck
            in
            case model.deck.meta.name of
                BeingNamed newName ->
                    case String.trim newName of
                        "" ->
                            ( { model | deck = { oldDeck | meta = { name = Unnamed } } }, Effect.none )

                        trimmedName ->
                            ( { model | deck = { oldDeck | meta = { name = Named trimmedName } } }, Effect.none )

                _ ->
                    ( model, Effect.none )


decklistActions : UI.Decklist.Actions Msg
decklistActions =
    { setLeader = ChoseLeader
    , startNameChange = StartRenameDeck
    , changeName = DeckNameChanged
    , endNameChange = SaveNewDeckName
    }


view : Shared.Model -> Model -> View Msg
view shared model =
    UI.Layout.Template.view FromShared
        shared
        [ div [ class "deckbldr" ]
            [ viewActions
            , div [ class "deckbldr-decklist" ]
                [ UI.Decklist.viewCreate decklistActions model.deck ]
            , div [ class "deckbldr-choices" ] <|
                Deckbuilder.view shared.collection FromBuilderOptions model.builderOptions model.deck.decklist
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
