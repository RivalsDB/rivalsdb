module Pages.Build exposing (Model, Msg, page)

import Cards
import Gen.Params.Build exposing (Params)
import Html exposing (..)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Page
import Request
import Shared exposing (Collection)
import UI.FilterSelection
import UI.Layout.Header
import UI.Layout.Template
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.element
        { init = init shared.collection req
        , update = update
        , view = view
        , subscriptions = always Sub.none
        }



-- INIT


type alias Model =
    { collection : Collection
    , header : UI.Layout.Header.Model
    , stackFilters : UI.FilterSelection.Model Cards.CardStack Msg
    , primaryFilters : UI.FilterSelection.Model Cards.Trait Msg
    , secondaryFilters : UI.FilterSelection.Model Cards.Trait Msg
    , attackTypeFilters : UI.FilterSelection.Model Cards.AttackType Msg
    , clansFilters : UI.FilterSelection.Model Cards.Clan Msg
    , disciplineFilters : UI.FilterSelection.Model Cards.Discipline Msg
    , textFilter : Maybe String
    , showAllFilters : Bool
    , showCollectionImages : Bool
    }


init : Collection -> Request.With Params -> ( Model, Cmd Msg )
init collection req =
    ( { collection = collection
      , header = UI.Layout.Header.init req
      , stackFilters = UI.FilterSelection.stacks
      , primaryFilters = UI.FilterSelection.primaryTraits
      , secondaryFilters = UI.FilterSelection.secondaryTraits
      , attackTypeFilters = UI.FilterSelection.attackTypes
      , clansFilters = UI.FilterSelection.clans
      , disciplineFilters = UI.FilterSelection.disciplines
      , textFilter = Nothing
      , showAllFilters = False
      , showCollectionImages = False
      }
    , Cmd.none
    )


type Msg
    = FromHeader UI.Layout.Header.Msg
    | FromStacksFilter (UI.FilterSelection.Msg Cards.CardStack)
    | FromPrimaryFilter (UI.FilterSelection.Msg Cards.Trait)
    | FromSecondaryFilter (UI.FilterSelection.Msg Cards.Trait)
    | FromAttackTypesFilter (UI.FilterSelection.Msg Cards.AttackType)
    | FromClansFilter (UI.FilterSelection.Msg Cards.Clan)
    | FromDisciplinesFilter (UI.FilterSelection.Msg Cards.Discipline)
    | TextFilterChanged String
    | ToggleShowAllFilters
    | ClearFilters
    | ToggleShowCollectionImages


update : Msg -> Model -> ( Model, Cmd Msg )
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
            , Cmd.none
            )

        FromHeader subMsg ->
            UI.Layout.Header.update subMsg model.header
                |> Tuple.mapFirst (\newHeader -> { model | header = newHeader })

        FromStacksFilter subMsg ->
            ( { model | stackFilters = UI.FilterSelection.update subMsg model.stackFilters }, Cmd.none )

        FromPrimaryFilter subMsg ->
            ( { model | primaryFilters = UI.FilterSelection.update subMsg model.primaryFilters }, Cmd.none )

        FromSecondaryFilter subMsg ->
            ( { model | secondaryFilters = UI.FilterSelection.update subMsg model.secondaryFilters }, Cmd.none )

        FromAttackTypesFilter subMsg ->
            ( { model | attackTypeFilters = UI.FilterSelection.update subMsg model.attackTypeFilters }, Cmd.none )

        FromClansFilter subMsg ->
            ( { model | clansFilters = UI.FilterSelection.update subMsg model.clansFilters }, Cmd.none )

        FromDisciplinesFilter subMsg ->
            ( { model | disciplineFilters = UI.FilterSelection.update subMsg model.disciplineFilters }, Cmd.none )

        ClearFilters ->
            ( { model
                | stackFilters = UI.FilterSelection.stacks
                , primaryFilters = UI.FilterSelection.primaryTraits
                , secondaryFilters = UI.FilterSelection.secondaryTraits
                , attackTypeFilters = UI.FilterSelection.attackTypes
                , clansFilters = UI.FilterSelection.clans
                , disciplineFilters = UI.FilterSelection.disciplines
                , textFilter = Nothing
              }
            , Cmd.none
            )

        ToggleShowAllFilters ->
            ( { model | showAllFilters = not model.showAllFilters }, Cmd.none )

        ToggleShowCollectionImages ->
            ( { model | showCollectionImages = not model.showCollectionImages }, Cmd.none )


view : Model -> View Msg
view model =
    UI.Layout.Template.view FromHeader
        [ div [ class "deckbldr" ]
            [ div [ class "deckbldr-actions" ] []
            , div [ class "deckbldr-decklist" ] []
            , div [ class "deckbldr-choices" ]
                [ div [ class "deckbldr-filtersheader" ]
                    [ h2 [] [ text "Filters " ]
                    , span [ onClick ToggleShowAllFilters ]
                        [ text <|
                            if model.showAllFilters then
                                "(hide filters)"

                            else
                                "(show more)"
                        ]
                    , span [ onClick ClearFilters ] [ text "Clear filters" ]
                    ]
                , div [ class "deckbldr-filters" ] <|
                    List.intersperse (text " ")
                        (mainFilters model
                            ++ (if model.showAllFilters then
                                    secondaryFilters model

                                else
                                    []
                               )
                        )
                , div [ class "deckbldr-collectionheader" ]
                    [ h2 [] [ text "Cards " ]
                    , span [ onClick ToggleShowCollectionImages ]
                        [ text <|
                            if model.showCollectionImages then
                                "(hide images)"

                            else
                                "(show images)"
                        ]
                    ]
                , div [ class "deckbldr-collection" ] <| []
                ]
            ]
        ]


mainFilters : Model -> List (Html Msg)
mainFilters model =
    [ div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view FromStacksFilter model.stackFilters ]
    , div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view FromPrimaryFilter model.primaryFilters ]
    , div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view FromClansFilter model.clansFilters ]
    ]


secondaryFilters : Model -> List (Html Msg)
secondaryFilters model =
    [ div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view FromSecondaryFilter model.secondaryFilters ]
    , div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view FromAttackTypesFilter model.attackTypeFilters ]
    , div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view FromDisciplinesFilter model.disciplineFilters ]
    ]
