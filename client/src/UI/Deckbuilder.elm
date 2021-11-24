module UI.Deckbuilder exposing (Model, Msg(..), init, update, view)

import Cards exposing (Card)
import Clan exposing (Clan)
import Deck exposing (Decklist)
import Dict
import Html exposing (Html, div, h2, input, label, li, span, text)
import Html.Attributes exposing (checked, class, classList, name, type_)
import Html.Events exposing (onClick)
import Html.Keyed as Keyed
import Shared exposing (Collection)
import UI.Attribute
import UI.Card
import UI.FilterSelection
import UI.Icon as Icon


type alias Model msg =
    { stackFilters : UI.FilterSelection.Model Cards.CardStack msg
    , primaryFilters : UI.FilterSelection.Model Cards.Trait msg
    , secondaryFilters : UI.FilterSelection.Model Cards.Trait msg
    , attackTypeFilters : UI.FilterSelection.Model Cards.AttackType msg
    , clansFilters : UI.FilterSelection.Model Clan msg
    , disciplineFilters : UI.FilterSelection.Model Cards.Discipline msg
    , textFilter : Maybe String
    , showAllFilters : Bool
    , showCollectionImages : Bool
    }


init : Model msg
init =
    { stackFilters = UI.FilterSelection.stacks
    , primaryFilters = UI.FilterSelection.primaryTraits
    , secondaryFilters = UI.FilterSelection.secondaryTraits
    , attackTypeFilters = UI.FilterSelection.attackTypes
    , clansFilters = UI.FilterSelection.clans
    , disciplineFilters = UI.FilterSelection.disciplines
    , textFilter = Nothing
    , showAllFilters = False
    , showCollectionImages = False
    }


type Msg
    = ChangedDecklist ( Card, Int )
    | ClearFilters
    | FromAttackTypesFilter (UI.FilterSelection.Msg Cards.AttackType)
    | FromClansFilter (UI.FilterSelection.Msg Clan)
    | FromDisciplinesFilter (UI.FilterSelection.Msg Cards.Discipline)
    | FromPrimaryFilter (UI.FilterSelection.Msg Cards.Trait)
    | FromSecondaryFilter (UI.FilterSelection.Msg Cards.Trait)
    | FromStacksFilter (UI.FilterSelection.Msg Cards.CardStack)
    | ToggleShowAllFilters
    | ToggleShowCollectionImages


update : Msg -> Model msg -> Model msg
update msg model =
    case msg of
        FromStacksFilter subMsg ->
            { model | stackFilters = UI.FilterSelection.update subMsg model.stackFilters }

        FromPrimaryFilter subMsg ->
            { model | primaryFilters = UI.FilterSelection.update subMsg model.primaryFilters }

        FromSecondaryFilter subMsg ->
            { model | secondaryFilters = UI.FilterSelection.update subMsg model.secondaryFilters }

        FromAttackTypesFilter subMsg ->
            { model | attackTypeFilters = UI.FilterSelection.update subMsg model.attackTypeFilters }

        FromClansFilter subMsg ->
            { model | clansFilters = UI.FilterSelection.update subMsg model.clansFilters }

        FromDisciplinesFilter subMsg ->
            { model | disciplineFilters = UI.FilterSelection.update subMsg model.disciplineFilters }

        ClearFilters ->
            { model
                | stackFilters = UI.FilterSelection.stacks
                , primaryFilters = UI.FilterSelection.primaryTraits
                , secondaryFilters = UI.FilterSelection.secondaryTraits
                , attackTypeFilters = UI.FilterSelection.attackTypes
                , clansFilters = UI.FilterSelection.clans
                , disciplineFilters = UI.FilterSelection.disciplines
                , textFilter = Nothing
            }

        ToggleShowAllFilters ->
            { model | showAllFilters = not model.showAllFilters }

        ToggleShowCollectionImages ->
            { model | showCollectionImages = not model.showCollectionImages }

        ChangedDecklist _ ->
            model


view : Collection -> (Msg -> msg) -> Model msg -> Decklist -> List (Html msg)
view collection msg data decklist =
    [ div [ class "fltrhead" ]
        [ h2 [ class "fltrhead-name" ] [ text "Filters " ]
        , span [ onClick (msg ToggleShowAllFilters), class "fltrhead-primary", class "fltrhead-action" ]
            [ text <|
                if data.showAllFilters then
                    "(hide filters)"

                else
                    "(show more)"
            ]
        , span [ onClick (msg ClearFilters), class "fltrhead-secondary", class "fltrhead-action" ] [ text "Clear filters" ]
        ]
    , div [ class "deckbldr-filters" ] <|
        List.intersperse (text " ")
            (viewMainFilters msg data
                ++ (if data.showAllFilters then
                        viewSecondaryFilters msg data

                    else
                        []
                   )
            )
    , div [ class "fltrhead" ]
        [ h2 [ class "fltrhead-name" ] [ text "Cards " ]
        , span [ onClick (msg ToggleShowCollectionImages), class "fltrhead-primary", class "fltrhead-action" ]
            [ text <|
                if data.showCollectionImages then
                    "(hide images)"

                else
                    "(show images)"
            ]
        ]
    , div [ class "deckbldr-collection" ] <|
        if data.showCollectionImages then
            viewCardListImages collection msg data decklist

        else
            viewCardList collection msg data decklist
    ]


viewMainFilters : (Msg -> msg) -> Model msg -> List (Html msg)
viewMainFilters msg data =
    [ div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view (msg << FromStacksFilter) data.stackFilters ]
    , div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view (msg << FromPrimaryFilter) data.primaryFilters ]
    , div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view (msg << FromClansFilter) data.clansFilters ]
    ]


viewSecondaryFilters : (Msg -> msg) -> Model msg -> List (Html msg)
viewSecondaryFilters msg data =
    [ div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view (msg << FromSecondaryFilter) data.secondaryFilters ]
    , div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view (msg << FromAttackTypesFilter) data.attackTypeFilters ]
    , div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view (msg << FromDisciplinesFilter) data.disciplineFilters ]
    ]


viewCardListImages : Collection -> (Msg -> msg) -> Model msg -> Decklist -> List (Html msg)
viewCardListImages collection msg data decklist =
    [ Keyed.ul [ class "deckbldr-collectionitems--images" ] <|
        List.map (\c -> ( Cards.id c, viewCardListImage msg decklist c )) <|
            cardsToShow collection data
    ]


viewCardListImage : (Msg -> msg) -> Decklist -> Card -> Html msg
viewCardListImage msg deck card =
    li [ class "deckbldr-collectionitem--image" ]
        [ UI.Card.lazy card
        , div [ class "deckbldr-rowpiece_quant--image" ] [ viewQuantityPicker msg card (Deck.copiesInDeck deck card) ]
        ]


viewCardList : Collection -> (Msg -> msg) -> Model msg -> Decklist -> List (Html msg)
viewCardList collection msg data decklist =
    [ Keyed.ul [ class "deckbldr-collectionitems--rows" ] <|
        List.map (\c -> ( Cards.id c, viewCardListRow msg decklist c )) <|
            cardsToShow collection data
    ]


viewCardListRow : (Msg -> msg) -> Decklist -> Card -> Html msg
viewCardListRow msg deck card =
    li [ class "deckbldr-collectionitem--row" ]
        [ span [ class "deckbldr-rowpiece_quant--row" ] [ viewQuantityPicker msg card (Deck.copiesInDeck deck card) ]
        , span [ class "deckbldr-rowpiece_name" ] [ text <| Cards.name card ]
        , span [ class "deckbldr-rowpiece_props" ]
            (case card of
                Cards.FactionCard props ->
                    [ span [ class "deckbldr-rowpiece_clan" ] [ Icon.clan Icon.Negative props.clan ]
                    , span [ class "deckbldr-rowpiece_bp" ] [ UI.Attribute.bloodPotency props.bloodPotency ]
                    , span [ class "deckbldr-rowpiece_physical" ] [ UI.Attribute.physical props.physical ]
                    , span [ class "deckbldr-rowpiece_social" ] [ UI.Attribute.social props.social ]
                    , span [ class "deckbldr-rowpiece_mental" ] [ UI.Attribute.mental props.mental ]
                    , span [ class "deckbldr-rowpiece_disciplines" ]
                        (props.disciplines
                            |> List.map (span [ class "deckbldr-rowpiece_discipline" ] << List.singleton << Icon.discipline)
                        )
                    ]

                Cards.LibraryCard props ->
                    [ span [ class "deckbldr-rowpiece_clan" ]
                        [ props.clan |> Maybe.map (Icon.clan Icon.Negative) |> Maybe.withDefault (text "")
                        ]
                    , span [ class "deckbldr-rowpiece_bp" ] [ UI.Attribute.bloodPotencyRequirement props.bloodPotency ]
                    , span [ class "deckbldr-rowpiece_damage" ] [ UI.Attribute.damage props.damage ]
                    , span [ class "deckbldr-rowpiece_shields" ] [ UI.Attribute.shield props.shield ]
                    , span [ class "deckbldr-rowpiece_types" ]
                        (props.attackType
                            |> List.map (span [ class "deckbldr-rowpiece_type" ] << List.singleton << Icon.attackType)
                        )
                    ]

                _ ->
                    []
            )
        ]


viewQuantityPicker : (Msg -> msg) -> Card -> Int -> Html msg
viewQuantityPicker msg card copiesInDeck =
    div [ class "quantpick", class ("quantpick--" ++ (String.fromInt <| Cards.maxPerDeck card)) ] <|
        (Cards.maxPerDeck card
            |> List.range 0
            |> List.map
                (\n ->
                    label
                        [ class "quantpick-option"
                        , classList [ ( "quantpick-option--active", n == copiesInDeck ) ]
                        ]
                        [ text <| String.fromInt n
                        , input
                            [ type_ "radio"
                            , name <| "count-" ++ Cards.id card
                            , checked <| n == copiesInDeck
                            , onClick <| msg <| ChangedDecklist ( card, n )
                            ]
                            []
                        ]
                )
        )


cardsToShow : Collection -> Model msg -> List Card
cardsToShow collection data =
    filteredCards collection data |> List.sortWith cardSort


filteredCards : Collection -> Model msg -> List Card
filteredCards collection data =
    let
        cards =
            Dict.values collection
    in
    case data.textFilter of
        Nothing ->
            List.filter (filterFlags data) cards

        Just needle ->
            List.filter (Cards.findTextInCard needle) cards
                |> List.filter (filterFlags data)


filterFlags : Model msg -> Card -> Bool
filterFlags data card =
    UI.FilterSelection.isAllowed Cards.clanRequirement data.clansFilters card
        && UI.FilterSelection.isAllowed Cards.traits data.secondaryFilters card
        && UI.FilterSelection.isAllowed Cards.stack data.stackFilters card
        && UI.FilterSelection.isAllowed Cards.discipline data.disciplineFilters card
        && UI.FilterSelection.isAllowed Cards.traits data.primaryFilters card
        && UI.FilterSelection.isAllowed Cards.attackTypes data.attackTypeFilters card


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
            compare (Cards.name a) (Cards.name b)

        ord ->
            ord
