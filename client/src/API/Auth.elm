module API.Auth exposing (auth)

import Http exposing (Header)
import Shared exposing (Token)


auth : Token -> Header
auth token =
    Http.header "Authorization" ("Bearer " ++ token)
