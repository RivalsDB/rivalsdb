module Pages.Build exposing (Model, Msg, page)

import Cards exposing (Card)
import Dict
import Gen.Params.Build exposing (Params)
import Html exposing (..)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Html.Keyed as Keyed
import Page
import Request
import Shared exposing (Collection)
import UI.Card
import UI.FilterSelection
import UI.Icon
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
            [ div [ class "deckbldr-actions" ]
                [ div [] [ p [] [ text "Save" ] ]
                ]
            , div [ class "deckbldr-decklist" ]
                [ h3 [] [ text "Coming soon" ]
                ]
            , div [ class "deckbldr-choices" ]
                [ div [ class "fltrhead" ]
                    [ h2 [ class "fltrhead-name" ] [ text "Filters " ]
                    , span [ onClick ToggleShowAllFilters, class "fltrhead-primary" ]
                        [ text <|
                            if model.showAllFilters then
                                "(hide filters)"

                            else
                                "(show more)"
                        ]
                    , span [ onClick ClearFilters, class "fltrhead-secondary" ] [ text "Clear filters" ]
                    ]
                , div [ class "deckbldr-filters" ] <|
                    List.intersperse (text " ")
                        (viewMainFilters model
                            ++ (if model.showAllFilters then
                                    viewSecondaryFilters model

                                else
                                    []
                               )
                        )
                , div [ class "fltrhead" ]
                    [ h2 [ class "fltrhead-name" ] [ text "Cards " ]
                    , span [ onClick ToggleShowCollectionImages, class "fltrhead-primary" ]
                        [ text <|
                            if model.showCollectionImages then
                                "(hide images)"

                            else
                                "(show images)"
                        ]
                    ]
                , div [ class "deckbldr-collection" ] <|
                    if model.showCollectionImages then
                        viewCardListImages model

                    else
                        viewCardList model
                ]
            ]
        ]


viewMainFilters : Model -> List (Html Msg)
viewMainFilters model =
    [ div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view FromStacksFilter model.stackFilters ]
    , div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view FromPrimaryFilter model.primaryFilters ]
    , div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view FromClansFilter model.clansFilters ]
    ]


viewSecondaryFilters : Model -> List (Html Msg)
viewSecondaryFilters model =
    [ div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view FromSecondaryFilter model.secondaryFilters ]
    , div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view FromAttackTypesFilter model.attackTypeFilters ]
    , div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view FromDisciplinesFilter model.disciplineFilters ]
    ]


viewCardList : Model -> List (Html Msg)
viewCardList model =
    [ Keyed.ul [ class "deckbldr-collectionitems--rows" ] <|
        List.map (\c -> ( Cards.id c, viewCardListRow c )) <|
            cardsToShow model
    ]


viewCardListRow : Card -> Html Msg
viewCardListRow card =
    li [ class "deckbldr-collectionitem--row" ]
        [ span [ class "deckbldr-rowpiece_quant--row" ] [ viewQuantityPicker card ]
        , span [ class "deckbldr-rowpiece_name" ] [ text <| Cards.name card ]
        , span [ class "deckbldr-rowpiece_props" ]
            (case card of
                Cards.FactionCard props ->
                    [ span [ class "deckbldr-rowpiece_clan" ] [ UI.Icon.clan props.clan ]
                    , span [ class "deckbldr-rowpiece_bp" ] [ text <| String.fromInt props.bloodPotency ]
                    , span [ class "deckbldr-rowpiece_physical" ] [ text <| String.fromInt props.physical ]
                    , span [ class "deckbldr-rowpiece_social" ] [ text <| String.fromInt props.social ]
                    , span [ class "deckbldr-rowpiece_mental" ] [ text <| String.fromInt props.mental ]
                    , span [ class "deckbldr-rowpiece_disciplines" ] <|
                        List.map (\d -> span [ class "deckbldr-rowpiece_discipline" ] [ UI.Icon.discipline d ]) props.disciplines
                    ]

                Cards.LibraryCard props ->
                    [ span [ class "deckbldr-rowpiece_clan" ]
                        [ props.clan |> Maybe.map UI.Icon.clan |> Maybe.withDefault (text "")
                        ]
                    , span [ class "deckbldr-rowpiece_bp" ]
                        [ props.bloodPotency |> Maybe.map String.fromInt |> Maybe.withDefault "" |> text
                        ]
                    , span [ class "deckbldr-rowpiece_damage" ]
                        [ props.damage |> Maybe.map String.fromInt |> Maybe.withDefault "" |> text
                        ]
                    , span [ class "deckbldr-rowpiece_shields" ]
                        [ props.shield |> Maybe.map String.fromInt |> Maybe.withDefault "" |> text
                        ]
                    , span [ class "deckbldr-rowpiece_types" ] <|
                        List.map (\a -> span [ class "deckbldr-rowpiece_type" ] [ UI.Icon.attackType a ]) props.attackType
                    ]

                _ ->
                    []
            )
        ]


viewQuantityPicker : Card -> Html Msg
viewQuantityPicker card =
    div [ class "quantpick", class ("quantpick--" ++ (String.fromInt <| Cards.maxPerDeck card)) ] <|
        (Cards.maxPerDeck card |> List.range 0 |> List.map (\n -> button [] [ text <| String.fromInt n ]))


viewCardListImages : Model -> List (Html Msg)
viewCardListImages model =
    [ Keyed.ul [ class "deckbldr-collectionitems--images" ] <|
        List.map (\c -> ( Cards.id c, viewCardListImage c )) <|
            cardsToShow model
    ]


viewCardListImage : Card -> Html Msg
viewCardListImage card =
    li [ class "deckbldr-collectionitem--image" ]
        [ UI.Card.lazy card
        , div [ class "deckbldr-rowpiece_quant--image" ] [ viewQuantityPicker card ]
        ]


cardsToShow : Model -> List Card
cardsToShow model =
    filteredCards model |> List.sortWith cardSort


filteredCards : Model -> List Card
filteredCards model =
    let
        cards =
            Dict.values model.collection

        filterFlags card =
            UI.FilterSelection.isAllowed Cards.traits model.secondaryFilters card
                && UI.FilterSelection.isAllowed Cards.stack model.stackFilters card
                && UI.FilterSelection.isAllowed Cards.discipline model.disciplineFilters card
                && UI.FilterSelection.isAllowed Cards.traits model.primaryFilters card
                && UI.FilterSelection.isAllowed Cards.clanRequirement model.clansFilters card
                && UI.FilterSelection.isAllowed Cards.attackTypes model.attackTypeFilters card
    in
    case model.textFilter of
        Nothing ->
            List.filter filterFlags cards

        Just needle ->
            List.filter (Cards.findTextInCard needle) cards
                |> List.filter filterFlags


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