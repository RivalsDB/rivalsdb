module Pages.Deck.Edit.Id_ exposing (Model, Msg, page)

import API.Decklist
import Auth
import Cards exposing (Card)
import Clan exposing (Clan)
import Deck exposing (DeckPostSave, Decklist, Name(..))
import Dict
import Effect exposing (Effect)
import Gen.Params.Deck.Edit.Id_ exposing (Params)
import Html exposing (Html, div, h2, input, label, li, span, text, ul)
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
            { init = init shared.collection req.params.id
            , update = update user
            , view = view shared
            , subscriptions = always Sub.none
            }
        )



-- INIT


type Model
    = Loading
    | Editing
        { stackFilters : UI.FilterSelection.Model Cards.CardStack Msg
        , primaryFilters : UI.FilterSelection.Model Cards.Trait Msg
        , secondaryFilters : UI.FilterSelection.Model Cards.Trait Msg
        , attackTypeFilters : UI.FilterSelection.Model Cards.AttackType Msg
        , clansFilters : UI.FilterSelection.Model Clan Msg
        , disciplineFilters : UI.FilterSelection.Model Cards.Discipline Msg
        , textFilter : Maybe String
        , showAllFilters : Bool
        , showCollectionImages : Bool
        , deck : DeckPostSave
        }


type alias Data =
    { stackFilters : UI.FilterSelection.Model Cards.CardStack Msg
    , primaryFilters : UI.FilterSelection.Model Cards.Trait Msg
    , secondaryFilters : UI.FilterSelection.Model Cards.Trait Msg
    , attackTypeFilters : UI.FilterSelection.Model Cards.AttackType Msg
    , clansFilters : UI.FilterSelection.Model Clan Msg
    , disciplineFilters : UI.FilterSelection.Model Cards.Discipline Msg
    , textFilter : Maybe String
    , showAllFilters : Bool
    , showCollectionImages : Bool
    , deck : DeckPostSave
    }


init : Shared.Collection -> String -> ( Model, Effect Msg )
init collection deckId =
    ( Loading
    , Effect.fromCmd <| API.Decklist.read collection FetchedDecklist deckId
    )


type Msg
    = FromShared Shared.Msg
    | FromStacksFilter (UI.FilterSelection.Msg Cards.CardStack)
    | FromPrimaryFilter (UI.FilterSelection.Msg Cards.Trait)
    | FromSecondaryFilter (UI.FilterSelection.Msg Cards.Trait)
    | FromAttackTypesFilter (UI.FilterSelection.Msg Cards.AttackType)
    | FromClansFilter (UI.FilterSelection.Msg Clan)
    | FromDisciplinesFilter (UI.FilterSelection.Msg Cards.Discipline)
    | ToggleShowAllFilters
    | ClearFilters
    | ToggleShowCollectionImages
    | ChangedDecklist ( Cards.Card, Int )
    | ChoseLeader Cards.Faction
    | Save
    | SavedDecklist API.Decklist.ResultUpdate
    | StartRenameDeck
    | DeckNameChanged String
    | SaveNewDeckName
    | FetchedDecklist API.Decklist.ResultRead


update : Auth.User -> Msg -> Model -> ( Model, Effect Msg )
update user msg modelx =
    case ( modelx, msg ) of
        ( _, FromShared subMsg ) ->
            ( modelx, Effect.fromShared subMsg )

        ( Loading, FetchedDecklist (Ok deck) ) ->
            ( Editing
                { stackFilters = UI.FilterSelection.stacks
                , primaryFilters = UI.FilterSelection.primaryTraits
                , secondaryFilters = UI.FilterSelection.secondaryTraits
                , attackTypeFilters = UI.FilterSelection.attackTypes
                , clansFilters = UI.FilterSelection.clans
                , disciplineFilters = UI.FilterSelection.disciplines
                , textFilter = Nothing
                , showAllFilters = False
                , showCollectionImages = False
                , deck = deck
                }
            , Effect.none
            )

        ( _, FetchedDecklist (Err _) ) ->
            ( modelx, Effect.none )

        ( Loading, _ ) ->
            ( modelx, Effect.none )

        ( Editing oldModel, FetchedDecklist (Ok deck) ) ->
            ( Editing { oldModel | deck = deck }, Effect.none )

        ( Editing model, FromStacksFilter subMsg ) ->
            ( Editing { model | stackFilters = UI.FilterSelection.update subMsg model.stackFilters }, Effect.none )

        ( Editing model, FromPrimaryFilter subMsg ) ->
            ( Editing { model | primaryFilters = UI.FilterSelection.update subMsg model.primaryFilters }, Effect.none )

        ( Editing model, FromSecondaryFilter subMsg ) ->
            ( Editing { model | secondaryFilters = UI.FilterSelection.update subMsg model.secondaryFilters }, Effect.none )

        ( Editing model, FromAttackTypesFilter subMsg ) ->
            ( Editing { model | attackTypeFilters = UI.FilterSelection.update subMsg model.attackTypeFilters }, Effect.none )

        ( Editing model, FromClansFilter subMsg ) ->
            ( Editing { model | clansFilters = UI.FilterSelection.update subMsg model.clansFilters }, Effect.none )

        ( Editing model, FromDisciplinesFilter subMsg ) ->
            ( Editing { model | disciplineFilters = UI.FilterSelection.update subMsg model.disciplineFilters }, Effect.none )

        ( Editing model, ClearFilters ) ->
            ( Editing
                { model
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

        ( Editing model, ToggleShowAllFilters ) ->
            ( Editing { model | showAllFilters = not model.showAllFilters }, Effect.none )

        ( Editing model, ToggleShowCollectionImages ) ->
            ( Editing { model | showCollectionImages = not model.showCollectionImages }, Effect.none )

        ( Editing model, ChangedDecklist change ) ->
            let
                oldDeck =
                    model.deck
            in
            ( Editing { model | deck = { oldDeck | decklist = Deck.setCard oldDeck.decklist change } }, Effect.none )

        ( Editing model, ChoseLeader leader ) ->
            let
                oldDeck =
                    model.deck
            in
            ( Editing { model | deck = { oldDeck | decklist = Deck.setLeader oldDeck.decklist leader } }, Effect.none )

        ( Editing model, Save ) ->
            case Deck.encode (Deck.PostSave model.deck) of
                Just encodedDeck ->
                    ( Editing model, API.Decklist.update SavedDecklist user.token model.deck.meta.id encodedDeck |> Effect.fromCmd )

                _ ->
                    ( Editing model, Effect.none )

        ( Editing model, SavedDecklist _ ) ->
            ( Editing model, Effect.none )

        ( Editing model, StartRenameDeck ) ->
            let
                oldDeck =
                    model.deck

                oldMeta =
                    oldDeck.meta
            in
            ( Editing { model | deck = { oldDeck | meta = { oldMeta | name = Deck.BeingNamed "" } } }, Effect.none )

        ( Editing model, DeckNameChanged newName ) ->
            let
                oldDeck =
                    model.deck

                oldMeta =
                    oldDeck.meta
            in
            case model.deck.meta.name of
                BeingNamed _ ->
                    ( Editing { model | deck = { oldDeck | meta = { oldMeta | name = Deck.BeingNamed newName } } }, Effect.none )

                _ ->
                    ( Editing model, Effect.none )

        ( Editing model, SaveNewDeckName ) ->
            let
                oldDeck =
                    model.deck

                oldMeta =
                    oldDeck.meta
            in
            case model.deck.meta.name of
                BeingNamed newName ->
                    case String.trim newName of
                        "" ->
                            ( Editing { model | deck = { oldDeck | meta = { oldMeta | name = Deck.Unnamed } } }, Effect.none )

                        trimmedName ->
                            ( Editing { model | deck = { oldDeck | meta = { oldMeta | name = Deck.Named trimmedName } } }, Effect.none )

                _ ->
                    ( Editing model, Effect.none )


decklistActions : UI.Decklist.Actions Msg
decklistActions =
    { setLeader = ChoseLeader
    , startNameChange = StartRenameDeck
    , changeName = DeckNameChanged
    , endNameChange = SaveNewDeckName
    }


view : Shared.Model -> Model -> View Msg
view shared model =
    case model of
        Loading ->
            UI.Layout.Template.view FromShared shared []

        Editing data ->
            UI.Layout.Template.view FromShared
                shared
                [ div [ class "deckbldr" ]
                    [ viewActions
                    , div [ class "deckbldr-decklist" ]
                        [ UI.Decklist.viewEdit decklistActions data.deck ]
                    , div [ class "deckbldr-choices" ]
                        [ div [ class "fltrhead" ]
                            [ h2 [ class "fltrhead-name" ] [ text "Filters " ]
                            , span [ onClick ToggleShowAllFilters, class "fltrhead-primary", class "fltrhead-action" ]
                                [ text <|
                                    if data.showAllFilters then
                                        "(hide filters)"

                                    else
                                        "(show more)"
                                ]
                            , span [ onClick ClearFilters, class "fltrhead-secondary", class "fltrhead-action" ] [ text "Clear filters" ]
                            ]
                        , div [ class "deckbldr-filters" ] <|
                            List.intersperse (text " ")
                                (viewMainFilters data
                                    ++ (if data.showAllFilters then
                                            viewSecondaryFilters data

                                        else
                                            []
                                       )
                                )
                        , div [ class "fltrhead" ]
                            [ h2 [ class "fltrhead-name" ] [ text "Cards " ]
                            , span [ onClick ToggleShowCollectionImages, class "fltrhead-primary", class "fltrhead-action" ]
                                [ text <|
                                    if data.showCollectionImages then
                                        "(hide images)"

                                    else
                                        "(show images)"
                                ]
                            ]
                        , div [ class "deckbldr-collection" ] <|
                            if data.showCollectionImages then
                                viewCardListImages shared.collection data

                            else
                                viewCardList shared.collection data
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


viewMainFilters : Data -> List (Html Msg)
viewMainFilters data =
    [ div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view FromStacksFilter data.stackFilters ]
    , div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view FromPrimaryFilter data.primaryFilters ]
    , div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view FromClansFilter data.clansFilters ]
    ]


viewSecondaryFilters : Data -> List (Html Msg)
viewSecondaryFilters data =
    [ div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view FromSecondaryFilter data.secondaryFilters ]
    , div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view FromAttackTypesFilter data.attackTypeFilters ]
    , div [ class "deckbldr-flaggroup" ] [ UI.FilterSelection.view FromDisciplinesFilter data.disciplineFilters ]
    ]


viewCardList : Collection -> Data -> List (Html Msg)
viewCardList collection data =
    [ Keyed.ul [ class "deckbldr-collectionitems--rows" ] <|
        List.map (\c -> ( Cards.id c, viewCardListRow data.deck.decklist c )) <|
            cardsToShow collection data
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


viewCardListImages : Collection -> Data -> List (Html Msg)
viewCardListImages collection data =
    [ Keyed.ul [ class "deckbldr-collectionitems--images" ] <|
        List.map (\c -> ( Cards.id c, viewCardListImage data.deck.decklist c )) <|
            cardsToShow collection data
    ]


viewCardListImage : Decklist -> Card -> Html Msg
viewCardListImage deck card =
    li [ class "deckbldr-collectionitem--image" ]
        [ UI.Card.lazy card
        , div [ class "deckbldr-rowpiece_quant--image" ] [ viewQuantityPicker card (Deck.copiesInDeck deck card) ]
        ]


cardsToShow : Collection -> Data -> List Card
cardsToShow collection data =
    filteredCards collection data |> List.sortWith cardSort


filteredCards : Collection -> Data -> List Card
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


filterFlags : Data -> Card -> Bool
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
