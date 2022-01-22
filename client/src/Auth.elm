module Auth exposing (User, beforeProtectedInit)

import ElmSpa.Page as ElmSpa
import Gen.Route exposing (Route)
import Port.Auth
import Request exposing (Request)
import Shared


type alias User =
    Port.Auth.User


beforeProtectedInit : Shared.Model -> Request -> ElmSpa.Protected User Route
beforeProtectedInit shared _ =
    case shared.user of
        Just user ->
            ElmSpa.Provide user

        Nothing ->
            ElmSpa.RedirectTo Gen.Route.Signin
