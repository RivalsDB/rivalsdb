module Data.Discipline exposing (Discipline(..), all, decoder)

import Enum exposing (Enum)
import Json.Decode exposing (Decoder)


type Discipline
    = Animalism
    | Auspex
    | BloodSorcery
    | Celerity
    | Dominate
    | Fortitude
    | Obfuscate
    | Potence
    | Presence
    | Protean
    | ThinBloodAlchemy


enum : Enum Discipline
enum =
    Enum.create
        [ ( "animalism", Animalism )
        , ( "auspex", Auspex )
        , ( "celerity", Celerity )
        , ( "dominate", Dominate )
        , ( "fortitude", Fortitude )
        , ( "obfuscate", Obfuscate )
        , ( "potence", Potence )
        , ( "presence", Presence )
        , ( "protean", Protean )
        , ( "blood sorcery", BloodSorcery )
        , ( "thin-blood alchemy", ThinBloodAlchemy )
        ]


all : List Discipline
all =
    List.map Tuple.second enum.list


decoder : Decoder Discipline
decoder =
    enum.decoder
