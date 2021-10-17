module UI.Icon exposing
    ( IconImage(..)
    , IconStyle(..)
    , attackType
    , clan
    , discipline
    , icon
    )

import Cards
import Html exposing (Attribute, Html, span, text)
import Html.Attributes exposing (class, title)



------
-- ICONS
------


type IconImage
    = Action
    | Agenda
    | AgendaCard
    | Animalism
    | Attack
    | Auspex
    | Blood
    | BloodPotencReq
    | BloodPotency
    | BloodSorcery
    | Brujah
    | Celerity
    | Damage
    | Dominate
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
    | Physical
    | Potence
    | Presence
    | Protean
    | Ranged
    | Reaction
    | Save
    | Shield
    | Social
    | ThinBlood
    | ThinBloodAlchemy
    | Toreador
    | Tremere
    | UnhostedAction
    | Ventrue


type IconStyle
    = Standard


type alias Icon =
    ( IconImage, IconStyle )



------
-- MATCHERS
------


clan : Cards.Clan -> Html msg
clan c =
    case c of
        Cards.Brujah ->
            icon ( Brujah, Standard )

        Cards.Gangrel ->
            icon ( Gangrel, Standard )

        Cards.Malkavian ->
            icon ( Malkavian, Standard )

        Cards.Nosferatu ->
            icon ( Nosferatu, Standard )

        Cards.ThinBlood ->
            icon ( ThinBlood, Standard )

        Cards.Toreador ->
            icon ( Toreador, Standard )

        Cards.Tremere ->
            icon ( Tremere, Standard )

        Cards.Ventrue ->
            icon ( Ventrue, Standard )


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


imageOpts : IconImage -> ( Attribute msg, String )
imageOpts image =
    case image of
        Action ->
            ( class "ui-icon_action", "Action" )

        Agenda ->
            ( class "ui-icon_agenda", "Agenda" )

        AgendaCard ->
            ( class "ui-icon_crown", "Agenda" )

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

        Damage ->
            ( class "ui-icon_damage", "Damage" )

        Dominate ->
            ( class "ui-icon_dominate", "Dominate" )

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
            ( class "ui-icon_obsfuscate", "Obsfuscate" )

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

        Save ->
            ( class "ui-icon_save", "Save" )

        Shield ->
            ( class "ui-icon_shield", "Shield" )

        Social ->
            ( class "ui-icon_social", "Social" )

        ThinBlood ->
            ( class "ui-icon_thinblood", "Thin Blood" )

        ThinBloodAlchemy ->
            ( class "ui-icon_thin_blood_alchemy", "Thin-blood Alchemy" )

        Toreador ->
            ( class "ui-icon_toreador", "Toreador" )

        Tremere ->
            ( class "ui-icon_tremere", "Tremere" )

        UnhostedAction ->
            ( class "ui-icon_unhosted_action", "Unhosted Action" )

        Ventrue ->
            ( class "ui-icon_ventrue", "Ventrue" )
