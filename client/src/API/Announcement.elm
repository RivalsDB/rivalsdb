module API.Announcement exposing (ResultIndex, index)

import API.API as API
import Data.Announcement as Announcement exposing (Announcement)
import Http
import Json.Decode as Decode


type alias ResultIndex =
    Result Http.Error (List Announcement)


index : (ResultIndex -> msg) -> Cmd msg
index msg =
    API.get
        { token = Nothing
        , url = "/api/v2/announcements"
        , expect = Http.expectJson msg (Decode.list Announcement.decoder)
        }
