module API.Tournament exposing (ResultIndex, index)

import API.API as API
import Data.Collection exposing (Collection)
import Data.Tournament as Tournament exposing (Tournament)
import Http
import Json.Decode as Decode


type alias ResultIndex =
    Result Http.Error (List Tournament)


index : Collection -> (ResultIndex -> msg) -> Cmd msg
index collection msg =
    API.get
        { token = Nothing
        , url = "/api/v2/tournaments"
        , expect = Http.expectJson msg (Decode.list <| Tournament.decoder collection)
        }
