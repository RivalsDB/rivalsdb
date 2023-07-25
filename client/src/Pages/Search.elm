module Pages.Search exposing (Model, Msg, page)

import Cards exposing (Card)
import Data.Collection exposing (Collection)
import Data.Pack as Pack exposing (Pack)
import Dict
import Effect exposing (Effect)
import Fuzzy
import Gen.Params.Search exposing (Params)
import Html exposing (div, input, label, li, span, text)
import Html.Attributes exposing (class, spellcheck, type_)
import Html.Events exposing (onInput)
import Html.Keyed as Keyed
import Html.Lazy as Lazy
import Page
import Request
import Shared
import UI.Card
import UI.FilterSelection as FS
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
    { collection : Collection
    , stackFilters : FS.AllStacks
    , cityFilters : FS.Cities
    , monsterFilters : FS.MonsterSacks
    , primaryFilters : FS.PrimaryTraits
    , secondaryFilters : FS.SecondaryTraits
    , attackTypeFilters : FS.AttackTypes
    , clansFilters : FS.Clans
    , disciplineFilters : FS.Disciplines
    , packFilters : MultiSelect.Model Pack
    , textFilter : Maybe String
    }


init : Shared.Model -> ( Model, Effect Msg )
init shared =
    ( { collection = shared.collection
      , stackFilters = FS.cleanAllStacks
      , cityFilters = FS.cleanCities
      , monsterFilters = cleanMonster
      , primaryFilters = FS.cleanPrimaryTraits
      , secondaryFilters = FS.cleanSecondaryTraits
      , attackTypeFilters = FS.cleanAttackTypes
      , clansFilters = FS.cleanClans
      , disciplineFilters = FS.cleanDisciplines
      , packFilters = MultiSelect.init Pack.list
      , textFilter = Nothing
      }
    , Effect.none
    )

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
    | FromStacksFilter (FS.Msg FS.AllStacks)
    | FromCityFilter (FS.Msg FS.Cities)
    | FromMonsterFilter (FS.Msg FS.Cities)
    | FromPrimaryFilter (FS.Msg FS.PrimaryTraits)
    | FromSecondaryFilter (FS.Msg FS.SecondaryTraits)
    | FromAttackTypesFilter (FS.Msg FS.AttackTypes)
    | FromClansFilter (FS.Msg FS.Clans)
    | FromDisciplinesFilter (FS.Msg FS.Disciplines)
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
            ( { model | stackFilters = FS.update subMsg model.stackFilters }, Effect.none )

        FromCityFilter subMsg ->
            ( { model | cityFilters = FS.update subMsg model.cityFilters }, Effect.none )
        
        FromMonsterFilter subMsg ->
            ( { model | monsterFilters = FS.update subMsg model.monsterFilters }, Effect.none )

        FromPrimaryFilter subMsg ->
            ( { model | primaryFilters = FS.update subMsg model.primaryFilters }, Effect.none )

        FromSecondaryFilter subMsg ->
            ( { model | secondaryFilters = FS.update subMsg model.secondaryFilters }, Effect.none )

        FromAttackTypesFilter subMsg ->
            ( { model | attackTypeFilters = FS.update subMsg model.attackTypeFilters }, Effect.none )

        FromClansFilter subMsg ->
            ( { model | clansFilters = FS.update subMsg model.clansFilters }, Effect.none )

        FromDisciplinesFilter subMsg ->
            ( { model | disciplineFilters = FS.update subMsg model.disciplineFilters }, Effect.none )

        FromPackFilter subMsg ->
            ( { model | packFilters = MultiSelect.update subMsg model.packFilters }, Effect.none )



-- VIEW


view : Shared.Model -> Model -> View Msg
view shared model =
    let
        sortedCards =
            Dict.values shared.collection
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
                (List.concat
                    [ [ div [ class "filter-group__flags" ]
                            [ Html.map FromStacksFilter <| Lazy.lazy FS.viewAllStacks model.stackFilters
                            ]
                      ]
                    , if model.stackFilters.city then
                        [ div [ class "filter-group__flags" ]
                            [ Html.map FromCityFilter <| Lazy.lazy FS.viewCities model.cityFilters
                            ]
                        ]

                      else
                        []
                    , [ div [ class "filter-group__flags" ]
                            [ Html.map FromPrimaryFilter <| Lazy.lazy FS.viewPrimaryTraits model.primaryFilters
                            ]
                      , div [ class "filter-group__flags" ]
                            [ Html.map FromSecondaryFilter <| Lazy.lazy FS.viewSecondaryTraits model.secondaryFilters
                            ]
                      , div [ class "filter-group__flags" ]
                            [ Html.map FromAttackTypesFilter <| Lazy.lazy FS.viewAttackTypes model.attackTypeFilters
                            ]
                      , div [ class "filter-group__flags" ]
                            [ Html.map FromClansFilter <| Lazy.lazy FS.viewClans model.clansFilters
                            ]
                      , div [ class "filter-group__flags" ]
                            [ Html.map FromDisciplinesFilter <| Lazy.lazy FS.viewDisciplines model.disciplineFilters
                            ]
                      , div [ class "filter-group__flags" ]
                            [ Html.map FromMonsterFilter <| Lazy.lazy FS.viewMonsters model.monsterFilters
                            ]
                      ]
                    ]
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
    FS.cityIsAllowedWide model.cityFilters card
        && FS.monsterIsAllowedWide model.monsterFilters card
        && FS.secondaryTraitsIsAllowedWide model.secondaryFilters card
        && FS.allStackIsAllowedWide model.stackFilters card
        && FS.disciplineIsAllowedWide model.disciplineFilters card
        && FS.primaryTraitsIsAllowedWide model.primaryFilters card
        && FS.clanIsAllowedWide model.clansFilters card
        && FS.attackTypeIsAllowedWide model.attackTypeFilters card
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
