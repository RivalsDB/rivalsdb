module Pages.Tournaments exposing (Model, Msg, page)

import API.Tournament
import Data.Collection exposing (Collection)
import Data.Deck exposing (Deck)
import Data.Tournament as Tournament exposing (Placement, Tournament)
import Effect exposing (Effect)
import Gen.Params.Tournaments exposing (Params)
import Html exposing (Html, div, h2, li, ol, span, text, ul)
import Html.Attributes exposing (class)
import Page
import Request
import Shared
import String exposing (fromInt)
import UI.DeckCard
import UI.Layout.Template
import UI.Text
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.advanced
        { init = init shared.collection req
        , update = update
        , view = view shared
        , subscriptions = always Sub.none
        }


type Model
    = Loading
    | Loaded (List Tournament)


init : Collection -> Request.With Params -> ( Model, Effect Msg )
init collection _ =
    ( Loading, Effect.fromCmd <| API.Tournament.index collection FetchedTournaments )


type Msg
    = FromShared Shared.Msg
    | FetchedTournaments API.Tournament.ResultIndex


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case msg of
        FromShared subMsg ->
            ( model, Effect.fromShared subMsg )

        FetchedTournaments (Err _) ->
            ( model, Effect.none )

        FetchedTournaments (Ok tournaments) ->
            ( Loaded tournaments, Effect.none )


view : Shared.Model -> Model -> View Msg
view shared model =
    case model of
        Loading ->
            UI.Layout.Template.view FromShared
                shared
                [ div [ class "page-tournaments__content" ] [ text "Loading..." ]
                ]

        Loaded tournaments ->
            UI.Layout.Template.view FromShared
                shared
                [ div [ class "page-tournaments__content" ]
                    [ UI.Text.header [ text "Tournaments" ]
                    , ul [ class "page-tournaments__tournaments-list" ] <|
                        List.map viewTournament tournaments
                    ]
                ]


viewTournament : Tournament -> Html Msg
viewTournament { tournament, decks } =
    li [ class "tournament-list__item" ]
        [ h2 [ class "tournament-list__event-name" ] [ text tournament.name ]
        , div [ class "tournament-list__event-subtitle" ] <|
            span []
                [ text "On "
                , text
                    (if tournament.startDate == tournament.endDate then
                        tournament.startDate

                     else
                        tournament.startDate ++ " –\u{2060} " ++ tournament.endDate
                    )
                ]
                :: (tournament.size
                        |> Maybe.map (\s -> [ text <| " (" ++ fromInt s ++ " players)" ])
                        |> Maybe.withDefault []
                   )
        , ol [ class "tournament-list__decks" ] (decks |> List.map viewDeck)
        ]


viewDeck : ( Placement, Deck ) -> Html Msg
viewDeck ( p, d ) =
    li [ class "tournament-list__deck" ]
        [ div [ class "tournament-list__deck-placement" ]
            [ case p of
                Tournament.Top1 ->
                    text "Winner"

                Tournament.Top2 ->
                    text "2nd Place"

                Tournament.Top4 ->
                    text "Top 4"

                Tournament.Top8 ->
                    text "Top 8"

                Tournament.Top16 ->
                    text "Top 16"

                Tournament.Top32 ->
                    text "Top 32"

                Tournament.Top64 ->
                    text "Top 64"
            ]
        , div [ class "tournament-list__deck-card" ]
            [ UI.DeckCard.viewPublic d
            ]
        ]
