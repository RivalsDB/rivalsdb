module UI.FilterSelection exposing (Model, Msg(..), allStacks, attackTypes, clans, disciplines, isAllowed, playerStacks, primaryTraits, secondaryTraits, update, view)

import Cards exposing (Card)
import Data.Clan as Clan exposing (Clan)
import Data.Discipline as Discipline exposing (Discipline)
import Data.Trait as Trait exposing (Trait)
import Html exposing (Html, div, input, label)
import Html.Attributes exposing (class, classList, type_)
import Html.Events exposing (onCheck)
import UI.Icon as Icon
import UI.Icon.V2 as DisciplineIcon


type alias Model value msg =
    List ( value, Bool, Html msg )


playerStacks : Model Cards.CardStack msg
playerStacks =
    List.map modelHelper
        [ ( Cards.AgendaStack, Icon.AgendaCard )
        , ( Cards.HavenStack, Icon.Haven )
        , ( Cards.FactionStack, Icon.Faction )
        , ( Cards.LibraryStack, Icon.Library )
        ]


allStacks : Model Cards.CardStack msg
allStacks =
    List.map modelHelper
        [ ( Cards.CityStack, Icon.City )
        , ( Cards.AgendaStack, Icon.AgendaCard )
        , ( Cards.HavenStack, Icon.Haven )
        , ( Cards.FactionStack, Icon.Faction )
        , ( Cards.LibraryStack, Icon.Library )
        ]


primaryTraits : Model Trait msg
primaryTraits =
    List.map modelHelper
        [ ( Trait.Action, Icon.Action )
        , ( Trait.UnhostedAction, Icon.UnhostedAction )
        , ( Trait.Attack, Icon.Attack )
        , ( Trait.Reaction, Icon.Reaction )
        , ( Trait.InfluenceModifier, Icon.InfluenceModifier )
        ]


secondaryTraits : Model Trait msg
secondaryTraits =
    List.map modelHelper
        [ ( Trait.Ongoing, Icon.Ongoing )
        , ( Trait.Scheme, Icon.Scheme )
        , ( Trait.Title, Icon.Title )
        , ( Trait.Conspiracy, Icon.Conspiracy )
        , ( Trait.Alchemy, Icon.Alchemy )
        , ( Trait.Ritual, Icon.Ritual )
        , ( Trait.Animal, Icon.Animal )
        , ( Trait.Special, Icon.Special )
        ]


attackTypes : Model Cards.AttackType msg
attackTypes =
    List.map modelHelper
        [ ( Cards.Physical, Icon.Physical )
        , ( Cards.Social, Icon.Social )
        , ( Cards.Mental, Icon.Mental )
        , ( Cards.Ranged, Icon.Ranged )
        ]


clans : Model Clan msg
clans =
    toModel (DisciplineIcon.clan DisciplineIcon.Standard) Clan.all


disciplines : Model Discipline msg
disciplines =
    toModel (DisciplineIcon.discipline DisciplineIcon.Standard) Discipline.all


toModel : (a -> Html msg) -> List a -> Model a msg
toModel iconForItem =
    List.map (\item -> ( item, False, iconForItem item ))


modelHelper : ( trait, Icon.IconImage ) -> ( trait, Bool, Html msg )
modelHelper ( trait, icon ) =
    ( trait, False, Icon.icon ( icon, Icon.Standard ) )


type Msg value
    = ChangedValue value Bool


update : Msg value -> Model value msg -> Model value msg
update msg model =
    case msg of
        ChangedValue changedKey newValue ->
            List.map
                (\( key, oldValue, html ) ->
                    if key == changedKey then
                        ( key, newValue, html )

                    else
                        ( key, oldValue, html )
                )
                model


view : (Msg value -> msg) -> Model value msg -> Html msg
view msg options =
    div [ class "filterpicker" ]
        (List.map (viewFilterOption msg) options)


viewFilterOption : (Msg value -> msg) -> ( value, Bool, Html msg ) -> Html msg
viewFilterOption msg ( value, isActive, icon ) =
    label
        [ class "filterpicker__option"
        , classList [ ( "filterpicker__option--active", isActive ) ]
        ]
        [ div
            [ class "filterpicker__box"
            , classList [ ( "filterpicker__box--active", isActive ) ]
            ]
            [ icon ]
        , input
            [ class "filterpicker__checkbox"
            , type_ "checkbox"
            , onCheck (ChangedValue value >> msg)
            ]
            []
        ]


isAllowed : (Card -> List value) -> Model value msg -> Card -> Bool
isAllowed toValues model card =
    let
        whitelist =
            List.filterMap
                (\( key, isOn, _ ) ->
                    if isOn then
                        Just key

                    else
                        Nothing
                )
                model
    in
    if List.isEmpty whitelist then
        True

    else
        toValues card |> List.any (\cardValue -> List.member cardValue whitelist)
