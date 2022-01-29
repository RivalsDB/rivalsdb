module UI.Layout.Toast exposing (Model, Msg(..), Style(..), create, init, subscriptions, update, view)

import Html exposing (Html, div, p, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onMouseEnter, onMouseLeave)
import Task
import Time


type Style
    = Success
    | Error


type alias Toast =
    { style : Style
    , title : String
    , subtitle : Maybe String
    , fadeAt : Time.Posix
    }


fadeAt : Style -> Time.Posix -> Time.Posix
fadeAt style now =
    Time.posixToMillis now
        |> (+)
            (if style == Success then
                5000

             else
                10000
            )
        |> Time.millisToPosix


type alias Model =
    List Toast


init : Model
init =
    []


create : Style -> String -> Maybe String -> Cmd Msg
create style title subtitle =
    Task.perform (Create style title subtitle) Time.now


view : Model -> Html msg
view model =
    div [ class "page-toast" ] (List.map viewToast model)


viewToast : Toast -> Html msg
viewToast toast =
    div
        [ class "toast"
        , case toast.style of
            Success ->
                class "toast--success"

            Error ->
                class "toast--error"
        ]
        (p [ class "toast__title" ] [ text toast.title ]
            :: (toast.subtitle
                    |> Maybe.map
                        (\subtitle ->
                            [ p [ class "toast__subtitle" ] [ text subtitle ] ]
                        )
                    |> Maybe.withDefault []
               )
        )


type Msg
    = Create Style String (Maybe String) Time.Posix
    | Tick Time.Posix


update : Msg -> Model -> Model
update msg model =
    case msg of
        Create style title subtitle now ->
            let
                newToast =
                    { style = style
                    , title = title
                    , subtitle = subtitle
                    , fadeAt = fadeAt style now
                    }
            in
            List.append model [ newToast ]

        Tick now ->
            let
                nowMs =
                    Time.posixToMillis now

                filtered =
                    model |> List.filter (.fadeAt >> Time.posixToMillis >> (<) nowMs)
            in
            filtered


subscriptions : Sub Msg
subscriptions =
    Time.every 1000 Tick
