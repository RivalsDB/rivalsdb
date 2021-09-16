module UI.Layout.Footer exposing (view)

import Html exposing (Html, footer, p, small, text)
import Html.Attributes exposing (class)


view : Html msg
view =
    footer [ class "page-footer" ]
        [ small [ class "footer-legal" ]
            [ p [] [ text "This site is not owned, endorsed or supported by Renegade Game Studios" ]
            , p [] [ text "The information presented above about Vampire the Masquerade Rivals, both literal and graphical, is © Renegade Game Studio. All Rights reserved." ]
            , p [] [ text "© 2020 Renegade Game Studios, Paradox Interactive®, Vampire The Masquerade®, World of Darkness®, Copyright 2020 Paradox Interactive AB (publ)." ]
            ]
        ]
