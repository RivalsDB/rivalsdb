port module Port.UniqueId exposing (UniqueId, onReceiveId, requestId)

import Json.Decode as Json


port receivedId : (Json.Value -> msg) -> Sub msg


port generateId : () -> Cmd msg


type alias UniqueId =
    String


requestId : Cmd msg
requestId =
    generateId ()


onReceiveId : (Maybe UniqueId -> msg) -> Sub msg
onReceiveId rec =
    receivedId
        (\json ->
            case parse json of
                Ok uniqueId ->
                    rec <| Just uniqueId

                Err _ ->
                    rec Nothing
        )


parse : Json.Value -> Result Json.Error String
parse value =
    value |> Json.decodeValue Json.string
