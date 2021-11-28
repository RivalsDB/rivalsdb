module UI.Attribute exposing (bloodPotency, bloodPotencyRequirement, damage, mental, physical, shield, social)

import Cards
import Html exposing (..)
import Html.Attributes exposing (class)
import UI.Icon as Icon


type Style
    = Light
    | Dark


attribute : Html msg -> Style -> Int -> Html msg
attribute icon style n =
    span [ class "attribute" ]
        [ span
            [ class "attribute__icon"
            , case style of
                Light ->
                    class "attribute__icon--light"

                Dark ->
                    class "attribute__icon--dark"
            ]
            [ icon ]
        , span
            [ class "attribute__number"
            , case style of
                Light ->
                    class "attribute-number--light"

                Dark ->
                    class "attribute-number--dark"
            ]
            [ text <| String.fromInt n ]
        ]


bloodPotency : Cards.BloodPotency -> Html msg
bloodPotency =
    attribute (Icon.icon ( Icon.BloodPotency, Icon.Colored )) Light


bloodPotencyRequirement : Cards.BloodPotencyRequirement -> Html msg
bloodPotencyRequirement requirement =
    Maybe.map (attribute (Icon.icon ( Icon.BloodPotencReq, Icon.Colored )) Light) requirement
        |> Maybe.withDefault nothing


physical : Cards.Attribute -> Html msg
physical =
    attribute (Icon.icon ( Icon.Physical, Icon.Colored )) Light


mental : Cards.Attribute -> Html msg
mental =
    attribute (Icon.icon ( Icon.Mental, Icon.Colored )) Light


social : Cards.Attribute -> Html msg
social =
    attribute (Icon.icon ( Icon.Social, Icon.Colored )) Light


damage : Maybe Cards.Damage -> Html msg
damage attr =
    case attr of
        Just 0 ->
            nothing

        Nothing ->
            nothing

        Just positiveValue ->
            attribute (Icon.icon ( Icon.Damage, Icon.Standard )) Light positiveValue


shield : Maybe Cards.Damage -> Html msg
shield attr =
    case attr of
        Just 0 ->
            nothing

        Nothing ->
            nothing

        Just positiveValue ->
            attribute (Icon.icon ( Icon.Shield, Icon.Standard )) Light positiveValue


nothing : Html msg
nothing =
    span [] []
