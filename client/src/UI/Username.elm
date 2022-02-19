module UI.Username exposing (..)

import Data.Patronage as Patronage exposing (Patronage)
import Html exposing (Html, span, text)
import Html.Attributes exposing (class)
import List
import UI.Icon


view : Patronage -> String -> Html msg
view patronage name =
    span [ class "username" ]
        (List.concat
            [ if Patronage.isKindred patronage then
                [ span [ class "username__patronage" ] [ UI.Icon.icon ( UI.Icon.Skull, UI.Icon.Negative ) ] ]

              else
                []
            , [ span [ class "username__name" ] [ text name ] ]
            ]
        )
