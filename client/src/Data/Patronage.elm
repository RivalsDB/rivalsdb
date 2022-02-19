module Data.Patronage exposing (Patronage, decoder, default, isKindred)

import Json.Decode exposing (Decoder, map, string)


type Patronage
    = Patronage Bool


default : Patronage
default =
    Patronage False


isKindred : Patronage -> Bool
isKindred patronage =
    case patronage of
        Patronage prop ->
            prop


decoder : Decoder Patronage
decoder =
    map ((==) "kindred" >> Patronage) string
