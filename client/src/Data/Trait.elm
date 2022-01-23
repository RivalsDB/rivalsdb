module Data.Trait exposing (Trait(..), decoder, isCombat, isPolitical)

import Enum exposing (Enum)
import Json.Decode exposing (Decoder)


type Trait
    = Action
    | Alchemy
    | Animal
    | Attack
    | Conspiracy
    | InfluenceModifier
    | Ongoing
    | Reaction
    | Ritual
    | Scheme
    | Special
    | Title
    | UnhostedAction
    | SanFrancisco
    | Event
    | SecondInquisition
    | Mortal
    | Antagonist
    | Retainer
    | Citizen


enum : Enum Trait
enum =
    Enum.create
        [ ( "action", Action )
        , ( "alchemy", Alchemy )
        , ( "animal", Animal )
        , ( "attack", Attack )
        , ( "conspiracy", Conspiracy )
        , ( "influence modifier", InfluenceModifier )
        , ( "ongoing", Ongoing )
        , ( "reaction", Reaction )
        , ( "ritual", Ritual )
        , ( "scheme", Scheme )
        , ( "special", Special )
        , ( "title", Title )
        , ( "unhosted action", UnhostedAction )
        , ( "san francisco", SanFrancisco )
        , ( "event", Event )
        , ( "second inquisition", SecondInquisition )
        , ( "mortal", Mortal )
        , ( "antagonist", Antagonist )
        , ( "retainer", Retainer )
        , ( "citizen", Citizen )
        ]


decoder : Decoder Trait
decoder =
    enum.decoder


isCombat : Trait -> Bool
isCombat trait =
    trait == Attack || trait == Reaction


isPolitical : Trait -> Bool
isPolitical trait =
    trait == InfluenceModifier || trait == Title || trait == Scheme
