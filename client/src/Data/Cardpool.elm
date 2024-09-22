module Data.Cardpool exposing (Cardpool(..), all, code, comparable, decoder, fromString, list, name, toString)

import Enum exposing (Enum)
import Json.Decode exposing (Decoder)


type Cardpool
    = Vampire
    | Hunter
    | Werewolf


enum : Enum Cardpool
enum =
    Enum.create
        [ ( "Vampire", Vampire )
        , ( "Hunter", Hunter )
        , ( "Werewolf", Werewolf )
        ]


toString : Cardpool -> String
toString =
    enum.toString


fromString : String -> Maybe Cardpool
fromString =
    enum.fromString


all : List Cardpool
all =
    List.map Tuple.second enum.list


decoder : Decoder Cardpool
decoder =
    enum.decoder


comparable : Cardpool -> String
comparable =
    name


name : Cardpool -> String
name c =
    case c of
        Vampire ->
            "Vampire"

        Hunter ->
            "Hunter"

        Werewolf ->
            "Werewolf"


code : Cardpool -> String
code c =
    case c of
        Vampire ->
            "V"

        Hunter ->
            "H"

        Werewolf ->
            "W"


list : List ( String, Cardpool )
list =
    enum.list
