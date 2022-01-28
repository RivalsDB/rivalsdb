module UI.MultiSelect exposing (Model, Msg, autoSorted, init, selected, update)

import Html exposing (Html, button, div, option, select, span, text)
import Html.Attributes exposing (class, classList, title, value)
import Html.Events exposing (onClick, onInput)
import Html.Lazy as Lazy


type alias Model value =
    { available : List (Option value)
    , selected : List (Option value)
    }


type alias Option value =
    ( String, value )


optionName : Option value -> String
optionName =
    Tuple.first


optionValue : Option value -> value
optionValue =
    Tuple.second


selected : Model value -> List value
selected model =
    List.map Tuple.second model.selected


init : List (Option value) -> Model value
init options =
    { available = options, selected = [] }


type Msg value
    = SelectOption String
    | RemoveOption value


update : Msg value -> Model value -> Model value
update msg model =
    case msg of
        SelectOption selectedName ->
            let
                ( matches, newAvailable ) =
                    List.partition (optionName >> (==) selectedName) model.available

                newSelected =
                    model.selected ++ matches
            in
            { model | available = newAvailable, selected = newSelected }

        RemoveOption removedValue ->
            let
                ( matches, newSelected ) =
                    List.partition (optionValue >> (==) removedValue) model.selected

                newAvailable =
                    model.available ++ matches
            in
            { model | available = newAvailable, selected = newSelected }


autoSorted : String -> Model value -> Html (Msg value)
autoSorted =
    Lazy.lazy2 view_


view_ : String -> Model value -> Html (Msg value)
view_ description model =
    div
        [ class "multiselect"
        , classList [ ( "multiselect--no-selection", List.isEmpty model.selected ) ]
        ]
        [ div [ class "multiselect__line" ] (List.map viewSelectedOption model.selected)
        , select
            [ class "multiselect__dropdown"
            , onInput SelectOption
            , value description
            ]
            (model.available
                |> List.map optionName
                |> List.sort
                |> List.append [ description ]
                |> List.map (\name -> option [ value name ] [ text name ])
            )
        ]


viewSelectedOption : Option value -> Html (Msg value)
viewSelectedOption option =
    let
        name =
            optionName option

        value =
            optionValue option
    in
    span [ class "multiselect__selected-option" ]
        [ span [ class "multiselect__selected-title" ] [ text name ]
        , button
            [ class "multiselect__selected-option-remove"
            , onClick <| RemoveOption value
            , title <| ("Unselect " ++ name)
            ]
            [ text "⮿" ]
        ]
