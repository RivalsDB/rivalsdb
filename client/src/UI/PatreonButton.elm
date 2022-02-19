module UI.PatreonButton exposing (patreonButton)

import Html exposing (Html, a, div, span, text)
import Html.Attributes exposing (attribute, class, href, rel, tabindex, target, type_)
import Svg exposing (circle, g, rect, svg)
import Svg.Attributes exposing (cx, cy, height, r, viewBox, width, x, y)


patreonButton : Html msg
patreonButton =
    div [ class "patreon" ]
        [ a
            [ class "patreon__button"
            , tabindex 0
            , type_ "button"
            , href "https://www.patreon.com/bePatron?u=2418485"
            , attribute "role" "button"
            , target "_blank"
            , rel "noopener noreferrer"
            ]
            [ div [ class "patreon__w1" ]
                [ div [ class "patreon__w2" ]
                    [ span [ class "patreon__w3" ]
                        [ svg [ viewBox "0 0 569 546", Svg.Attributes.class "patreon__svg" ]
                            [ g []
                                [ circle [ cx "362.589996", cy "204.589996", r "204.589996" ] []
                                , rect [ height "545.799988", width "100", x "0", y "0" ] []
                                ]
                            ]
                        ]
                    ]
                , div [ class "patreon__txt" ] [ text "Become a patron" ]
                ]
            ]
        ]
