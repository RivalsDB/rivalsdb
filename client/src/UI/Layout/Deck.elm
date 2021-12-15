module UI.Layout.Deck exposing (readMode, writeMode)

import Html exposing (Html, main_, section)
import Html.Attributes exposing (class)


type alias WriteModel msg =
    { actions : Html msg
    , decklist : Html msg
    , selectors : Html msg
    }


type alias ReadModel msg =
    { actions : Html msg
    , decklist : Html msg
    }


writeMode : WriteModel msg -> Html msg
writeMode model =
    main_ [ class "templ-deck" ]
        [ section [ class "templ-deck__decklist" ] [ model.decklist ]
        , section [ class "templ-deck__support" ] [ model.selectors ]
        , section [ class "templ-deck__actions" ] [ model.actions ]
        ]


readMode : ReadModel msg -> Html msg
readMode model =
    main_ [ class "templ-deck" ]
        [ section [ class "templ-deck__decklist" ] [ model.decklist ]
        , section [ class "templ-deck__support" ] []
        , section [ class "templ-deck__actions" ] [ model.actions ]
        ]
