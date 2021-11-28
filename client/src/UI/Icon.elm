module UI.Icon exposing
    ( IconImage(..)
    , IconStyle(..)
    , attackType
    , clan
    , discipline
    , icon
    )

import Cards
import Clan exposing (Clan)
import Html exposing (Attribute, Html, span, text)
import Html.Attributes exposing (class, title)



------
-- ICONS
------


type IconImage
    = Action
    | Agenda
    | AgendaCard
    | Alchemy
    | Animalism
    | Attack
    | Auspex
    | Blood
    | BloodPotencReq
    | BloodPotency
    | BloodSorcery
    | Brujah
    | Celerity
    | Conspiracy
    | Damage
    | Dominate
    | Edit
    | Faction
    | Fortitude
    | Gangrel
    | Haven
    | Influence
    | InfluenceModifier
    | Leader
    | Library
    | Malkavian
    | Mental
    | Nosferatu
    | Obfuscate
    | Ongoing
    | Physical
    | Potence
    | Presence
    | Protean
    | Ranged
    | Reaction
    | Ritual
    | Save
    | Scheme
    | Shield
    | Social
    | Special
    | Kindred
    | ThinBlood
    | ThinBloodAlchemy
    | Title
    | Toreador
    | Tremere
    | UnhostedAction
    | Ventrue


type IconStyle
    = Standard
    | Negative


type alias Icon =
    ( IconImage, IconStyle )



------
-- MATCHERS
------


clan : IconStyle -> Clan -> Html msg
clan style c =
    case c of
        Clan.Brujah ->
            icon ( Brujah, style )

        Clan.Gangrel ->
            icon ( Gangrel, style )

        Clan.Malkavian ->
            icon ( Malkavian, style )

        Clan.Nosferatu ->
            icon ( Nosferatu, style )

        Clan.ThinBlood ->
            icon ( ThinBlood, style )

        Clan.Toreador ->
            icon ( Toreador, style )

        Clan.Tremere ->
            icon ( Tremere, style )

        Clan.Ventrue ->
            icon ( Ventrue, style )

        Clan.All ->
            icon ( Kindred, style )


discipline : Cards.Discipline -> Html msg
discipline d =
    case d of
        Cards.Animalism ->
            icon ( Animalism, Standard )

        Cards.Auspex ->
            icon ( Auspex, Standard )

        Cards.BloodSorcery ->
            icon ( BloodSorcery, Standard )

        Cards.Celerity ->
            icon ( Celerity, Standard )

        Cards.Dominate ->
            icon ( Dominate, Standard )

        Cards.Fortitude ->
            icon ( Fortitude, Standard )

        Cards.Obfuscate ->
            icon ( Obfuscate, Standard )

        Cards.Potence ->
            icon ( Potence, Standard )

        Cards.Presence ->
            icon ( Presence, Standard )

        Cards.Protean ->
            icon ( Protean, Standard )

        Cards.ThinBloodAlchemy ->
            icon ( ThinBloodAlchemy, Standard )


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


styleClass : IconStyle -> Attribute msg
styleClass style =
    case style of
        Standard ->
            class "ui-icon--standard"

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

        Animalism ->
            ( class "ui-icon_animalism", "Animalism" )

        Attack ->
            ( class "ui-icon_attack", "Attack" )

        Auspex ->
            ( class "ui-icon_auspex", "Auspex" )

        Blood ->
            ( class "ui-icon_blood", "Blood" )

        BloodPotencReq ->
            ( class "ui-icon_bloodpotencyrequirement", "Blood Potency Requirement" )

        BloodPotency ->
            ( class "ui-icon_bloodpotency", "Blood Potency" )

        BloodSorcery ->
            ( class "ui-icon_blood_sorcery", "Blood Sorcery" )

        Brujah ->
            ( class "ui-icon_brujah", "Brujah" )

        Celerity ->
            ( class "ui-icon_celerity", "Celerity" )

        Conspiracy ->
            ( class "ui-icon_conspiracy", "Conspiracy" )

        Damage ->
            ( class "ui-icon_damage", "Damage" )

        Dominate ->
            ( class "ui-icon_dominate", "Dominate" )

        Edit ->
            ( class "ui-icon_edit", "Edit" )

        Faction ->
            ( class "ui-icon_faction", "Faction" )

        Fortitude ->
            ( class "ui-icon_fortitude", "Fortitude" )

        Gangrel ->
            ( class "ui-icon_gangrel", "Gangrel" )

        Haven ->
            ( class "ui-icon_haven", "Haven" )

        Influence ->
            ( class "ui-icon_influence", "Influence" )

        InfluenceModifier ->
            ( class "ui-icon_influence_modifier", "Influence Modifier" )

        Kindred ->
            ( class "ui-icon_skull", "All Kindred" )

        Leader ->
            ( class "ui-icon_leader", "Leader" )

        Library ->
            ( class "ui-icon_library", "Library" )

        Malkavian ->
            ( class "ui-icon_malkavian", "Malkavian" )

        Mental ->
            ( class "ui-icon_mental", "Mental" )

        Nosferatu ->
            ( class "ui-icon_nosferatu", "Nosferatu" )

        Obfuscate ->
            ( class "ui-icon_obsfuscate", "Obfuscate" )

        Ongoing ->
            ( class "ui-icon_ongoing", "Ongoing" )

        Physical ->
            ( class "ui-icon_physical", "Physical" )

        Potence ->
            ( class "ui-icon_potence", "Potence" )

        Presence ->
            ( class "ui-icon_presence", "Presence" )

        Protean ->
            ( class "ui-icon_protean", "Protean" )

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

        Social ->
            ( class "ui-icon_social", "Social" )

        Special ->
            ( class "ui-icon_special", "Special" )

        ThinBlood ->
            ( class "ui-icon_thinblood", "Thin Blood" )

        ThinBloodAlchemy ->
            ( class "ui-icon_thin_blood_alchemy", "Thin-blood Alchemy" )

        Title ->
            ( class "ui-icon_title", "Title" )

        Toreador ->
            ( class "ui-icon_toreador", "Toreador" )

        Tremere ->
            ( class "ui-icon_tremere", "Tremere" )

        UnhostedAction ->
            ( class "ui-icon_unhosted_action", "Unhosted Action" )

        Ventrue ->
            ( class "ui-icon_ventrue", "Ventrue" )
