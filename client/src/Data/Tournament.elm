module Data.Tournament exposing (Placement(..), Tournament, decoder)

import Data.Collection exposing (Collection)
import Data.Deck as Deck exposing (Deck)
import Enum exposing (Enum)
import Json.Decode as Decode exposing (Decoder)


type Placement
    = Top1
    | Top2
    | Top4
    | Top8
    | Top16
    | Top32
    | Top64


placementEnum : Enum Placement
placementEnum =
    Enum.create
        [ ( "1st", Top1 )
        , ( "2nd", Top2 )
        , ( "Top 4", Top4 )
        , ( "Top 8", Top8 )
        , ( "Top 16", Top16 )
        , ( "Top 32", Top32 )
        , ( "Top 64", Top64 )
        ]


type alias Tournament =
    { tournament : TournamentInfo
    , decks : List ( Placement, Deck )
    }


type alias TournamentInfo =
    { id : String
    , name : String
    , size : Maybe Int
    , startDate : String
    , endDate : String
    }


decoder : Collection -> Decoder Tournament
decoder collection =
    Decode.map2 Tournament
        (Decode.field "tournament" tournamentInfoDecoder)
        (Decode.field "decks" <|
            Decode.list <|
                Decode.map2 Tuple.pair
                    (Decode.field "placement" placementEnum.decoder)
                    (Deck.decoder collection)
        )


tournamentInfoDecoder : Decoder TournamentInfo
tournamentInfoDecoder =
    Decode.map5 TournamentInfo
        (Decode.field "id" Decode.string)
        (Decode.field "name" Decode.string)
        (Decode.maybe <| Decode.field "size" Decode.int)
        (Decode.field "startDate" Decode.string)
        (Decode.field "endDate" Decode.string)
