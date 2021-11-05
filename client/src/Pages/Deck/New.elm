module Pages.Deck.New exposing (Model, Msg, page)

import API.Decklist
import Auth
import Browser.Navigation as Navigation exposing (Key)
import Cards exposing (Card)
import Clan exposing (Clan)
import Deck exposing (DeckPreSave, Decklist, Name(..))
import Dict
import Effect exposing (Effect)
import Gen.Params.Deck.New exposing (Params)
import Gen.Route as Route
import Html exposing (..)
import Html.Attributes exposing (checked, class, classList, name, type_)
import Html.Events exposing (onClick)
import Html.Keyed as Keyed
import Page
import Request
import Shared exposing (Collection)
import UI.Attribute
import UI.Card
import UI.Decklist
import UI.FilterSelection
import UI.Icon as Icon
import UI.Layout.Template
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.protected.advanced
        (\user ->
            { init = init req.key
            , update = update user
            , view = view shared
            , subscriptions = always Sub.none
            }
        )



-- INIT


type alias Model =
    { stackFilters : UI.FilterSelection.Model Cards.CardStack Msg
    , primaryFilters : UI.FilterSelection.Model Cards.Trait Msg
    , secondaryFilters : UI.FilterSelection.Model Cards.Trait Msg
    , attackTypeFilters : UI.FilterSelection.Model Cards.AttackType Msg
    , clansFilters : UI.FilterSelection.Model Clan Msg
    , disciplineFilters : UI.FilterSelection.Model Cards.Discipline Msg
    , textFilter : Maybe String
    , showAllFilters : Bool
    , showCollectionImages : Bool
    , deck : DeckPreSave
    , key : Key
    }


init : Navigation.Key -> ( Model, Effect Msg )
init key =
    ( { stackFilters = UI.FilterSelection.stacks
      , primaryFilters = UI.FilterSelection.primaryTraits
      , secondaryFilters = UI.FilterSelection.secondaryTraits
      , attackTypeFilters = UI.FilterSelection.attackTypes
      , clansFilters = UI.FilterSelection.clans
      , disciplineFilters = UI.FilterSelection.disciplines
      , textFilter = Nothing
      , showAllFilters = False
      , showCollectionImages = False
      , deck = Deck.init
      , key = key
      }
    , Effect.none
    )


type Msg
    = FromShared Shared.Msg
    | FromStacksFilter (UI.FilterSelection.Msg Cards.CardStack)
    | FromPrimaryFilter (UI.FilterSelection.Msg Cards.Trait)
    | FromSecondaryFilter (UI.FilterSelection.Msg Cards.Trait)
    | FromAttackTypesFilter (UI.FilterSelection.Msg Cards.AttackType)
    | FromClansFilter (UI.FilterSelection.Msg Clan)
    | FromDisciplinesFilter (UI.FilterSelection.Msg Cards.Discipline)
    | TextFilterChanged String
    | ToggleShowAllFilters
    | ClearFilters
    | ToggleShowCollectionImages
    | ChangedDecklist ( Cards.Card, Int )
    | ChoseLeader Cards.Faction
    | Save
    | SavedDecklist API.Decklist.ResultCreate
    | StartRenameDeck
    | DeckNameChanged String
    | SaveNewDeckName


update : Auth.User -> Msg -> Model -> ( Model, Effect Msg )
update user msg model =
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
            , Effect.none
            )

        ToggleShowAllFilters ->
            ( { model | showAllFilters = not model.showAllFilters }, Effect.none )

        ToggleShowCollectionImages ->
            ( { model | showCollectionImages = not model.showCollectionImages }, Effect.none )

        ChangedDecklist change ->
            let
                oldDeck =
                    model.deck
            in
            ( { model | deck = { oldDeck | decklist = Deck.setCard oldDeck.decklist change } }, Effect.none )

        ChoseLeader leader ->
            let
                oldDeck =
                    model.deck
            in
            ( { model | deck = { oldDeck | decklist = Deck.setLeader oldDeck.decklist leader } }, Effect.none )

        Save ->
            case Deck.encode (Deck.PreSave model.deck) of
                Just encodedDeck ->
                    ( model, API.Decklist.create SavedDecklist user.token encodedDeck |> Effect.fromCmd )

                _ ->
                    ( model, Effect.none )

        SavedDecklist (Ok deckId) ->
            ( model, Route.toHref (Route.Deck__View__Id_ { id = deckId }) |> Navigation.pushUrl model.key |> Effect.fromCmd )

        SavedDecklist (Err _) ->
            ( model, Effect.none )

        StartRenameDeck ->
            let
                oldDeck =
                    model.deck
            in
            ( { model | deck = { oldDeck | meta = { name = BeingNamed "" } } }, Effect.none )

        DeckNameChanged newName ->
            let
                oldDeck =
                    model.deck
            in
            case model.deck.meta.name of
                BeingNamed _ ->
                    ( { model | deck = { oldDeck | meta = { name = BeingNamed newName } } }, Effect.none )

                _ ->
                    ( model, Effect.none )

        SaveNewDeckName ->
            let
                oldDeck =
                    model.deck
            in
            case model.deck.meta.name of
                BeingNamed newName ->
                    case String.trim newName of
                        "" ->
                            ( { model | deck = { oldDeck | meta = { name = Unnamed } } }, Effect.none )

                        trimmedName ->
                            ( { model | deck = { oldDeck | meta = { name = Named trimmedName } } }, Effect.none )

                _ ->
                    ( model, Effect.none )


decklistActions : UI.Decklist.Actions Msg
decklistActions =
    { setLeader = ChoseLeader
    , startNameChange = StartRenameDeck
    , changeName = DeckNameChanged
    , endNameChange = SaveNewDeckName
    }


view : Shared.Model -> Model -> View Msg
view shared model =
    UI.Layout.Template.view FromShared
        shared
        [ div [ class "deckbldr" ]
            [ viewActions
            , div [ class "deckbldr-decklist" ]
                [ UI.Decklist.viewCreate decklistActions model.deck ]
            , div [ class "deckbldr-choices" ]
                [ div [ class "fltrhead" ]
                    [ h2 [ class "fltrhead-name" ] [ text "Filters " ]
                    , span [ onClick ToggleShowAllFilters, class "fltrhead-primary", class "fltrhead-action" ]
                        [ text <|
                            if model.showAllFilters then
                                "(hide filters)"

                            else
                                "(show more)"
                        ]
                    , span [ onClick ClearFilters, class "fltrhead-secondary", class "fltrhead-action" ] [ text "Clear filters" ]
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
                    , span [ onClick ToggleShowCollectionImages, class "fltrhead-primary", class "fltrhead-action" ]
                        [ text <|
                            if model.showCollectionImages then
                                "(hide images)"

                            else
                                "(show images)"
                        ]
                    ]
                , div [ class "deckbldr-collection" ] <|
                    if model.showCollectionImages then
                        viewCardListImages shared.collection model

                    else
                        viewCardList shared.collection model
                ]
            ]
        ]


viewActions : Html Msg
viewActions =
    div [ class "deckbldr-actions" ]
        [ ul [ class "actions-list" ]
            [ li [ class "actions-item", onClick Save ]
                [ span [ class "actions-icon" ] [ Icon.icon ( Icon.Save, Icon.Standard ) ]
                , span [ class "actions-description" ] [ text "Save" ]
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


viewCardList : Collection -> Model -> List (Html Msg)
viewCardList collection model =
    [ Keyed.ul [ class "deckbldr-collectionitems--rows" ] <|
        List.map (\c -> ( Cards.id c, viewCardListRow model.deck.decklist c )) <|
            cardsToShow collection model
    ]


viewCardListRow : Decklist -> Card -> Html Msg
viewCardListRow deck card =
    li [ class "deckbldr-collectionitem--row" ]
        [ span [ class "deckbldr-rowpiece_quant--row" ] [ viewQuantityPicker card (Deck.copiesInDeck deck card) ]
        , span [ class "deckbldr-rowpiece_name" ] [ text <| Cards.name card ]
        , span [ class "deckbldr-rowpiece_props" ]
            (case card of
                Cards.FactionCard props ->
                    [ span [ class "deckbldr-rowpiece_clan" ] [ Icon.clan props.clan ]
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
                        [ props.clan |> Maybe.map Icon.clan |> Maybe.withDefault (text "")
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


viewQuantityPicker : Card -> Int -> Html Msg
viewQuantityPicker card copiesInDeck =
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
                            , onClick <| ChangedDecklist ( card, n )
                            ]
                            []
                        ]
                )
        )


viewCardListImages : Collection -> Model -> List (Html Msg)
viewCardListImages collection model =
    [ Keyed.ul [ class "deckbldr-collectionitems--images" ] <|
        List.map (\c -> ( Cards.id c, viewCardListImage model.deck.decklist c )) <|
            cardsToShow collection model
    ]


viewCardListImage : Decklist -> Card -> Html Msg
viewCardListImage deck card =
    li [ class "deckbldr-collectionitem--image" ]
        [ UI.Card.lazy card
        , div [ class "deckbldr-rowpiece_quant--image" ] [ viewQuantityPicker card (Deck.copiesInDeck deck card) ]
        ]


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
filterFlags model card =
    UI.FilterSelection.isAllowed Cards.clanRequirement model.clansFilters card
        && UI.FilterSelection.isAllowed Cards.traits model.secondaryFilters card
        && UI.FilterSelection.isAllowed Cards.stack model.stackFilters card
        && UI.FilterSelection.isAllowed Cards.discipline model.disciplineFilters card
        && UI.FilterSelection.isAllowed Cards.traits model.primaryFilters card
        && UI.FilterSelection.isAllowed Cards.attackTypes model.attackTypeFilters card


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
