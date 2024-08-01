module UI.Layout.Footer exposing (view)

import Gen.Route as Route
import Html exposing (Html, a, div, footer, p, small, text)
import Html.Attributes exposing (class, href, target)


view : Html msg
view =
    footer [ class "page-footer", class "footer" ]
        [ div []
            [ div [ class "footer__links" ]
                [ a [ href <| Route.toHref Route.About ] [ text "About" ] ]
            , small [ class "footer__legal" ]
                [ p [] [ text "This site is not owned, endorsed or supported by Renegade Game Studios" ]
                , p []
                    [ text "Portions of the materials are the copyrights and trademarks of Paradox Interactive AB, and are used with permission. All rights reserved. For more information please visit "
                    , a [ target "__blank", href "http://worldofdarkness.com/" ] [ text "worldofdarkness.com" ]
                    , text "."
                    ]
                ]
            ]
        ]
