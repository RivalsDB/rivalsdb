port module Port.Auth exposing (receivedSignin, startSignin, startSignout)

import Data.User as User exposing (User)
import Json.Decode as Json


port signInReceiver : (Json.Value -> msg) -> Sub msg


port initiateLogin : () -> Cmd msg


port signOut : () -> Cmd msg


startSignout : Cmd msg
startSignout =
    signOut ()


startSignin : Cmd msg
startSignin =
    initiateLogin ()


receivedSignin : (Maybe User -> msg) -> Sub msg
receivedSignin onSignIn =
    signInReceiver
        (\json ->
            case Json.decodeValue User.decode json of
                Ok user ->
                    onSignIn <| Just user

                Err _ ->
                    onSignIn <| Nothing
        )
