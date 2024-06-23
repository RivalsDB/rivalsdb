module Data.Clan exposing (Clan(..), all, comparable, decoder, fromString, name, toString)

import Enum exposing (Enum)
import Json.Decode exposing (Decoder)


type Clan
    = BanuHaqim
    | Brujah
    | Caitiff
    | Faithful
    | Gangrel
    | Hecata
    | Inquisitive
    | Lasombra
    | Malkavian
    | Martial
    | Ministry
    | Nosferatu
    | Ravnos
    | Salubri
    | ThinBlood
    | Toreador
    | Tremere
    | Tzimisce
    | Ventrue
    




enum : Enum Clan
enum =
    Enum.create

        [ ( "banu haqim", BanuHaqim )
        , ( "brujah", Brujah )
        , ( "caitiff", Caitiff )
        , ( "faithful", Faithful )
        , ( "gangrel", Gangrel )
        , ( "hecata", Hecata )
        , ( "inquisitive", Inquisitive )
        , ( "lasombra", Lasombra )
        , ( "malkavian", Malkavian )
        , ( "martial", Martial )        
        , ( "ministry", Ministry )
        , ( "nosferatu", Nosferatu )
        , ( "ravnos", Ravnos )
        , ( "salubri", Salubri )
        , ( "thin-blood", ThinBlood )
        , ( "toreador", Toreador )
        , ( "tremere", Tremere )
        , ( "tzimisce", Tzimisce )
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
        BanuHaqim ->
            "Banu Haqim"

        Brujah ->
            "Brujah"

        Caitiff ->
            "Caitiff"    

        Faithful ->
            "Faithful"

        Gangrel ->
            "Gangrel"

        Hecata ->
            "Hecata"

        Inquisitive ->
            "Inquisitive"

        Lasombra ->
            "Lasombra"

        Malkavian ->
            "Malkavian"

        Martial ->
            "Martial"

        Ministry ->
            "Ministry"

        Nosferatu ->
            "Nosferatu"

        Ravnos ->
            "Ravnos"

        Salubri ->
            "Salubri"

        ThinBlood ->
            "Thin-blood"

        Toreador ->
            "Toreador"

        Tremere ->
            "Tremere"

        Tzimisce ->
            "Tzimisce"

        Ventrue ->
            "Ventrue"
