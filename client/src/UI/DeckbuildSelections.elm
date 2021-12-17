module UI.DeckbuildSelections exposing (Model, Msg(..), init, update, view)

import Cards exposing (Card)
import Data.Clan exposing (Clan)
import Deck exposing (Decklist)
import Dict
import Html exposing (Html, div, h2, input, label, li, section, span, text, ul)
import Html.Attributes exposing (checked, class, classList, name, type_)
import Html.Events exposing (onClick)
import Html.Keyed as Keyed
import Html.Lazy as Lazy
import Shared exposing (Collection)
import UI.Attribute
import UI.Card
import UI.CardName
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


view : Collection -> (Msg -> msg) -> Model msg -> Decklist -> Html msg
view collection msg data decklist =
    section [ class "deckbuild-selections" ]
        [ Lazy.lazy3 viewHeader msg headerFilters data.showAllFilters
        , Lazy.lazy2 viewFilters msg data
        , Lazy.lazy3 viewHeader msg headerCards data.showCollectionImages
        , div [ class "deckbuild-selections__collection" ] <|
            if data.showCollectionImages then
                viewCardListImages collection msg data decklist

            else
                viewCardList collection msg data decklist
        ]



-----------------
-- FILTERS
-----------------


viewFilters : (Msg -> msg) -> Model msg -> Html msg
viewFilters msg data =
    div [ class "deckbuild-filters" ] <|
        (viewMainFilters msg data
            ++ (if data.showAllFilters then
                    viewSecondaryFilters msg data

                else
                    []
               )
        )


viewMainFilters : (Msg -> msg) -> Model msg -> List (Html msg)
viewMainFilters msg data =
    [ UI.FilterSelection.view (msg << FromStacksFilter) data.stackFilters
    , UI.FilterSelection.view (msg << FromPrimaryFilter) data.primaryFilters
    , UI.FilterSelection.view (msg << FromClansFilter) data.clansFilters
    ]


viewSecondaryFilters : (Msg -> msg) -> Model msg -> List (Html msg)
viewSecondaryFilters msg data =
    [ UI.FilterSelection.view (msg << FromSecondaryFilter) data.secondaryFilters
    , UI.FilterSelection.view (msg << FromAttackTypesFilter) data.attackTypeFilters
    , UI.FilterSelection.view (msg << FromDisciplinesFilter) data.disciplineFilters
    ]



-----------------
-- HEADERS
-----------------


type alias HeaderOptions =
    { title : String
    , primary :
        { action : Msg
        , toggleOnTxt : String
        , toggleOffTxt : String
        }
    , secondary :
        Maybe
            { action : Msg
            , text : String
            }
    }


headerFilters : HeaderOptions
headerFilters =
    { title = "Filters"
    , primary =
        { action = ToggleShowAllFilters
        , toggleOnTxt = "(hide filters)"
        , toggleOffTxt = "(show more)"
        }
    , secondary = Just { action = ClearFilters, text = "Clear filters" }
    }


headerCards : HeaderOptions
headerCards =
    { title = "Cards"
    , primary =
        { action = ToggleShowCollectionImages
        , toggleOnTxt = "(hide images)"
        , toggleOffTxt = "(show images)"
        }
    , secondary = Nothing
    }


viewHeader : (Msg -> msg) -> HeaderOptions -> Bool -> Html msg
viewHeader msg opts isToggleOn =
    div [ class "deckbuild-header" ]
        ([ h2 [ class "deckbuild-header__title" ] [ text opts.title ]
         , span
            [ class "deckbuild-header__action"
            , onClick (msg opts.primary.action)
            ]
            [ text <|
                if isToggleOn then
                    opts.primary.toggleOnTxt

                else
                    opts.primary.toggleOffTxt
            ]
         ]
            ++ (case opts.secondary of
                    Nothing ->
                        []

                    Just s ->
                        [ span
                            [ class "deckbuild-header__action"
                            , class "deckbuild-header__action--secondary"
                            , onClick (msg s.action)
                            ]
                            [ text s.text ]
                        ]
               )
        )


viewCardListImages : Collection -> (Msg -> msg) -> Model msg -> Decklist -> List (Html msg)
viewCardListImages collection msg data decklist =
    [ Keyed.ul [ class "deckbuild-selections__collectionitems--images" ] <|
        List.map (\c -> ( Cards.id c, viewCardListImage msg decklist c )) <|
            cardsToShow collection data
    ]


viewCardListImage : (Msg -> msg) -> Decklist -> Card -> Html msg
viewCardListImage msg deck card =
    li [ class "deckbuild-selections__collectionitem--image" ]
        [ UI.Card.lazy card
        , div [ class "deckbuild-selections__rowpiece_quant--image" ] [ viewQuantityPicker msg card (Deck.copiesInDeck deck card) ]
        ]


viewCardList : Collection -> (Msg -> msg) -> Model msg -> Decklist -> List (Html msg)
viewCardList collection msg data decklist =
    [ Keyed.ul [ class "deckbuild-selections__collectionitems--rows" ] <|
        List.map (\c -> ( Cards.id c, viewCardListRow msg decklist c )) <|
            cardsToShow collection data
    ]


viewCardListRow : (Msg -> msg) -> Decklist -> Card -> Html msg
viewCardListRow msg deck card =
    li [ class "cardlist__row" ]
        [ span [ class "cardlist__quant--row" ] [ viewQuantityPicker msg card (Deck.copiesInDeck deck card) ]
        , span [ class "cardlist__name" ] [ UI.CardName.withOverlay card ]
        , span [ class "cardlist__props" ]
            (case card of
                Cards.FactionCard props ->
                    [ span [ class "cardlist__clan" ] [ Icon.clan Icon.Negative props.clan ]
                    , span [] [ UI.Attribute.bloodPotency props.bloodPotency ]
                    , span [ class "cardlist__extra-prop" ] [ UI.Attribute.physical props.physical ]
                    , span [ class "cardlist__extra-prop" ] [ UI.Attribute.social props.social ]
                    , span [ class "cardlist__extra-prop" ] [ UI.Attribute.mental props.mental ]
                    , viewIconsList Icon.discipline props.disciplines
                    ]

                Cards.LibraryCard props ->
                    [ span [ class "cardlist__clan" ]
                        [ props.clan |> Maybe.map (Icon.clan Icon.Negative) |> Maybe.withDefault (text "")
                        ]
                    , span [] [ UI.Attribute.bloodPotencyRequirement props.bloodPotency ]
                    , span [ class "cardlist__extra-prop" ] [ UI.Attribute.damage props.damage ]
                    , span [ class "cardlist__extra-prop" ] [ UI.Attribute.shield props.shield ]
                    , viewIconsList Icon.attackType props.attackType
                    ]

                _ ->
                    []
            )
        ]


viewIconsList : (iconTypes -> Html msg) -> List iconTypes -> Html msg
viewIconsList viewIcon iconTypes =
    ul [ class "cardlist__extra-prop", class "char-icons-list" ]
        (iconTypes
            |> List.map
                (viewIcon
                    >> List.singleton
                    >> li [ class "char-icons-list__item" ]
                )
        )


viewQuantityPicker : (Msg -> msg) -> Card -> Int -> Html msg
viewQuantityPicker msg card copiesInDeck =
    div [ class "quantpick" ]
        (Cards.maxPerDeck card
            |> List.range 0
            |> List.map
                (\n ->
                    label
                        [ class "quantpick__option"
                        , classList [ ( "quantpick__option--active", n == copiesInDeck ) ]
                        ]
                        [ text <| String.fromInt n
                        , input
                            [ type_ "radio"
                            , name <| "count-" ++ Cards.id card
                            , checked <| n == copiesInDeck
                            , onClick <| msg <| ChangedDecklist ( card, n )
                            , class "quantpick__radio"
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
