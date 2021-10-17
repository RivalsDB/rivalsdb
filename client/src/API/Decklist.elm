module API.Decklist exposing (ResultCreate, ResultRead, create, read)

import Deck exposing (Deck)
import Http
import Json.Encode as Encode
import Shared
import Url exposing (Protocol(..))


type alias ResultCreate =
    Result Http.Error ()


create : (ResultCreate -> msg) -> Shared.Token -> Encode.Value -> Cmd msg
create msg token deck =
    Http.request
        { method = "POST"
        , url = "/api/v1/decklist"
        , headers = [ authHeader token ]
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.jsonBody deck
        , expect = Http.expectWhatever msg
        }


type alias ResultRead =
    Result Http.Error Deck


read : Shared.Collection -> (ResultRead -> msg) -> String -> Cmd msg
read collection msg deckId =
    Http.get
        { url = "/api/v1/decklist/" ++ deckId
        , expect = Http.expectJson msg (Deck.decoder collection)
        }



----------
-- HELPERS
----------


authHeader : Shared.Token -> Http.Header
authHeader token =
    Http.header "Authorization" ("Bearer " ++ token)
