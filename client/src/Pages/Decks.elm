module Pages.Decks exposing (Model, Msg, page)

import API.Decklist
import Deck exposing (Deck)
import Effect exposing (Effect)
import Gen.Params.Decks exposing (Params)
import Gen.Route as Route
import Html exposing (Html, a, div, h1, li, p, span, strong, text, ul)
import Html.Attributes exposing (class, href)
import Page
import Request
import Shared
import UI.Icon
import UI.Layout.Template
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.advanced
        { init = init shared
        , update = update
        , view = view shared
        , subscriptions = always Sub.none
        }



-- INIT


type Model
    = Loading
    | Viewing (List Deck)


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


viewDecklists : Shared.Model -> List Deck -> View Msg
viewDecklists shared model =
    UI.Layout.Template.view FromShared
        shared
        [ div []
            [ h1 [] [ text "Decklists" ]
            , ul []
                (model |> List.map viewDecklistEntry)
            ]
        ]


viewDecklistEntry : Deck -> Html Msg
viewDecklistEntry deck =
    li [ class "deckindexitem" ]
        [ p []
            [ a [ href <| Route.toHref (Route.View__Id_ { id = deck.meta.id }) ]
                [ strong []
                    [ if String.length deck.meta.name > 0 then
                        text deck.meta.name

                      else
                        text "Unnamed"
                    ]
                , text " by: "
                , text deck.meta.owner
                ]
            ]
        , p [ class "brb" ]
            [ span [ class "brb-block" ] [ deck.decklist.agenda |> Maybe.map (.name >> text) |> Maybe.withDefault (text "Unknown Agenda") ]
            , span [ class "brb-block" ] [ text " | " ]
            , span [ class "brb-block" ] [ deck.decklist.haven |> Maybe.map (.name >> text) |> Maybe.withDefault (text "Unknown Haven") ]
            , span [ class "brb-block" ] [ text " | " ]
            , span [ class "brb-block" ] [ Deck.leader deck.decklist |> Maybe.map (.name >> text) |> Maybe.withDefault (text "Unknown Leader") ]
            , span [] [ text ": " ]
            , span [ class "brb-clans" ]
                (Deck.clansInFaction deck.decklist.faction
                    |> List.map
                        (\( clan, n ) ->
                            span [ class "brb-clan" ]
                                [ span [ class "brb-num" ] [ text <| String.fromInt n ]
                                , span [ class "brb-ico" ]
                                    [ UI.Icon.clan clan
                                    ]
                                ]
                        )
                )
            ]
        ]
