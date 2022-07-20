module UI.FilterSelection exposing
    ( City
    , Model
    , Msg
    , PrimaryTrait
    , SecondaryTrait
    , allStacks
    , attackTypes
    , city
    , clans
    , disciplines
    , isAllowedStrict
    , isAllowedWide
    , isCityEnabled
    , pickCity
    , pickPrimaryTraits
    , pickSecondaryTraits
    , playerStacks
    , primaryTraits
    , secondaryTraits
    , update
    , view
    )

import Cards exposing (Card)
import Data.Clan as Clan
import Data.Discipline as Discipline exposing (Discipline)
import Data.Pack as Pack
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


isCityEnabled : Model Cards.CardStack never -> Bool
isCityEnabled model =
    case extractWhitelist model of
        [] ->
            True

        stacks ->
            List.member Cards.CityStack stacks


type City
    = Core
    | HeartOfEurope
    | Conclave22


pickCity : Card -> List City
pickCity c =
    case c of
        Cards.CityCard { traits, set } ->
            if traits.event then
                case set of
                    Pack.Conclave22 ->
                        [ Conclave22 ]

                    Pack.HeartOfEurope ->
                        [ HeartOfEurope ]

                    _ ->
                        [ Core ]

            else
                [ Core, HeartOfEurope, Conclave22 ]

        _ ->
            [ Core, HeartOfEurope, Conclave22 ]


city : Model City never
city =
    [ { value = Core, selected = False, icon = Icon.icon ( Icon.CityCore, Icon.Standard ) }
    , { value = HeartOfEurope, selected = False, icon = Icon.icon ( Icon.CityHoE, Icon.Standard ) }
    , { value = Conclave22, selected = False, icon = Icon.icon ( Icon.CityConclave, Icon.Standard ) }
    ]


type PrimaryTrait
    = Action
    | Attack
    | InfluenceModifier
    | Reaction
    | UnhostedAction


pickPrimaryTraits : Card -> List PrimaryTrait
pickPrimaryTraits c =
    case c of
        Cards.LibraryCard { traits } ->
            [ ( traits.action, Action )
            , ( traits.attack, Attack )
            , ( traits.influenceModifier, InfluenceModifier )
            , ( traits.reaction, Reaction )
            , ( traits.unhostedAction, UnhostedAction )
            ]
                |> List.filterMap
                    (\( b, v ) ->
                        if b then
                            Just v

                        else
                            Nothing
                    )

        _ ->
            []


primaryTraits : Model PrimaryTrait never
primaryTraits =
    [ { value = Action, selected = False, icon = Icon.icon ( Icon.Action, Icon.Standard ) }
    , { value = UnhostedAction, selected = False, icon = Icon.icon ( Icon.UnhostedAction, Icon.Standard ) }
    , { value = Attack, selected = False, icon = Icon.icon ( Icon.Attack, Icon.Standard ) }
    , { value = Reaction, selected = False, icon = Icon.icon ( Icon.Reaction, Icon.Standard ) }
    , { value = InfluenceModifier, selected = False, icon = Icon.icon ( Icon.InfluenceModifier, Icon.Standard ) }
    ]


type SecondaryTrait
    = Alchemy
    | Animal
    | Conspiracy
    | Ongoing
    | Ritual
    | Scheme
    | Special
    | Title


pickSecondaryTraits : Card -> List SecondaryTrait
pickSecondaryTraits c =
    case c of
        Cards.LibraryCard { traits } ->
            [ ( traits.alchemy, Alchemy )
            , ( traits.animal, Animal )
            , ( traits.conspiracy, Conspiracy )
            , ( traits.ongoing, Ongoing )
            , ( traits.ritual, Ritual )
            , ( traits.scheme, Scheme )
            , ( traits.special, Special )
            , ( traits.title, Title )
            ]
                |> List.filterMap
                    (\( b, v ) ->
                        if b then
                            Just v

                        else
                            Nothing
                    )

        Cards.CityCard { traits } ->
            [ ( traits.ongoing, Ongoing )
            , ( traits.title, Title )
            ]
                |> List.filterMap
                    (\( b, v ) ->
                        if b then
                            Just v

                        else
                            Nothing
                    )

        _ ->
            []


secondaryTraits : Model SecondaryTrait never
secondaryTraits =
    [ { value = Ongoing, selected = False, icon = Icon.icon ( Icon.Ongoing, Icon.Standard ) }
    , { value = Scheme, selected = False, icon = Icon.icon ( Icon.Scheme, Icon.Standard ) }
    , { value = Title, selected = False, icon = Icon.icon ( Icon.Title, Icon.Standard ) }
    , { value = Conspiracy, selected = False, icon = Icon.icon ( Icon.Conspiracy, Icon.Standard ) }
    , { value = Alchemy, selected = False, icon = Icon.icon ( Icon.Alchemy, Icon.Standard ) }
    , { value = Ritual, selected = False, icon = Icon.icon ( Icon.Ritual, Icon.Standard ) }
    , { value = Animal, selected = False, icon = Icon.icon ( Icon.Animal, Icon.Standard ) }
    , { value = Special, selected = False, icon = Icon.icon ( Icon.Special, Icon.Standard ) }
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
