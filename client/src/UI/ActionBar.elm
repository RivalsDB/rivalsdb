module UI.ActionBar exposing (Model, view)

import Gen.Route as Route exposing (Route)
import Html exposing (Attribute, Html, a, div, li, span, text, ul)
import Html.Attributes exposing (class, href)
import Html.Events exposing (onClick)
import UI.Icon as Icon


type alias Model msg =
    { icon : Icon.IconImage
    , name : String
    , action : Maybe msg
    , href : Maybe Route
    }


view : List (Model msg) -> Html msg
view actions =
    ul [ class "action-bar__list" ]
        (actions |> List.map action)


action : Model msg -> Html msg
action model =
    li (itemAttrs model)
        [ wrapper model
            [ span [ class "action-bar__icon" ] [ Icon.icon ( model.icon, Icon.Standard ) ]
            , span [ class "action-bar__description" ] [ text model.name ]
            ]
        ]


itemAttrs : Model msg -> List (Attribute msg)
itemAttrs model =
    case model.action of
        Nothing ->
            [ class "action-bar__item" ]

        Just msg ->
            [ class "action-bar__item", onClick msg ]


wrapper : Model msg -> List (Html msg) -> Html msg
wrapper model =
    case model.href of
        Nothing ->
            div []

        Just route ->
            a [ href <| Route.toHref route, class "action-bar__link" ]
