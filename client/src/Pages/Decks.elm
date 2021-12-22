module Pages.Decks exposing (Model, Msg, page)

import API.Decklist
import Cards exposing (CardStack(..))
import Data.Clan as Clan exposing (Clan)
import Data.Collection exposing (Collection)
import Data.GameMode as GameMode exposing (GameMode)
import Deck exposing (DeckPostSave)
import Effect exposing (Effect)
import Gen.Params.Decks exposing (Params)
import Html exposing (Html, div, label, option, p, select, span, text)
import Html.Attributes exposing (class, for, name, value)
import Html.Events exposing (onInput)
import Html.Lazy as Lazy
import Page
import Request
import Shared
import UI.DecklistsIndex
import UI.Layout.Template
import UI.Text
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared _ =
    Page.advanced
        { init = init shared
        , update = update
        , view = view shared
        , subscriptions = always Sub.none
        }



-- INIT


type Model
    = Loading
    | Viewing (List DeckPostSave) Filters


type alias Filters =
    { gameMode : GameMode
    , agenda : Maybe Cards.Id
    , haven : Maybe Cards.Id
    , leader : Maybe Cards.Id
    , clan : Maybe Clan
    }


init : Shared.Model -> ( Model, Effect Msg )
init shared =
    ( Loading
    , API.Decklist.index shared.collection FetchedDecklists
        |> Effect.fromCmd
    )



-- UPDATE


type Msg
    = FromShared Shared.Msg
    | FetchedDecklists API.Decklist.ResultIndex
    | FilterByGameMode GameMode
    | FilterByAgenda (Maybe Cards.Id)
    | FilterByHaven (Maybe Cards.Id)
    | FilterByLeader (Maybe Cards.Id)
    | FilterByClan (Maybe Clan)


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case ( model, msg ) of
        ( _, FromShared subMsg ) ->
            ( model, Effect.fromShared subMsg )

        ( _, FetchedDecklists (Ok decks) ) ->
            ( Viewing decks { gameMode = GameMode.Both, agenda = Nothing, haven = Nothing, leader = Nothing, clan = Nothing }, Effect.none )

        ( _, FetchedDecklists (Err _) ) ->
            ( model, Effect.none )

        ( Loading, _ ) ->
            ( Loading, Effect.none )

        ( Viewing decklsit filters, FilterByGameMode gameMode ) ->
            ( Viewing decklsit { filters | gameMode = gameMode }, Effect.none )

        ( Viewing decklsit filters, FilterByAgenda agendaId ) ->
            ( Viewing decklsit { filters | agenda = agendaId }, Effect.none )

        ( Viewing decklsit filters, FilterByHaven havenId ) ->
            ( Viewing decklsit { filters | haven = havenId }, Effect.none )

        ( Viewing decklsit filters, FilterByLeader leaderId ) ->
            ( Viewing decklsit { filters | leader = leaderId }, Effect.none )

        ( Viewing decklsit filters, FilterByClan clan ) ->
            ( Viewing decklsit { filters | clan = clan }, Effect.none )



----------
-- VIEW
----------


view : Shared.Model -> Model -> View Msg
view shared model =
    case model of
        Loading ->
            UI.Layout.Template.view FromShared shared [ text "Loading" ]

        Viewing decks filters ->
            viewDecklists shared decks filters


viewDecklists : Shared.Model -> List DeckPostSave -> Filters -> View Msg
viewDecklists shared decks filters =
    UI.Layout.Template.view FromShared
        shared
        [ div [ class "page-decks__content" ]
            [ UI.Text.header [ text "Decklists" ]
            , Lazy.lazy viewDecklistFilters shared.collection
            , UI.DecklistsIndex.view (filterDecks filters decks)
            ]
        ]


viewDecklistFilters : Collection -> Html Msg
viewDecklistFilters collection =
    let
        { agendaStack, havenStack, factionStack } =
            Data.Collection.groupByStack collection
    in
    p [ class "deck-index-filters" ]
        [ text "Filtering by:"
        , span [ class "deck-index-filters__filter" ]
            [ label [ for "gameMode" ] [ text "Game Mode:" ]
            , select
                [ name "gameMode"
                , onInput (GameMode.fromString >> Maybe.withDefault GameMode.default >> FilterByGameMode)
                ]
                ([ GameMode.Both
                 , GameMode.HeadToHead
                 , GameMode.Multiplayer
                 ]
                    |> List.map
                        (\mode ->
                            option [ value <| GameMode.toString mode ] [ text <| GameMode.longName mode ]
                        )
                )
            ]
        , viewSelect { label = "Agenda", onSelect = FilterByAgenda, anyName = "Any agenda" } (List.sortBy .name agendaStack)
        , viewSelect { label = "Haven", onSelect = FilterByHaven, anyName = "Any haven" } (List.sortBy .name havenStack)
        , span [ class "deck-index-filters__filter" ]
            [ label [ for "clan" ] [ text "Clans" ]
            , select [ name "clan", onInput (Clan.fromString >> FilterByClan) ]
                (option [ value "none" ] [ text "Any clan" ]
                    :: (Clan.all
                            |> List.map
                                (\clan ->
                                    option [ value <| Clan.toString clan ] [ text <| Clan.name clan ]
                                )
                       )
                )
            ]
        , viewSelect { label = "Leader", onSelect = FilterByLeader, anyName = "Any leader" } (List.sortBy .name factionStack)
        ]


type alias SelectSettings msg =
    { label : String
    , onSelect : Maybe String -> msg
    , anyName : String
    }


viewSelect : SelectSettings Msg -> List { a | id : String, name : String } -> Html Msg
viewSelect settings entries =
    span [ class "deck-index-filters__filter" ]
        [ label [ for <| String.toLower settings.label ]
            [ text settings.label ]
        , select
            [ name <| String.toLower settings.label
            , onInput
                (\entryId ->
                    settings.onSelect
                        (if entryId == "none" then
                            Nothing

                         else
                            Just entryId
                        )
                )
            ]
            (option [ value "none" ] [ text settings.anyName ]
                :: List.map (\entry -> option [ value entry.id ] [ text entry.name ]) entries
            )
        ]



-------------
-- FILTERING
-------------


filterDecks : Filters -> List DeckPostSave -> List DeckPostSave
filterDecks filters decks =
    decks
        |> List.filter
            (\deck ->
                gameModeAllowed filters deck
                    && agendaAllowed filters deck
                    && havenAllowed filters deck
                    && leaderAllowed filters deck
                    && clanAllowed filters deck
            )


gameModeAllowed : Filters -> DeckPostSave -> Bool
gameModeAllowed filters deck =
    GameMode.allows filters.gameMode deck.meta.gameMode


agendaAllowed : Filters -> DeckPostSave -> Bool
agendaAllowed filters deck =
    case ( filters.agenda, deck.decklist.agenda ) of
        ( Just whitelistedAgendaId, Just deckAgenda ) ->
            deckAgenda.id == whitelistedAgendaId

        ( Nothing, _ ) ->
            True

        ( _, Nothing ) ->
            False


havenAllowed : Filters -> DeckPostSave -> Bool
havenAllowed filters deck =
    case ( filters.haven, deck.decklist.haven ) of
        ( Just whitelistedHavenId, Just deckHaven ) ->
            deckHaven.id == whitelistedHavenId

        ( Nothing, _ ) ->
            True

        ( _, Nothing ) ->
            False


clanAllowed : Filters -> DeckPostSave -> Bool
clanAllowed filters deck =
    case filters.clan of
        Just whitelistedClan ->
            Deck.clansInFaction deck.decklist.faction
                |> List.map Tuple.first
                |> List.member whitelistedClan

        Nothing ->
            True


leaderAllowed : Filters -> DeckPostSave -> Bool
leaderAllowed filters deck =
    case ( filters.leader, Deck.leader deck.decklist ) of
        ( Just whitelistedLeaderId, Just leader ) ->
            leader.id == whitelistedLeaderId

        ( Nothing, _ ) ->
            True

        ( _, Nothing ) ->
            False
