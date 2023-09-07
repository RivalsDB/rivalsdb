module Data.Pack exposing (Pack(..), decoder, list, toString)

import Enum exposing (Enum)
import Json.Decode as Decode exposing (Decoder)


type Pack
    = Promo
    | Core
    | BloodAndAlchemy
    | WolfAndRat
    | ShadowsAndShrouds
    | HeartOfEurope
    | Conclave22
    | DragonAndRogue
    | JusticeAndMercy
    | HuntersAndHunted
    | PrincePack1


enum : Enum Pack
enum =
    Enum.create
        [ ( "Core", Core )
        , ( "Blood & Alchemy", BloodAndAlchemy )
        , ( "Wolf & Rat", WolfAndRat )
        , ( "Shadows & Shrouds", ShadowsAndShrouds )
        , ( "Promo", Promo )
        , ( "Heart of Europe", HeartOfEurope )
        , ( "Conclave 22", Conclave22 )
        , ( "Dragon & Rogue", DragonAndRogue )
        , ( "Justice & Mercy", JusticeAndMercy )
        , ( "Hunters & Hunted", HuntersAndHunted )
        , ( "Prince Pack 1", PrincePack1 )
        ]


decoder : Decoder Pack
decoder =
    Decode.maybe enum.decoder |> Decode.map (Maybe.withDefault default)


toString : Pack -> String
toString =
    enum.toString


list : List ( String, Pack )
list =
    enum.list


default : Pack
default =
    Promo
