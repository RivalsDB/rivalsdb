module Pages.Home_ exposing (view)

import Html exposing (..)
import Html.Attributes exposing (class)
import UI.Logo
import View exposing (View)


view : View msg
view =
    body


body : List (Html msg)
body =
    [ header [ class "page-header" ]
        [ div [ class "header-logo" ]
            [ UI.Logo.logo ]
        ]
    , div [ class "page-content" ] []
    , footer [ class "page-footer" ]
        [ small [ class "footer-legal" ]
            [ p [] [ text "This site is not owned, endorsed or supported by Renegade Game Studios" ]
            , p [] [ text "The information presented above about Vampire the Masquerade Rivals, both literal and graphical, is © Renegade Game Studio. All Rights reserved." ]
            , p [] [ text "© 2020 Renegade Game Studios, Paradox Interactive®, Vampire The Masquerade®, World of Darkness®, Copyright 2020 Paradox Interactive AB (publ)." ]
            ]
        ]
    ]
