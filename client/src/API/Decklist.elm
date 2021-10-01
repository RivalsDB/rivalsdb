module API.Decklist exposing (ResultCreate, create)

import Http
import Json.Encode as Encode
import Shared exposing (Token)


type alias ResultCreate =
    Result Http.Error ()


create : (ResultCreate -> msg) -> Token -> Encode.Value -> Cmd msg
create msg token deck =
    Http.request
        { method = "POST"
        , url = "http://localhost:3000/api/v1/decklist"
        , headers = [ authHeader token ]
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.jsonBody deck
        , expect = Http.expectWhatever msg
        }


authHeader : Token -> Http.Header
authHeader token =
    Http.header "Authorization" ("Bearer " ++ token)
