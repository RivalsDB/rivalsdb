module Pages.Decks exposing (Model, Msg, page)

import API.Decklist
import Browser.Navigation as Navigation exposing (Key)
import Cards exposing (CardStack(..))
import Data.Clan as Clan exposing (Clan)
import Data.Collection exposing (Collection)
import Data.GameMode as GameMode exposing (GameMode)
import Deck exposing (DeckPostSave)
import Dict exposing (Dict)
import Effect exposing (Effect)
import Gen.Params.Decks exposing (Params)
import Gen.Route as Route
import Html exposing (Html, div, label, option, p, select, span, text)
import Html.Attributes exposing (class, for, name, selected, value)
import Html.Events exposing (onInput)
import Html.Lazy as Lazy
import Json.Encode as Encode
import Page
import Request
import Shared
import UI.DecklistsIndex
import UI.Layout.Template
import UI.Text
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.advanced
        { init = init req shared
        , update = update
        , view = view shared
        , subscriptions = always Sub.none
        }



-- INIT


type Model
    = Loading Key Filters
    | Viewing Key (List DeckPostSave) Filters


type alias Filters =
    { gameMode : GameMode
    , agenda : Maybe Cards.Id
    , haven : Maybe Cards.Id
    , leader : Maybe Cards.Id
    , clan : Maybe Clan
    }


filtersFromQueryString : Dict String String -> Filters
filtersFromQueryString query =
    let
        gameMode =
            Dict.get "mode" query
                |> Maybe.andThen GameMode.fromString
                |> Maybe.withDefault GameMode.Both
    in
    { gameMode = gameMode
    , agenda = Dict.get "agenda" query
    , haven = Dict.get "haven" query
    , leader = Dict.get "leader" query
    , clan = Dict.get "clan" query |> Maybe.andThen Clan.fromString
    }


filtersToQueryString : Filters -> String
filtersToQueryString filters =
    let
        query =
            [ Maybe.map (\agenda -> ( "agenda", agenda )) filters.agenda
            , Maybe.map (\haven -> ( "haven", haven )) filters.haven
            , Maybe.map (\leader -> ( "leader", leader )) filters.leader
            , Maybe.map (\clan -> ( "clan", Clan.toString clan )) filters.clan
            , if filters.gameMode == GameMode.Both then
                Nothing

              else
                Just ( "mode", GameMode.toString filters.gameMode )
            ]
                |> List.filterMap (Maybe.map (\( name, value ) -> name ++ "=" ++ value))
                |> String.join "&"
    in
    if String.length query > 0 then
        "?" ++ query

    else
        ""


init : Request.With Params -> Shared.Model -> ( Model, Effect Msg )
init req shared =
    ( Loading req.key (filtersFromQueryString req.query)
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

        ( Loading key filters, FetchedDecklists (Ok decklists) ) ->
            ( Viewing key decklists filters, Effect.none )

        ( Loading _ _, _ ) ->
            ( model, Effect.none )

        ( Viewing key _ filters, FetchedDecklists (Ok decklists) ) ->
            ( Viewing key decklists filters, Effect.none )

        ( Viewing _ _ _, FetchedDecklists (Err _) ) ->
            ( model, Effect.none )

        ( Viewing key decklist filters, FilterByGameMode gameMode ) ->
            let
                newFilters =
                    { filters | gameMode = gameMode }
            in
            ( Viewing key decklist newFilters
            , Effect.batch
                [ urlFollowFilters key newFilters
                , trackFiltering "game mode" (GameMode.toString gameMode)
                ]
            )

        ( Viewing key decklist filters, FilterByAgenda agendaId ) ->
            let
                newFilters =
                    { filters | agenda = agendaId }
            in
            ( Viewing key decklist newFilters
            , Effect.batch
                [ urlFollowFilters key newFilters
                , trackFiltering "game mode" (Maybe.withDefault "NONE" agendaId)
                ]
            )

        ( Viewing key decklist filters, FilterByHaven havenId ) ->
            let
                newFilters =
                    { filters | haven = havenId }
            in
            ( Viewing key decklist newFilters
            , Effect.batch
                [ urlFollowFilters key newFilters
                , trackFiltering "game mode" (Maybe.withDefault "NONE" havenId)
                ]
            )

        ( Viewing key decklist filters, FilterByLeader leaderId ) ->
            let
                newFilters =
                    { filters | leader = leaderId }
            in
            ( Viewing key decklist newFilters
            , Effect.batch
                [ urlFollowFilters key newFilters
                , trackFiltering "game mode" (Maybe.withDefault "NONE" leaderId)
                ]
            )

        ( Viewing key decklist filters, FilterByClan clan ) ->
            let
                newFilters =
                    { filters | clan = clan }
            in
            ( Viewing key decklist newFilters
            , Effect.batch
                [ urlFollowFilters key newFilters
                , trackFiltering "game mode" (Maybe.map Clan.toString clan |> Maybe.withDefault "NONE")
                ]
            )


urlFollowFilters : Key -> Filters -> Effect msg
urlFollowFilters key filters =
    (Route.toHref Route.Decks ++ filtersToQueryString filters)
        |> Navigation.replaceUrl key
        |> Effect.fromCmd


trackFiltering : String -> String -> Effect Msg
trackFiltering by val =
    Encode.object [ ( by, Encode.string val ) ]
        |> Just
        |> Shared.TrackEvent "Deck index: filter"
        |> Effect.fromShared



----------
-- VIEW
----------


view : Shared.Model -> Model -> View Msg
view shared model =
    case model of
        Loading _ _ ->
            UI.Layout.Template.view FromShared shared [ text "Loading" ]

        Viewing _ decks filters ->
            viewDecklists shared decks filters


viewDecklists : Shared.Model -> List DeckPostSave -> Filters -> View Msg
viewDecklists shared decks filters =
    Debug.log (Debug.toString filters)
        UI.Layout.Template.view
        FromShared
        shared
        [ div [ class "page-decks__content" ]
            [ UI.Text.header [ text "Decklists" ]
            , Lazy.lazy2 viewDecklistFilters shared.collection filters
            , UI.DecklistsIndex.view (filterDecks filters decks)
            ]
        ]


viewDecklistFilters : Collection -> Filters -> Html Msg
viewDecklistFilters collection filters =
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
                            option
                                [ value <| GameMode.toString mode
                                , selected <| mode == filters.gameMode
                                ]
                                [ text <| GameMode.longName mode ]
                        )
                )
            ]
        , viewSelect { label = "Agenda", onSelect = FilterByAgenda, anyName = "Any agenda", selected = filters.agenda } (List.sortBy .name agendaStack)
        , viewSelect { label = "Haven", onSelect = FilterByHaven, anyName = "Any haven", selected = filters.haven } (List.sortBy .name havenStack)
        , span [ class "deck-index-filters__filter" ]
            [ label [ for "clan" ] [ text "Clans" ]
            , select [ name "clan", onInput (Clan.fromString >> FilterByClan) ]
                (option [ value "none" ] [ text "Any clan" ]
                    :: (Clan.all
                            |> List.map
                                (\clan ->
                                    option
                                        [ value <| Clan.toString clan
                                        , filters.clan
                                            |> Maybe.map ((==) clan)
                                            |> Maybe.withDefault False
                                            |> selected
                                        ]
                                        [ text <| Clan.name clan ]
                                )
                       )
                )
            ]
        , viewSelect { label = "Leader", onSelect = FilterByLeader, anyName = "Any leader", selected = filters.leader } (List.sortBy .name factionStack)
        ]


type alias SelectSettings msg =
    { label : String
    , onSelect : Maybe String -> msg
    , anyName : String
    , selected : Maybe String
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
                :: List.map
                    (\entry ->
                        option
                            [ value entry.id
                            , settings.selected
                                |> Maybe.map ((==) entry.id)
                                |> Maybe.withDefault False
                                |> selected
                            ]
                            [ text entry.name ]
                    )
                    entries
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
