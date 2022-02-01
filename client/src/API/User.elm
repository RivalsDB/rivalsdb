module API.User exposing (ResultRead, ResultSaveDisplayName, read, saveDisplayName)

import API.API exposing (get, put)
import Data.UserProfile as UserProfile exposing (UserProfile)
import Http
import Json.Encode as Encode
import Shared


type alias ResultRead =
    Result Http.Error UserProfile


read : (ResultRead -> msg) -> Maybe Shared.Token -> String -> Cmd msg
read msg token userId =
    get
        { token = token
        , url = "/api/v1/users/" ++ userId
        , expect = Http.expectJson msg UserProfile.decode
        }


type alias ResultSaveDisplayName =
    Result Http.Error ()


saveDisplayName : (ResultSaveDisplayName -> msg) -> Shared.Token -> String -> String -> Cmd msg
saveDisplayName msg token userId displayName =
    put
        { token = Just token
        , url = "/api/v1/users/" ++ userId
        , body = Http.jsonBody (Encode.object [ ( "displayName", Encode.string displayName ) ])
        , expect = Http.expectWhatever msg
        }
