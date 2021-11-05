module API.User exposing (ResultRead, ResultSaveDisplayName, read, saveDisplayName)

import API.Auth exposing (auth)
import Http
import Json.Decode as Decode exposing (field, maybe, string)
import Json.Encode as Encode
import Shared


type alias UserProfile =
    { userId : String, displayName : Maybe String }


type alias ResultRead =
    Result Http.Error UserProfile


read : (ResultRead -> msg) -> String -> Cmd msg
read msg userId =
    Http.get
        { url = "/api/v1/users/" ++ userId
        , expect = Http.expectJson msg userProfileDecoder
        }


type alias ResultSaveDisplayName =
    Result Http.Error ()


saveDisplayName : (ResultSaveDisplayName -> msg) -> Shared.Token -> String -> String -> Cmd msg
saveDisplayName msg token userId displayName =
    Http.request
        { method = "PUT"
        , url = "/api/v1/users/" ++ userId
        , headers = [ auth token ]
        , timeout = Nothing
        , tracker = Nothing
        , body = Http.jsonBody (Encode.object [ ( "displayName", Encode.string displayName ) ])
        , expect = Http.expectWhatever msg
        }


userProfileDecoder : Decode.Decoder UserProfile
userProfileDecoder =
    Decode.map2 UserProfile
        (field "userId" string)
        (field "displayName" (maybe string))
