module API.Decklist exposing
    ( ResultCreate
    , ResultDelete
    , ResultIndex
    , ResultRead
    , ResultUpdate
    , create
    , delete
    , index
    , indexForUser
    , read
    , update
    )

import API.Auth exposing (auth)
import Data.Collection exposing (Collection)
import Deck exposing (DeckPostSave)
import Http
import Json.Decode as Decode
import Json.Encode as Encode
import Shared


type alias ResultCreate =
    Result Http.Error String


create : (ResultCreate -> msg) -> Shared.Token -> Encode.Value -> Cmd msg
create msg token deck =
    Http.request
        { method = "POST"
        , url = "/api/v1/decklist"
        , headers = [ auth token ]
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.jsonBody deck
        , expect = Http.expectJson msg (Decode.field "id" Decode.string)
        }


type alias ResultUpdate =
    Result Http.Error ()


update : (ResultUpdate -> msg) -> Shared.Token -> String -> Encode.Value -> Cmd msg
update msg token deckId deck =
    Http.request
        { method = "PUT"
        , url = "/api/v1/decklist/" ++ deckId
        , headers = [ auth token ]
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.jsonBody deck
        , expect = Http.expectWhatever msg
        }


type alias ResultDelete =
    Result Http.Error ()


delete : (ResultDelete -> msg) -> Shared.Token -> String -> Cmd msg
delete msg token deckId =
    Http.request
        { method = "DELETE"
        , url = "/api/v1/decklist/" ++ deckId
        , headers = [ auth token ]
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.emptyBody
        , expect = Http.expectWhatever msg
        }


type alias ResultRead =
    Result Http.Error DeckPostSave


read : Collection -> (ResultRead -> msg) -> String -> Cmd msg
read collection msg deckId =
    Http.get
        { url = "/api/v1/decklist/" ++ deckId
        , expect = Http.expectJson msg (Deck.decoder collection)
        }


type alias ResultIndex =
    Result Http.Error (List DeckPostSave)


index : Collection -> (ResultIndex -> msg) -> Cmd msg
index collection msg =
    Http.get
        { url = "/api/v1/decklist"
        , expect = Http.expectJson msg (Decode.list <| Deck.decoder collection)
        }


indexForUser : Collection -> (ResultIndex -> msg) -> String -> Cmd msg
indexForUser collection msg userId =
    Http.get
        { url = "/api/v1/decklist?userId=" ++ userId
        , expect = Http.expectJson msg (Decode.list <| Deck.decoder collection)
        }
