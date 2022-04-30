module UI.DeckbuildSelections exposing (ExternalMsg(..), Model, Msg(..), init, update, view)

import Browser exposing (UrlRequest(..))
import Cards exposing (Card)
import Data.Clan exposing (Clan)
import Data.Collection exposing (Collection)
import Data.Deck exposing (Decklist)
import Data.Discipline exposing (Discipline)
import Data.Pack as Pack exposing (Pack)
import Data.Trait exposing (Trait)
import Dict
import Effect exposing (Effect)
import Html exposing (Html, div, h2, input, label, li, nav, section, span, text, textarea, ul)
import Html.Attributes exposing (attribute, class, for, id, spellcheck, type_, value)
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
import UI.TopTabs


type Tab
    = Editor
    | Description


type alias Model =
    { attackTypeFilters : UI.FilterSelection.Model Cards.AttackType Never
    , clansFilters : UI.FilterSelection.Model Clan Never
    , disciplineFilters : UI.FilterSelection.Model Discipline Never
    , packFilters : MultiSelect.Model Pack
    , primaryFilters : UI.FilterSelection.Model Trait Never
    , secondaryFilters : UI.FilterSelection.Model Trait Never
    , showAllFilters : Bool
    , strictFilters : Bool
    , showCollectionImages : Bool
    , stackFilters : UI.FilterSelection.Model Cards.CardStack Never
    , textFilter : Maybe String
    , topTabs : UI.TopTabs.Model Tab
    }


init : Bool -> Model
init strictFilters =
    { stackFilters = UI.FilterSelection.playerStacks
    , primaryFilters = UI.FilterSelection.primaryTraits
    , secondaryFilters = UI.FilterSelection.secondaryTraits
    , attackTypeFilters = UI.FilterSelection.attackTypes
    , clansFilters = UI.FilterSelection.clans
    , disciplineFilters = UI.FilterSelection.disciplines
    , packFilters = MultiSelect.init Pack.list
    , textFilter = Nothing
    , showAllFilters = False
    , strictFilters = strictFilters
    , showCollectionImages = False
    , topTabs =
        UI.TopTabs.init
            ( ( Editor, "Editor" )
            , [ ( Description, "Description" ) ]
            )
    }


type Msg
    = Internal InternalMsg
    | External ExternalMsg


type ExternalMsg
    = ChangedDecklist ( Card, Int )
    | DescriptionChanged String


type InternalMsg
    = ClearFilters
    | FromAttackTypesFilter (UI.FilterSelection.Msg Cards.AttackType)
    | FromClansFilter (UI.FilterSelection.Msg Clan)
    | FromDisciplinesFilter (UI.FilterSelection.Msg Discipline)
    | FromPrimaryFilter (UI.FilterSelection.Msg Trait)
    | FromSecondaryFilter (UI.FilterSelection.Msg Trait)
    | FromStacksFilter (UI.FilterSelection.Msg Cards.CardStack)
    | FromPackFilter (MultiSelect.Msg Pack)
    | ToggleShowAllFilters
    | ToggleStrictFilters
    | ToggleShowCollectionImages
    | TextFilterChanged String
    | FromTopTabs (UI.TopTabs.Msg Tab)


update : Msg -> Model -> ( Model, Effect msg )
update msg model =
    case msg of
        External _ ->
            ( model, Effect.none )

        Internal (FromStacksFilter subMsg) ->
            ( { model | stackFilters = UI.FilterSelection.update subMsg model.stackFilters }, Effect.none )

        Internal (FromPrimaryFilter subMsg) ->
            ( { model | primaryFilters = UI.FilterSelection.update subMsg model.primaryFilters }, Effect.none )

        Internal (FromSecondaryFilter subMsg) ->
            ( { model | secondaryFilters = UI.FilterSelection.update subMsg model.secondaryFilters }, Effect.none )

        Internal (FromAttackTypesFilter subMsg) ->
            ( { model | attackTypeFilters = UI.FilterSelection.update subMsg model.attackTypeFilters }, Effect.none )

        Internal (FromClansFilter subMsg) ->
            ( { model | clansFilters = UI.FilterSelection.update subMsg model.clansFilters }, Effect.none )

        Internal (FromDisciplinesFilter subMsg) ->
            ( { model | disciplineFilters = UI.FilterSelection.update subMsg model.disciplineFilters }, Effect.none )

        Internal (FromPackFilter subMsg) ->
            ( { model | packFilters = MultiSelect.update subMsg model.packFilters }, Effect.none )

        Internal ClearFilters ->
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

        Internal (TextFilterChanged text) ->
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

        Internal ToggleShowAllFilters ->
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

        Internal ToggleStrictFilters ->
            let
                newStrictFilters =
                    not model.strictFilters
            in
            ( { model | strictFilters = newStrictFilters }
            , Effect.fromCmd <| Port.Event.track (Port.Event.BuilderToggleStrictFilters newStrictFilters)
            )

        Internal ToggleShowCollectionImages ->
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

        Internal (FromTopTabs subMsg) ->
            ( { model | topTabs = UI.TopTabs.update subMsg model.topTabs }, Effect.none )


view : Collection -> Model -> Decklist -> Maybe String -> Html Msg
view playerCardsCollection model decklist description =
    div [ class "builder-aside" ]
        [ nav []
            [ Html.map (Internal << FromTopTabs) <| UI.TopTabs.view model.topTabs
            ]
        , case UI.TopTabs.activeTab model.topTabs of
            Editor ->
                section [ class "deckbuild-selections" ]
                    [ Lazy.lazy2 viewFiltersHeader model.showAllFilters model.strictFilters
                    , Lazy.lazy viewFilters model
                    , Lazy.lazy viewCardlistHeader model.showCollectionImages
                    , Lazy.lazy3 viewCardSelection playerCardsCollection model decklist
                    ]

            Description ->
                section [ class "deckbuild-description" ]
                    [ h2 [] [ text "Description" ]
                    , label [ class "deckbuild-description__label", for "description" ]
                        [ span [ class "deckbuild-description__label-label" ]
                            [ text "Deck description"
                            ]
                        , span [ class "deckbuild-description__label-extra" ]
                            [ text "(this supports markdown)"
                            ]
                        ]
                    , textarea
                        [ onInput (External << DescriptionChanged)
                        , attribute "autocorrect" "on"
                        , class "deckbuild-description__input"
                        , id "description"
                        , value (Maybe.withDefault "" description)
                        ]
                        []
                    ]
        ]


viewCardSelection : Collection -> Model -> Decklist -> Html Msg
viewCardSelection playerCardsCollection model decklist =
    div [ class "deckbuild-selections__collection" ] <|
        [ if model.showCollectionImages then
            viewCardListImages playerCardsCollection model decklist

          else
            viewCardList playerCardsCollection model decklist
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
    [ Html.map (Internal << FromStacksFilter) <| UI.FilterSelection.view data.stackFilters
    , Html.map (Internal << FromPrimaryFilter) <| UI.FilterSelection.view data.primaryFilters
    , Html.map (Internal << FromClansFilter) <| UI.FilterSelection.view data.clansFilters
    ]


viewSecondaryFilters : Model -> List (Html Msg)
viewSecondaryFilters data =
    [ Html.map (Internal << FromSecondaryFilter) <| UI.FilterSelection.view data.secondaryFilters
    , Html.map (Internal << FromAttackTypesFilter) <| UI.FilterSelection.view data.attackTypeFilters
    , Html.map (Internal << FromDisciplinesFilter) <| UI.FilterSelection.view data.disciplineFilters
    , div []
        [ label []
            [ text "Card text: "
            , input [ onInput (Internal << TextFilterChanged), type_ "search", spellcheck False ] []
            ]
        ]
    , div []
        [ label []
            [ text "Card pack: "
            , span [ class "search__pack" ]
                [ Html.map (Internal << FromPackFilter) <| MultiSelect.autoSorted "Card Pack" data.packFilters
                ]
            ]
        ]
    ]



-----------------
-- HEADERS
-----------------


viewFiltersHeader : Bool -> Bool -> Html Msg
viewFiltersHeader isToggleOn strictFiltersOn =
    div [ class "deckbuild-header" ]
        [ h2 [ class "deckbuild-header__title" ]
            [ text "Filters" ]
        , span [ class "deckbuild-header__action", onClick <| Internal ToggleShowAllFilters ]
            [ text <|
                if isToggleOn then
                    "(hide filters)"

                else
                    "(show more)"
            ]
        , span [ class "deckbuild-header__action", onClick <| Internal ToggleStrictFilters ]
            [ text <|
                if strictFiltersOn then
                    "(using strict filters)"

                else
                    "(using wide filters)"
            ]
        , span [ class "deckbuild-header__action", class "deckbuild-header__action--secondary", onClick <| Internal ClearFilters ]
            [ text "Clear filters" ]
        ]


viewCardlistHeader : Bool -> Html Msg
viewCardlistHeader isToggleOn =
    div [ class "deckbuild-header" ]
        [ h2 [ class "deckbuild-header__title" ]
            [ text "Cards" ]
        , span [ class "deckbuild-header__action", onClick <| Internal ToggleShowCollectionImages ]
            [ text <|
                if isToggleOn then
                    "(hide images)"

                else
                    "(show images)"
            ]
        ]


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
            [ UI.QuantityPicker.view (External << ChangedDecklist) card (Data.Deck.copiesInDeck deck card)
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
            [ UI.QuantityPicker.view (External << ChangedDecklist) card (Data.Deck.copiesInDeck deck card)
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
    let
        filter =
            if data.strictFilters then
                UI.FilterSelection.isAllowedStrict

            else
                UI.FilterSelection.isAllowedWide
    in
    filter Cards.clanRequirement data.clansFilters card
        && filter Cards.traits data.secondaryFilters card
        && filter (Cards.stack >> List.singleton) data.stackFilters card
        && filter Cards.discipline data.disciplineFilters card
        && filter Cards.traits data.primaryFilters card
        && filter Cards.attackTypes data.attackTypeFilters card
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
