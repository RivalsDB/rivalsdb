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
    ( value, String )


selected : Model value -> List value
selected model =
    List.map Tuple.first model.selected


init : List ( value, String ) -> Model value
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
                    List.partition (Tuple.second >> (==) selectedName) model.available

                newSelected =
                    model.selected ++ matches
            in
            { model | available = newAvailable, selected = newSelected }

        RemoveOption removedValue ->
            let
                ( matches, newSelected ) =
                    List.partition (Tuple.first >> (==) removedValue) model.selected

                newAvailable =
                    model.available ++ matches
            in
            { model | available = newAvailable, selected = newSelected }


autoSorted : String -> (Msg value -> msg) -> Model value -> Html msg
autoSorted =
    Lazy.lazy3 view_


view_ : String -> (Msg value -> msg) -> Model value -> Html msg
view_ description msg model =
    div
        [ class "multiselect"
        , classList [ ( "multiselect--no-selection", List.isEmpty model.selected ) ]
        ]
        [ div [ class "multiselect__line" ] (List.map (viewSelectedOption msg) model.selected)
        , select
            [ class "multiselect__dropdown"
            , onInput (msg << SelectOption)
            , value description
            ]
            (model.available
                |> List.map Tuple.second
                |> List.sort
                |> List.append [ description ]
                |> List.map (\name -> option [ value name ] [ text name ])
            )
        ]


viewSelectedOption : (Msg value -> msg) -> Option value -> Html msg
viewSelectedOption msg ( value, name ) =
    span [ class "multiselect__selected-option" ]
        [ span [ class "multiselect__selected-title" ] [ text name ]
        , button
            [ class "multiselect__selected-option-remove"
            , onClick <| msg (RemoveOption value)
            , title <| ("Unselect " ++ name)
            ]
            [ text "⮿" ]
        ]