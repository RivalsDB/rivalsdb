port module Auth exposing
    ( User
    , beforeProtectedInit
    , initiateLogin
    )

import ElmSpa.Page as ElmSpa
import Gen.Route exposing (Route)
import Request exposing (Request)
import Shared


type alias User =
    Shared.User


port initiateLogin : String -> Cmd msg


beforeProtectedInit : Shared.Model -> Request -> ElmSpa.Protected User Route
beforeProtectedInit shared _ =
    case shared.user of
        Just user ->
            ElmSpa.Provide user

        Nothing ->
            ElmSpa.RedirectTo Gen.Route.Home_
