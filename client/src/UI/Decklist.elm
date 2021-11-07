module UI.Decklist exposing (Actions, viewCreate, viewDeck, viewEdit)

import Cards
import Clan
import Deck exposing (DeckPostSave, DeckPreSave, Name(..), isLeader)
import Dict
import Html exposing (Html, button, div, form, h3, h4, input, li, p, span, text, ul)
import Html.Attributes exposing (class, classList, placeholder, type_)
import Html.Events exposing (onClick, onInput, onSubmit)
import UI.Attribute
import UI.Card
import UI.CardName
import UI.Icon as Icon


viewDeck : DeckPostSave -> Html msg
viewDeck { decklist, meta } =
    div [ class "decklist" ]
        [ viewDeckTitleReadOnly meta
        , viewAgenda decklist.agenda
        , viewHaven decklist.haven
        , viewLeader (Deck.leader decklist)
        , viewFaction factionEntryReadOnly decklist
        , viewLibrary decklist.library
        ]


viewCreate : Actions msg -> DeckPreSave -> Html msg
viewCreate actions { decklist, meta } =
    div [ class "decklist" ]
        [ viewDeckTitleEditable actions meta.name
        , viewAgenda decklist.agenda
        , viewHaven decklist.haven
        , viewLeader (Deck.leader decklist)
        , viewFaction (factionEntryEditable actions) decklist
        , viewLibrary decklist.library
        ]


viewEdit : Actions msg -> DeckPostSave -> Html msg
viewEdit actions { decklist, meta } =
    div [ class "decklist" ]
        [ viewDeckTitleEditable actions meta.name
        , viewAgenda decklist.agenda
        , viewHaven decklist.haven
        , viewLeader (Deck.leader decklist)
        , viewFaction (factionEntryEditable actions) decklist
        , viewLibrary decklist.library
        ]


type alias Actions msg =
    { setLeader : Cards.Faction -> msg
    , startNameChange : msg
    , endNameChange : msg
    , changeName : String -> msg
    }


viewDeckTitleReadOnly : Deck.MetaPostSave -> Html msg
viewDeckTitleReadOnly meta =
    div [ class "decklist__title" ]
        [ p []
            [ span [ class "decklist__title-name" ]
                [ text <| Deck.displayName meta.name ]
            , text " by "
            , text <| Deck.ownerDisplayName meta
            ]
        ]


viewDeckTitleEditable : Actions msg -> Deck.Name -> Html msg
viewDeckTitleEditable { startNameChange, changeName, endNameChange } name =
    div [ class "decklist__title" ]
        [ case name of
            Unnamed ->
                p []
                    [ span [ class "decklist__title-name" ]
                        [ text "Unnamed"
                        ]
                    , span [ class "decklist__title-action", onClick startNameChange ]
                        [ text "(rename deck)" ]
                    ]

            Named someName ->
                p []
                    [ span [ class "decklist__title-name" ]
                        [ text someName
                        ]
                    , span [ class "decklist__title-action", onClick startNameChange ]
                        [ text "(rename deck)" ]
                    ]

            BeingNamed _ ->
                div []
                    [ form [ onSubmit endNameChange ]
                        [ input [ placeholder "My Cool Deck", onInput changeName ] []
                        , button [ type_ "submit" ] [ text "ok" ]
                        ]
                    ]
        ]


viewAgenda : Maybe Cards.Agenda -> Html msg
viewAgenda agenda =
    div
        [ class "decklist__core"
        , class "decklist__agenda"
        ]
        [ p [ class "decklist__core-heading" ]
            [ text "Agenda: "
            , text <| Maybe.withDefault "Unknown" <| Maybe.map .name agenda
            ]
        , div [ class "decklist__core-image" ]
            [ agenda
                |> Maybe.map (Cards.AgendaCard >> UI.Card.eager)
                |> Maybe.withDefault (text "Unknown Agenda")
            ]
        ]


viewLeader : Maybe Cards.Faction -> Html msg
viewLeader leader =
    div
        [ class "decklist__core"
        , class "decklist__leader"
        ]
        [ p [ class "decklist__core-heading" ]
            [ text "Leader: "
            , text <| Maybe.withDefault "Unknown" <| Maybe.map .name leader
            ]
        , div [ class "decklist__core-image" ]
            [ leader
                |> Maybe.map (Cards.FactionCard >> UI.Card.eager)
                |> Maybe.withDefault (text "Unknown Leader")
            ]
        ]


viewHaven : Maybe Cards.Haven -> Html msg
viewHaven haven =
    div
        [ class "decklist__core"
        , class "decklist__haven"
        ]
        [ p [ class "decklist__core-heading" ]
            [ text "Haven: "
            , text <| Maybe.withDefault "Unknown" <| Maybe.map .name haven
            ]
        , div [ class "decklist__core-image" ]
            [ haven
                |> Maybe.map (Cards.HavenCard >> UI.Card.eager)
                |> Maybe.withDefault (text "Unknown Haven")
            ]
        ]


viewFaction : (( Cards.Faction, Bool ) -> Html msg) -> Deck.Decklist -> Html msg
viewFaction toFactionEntry decklist =
    let
        clansInFaction =
            Deck.clansInFaction decklist.faction

        sortedCharacters =
            Dict.values decklist.faction |> List.sortWith factionSort
    in
    div [ class "decklist__faction", class "deck-faction" ]
        [ div
            [ class "deck-faction__header"
            , classList [ ( "deck-faction__header--invalid", not <| Deck.isValidFaction decklist ) ]
            ]
            [ h3 [ class "deck-faction__title" ] [ text "Faction" ]
            , div [ class "deck-faction__clan-list" ]
                (clansInFaction
                    |> List.map
                        (\( clan, _ ) ->
                            span [ class "deck-faction__clan-item" ]
                                [ Icon.clan clan ]
                        )
                )
            ]
        , ul []
            (sortedCharacters |> List.map toFactionEntry)
        ]


factionEntryEditable : Actions msg -> ( Cards.Faction, Bool ) -> Html msg
factionEntryEditable { setLeader } ( character, isLeader ) =
    li
        [ class "deck-faction__character"
        , classList [ ( "deck-faction__character--leader", isLeader ) ]
        ]
        ([ span
            [ class "deck-faction__leader"
            , class "deck-faction__leader--editable"
            , onClick (setLeader character)
            ]
            (if isLeader then
                [ Icon.icon ( Icon.Leader, Icon.Standard ) ]

             else
                []
            )
         , span [ class "deck-faction__bp" ] [ UI.Attribute.bloodPotency character.bloodPotency ]
         , span [ class "deck-faction__clan" ] [ Icon.clan character.clan ]
         , span [ class "deck-faction__name" ] [ text character.name ]
         ]
            ++ (character.disciplines
                    |> List.map (span [ class "deck-faction__discipline" ] << List.singleton << Icon.discipline)
               )
        )


factionEntryReadOnly : ( Cards.Faction, Bool ) -> Html msg
factionEntryReadOnly ( character, isLeader ) =
    li
        [ class "deck-faction__character"
        , classList [ ( "deck-faction__character--leader", isLeader ) ]
        ]
        ([ span [ class "deck-faction__leader" ]
            (if isLeader then
                [ Icon.icon ( Icon.Leader, Icon.Standard ) ]

             else
                []
            )
         , span [ class "deck-faction__bp" ]
            [ UI.Attribute.bloodPotency character.bloodPotency
            ]
         , span [ class "deck-faction__clan" ]
            [ Icon.clan character.clan
            ]
         , span [ class "deck-faction__name" ]
            [ UI.CardName.withOverlay (Cards.FactionCard character)
            ]
         ]
            ++ (character.disciplines
                    |> List.map (span [ class "deck-faction__discipline" ] << List.singleton << Icon.discipline)
               )
        )


viewLibrary : Deck.Library -> Html msg
viewLibrary library =
    let
        { actions, combat, other } =
            groupLibraryCards library
    in
    div [ class "decklist__library", class "deck-library" ]
        [ viewLibraryHeader library
        , div []
            (List.concat
                [ viewLibraryGroup "Actions" actions
                , viewLibraryGroup "Combat" combat
                , viewLibraryGroup "Other" other
                ]
            )
        ]


viewLibraryHeader : Deck.Library -> Html msg
viewLibraryHeader library =
    h3
        [ class "deck-library__header"
        , classList [ ( "deck-library__header--invalid", not <| Deck.isValidLibrary library ) ]
        ]
        (text "Library"
            :: (case cardCount <| Dict.values library of
                    0 ->
                        []

                    n ->
                        [ text " (", text <| String.fromInt n, text ")" ]
               )
        )


viewLibraryGroup : String -> List ( Cards.Library, Int ) -> List (Html msg)
viewLibraryGroup name group =
    if cardCount group < 1 then
        []

    else
        [ h4 [ class "deck-library__section-header" ]
            [ text name
            , text " ("
            , text <| String.fromInt <| cardCount group
            , text ")"
            ]
        , ul []
            (group
                |> List.sortBy (Tuple.first >> .name)
                |> List.map
                    (\( card, n ) ->
                        li [ class "deck-library__entry" ]
                            [ span [] [ text (String.fromInt n) ]
                            , span [] [ text "× " ]
                            , UI.CardName.withOverlay (Cards.LibraryCard card)
                            , span [] [ Maybe.map Icon.clan card.clan |> Maybe.withDefault (text "") ]
                            ]
                    )
            )
        ]


cardCount : List ( a, Int ) -> Int
cardCount =
    List.foldl (\( _, n ) sum -> sum + n) 0


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
