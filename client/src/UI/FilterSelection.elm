module UI.FilterSelection exposing
    ( Model
    , Msg
    , allStacks
    , attackTypes
    , clans
    , disciplines
    , isAllowedStrict
    , isAllowedWide
    , playerStacks
    , primaryTraits
    , secondaryTraits
    , update
    , view
    )

import Cards exposing (Card)
import Data.Clan as Clan
import Data.Discipline as Discipline exposing (Discipline)
import Data.Trait as Trait exposing (Trait)
import Html exposing (Html, div, input, label)
import Html.Attributes exposing (class, classList, type_)
import Html.Events exposing (onCheck)
import UI.Icon as Icon
import UI.Icon.V2 as IconV2



----------
-- Model
----------


type alias Option value never =
    { value : value
    , selected : Bool
    , icon : Html never
    }


type alias Model value never =
    List (Option value never)



----------
-- MSGS
----------


type Msg value
    = ChangedValue value Bool
    | Noop



----------
-- UPDATE
----------


update : Msg value -> Model value never -> Model value never
update msg model =
    case msg of
        ChangedValue changedValued newSelected ->
            List.map
                (\option ->
                    if option.value /= changedValued then
                        option

                    else
                        { option | selected = newSelected }
                )
                model

        Noop ->
            model



-------------
-- Creators
-------------


allStacks : Model Cards.CardStack never
allStacks =
    [ { value = Cards.CityStack, selected = False, icon = Icon.icon ( Icon.City, Icon.Standard ) }
    , { value = Cards.AgendaStack, selected = False, icon = Icon.icon ( Icon.AgendaCard, Icon.Standard ) }
    , { value = Cards.HavenStack, selected = False, icon = Icon.icon ( Icon.Haven, Icon.Standard ) }
    , { value = Cards.FactionStack, selected = False, icon = Icon.icon ( Icon.Faction, Icon.Standard ) }
    , { value = Cards.LibraryStack, selected = False, icon = Icon.icon ( Icon.Library, Icon.Standard ) }
    ]


playerStacks : Model Cards.CardStack never
playerStacks =
    [ { value = Cards.AgendaStack, selected = False, icon = Icon.icon ( Icon.AgendaCard, Icon.Standard ) }
    , { value = Cards.HavenStack, selected = False, icon = Icon.icon ( Icon.Haven, Icon.Standard ) }
    , { value = Cards.FactionStack, selected = False, icon = Icon.icon ( Icon.Faction, Icon.Standard ) }
    , { value = Cards.LibraryStack, selected = False, icon = Icon.icon ( Icon.Library, Icon.Standard ) }
    ]


primaryTraits : Model Trait never
primaryTraits =
    [ { value = Trait.Action, selected = False, icon = Icon.icon ( Icon.Action, Icon.Standard ) }
    , { value = Trait.UnhostedAction, selected = False, icon = Icon.icon ( Icon.UnhostedAction, Icon.Standard ) }
    , { value = Trait.Attack, selected = False, icon = Icon.icon ( Icon.Attack, Icon.Standard ) }
    , { value = Trait.Reaction, selected = False, icon = Icon.icon ( Icon.Reaction, Icon.Standard ) }
    , { value = Trait.InfluenceModifier, selected = False, icon = Icon.icon ( Icon.InfluenceModifier, Icon.Standard ) }
    ]


secondaryTraits : Model Trait never
secondaryTraits =
    [ { value = Trait.Ongoing, selected = False, icon = Icon.icon ( Icon.Ongoing, Icon.Standard ) }
    , { value = Trait.Scheme, selected = False, icon = Icon.icon ( Icon.Scheme, Icon.Standard ) }
    , { value = Trait.Title, selected = False, icon = Icon.icon ( Icon.Title, Icon.Standard ) }
    , { value = Trait.Conspiracy, selected = False, icon = Icon.icon ( Icon.Conspiracy, Icon.Standard ) }
    , { value = Trait.Alchemy, selected = False, icon = Icon.icon ( Icon.Alchemy, Icon.Standard ) }
    , { value = Trait.Ritual, selected = False, icon = Icon.icon ( Icon.Ritual, Icon.Standard ) }
    , { value = Trait.Animal, selected = False, icon = Icon.icon ( Icon.Animal, Icon.Standard ) }
    , { value = Trait.Special, selected = False, icon = Icon.icon ( Icon.Special, Icon.Standard ) }
    ]


attackTypes : Model Cards.AttackType never
attackTypes =
    [ { value = Cards.Physical, selected = False, icon = Icon.icon ( Icon.Physical, Icon.Standard ) }
    , { value = Cards.Social, selected = False, icon = Icon.icon ( Icon.Social, Icon.Standard ) }
    , { value = Cards.Mental, selected = False, icon = Icon.icon ( Icon.Mental, Icon.Standard ) }
    , { value = Cards.Ranged, selected = False, icon = Icon.icon ( Icon.Ranged, Icon.Standard ) }
    ]


clans : Model Clan.Clan never
clans =
    Clan.all
        |> List.map
            (\clan ->
                { value = clan, selected = False, icon = IconV2.clan IconV2.Standard clan }
            )


disciplines : Model Discipline never
disciplines =
    Discipline.all
        |> List.map
            (\discipline ->
                { value = discipline, selected = False, icon = IconV2.discipline IconV2.Standard discipline }
            )



---------
-- VIEW
---------


view : List (Option value never) -> Html (Msg value)
view options =
    div [ class "filterpicker" ]
        (List.map viewFilterOption options)


viewFilterOption : Option value never -> Html (Msg value)
viewFilterOption option =
    label
        [ class "filterpicker__option"
        , classList [ ( "filterpicker__option--active", option.selected ) ]
        ]
        [ div
            [ class "filterpicker__box"
            , classList [ ( "filterpicker__box--active", option.selected ) ]
            ]
            [ Html.map (always Noop) option.icon ]
        , input
            [ class "filterpicker__checkbox"
            , type_ "checkbox"
            , onCheck (ChangedValue option.value)
            ]
            []
        ]



------------------
-- Filter helper
------------------


isAllowedWide : (Card -> List value) -> Model value never -> Card -> Bool
isAllowedWide toValues model card =
    case extractWhitelist model of
        [] ->
            True

        whitelist ->
            List.any (contains whitelist) (toValues card)


isAllowedStrict : (Card -> List value) -> Model value never -> Card -> Bool
isAllowedStrict toValues model card =
    case extractWhitelist model of
        [] ->
            True

        whitelist ->
            List.all (contains <| toValues card) whitelist


extractWhitelist : Model value never -> List value
extractWhitelist model =
    List.filterMap
        (\{ value, selected } ->
            if selected then
                Just value

            else
                Nothing
        )
        model


contains : List a -> a -> Bool
contains xs x =
    List.member x xs
