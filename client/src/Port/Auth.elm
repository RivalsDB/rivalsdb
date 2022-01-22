port module Port.Auth exposing (User, receivedSignin, startSignin, startSignout)

import Json.Decode as Json


port signInReceiver : (Json.Value -> msg) -> Sub msg


port initiateLogin : String -> Cmd msg


port signOut : () -> Cmd msg


startSignout : Cmd msg
startSignout =
    signOut ()


startSignin : String -> Cmd msg
startSignin =
    initiateLogin


type alias User =
    { token : String, id : String }


receivedSignin : (Maybe User -> msg) -> Sub msg
receivedSignin onSignIn =
    signInReceiver
        (\json ->
            case Json.decodeValue decodeUser json of
                Ok user ->
                    onSignIn <| Just user

                Err _ ->
                    onSignIn <| Nothing
        )


decodeUser : Json.Decoder User
decodeUser =
    Json.map2 User (Json.field "token" Json.string) (Json.field "user" Json.string)
