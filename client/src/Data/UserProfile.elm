module Data.UserProfile exposing (UserProfile, decode)

import Json.Decode exposing (Decoder, field, map2, maybe, string)


type alias UserProfile =
    { userId : String, displayName : Maybe String }


decode : Decoder UserProfile
decode =
    map2 UserProfile (field "userId" string) (maybe (field "displayName" string))
