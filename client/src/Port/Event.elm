port module Port.Event exposing (Event(..), track)

import Json.Encode as Json exposing (Value, bool, object, string)


port trackEvent : Value -> Cmd msg


type Event
    = SignedOut
    | HeaderSearchUsed String
    | DeckIndexFilter ( String, String )
    | BuilderClearFilters
    | BuilderShowAllFilters
    | BuilderToggleStrictFilters Bool
    | BuilderHideAllFilters
    | BuilderShowImages
    | BuilderHideImages
    | HandSimulatorUsed String


track : Event -> Cmd msg
track =
    encode >> trackEvent


encode : Event -> Value
encode event =
    case event of
        SignedOut ->
            object [ ( "name", string "Signed out" ) ]

        BuilderClearFilters ->
            object [ ( "name", string "Builder Clear Filters" ) ]

        BuilderShowAllFilters ->
            object [ ( "name", string "Builder Show All Filters" ) ]

        BuilderHideAllFilters ->
            object [ ( "name", string "Builder Hide All Filters" ) ]

        BuilderShowImages ->
            object [ ( "name", string "Builder Show Images" ) ]

        BuilderHideImages ->
            object [ ( "name", string "Builder Hide Images" ) ]

        BuilderToggleStrictFilters strictOn ->
            object
                [ ( "name", string "Builder Toggle Strict Filters" )
                , ( "extra", object [ ( "strict", bool strictOn ) ] )
                ]

        HandSimulatorUsed page ->
            object
                [ ( "name", string "Hand Simulator used" )
                , ( "extra", object [ ( "page", string page ) ] )
                ]

        HeaderSearchUsed query ->
            object
                [ ( "name", string "Used header search" )
                , ( "extra", object [ ( "query", string query ) ] )
                ]

        DeckIndexFilter ( by, value ) ->
            object
                [ ( "name", string "Deck index: filter" )
                , ( "extra", object [ ( by, string value ) ] )
                ]
