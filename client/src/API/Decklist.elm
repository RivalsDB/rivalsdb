module API.Decklist exposing (ResultCreate, ResultIndex, ResultRead, create, index, read)

import Deck exposing (Deck)
import Http
import Json.Decode as Decode
import Json.Encode as Encode
import Shared
import Url exposing (Protocol(..))


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


type alias ResultRead =
    Result Http.Error Deck


read : Shared.Collection -> (ResultRead -> msg) -> String -> Cmd msg
read collection msg deckId =
    Http.get
        { url = "/api/v1/decklist/" ++ deckId
        , expect = Http.expectJson msg (Deck.decoder collection)
        }


type alias ResultIndex =
    Result Http.Error (List Deck)


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
