module Data.Announcement exposing (Announcement, decoder)

import Json.Decode exposing (Decoder, field, int, map, map3, string)
import Time exposing (Posix)


type alias Announcement =
    { id : Int
    , markdown : String
    , publishedAt : Posix
    }


decoder : Decoder Announcement
decoder =
    map3 Announcement
        (field "announcementId" int)
        (field "markdown" string)
        (field "publishedAt" (map Time.millisToPosix int))
