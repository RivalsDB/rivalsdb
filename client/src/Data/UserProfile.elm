module Data.UserProfile exposing (UserProfile, decode)

import Data.Patronage as Patronage exposing (Patronage)
import Json.Decode exposing (Decoder, field, map3, maybe, string)


type alias UserProfile =
    { userId : String
    , displayName : Maybe String
    , patronage : Patronage
    }


decode : Decoder UserProfile
decode =
    map3 UserProfile
        (field "userId" string)
        (maybe (field "displayName" string))
        (field "patronage" Patronage.decoder)
