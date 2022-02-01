module API.API exposing (delete, get, put)

import Http exposing (Header)
import Shared exposing (Token)


type alias GetRequest msg =
    { url : String
    , token : Maybe Token
    , expect : Http.Expect msg
    }


type alias PutRequest msg =
    { url : String
    , token : Maybe Token
    , body : Http.Body
    , expect : Http.Expect msg
    }


type alias DeleteRequest msg =
    { url : String
    , token : Maybe Token
    , expect : Http.Expect msg
    }


get : GetRequest msg -> Cmd msg
get req =
    Http.request
        { method = "GET"
        , url = req.url
        , headers = headers req.token
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.emptyBody
        , expect = req.expect
        }


put : PutRequest msg -> Cmd msg
put req =
    Http.request
        { method = "PUT"
        , url = req.url
        , headers = headers req.token
        , timeout = Nothing
        , tracker = Nothing
        , body = req.body
        , expect = req.expect
        }


delete : DeleteRequest msg -> Cmd msg
delete req =
    Http.request
        { method = "DELETE"
        , url = req.url
        , headers = headers req.token
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.emptyBody
        , expect = req.expect
        }


headers : Maybe Token -> List Header
headers token =
    token
        |> Maybe.map (auth >> List.singleton)
        |> Maybe.withDefault []


auth : Token -> Header
auth token =
    Http.header "Authorization" ("Bearer " ++ token)
