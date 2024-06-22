module Data.Discipline exposing (Discipline(..), all, decoder)

import Enum exposing (Enum)
import Json.Decode exposing (Decoder)


type Discipline
    = Animalism
    | Arsenal
    | Auspex
    | BloodSorcery
    | BeastWhisperer
    | Celerity
    | Dominate
    | DroneJockey
    | Fleet
    | Fortitude
    | Global
    | Library
    | Obfuscate
    | Oblivion
    | Ordnance
    | Potence
    | Presence
    | Protean
    | RepelTheUnnatural
    | SenseTheUnnatural
    | ThinBloodAlchemy
    | ThwartTheUnnatural


enum : Enum Discipline
enum =
    Enum.create
        [ ( "animalism", Animalism )
        , ( "auspex", Auspex )
        , ( "beast whisperer", BeastWhisperer )
        , ( "blood sorcery", BloodSorcery )
        , ( "celerity", Celerity )
        , ( "dominate", Dominate )
        , ( "drone jockey", DroneJockey )
        , ( "fleet", Fleet )
        , ( "fortitude", Fortitude )
        , ( "global", Global )
        , ( "library", Library )
        , ( "obfuscate", Obfuscate )
        , ( "oblivion", Oblivion )
        , ( "ordnance", Ordnance )
        , ( "potence", Potence )
        , ( "presence", Presence )
        , ( "protean", Protean )
        , ( "repel the unnatural", RepelTheUnnatural )
        , ( "sense the unnatural", SenseTheUnnatural )
        , ( "thin-blood alchemy", ThinBloodAlchemy )
        , ( "thwart the unnatural", ThwartTheUnnatural )
        ]


all : List Discipline
all =
    List.map Tuple.second enum.list


decoder : Decoder Discipline
decoder =
    enum.decoder
