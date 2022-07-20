module Pages.Home_ exposing (Model, Msg, page)

import API.Announcement
import API.ErrorHandler
import Data.Announcement exposing (Announcement)
import Data.Time exposing (yyyymmdd)
import Effect exposing (Effect)
import Gen.Params.Home_ exposing (Params)
import Html exposing (Html, dd, div, dl, dt, text)
import Html.Attributes exposing (class)
import Page
import Request
import Shared
import UI.Layout.Template
import UI.Markdown as Markdown
import UI.Text
import View exposing (View)


page : Shared.Model -> Request.With Params -> Page.With Model Msg
page shared req =
    Page.advanced
        { init = init req
        , update = update
        , view = view shared
        , subscriptions = always Sub.none
        }


type alias Model =
    { announcements : List Announcement }


init : Request.With Params -> ( Model, Effect Msg )
init _ =
    ( { announcements = [] }, Effect.fromCmd <| API.Announcement.index FetchedAnnouncements )


type Msg
    = FromShared Shared.Msg
    | FetchedAnnouncements API.Announcement.ResultIndex


update : Msg -> Model -> ( Model, Effect Msg )
update msg model =
    case msg of
        FromShared subMsg ->
            ( model, Effect.fromShared subMsg )

        FetchedAnnouncements (Ok announcements) ->
            ( { model | announcements = announcements }, Effect.none )

        FetchedAnnouncements (Err e) ->
            ( model, API.ErrorHandler.standardAlert e )


view : Shared.Model -> Model -> View Msg
view shared model =
    UI.Layout.Template.view FromShared
        shared
        [ div [ class "page-home__content" ]
            [ div [ class "page-home__announcements" ]
                [ UI.Text.header [ text "Announcements" ]
                , dl [ class "announcements" ]
                    (List.concatMap viewAnnouncement model.announcements)
                ]
            ]
        ]


viewAnnouncement : Announcement -> List (Html msg)
viewAnnouncement { publishedAt, markdown } =
    [ dt [ class "announcements__date" ]
        [ text <| yyyymmdd publishedAt ]
    , dd [ class "announcements__txt" ]
        [ Markdown.view markdown ]
    ]
