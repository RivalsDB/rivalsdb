module UI.Layout.Header exposing (view)

import Gen.Route as Route
import Html exposing (Html, a, button, div, form, header, input, li, span, text, ul)
import Html.Attributes exposing (class, classList, href, placeholder, spellcheck, type_, value)
import Html.Events exposing (onClick, onInput, onSubmit)
import Shared
import UI.Icon as Icon


view : (Shared.Msg -> msg) -> Shared.Model -> Html msg
view msg shared =
    header [ class "page-header", class "header" ]
        [ div [ class "logo" ]
            [ a [ class "logo__img", href <| Route.toHref Route.Home_ ]
                [ span [ class "logo__txt" ] [ text "Rivals DB" ] ]
            ]
        , ul [ class "header__nav", class "nav" ] <|
            ([ li [ class "nav__item" ]
                [ a [ href <| Route.toHref Route.Decks ] [ text "Decks" ] ]
             , li [ class "nav__item" ]
                [ a [ href <| Route.toHref Route.Search ] [ text "Cards" ] ]
             ]
                ++ (if isSignedId shared.user then
                        [ li [ class "nav__item", class "nav__item--ext" ]
                            [ a [ href <| Route.toHref Route.MyDecks ] [ text "My Decks" ]
                            ]
                        , li [ class "nav__item", class "nav__item--ext" ]
                            [ a [ href <| Route.toHref Route.Deck__New ] [ text "New Deck" ]
                            ]
                        , li [ class "nav__item", class "nav__item--ext" ]
                            [ a [ href <| Route.toHref Route.Profile ] [ text "My Profile" ]
                            ]
                        ]

                    else
                        []
                   )
                ++ [ li [ class "nav__item", class "nav__item--ext" ]
                        [ if isSignedId shared.user then
                            button
                                [ class "login_button"
                                , class "login_button--out"
                                , onClick (msg Shared.HeaderClickedSignOut)
                                ]
                                [ text "Sign Out" ]

                          else
                            button
                                [ class "login_button"
                                , class "login_button--in"
                                , onClick (msg Shared.HeaderClickedSignIn)
                                ]
                                [ text "Sign In" ]
                        ]
                   , li [ class "nav__item", class "nav__item--ext" ]
                        [ form [ onSubmit (msg Shared.HeaderSearchQuerySubmitted) ]
                            [ input
                                [ onInput (Shared.HeaderSearchQueryChanged >> msg)
                                , placeholder "Card search"
                                , type_ "search"
                                , spellcheck False
                                , value shared.headerSearchInput
                                ]
                                []
                            ]
                        ]
                   , li [ class "nav__item", class "nav__burger" ]
                        [ button [ class "burger", onClick (msg Shared.ToggleBurgerMenu) ]
                            [ div [ class "burger__icon" ]
                                [ Icon.icon ( Icon.Menu, Icon.Standard )
                                ]
                            ]
                        ]
                   ]
            )
        , div [ class "burgernav", classList [ ( "burgernav--open", shared.burgerMenu ) ] ]
            [ ul [ class "burgernav__content" ]
                (if isSignedId shared.user then
                    [ li [ class "burgernav__item" ]
                        [ a
                            [ onClick (msg Shared.ToggleBurgerMenu)
                            , class "burgernav__link"
                            , href <| Route.toHref Route.MyDecks
                            ]
                            [ text "My Decks"
                            ]
                        ]
                    , li [ class "burgernav__item" ]
                        [ a [ class "burgernav__link", href <| Route.toHref Route.Deck__New ]
                            [ text "New Deck"
                            ]
                        ]
                    , li [ class "burgernav__item" ]
                        [ a [ class "burgernav__link", href <| Route.toHref Route.Tournaments ]
                            [ text "Deck Collections"
                            ]
                        ]
                    , li [ class "burgernav__item" ]
                        [ a [ class "burgernav__link", href <| Route.toHref Route.Profile ]
                            [ text "My Profile"
                            ]
                        ]
                    , li [ class "burgernav__item", class "burgernav__item--emphasis" ]
                        [ button
                            [ onClick (msg Shared.HeaderClickedSignOut) ]
                            [ text "Sign Out" ]
                        ]
                    ]

                 else
                    [ li [ class "burgernav__item", class "burgernav__item--emphasis" ]
                        [ button
                            [ onClick (msg Shared.HeaderClickedSignIn) ]
                            [ text "Sign In" ]
                        ]
                    ]
                )
            ]
        ]


isSignedId : Maybe a -> Bool
isSignedId =
    Maybe.map (always True) >> Maybe.withDefault False
