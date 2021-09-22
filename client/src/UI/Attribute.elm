module UI.Attribute exposing (bloodPotency, bloodPotencyRequirement, damage, mental, physical, shield, social)

import Cards
import Html exposing (..)
import Html.Attributes exposing (class, classList, src)


type Style
    = Light
    | Dark


attribute : String -> Style -> Int -> Html msg
attribute url style n =
    span [ class "attr" ]
        [ span
            [ class "attr-icon"
            , classList
                [ ( "attr-icon--light", style == Light )
                , ( "attr-icon--dark", style == Dark )
                ]
            ]
            [ img [ src url ] [] ]
        , span
            [ classList
                [ ( "attr-number--light", style == Light )
                , ( "attr-number--dark", style == Dark )
                ]
            ]
            [ text <| String.fromInt n ]
        ]


bloodPotency : Cards.BloodPotency -> Html msg
bloodPotency =
    attribute "/assets/icons/icon-bloodpotency.svg" Light


bloodPotencyRequirement : Cards.BloodPotencyRequirement -> Html msg
bloodPotencyRequirement requirement =
    Maybe.map (attribute "/assets/icons/icon-bloodpotencyrequirement.svg" Light) requirement
        |> Maybe.withDefault nothing


physical : Cards.Attribute -> Html msg
physical =
    attribute "/assets/icons/icon-physical.svg" Dark


mental : Cards.Attribute -> Html msg
mental =
    attribute "/assets/icons/icon-mental.svg" Dark


social : Cards.Attribute -> Html msg
social =
    attribute "/assets/icons/icon-social.svg" Dark


damage : Maybe Cards.Damage -> Html msg
damage attr =
    case attr of
        Just 0 ->
            nothing

        Nothing ->
            nothing

        Just positiveValue ->
            attribute "/assets/icons/icon-damage.svg" Light positiveValue


shield : Maybe Cards.Damage -> Html msg
shield attr =
    case attr of
        Just 0 ->
            nothing

        Nothing ->
            nothing

        Just positiveValue ->
            attribute "/assets/icons/icon-shield.svg" Light positiveValue


nothing : Html msg
nothing =
    span [] []
