module Cards exposing
    ( AttackType(..)
    , Card(..)
    , CardStack(..)
    , Clan(..)
    , Discipline(..)
    , Id
    , Trait(..)
    , attackTypes
    , bloodPotency
    , cardsDecoder
    , clan
    , discipline
    , id
    , image
    , name
    , stack
    , text
    , traits
    )

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


type alias Illustrator =
    String


type alias Image =
    String


type Pack
    = Core
    | BloodAndAlchemy
    | Promo


pack : Enum Pack
pack =
    Enum.create
        [ ( "Blood & Alchemy", BloodAndAlchemy )
        , ( "Core", Core )
        , ( "Season 0 Promo", Promo )
        ]


type Clan
    = Brujah
    | Malkavian
    | ThinBlood
    | Toreador
    | Tremere
    | Ventrue


clanEnum : Enum Clan
clanEnum =
    Enum.create
        [ ( "brujah", Brujah )
        , ( "malkavian", Malkavian )
        , ( "thin-blood", ThinBlood )
        , ( "toreador", Toreador )
        , ( "tremere", Tremere )
        , ( "ventrue", Ventrue )
        ]


type alias BloodPotency =
    Int


type BloodPotencyRequirement
    = BloodPotencyRequirement Int
    | NoBloodPotencyRequirement


type alias Attribute =
    Int


type alias Damage =
    Int


type alias Shield =
    Int


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


disciplineEnum : Enum Discipline
disciplineEnum =
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


type Trait
    = Action
    | Alchemy
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


traitEnum : Enum Trait
traitEnum =
    Enum.create
        [ ( "action", Action )
        , ( "alchemy", Alchemy )
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
        ]


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
    { id : Id, name : Name, text : Text, illustrator : Illustrator, image : Image, set : Pack }


type alias Haven =
    { id : Id, name : Name, text : Text, illustrator : Illustrator, image : Image, set : Pack }


type alias Faction =
    { id : Id
    , name : Name
    , text : Text
    , illustrator : Illustrator
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
    , illustrator : Illustrator
    , image : Image
    , set : Pack
    , clan : Maybe Clan
    , bloodPotency : BloodPotencyRequirement
    , damage : Maybe Damage
    , shield : Maybe Shield
    , traits : List Trait
    , attackType : List AttackType
    }


type Card
    = AgendaCard Agenda
    | HavenCard Haven
    | FactionCard Faction
    | LibraryCard Library


type CardStack
    = AgendaStack
    | HavenStack
    | FactionStack
    | LibraryStack



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


traits : Card -> List Trait
traits card =
    case card of
        LibraryCard c ->
            c.traits

        _ ->
            []


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


discipline : Card -> List Discipline
discipline card =
    case card of
        FactionCard c ->
            c.disciplines

        LibraryCard _ ->
            []

        _ ->
            []


bloodPotency : Card -> BloodPotency
bloodPotency card =
    case card of
        FactionCard c ->
            c.bloodPotency

        LibraryCard c ->
            case c.bloodPotency of
                BloodPotencyRequirement n ->
                    n

                _ ->
                    0

        _ ->
            0


stack : Card -> List CardStack
stack card =
    List.singleton
        (case card of
            AgendaCard _ ->
                AgendaStack

            HavenCard _ ->
                HavenStack

            FactionCard _ ->
                FactionStack

            LibraryCard _ ->
                LibraryStack
        )


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



----------
-- DECODER
----------


cardsDecoder : Decoder (Dict.Dict Id Card)
cardsDecoder =
    list cardDecoder |> map Dict.fromList


cardDecoder : Decoder ( Id, Card )
cardDecoder =
    Decode.succeed decoderForCardType
        |> required "types" (list string)
        |> Decode.andThen identity


decoderForCardType : List String -> Decoder ( Id, Card )
decoderForCardType cardTypes =
    case cardTypes of
        [ "agenda" ] ->
            agendaDecoder

        [ "haven" ] ->
            havenDecoder

        [ "character" ] ->
            factionDecoder

        _ ->
            libraryDecoder


agendaDecoder : Decoder ( Id, Card )
agendaDecoder =
    Decode.succeed Agenda
        |> decodeId
        |> decodeName
        |> decodeText
        |> decodeIllustrator
        |> decodeImage
        |> decodeSet
        |> map (\agenda -> ( agenda.id, AgendaCard agenda ))


havenDecoder : Decoder ( Id, Card )
havenDecoder =
    Decode.succeed Haven
        |> decodeId
        |> decodeName
        |> decodeText
        |> decodeIllustrator
        |> decodeImage
        |> decodeSet
        |> map (\haven -> ( haven.id, HavenCard haven ))


factionDecoder : Decoder ( Id, Card )
factionDecoder =
    Decode.succeed Faction
        |> decodeId
        |> decodeName
        |> decodeText
        |> decodeIllustrator
        |> decodeImage
        |> decodeSet
        |> decodeClan
        |> decodeBloodPotency
        |> decodePhysical
        |> decodeSocial
        |> decodeMental
        |> decodeDisciplines
        |> map (\faction -> ( faction.id, FactionCard faction ))


libraryDecoder : Decoder ( Id, Card )
libraryDecoder =
    Decode.succeed Library
        |> decodeId
        |> decodeName
        |> decodeText
        |> decodeIllustrator
        |> decodeImage
        |> decodeSet
        |> decodeMaybeClan
        |> decodeBloodPotencyRequirement
        |> decodeDamage
        |> decodeShields
        |> decodeTraits
        |> decodeAttackType
        |> map (\library -> ( library.id, LibraryCard library ))



-- FIELD DECODERS


decodeBloodPotency : Decoder (Int -> b) -> Decoder b
decodeBloodPotency =
    required "bloodPotency" int


decodeBloodPotencyRequirement : Decoder (BloodPotencyRequirement -> b) -> Decoder b
decodeBloodPotencyRequirement =
    optional "bloodPotency" (map BloodPotencyRequirement int) NoBloodPotencyRequirement


decodeDamage : Decoder (Maybe Damage -> b) -> Decoder b
decodeDamage =
    optional "damage" (map Just int) Nothing


decodeId : Decoder (String -> b) -> Decoder b
decodeId =
    required "id" string


decodeIllustrator : Decoder (String -> b) -> Decoder b
decodeIllustrator =
    required "illustrator" string


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


decodeDisciplines : Decoder (List Discipline -> b) -> Decoder b
decodeDisciplines =
    required "disciplines" (list disciplineEnum.decoder)


decodeAttackType : Decoder (List AttackType -> b) -> Decoder b
decodeAttackType =
    optional "attackType" (list attackTypeEnum.decoder) []


decodeTraits : Decoder (List Trait -> b) -> Decoder b
decodeTraits =
    required "types" (list traitEnum.decoder)


decodeClan : Decoder (Clan -> b) -> Decoder b
decodeClan =
    required "clan" clanEnum.decoder


decodeMaybeClan : Decoder (Maybe Clan -> b) -> Decoder b
decodeMaybeClan =
    optional "clan" (Decode.map Just clanEnum.decoder) Nothing


decodeSet : Decoder (Pack -> b) -> Decoder b
decodeSet =
    required "set" pack.decoder
