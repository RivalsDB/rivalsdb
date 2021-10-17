module UI.Layout.Modal exposing (view)

import Html exposing (Html, button, div, form, input, label, p, text)
import Html.Attributes exposing (class, type_)
import Html.Events exposing (onClick, onInput, onSubmit)
import Shared


view : (Shared.Msg -> msg) -> Html msg
view msg =
    div [ class "modal" ]
        [ div [ class "modal-bg", onClick (msg Shared.ModalClose) ] []
        , div [ class "modal-content" ]
            [ p [ class "modal-header" ]
                [ text "Sign In" ]
            , div [ class "modal-close", onClick (msg Shared.ModalClose) ]
                [ text "[x] Close" ]
            , form [ onSubmit (msg Shared.ModalSubmit) ]
                [ div [ class "modal-form" ]
                    [ label [ onInput (msg << Shared.ModalChangedEmail) ]
                        [ text "Email: "
                        , input [ type_ "email" ] []
                        ]
                    ]
                , div [ class "modal-submit" ]
                    [ button [ type_ "submit" ]
                        [ text "Sign in" ]
                    ]
                ]
            ]
        ]
