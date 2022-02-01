module Data.Visibility exposing (Visibility(..), decode, default, encode, fromString, toString)

import Enum exposing (Enum)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode exposing (Value)


type Visibility
    = Public
    | Private


enum : Enum Visibility
enum =
    Enum.create [ ( "Public", Public ), ( "Private", Private ) ]


default : Visibility
default =
    Public


toString : Visibility -> String
toString =
    enum.toString


fromString : String -> Maybe Visibility
fromString =
    enum.fromString


decode : Decoder Visibility
decode =
    Decode.map
        (\public ->
            if public then
                Public

            else
                Private
        )
        Decode.bool


encode : Visibility -> Value
encode v =
    case v of
        Public ->
            Encode.bool True

        Private ->
            Encode.bool False
