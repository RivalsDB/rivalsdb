module Clan exposing (Clan(..), compare_, enum)

import Enum exposing (Enum)


type Clan
    = Brujah
    | Gangrel
    | Malkavian
    | Nosferatu
    | ThinBlood
    | Toreador
    | Tremere
    | Ventrue


clanOrder : Clan -> Int
clanOrder c =
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


compare_ : Clan -> Clan -> Order
compare_ a b =
    compare (clanOrder a) (clanOrder b)
