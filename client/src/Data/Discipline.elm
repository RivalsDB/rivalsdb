module Data.Discipline exposing (Discipline(..), all, decoder)

import Enum exposing (Enum)
import Json.Decode exposing (Decoder)


type Discipline
    = Ahroun
    | Animalism
    | Arsenal
    | Auspex
    | BloodSorcery
    | BeastWhisperer
    | Celerity
    | Dominate
    | DroneJockey
    | Fleet
    | Fortitude
    | Galliard
    | Global
    | Library
    | Obfuscate
    | Oblivion
    | Ordnance
    | Philodox
    | Potence
    | Presence
    | Protean
    | Ragabash
    | RepelTheUnnatural
    | SenseTheUnnatural
    | Theurge
    | ThinBloodAlchemy
    | ThwartTheUnnatural


enum : Enum Discipline
enum =
    Enum.create
        [ ( "ahroun", Ahroun )
        , ( "animalism", Animalism )
        , ( "arsenal", Arsenal )
        , ( "auspex", Auspex )
        , ( "beast whisperer", BeastWhisperer )
        , ( "blood sorcery", BloodSorcery )
        , ( "celerity", Celerity )
        , ( "dominate", Dominate )
        , ( "drone jockey", DroneJockey )
        , ( "fleet", Fleet )
        , ( "fortitude", Fortitude )
        , ( "galliard", Galliard )
        , ( "global", Global )
        , ( "library", Library )
        , ( "obfuscate", Obfuscate )
        , ( "oblivion", Oblivion )
        , ( "ordnance", Ordnance )
        , ( "philodox", Philodox )
        , ( "potence", Potence )
        , ( "presence", Presence )
        , ( "protean", Protean )
        , ( "ragabash", Ragabash )
        , ( "repel the unnatural", RepelTheUnnatural )
        , ( "sense the unnatural", SenseTheUnnatural )
        , ( "thin-blood alchemy", ThinBloodAlchemy )
        , ( "thwart the unnatural", ThwartTheUnnatural )
        , ( "theurge", Theurge )
        ]


all : List Discipline
all =
    List.map Tuple.second enum.list


decoder : Decoder Discipline
decoder =
    enum.decoder
