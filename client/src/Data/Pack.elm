module Data.Pack exposing (Pack, decoder, list, toString)

import Enum exposing (Enum)
import Json.Decode exposing (Decoder)


type Pack
    = Promo
    | Core
    | BloodAndAlchemy
    | WolfAndRat


enum : Enum Pack
enum =
    Enum.create
        [ ( "Core", Core )
        , ( "Wolf & Rat", WolfAndRat )
        , ( "Blood & Alchemy", BloodAndAlchemy )
        , ( "Promo", Promo )
        ]


decoder : Decoder Pack
decoder =
    enum.decoder


toString : Pack -> String
toString =
    enum.toString


list : List ( String, Pack )
list =
    enum.list
