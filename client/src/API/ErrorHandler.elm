module API.ErrorHandler exposing (standardAlert)

import Effect exposing (Effect)
import Http
import Shared


standardAlert : Http.Error -> Effect msg
standardAlert e =
    case e of
        Http.BadUrl url ->
            Effect.fromShared (Shared.ToastError "Error" (Just ("Bad URL: " ++ url)))

        Http.BadStatus statusCode ->
            Effect.fromShared (Shared.ToastError "Error" (Just ("Code: " ++ String.fromInt statusCode)))

        Http.BadBody errMsg ->
            Effect.fromShared (Shared.ToastError "Error" (Just ("Bad Request: " ++ errMsg)))

        _ ->
            Effect.fromShared (Shared.ToastError "Oops" (Just "Failed to reach the server"))
