module API.Decklist exposing (ResultCreate, ResultIndex, ResultRead, ResultUpdate, create, index, read, update)

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
        , headers = [ authHeader token ]
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
        , headers = [ authHeader token ]
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.jsonBody deck
        , expect = Http.expectWhatever msg
        }


type alias ResultRead =
    Result Http.Error DeckPostSave


read : Shared.Collection -> (ResultRead -> msg) -> String -> Cmd msg
read collection msg deckId =
    Http.get
        { url = "/api/v1/decklist/" ++ deckId
        , expect = Http.expectJson msg (Deck.decoder collection)
        }


type alias ResultIndex =
    Result Http.Error (List DeckPostSave)


index : Shared.Collection -> (ResultIndex -> msg) -> Cmd msg
index collection msg =
    Http.get
        { url = "/api/v1/decklist"
        , expect = Http.expectJson msg (Decode.list <| Deck.decoder collection)
        }



----------
-- HELPERS
----------


authHeader : Shared.Token -> Http.Header
authHeader token =
    Http.header "Authorization" ("Bearer " ++ token)
