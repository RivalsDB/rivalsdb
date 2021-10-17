module UI.FilterSelection exposing (Model, Msg(..), attackTypes, clans, disciplines, isAllowed, primaryTraits, secondaryTraits, stacks, update, view)

import Cards
import Html exposing (Html, div, input, label, span, text)
import Html.Attributes exposing (class, classList, title, type_)
import Html.Events exposing (onCheck)
import UI.Icon as Icon


type alias Model value msg =
    List ( value, ( Html msg, Bool ) )


stacks : Model Cards.CardStack msg
stacks =
    List.map modelHelper
        [ ( Cards.AgendaStack, ( "Agenda", Icon.icon ( Icon.AgendaCard, Icon.Standard ) ) )
        , ( Cards.HavenStack, ( "Haven", Icon.icon ( Icon.Haven, Icon.Standard ) ) )
        , ( Cards.FactionStack, ( "Faction", Icon.icon ( Icon.Faction, Icon.Standard ) ) )
        , ( Cards.LibraryStack, ( "Library", Icon.icon ( Icon.Library, Icon.Standard ) ) )
        ]


primaryTraits : Model Cards.Trait msg
primaryTraits =
    List.map modelHelper
        [ ( Cards.Action, ( "Action", Icon.icon ( Icon.Action, Icon.Standard ) ) )
        , ( Cards.UnhostedAction, ( "Unhosted Action", Icon.icon ( Icon.UnhostedAction, Icon.Standard ) ) )
        , ( Cards.Attack, ( "Attack", Icon.icon ( Icon.Attack, Icon.Standard ) ) )
        , ( Cards.Reaction, ( "Reaction", Icon.icon ( Icon.Reaction, Icon.Standard ) ) )
        , ( Cards.InfluenceModifier, ( "Influence Modifier", Icon.icon ( Icon.InfluenceModifier, Icon.Standard ) ) )
        ]


secondaryTraits : Model Cards.Trait msg
secondaryTraits =
    [ ( Cards.Ongoing, ( span [ title "Ongoing" ] [ text "♻️" ], False ) )
    , ( Cards.Scheme, ( span [ title "Scheme" ] [ text "🗳️" ], False ) )
    , ( Cards.Title, ( span [ title "Title" ] [ text "🤴" ], False ) )
    , ( Cards.Conspiracy, ( span [ title "Conspiracy" ] [ text "🙊" ], False ) )
    , ( Cards.Alchemy, ( span [ title "Alchemy" ] [ text "⚗️" ], False ) )
    , ( Cards.Ritual, ( span [ title "Ritual" ] [ text "🧙" ], False ) )
    , ( Cards.Special, ( span [ title "Special" ] [ text "❄️" ], False ) )
    ]


attackTypes : Model Cards.AttackType msg
attackTypes =
    List.map modelHelper
        [ ( Cards.Physical, ( "Physical", Icon.icon ( Icon.Physical, Icon.Standard ) ) )
        , ( Cards.Social, ( "Social", Icon.icon ( Icon.Social, Icon.Standard ) ) )
        , ( Cards.Mental, ( "Mental", Icon.icon ( Icon.Mental, Icon.Standard ) ) )
        , ( Cards.Ranged, ( "Ranged", Icon.icon ( Icon.Ranged, Icon.Standard ) ) )
        ]


clans : Model Cards.Clan msg
clans =
    List.map modelHelper
        [ ( Cards.Brujah, ( "Brujah", Icon.icon ( Icon.Brujah, Icon.Standard ) ) )
        , ( Cards.Gangrel, ( "Brujah", Icon.icon ( Icon.Gangrel, Icon.Standard ) ) )
        , ( Cards.Malkavian, ( "Brujah", Icon.icon ( Icon.Malkavian, Icon.Standard ) ) )
        , ( Cards.Nosferatu, ( "Brujah", Icon.icon ( Icon.Nosferatu, Icon.Standard ) ) )
        , ( Cards.ThinBlood, ( "Brujah", Icon.icon ( Icon.ThinBlood, Icon.Standard ) ) )
        , ( Cards.Toreador, ( "Brujah", Icon.icon ( Icon.Toreador, Icon.Standard ) ) )
        , ( Cards.Tremere, ( "Brujah", Icon.icon ( Icon.Tremere, Icon.Standard ) ) )
        , ( Cards.Ventrue, ( "Brujah", Icon.icon ( Icon.Ventrue, Icon.Standard ) ) )
        ]


disciplines : Model Cards.Discipline msg
disciplines =
    List.map modelHelper
        [ ( Cards.Animalism, ( "Animalism", Icon.icon ( Icon.Animalism, Icon.Standard ) ) )
        , ( Cards.Auspex, ( "Auspex", Icon.icon ( Icon.Auspex, Icon.Standard ) ) )
        , ( Cards.Celerity, ( "Celerity", Icon.icon ( Icon.Celerity, Icon.Standard ) ) )
        , ( Cards.Dominate, ( "Dominate", Icon.icon ( Icon.Dominate, Icon.Standard ) ) )
        , ( Cards.Fortitude, ( "Fortitude", Icon.icon ( Icon.Fortitude, Icon.Standard ) ) )
        , ( Cards.Obfuscate, ( "Obfuscate", Icon.icon ( Icon.Obfuscate, Icon.Standard ) ) )
        , ( Cards.Potence, ( "Potence", Icon.icon ( Icon.Potence, Icon.Standard ) ) )
        , ( Cards.Presence, ( "Presence", Icon.icon ( Icon.Presence, Icon.Standard ) ) )
        , ( Cards.Protean, ( "Protean", Icon.icon ( Icon.Protean, Icon.Standard ) ) )
        , ( Cards.BloodSorcery, ( "Blood Sorcery", Icon.icon ( Icon.BloodSorcery, Icon.Standard ) ) )
        , ( Cards.ThinBloodAlchemy, ( "", Icon.icon ( Icon.ThinBloodAlchemy, Icon.Standard ) ) )
        ]


modelHelper : ( a, ( String, Html msg ) ) -> ( a, ( Html msg, Bool ) )
modelHelper ( a, ( b, c ) ) =
    ( a, ( span [ title b, class "fltrslct-icon_wrapper" ] [ c ], False ) )


type Msg value
    = ChangedValue value Bool


update : Msg value -> Model value msg -> Model value msg
update msg model =
    case msg of
        ChangedValue changedKey newValue ->
            List.map
                (\option ->
                    if Tuple.first option == changedKey then
                        Tuple.mapSecond (Tuple.mapSecond (always newValue)) option

                    else
                        option
                )
                model


view : (Msg value -> msg) -> Model value msg -> Html msg
view msg options =
    div [ class "fltrslct" ] <|
        List.map
            (\( value, ( icon, isActive ) ) ->
                label
                    [ classList
                        [ ( "fltrslct-option", True )
                        , ( "fltrslct-option--actv", isActive )
                        ]
                    ]
                    [ div [ class "fltrslct-icon" ] [ icon ]
                    , input
                        [ type_ "checkbox"
                        , onCheck (ChangedValue value >> msg)
                        ]
                        []
                    ]
            )
            options


isAllowed : (Cards.Card -> List value) -> Model value msg -> Cards.Card -> Bool
isAllowed toValues model card =
    let
        whitelist =
            List.filterMap
                (\( key, ( _, isOn ) ) ->
                    if isOn then
                        Just key

                    else
                        Nothing
                )
                model
    in
    if List.isEmpty whitelist then
        True

    else
        toValues card |> List.any (\cardValue -> List.member cardValue whitelist)
