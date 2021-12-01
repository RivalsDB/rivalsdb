module Util exposing (htmlList)

import Html exposing (Html)



----------
-- HtmlList
----------


htmlList : List ( Html msg, Bool ) -> List (Html msg)
htmlList =
    List.filterMap listItemIfEnabled


listItemIfEnabled : ( Html msg, Bool ) -> Maybe (Html msg)
listItemIfEnabled ( element, isEnabled ) =
    if isEnabled then
        Just element

    else
        Nothing
