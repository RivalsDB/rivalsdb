module UI.Card exposing (eager, lazy)

import Cards exposing (Card)
import Data.Pack as Pack
import Html exposing (Attribute, Html, div, img)
import Html.Attributes as Attr exposing (attribute, class, src)


lazy : Card -> Html msg
lazy =
    common (attribute "loading" "lazy")


eager : Card -> Html msg
eager =
    common (attribute "loading" "eager")


common : Attribute msg -> Card -> Html msg
common loading card =
    div [ class "cardimage" ]
        [ img
            [ class "cardimage"
            , title card
            , src <| Cards.image card
            , loading
            ]
            []
        ]


title : Card -> Attribute msg
title card =
    let
        name =
            Cards.name card

        pack =
            Pack.toString (Cards.set card)
    in
    Attr.title <| name ++ " - " ++ pack
