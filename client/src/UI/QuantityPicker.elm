module UI.QuantityPicker exposing (Choice, view)

import Cards exposing (Card)
import Html exposing (Html, div, input, label, text)
import Html.Attributes exposing (checked, class, classList, name, type_)
import Html.Events exposing (onClick)


type alias Choice =
    ( Card, Int )


view : (Choice -> msg) -> Card -> Int -> Html msg
view msg card copiesInDeck =
    div [ class "quantpick" ]
        (Cards.maxPerDeck card
            |> List.range 0
            |> List.map
                (\n ->
                    label
                        [ class "quantpick__option"
                        , classList [ ( "quantpick__option--active", n == copiesInDeck ) ]
                        ]
                        [ text <| String.fromInt n
                        , input
                            [ type_ "radio"
                            , name <| "count-" ++ Cards.id card
                            , checked <| n == copiesInDeck
                            , onClick <| msg ( card, n )
                            , class "quantpick__radio"
                            ]
                            []
                        ]
                )
        )
