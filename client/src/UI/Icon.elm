module UI.Icon exposing
    ( IconImage(..)
    , IconStyle(..)
    , attackType
    , icon
    , clanIcon
    , disciplineIcon)

import Cards
import Html exposing (Attribute, Html, span, text)
import Html.Attributes exposing (class, title)
import Data.Discipline as Dis
import Data.Clan as Cl



------
-- ICONS
------


type IconImage
    = Action
    | Agenda
    | AgendaCard
    | Alchemy
    | Animal
    | Attack
    | Blood
    | BloodPotencReq
    | BloodPotency
    | City
    | CityConclave
    | CityCore
    | CityHaH
    | CityHoE
    | ClanBanuHaqim
    | ClanBrujah
    | ClanCaitiff
    | ClanFaithful
    | ClanGangrel
    | ClanHecata
    | ClanInquisitive
    | ClanLasombra
    | ClanMalkavian
    | ClanNosferatu
    | ClanRavnos
    | ClanSalubri
    | ClanTheMinistry
    | ClanThinBlood
    | ClanToreador
    | ClanTremere
    | ClanTzimisce
    | ClanVentrue
    | Conspiracy
    | Damage
    | Delete
    | DisciplineAnimalism
    | DisciplineAuspex
    | DisciplineBeastWhisperer
    | DisciplineBloodSorcery
    | DisciplineCelerity
    | DisciplineDominate
    | DisciplineFortitude
    | DisciplineGlobal
    | DisciplineLibrary
    | DisciplineObfuscate
    | DisciplineOblivion
    | DisciplinePotence
    | DisciplinePresence
    | DisciplineProtean
    | DisciplineRepelTheUnnatural
    | DisciplineSenseTheUnnatural
    | DisciplineThinBloodAlchemy
    | DisciplineThwartTheUnnatural
    | Edit
    | Faction
    | Ghoul
    | HandOfCards
    | Haven
    | Influence
    | InfluenceModifier
    | Leader
    | Library
    | Mental
    | Menu
    | Monster
    | Ongoing
    | Physical
    | Ranged
    | Reaction
    | Relic
    | Ritual
    | Save
    | Scheme
    | Shield
    | Skull
    | Social
    | Special
    | Title
    | Trap
    | UnhostedAction

type IconStyle
    = Standard
    | Negative
    | Colored


type alias Icon =
    ( IconImage, IconStyle )



------
-- MATCHERS
------


attackType : Cards.AttackType -> Html msg
attackType a =
    case a of
        Cards.Mental ->
            icon ( Mental, Standard )

        Cards.Physical ->
            icon ( Physical, Standard )

        Cards.Ranged ->
            icon ( Ranged, Standard )

        Cards.Social ->
            icon ( Social, Standard )



------
-- HELPERS
------


icon : Icon -> Html msg
icon ( image, style ) =
    let
        ( imageClass, name ) =
            imageOpts image
    in
    span [ class "ui-icon", styleClass style, imageClass, title name ] [ span [] [ text name ] ]

clanIcon : IconStyle -> Cl.Clan -> Html msg
clanIcon style clan =
    case clan of
        Cl.BanuHaqim ->
            icon (ClanBanuHaqim, style)

        Cl.Brujah ->
            icon (ClanBrujah, style)

        Cl.Caitiff ->
            icon (ClanCaitiff, style)

        Cl.Faithful ->
            icon (ClanFaithful, style)

        Cl.Gangrel ->
            icon (ClanGangrel, style)

        Cl.Hecata ->
            icon (ClanHecata, style)

        Cl.Inquisitive ->
            icon (ClanInquisitive, style)

        Cl.Lasombra ->
            icon (ClanLasombra, style)

        Cl.Malkavian ->
            icon (ClanMalkavian, style)

        Cl.Ministry ->
            icon (ClanTheMinistry, style)

        Cl.Nosferatu ->
            icon (ClanNosferatu, style)

        Cl.Ravnos ->
            icon (ClanRavnos, style)

        Cl.Salubri ->
            icon (ClanSalubri, style)

        Cl.ThinBlood ->
            icon (ClanThinBlood, style)

        Cl.Toreador ->
            icon (ClanToreador, style)

        Cl.Tremere ->
            icon (ClanTremere, style)

        Cl.Tzimisce ->
            icon (ClanTzimisce, style)

        Cl.Ventrue ->
            icon (ClanVentrue, style)

disciplineIcon : IconStyle -> Dis.Discipline -> Html msg
disciplineIcon style discipline =
    case discipline of
        Dis.Animalism ->
            icon (DisciplineAnimalism, style)
        Dis.Auspex ->
            icon (DisciplineAuspex, style)

        Dis.BeastWhisperer ->
            icon (DisciplineBeastWhisperer, style)

        Dis.BloodSorcery ->
            icon (DisciplineBloodSorcery, style)

        Dis.Celerity ->
            icon (DisciplineCelerity, style)

        Dis.Dominate ->
            icon (DisciplineDominate, style)

        Dis.Fortitude ->
            icon (DisciplineFortitude, style)

        Dis.Global ->
            icon (DisciplineGlobal, style)

        Dis.Library ->
            icon (DisciplineLibrary, style)

        Dis.Obfuscate ->
            icon (DisciplineObfuscate, style)

        Dis.Oblivion ->
            icon (DisciplineOblivion, style)

        Dis.Potence ->
            icon (DisciplinePotence, style)

        Dis.Presence ->
            icon (DisciplinePresence, style)

        Dis.Protean ->
            icon (DisciplineProtean, style)

        Dis.RepelTheUnnatural ->
            icon (DisciplineRepelTheUnnatural, style)

        Dis.SenseTheUnnatural ->
            icon (DisciplineSenseTheUnnatural, style)

        Dis.ThwartTheUnnatural ->
            icon (DisciplineThwartTheUnnatural, style)

        Dis.ThinBloodAlchemy ->
            icon (DisciplineThinBloodAlchemy, style)

styleClass : IconStyle -> Attribute msg
styleClass style =
    case style of
        Standard ->
            class "ui-icon--standard"

        Colored ->
            class "ui-icon--colored"

        Negative ->
            class "ui-icon--negative"


imageOpts : IconImage -> ( Attribute msg, String )
imageOpts image =
    case image of
        Action ->
            ( class "ui-icon_action", "Action" )

        Agenda ->
            ( class "ui-icon_agenda", "Agenda" )

        AgendaCard ->
            ( class "ui-icon_crown", "Agenda" )

        Alchemy ->
            ( class "ui-icon_alchemy", "Alchemy" )

        Animal ->
            ( class "ui-icon_animal", "Animal" )

        Attack ->
            ( class "ui-icon_attack", "Attack" )

        Blood ->
            ( class "ui-icon_blood", "Blood" )

        BloodPotencReq ->
            ( class "ui-icon_bloodpotencyrequirement", "Blood Potency Requirement" )

        BloodPotency ->
            ( class "ui-icon_bloodpotency", "Blood Potency" )

        City ->
            ( class "ui-icon_city", "City" )

        CityConclave ->
            ( class "ui-icon_city-conclave", "City - Conclave" )

        CityCore ->
            ( class "ui-icon_city-core", "City - San Francisco" )

        CityHoE ->
            ( class "ui-icon_city-hoe", "City - Prague" )

        CityHaH ->
            ( class "ui-icon_city-hah", "City - Rio" )

        ClanBanuHaqim ->
            ( class "ui-icon_clan-banu-haqim", "Banu Haqim" )

        ClanBrujah ->
            ( class "ui-icon_clan-brujah", "Brujah" )

        ClanCaitiff ->
            ( class "ui-icon_clan-caitiff", "Caitiff" )

        ClanFaithful ->
            ( class "ui-icon_clan-faithful", "Faithful" )

        ClanGangrel ->
            ( class "ui-icon_clan-gangrel", "Gangrel" )

        ClanHecata ->
            ( class "ui-icon_clan-hecata", "Hecata" )

        ClanInquisitive ->
            ( class "ui-icon_clan-inquisitive", "Inquisitive" )

        ClanLasombra ->
            ( class "ui-icon_clan-lasombra", "Lasombra" )

        ClanMalkavian ->
            ( class "ui-icon_clan-malkavian", "Malkavian" )

        ClanNosferatu ->
            ( class "ui-icon_clan-nosferatu", "Nosferatu" )

        ClanRavnos ->
            ( class "ui-icon_clan-ravnos", "Ravnos" )

        ClanSalubri ->
            ( class "ui-icon_clan-salubri", "Salubri" )

        ClanTheMinistry ->
            ( class "ui-icon_clan-the-ministry", "The Ministry" )

        ClanThinBlood ->
            ( class "ui-icon_clan-thin-blood", "Thin-blood" )

        ClanToreador ->
            ( class "ui-icon_clan-toreador", "Toreador" )

        ClanTremere ->
            ( class "ui-icon_clan-tremere", "Tremere" )

        ClanTzimisce ->
            ( class "ui-icon_clan-tzimisce", "Tzimisce" )

        ClanVentrue ->
            ( class "ui-icon_clan-ventrue", "Ventrue" )

        Conspiracy ->
            ( class "ui-icon_conspiracy", "Conspiracy" )

        Damage ->
            ( class "ui-icon_damage", "Damage" )

        Delete ->
            ( class "ui-icon_delete", "Delete" )

        DisciplineAnimalism ->
            ( class "ui-icon_discipline-animalism", "Animalism" )

        DisciplineAuspex ->
            ( class "ui-icon_discipline-auspex", "Auspex" )

        DisciplineBeastWhisperer ->
            ( class "ui-icon_discipline-beast-whisperer", "Beast Whisperer" )

        DisciplineBloodSorcery ->
            ( class "ui-icon_discipline-blood-sorcery", "Blood Sorcery" )

        DisciplineCelerity ->
            ( class "ui-icon_discipline-celerity", "Celerity" )

        DisciplineDominate ->
            ( class "ui-icon_discipline-dominate", "Dominate" )

        DisciplineFortitude ->
            ( class "ui-icon_discipline-fortitude", "Fortitude" )

        DisciplineGlobal ->
            ( class "ui-icon_discipline-global", "Global" )

        DisciplineLibrary ->
            ( class "ui-icon_discipline-library", "Library" )

        DisciplineObfuscate ->
            ( class "ui-icon_discipline-obfuscate", "Obfuscate" )

        DisciplineOblivion ->
            ( class "ui-icon_discipline-oblivion", "Oblivion" )

        DisciplinePotence ->
            ( class "ui-icon_discipline-potence", "Potence" )

        DisciplinePresence ->
            ( class "ui-icon_discipline-presence", "Presence" )

        DisciplineProtean ->
            ( class "ui-icon_discipline-protean", "Protean" )

        DisciplineRepelTheUnnatural ->
            ( class "ui-icon_discipline-repel-the-unnatural", "Repel the Unnatural" )

        DisciplineSenseTheUnnatural ->
            ( class "ui-icon_discipline-sense-the-unnatural", "Sense the Unnatural" )

        DisciplineThinBloodAlchemy ->
            ( class "ui-icon_discipline-thin-blood-alchemy", "Thin-Blood Alchemy" )

        DisciplineThwartTheUnnatural ->
            ( class "ui-icon_discipline-thwart-the-unnatural", "Thwart the Unnatural" )

        Edit ->
            ( class "ui-icon_edit", "Edit" )

        Faction ->
            ( class "ui-icon_faction", "Faction" )

        HandOfCards ->
            ( class "ui-icon_hand_of_cards", "Draw Simulation" )

        Haven ->
            ( class "ui-icon_haven", "Haven" )

        Influence ->
            ( class "ui-icon_influence", "Influence" )

        InfluenceModifier ->
            ( class "ui-icon_influence_modifier", "Influence Modifier" )

        Leader ->
            ( class "ui-icon_leader", "Leader" )

        Library ->
            ( class "ui-icon_library", "Library" )

        Mental ->
            ( class "ui-icon_mental", "Mental" )

        Menu ->
            ( class "ui-icon_menu", "Menu" )

        Ongoing ->
            ( class "ui-icon_ongoing", "Ongoing" )

        Physical ->
            ( class "ui-icon_physical", "Physical" )

        Ranged ->
            ( class "ui-icon_ranged", "Ranged" )

        Reaction ->
            ( class "ui-icon_reaction", "Reaction" )

        Ritual ->
            ( class "ui-icon_ritual", "Ritual" )

        Save ->
            ( class "ui-icon_save", "Save" )

        Scheme ->
            ( class "ui-icon_scheme", "Scheme" )

        Shield ->
            ( class "ui-icon_shield", "Shield" )

        Skull ->
            ( class "ui-icon_skull", "Kindred Patron" )

        Social ->
            ( class "ui-icon_social", "Social" )

        Special ->
            ( class "ui-icon_special", "Special" )

        Title ->
            ( class "ui-icon_title", "Title" )

        Trap ->
            ( class "ui-icon_trap", "Trap" )

        Ghoul ->
            ( class "ui-icon_ghoul", "Ghoul" )

        Relic ->
            ( class "ui-icon_relic", "Relic" )

        UnhostedAction ->
            ( class "ui-icon_unhosted_action", "Unhosted Action" )

        Monster ->
            ( class "ui-icon_monster", "Monster" )

