module Pages.View.Id_ exposing (Model, Msg, page)

import API.Decklist
import Cards
import Deck exposing (Deck)
import Dict
import Effect exposing (Effect)
import Gen.Params.View.Id_ exposing (Params)
import Html exposing (..)
import Html.Attributes exposing (class, classList, name)
import Page
import Request
import Shared
import UI.Attribute
import UI.Card
import UI.Icon as Icon
import UI.Layout.Template
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.advanced
        { init = init shared req
        , update = update
        , view = view shared
        , subscriptions = always Sub.none
        }



-- INIT


type Model
    = Loading
    | Viewing Xyz


type alias Xyz =
    { deck : Deck
    , deckName : String
    }


init : Shared.Model -> Request.With Params -> ( Model, Effect Msg )
init shared req =
    ( Loading
    , Effect.fromCmd <| API.Decklist.read shared.collection FetchedDecklist req.params.id
    )


type Msg
    = FromShared Shared.Msg
    | FetchedDecklist API.Decklist.ResultRead


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case msg of
        FromShared subMsg ->
            ( model, Effect.fromShared subMsg )

        FetchedDecklist (Ok res) ->
            ( Viewing { deck = res, deckName = "Some name" }, Effect.none )

        FetchedDecklist (Err _) ->
            ( model, Effect.none )


viewDeckName : String -> Html Msg
viewDeckName name =
    p []
        [ span [ class "decklist-titlename" ] [ text name ]
        ]


view : Shared.Model -> Model -> View Msg
view shared model =
    case model of
        Loading ->
            UI.Layout.Template.view FromShared shared [ text "Loading" ]

        Viewing ddd ->
            viewDecklist shared ddd


viewDecklist : Shared.Model -> Xyz -> View Msg
viewDecklist shared model =
    UI.Layout.Template.view FromShared
        shared
        [ div [ class "deckbldr" ]
            [ viewActions
            , div [ class "deckbldr-decklist" ]
                [ div [ class "decklist" ]
                    [ div [ class "decklist-title" ] [ viewDeckName model.deckName ]
                    , div [ class "decklist-core", class "decklist-core--agenda" ]
                        [ p [ class "decklist-section_header" ]
                            [ text "Agenda: "
                            , text <| Maybe.withDefault "Unknown" <| Maybe.map .name model.deck.agenda
                            ]
                        , div [ class "decklist-core_image" ]
                            [ model.deck.agenda
                                |> Maybe.map (Cards.AgendaCard >> UI.Card.lazy)
                                |> Maybe.withDefault (text "Unknown Agenda")
                            ]
                        ]
                    , div [ class "decklist-core", class "decklist-core--haven" ]
                        [ p [ class "decklist-section_header" ]
                            [ text "Haven: "
                            , text <| Maybe.withDefault "Unknown" <| Maybe.map .name model.deck.haven
                            ]
                        , div [ class "decklist-core_image" ]
                            [ model.deck.haven
                                |> Maybe.map (Cards.HavenCard >> UI.Card.lazy)
                                |> Maybe.withDefault (text "Unknown Haven")
                            ]
                        ]
                    , div [ class "decklist-core", class "decklist-core--leader" ]
                        [ p [ class "decklist-section_header" ]
                            [ text "Leader: "
                            , text <| Maybe.withDefault "Unknown" <| Maybe.map .name (Deck.leader model.deck)
                            ]
                        , div [ class "decklist-core_image" ]
                            [ Deck.leader model.deck
                                |> Maybe.map (Cards.FactionCard >> UI.Card.lazy)
                                |> Maybe.withDefault (text "Unknown Leader")
                            ]
                        ]
                    , div [ class "decklist-faction" ]
                        [ div
                            [ class "decklist-section_header"
                            , classList [ ( "decklist-section_header--invalid", not <| Deck.isValidFaction model.deck ) ]
                            ]
                            [ h3 [ class "decklist-section_header_name" ] [ text "Faction" ]
                            , div [ class "decklist-section_header_extra" ] <| viewClansInFaction model.deck.faction
                            ]
                        , viewFactionList model.deck
                        ]
                    , div [ class "decklist-library" ]
                        [ h3
                            [ class "decklist-section_header"
                            , classList [ ( "decklist-section_header--invalid", not <| Deck.isValidLibrary model.deck ) ]
                            ]
                            (text "Library"
                                :: (case cardCount <| Dict.values model.deck.library of
                                        0 ->
                                            []

                                        n ->
                                            [ text " (", text <| String.fromInt n, text ")" ]
                                   )
                            )
                        , viewLibraryList model.deck
                        ]
                    ]
                ]
            , div [ class "deckbldr-choices" ] []
            ]
        ]


viewActions : Html Msg
viewActions =
    div [ class "deckbldr-actions" ]
        [ ul [ class "actions-list" ] [] ]


viewClansInFaction : Deck.Faction -> List (Html Msg)
viewClansInFaction faction =
    Dict.values faction
        |> List.foldl
            (\( card, _ ) usedClans ->
                if List.member card.clan usedClans then
                    usedClans

                else
                    card.clan :: usedClans
            )
            []
        |> List.map
            (\clan ->
                span [ class "decklist-clan_entry" ]
                    [ span [ class "decklist-clan_clan" ] [ Icon.clan clan ] ]
            )


viewFactionList : Deck -> Html Msg
viewFactionList deck =
    let
        characters =
            Dict.values deck.faction |> List.map Tuple.first

        sortedCharacters =
            List.sortBy (.bloodPotency >> negate) characters
    in
    ul [ class "deckfact" ]
        (sortedCharacters
            |> List.map
                (\c ->
                    li
                        [ class "deckfact-entry"
                        , classList [ ( "deckfact-entry--leader", Deck.isLeader deck c ) ]
                        ]
                        ([ span
                            [ class "deckfact-leader_option"
                            , classList [ ( "deckfact-leader_option--leader", Deck.isLeader deck c ) ]
                            ]
                            (if Deck.isLeader deck c then
                                [ Icon.icon ( Icon.Leader, Icon.Standard ) ]

                             else
                                []
                            )
                         , span [ class "deckfact-bp" ] [ UI.Attribute.bloodPotency c.bloodPotency ]
                         , span [ class "deckfact-clan" ] [ Icon.clan c.clan ]
                         , span [ class "deckfact-name" ] [ text c.name ]
                         ]
                            ++ (c.disciplines
                                    |> List.map (span [ class "deckfact-discipline" ] << List.singleton << Icon.discipline)
                               )
                        )
                )
        )


cardCount : List ( a, Int ) -> Int
cardCount =
    List.foldl (\( _, n ) sum -> sum + n) 0


viewLibraryList : Deck -> Html Msg
viewLibraryList deck =
    let
        { actions, combat, other } =
            groupLibraryCards deck

        viewGroup name group =
            if cardCount group < 1 then
                []

            else
                [ h4 [ class "decklist-library_section_header" ]
                    [ text name
                    , text " ("
                    , text <| String.fromInt <| cardCount group
                    , text ")"
                    ]
                , ul []
                    (group
                        |> List.map
                            (\( c, n ) ->
                                li [ class "decklist-library_entry" ]
                                    [ span [] [ text (String.fromInt n) ]
                                    , span [] [ text "× " ]
                                    , span [] [ text c.name ]
                                    ]
                            )
                    )
                ]
    in
    div [ class "decklist-library" ] <|
        List.concat
            [ viewGroup "Actions" actions
            , viewGroup "Combat" combat
            , viewGroup "Other" other
            ]


groupLibraryCards : Deck -> { actions : List ( Cards.Library, Int ), combat : List ( Cards.Library, Int ), other : List ( Cards.Library, Int ) }
groupLibraryCards deck =
    let
        groups =
            { actions = [], combat = [], other = [] }

        assignToGroup ( card, n ) oldGroups =
            if List.any (\trait -> trait == Cards.Action || trait == Cards.UnhostedAction) card.traits then
                { oldGroups | actions = ( card, n ) :: oldGroups.actions }

            else if List.any (\trait -> trait == Cards.Attack || trait == Cards.Reaction) card.traits then
                { oldGroups | combat = ( card, n ) :: oldGroups.combat }

            else
                { oldGroups | other = ( card, n ) :: oldGroups.other }
    in
    Dict.values deck.library |> List.foldl assignToGroup groups
