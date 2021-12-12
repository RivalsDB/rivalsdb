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
import UI.Text


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
        [ UI.Text.header [ text <| Deck.displayName meta.name ]
        , UI.Text.subheader
            [ text "by "
            , text <| Deck.ownerDisplayName meta
            ]
        ]


viewDeckTitleEditable : Actions msg -> Deck.Name -> Html msg
viewDeckTitleEditable { startNameChange, changeName, endNameChange } name =
    div [ class "decklist__title" ]
        [ case name of
            Unnamed ->
                div []
                    [ span [ class "decklist__title-name" ]
                        [ UI.Text.header [ text "Unnamed" ] ]
                    , span [ class "decklist__title-action", onClick startNameChange ]
                        [ text "(rename deck)" ]
                    ]

            Named someName ->
                div []
                    [ span [ class "decklist__title-name" ]
                        [ UI.Text.header [ text someName ] ]
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
            [ h3
                [ class "decklist--section-header"
                , class "deck-faction__title"
                ]
                [ text "Faction" ]
            , div [ class "deck-faction__clan-list" ]
                (clansInFaction
                    |> List.map
                        (\( clan, _ ) ->
                            span [ class "deck-faction__clan-item" ]
                                [ Icon.clan Icon.Negative clan ]
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
            [ class "deck-faction__leader-button"
            , class
                (if isLeader then
                    "deck-faction__leader-button--on"

                 else
                    "deck-faction__leader-button--off"
                )
            , onClick (setLeader character)
            ]
            [ div [ class "deck-faction__leader-icon" ] [ Icon.icon ( Icon.Leader, Icon.Standard ) ] ]
         , span [ class "deck-faction__bp" ] [ UI.Attribute.bloodPotency character.bloodPotency ]
         , span [ class "deck-faction__clan" ] [ Icon.clan Icon.Negative character.clan ]
         , span [ class "deck-faction__name" ] [ UI.CardName.withOverlay (Cards.FactionCard character) ]
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
        ([ span [ class "deck-faction__bp" ] [ UI.Attribute.bloodPotency character.bloodPotency ]
         , span [ class "deck-faction__clan" ] [ Icon.clan Icon.Negative character.clan ]
         , span [ class "deck-faction__name" ] [ UI.CardName.withOverlay (Cards.FactionCard character) ]
         ]
            ++ (if isLeader then
                    [ span [ class "deck-faction__leader-tag" ] [ text "(Leader)" ] ]

                else
                    []
               )
            ++ (character.disciplines
                    |> List.map (span [ class "deck-faction__discipline" ] << List.singleton << Icon.discipline)
               )
        )


viewLibrary : Deck.Library -> Html msg
viewLibrary library =
    let
        { actions, combat, political } =
            groupLibraryCards library
    in
    div [ class "decklist__library", class "deck-library" ]
        [ viewLibraryHeader library
        , div []
            (List.concat
                [ viewLibraryGroup "Actions" actions
                , viewLibraryGroup "Combat" combat
                , viewLibraryGroup "Political" political
                ]
            )
        ]


viewLibraryHeader : Deck.Library -> Html msg
viewLibraryHeader library =
    h3
        [ class "decklist--section-header"
        , class "deck-library__header"
        , classList [ ( "deck-library__header--invalid", not <| Deck.isValidLibrary library ) ]
        ]
        [ titleAndCardCount "Library" (Dict.values library |> cardCount) ]


viewLibraryGroup : String -> List ( Cards.Library, Int ) -> List (Html msg)
viewLibraryGroup name group =
    if cardCount group < 1 then
        []

    else
        [ h4 [ class "decklist--subsection-header", class "deck-library__section-header" ]
            [ titleAndCardCount name (cardCount group) ]
        , ul []
            (group
                |> List.sortBy (Tuple.first >> .name)
                |> List.map libraryEntry
            )
        ]


libraryEntry : ( Cards.Library, Int ) -> Html msg
libraryEntry ( card, n ) =
    li [ class "deck-library__entry" ]
        ([ span [ class "deck-library__entry-count" ] [ text (String.fromInt n) ]
         , span [ class "deck-library__entry-times" ] [ text "×" ]
         , UI.CardName.withOverlay (Cards.LibraryCard card)
         ]
            ++ (case card.clan of
                    Nothing ->
                        []

                    Just clan ->
                        [ span [ class "deck-library__entry-clan" ]
                            [ Icon.clan Icon.Negative clan ]
                        ]
               )
        )


titleAndCardCount : String -> Int -> Html msg
titleAndCardCount title count =
    if count > 0 then
        text (title ++ " (" ++ String.fromInt count ++ ")")

    else
        text title


cardCount : List ( a, Int ) -> Int
cardCount =
    List.foldl (\( _, n ) sum -> sum + n) 0


type alias LibraryGroups =
    { actions : List ( Cards.Library, Int )
    , combat : List ( Cards.Library, Int )
    , political : List ( Cards.Library, Int )
    }


libraryGroups : LibraryGroups
libraryGroups =
    { actions = [], combat = [], political = [] }


groupLibraryCards : Deck.Library -> LibraryGroups
groupLibraryCards library =
    let
        assignToGroup ( card, n ) oldGroups =
            if List.any isCombatTrait card.traits then
                { oldGroups | combat = ( card, n ) :: oldGroups.combat }

            else if List.any isPoliticsTrait card.traits then
                { oldGroups | political = ( card, n ) :: oldGroups.political }

            else
                { oldGroups | actions = ( card, n ) :: oldGroups.actions }
    in
    Dict.values library |> List.foldl assignToGroup libraryGroups


isCombatTrait : Cards.Trait -> Bool
isCombatTrait trait =
    trait == Cards.Attack || trait == Cards.Reaction


isPoliticsTrait : Cards.Trait -> Bool
isPoliticsTrait trait =
    trait == Cards.InfluenceModifier || trait == Cards.Title || trait == Cards.Scheme


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
