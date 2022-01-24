module UI.HandTester exposing (HandTest, empty, generateHand, view)

import Cards exposing (Card)
import Data.Deck as Deck
import Dict
import Html exposing (Html, div, h4, text)
import Html.Attributes exposing (class)
import Random exposing (Generator)
import Random.List
import UI.Card


type alias HandTest =
    List Card


empty : HandTest
empty =
    []


generateHand : (HandTest -> msg) -> Deck.Decklist -> Cmd msg
generateHand msg decklist =
    Random.generate msg (handGenerator decklist)


view : HandTest -> Html msg
view hand =
    div [ class "handtester" ]
        (if List.length hand == 0 then
            []

         else
            [ h4 [ class "handtester__header" ] [ text "Hand simulation" ]
            , div [ class "handtester__cards" ] (List.map UI.Card.lazy hand)
            ]
        )



----------
-- RANDOM
----------


factionGenerator : Deck.Faction -> Generator (List Card)
factionGenerator faction =
    faction
        |> Dict.values
        |> List.filterMap
            (\( card, isLeader ) ->
                if isLeader then
                    Nothing

                else
                    Just (Cards.FactionCard card)
            )
        |> Random.List.choices 2
        |> Random.map Tuple.first


libraryGenerator : Deck.Library -> Generator (List Card)
libraryGenerator library =
    library
        |> Dict.values
        |> List.foldl (\( card, n ) cards -> List.repeat n (Cards.LibraryCard card) |> List.append cards) []
        |> Random.List.choices 4
        |> Random.map Tuple.first


handGenerator : Deck.Decklist -> Generator (List Card)
handGenerator decklist =
    Random.map2 List.append (libraryGenerator decklist.library) (factionGenerator decklist.faction)
