module API.Decklist exposing
    ( ResultDelete
    , ResultIndex
    , ResultRead
    , ResultUpdate
    , delete
    , index
    , indexForUser
    , read
    , update
    )

import API.API as API
import Data.Collection exposing (Collection)
import Data.Deck exposing (Deck)
import Http
import Json.Decode as Decode
import Json.Encode as Encode
import Shared
import Svg exposing (metadata)


type alias ResultUpdate =
    Result Http.Error ()


update : (ResultUpdate -> msg) -> Shared.Token -> String -> Encode.Value -> Cmd msg
update msg token deckId deck =
    API.put
        { token = Just token
        , url = "/api/v2/decklist/" ++ deckId
        , body = Http.jsonBody deck
        , expect = expectJson msg
        }


expectJson : (ResultUpdate -> msg) -> Http.Expect msg
expectJson toMsg =
    Http.expectStringResponse toMsg <|
        \response ->
            case response of
                Http.BadUrl_ url ->
                    Err (Http.BadUrl url)

                Http.Timeout_ ->
                    Err Http.Timeout

                Http.NetworkError_ ->
                    Err Http.NetworkError

                Http.BadStatus_ metadata body ->
                    if metadata.statusCode == 400 then
                        Err <| Http.BadBody body

                    else
                        Err <| Http.BadStatus metadata.statusCode

                Http.GoodStatus_ _ _ ->
                    Ok ()


type alias ResultDelete =
    Result Http.Error ()


delete : (ResultDelete -> msg) -> Shared.Token -> String -> Cmd msg
delete msg token deckId =
    API.delete { token = Just token, url = "/api/v1/decklist/" ++ deckId, expect = Http.expectWhatever msg }


type alias ResultRead =
    Result Http.Error Deck


read : Collection -> (ResultRead -> msg) -> Maybe Shared.Token -> String -> Cmd msg
read collection msg token deckId =
    API.get
        { token = token
        , url = "/api/v1/decklist/" ++ deckId
        , expect = Http.expectJson msg (Data.Deck.decoder collection)
        }


type alias ResultIndex =
    Result Http.Error (List Deck)


index : Collection -> (ResultIndex -> msg) -> Maybe Shared.Token -> Cmd msg
index collection msg token =
    API.get
        { token = token
        , url = "/api/v1/decklist"
        , expect = Http.expectJson msg (Decode.list <| Data.Deck.decoder collection)
        }


indexForUser : Collection -> (ResultIndex -> msg) -> Shared.Token -> String -> Cmd msg
indexForUser collection msg token userId =
    API.get
        { token = Just token
        , url = "/api/v1/decklist?userId=" ++ userId
        , expect = Http.expectJson msg (Decode.list <| Data.Deck.decoder collection)
        }
