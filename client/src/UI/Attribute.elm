module UI.Attribute exposing (bloodPotency, bloodPotencyRequirement, damage, mental, physical, shield, social)

import Cards
import Html exposing (..)
import Html.Attributes exposing (class, classList, src)
import UI.Icon


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
    attribute UI.Icon.bloodPotency Light


bloodPotencyRequirement : Cards.BloodPotencyRequirement -> Html msg
bloodPotencyRequirement requirement =
    Maybe.map (attribute UI.Icon.bloodPotencReq Light) requirement
        |> Maybe.withDefault nothing


physical : Cards.Attribute -> Html msg
physical =
    attribute UI.Icon.physical Dark


mental : Cards.Attribute -> Html msg
mental =
    attribute UI.Icon.mental Dark


social : Cards.Attribute -> Html msg
social =
    attribute UI.Icon.social Dark


damage : Maybe Cards.Damage -> Html msg
damage attr =
    case attr of
        Just 0 ->
            nothing

        Nothing ->
            nothing

        Just positiveValue ->
            attribute UI.Icon.damage Light positiveValue


shield : Maybe Cards.Damage -> Html msg
shield attr =
    case attr of
        Just 0 ->
            nothing

        Nothing ->
            nothing

        Just positiveValue ->
            attribute UI.Icon.shield Light positiveValue


nothing : Html msg
nothing =
    span [] []
