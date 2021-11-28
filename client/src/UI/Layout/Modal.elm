module UI.Layout.Modal exposing (view)

import Html exposing (Html, button, div, form, input, label, p, text)
import Html.Attributes exposing (class, for, id, placeholder, type_)
import Html.Events exposing (onClick, onInput, onSubmit)
import Shared


view : (Shared.Msg -> msg) -> Html msg
view msg =
    div [ class "modal" ]
        [ div [ class "modal__bg", onClick (msg Shared.ModalClose) ] []
        , div [ class "modal__content" ]
            [ p [ class "modal__header" ]
                [ text "Sign In" ]
            , div [ class "modal__close", onClick (msg Shared.ModalClose) ]
                [ text "[x] Close" ]
            , form [ onSubmit (msg Shared.ModalSubmit) ]
                [ div [ class "modal__form" ]
                    [ label [ for "email", class "modal__label" ] [ text "Email:" ]
                    , input
                        [ type_ "email"
                        , id "email"
                        , placeholder "uncle.smelly@schreck.net"
                        , onInput (msg << Shared.ModalChangedEmail)
                        , class "modal__input"
                        ]
                        []
                    ]
                , div [ class "modal__submit" ]
                    [ button [ type_ "submit" ]
                        [ text "Sign in" ]
                    ]
                ]
            ]
        ]
