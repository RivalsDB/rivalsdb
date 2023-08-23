module Data.Cardpool exposing (Cardpool(..), all, comparable, code, decoder, fromString, name, toString)

import Enum exposing (Enum)
import Json.Decode exposing (Decoder)


type Cardpool
    = Vampire
    | Hunter
    | HunterAndVampire

enum : Enum Cardpool
enum =
    Enum.create

        [ ( "vampire", Vampire )
        , ( "hunter", Hunter )
        , ( "hunter and vampire", HunterAndVampire )
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

        HunterAndVampire ->
            "Hunter and Vampire"

code: Cardpool -> String
code c =
    case c of
        Vampire ->
            "V"

        Hunter ->
            "H"

        HunterAndVampire ->
            "H/V"
