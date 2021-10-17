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
    span [ class "attr" ]
        [ span
            [ class "attr-icon"
            , case style of
                Light ->
                    class "attr-icon--light"

                Dark ->
                    class "attr-icon--dark"
            ]
            [ icon ]
        , span
            [ case style of
                Light ->
                    class "attr-number--light"

                Dark ->
                    class "attr-number--dark"
            ]
            [ text <| String.fromInt n ]
        ]


bloodPotency : Cards.BloodPotency -> Html msg
bloodPotency =
    attribute (Icon.icon ( Icon.BloodPotency, Icon.Standard )) Light


bloodPotencyRequirement : Cards.BloodPotencyRequirement -> Html msg
bloodPotencyRequirement requirement =
    Maybe.map (attribute (Icon.icon ( Icon.BloodPotencReq, Icon.Standard )) Light) requirement
        |> Maybe.withDefault nothing


physical : Cards.Attribute -> Html msg
physical =
    attribute (Icon.icon ( Icon.Physical, Icon.Standard )) Dark


mental : Cards.Attribute -> Html msg
mental =
    attribute (Icon.icon ( Icon.Mental, Icon.Standard )) Dark


social : Cards.Attribute -> Html msg
social =
    attribute (Icon.icon ( Icon.Social, Icon.Standard )) Dark


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
