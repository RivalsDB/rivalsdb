module UI.Layout.Header exposing (view)

import Gen.Route as Route
import Html exposing (Html, a, button, div, form, header, input, li, nav, span, text, ul)
import Html.Attributes exposing (class, href, placeholder, spellcheck, type_)
import Html.Events exposing (onClick, onInput, onSubmit)
import Shared


view : (Shared.Msg -> msg) -> Maybe Shared.User -> Html msg
view msg user =
    header [ class "page-header", class "header" ]
        [ div [ class "header-logo" ]
            [ a [ href <| Route.toHref Route.Home_ ] [ span [] [ text "Rivals DB" ] ] ]
        , nav [ class "header-nav" ]
            [ ul []
                [ li [] [ a [ href <| Route.toHref Route.Decks ] [ text "Decks" ] ]
                , li [] [ a [ href <| Route.toHref Route.Deck__New ] [ text "New Deck" ] ]
                , li [] [ a [ href <| Route.toHref Route.Search ] [ text "Cards" ] ]
                , li [] [ a [ href <| Route.toHref Route.Profile ] [ text "My Profile" ] ]
                ]
            ]
        , div [ class "header-search" ]
            [ form [ onSubmit (msg Shared.HeaderSearchQuerySubmitted) ]
                [ input
                    [ onInput (Shared.HeaderSearchQueryChanged >> msg)
                    , placeholder "Card search"
                    , type_ "search"
                    , spellcheck False
                    ]
                    []
                ]
            ]
        , div [ class "header-login" ]
            [ case user of
                Just _ ->
                    button [ class "login_button", class "login_button--out", onClick (msg Shared.HeaderClickedSignOut) ] [ text "Sign Out" ]

                Nothing ->
                    button [ class "login_button", class "login_button--in", onClick (msg Shared.HeaderClickedSignIn) ] [ text "Sign In" ]
            ]
        ]
