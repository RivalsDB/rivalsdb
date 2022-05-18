module UI.Layout.TSplit exposing (view)

import Html exposing (Html, main_, section)
import Html.Attributes exposing (class)


type alias Model msg =
    { bar : Html msg
    , main : Html msg
    , secondary : Html msg
    }


view : Model msg -> Html msg
view model =
    main_ [ class "tsplit" ]
        [ section [ class "tsplit__main" ] [ model.main ]
        , section [ class "tsplit__secondary" ] [ model.secondary ]
        , section [ class "tsplit__bar" ] [ model.bar ]
        ]
