module Data.Deck exposing
    ( Deck
    , Decklist
    , Faction
    , Library
    , Meta
    , Name(..)
    , clansInFaction
    , copiesInDeck
    , create
    , decoder
    , displayName
    , encode
    , fallbackLeader
    , isEmptyFaction
    , isEmptyLibrary
    , isLeader
    , isValid
    , isValidFaction
    , isValidLibrary
    , leader
    , ownerDisplayName
    , setCard
    , setLeader
    )

import Cards
import Data.Clan exposing (Clan)
import Data.Collection exposing (Collection)
import Data.GameMode as GameMode exposing (GameMode)
import Data.Patronage as Patronage exposing (Patronage)
import Data.Visibility as Visibility exposing (Visibility)
import Dict exposing (Dict)
import Json.Decode as Decode exposing (Decoder)
import Json.Encode as Encode


type alias Deck =
    { decklist : Decklist
    , meta : Meta
    }


create : String -> String -> Maybe String -> Deck
create id ownerId ownerName =
    { decklist =
        { agenda = Nothing
        , haven = Nothing
        , faction = Dict.empty
        , library = Dict.empty
        }
    , meta =
        { name = Unnamed
        , id = id
        , ownerId = ownerId
        , ownerName = ownerName
        , patronage = Patronage.default
        , gameMode = GameMode.default
        , visibility = Visibility.Public
        }
    }


type Name
    = Unnamed
    | BeingNamed String
    | Named String


displayName : Name -> String
displayName deckname =
    case deckname of
        Named name ->
            name

        _ ->
            "Unnamed"


nameToString : Name -> String
nameToString deckname =
    case deckname of
        Named name ->
            name

        _ ->
            ""


type alias Meta =
    { name : Name
    , id : String
    , ownerId : String
    , ownerName : Maybe String
    , patronage : Patronage
    , gameMode : GameMode
    , visibility : Visibility
    }


ownerDisplayName : Meta -> String
ownerDisplayName meta =
    case meta.ownerName of
        Just name ->
            name

        Nothing ->
            "Unknown " ++ String.slice -5 -1 meta.ownerId


type alias Decklist =
    { agenda : Maybe Cards.Agenda
    , haven : Maybe Cards.Haven
    , faction : Faction
    , library : Library
    }


type alias Faction =
    Dict Cards.Id ( Cards.Faction, Bool )


clansInFaction : Faction -> List ( Clan, Int )
clansInFaction faction =
    Dict.values faction
        |> List.foldl
            (\( { clan }, _ ) clanCounts ->
                if List.any (Tuple.first >> (==) clan) clanCounts then
                    List.map
                        (\( someClan, n ) ->
                            if someClan == clan then
                                ( someClan, n + 1 )

                            else
                                ( someClan, n )
                        )
                        clanCounts

                else
                    ( clan, 1 ) :: clanCounts
            )
            []


type alias Library =
    Dict Cards.Id ( Cards.Library, Int )


librarySize : Library -> Int
librarySize =
    Dict.values
        >> List.foldl (\( _, n ) sum -> sum + n) 0


isValidLibrary : Library -> Bool
isValidLibrary library =
    let
        deckSize =
            librarySize library
    in
    deckSize >= 40 && deckSize <= 60


isEmptyLibrary : Library -> Bool
isEmptyLibrary =
    librarySize >> (==) 0


setCard : Decklist -> ( Cards.Card, Int ) -> Decklist
setCard deck entry =
    case entry of
        ( Cards.AgendaCard _, 0 ) ->
            { deck | agenda = Nothing }

        ( Cards.HavenCard _, 0 ) ->
            { deck | haven = Nothing }

        ( Cards.AgendaCard agenda, 1 ) ->
            { deck | agenda = Just agenda }

        ( Cards.HavenCard haven, 1 ) ->
            { deck | haven = Just haven }

        ( Cards.FactionCard { id }, 0 ) ->
            { deck | faction = Dict.remove id deck.faction }

        ( Cards.FactionCard faction, _ ) ->
            { deck | faction = Dict.insert faction.id ( faction, False ) deck.faction }

        ( Cards.LibraryCard { id }, 0 ) ->
            { deck | library = Dict.remove id deck.library }

        ( Cards.LibraryCard library, n ) ->
            { deck | library = Dict.insert library.id ( library, n ) deck.library }

        ( _, _ ) ->
            deck


copiesInDeck : Decklist -> Cards.Card -> Int
copiesInDeck deck card =
    case card of
        Cards.AgendaCard { id } ->
            deck.agenda
                |> Maybe.map
                    (\agenda ->
                        if agenda.id == id then
                            1

                        else
                            0
                    )
                |> Maybe.withDefault 0

        Cards.HavenCard { id } ->
            deck.haven
                |> Maybe.map
                    (\haven ->
                        if haven.id == id then
                            1

                        else
                            0
                    )
                |> Maybe.withDefault 0

        Cards.FactionCard { id } ->
            if Dict.member id deck.faction then
                1

            else
                0

        Cards.LibraryCard { id } ->
            Dict.get id deck.library |> Maybe.map Tuple.second |> Maybe.withDefault 0

        Cards.CityCard _ ->
            0


isLeader : Decklist -> Cards.Faction -> Bool
isLeader deck character =
    Dict.get character.id deck.faction |> Maybe.map Tuple.second |> Maybe.withDefault False


leader : Decklist -> Maybe Cards.Faction
leader deck =
    Dict.values deck.faction |> List.filter Tuple.second |> List.head |> Maybe.map Tuple.first


fallbackLeader : Decklist -> Maybe Cards.Faction
fallbackLeader deck =
    Dict.values deck.faction |> List.sortBy (Tuple.first >> .bloodPotency >> negate) |> List.head |> Maybe.map Tuple.first


setLeader : Decklist -> Cards.Faction -> Decklist
setLeader deck newLeader =
    { deck | faction = Dict.map (\_ ( char, _ ) -> ( char, char.id == newLeader.id )) deck.faction }


isValidFaction : Decklist -> Bool
isValidFaction deck =
    (leader deck |> Maybe.map (always True) |> Maybe.withDefault False)
        && (Dict.size deck.faction == 7)


isEmptyFaction : Decklist -> Bool
isEmptyFaction deck =
    Dict.isEmpty deck.faction


isValid : Decklist -> Bool
isValid deck =
    case ( deck.agenda, deck.haven ) of
        ( Just _, Just _ ) ->
            isValidFaction deck && isValidLibrary deck.library

        ( _, _ ) ->
            False



----------
-- ENCODER
----------


encode : Deck -> Maybe Encode.Value
encode { decklist, meta } =
    case ( decklist.agenda, decklist.haven ) of
        ( Just agenda, Just haven ) ->
            Just <|
                Encode.object
                    [ ( "name", encodeName meta.name )
                    , ( "agenda", Encode.string agenda.id )
                    , ( "haven", Encode.string haven.id )
                    , ( "factionDeck", encodeFaction decklist.faction )
                    , ( "libraryDeck", encodeLibrary decklist.library )
                    , ( "gameMode", GameMode.encode meta.gameMode )
                    , ( "public", Visibility.encode meta.visibility )
                    ]

        ( _, _ ) ->
            Nothing


encodeName : Name -> Encode.Value
encodeName =
    nameToString >> Encode.string


encodeFaction : Faction -> Encode.Value
encodeFaction =
    Dict.values >> List.map (Tuple.mapBoth .id Encode.bool) >> Encode.object


encodeLibrary : Library -> Encode.Value
encodeLibrary =
    Dict.values >> List.map (Tuple.mapBoth .id Encode.int) >> Encode.object


decoder : Collection -> Decoder Deck
decoder collection =
    Decode.map2 Deck
        (decklistDecoder collection)
        metaDecoder


metaDecoder : Decoder Meta
metaDecoder =
    Decode.map7 Meta
        (metaNameDecoder "name")
        (Decode.field "id" Decode.string)
        (Decode.field "creatorId" Decode.string)
        (Decode.maybe (Decode.field "creatorDisplayName" Decode.string))
        (Decode.field "creatorPatronage" Patronage.decoder)
        (Decode.field "gameMode" GameMode.decode)
        (Decode.field "public" Visibility.decode)


metaNameDecoder : String -> Decoder Name
metaNameDecoder fieldName =
    Decode.maybe (Decode.field fieldName Decode.string)
        |> Decode.map (Maybe.map Named >> Maybe.withDefault Unnamed)


decklistDecoder : Collection -> Decoder Decklist
decklistDecoder collection =
    Decode.map4 Decklist
        (agendaDecoder collection)
        (havenDecoder collection)
        (factionDecoder collection)
        (libraryDecoder collection)


agendaDecoder : Collection -> Decoder (Maybe Cards.Agenda)
agendaDecoder collection =
    decodeCardId "agenda" |> getInCollection collection |> mapToAgenda


havenDecoder : Collection -> Decoder (Maybe Cards.Haven)
havenDecoder collection =
    decodeCardId "haven" |> getInCollection collection |> mapToHaven


decodeCardId : String -> Decoder String
decodeCardId fieldName =
    Decode.field fieldName Decode.string


getInCollection : Collection -> Decoder String -> Decoder (Maybe Cards.Card)
getInCollection collection =
    Decode.map (cardFromCollection collection)


mapToAgenda : Decoder (Maybe Cards.Card) -> Decoder (Maybe Cards.Agenda)
mapToAgenda =
    Decode.andThen
        (\collectionCard ->
            case collectionCard of
                Just (Cards.AgendaCard agenda) ->
                    Decode.succeed (Just agenda)

                _ ->
                    Decode.fail "Bad Agenda"
        )


mapToHaven : Decoder (Maybe Cards.Card) -> Decoder (Maybe Cards.Haven)
mapToHaven =
    Decode.andThen
        (\collectionCard ->
            case collectionCard of
                Just (Cards.HavenCard haven) ->
                    Decode.succeed (Just haven)

                _ ->
                    Decode.fail "Bad Haven"
        )


factionDecoder : Collection -> Decoder Faction
factionDecoder collection =
    decodeDictAsList "factionDeck" Decode.bool |> mapInCollection collection |> mapToFaction


libraryDecoder : Collection -> Decoder Library
libraryDecoder collection =
    decodeDictAsList "libraryDeck" Decode.int |> mapInCollection collection |> mapToLibrary


decodeDictAsList : String -> Decoder a -> Decoder (List ( String, a ))
decodeDictAsList fieldName valueDecoder =
    Decode.field fieldName (Decode.keyValuePairs valueDecoder)


mapInCollection : Collection -> Decoder (List ( String, a )) -> Decoder (List ( Maybe Cards.Card, a ))
mapInCollection collection =
    Decode.map (List.map (Tuple.mapFirst (cardFromCollection collection)))


mapToLibrary : Decoder (List ( Maybe Cards.Card, Int )) -> Decoder Library
mapToLibrary =
    Decode.andThen
        (\maybeLibrary ->
            let
                unwrappedLibrary =
                    List.filterMap extractLibrary maybeLibrary
            in
            if List.length unwrappedLibrary == List.length maybeLibrary then
                Decode.succeed (Dict.fromList unwrappedLibrary)

            else
                Decode.fail "Bad Library"
        )


mapToFaction : Decoder (List ( Maybe Cards.Card, Bool )) -> Decoder Faction
mapToFaction =
    Decode.andThen
        (\maybeFaction ->
            let
                unwrappedFaction =
                    List.filterMap extractFaction maybeFaction
            in
            if List.length unwrappedFaction == List.length maybeFaction then
                Decode.succeed (Dict.fromList unwrappedFaction)

            else
                Decode.fail "Bad Faction"
        )


extractLibrary : ( Maybe Cards.Card, Int ) -> Maybe ( Cards.Id, ( Cards.Library, Int ) )
extractLibrary ( maybeCard, l ) =
    maybeCard
        |> Maybe.andThen
            (\collectionCard ->
                case collectionCard of
                    Cards.LibraryCard card ->
                        Just ( card.id, ( card, l ) )

                    _ ->
                        Nothing
            )


extractFaction : ( Maybe Cards.Card, Bool ) -> Maybe ( Cards.Id, ( Cards.Faction, Bool ) )
extractFaction ( maybeCard, l ) =
    maybeCard
        |> Maybe.andThen
            (\collectionCard ->
                case collectionCard of
                    Cards.FactionCard card ->
                        Just ( card.id, ( card, l ) )

                    _ ->
                        Nothing
            )


cardFromCollection : Collection -> Cards.Id -> Maybe Cards.Card
cardFromCollection collection id =
    Dict.get id collection
