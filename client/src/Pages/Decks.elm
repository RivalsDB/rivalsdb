module Pages.Decks exposing (Model, Msg, page)

import API.Decklist
import Cards exposing (Faction)
import Deck exposing (DeckPostSave)
import Dict
import Effect exposing (Effect)
import Gen.Params.Decks exposing (Params)
import Gen.Route as Route
import Html exposing (Html, a, div, h1, li, p, span, strong, text, ul)
import Html.Attributes exposing (class, href)
import Page
import Request
import Shared
import UI.Card
import UI.Icon
import UI.Layout.Template
import UI.Text
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared _ =
    Page.advanced
        { init = init shared
        , update = update
        , view = view shared
        , subscriptions = always Sub.none
        }



-- INIT


type Model
    = Loading
    | Viewing (List DeckPostSave)


init : Shared.Model -> ( Model, Effect Msg )
init shared =
    ( Loading
    , Effect.fromCmd <| API.Decklist.index shared.collection FetchedDecklists
    )



-- UPDATE


type Msg
    = FromShared Shared.Msg
    | FetchedDecklists API.Decklist.ResultIndex


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case msg of
        FromShared subMsg ->
            ( model, Effect.fromShared subMsg )

        FetchedDecklists (Ok decks) ->
            ( Viewing decks, Effect.none )

        FetchedDecklists (Err _) ->
            ( model, Effect.none )



----------
-- VIEW
----------


view : Shared.Model -> Model -> View Msg
view shared model =
    case model of
        Loading ->
            UI.Layout.Template.view FromShared shared [ text "Loading" ]

        Viewing ddd ->
            viewDecklists shared ddd


viewDecklists : Shared.Model -> List DeckPostSave -> View Msg
viewDecklists shared model =
    UI.Layout.Template.view FromShared
        shared
        [ div []
            [ UI.Text.header [ text "Decklists" ]
            , ul [ class "deckindex" ]
                (model |> List.map viewDecklistEntry)
            ]
        ]


viewDecklistEntry : DeckPostSave -> Html Msg
viewDecklistEntry deck =
    li [ class "deckindexitem" ]
        [ a [ class "deckindexcard", href <| Route.toHref (Route.Deck__View__Id_ { id = deck.meta.id }) ]
            [ div [ class "deckindexcard__illustration" ] [ illustrationImage deck.decklist ]
            , div [ class "deckindexcard__illustration-overlay" ] []
            , div [ class "deckindexcard__content" ]
                [ p [ class "deckindexcard__name" ] [ text <| Deck.displayName deck.meta.name ]
                , p [ class "deckindexcard__byline" ] [ text "by: ", text <| Deck.ownerDisplayName deck.meta ]
                , p [ class "deckindexcard__clans" ]
                    (Deck.clansInFaction deck.decklist.faction
                        |> List.map
                            (\( clan, _ ) ->
                                span [ class "deckindexcard__clan" ] [ UI.Icon.clan UI.Icon.Negative clan ]
                            )
                    )
                , p [ class "deckindexcard__summary" ]
                    [ Deck.leader deck.decklist |> Maybe.map (.name >> text) |> Maybe.withDefault (text "Unknown Leader")
                    , text " • "
                    , deck.decklist.haven |> Maybe.map (.name >> text) |> Maybe.withDefault (text "Unknown Haven")
                    , text " • "
                    , deck.decklist.agenda |> Maybe.map (.name >> text) |> Maybe.withDefault (text "Unknown Agenda")
                    ]
                ]
            ]
        ]


illustrationImage : Deck.Decklist -> Html Msg
illustrationImage decklist =
    case Deck.leader decklist of
        Just leader ->
            UI.Card.lazy (Cards.FactionCard leader)

        Nothing ->
            case Deck.fallbackLeader decklist of
                Just fallbackLeader ->
                    UI.Card.lazy (Cards.FactionCard fallbackLeader)

                Nothing ->
                    span [] []
