module Pages.Search exposing (Model, Msg, page)

import Cards exposing (Card)
import Dict
import Effect exposing (Effect)
import Fuzzy
import Gen.Params.Search exposing (Params)
import Html exposing (..)
import Html.Attributes exposing (class, spellcheck, type_)
import Html.Events exposing (onInput)
import Html.Keyed as Keyed
import Page
import Request
import Shared exposing (Collection)
import UI.Card
import UI.FilterSelection
import UI.Layout.Header
import UI.Layout.Modal
import UI.Layout.Template
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.advanced
        { init = init shared.collection req
        , update = update
        , view = view shared
        , subscriptions = always Sub.none
        }


type alias Model =
    { matches : List Card
    , collection : Collection
    , header : UI.Layout.Header.Model
    , modal : UI.Layout.Modal.Model
    , stackFilters : UI.FilterSelection.Model Cards.CardStack Msg
    , primaryFilters : UI.FilterSelection.Model Cards.Trait Msg
    , secondaryFilters : UI.FilterSelection.Model Cards.Trait Msg
    , attackTypeFilters : UI.FilterSelection.Model Cards.AttackType Msg
    , clansFilters : UI.FilterSelection.Model Cards.Clan Msg
    , disciplineFilters : UI.FilterSelection.Model Cards.Discipline Msg
    , textFilter : Maybe String
    }


init : Collection -> Request.With Params -> ( Model, Effect Msg )
init collection req =
    let
        header =
            UI.Layout.Header.init req
    in
    ( { collection = collection
      , header = header
      , modal = UI.Layout.Modal.init
      , matches = matchesForQuery collection header.queryString
      , stackFilters = UI.FilterSelection.stacks
      , primaryFilters = UI.FilterSelection.primaryTraits
      , secondaryFilters = UI.FilterSelection.secondaryTraits
      , attackTypeFilters = UI.FilterSelection.attackTypes
      , clansFilters = UI.FilterSelection.clans
      , disciplineFilters = UI.FilterSelection.disciplines
      , textFilter = Nothing
      }
    , Effect.none
    )


matchesForQuery : Collection -> Maybe String -> List Card
matchesForQuery collection query =
    case query of
        Nothing ->
            Dict.values collection

        Just q ->
            Dict.keys collection |> fuzzySort q |> List.take 3 |> List.filterMap (\k -> Dict.get k collection)


fuzzySort : String -> List String -> List String
fuzzySort query items =
    let
        simpleMatch config separators needle hay =
            Fuzzy.match config separators needle hay |> .score
    in
    List.sortBy (simpleMatch [] [] query) items



-- UPDATE


type Msg
    = FromHeader UI.Layout.Header.Msg
    | FromModal UI.Layout.Modal.Msg
    | FromStacksFilter (UI.FilterSelection.Msg Cards.CardStack)
    | FromPrimaryFilter (UI.FilterSelection.Msg Cards.Trait)
    | FromSecondaryFilter (UI.FilterSelection.Msg Cards.Trait)
    | FromAttackTypesFilter (UI.FilterSelection.Msg Cards.AttackType)
    | FromClansFilter (UI.FilterSelection.Msg Cards.Clan)
    | FromDisciplinesFilter (UI.FilterSelection.Msg Cards.Discipline)
    | TextFilterChanged String


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case msg of
        TextFilterChanged text ->
            let
                cleanText =
                    text |> String.trim |> String.toLower
            in
            ( { model
                | textFilter =
                    if cleanText == "" then
                        Nothing

                    else
                        Just cleanText
              }
            , Effect.none
            )

        FromHeader subMsg ->
            UI.Layout.Header.update subMsg model.header
                |> Tuple.mapFirst
                    (\newHeader ->
                        { model
                            | header = newHeader
                            , matches = matchesForQuery model.collection newHeader.queryString
                        }
                    )

        FromModal subMsg ->
            UI.Layout.Modal.update subMsg model.modal
                |> Tuple.mapFirst (\newModal -> { model | modal = newModal })

        FromStacksFilter subMsg ->
            ( { model | stackFilters = UI.FilterSelection.update subMsg model.stackFilters }, Effect.none )

        FromPrimaryFilter subMsg ->
            ( { model | primaryFilters = UI.FilterSelection.update subMsg model.primaryFilters }, Effect.none )

        FromSecondaryFilter subMsg ->
            ( { model | secondaryFilters = UI.FilterSelection.update subMsg model.secondaryFilters }, Effect.none )

        FromAttackTypesFilter subMsg ->
            ( { model | attackTypeFilters = UI.FilterSelection.update subMsg model.attackTypeFilters }, Effect.none )

        FromClansFilter subMsg ->
            ( { model | clansFilters = UI.FilterSelection.update subMsg model.clansFilters }, Effect.none )

        FromDisciplinesFilter subMsg ->
            ( { model | disciplineFilters = UI.FilterSelection.update subMsg model.disciplineFilters }, Effect.none )



-- VIEW


view : Shared.Model -> Model -> View Msg
view shared model =
    let
        filter card =
            UI.FilterSelection.isAllowed Cards.traits model.secondaryFilters card
                && UI.FilterSelection.isAllowed Cards.stack model.stackFilters card
                && UI.FilterSelection.isAllowed Cards.discipline model.disciplineFilters card
                && UI.FilterSelection.isAllowed Cards.traits model.primaryFilters card
                && UI.FilterSelection.isAllowed Cards.clan model.clansFilters card
                && UI.FilterSelection.isAllowed Cards.attackTypes model.attackTypeFilters card

        filteredCards =
            case model.textFilter of
                Nothing ->
                    List.filter filter model.matches

                Just needle ->
                    List.filter (Cards.findTextInCard needle) model.matches
                        |> List.filter filter

        sortedCards =
            List.sortWith cardSort filteredCards
    in
    UI.Layout.Template.view FromHeader
        FromModal
        shared
        [ h2 [] [ text "Filters" ]
        , div [ class "search-flaggroups" ]
            [ div [ class "search-flaggroup" ] [ UI.FilterSelection.view FromStacksFilter model.stackFilters ]
            , div [ class "search-flaggroup" ] [ UI.FilterSelection.view FromPrimaryFilter model.primaryFilters ]
            , div [ class "search-flaggroup" ] [ UI.FilterSelection.view FromSecondaryFilter model.secondaryFilters ]
            , div [ class "search-flaggroup" ] [ UI.FilterSelection.view FromAttackTypesFilter model.attackTypeFilters ]
            , div [ class "search-flaggroup" ] [ UI.FilterSelection.view FromClansFilter model.clansFilters ]
            , div [ class "search-flaggroup" ] [ UI.FilterSelection.view FromDisciplinesFilter model.disciplineFilters ]
            ]
        , div [ class "search-text" ]
            [ label []
                [ text "Filter by text: "
                , input [ onInput TextFilterChanged, type_ "search", spellcheck False ] []
                ]
            ]
        , h3 [] [ text "Results" ]
        , Keyed.ul [ class "search-results" ] <|
            List.map (\card -> ( Cards.id card, li [ class "search-result" ] [ UI.Card.lazy card ] )) sortedCards
        ]


cardSort : Card -> Card -> Order
cardSort a b =
    let
        stack card =
            case card of
                Cards.AgendaCard _ ->
                    1

                Cards.HavenCard _ ->
                    2

                Cards.FactionCard _ ->
                    3

                Cards.LibraryCard _ ->
                    4
    in
    case compare (stack a) (stack b) of
        EQ ->
            case compare (Cards.bloodPotency a) (Cards.bloodPotency b) of
                EQ ->
                    compare (Cards.name a) (Cards.name b)

                ord ->
                    ord

        ord ->
            ord
