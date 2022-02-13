module UI.HandTester exposing (Model, Msg(..), init, isNotSet, shuffle, update, view)

import Cards exposing (Card)
import Data.Deck exposing (Decklist, Faction, Library)
import Dict
import Html exposing (Html, button, div, h4, text)
import Html.Attributes exposing (class)
import Html.Events exposing (onClick)
import Random exposing (Generator)
import Random.List
import UI.Card


type alias Model =
    { decklist : Decklist
    , hand : List Card
    , factionStack : List Card
    , libraryStack : List Card
    }


init : Decklist -> Model
init decklist =
    { decklist = decklist
    , hand = []
    , factionStack = []
    , libraryStack = []
    }


isNotSet : Model -> Bool
isNotSet =
    .hand >> List.isEmpty


type Msg
    = Shuffled ( List Card, List Card )
    | DrawFaction
    | DrawLibrary
    | Reshuffle


update : Msg -> Model -> ( Model, Cmd Msg )
update msg model =
    case msg of
        Shuffled shuffledCards ->
            case shuffledCards of
                ( l1 :: l2 :: l3 :: l4 :: restLibrary, f1 :: f2 :: restFaction ) ->
                    ( { model
                        | hand = [ l1, l2, l3, l4, f1, f2 ]
                        , libraryStack = restLibrary
                        , factionStack = restFaction
                      }
                    , Cmd.none
                    )

                ( library, faction ) ->
                    ( { model | hand = [], libraryStack = library, factionStack = faction }, Cmd.none )

        DrawFaction ->
            case model.factionStack of
                [] ->
                    ( model, Cmd.none )

                topFaction :: restFaction ->
                    ( { model | hand = List.append model.hand [ topFaction ], factionStack = restFaction }, Cmd.none )

        DrawLibrary ->
            case model.libraryStack of
                [] ->
                    ( model, Cmd.none )

                topLibrary :: otherLibrary ->
                    ( { model | hand = List.append model.hand [ topLibrary ], libraryStack = otherLibrary }, Cmd.none )

        Reshuffle ->
            ( model, shuffle model )


shuffle : Model -> Cmd Msg
shuffle model =
    Random.generate Shuffled (handGenerator model.decklist)


view : Model -> Html Msg
view model =
    div [ class "handtester" ]
        (if List.length model.hand == 0 then
            []

         else
            [ h4 [ class "handtester__header" ] [ text "Hand simulation" ]
            , div [ class "handtester__cards" ]
                (List.map UI.Card.lazy model.hand
                    ++ [ div [ class "handtester__draw-more" ]
                            ([ ( button [ onClick DrawFaction ]
                                    [ text "Draw Faction card" ]
                               , not <| List.isEmpty model.factionStack
                               )
                             , ( button [ onClick DrawLibrary ]
                                    [ text "Draw Library card" ]
                               , not <| List.isEmpty model.libraryStack
                               )
                             , ( button [ onClick Reshuffle ]
                                    [ text "Reshuffle & Draw again" ]
                               , True
                               )
                             ]
                                |> List.filterMap
                                    (\( html, shouldRender ) ->
                                        if shouldRender then
                                            Just html

                                        else
                                            Nothing
                                    )
                            )
                       ]
                )
            ]
        )



----------
-- RANDOM
----------


factionGenerator : Faction -> Generator (List Card)
factionGenerator =
    Dict.values
        >> List.filterMap
            (\( card, isLeader ) ->
                if isLeader then
                    Nothing

                else
                    Just (Cards.FactionCard card)
            )
        >> Random.List.shuffle


libraryGenerator : Library -> Generator (List Card)
libraryGenerator =
    Dict.values
        >> List.foldl (\( card, n ) cards -> List.repeat n (Cards.LibraryCard card) |> List.append cards) []
        >> Random.List.shuffle


handGenerator : Decklist -> Generator ( List Card, List Card )
handGenerator decklist =
    Random.map2 Tuple.pair (libraryGenerator decklist.library) (factionGenerator decklist.faction)
