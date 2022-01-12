module Data.Pack exposing (Pack, decoder, toString)

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
        [ ( "Blood & Alchemy", BloodAndAlchemy )
        , ( "Wolf & Rat", WolfAndRat )
        , ( "Core", Core )
        , ( "Promo", Promo )
        ]


decoder : Decoder Pack
decoder =
    enum.decoder


toString : Pack -> String
toString =
    enum.toString
