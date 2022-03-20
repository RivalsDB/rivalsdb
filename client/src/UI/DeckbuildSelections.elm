module UI.DeckbuildSelections exposing (Model, Msg(..), init, update, view)

import Cards exposing (Card)
import Data.Clan exposing (Clan)
import Data.Collection exposing (Collection)
import Data.Deck exposing (Decklist)
import Data.Discipline exposing (Discipline)
import Data.Pack as Pack exposing (Pack)
import Data.Trait exposing (Trait)
import Dict
import Effect exposing (Effect)
import Html exposing (Html, div, h2, input, label, li, nav, ol, section, span, text, ul)
import Html.Attributes exposing (class, classList, spellcheck, type_)
import Html.Events exposing (onClick, onInput)
import Html.Keyed as Keyed
import Html.Lazy as Lazy
import Port.Event
import UI.Attribute
import UI.Card
import UI.CardName
import UI.FilterSelection
import UI.Icon as Icon
import UI.Icon.V2
import UI.MultiSelect as MultiSelect
import UI.QuantityPicker


type Tab
    = Editor
    | Description


type alias Model =
    { activeTab : Tab
    , attackTypeFilters : UI.FilterSelection.Model Cards.AttackType Never
    , clansFilters : UI.FilterSelection.Model Clan Never
    , disciplineFilters : UI.FilterSelection.Model Discipline Never
    , packFilters : MultiSelect.Model Pack
    , primaryFilters : UI.FilterSelection.Model Trait Never
    , secondaryFilters : UI.FilterSelection.Model Trait Never
    , showAllFilters : Bool
    , showCollectionImages : Bool
    , stackFilters : UI.FilterSelection.Model Cards.CardStack Never
    , textFilter : Maybe String
    }


init : Model
init =
    { stackFilters = UI.FilterSelection.playerStacks
    , primaryFilters = UI.FilterSelection.primaryTraits
    , secondaryFilters = UI.FilterSelection.secondaryTraits
    , attackTypeFilters = UI.FilterSelection.attackTypes
    , clansFilters = UI.FilterSelection.clans
    , disciplineFilters = UI.FilterSelection.disciplines
    , packFilters = MultiSelect.init Pack.list
    , textFilter = Nothing
    , showAllFilters = False
    , showCollectionImages = False
    , activeTab = Editor
    }


type Msg
    = ChangedDecklist ( Card, Int )
    | ClearFilters
    | FromAttackTypesFilter (UI.FilterSelection.Msg Cards.AttackType)
    | FromClansFilter (UI.FilterSelection.Msg Clan)
    | FromDisciplinesFilter (UI.FilterSelection.Msg Discipline)
    | FromPrimaryFilter (UI.FilterSelection.Msg Trait)
    | FromSecondaryFilter (UI.FilterSelection.Msg Trait)
    | FromStacksFilter (UI.FilterSelection.Msg Cards.CardStack)
    | FromPackFilter (MultiSelect.Msg Pack)
    | ToggleShowAllFilters
    | ToggleShowCollectionImages
    | TextFilterChanged String
    | ActivateTab Tab


update : Msg -> Model -> ( Model, Effect msg )
update msg model =
    case msg of
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
            ( { model | packFilters = MultiSelect.update subMsg model.packFilters }, Effect.none )

        ClearFilters ->
            ( { model
                | stackFilters = UI.FilterSelection.playerStacks
                , primaryFilters = UI.FilterSelection.primaryTraits
                , secondaryFilters = UI.FilterSelection.secondaryTraits
                , attackTypeFilters = UI.FilterSelection.attackTypes
                , clansFilters = UI.FilterSelection.clans
                , disciplineFilters = UI.FilterSelection.disciplines
                , packFilters = MultiSelect.init Pack.list
                , textFilter = Nothing
              }
            , Effect.fromCmd <| Port.Event.track Port.Event.BuilderClearFilters
            )

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

        ToggleShowAllFilters ->
            let
                newShowAllFilters =
                    not model.showAllFilters
            in
            ( { model | showAllFilters = newShowAllFilters }
            , Effect.fromCmd <|
                Port.Event.track
                    (if newShowAllFilters then
                        Port.Event.BuilderShowAllFilters

                     else
                        Port.Event.BuilderHideAllFilters
                    )
            )

        ToggleShowCollectionImages ->
            let
                newShowCollectionImages =
                    not model.showCollectionImages
            in
            ( { model | showCollectionImages = newShowCollectionImages }
            , Effect.fromCmd
                (Port.Event.track
                    (if newShowCollectionImages then
                        Port.Event.BuilderShowImages

                     else
                        Port.Event.BuilderHideImages
                    )
                )
            )

        ChangedDecklist _ ->
            ( model, Effect.none )

        ActivateTab tab ->
            ( { model | activeTab = tab }, Effect.none )


view : Collection -> Model -> Decklist -> Html Msg
view playerCardsCollection model decklist =
    div []
        [ nav [] [ viewTabs model.activeTab ]
        , section [ class "deckbuild-selections" ]
            [ Lazy.lazy2 viewHeader headerFilters model.showAllFilters
            , Lazy.lazy viewFilters model
            , Lazy.lazy2 viewHeader headerCards model.showCollectionImages
            , div [ class "deckbuild-selections__collection" ] <|
                [ if model.showCollectionImages then
                    viewCardListImages playerCardsCollection model decklist

                  else
                    viewCardList playerCardsCollection model decklist
                ]
            ]
        ]


viewTabs : Tab -> Html Msg
viewTabs activeTab =
    ol [ class "deckbuild-tabs" ]
        [ li
            [ classList
                [ ( "deckbuild-tabs__tab", True )
                , ( "deckbuild-tabs__tab--active", activeTab == Editor )
                ]
            ]
            [ text "Editor" ]
        , li
            [ classList
                [ ( "deckbuild-tabs__tab", True )
                , ( "deckbuild-tabs__tab--active", activeTab == Description )
                ]
            ]
            [ text "Description" ]
        ]



-----------------
-- FILTERS
-----------------


viewFilters : Model -> Html Msg
viewFilters data =
    div [ class "deckbuild-filters" ] <|
        (viewMainFilters data
            ++ (if data.showAllFilters then
                    viewSecondaryFilters data

                else
                    []
               )
        )


viewMainFilters : Model -> List (Html Msg)
viewMainFilters data =
    [ Html.map FromStacksFilter <| UI.FilterSelection.view data.stackFilters
    , Html.map FromPrimaryFilter <| UI.FilterSelection.view data.primaryFilters
    , Html.map FromClansFilter <| UI.FilterSelection.view data.clansFilters
    ]


viewSecondaryFilters : Model -> List (Html Msg)
viewSecondaryFilters data =
    [ Html.map FromSecondaryFilter <| UI.FilterSelection.view data.secondaryFilters
    , Html.map FromAttackTypesFilter <| UI.FilterSelection.view data.attackTypeFilters
    , Html.map FromDisciplinesFilter <| UI.FilterSelection.view data.disciplineFilters
    , div []
        [ label []
            [ text "Card text: "
            , input [ onInput TextFilterChanged, type_ "search", spellcheck False ] []
            ]
        ]
    , div []
        [ label []
            [ text "Card pack: "
            , span [ class "search__pack" ]
                [ Html.map FromPackFilter <| MultiSelect.autoSorted "Card Pack" data.packFilters
                ]
            ]
        ]
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


viewHeader : HeaderOptions -> Bool -> Html Msg
viewHeader opts isToggleOn =
    div [ class "deckbuild-header" ]
        ([ h2 [ class "deckbuild-header__title" ] [ text opts.title ]
         , span
            [ class "deckbuild-header__action"
            , onClick opts.primary.action
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
                            , onClick s.action
                            ]
                            [ text s.text ]
                        ]
               )
        )


viewCardListImages : Collection -> Model -> Decklist -> Html Msg
viewCardListImages collection model decklist =
    Keyed.ul [ class "deckbuild-selections__collectionitems--images" ] <|
        List.map (\c -> ( Cards.id c, viewCardListImage decklist c )) <|
            cardsToShow collection model


viewCardListImage : Decklist -> Card -> Html Msg
viewCardListImage deck card =
    li [ class "deckbuild-selections__collectionitem--image" ]
        [ UI.Card.lazy card
        , div [ class "deckbuild-selections__rowpiece_quant--image" ]
            [ UI.QuantityPicker.view ChangedDecklist card (Data.Deck.copiesInDeck deck card)
            ]
        ]


viewCardList : Collection -> Model -> Decklist -> Html Msg
viewCardList collection model decklist =
    Keyed.ul [ class "deckbuild-selections__collectionitems--rows" ] <|
        List.map (\c -> ( Cards.id c, viewCardListRow decklist c )) <|
            cardsToShow collection model


viewCardListRow : Decklist -> Card -> Html Msg
viewCardListRow deck card =
    li [ class "cardlist__row" ]
        [ span [ class "cardlist__quant--row" ]
            [ UI.QuantityPicker.view ChangedDecklist card (Data.Deck.copiesInDeck deck card)
            ]
        , span [ class "cardlist__name" ] [ UI.CardName.withOverlay card ]
        , span [ class "cardlist__props" ]
            (case card of
                Cards.FactionCard props ->
                    [ span [ class "cardlist__clan" ] [ UI.Icon.V2.clan UI.Icon.V2.Standard props.clan ]
                    , span [] [ UI.Attribute.bloodPotency props.bloodPotency ]
                    , span [ class "cardlist__extra-prop" ] [ UI.Attribute.physical props.physical ]
                    , span [ class "cardlist__extra-prop" ] [ UI.Attribute.social props.social ]
                    , span [ class "cardlist__extra-prop" ] [ UI.Attribute.mental props.mental ]
                    , viewIconsList (UI.Icon.V2.discipline UI.Icon.V2.Standard) props.disciplines
                    ]

                Cards.LibraryCard props ->
                    [ span [ class "cardlist__clan" ]
                        [ props.clan |> Maybe.map (UI.Icon.V2.clan UI.Icon.V2.Standard) |> Maybe.withDefault (text "")
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


cardsToShow : Collection -> Model -> List Card
cardsToShow collection model =
    filteredCards collection model |> List.sortWith cardSort


filteredCards : Collection -> Model -> List Card
filteredCards collection model =
    let
        cards =
            Dict.values collection
    in
    case model.textFilter of
        Nothing ->
            List.filter (filterFlags model) cards

        Just needle ->
            List.filter (Cards.findTextInCard needle) cards
                |> List.filter (filterFlags model)


filterFlags : Model -> Card -> Bool
filterFlags data card =
    UI.FilterSelection.isAllowed Cards.clanRequirement data.clansFilters card
        && UI.FilterSelection.isAllowed Cards.traits data.secondaryFilters card
        && UI.FilterSelection.isAllowed (Cards.stack >> List.singleton) data.stackFilters card
        && UI.FilterSelection.isAllowed Cards.discipline data.disciplineFilters card
        && UI.FilterSelection.isAllowed Cards.traits data.primaryFilters card
        && UI.FilterSelection.isAllowed Cards.attackTypes data.attackTypeFilters card
        && isPackAllowed data.packFilters card


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
            compare (Cards.name a) (Cards.name b)

        ord ->
            ord
