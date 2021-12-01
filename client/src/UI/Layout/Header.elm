module UI.Layout.Header exposing (view)

import Gen.Route as Route
import Html exposing (Html, a, button, div, form, header, input, li, nav, span, text, ul)
import Html.Attributes exposing (class, href, placeholder, spellcheck, type_)
import Html.Events exposing (onClick, onInput, onSubmit)
import Shared
import Util exposing (htmlList)


view : (Shared.Msg -> msg) -> Maybe Shared.User -> Html msg
view msg user =
    header [ class "page-header", class "header" ]
        [ div [ class "header-logo" ]
            [ a [ href <| Route.toHref Route.Home_ ] [ span [] [ text "Rivals DB" ] ] ]
        , nav [ class "header-nav" ]
            [ ul [] <|
                htmlList
                    [ ( li [] [ a [ href <| Route.toHref Route.Decks ] [ text "Decks" ] ], True )
                    , ( li [] [ a [ href <| Route.toHref Route.MyDecks ] [ text "My Decks" ] ], isJust user )
                    , ( li [] [ a [ href <| Route.toHref Route.Deck__New ] [ text "New Deck" ] ], isJust user )
                    , ( li [] [ a [ href <| Route.toHref Route.Search ] [ text "Cards" ] ], True )
                    , ( li [] [ a [ href <| Route.toHref Route.Profile ] [ text "My Profile" ] ], isJust user )
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
            [ if isJust user then
                button [ class "login_button", class "login_button--out", onClick (msg Shared.HeaderClickedSignOut) ] [ text "Sign Out" ]

              else
                button [ class "login_button", class "login_button--in", onClick (msg Shared.HeaderClickedSignIn) ] [ text "Sign In" ]
            ]
        ]


isJust : Maybe a -> Bool
isJust =
    Maybe.map (always True) >> Maybe.withDefault False
