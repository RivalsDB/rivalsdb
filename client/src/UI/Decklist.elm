module UI.Decklist exposing (view)

import Cards
import Clan exposing (Clan)
import Deck exposing (Deck, Meta, isLeader)
import Dict
import Html exposing (Html, div, h3, h4, li, p, span, text, ul)
import Html.Attributes exposing (class, classList)
import UI.Attribute
import UI.Card
import UI.Icon as Icon


view : Deck -> Html msg
view deck =
    div [ class "decklist" ]
        [ viewDeckTitle deck.meta
        , viewAgenda deck.decklist.agenda
        , viewHaven deck.decklist.haven
        , viewLeader (Deck.leader deck.decklist)
        , viewFaction deck.decklist
        , viewLibrary deck.decklist.library
        ]


viewDeckTitle : Meta -> Html msg
viewDeckTitle meta =
    div [ class "decklist-title" ]
        [ p [] [ span [ class "decklist-titlename" ] [ text meta.name ] ] ]


viewAgenda : Maybe Cards.Agenda -> Html msg
viewAgenda agenda =
    div [ class "decklist-core", class "decklist-core--agenda" ]
        [ p [ class "decklist-section_header" ]
            [ text "Agenda: "
            , text <| Maybe.withDefault "Unknown" <| Maybe.map .name agenda
            ]
        , div [ class "decklist-core_image" ]
            [ agenda
                |> Maybe.map (Cards.AgendaCard >> UI.Card.lazy)
                |> Maybe.withDefault (text "Unknown Agenda")
            ]
        ]


viewLeader : Maybe Cards.Faction -> Html msg
viewLeader leader =
    div [ class "decklist-core", class "decklist-core--leader" ]
        [ p [ class "decklist-section_header" ]
            [ text "Leader: "
            , text <| Maybe.withDefault "Unknown" <| Maybe.map .name leader
            ]
        , div [ class "decklist-core_image" ]
            [ leader
                |> Maybe.map (Cards.FactionCard >> UI.Card.lazy)
                |> Maybe.withDefault (text "Unknown Leader")
            ]
        ]


viewHaven : Maybe Cards.Haven -> Html msg
viewHaven haven =
    div [ class "decklist-core", class "decklist-core--haven" ]
        [ p [ class "decklist-section_header" ]
            [ text "Haven: "
            , text <| Maybe.withDefault "Unknown" <| Maybe.map .name haven
            ]
        , div [ class "decklist-core_image" ]
            [ haven
                |> Maybe.map (Cards.HavenCard >> UI.Card.lazy)
                |> Maybe.withDefault (text "Unknown Haven")
            ]
        ]


viewFaction : Deck.Decklist -> Html msg
viewFaction decklist =
    div [ class "decklist-faction" ]
        [ div
            [ class "decklist-section_header"
            , classList [ ( "decklist-section_header--invalid", not <| Deck.isValidFaction decklist ) ]
            ]
            [ h3 [ class "decklist-section_header_name" ] [ text "Faction" ]
            , div [ class "decklist-section_header_extra" ]
                (Deck.clansInFaction decklist.faction |> List.map viewClanInFactionHeader)
            ]
        , ul [ class "deckfact" ]
            (sortedFaction decklist.faction |> List.map viewCharacter)
        ]


viewClanInFactionHeader : ( Clan, Int ) -> Html msg
viewClanInFactionHeader ( clan, _ ) =
    span [ class "decklist-clan_entry" ]
        [ span [ class "decklist-clan_clan" ] [ Icon.clan clan ] ]


viewCharacter : ( Cards.Faction, Bool ) -> Html msg
viewCharacter ( character, isLeader ) =
    li
        [ class "deckfact-entry"
        , classList [ ( "deckfact-entry--leader", isLeader ) ]
        ]
        ([ span
            [ class "deckfact-leader_option"
            , classList [ ( "deckfact-leader_option--leader", isLeader ) ]
            ]
            (if isLeader then
                [ Icon.icon ( Icon.Leader, Icon.Standard ) ]

             else
                []
            )
         , span [ class "deckfact-bp" ] [ UI.Attribute.bloodPotency character.bloodPotency ]
         , span [ class "deckfact-clan" ] [ Icon.clan character.clan ]
         , span [ class "deckfact-name" ] [ text character.name ]
         ]
            ++ (character.disciplines
                    |> List.map (span [ class "deckfact-discipline" ] << List.singleton << Icon.discipline)
               )
        )


viewLibrary : Deck.Library -> Html msg
viewLibrary library =
    div [ class "decklist-library" ]
        [ h3
            [ class "decklist-section_header"
            , classList [ ( "decklist-section_header--invalid", not <| Deck.isValidLibrary2 library ) ]
            ]
            (text "Library"
                :: (case cardCount <| Dict.values library of
                        0 ->
                            []

                        n ->
                            [ text " (", text <| String.fromInt n, text ")" ]
                   )
            )
        , viewLibraryList library
        ]


cardCount : List ( a, Int ) -> Int
cardCount =
    List.foldl (\( _, n ) sum -> sum + n) 0


viewLibraryList : Deck.Library -> Html msg
viewLibraryList library =
    let
        { actions, combat, other } =
            groupLibraryCards library

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


groupLibraryCards : Deck.Library -> { actions : List ( Cards.Library, Int ), combat : List ( Cards.Library, Int ), other : List ( Cards.Library, Int ) }
groupLibraryCards library =
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
    Dict.values library |> List.foldl assignToGroup groups


sortedFaction : Deck.Faction -> List ( Cards.Faction, Bool )
sortedFaction faction =
    Dict.values faction |> List.sortWith factionSort


factionSort : ( Cards.Faction, Bool ) -> ( Cards.Faction, Bool ) -> Order
factionSort ( a, aLeader ) ( b, bLeader ) =
    case ( aLeader, bLeader ) of
        ( True, False ) ->
            LT

        ( False, True ) ->
            GT

        _ ->
            case compare (negate a.bloodPotency) (negate b.bloodPotency) of
                EQ ->
                    case Clan.compare_ a.clan b.clan of
                        EQ ->
                            compare a.name b.name

                        order ->
                            order

                order ->
                    order
