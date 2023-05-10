module UI.FilterSelection exposing
    ( AllStacks
    , AttackTypes
    , Cities
    , Clans
    , Disciplines
    , Msg
    , PlayerStacks
    , PrimaryTraits
    , SecondaryTraits
    , allStackIsAllowedWide
    , attackTypeIsAllowedStrict
    , attackTypeIsAllowedWide
    , cityIsAllowedWide
    , clanIsAllowedStrict
    , clanIsAllowedWide
    , cleanAllStacks
    , cleanAttackTypes
    , cleanCities
    , cleanClans
    , cleanDisciplines
    , cleanPlayerStacks
    , cleanPrimaryTraits
    , cleanSecondaryTraits
    , disciplineIsAllowedStrict
    , disciplineIsAllowedWide
    , playerStackIsAllowedStrict
    , playerStackIsAllowedWide
    , primaryTraitsIsAllowedStrict
    , primaryTraitsIsAllowedWide
    , secondaryTraitsIsAllowedStrict
    , secondaryTraitsIsAllowedWide
    , update
    , viewAllStacks
    , viewAttackTypes
    , viewCities
    , viewClans
    , viewDisciplines
    , viewPlayerStacks
    , viewPrimaryTraits
    , viewSecondaryTraits
    )

import Cards as C
import Data.Clan as Cl
import Data.Discipline as Dis
import Data.Pack as Pack
import Html exposing (Html, div, input, label)
import Html.Attributes exposing (class, classList, type_)
import Html.Events exposing (onCheck)
import UI.Icon as Icon
import UI.Icon.V2 as IconV2



-----------
-- STACKS
-----------


type alias PlayerStacks =
    { agenda : Bool, haven : Bool, faction : Bool, library : Bool }


cleanPlayerStacks : PlayerStacks
cleanPlayerStacks =
    { agenda = False, haven = False, faction = False, library = False }


type alias AllStacks =
    { city : Bool, agenda : Bool, haven : Bool, faction : Bool, library : Bool }


cleanAllStacks : AllStacks
cleanAllStacks =
    { city = False, agenda = False, haven = False, faction = False, library = False }


viewPlayerStacks : PlayerStacks -> Html (Msg PlayerStacks)
viewPlayerStacks flags =
    div [ class "filterpicker" ]
        [ viewFlag (Icon.icon ( Icon.AgendaCard, Icon.Standard )) (\old -> { old | agenda = not old.agenda }) flags.agenda
        , viewFlag (Icon.icon ( Icon.Haven, Icon.Standard )) (\old -> { old | haven = not old.haven }) flags.haven
        , viewFlag (Icon.icon ( Icon.Faction, Icon.Standard )) (\old -> { old | faction = not old.faction }) flags.faction
        , viewFlag (Icon.icon ( Icon.Library, Icon.Standard )) (\old -> { old | library = not old.library }) flags.library
        ]


viewAllStacks : AllStacks -> Html (Msg AllStacks)
viewAllStacks flags =
    div [ class "filterpicker" ]
        [ viewFlag (Icon.icon ( Icon.City, Icon.Standard )) (\old -> { old | city = not old.city }) flags.city
        , viewFlag (Icon.icon ( Icon.AgendaCard, Icon.Standard )) (\old -> { old | agenda = not old.agenda }) flags.agenda
        , viewFlag (Icon.icon ( Icon.Haven, Icon.Standard )) (\old -> { old | haven = not old.haven }) flags.haven
        , viewFlag (Icon.icon ( Icon.Faction, Icon.Standard )) (\old -> { old | faction = not old.faction }) flags.faction
        , viewFlag (Icon.icon ( Icon.Library, Icon.Standard )) (\old -> { old | library = not old.library }) flags.library
        ]


allStackIsAllowedWide : AllStacks -> C.Card -> Bool
allStackIsAllowedWide flags card =
    if flags == cleanAllStacks then
        True

    else
        case ( flags, card ) of
            ( { agenda }, C.AgendaCard _ ) ->
                agenda

            ( { haven }, C.HavenCard _ ) ->
                haven

            ( { faction }, C.FactionCard _ ) ->
                faction

            ( { library }, C.LibraryCard _ ) ->
                library

            ( { city }, C.CityCard _ ) ->
                city


playerStackIsAllowed : PlayerStacks -> C.Card -> Bool
playerStackIsAllowed flags card =
    if flags == cleanPlayerStacks then
        True

    else
        case ( flags, card ) of
            ( { agenda }, C.AgendaCard _ ) ->
                agenda

            ( { haven }, C.HavenCard _ ) ->
                haven

            ( { faction }, C.FactionCard _ ) ->
                faction

            ( { library }, C.LibraryCard _ ) ->
                library

            ( _, C.CityCard _ ) ->
                False


playerStackIsAllowedWide : PlayerStacks -> C.Card -> Bool
playerStackIsAllowedWide =
    playerStackIsAllowed


playerStackIsAllowedStrict : PlayerStacks -> C.Card -> Bool
playerStackIsAllowedStrict =
    playerStackIsAllowed



------------------
-- PRIMARY TRAIT
------------------


type alias PrimaryTraits =
    { action : Bool
    , unhostedAction : Bool
    , attack : Bool
    , reaction : Bool
    , influenceModifier : Bool
    }


cleanPrimaryTraits : PrimaryTraits
cleanPrimaryTraits =
    { action = False
    , unhostedAction = False
    , attack = False
    , reaction = False
    , influenceModifier = False
    }


viewPrimaryTraits : PrimaryTraits -> Html (Msg PrimaryTraits)
viewPrimaryTraits flags =
    div [ class "filterpicker" ]
        [ viewFlag (Icon.icon ( Icon.Action, Icon.Standard )) (\old -> { old | action = not old.action }) flags.action
        , viewFlag (Icon.icon ( Icon.UnhostedAction, Icon.Standard )) (\old -> { old | unhostedAction = not old.unhostedAction }) flags.unhostedAction
        , viewFlag (Icon.icon ( Icon.Attack, Icon.Standard )) (\old -> { old | attack = not old.attack }) flags.attack
        , viewFlag (Icon.icon ( Icon.Reaction, Icon.Standard )) (\old -> { old | reaction = not old.reaction }) flags.reaction
        , viewFlag (Icon.icon ( Icon.InfluenceModifier, Icon.Standard )) (\old -> { old | influenceModifier = not old.influenceModifier }) flags.influenceModifier
        ]


primaryTraitsIsAllowedWide : PrimaryTraits -> C.Card -> Bool
primaryTraitsIsAllowedWide flags card =
    if flags == cleanPrimaryTraits then
        True

    else
        case card of
            C.LibraryCard { traits } ->
                (traits.action && flags.action)
                    || (traits.unhostedAction && flags.unhostedAction)
                    || (traits.attack && flags.attack)
                    || (traits.reaction && flags.reaction)
                    || (traits.influenceModifier && flags.influenceModifier)

            _ ->
                False


primaryTraitsIsAllowedStrict : PrimaryTraits -> C.Card -> Bool
primaryTraitsIsAllowedStrict flags card =
    if flags == cleanPrimaryTraits then
        True

    else
        case card of
            C.LibraryCard { traits } ->
                (traits.action == flags.action)
                    && (traits.unhostedAction == flags.unhostedAction)
                    && (traits.attack == flags.attack)
                    && (traits.reaction == flags.reaction)
                    && (traits.influenceModifier == flags.influenceModifier)

            _ ->
                False



------------------
-- SECONDARY TRAIT
------------------


type alias SecondaryTraits =
    { alchemy : Bool
    , animal : Bool
    , conspiracy : Bool
    , ongoing : Bool
    , ritual : Bool
    , scheme : Bool
    , special : Bool
    , title : Bool
    , trap : Bool
    , ghoul : Bool
    }


cleanSecondaryTraits : SecondaryTraits
cleanSecondaryTraits =
    { alchemy = False
    , animal = False
    , conspiracy = False
    , ongoing = False
    , ritual = False
    , scheme = False
    , special = False
    , title = False
    , trap = False
    , ghoul = False
    }


viewSecondaryTraits : SecondaryTraits -> Html (Msg SecondaryTraits)
viewSecondaryTraits flags =
    div [ class "filterpicker" ]
        [ viewFlag (Icon.icon ( Icon.Alchemy, Icon.Standard )) (\old -> { old | alchemy = not old.alchemy }) flags.alchemy
        , viewFlag (Icon.icon ( Icon.Animal, Icon.Standard )) (\old -> { old | animal = not old.animal }) flags.animal
        , viewFlag (Icon.icon ( Icon.Conspiracy, Icon.Standard )) (\old -> { old | conspiracy = not old.conspiracy }) flags.conspiracy
        , viewFlag (Icon.icon ( Icon.Ongoing, Icon.Standard )) (\old -> { old | ongoing = not old.ongoing }) flags.ongoing
        , viewFlag (Icon.icon ( Icon.Ritual, Icon.Standard )) (\old -> { old | ritual = not old.ritual }) flags.ritual
        , viewFlag (Icon.icon ( Icon.Scheme, Icon.Standard )) (\old -> { old | scheme = not old.scheme }) flags.scheme
        , viewFlag (Icon.icon ( Icon.Special, Icon.Standard )) (\old -> { old | special = not old.special }) flags.special
        , viewFlag (Icon.icon ( Icon.Title, Icon.Standard )) (\old -> { old | title = not old.title }) flags.title
        , viewFlag (Icon.icon ( Icon.Trap, Icon.Standard )) (\old -> { old | trap = not old.trap }) flags.trap
        , viewFlag (Icon.icon ( Icon.Ghoul, Icon.Standard )) (\old -> { old | ghoul = not old.ghoul }) flags.ghoul
        ]


secondaryTraitsIsAllowedWide : SecondaryTraits -> C.Card -> Bool
secondaryTraitsIsAllowedWide flags card =
    if flags == cleanSecondaryTraits then
        True

    else
        case card of
            C.LibraryCard { traits } ->
                (traits.alchemy && flags.alchemy)
                    || (traits.animal && flags.animal)
                    || (traits.conspiracy && flags.conspiracy)
                    || (traits.ongoing && flags.ongoing)
                    || (traits.ritual && flags.ritual)
                    || (traits.scheme && flags.scheme)
                    || (traits.special && flags.special)
                    || (traits.title && flags.title)
                    || (traits.trap && flags.trap)
                    || (traits.ghoul && flags.ghoul)

            _ ->
                False


secondaryTraitsIsAllowedStrict : SecondaryTraits -> C.Card -> Bool
secondaryTraitsIsAllowedStrict flags card =
    if flags == cleanSecondaryTraits then
        True

    else
        case card of
            C.LibraryCard { traits } ->
                (traits.alchemy == flags.alchemy)
                    && (traits.animal == flags.animal)
                    && (traits.conspiracy == flags.conspiracy)
                    && (traits.ongoing == flags.ongoing)
                    && (traits.ritual == flags.ritual)
                    && (traits.scheme == flags.scheme)
                    && (traits.special == flags.special)
                    && (traits.title == flags.title)
                    && (traits.trap == flags.trap)
                    && (traits.ghoul == flags.ghoul)

            _ ->
                False



------------------
-- ATTACK TYPES
------------------


type alias AttackTypes =
    { physical : Bool
    , social : Bool
    , mental : Bool
    , ranged : Bool
    }


cleanAttackTypes : AttackTypes
cleanAttackTypes =
    { physical = False
    , social = False
    , mental = False
    , ranged = False
    }


viewAttackTypes : AttackTypes -> Html (Msg AttackTypes)
viewAttackTypes flags =
    div [ class "filterpicker" ]
        [ viewFlag (Icon.icon ( Icon.Physical, Icon.Standard )) (\old -> { old | physical = not old.physical }) flags.physical
        , viewFlag (Icon.icon ( Icon.Social, Icon.Standard )) (\old -> { old | social = not old.social }) flags.social
        , viewFlag (Icon.icon ( Icon.Mental, Icon.Standard )) (\old -> { old | mental = not old.mental }) flags.mental
        , viewFlag (Icon.icon ( Icon.Ranged, Icon.Standard )) (\old -> { old | ranged = not old.ranged }) flags.ranged
        ]


attackTypeIsAllowedWide : AttackTypes -> C.Card -> Bool
attackTypeIsAllowedWide flags card =
    if flags == cleanAttackTypes then
        True

    else
        case card of
            C.LibraryCard { attackType } ->
                List.any
                    (\t ->
                        (t == C.Physical && flags.physical)
                            || (t == C.Mental && flags.mental)
                            || (t == C.Social && flags.social)
                            || (t == C.Ranged && flags.ranged)
                    )
                    attackType

            _ ->
                False


attackTypeIsAllowedStrict : AttackTypes -> C.Card -> Bool
attackTypeIsAllowedStrict flags card =
    if flags == cleanAttackTypes then
        True

    else
        case card of
            C.LibraryCard { attackType } ->
                (flags.physical == List.member C.Physical attackType)
                    || (flags.social == List.member C.Social attackType)
                    || (flags.mental == List.member C.Mental attackType)
                    || (flags.ranged == List.member C.Ranged attackType)

            _ ->
                False



------------------
-- CLANS
------------------


type alias Clans =
    { banuHaqim : Bool
    , brujah : Bool
    , gangrel : Bool
    , hecata : Bool
    , lasombra : Bool
    , malkavian : Bool
    , nosferatu : Bool
    , ravnos : Bool
    , salubri : Bool
    , thinBlood : Bool
    , toreador : Bool
    , tremere : Bool
    , tzimisce : Bool
    , ventrue : Bool
    }


cleanClans : Clans
cleanClans =
    { banuHaqim = False
    , brujah = False
    , gangrel = False
    , hecata = False
    , lasombra = False
    , malkavian = False
    , nosferatu = False
    , ravnos = False
    , salubri = False
    , thinBlood = False
    , toreador = False
    , tremere = False
    , tzimisce = False
    , ventrue = False
    }


viewClans : Clans -> Html (Msg Clans)
viewClans flags =
    div [ class "filterpicker" ]
        [ viewFlag (IconV2.clan IconV2.Standard Cl.BanuHaqim) (\old -> { old | banuHaqim = not old.banuHaqim }) flags.banuHaqim
        , viewFlag (IconV2.clan IconV2.Standard Cl.Brujah) (\old -> { old | brujah = not old.brujah }) flags.brujah
        , viewFlag (IconV2.clan IconV2.Standard Cl.Gangrel) (\old -> { old | gangrel = not old.gangrel }) flags.gangrel
        , viewFlag (IconV2.clan IconV2.Standard Cl.Hecata) (\old -> { old | hecata = not old.hecata }) flags.hecata
        , viewFlag (IconV2.clan IconV2.Standard Cl.Lasombra) (\old -> { old | lasombra = not old.lasombra }) flags.lasombra
        , viewFlag (IconV2.clan IconV2.Standard Cl.Malkavian) (\old -> { old | malkavian = not old.malkavian }) flags.malkavian
        , viewFlag (IconV2.clan IconV2.Standard Cl.Nosferatu) (\old -> { old | nosferatu = not old.nosferatu }) flags.nosferatu
        , viewFlag (IconV2.clan IconV2.Standard Cl.Ravnos) (\old -> { old | ravnos = not old.ravnos }) flags.ravnos
        , viewFlag (IconV2.clan IconV2.Standard Cl.Salubri) (\old -> { old | salubri = not old.salubri }) flags.salubri
        , viewFlag (IconV2.clan IconV2.Standard Cl.ThinBlood) (\old -> { old | thinBlood = not old.thinBlood }) flags.thinBlood
        , viewFlag (IconV2.clan IconV2.Standard Cl.Toreador) (\old -> { old | toreador = not old.toreador }) flags.toreador
        , viewFlag (IconV2.clan IconV2.Standard Cl.Tremere) (\old -> { old | tremere = not old.tremere }) flags.tremere
        , viewFlag (IconV2.clan IconV2.Standard Cl.Tzimisce) (\old -> { old | tzimisce = not old.tzimisce }) flags.tzimisce
        , viewFlag (IconV2.clan IconV2.Standard Cl.Ventrue) (\old -> { old | ventrue = not old.ventrue }) flags.ventrue
        ]


clanIsAllowed : Clans -> C.Card -> Bool
clanIsAllowed flags card =
    let
        matchClan clan =
            (clan == Cl.BanuHaqim && flags.banuHaqim)
                || (clan == Cl.Brujah && flags.brujah)
                || (clan == Cl.Gangrel && flags.gangrel)
                || (clan == Cl.Hecata && flags.hecata)
                || (clan == Cl.Lasombra && flags.lasombra)
                || (clan == Cl.Malkavian && flags.malkavian)
                || (clan == Cl.Nosferatu && flags.nosferatu)
                || (clan == Cl.Ravnos && flags.ravnos)
                || (clan == Cl.Salubri && flags.salubri)
                || (clan == Cl.ThinBlood && flags.thinBlood)
                || (clan == Cl.Toreador && flags.toreador)
                || (clan == Cl.Tremere && flags.tremere)
                || (clan == Cl.Tzimisce && flags.tzimisce)
                || (clan == Cl.Ventrue && flags.ventrue)
    in
    if flags == cleanClans then
        True

    else
        case card of
            C.FactionCard { clan } ->
                matchClan clan

            C.LibraryCard { clan } ->
                Maybe.map matchClan clan |> Maybe.withDefault False

            _ ->
                False


clanIsAllowedWide : Clans -> C.Card -> Bool
clanIsAllowedWide =
    clanIsAllowed


clanIsAllowedStrict : Clans -> C.Card -> Bool
clanIsAllowedStrict =
    clanIsAllowed



------------------
-- DISCIPLINES
------------------


type alias Disciplines =
    { animalism : Bool
    , auspex : Bool
    , bloodSorcery : Bool
    , celerity : Bool
    , dominate : Bool
    , fortitude : Bool
    , obfuscate : Bool
    , oblivion : Bool
    , potence : Bool
    , presence : Bool
    , protean : Bool
    , thinBloodAlchemy : Bool
    }


cleanDisciplines : Disciplines
cleanDisciplines =
    { animalism = False
    , auspex = False
    , bloodSorcery = False
    , celerity = False
    , dominate = False
    , fortitude = False
    , obfuscate = False
    , oblivion = False
    , potence = False
    , presence = False
    , protean = False
    , thinBloodAlchemy = False
    }


viewDisciplines : Disciplines -> Html (Msg Disciplines)
viewDisciplines flags =
    div [ class "filterpicker" ]
        [ viewFlag (IconV2.discipline IconV2.Standard Dis.Animalism) (\old -> { old | animalism = not old.animalism }) flags.animalism
        , viewFlag (IconV2.discipline IconV2.Standard Dis.Auspex) (\old -> { old | auspex = not old.auspex }) flags.auspex
        , viewFlag (IconV2.discipline IconV2.Standard Dis.BloodSorcery) (\old -> { old | bloodSorcery = not old.bloodSorcery }) flags.bloodSorcery
        , viewFlag (IconV2.discipline IconV2.Standard Dis.Celerity) (\old -> { old | celerity = not old.celerity }) flags.celerity
        , viewFlag (IconV2.discipline IconV2.Standard Dis.Dominate) (\old -> { old | dominate = not old.dominate }) flags.dominate
        , viewFlag (IconV2.discipline IconV2.Standard Dis.Fortitude) (\old -> { old | fortitude = not old.fortitude }) flags.fortitude
        , viewFlag (IconV2.discipline IconV2.Standard Dis.Obfuscate) (\old -> { old | obfuscate = not old.obfuscate }) flags.obfuscate
        , viewFlag (IconV2.discipline IconV2.Standard Dis.Oblivion) (\old -> { old | oblivion = not old.oblivion }) flags.oblivion
        , viewFlag (IconV2.discipline IconV2.Standard Dis.Potence) (\old -> { old | potence = not old.potence }) flags.potence
        , viewFlag (IconV2.discipline IconV2.Standard Dis.Presence) (\old -> { old | presence = not old.presence }) flags.presence
        , viewFlag (IconV2.discipline IconV2.Standard Dis.Protean) (\old -> { old | protean = not old.protean }) flags.protean
        , viewFlag (IconV2.discipline IconV2.Standard Dis.ThinBloodAlchemy) (\old -> { old | thinBloodAlchemy = not old.thinBloodAlchemy }) flags.thinBloodAlchemy
        ]


disciplineIsAllowedWide : Disciplines -> C.Card -> Bool
disciplineIsAllowedWide flags card =
    let
        matchDiscipline =
            List.any
                (\dis ->
                    (dis == Dis.Animalism && flags.animalism)
                        || (dis == Dis.Auspex && flags.auspex)
                        || (dis == Dis.BloodSorcery && flags.bloodSorcery)
                        || (dis == Dis.Celerity && flags.celerity)
                        || (dis == Dis.Dominate && flags.dominate)
                        || (dis == Dis.Fortitude && flags.fortitude)
                        || (dis == Dis.Obfuscate && flags.obfuscate)
                        || (dis == Dis.Oblivion && flags.oblivion)
                        || (dis == Dis.Potence && flags.potence)
                        || (dis == Dis.Presence && flags.presence)
                        || (dis == Dis.Protean && flags.protean)
                        || (dis == Dis.ThinBloodAlchemy && flags.thinBloodAlchemy)
                )
    in
    if flags == cleanDisciplines then
        True

    else
        case card of
            C.FactionCard { disciplines } ->
                matchDiscipline disciplines

            C.LibraryCard { disciplines } ->
                matchDiscipline disciplines

            _ ->
                False


disciplineIsAllowedStrict : Disciplines -> C.Card -> Bool
disciplineIsAllowedStrict flags card =
    let
        matchDiscipline disciplines =
            (List.member Dis.Animalism disciplines == flags.animalism)
                && (List.member Dis.Auspex disciplines == flags.auspex)
                && (List.member Dis.BloodSorcery disciplines == flags.bloodSorcery)
                && (List.member Dis.Celerity disciplines == flags.celerity)
                && (List.member Dis.Dominate disciplines == flags.dominate)
                && (List.member Dis.Fortitude disciplines == flags.fortitude)
                && (List.member Dis.Obfuscate disciplines == flags.obfuscate)
                && (List.member Dis.Oblivion disciplines == flags.oblivion)
                && (List.member Dis.Potence disciplines == flags.potence)
                && (List.member Dis.Presence disciplines == flags.presence)
                && (List.member Dis.Protean disciplines == flags.protean)
                && (List.member Dis.ThinBloodAlchemy disciplines == flags.thinBloodAlchemy)
    in
    if flags == cleanDisciplines then
        True

    else
        case card of
            C.FactionCard { disciplines } ->
                matchDiscipline disciplines

            C.LibraryCard { disciplines } ->
                matchDiscipline disciplines

            _ ->
                False



------------------
-- CITY
------------------


type alias Cities =
    { core : Bool
    , heartOfEurope : Bool
    , conclave22 : Bool
    }


cleanCities : Cities
cleanCities =
    { core = False
    , heartOfEurope = False
    , conclave22 = False
    }


viewCities : Cities -> Html (Msg Cities)
viewCities flags =
    div [ class "filterpicker" ]
        [ viewFlag (Icon.icon ( Icon.CityCore, Icon.Standard )) (\old -> { old | core = not old.core }) flags.core
        , viewFlag (Icon.icon ( Icon.CityHoE, Icon.Standard )) (\old -> { old | heartOfEurope = not old.heartOfEurope }) flags.heartOfEurope
        , viewFlag (Icon.icon ( Icon.CityConclave, Icon.Standard )) (\old -> { old | conclave22 = not old.conclave22 }) flags.conclave22
        ]


cityIsAllowedWide : Cities -> C.Card -> Bool
cityIsAllowedWide flags card =
    if flags == cleanCities then
        True

    else
        case card of
            C.CityCard { set } ->
                case set of
                    Pack.Conclave22 ->
                        flags.conclave22

                    Pack.HeartOfEurope ->
                        flags.heartOfEurope

                    _ ->
                        flags.core

            _ ->
                True



------------------
-- UPDATE STRUCTURE
------------------


type Msg flags
    = Apply (flags -> flags)
    | Noop


update : Msg flags -> flags -> flags
update msg model =
    case msg of
        Apply transform ->
            transform model

        Noop ->
            model


viewFlag : Html never -> (t -> t) -> Bool -> Html (Msg t)
viewFlag icon transform selected =
    label
        [ class "filterpicker__option"
        , classList [ ( "filterpicker__option--active", selected ) ]
        ]
        [ div
            [ class "filterpicker__box"
            , classList [ ( "filterpicker__box--active", selected ) ]
            ]
            [ Html.map (always Noop) icon ]
        , input
            [ class "filterpicker__checkbox"
            , type_ "checkbox"
            , onCheck (always <| Apply transform)
            ]
            []
        ]
