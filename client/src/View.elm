module View exposing (View, map, none, placeholder, toBrowserDocument)

import Browser
import Html exposing (Html)


type alias View msg =
    { body : List (Html msg) }


placeholder : String -> View msg
placeholder str =
    { body = [ Html.text str ]
    }


none : View msg
none =
    placeholder ""


map : (a -> b) -> View a -> View b
map fn view =
    { body = List.map (Html.map fn) view.body
    }


toBrowserDocument : View msg -> Browser.Document msg
toBrowserDocument view =
    { title = title
    , body = view.body
    }


title : String
title =
    "Rivals DB"
