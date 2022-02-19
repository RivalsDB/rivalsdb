module Data.Clan exposing (Clan(..), all, comparable, decoder, fromString, name, toString)

import Enum exposing (Enum)
import Json.Decode exposing (Decoder)


type Clan
    = Brujah
    | Gangrel
    | Hecata
    | Lasombra
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
        , ( "hecata", Hecata )
        , ( "lasombra", Lasombra )
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


comparable : Clan -> String
comparable =
    name


name : Clan -> String
name c =
    case c of
        Brujah ->
            "Brujah"

        Gangrel ->
            "Gangrel"

        Hecata ->
            "Hecata"

        Lasombra ->
            "Lasombra"

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
