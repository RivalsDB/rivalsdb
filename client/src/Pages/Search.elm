module Pages.Search exposing (Model, Msg, page)

import Cards exposing (Card)
import Data.Clan exposing (Clan)
import Data.Collection exposing (Collection)
import Data.Discipline exposing (Discipline)
import Data.Pack as Pack exposing (Pack)
import Dict
import Effect exposing (Effect)
import Fuzzy
import Gen.Params.Search exposing (Params)
import Html exposing (div, input, label, li, span, text)
import Html.Attributes exposing (class, spellcheck, type_)
import Html.Events exposing (onInput)
import Html.Keyed as Keyed
import Page
import Request
import Shared
import UI.Card
import UI.FilterSelection as Filter
import UI.Layout.Template
import UI.MultiSelect as MultiSelect
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
    , stackFilters : Filter.Model Cards.CardStack Never
    , cityFilters : Filter.Model Filter.City Never
    , primaryFilters : Filter.Model Filter.PrimaryTrait Never
    , secondaryFilters : Filter.Model Filter.SecondaryTrait Never
    , attackTypeFilters : Filter.Model Cards.AttackType Never
    , clansFilters : Filter.Model Clan Never
    , disciplineFilters : Filter.Model Discipline Never
    , packFilters : MultiSelect.Model Pack
    , textFilter : Maybe String
    }


init : Shared.Model -> ( Model, Effect Msg )
init shared =
    ( { collection = shared.collection
      , matches = matchesForQuery shared.collection shared.headerSearch
      , stackFilters = Filter.allStacks
      , cityFilters = Filter.city
      , primaryFilters = Filter.primaryTraits
      , secondaryFilters = Filter.secondaryTraits
      , attackTypeFilters = Filter.attackTypes
      , clansFilters = Filter.clans
      , disciplineFilters = Filter.disciplines
      , packFilters = MultiSelect.init Pack.list
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
    | FromStacksFilter (Filter.Msg Cards.CardStack)
    | FromCityFilter (Filter.Msg Filter.City)
    | FromPrimaryFilter (Filter.Msg Filter.PrimaryTrait)
    | FromSecondaryFilter (Filter.Msg Filter.SecondaryTrait)
    | FromAttackTypesFilter (Filter.Msg Cards.AttackType)
    | FromClansFilter (Filter.Msg Clan)
    | FromDisciplinesFilter (Filter.Msg Discipline)
    | FromPackFilter (MultiSelect.Msg Pack)
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
            ( { model | stackFilters = Filter.update subMsg model.stackFilters }, Effect.none )

        FromCityFilter subMsg ->
            ( { model | cityFilters = Filter.update subMsg model.cityFilters }, Effect.none )

        FromPrimaryFilter subMsg ->
            ( { model | primaryFilters = Filter.update subMsg model.primaryFilters }, Effect.none )

        FromSecondaryFilter subMsg ->
            ( { model | secondaryFilters = Filter.update subMsg model.secondaryFilters }, Effect.none )

        FromAttackTypesFilter subMsg ->
            ( { model | attackTypeFilters = Filter.update subMsg model.attackTypeFilters }, Effect.none )

        FromClansFilter subMsg ->
            ( { model | clansFilters = Filter.update subMsg model.clansFilters }, Effect.none )

        FromDisciplinesFilter subMsg ->
            ( { model | disciplineFilters = Filter.update subMsg model.disciplineFilters }, Effect.none )

        FromPackFilter subMsg ->
            ( { model | packFilters = MultiSelect.update subMsg model.packFilters }, Effect.none )



-- VIEW


view : Shared.Model -> Model -> View Msg
view shared model =
    let
        sortedCards =
            model.matches
                |> List.filter
                    (\card ->
                        matchTextFilter model card
                            && matchFilterSelections model card
                    )
                |> List.sortWith cardSort
    in
    UI.Layout.Template.view FromShared
        shared
        [ div [ class "searchpage__filters" ]
            [ UI.Text.header [ text "Filters" ]
            , div [ class "filter-group" ]
                ([ Just
                    (div [ class "filter-group__flags" ]
                        [ Html.map FromStacksFilter <| Filter.view model.stackFilters
                        ]
                    )
                 , if Filter.isCityEnabled model.stackFilters then
                    Just
                        (div [ class "filter-group__flags" ]
                            [ Html.map FromCityFilter <| Filter.view model.cityFilters
                            ]
                        )

                   else
                    Nothing
                 , Just
                    (div [ class "filter-group__flags" ]
                        [ Html.map FromPrimaryFilter <| Filter.view model.primaryFilters
                        ]
                    )
                 , Just
                    (div [ class "filter-group__flags" ]
                        [ Html.map FromSecondaryFilter <| Filter.view model.secondaryFilters
                        ]
                    )
                 , Just
                    (div [ class "filter-group__flags" ]
                        [ Html.map FromAttackTypesFilter <| Filter.view model.attackTypeFilters
                        ]
                    )
                 , Just
                    (div [ class "filter-group__flags" ]
                        [ Html.map FromClansFilter <| Filter.view model.clansFilters
                        ]
                    )
                 , Just
                    (div [ class "filter-group__flags" ]
                        [ Html.map FromDisciplinesFilter <| Filter.view model.disciplineFilters
                        ]
                    )
                 ]
                    |> List.filterMap identity
                )
            , div [ class "filter-group" ]
                [ label []
                    [ text "Card pack: "
                    , span [ class "search__pack" ]
                        [ Html.map FromPackFilter <| MultiSelect.autoSorted "Card Pack" model.packFilters
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


matchTextFilter : Model -> Card -> Bool
matchTextFilter model card =
    case model.textFilter of
        Just needle ->
            Cards.findTextInCard needle card

        Nothing ->
            True


matchFilterSelections : Model -> Card -> Bool
matchFilterSelections model card =
    Filter.isAllowedWide Filter.pickCity model.cityFilters card
        && Filter.isAllowedWide Filter.pickSecondaryTraits model.secondaryFilters card
        && Filter.isAllowedWide (Cards.stack >> List.singleton) model.stackFilters card
        && Filter.isAllowedWide Cards.discipline model.disciplineFilters card
        && Filter.isAllowedWide Filter.pickPrimaryTraits model.primaryFilters card
        && Filter.isAllowedWide Cards.clan model.clansFilters card
        && Filter.isAllowedWide Cards.attackTypes model.attackTypeFilters card
        && isPackAllowed model.packFilters card


isPackAllowed : MultiSelect.Model Pack -> Card -> Bool
isPackAllowed packSelection card =
    case MultiSelect.selected packSelection of
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
