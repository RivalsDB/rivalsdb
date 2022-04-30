module Data.User exposing (User, decode)

import Json.Decode as Json


type alias User =
    { token : String, id : String }


decode : Json.Decoder User
decode =
    Json.map2 User (Json.field "token" Json.string) (Json.field "user" Json.string)
