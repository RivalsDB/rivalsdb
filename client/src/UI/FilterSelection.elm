module UI.FilterSelection exposing (Model, Msg(..), attackTypes, clans, disciplines, isAllowed, primaryTraits, secondaryTraits, stacks, update, view)

import Cards exposing (Card)
import Data.Clan as Clan exposing (Clan)
import Html exposing (Html, div, input, label)
import Html.Attributes exposing (class, classList, type_)
import Html.Events exposing (onCheck)
import UI.Icon as Icon


type alias Model value msg =
    List ( value, ( Html msg, Bool ) )


stacks : Model Cards.CardStack msg
stacks =
    List.map modelHelper
        [ ( Cards.AgendaStack, Icon.AgendaCard )
        , ( Cards.HavenStack, Icon.Haven )
        , ( Cards.FactionStack, Icon.Faction )
        , ( Cards.LibraryStack, Icon.Library )
        ]


primaryTraits : Model Cards.Trait msg
primaryTraits =
    List.map modelHelper
        [ ( Cards.Action, Icon.Action )
        , ( Cards.UnhostedAction, Icon.UnhostedAction )
        , ( Cards.Attack, Icon.Attack )
        , ( Cards.Reaction, Icon.Reaction )
        , ( Cards.InfluenceModifier, Icon.InfluenceModifier )
        ]


secondaryTraits : Model Cards.Trait msg
secondaryTraits =
    List.map modelHelper
        [ ( Cards.Ongoing, Icon.Ongoing )
        , ( Cards.Scheme, Icon.Scheme )
        , ( Cards.Title, Icon.Title )
        , ( Cards.Conspiracy, Icon.Conspiracy )
        , ( Cards.Alchemy, Icon.Alchemy )
        , ( Cards.Ritual, Icon.Ritual )
        , ( Cards.Special, Icon.Special )
        ]


attackTypes : Model Cards.AttackType msg
attackTypes =
    List.map modelHelper
        [ ( Cards.Physical, Icon.Physical )
        , ( Cards.Social, Icon.Social )
        , ( Cards.Mental, Icon.Mental )
        , ( Cards.Ranged, Icon.Ranged )
        ]


clans : Model Clan msg
clans =
    List.map modelHelper
        [ ( Clan.Brujah, Icon.Brujah )
        , ( Clan.Gangrel, Icon.Gangrel )
        , ( Clan.Malkavian, Icon.Malkavian )
        , ( Clan.Nosferatu, Icon.Nosferatu )
        , ( Clan.ThinBlood, Icon.ThinBlood )
        , ( Clan.Toreador, Icon.Toreador )
        , ( Clan.Tremere, Icon.Tremere )
        , ( Clan.Ventrue, Icon.Ventrue )
        ]


disciplines : Model Cards.Discipline msg
disciplines =
    List.map modelHelper
        [ ( Cards.Animalism, Icon.Animalism )
        , ( Cards.Auspex, Icon.Auspex )
        , ( Cards.Celerity, Icon.Celerity )
        , ( Cards.Dominate, Icon.Dominate )
        , ( Cards.Fortitude, Icon.Fortitude )
        , ( Cards.Obfuscate, Icon.Obfuscate )
        , ( Cards.Potence, Icon.Potence )
        , ( Cards.Presence, Icon.Presence )
        , ( Cards.Protean, Icon.Protean )
        , ( Cards.BloodSorcery, Icon.BloodSorcery )
        , ( Cards.ThinBloodAlchemy, Icon.ThinBloodAlchemy )
        ]


modelHelper : ( trait, Icon.IconImage ) -> ( trait, ( Html msg, Bool ) )
modelHelper ( trait, icon ) =
    ( trait, ( Icon.icon ( icon, Icon.Standard ), False ) )


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
    div [ class "filterpicker" ]
        (List.map (viewFilterOption msg) options)


viewFilterOption : (Msg value -> msg) -> ( value, ( Html msg, Bool ) ) -> Html msg
viewFilterOption msg ( value, ( icon, isActive ) ) =
    label
        [ class "filterpicker__option"
        , classList [ ( "filterpicker__option--active", isActive ) ]
        ]
        [ div
            [ class "filterpicker__box"
            , classList [ ( "filterpicker__box--active", isActive ) ]
            ]
            [ icon ]
        , input
            [ class "filterpicker__checkbox"
            , type_ "checkbox"
            , onCheck (ChangedValue value >> msg)
            ]
            []
        ]


isAllowed : (Card -> List value) -> Model value msg -> Card -> Bool
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
