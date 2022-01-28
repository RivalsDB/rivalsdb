module Pages.Search exposing (Model, Msg, page)

import Cards exposing (Card)
import Data.Clan exposing (Clan)
import Data.Collection exposing (Collection)
import Data.Discipline exposing (Discipline)
import Data.Pack as Pack exposing (Pack)
import Data.Trait exposing (Trait)
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
import Shared
import UI.Card
import UI.FilterSelection
import UI.Layout.Template
import UI.MultiSelect
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


type alias Model =
    { matches : List Card
    , collection : Collection
    , stackFilters : UI.FilterSelection.Model Cards.CardStack Msg
    , primaryFilters : UI.FilterSelection.Model Trait Msg
    , secondaryFilters : UI.FilterSelection.Model Trait Msg
    , attackTypeFilters : UI.FilterSelection.Model Cards.AttackType Msg
    , clansFilters : UI.FilterSelection.Model Clan Msg
    , disciplineFilters : UI.FilterSelection.Model Discipline Msg
    , packFilters : UI.MultiSelect.Model Pack
    , textFilter : Maybe String
    }


init : Shared.Model -> ( Model, Effect Msg )
init shared =
    ( { collection = shared.collection
      , matches = matchesForQuery shared.collection shared.headerSearch
      , stackFilters = UI.FilterSelection.allStacks
      , primaryFilters = UI.FilterSelection.primaryTraits
      , secondaryFilters = UI.FilterSelection.secondaryTraits
      , attackTypeFilters = UI.FilterSelection.attackTypes
      , clansFilters = UI.FilterSelection.clans
      , disciplineFilters = UI.FilterSelection.disciplines
      , packFilters = UI.MultiSelect.init Pack.list
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
    = FromShared Shared.Msg
    | FromStacksFilter (UI.FilterSelection.Msg Cards.CardStack)
    | FromPrimaryFilter (UI.FilterSelection.Msg Trait)
    | FromSecondaryFilter (UI.FilterSelection.Msg Trait)
    | FromAttackTypesFilter (UI.FilterSelection.Msg Cards.AttackType)
    | FromClansFilter (UI.FilterSelection.Msg Clan)
    | FromDisciplinesFilter (UI.FilterSelection.Msg Discipline)
    | FromPackFilter (UI.MultiSelect.Msg Pack)
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

        FromShared subMsg ->
            ( model, Effect.fromShared subMsg )

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

        FromPackFilter subMsg ->
            ( { model | packFilters = UI.MultiSelect.update subMsg model.packFilters }, Effect.none )



-- VIEW


view : Shared.Model -> Model -> View Msg
view shared model =
    let
        filter card =
            UI.FilterSelection.isAllowed Cards.traits model.secondaryFilters card
                && UI.FilterSelection.isAllowed (Cards.stack >> List.singleton) model.stackFilters card
                && UI.FilterSelection.isAllowed Cards.discipline model.disciplineFilters card
                && UI.FilterSelection.isAllowed Cards.traits model.primaryFilters card
                && UI.FilterSelection.isAllowed Cards.clan model.clansFilters card
                && UI.FilterSelection.isAllowed Cards.attackTypes model.attackTypeFilters card
                && isPackAllowed model.packFilters card

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
    UI.Layout.Template.view FromShared
        shared
        [ div [ class "searchpage__filters" ]
            [ UI.Text.header [ text "Filters" ]
            , div [ class "filter-group" ]
                [ div [ class "filter-group__flags" ] [ UI.FilterSelection.view FromStacksFilter model.stackFilters ]
                , div [ class "filter-group__flags" ] [ UI.FilterSelection.view FromPrimaryFilter model.primaryFilters ]
                , div [ class "filter-group__flags" ] [ UI.FilterSelection.view FromSecondaryFilter model.secondaryFilters ]
                , div [ class "filter-group__flags" ] [ UI.FilterSelection.view FromAttackTypesFilter model.attackTypeFilters ]
                , div [ class "filter-group__flags" ] [ UI.FilterSelection.view FromClansFilter model.clansFilters ]
                , div [ class "filter-group__flags" ] [ UI.FilterSelection.view FromDisciplinesFilter model.disciplineFilters ]
                ]
            , div [ class "filter-group" ]
                [ label []
                    [ text "Card pack: "
                    , span [ class "search__pack" ]
                        [ UI.MultiSelect.autoSorted "Card Pack" FromPackFilter model.packFilters
                        ]
                    ]
                ]
            , div [ class "filter-group" ]
                [ div [ class "search-text" ]
                    [ label []
                        [ text "Card text: "
                        , input [ onInput TextFilterChanged, type_ "search", spellcheck False ] []
                        ]
                    ]
                ]
            ]
        , div [ class "searchpage__results" ]
            [ UI.Text.subheader [ text "Results" ]
            , Keyed.ul [ class "searchresults" ]
                (sortedCards
                    |> List.map
                        (\card ->
                            ( Cards.id card
                            , li [ class "searchresults__result" ] [ UI.Card.lazy card ]
                            )
                        )
                )
            ]
        ]


isPackAllowed : UI.MultiSelect.Model Pack -> Card -> Bool
isPackAllowed packSelection card =
    case UI.MultiSelect.selected packSelection of
        [] ->
            True

        allowedPacks ->
            List.member (Cards.set card) allowedPacks


cardSort : Card -> Card -> Order
cardSort a b =
    case compare (Cards.stackComparable a) (Cards.stackComparable b) of
        EQ ->
            case compare (Cards.bloodPotency a) (Cards.bloodPotency b) of
                EQ ->
                    compare (Cards.name a) (Cards.name b)

                ord ->
                    ord

        ord ->
            ord
