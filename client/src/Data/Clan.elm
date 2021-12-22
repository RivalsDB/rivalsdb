module Data.Clan exposing (Clan(..), all, comparable, decoder, fromString, name, toString)

import Enum exposing (Enum)
import Json.Decode exposing (Decoder)


type Clan
    = Brujah
    | Gangrel
    | Malkavian
    | Nosferatu
    | ThinBlood
    | Toreador
    | Tremere
    | Ventrue


enum : Enum Clan
enum =
    Enum.create
        [ ( "brujah", Brujah )
        , ( "gangrel", Gangrel )
        , ( "malkavian", Malkavian )
        , ( "nosferatu", Nosferatu )
        , ( "thin-blood", ThinBlood )
        , ( "toreador", Toreador )
        , ( "tremere", Tremere )
        , ( "ventrue", Ventrue )
        ]


toString : Clan -> String
toString =
    enum.toString


fromString : String -> Maybe Clan
fromString =
    enum.fromString


all : List Clan
all =
    List.map Tuple.second enum.list


decoder : Decoder Clan
decoder =
    enum.decoder


comparable : Clan -> Int
comparable c =
    case c of
        Brujah ->
            1

        Gangrel ->
            2

        Malkavian ->
            3

        Nosferatu ->
            4

        ThinBlood ->
            5

        Toreador ->
            6

        Tremere ->
            7

        Ventrue ->
            8


name : Clan -> String
name c =
    case c of
        Brujah ->
            "Brujah"

        Gangrel ->
            "Gangrel"

        Malkavian ->
            "Malkavian"

        Nosferatu ->
            "Nosferatu"

        ThinBlood ->
            "Thin-blood"

        Toreador ->
            "Toreador"

        Tremere ->
            "Tremere"

        Ventrue ->
            "Ventrue"
