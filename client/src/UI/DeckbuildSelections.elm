module UI.DeckbuildSelections exposing (ExternalMsg(..), Model, Msg(..), init, update, view)

import Browser exposing (UrlRequest(..))
import Cards exposing (Card)
import Data.Collection exposing (Collection)
import Data.Deck exposing (Decklist)
import Data.Pack as Pack exposing (Pack)
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
import UI.FilterSelection as FS
import UI.Icon as Icon
import UI.MultiSelect as MultiSelect
import UI.QuantityPicker
import UI.TopTabs


type Tab
    = Editor
    | Description


type alias Model =
    { attackTypeFilters : FS.AttackTypes
    , clansFilters : FS.Clans
    , disciplineFilters : FS.Disciplines
    , packFilters : MultiSelect.Model Pack
    , bloodPotencyFilters : MultiSelect.Model Int
    , primaryFilters : FS.PrimaryTraits
    , secondaryFilters : FS.SecondaryTraits
    , showAllFilters : Bool
    , strictFilters : Bool
    , showCollectionImages : Bool
    , stackFilters : FS.PlayerStacks
    , textFilter : Maybe String
    , topTabs : UI.TopTabs.Model Tab
    }


init : Model
init =
    { stackFilters = FS.cleanPlayerStacks
    , primaryFilters = FS.cleanPrimaryTraits
    , secondaryFilters = FS.cleanSecondaryTraits
    , attackTypeFilters = FS.cleanAttackTypes
    , clansFilters = FS.cleanClans
    , disciplineFilters = FS.cleanDisciplines
    , packFilters = MultiSelect.init Pack.list
    , bloodPotencyFilters = MultiSelect.init <| List.map (\n -> ( String.fromInt n, n )) [ 0, 1, 2, 3, 4, 5, 6 ]
    , textFilter = Nothing
    , showAllFilters = False
    , strictFilters = False
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
    | FromAttackTypesFilter (FS.Msg FS.AttackTypes)
    | FromClansFilter (FS.Msg FS.Clans)
    | FromDisciplinesFilter (FS.Msg FS.Disciplines)
    | FromPrimaryFilter (FS.Msg FS.PrimaryTraits)
    | FromSecondaryFilter (FS.Msg FS.SecondaryTraits)
    | FromStacksFilter (FS.Msg FS.PlayerStacks)
    | FromPackFilter (MultiSelect.Msg Pack)
    | FromBloodPotencyFilter (MultiSelect.Msg Int)
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
            ( { model | stackFilters = FS.update subMsg model.stackFilters }, Effect.none )

        Internal (FromPrimaryFilter subMsg) ->
            ( { model | primaryFilters = FS.update subMsg model.primaryFilters }, Effect.none )

        Internal (FromSecondaryFilter subMsg) ->
            ( { model | secondaryFilters = FS.update subMsg model.secondaryFilters }, Effect.none )

        Internal (FromAttackTypesFilter subMsg) ->
            ( { model | attackTypeFilters = FS.update subMsg model.attackTypeFilters }, Effect.none )

        Internal (FromClansFilter subMsg) ->
            ( { model | clansFilters = FS.update subMsg model.clansFilters }, Effect.none )

        Internal (FromDisciplinesFilter subMsg) ->
            ( { model | disciplineFilters = FS.update subMsg model.disciplineFilters }, Effect.none )

        Internal (FromPackFilter subMsg) ->
            ( { model | packFilters = MultiSelect.update subMsg model.packFilters }, Effect.none )

        Internal (FromBloodPotencyFilter subMsg) ->
            ( { model | bloodPotencyFilters = MultiSelect.update subMsg model.bloodPotencyFilters }, Effect.none )

        Internal ClearFilters ->
            ( { model
                | stackFilters = FS.cleanPlayerStacks
                , primaryFilters = FS.cleanPrimaryTraits
                , secondaryFilters = FS.cleanSecondaryTraits
                , attackTypeFilters = FS.cleanAttackTypes
                , clansFilters = FS.cleanClans
                , disciplineFilters = FS.cleanDisciplines
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
    [ Html.map (Internal << FromStacksFilter) <| Lazy.lazy FS.viewPlayerStacks data.stackFilters
    , Html.map (Internal << FromPrimaryFilter) <| Lazy.lazy FS.viewPrimaryTraits data.primaryFilters
    , Html.map (Internal << FromClansFilter) <| Lazy.lazy FS.viewClans data.clansFilters
    ]


viewSecondaryFilters : Model -> List (Html Msg)
viewSecondaryFilters data =
    [ Html.map (Internal << FromSecondaryFilter) <| Lazy.lazy FS.viewSecondaryTraits data.secondaryFilters
    , Html.map (Internal << FromAttackTypesFilter) <| Lazy.lazy FS.viewAttackTypes data.attackTypeFilters
    , Html.map (Internal << FromDisciplinesFilter) <| Lazy.lazy FS.viewDisciplines data.disciplineFilters
    , div [ class "deckbuild-filters__multi" ]
        [ label [ class "deckbuild-filters__multi-label", for "bp-multi" ]
            [ text "Blood Potency"
            ]
        , span
            [ class "deckbuild-filters__multi-select", id "bp-multi" ]
            [ Html.map (Internal << FromBloodPotencyFilter) <| MultiSelect.autoSorted "Blood Potency" data.bloodPotencyFilters
            ]
        ]
    , div [ class "deckbuild-filters__multi" ]
        [ label [ class "deckbuild-filters__multi-label", for "pack-multi" ]
            [ text "Card pack"
            ]
        , span
            [ class "deckbuild-filters__multi-select", id "pack-multi" ]
            [ Html.map (Internal << FromPackFilter) <| MultiSelect.autoSorted "Card Pack" data.packFilters
            ]
        ]
    , div []
        [ label []
            [ text "Card text: "
            , input [ onInput (Internal << TextFilterChanged), type_ "search", spellcheck False ] []
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
                    [ span [ class "cardlist__clan" ] [ Icon.clanIcon Icon.Standard props.clan ]
                    , span [] [ UI.Attribute.bloodPotency props.bloodPotency ]
                    , span [ class "cardlist__extra-prop" ] [ UI.Attribute.physical props.physical ]
                    , span [ class "cardlist__extra-prop" ] [ UI.Attribute.social props.social ]
                    , span [ class "cardlist__extra-prop" ] [ UI.Attribute.mental props.mental ]
                    , viewIconsList (Icon.disciplineIcon Icon.Standard) props.disciplines
                    ]

                Cards.LibraryCard props ->
                    [ span [ class "cardlist__clan" ]
                        [ props.clan |> Maybe.map (Icon.clanIcon Icon.Standard) |> Maybe.withDefault (text "")
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
    (if data.strictFilters then
        FS.clanIsAllowedStrict data.clansFilters card
            && FS.secondaryTraitsIsAllowedStrict data.secondaryFilters card
            && FS.playerStackIsAllowedStrict data.stackFilters card
            && FS.disciplineIsAllowedStrict data.disciplineFilters card
            && FS.primaryTraitsIsAllowedStrict data.primaryFilters card
            && FS.attackTypeIsAllowedStrict data.attackTypeFilters card

     else
        FS.clanIsAllowedWide data.clansFilters card
            && FS.secondaryTraitsIsAllowedWide data.secondaryFilters card
            && FS.playerStackIsAllowedWide data.stackFilters card
            && FS.disciplineIsAllowedWide data.disciplineFilters card
            && FS.primaryTraitsIsAllowedWide data.primaryFilters card
            && FS.attackTypeIsAllowedWide data.attackTypeFilters card
    )
        && isPackAllowed data.packFilters card
        && isBloodPotencyAllowed data.bloodPotencyFilters card


isPackAllowed : MultiSelect.Model Pack -> Card -> Bool
isPackAllowed packSelection card =
    case MultiSelect.selected packSelection of
        [] ->
            True

        allowedPacks ->
            List.member (Cards.set card) allowedPacks


isBloodPotencyAllowed : MultiSelect.Model Int -> Card -> Bool
isBloodPotencyAllowed bpSelection card =
    case ( MultiSelect.selected bpSelection, card ) of
        ( [], _ ) ->
            True

        ( _, Cards.CityCard _ ) ->
            False

        ( _, Cards.MonsterCard _ ) ->
            True

        ( _, Cards.HavenCard _ ) ->
            True

        ( _, Cards.AgendaCard _ ) ->
            True

        ( allowedBps, Cards.FactionCard { bloodPotency } ) ->
            List.member bloodPotency allowedBps

        ( allowedBps, Cards.LibraryCard { bloodPotency } ) ->
            Maybe.map (\bp -> List.member bp allowedBps) bloodPotency |> Maybe.withDefault False


cardSort : Card -> Card -> Order
cardSort a b =
    case compare (Cards.stackComparable a) (Cards.stackComparable b) of
        EQ ->
            compare (Cards.name a) (Cards.name b)

        ord ->
            ord
