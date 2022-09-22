module Cards exposing
    ( Agenda
    , AttackType(..)
    , Attribute
    , BloodPotency
    , BloodPotencyRequirement
    , Card(..)
    , CardStack(..)
    , City
    , Damage
    , Faction
    , Haven
    , Id
    , Library
    , Shield
    , attackTypes
    , bloodPotency
    , cardsDecoder
    , clan
    , clanRequirement
    , discipline
    , findTextInCard
    , id
    , image
    , maxPerDeck
    , name
    , set
    , stack
    , stackComparable
    , text
    )

import Data.Clan as Clan exposing (Clan)
import Data.Discipline as Discipline exposing (Discipline)
import Data.Pack as Pack exposing (Pack)
import Dict
import Enum exposing (Enum)
import Json.Decode as Decode exposing (Decoder, int, list, map, string)
import Json.Decode.Pipeline exposing (optional, required)


type alias Id =
    String


type alias Name =
    String


type alias Text =
    String


type alias Image =
    String


type alias BloodPotency =
    Int


type alias BloodPotencyRequirement =
    Maybe Int


type alias Attribute =
    Int


type alias Damage =
    Int


type alias Shield =
    Int


type AttackType
    = Physical
    | Social
    | Mental
    | Ranged


attackTypeEnum : Enum AttackType
attackTypeEnum =
    Enum.create
        [ ( "physical", Physical )
        , ( "social", Social )
        , ( "mental", Mental )
        , ( "ranged", Ranged )
        ]


type alias Agenda =
    { id : Id, name : Name, text : Text, image : Image, set : Pack }


type alias Haven =
    { id : Id, name : Name, text : Text, image : Image, set : Pack }


type alias City =
    { id : Id
    , name : Name
    , text : Text
    , image : Image
    , set : Pack
    , traits : CityTraits
    }


type alias CityTraits =
    { antagonist : Bool
    , citizen : Bool
    , event : Bool
    , mortal : Bool
    , ongoing : Bool
    , retainer : Bool
    , sanFrancisco : Bool
    , secondInquisition : Bool
    , title : Bool
    }


type alias Faction =
    { id : Id
    , name : Name
    , text : Text
    , image : Image
    , set : Pack
    , clan : Clan
    , bloodPotency : BloodPotency
    , physical : Attribute
    , social : Attribute
    , mental : Attribute
    , disciplines : List Discipline
    }


type alias Library =
    { id : Id
    , name : Name
    , text : Text
    , disciplines : List Discipline
    , image : Image
    , set : Pack
    , clan : Maybe Clan
    , bloodPotency : BloodPotencyRequirement
    , damage : Maybe Damage
    , shield : Maybe Shield
    , traits : LibraryTraits
    , attackType : List AttackType
    }


type alias LibraryTraits =
    { action : Bool
    , alchemy : Bool
    , animal : Bool
    , attack : Bool
    , conspiracy : Bool
    , influenceModifier : Bool
    , ongoing : Bool
    , reaction : Bool
    , ritual : Bool
    , scheme : Bool
    , special : Bool
    , title : Bool
    , trap : Bool
    , unhostedAction : Bool
    }


type Card
    = AgendaCard Agenda
    | HavenCard Haven
    | FactionCard Faction
    | LibraryCard Library
    | CityCard City


type CardStack
    = AgendaStack
    | HavenStack
    | FactionStack
    | LibraryStack
    | CityStack



----------
-- HELPERS
----------


id : Card -> String
id card =
    case card of
        AgendaCard c ->
            c.id

        HavenCard c ->
            c.id

        FactionCard c ->
            c.id

        LibraryCard c ->
            c.id

        CityCard c ->
            c.id


name : Card -> String
name card =
    case card of
        AgendaCard c ->
            c.name

        HavenCard c ->
            c.name

        FactionCard c ->
            c.name

        LibraryCard c ->
            c.name

        CityCard c ->
            c.name


image : Card -> String
image card =
    case card of
        AgendaCard c ->
            c.image

        HavenCard c ->
            c.image

        FactionCard c ->
            c.image

        LibraryCard c ->
            c.image

        CityCard c ->
            c.image


set : Card -> Pack
set card =
    case card of
        AgendaCard c ->
            c.set

        HavenCard c ->
            c.set

        FactionCard c ->
            c.set

        LibraryCard c ->
            c.set

        CityCard c ->
            c.set


attackTypes : Card -> List AttackType
attackTypes card =
    case card of
        LibraryCard c ->
            c.attackType

        _ ->
            []


clan : Card -> List Clan
clan card =
    case card of
        FactionCard c ->
            List.singleton c.clan

        LibraryCard c ->
            Maybe.map List.singleton c.clan
                |> Maybe.withDefault []

        _ ->
            []


clanRequirement : Card -> List Clan
clanRequirement card =
    case card of
        FactionCard c ->
            [ c.clan ]

        LibraryCard c ->
            c.clan
                |> Maybe.map List.singleton
                |> Maybe.withDefault []

        _ ->
            Clan.all


discipline : Card -> List Discipline
discipline card =
    case card of
        FactionCard c ->
            c.disciplines

        LibraryCard c ->
            c.disciplines

        _ ->
            []


bloodPotency : Card -> BloodPotency
bloodPotency card =
    case card of
        FactionCard c ->
            c.bloodPotency

        LibraryCard c ->
            Maybe.withDefault 0 c.bloodPotency

        _ ->
            0


stack : Card -> CardStack
stack card =
    case card of
        AgendaCard _ ->
            AgendaStack

        HavenCard _ ->
            HavenStack

        FactionCard _ ->
            FactionStack

        LibraryCard _ ->
            LibraryStack

        CityCard _ ->
            CityStack


stackComparable : Card -> Int
stackComparable card =
    case card of
        CityCard _ ->
            0

        AgendaCard _ ->
            1

        HavenCard _ ->
            2

        FactionCard _ ->
            3

        LibraryCard _ ->
            4


text : Card -> String
text card =
    case card of
        AgendaCard c ->
            c.text

        HavenCard c ->
            c.text

        FactionCard c ->
            c.text

        LibraryCard c ->
            c.text

        CityCard c ->
            c.text


maxPerDeck : Card -> Int
maxPerDeck card =
    case card of
        LibraryCard _ ->
            3

        CityCard _ ->
            0

        _ ->
            1



----------
-- DECODER
----------


cardsDecoder : Decoder (Dict.Dict Id Card)
cardsDecoder =
    list cardDecoder |> map Dict.fromList


cardDecoder : Decoder ( Id, Card )
cardDecoder =
    Decode.succeed decoderForCardType
        |> required "stack" string
        |> Decode.andThen identity


decoderForCardType : String -> Decoder ( Id, Card )
decoderForCardType st =
    case st of
        "agenda" ->
            agendaDecoder

        "haven" ->
            havenDecoder

        "faction" ->
            factionDecoder

        "city" ->
            cityDecoder

        "library" ->
            libraryDecoder

        _ ->
            Decode.fail "Unrecognized card stack"


agendaDecoder : Decoder ( Id, Card )
agendaDecoder =
    Decode.succeed Agenda
        |> decodeId
        |> decodeName
        |> decodeText
        |> decodeImage
        |> required "set" Pack.decoder
        |> map (\agenda -> ( agenda.id, AgendaCard agenda ))


havenDecoder : Decoder ( Id, Card )
havenDecoder =
    Decode.succeed Haven
        |> decodeId
        |> decodeName
        |> decodeText
        |> decodeImage
        |> required "set" Pack.decoder
        |> map (\haven -> ( haven.id, HavenCard haven ))


factionDecoder : Decoder ( Id, Card )
factionDecoder =
    Decode.succeed Faction
        |> decodeId
        |> decodeName
        |> decodeText
        |> decodeImage
        |> required "set" Pack.decoder
        |> required "clan" Clan.decoder
        |> decodeBloodPotency
        |> decodePhysical
        |> decodeSocial
        |> decodeMental
        |> required "disciplines" (list Discipline.decoder)
        |> map (\faction -> ( faction.id, FactionCard faction ))


libraryDecoder : Decoder ( Id, Card )
libraryDecoder =
    Decode.succeed Library
        |> decodeId
        |> decodeName
        |> decodeText
        |> optional "disciplines" (list Discipline.decoder) []
        |> decodeImage
        |> required "set" Pack.decoder
        |> optional "clan" (Decode.map Just Clan.decoder) Nothing
        |> decodeBloodPotencyRequirement
        |> decodeDamage
        |> decodeShields
        |> required "types" decodeLibraryTraits
        |> decodeAttackType
        |> map (\library -> ( library.id, LibraryCard library ))


cityDecoder : Decoder ( Id, Card )
cityDecoder =
    Decode.succeed City
        |> decodeId
        |> decodeName
        |> decodeText
        |> decodeImage
        |> required "set" Pack.decoder
        |> required "types" decodeCityTraits
        |> map (\library -> ( library.id, CityCard library ))



-- METHODS


findTextInCard : String -> Card -> Bool
findTextInCard needle card =
    (text card |> String.toLower |> String.contains needle)
        || (name card |> String.toLower |> String.contains needle)



-- FIELD DECODERS


decodeCityTraits : Decoder CityTraits
decodeCityTraits =
    let
        init =
            { antagonist = False
            , citizen = False
            , event = False
            , mortal = False
            , ongoing = False
            , retainer = False
            , sanFrancisco = False
            , secondInquisition = False
            , title = False
            }
    in
    Decode.map
        (List.foldl
            (\str ts ->
                case str of
                    "title" ->
                        { ts | title = True }

                    "san francisco" ->
                        { ts | sanFrancisco = True }

                    "event" ->
                        { ts | event = True }

                    "second inquisition" ->
                        { ts | secondInquisition = True }

                    "mortal" ->
                        { ts | mortal = True }

                    "ongoing" ->
                        { ts | ongoing = True }

                    "antagonist" ->
                        { ts | antagonist = True }

                    "retainer" ->
                        { ts | retainer = True }

                    "citizen" ->
                        { ts | citizen = True }

                    _ ->
                        ts
            )
            init
        )
        (Decode.list Decode.string)


decodeLibraryTraits : Decoder LibraryTraits
decodeLibraryTraits =
    let
        init =
            { action = False
            , alchemy = False
            , animal = False
            , attack = False
            , conspiracy = False
            , influenceModifier = False
            , ongoing = False
            , reaction = False
            , ritual = False
            , scheme = False
            , special = False
            , title = False
            , trap = False
            , unhostedAction = False
            }
    in
    Decode.map
        (List.foldl
            (\str ts ->
                case str of
                    "action" ->
                        { ts | action = True }

                    "alchemy" ->
                        { ts | alchemy = True }

                    "animal" ->
                        { ts | animal = True }

                    "attack" ->
                        { ts | attack = True }

                    "conspiracy" ->
                        { ts | conspiracy = True }

                    "influence modifier" ->
                        { ts | influenceModifier = True }

                    "ongoing" ->
                        { ts | ongoing = True }

                    "reaction" ->
                        { ts | reaction = True }

                    "ritual" ->
                        { ts | ritual = True }

                    "scheme" ->
                        { ts | scheme = True }

                    "special" ->
                        { ts | special = True }

                    "title" ->
                        { ts | title = True }

                    "trap" ->
                        { ts | trap = True }

                    "unhosted action" ->
                        { ts | unhostedAction = True }

                    _ ->
                        ts
            )
            init
        )
        (Decode.list Decode.string)


decodeBloodPotency : Decoder (Int -> b) -> Decoder b
decodeBloodPotency =
    required "bloodPotency" int


decodeBloodPotencyRequirement : Decoder (BloodPotencyRequirement -> b) -> Decoder b
decodeBloodPotencyRequirement =
    optional "bloodPotency" (map Just int) Nothing


decodeDamage : Decoder (Maybe Damage -> b) -> Decoder b
decodeDamage =
    optional "damage" (map Just int) Nothing


decodeId : Decoder (String -> b) -> Decoder b
decodeId =
    required "id" string


decodeImage : Decoder (String -> b) -> Decoder b
decodeImage =
    required "image" string


decodeName : Decoder (String -> b) -> Decoder b
decodeName =
    required "name" string


decodeShields : Decoder (Maybe Shield -> b) -> Decoder b
decodeShields =
    optional "shield" (map Just int) Nothing


decodeText : Decoder (String -> b) -> Decoder b
decodeText =
    required "text" string


decodePhysical : Decoder (Int -> b) -> Decoder b
decodePhysical =
    required "attributePhysical" int


decodeSocial : Decoder (Int -> b) -> Decoder b
decodeSocial =
    required "attributeSocial" int


decodeMental : Decoder (Int -> b) -> Decoder b
decodeMental =
    required "attributeMental" int


decodeAttackType : Decoder (List AttackType -> b) -> Decoder b
decodeAttackType =
    optional "attackType" (list attackTypeEnum.decoder) []
