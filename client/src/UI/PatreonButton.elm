module UI.PatreonButton exposing (patreonButton)

import Html exposing (Html, a, div, span, text)
import Html.Attributes as Attr
import Svg exposing (circle, g, rect, svg)
import Svg.Attributes exposing (cx, cy, fill, height, r, strokeWidth, viewBox, width, x, y)


patreonButton : Html msg
patreonButton =
    div [ Attr.class "patreon" ]
        [ a
            [ Attr.class "patreon__button"
            , Attr.tabindex 0
            , Attr.type_ "button"
            , Attr.href "https://www.patreon.com/bePatron?u=2418485"
            , Attr.attribute "role" "button"
            , Attr.target "_blank"
            , Attr.rel "noopener noreferrer"
            ]
            [ div [ Attr.class "patreon__w1" ]
                [ div [ Attr.class "patreon__w2" ]
                    [ span [ Attr.class "patreon__w3" ]
                        [ svg [ viewBox "0 0 569 546" ]
                            [ g [ strokeWidth "1.2px" ]
                                [ circle [ cx "362.589996", cy "204.589996", r "204.589996", fill "#000000" ] []
                                , rect [ height "545.799988", width "100", x "0", y "0", fill "#000000" ] []
                                ]
                            ]
                        ]
                    ]
                , div [ Attr.class "patreon__txt" ] [ text "Become a patron" ]
                ]
            ]
        ]
