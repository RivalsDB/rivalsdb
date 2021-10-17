module UI.FilterSelection exposing (Model, Msg(..), attackTypes, clans, disciplines, isAllowed, primaryTraits, secondaryTraits, stacks, update, view)

import Cards
import Html exposing (Html, div, input, label, span)
import Html.Attributes exposing (class, classList, type_)
import Html.Events exposing (onCheck)
import UI.Icon as Icon


type alias Model value msg =
    List ( value, ( Html msg, Bool ) )


stacks : Model Cards.CardStack msg
stacks =
    List.map modelHelper
        [ ( Cards.AgendaStack, Icon.icon ( Icon.AgendaCard, Icon.Standard ) )
        , ( Cards.HavenStack, Icon.icon ( Icon.Haven, Icon.Standard ) )
        , ( Cards.FactionStack, Icon.icon ( Icon.Faction, Icon.Standard ) )
        , ( Cards.LibraryStack, Icon.icon ( Icon.Library, Icon.Standard ) )
        ]


primaryTraits : Model Cards.Trait msg
primaryTraits =
    List.map modelHelper
        [ ( Cards.Action, Icon.icon ( Icon.Action, Icon.Standard ) )
        , ( Cards.UnhostedAction, Icon.icon ( Icon.UnhostedAction, Icon.Standard ) )
        , ( Cards.Attack, Icon.icon ( Icon.Attack, Icon.Standard ) )
        , ( Cards.Reaction, Icon.icon ( Icon.Reaction, Icon.Standard ) )
        , ( Cards.InfluenceModifier, Icon.icon ( Icon.InfluenceModifier, Icon.Standard ) )
        ]


secondaryTraits : Model Cards.Trait msg
secondaryTraits =
    List.map modelHelper
        [ ( Cards.Ongoing, Icon.icon ( Icon.Ongoing, Icon.Standard ) )
        , ( Cards.Scheme, Icon.icon ( Icon.Scheme, Icon.Standard ) )
        , ( Cards.Title, Icon.icon ( Icon.Title, Icon.Standard ) )
        , ( Cards.Conspiracy, Icon.icon ( Icon.Conspiracy, Icon.Standard ) )
        , ( Cards.Alchemy, Icon.icon ( Icon.Alchemy, Icon.Standard ) )
        , ( Cards.Ritual, Icon.icon ( Icon.Ritual, Icon.Standard ) )
        , ( Cards.Special, Icon.icon ( Icon.Special, Icon.Standard ) )
        ]


attackTypes : Model Cards.AttackType msg
attackTypes =
    List.map modelHelper
        [ ( Cards.Physical, Icon.icon ( Icon.Physical, Icon.Standard ) )
        , ( Cards.Social, Icon.icon ( Icon.Social, Icon.Standard ) )
        , ( Cards.Mental, Icon.icon ( Icon.Mental, Icon.Standard ) )
        , ( Cards.Ranged, Icon.icon ( Icon.Ranged, Icon.Standard ) )
        ]


clans : Model Cards.Clan msg
clans =
    List.map modelHelper
        [ ( Cards.Brujah, Icon.icon ( Icon.Brujah, Icon.Standard ) )
        , ( Cards.Gangrel, Icon.icon ( Icon.Gangrel, Icon.Standard ) )
        , ( Cards.Malkavian, Icon.icon ( Icon.Malkavian, Icon.Standard ) )
        , ( Cards.Nosferatu, Icon.icon ( Icon.Nosferatu, Icon.Standard ) )
        , ( Cards.ThinBlood, Icon.icon ( Icon.ThinBlood, Icon.Standard ) )
        , ( Cards.Toreador, Icon.icon ( Icon.Toreador, Icon.Standard ) )
        , ( Cards.Tremere, Icon.icon ( Icon.Tremere, Icon.Standard ) )
        , ( Cards.Ventrue, Icon.icon ( Icon.Ventrue, Icon.Standard ) )
        ]


disciplines : Model Cards.Discipline msg
disciplines =
    List.map modelHelper
        [ ( Cards.Animalism, Icon.icon ( Icon.Animalism, Icon.Standard ) )
        , ( Cards.Auspex, Icon.icon ( Icon.Auspex, Icon.Standard ) )
        , ( Cards.Celerity, Icon.icon ( Icon.Celerity, Icon.Standard ) )
        , ( Cards.Dominate, Icon.icon ( Icon.Dominate, Icon.Standard ) )
        , ( Cards.Fortitude, Icon.icon ( Icon.Fortitude, Icon.Standard ) )
        , ( Cards.Obfuscate, Icon.icon ( Icon.Obfuscate, Icon.Standard ) )
        , ( Cards.Potence, Icon.icon ( Icon.Potence, Icon.Standard ) )
        , ( Cards.Presence, Icon.icon ( Icon.Presence, Icon.Standard ) )
        , ( Cards.Protean, Icon.icon ( Icon.Protean, Icon.Standard ) )
        , ( Cards.BloodSorcery, Icon.icon ( Icon.BloodSorcery, Icon.Standard ) )
        , ( Cards.ThinBloodAlchemy, Icon.icon ( Icon.ThinBloodAlchemy, Icon.Standard ) )
        ]


modelHelper : ( trait, Html msg ) -> ( trait, ( Html msg, Bool ) )
modelHelper ( trait, icon ) =
    ( trait, ( span [ class "fltrslct-icon_wrapper" ] [ icon ], False ) )


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
