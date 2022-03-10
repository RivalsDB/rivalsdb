module UI.Decklist exposing (Actions, viewRead, viewWrite)

import Cards
import Data.Clan as Clan exposing (Clan)
import Data.Deck as Deck exposing (Deck, Name(..), isLeader)
import Data.GameMode as GameMode exposing (GameMode)
import Data.Trait as Trait
import Data.Visibility as Visibility exposing (Visibility)
import Dict
import Html exposing (Html, button, div, form, h3, h4, input, label, li, option, p, select, span, text, ul)
import Html.Attributes exposing (class, classList, name, placeholder, selected, title, type_, value)
import Html.Events exposing (onClick, onInput, onSubmit)
import UI.Attribute
import UI.Card
import UI.CardName
import UI.Icon as Icon
import UI.Icon.V2
import UI.QuantityPicker as QuantityPicker
import UI.Text
import UI.Username


viewRead : Deck -> Html msg
viewRead { decklist, meta } =
    div [ class "decklist" ]
        [ viewDeckTitleReadOnly meta
        , viewAgenda decklist.agenda
        , viewHaven decklist.haven
        , viewLeader (Deck.leader decklist)
        , viewFaction factionEntryRead decklist
        , viewLibrary libraryEntryRead decklist.library
        ]


viewWrite : Actions msg -> Deck -> Html msg
viewWrite actions { decklist, meta } =
    div [ class "decklist" ]
        [ viewDeckTitleEditable actions meta
        , viewAgenda decklist.agenda
        , viewHaven decklist.haven
        , viewLeader (Deck.leader decklist)
        , viewFaction (factionEntryWrite actions) decklist
        , viewLibrary (libraryEntryWrite actions) decklist.library
        ]


type alias Actions msg =
    { setLeader : Cards.Faction -> msg
    , startNameChange : msg
    , endNameChange : msg
    , changeName : String -> msg
    , setGameMode : GameMode -> msg
    , setVisibility : Visibility -> msg
    , changeCard : QuantityPicker.Choice -> msg
    }


viewDeckTitleReadOnly : Deck.Meta -> Html msg
viewDeckTitleReadOnly meta =
    div [ class "decklist__title" ]
        [ UI.Text.header [ text <| Deck.displayName meta.name ]
        , div [ class "decklist__meta" ]
            [ UI.Text.subheader
                [ text "by "
                , UI.Username.view meta.patronage (Deck.ownerDisplayName meta)
                ]
            , p [ class "decklist__details" ]
                [ text <| "(" ++ String.join " • " [ Visibility.toString meta.visibility, GameMode.longName meta.gameMode ] ++ ")"
                ]
            ]
        ]


viewDeckTitleEditable : Actions msg -> Deck.Meta -> Html msg
viewDeckTitleEditable { startNameChange, changeName, endNameChange, setGameMode, setVisibility } meta =
    div [ class "decklist__title" ]
        [ div []
            (case meta.name of
                Unnamed ->
                    [ span [ class "decklist__title-name" ]
                        [ UI.Text.header [ text "Unnamed" ] ]
                    , span [ class "decklist__title-action", onClick startNameChange ]
                        [ text "(rename deck)" ]
                    ]

                Named someName ->
                    [ span [ class "decklist__title-name" ]
                        [ UI.Text.header [ text someName ] ]
                    , span [ class "decklist__title-action", onClick startNameChange ]
                        [ text "(rename deck)" ]
                    ]

                BeingNamed _ ->
                    [ form [ onSubmit endNameChange ]
                        [ input [ placeholder "My Cool Deck", onInput changeName ] []
                        , button [ type_ "submit" ] [ text "ok" ]
                        ]
                    ]
            )
        , div [ class "decklist__meta" ]
            [ label []
                [ text "Visibility: "
                , select
                    [ onInput
                        (Visibility.fromString
                            >> Maybe.withDefault Visibility.default
                            >> setVisibility
                        )
                    ]
                    ([ Visibility.Public
                     , Visibility.Private
                     ]
                        |> List.map
                            (\mode ->
                                option
                                    [ value <| Visibility.toString mode
                                    , selected <| mode == meta.visibility
                                    ]
                                    [ text <| Visibility.toString mode ]
                            )
                    )
                ]
            , label []
                [ text "Best for: "
                , select
                    [ onInput
                        (GameMode.fromString
                            >> Maybe.withDefault GameMode.default
                            >> setGameMode
                        )
                    ]
                    ([ GameMode.Both
                     , GameMode.HeadToHead
                     , GameMode.Multiplayer
                     ]
                        |> List.map
                            (\mode ->
                                option
                                    [ value <| GameMode.toString mode
                                    , selected <| mode == meta.gameMode
                                    ]
                                    [ text <| GameMode.longName mode ]
                            )
                    )
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
            , classList
                [ ( "deck-faction__header--invalid"
                  , not <| (Deck.isEmptyFaction decklist || Deck.isValidFaction decklist)
                  )
                ]
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
                                [ UI.Icon.V2.clan UI.Icon.V2.Negative clan ]
                        )
                )
            ]
        , ul []
            (sortedCharacters |> List.map toFactionEntry)
        ]


factionEntryRead : ( Cards.Faction, Bool ) -> Html msg
factionEntryRead ( character, isLeader ) =
    li
        [ class "deck-faction__character"
        , classList [ ( "deck-faction__character--leader", isLeader ) ]
        ]
        ([ viewFactionBP character.bloodPotency
         , viewFactionClan character.clan
         , viewFactionName character
         ]
            ++ (if isLeader then
                    [ span [ class "deck-faction__leader-tag" ] [ text "(Leader)" ] ]

                else
                    []
               )
            ++ (character.disciplines
                    |> List.map (span [ class "deck-faction__discipline" ] << List.singleton << UI.Icon.V2.discipline UI.Icon.V2.Standard)
               )
        )


factionEntryWrite : Actions msg -> ( Cards.Faction, Bool ) -> Html msg
factionEntryWrite { setLeader, changeCard } ( character, isLeader ) =
    li [ class "deck-faction__character", classList [ ( "deck-faction__character--leader", isLeader ) ] ]
        (List.concat
            [ [ span
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
              , viewFactionBP character.bloodPotency
              , viewFactionClan character.clan
              , viewFactionName character
              ]
            , character.disciplines
                |> List.map (span [ class "deck-faction__discipline" ] << List.singleton << UI.Icon.V2.discipline UI.Icon.V2.Standard)
            , [ button
                    [ class "deck-faction__remove"
                    , title "Remove"
                    , onClick (changeCard ( Cards.FactionCard character, 0 ))
                    ]
                    [ text "X" ]
              ]
            ]
        )


viewFactionBP : Cards.BloodPotency -> Html msg
viewFactionBP bp =
    span [ class "deck-faction__bp" ] [ UI.Attribute.bloodPotency bp ]


viewFactionClan : Clan -> Html msg
viewFactionClan clan =
    span [ class "deck-faction__clan" ] [ UI.Icon.V2.clan UI.Icon.V2.Negative clan ]


viewFactionName : Cards.Faction -> Html msg
viewFactionName character =
    span [ class "deck-faction__name" ] [ UI.CardName.withOverlay (Cards.FactionCard character) ]


viewLibrary : (( Cards.Library, Int ) -> Html msg) -> Deck.Library -> Html msg
viewLibrary viewLibraryEntry library =
    let
        { actions, combat, political } =
            groupLibraryCards library
    in
    div [ class "decklist__library", class "deck-library" ]
        [ h3
            [ class "decklist--section-header"
            , class "deck-library__header"
            , classList
                [ ( "deck-library__header--invalid"
                  , not <|
                        (Deck.isEmptyLibrary library
                            || Deck.isValidLibrary library
                        )
                  )
                ]
            ]
            [ titleAndCardCount "Library" (Dict.values library |> cardCount) ]
        , div []
            (List.concat
                [ viewLibraryGroup viewLibraryEntry "Actions" actions
                , viewLibraryGroup viewLibraryEntry "Combat" combat
                , viewLibraryGroup viewLibraryEntry "Political" political
                ]
            )
        ]


viewLibraryGroup : (( Cards.Library, Int ) -> Html msg) -> String -> List ( Cards.Library, Int ) -> List (Html msg)
viewLibraryGroup viewLibraryEntry name group =
    if cardCount group < 1 then
        []

    else
        [ h4 [ class "decklist--subsection-header", class "deck-library__section-header" ]
            [ titleAndCardCount name (cardCount group) ]
        , ul []
            (group
                |> List.sortBy (Tuple.first >> .name)
                |> List.map viewLibraryEntry
            )
        ]


libraryEntryRead : ( Cards.Library, Int ) -> Html msg
libraryEntryRead ( card, n ) =
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
                            [ UI.Icon.V2.clan UI.Icon.V2.Negative clan ]
                        ]
               )
        )


libraryEntryWrite : Actions msg -> ( Cards.Library, Int ) -> Html msg
libraryEntryWrite { changeCard } ( card, n ) =
    li [ class "deck-library__entry" ]
        ([ span [ class "deck-library__entry-picker" ]
            [ QuantityPicker.view changeCard (Cards.LibraryCard card) n
            ]
         , UI.CardName.withOverlay (Cards.LibraryCard card)
         ]
            ++ (case card.clan of
                    Nothing ->
                        []

                    Just clan ->
                        [ span [ class "deck-library__entry-clan" ]
                            [ UI.Icon.V2.clan UI.Icon.V2.Negative clan ]
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
            if List.any Trait.isCombat card.traits then
                { oldGroups | combat = ( card, n ) :: oldGroups.combat }

            else if List.any Trait.isPolitical card.traits then
                { oldGroups | political = ( card, n ) :: oldGroups.political }

            else
                { oldGroups | actions = ( card, n ) :: oldGroups.actions }
    in
    Dict.values library |> List.foldl assignToGroup libraryGroups


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
                    case compare (Clan.comparable a.clan) (Clan.comparable b.clan) of
                        EQ ->
                            compare a.name b.name

                        order ->
                            order

                order ->
                    order
