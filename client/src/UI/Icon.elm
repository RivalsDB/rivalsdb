module UI.Icon exposing
    ( IconImage(..)
    , IconStyle(..)
    , attackType
    , clan
    , icon
    )

import Cards
import Data.Clan as Clan exposing (Clan)
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
    | Attack
    | Blood
    | BloodPotencReq
    | BloodPotency
    | Conspiracy
    | Damage
    | Delete
    | Edit
    | Faction
    | Haven
    | Influence
    | InfluenceModifier
    | Leader
    | Library
    | Mental
    | Menu
    | Ongoing
    | Physical
    | Ranged
    | Reaction
    | Ritual
    | Save
    | Scheme
    | Shield
    | Social
    | Special
    | Title
    | UnhostedAction
    | Clan Clan


type IconStyle
    = Standard
    | Negative
    | Colored


type alias Icon =
    ( IconImage, IconStyle )



------
-- MATCHERS
------


clan : IconStyle -> Clan -> Html msg
clan style c =
    icon ( Clan c, style )


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

        Colored ->
            class "ui-icon--colored"

        Negative ->
            class "ui-icon--negative"


imageOpts : IconImage -> ( Attribute msg, String )
imageOpts image =
    case image of
        Clan Clan.Brujah ->
            ( class "ui-icon_brujah", "Brujah" )

        Clan Clan.Gangrel ->
            ( class "ui-icon_gangrel", "Gangrel" )

        Clan Clan.Malkavian ->
            ( class "ui-icon_malkavian", "Malkavian" )

        Clan Clan.Nosferatu ->
            ( class "ui-icon_nosferatu", "Nosferatu" )

        Clan Clan.ThinBlood ->
            ( class "ui-icon_thinblood", "Thin Blood" )

        Clan Clan.Toreador ->
            ( class "ui-icon_toreador", "Toreador" )

        Clan Clan.Tremere ->
            ( class "ui-icon_tremere", "Tremere" )

        Clan Clan.Ventrue ->
            ( class "ui-icon_ventrue", "Ventrue" )

        Action ->
            ( class "ui-icon_action", "Action" )

        Agenda ->
            ( class "ui-icon_agenda", "Agenda" )

        AgendaCard ->
            ( class "ui-icon_crown", "Agenda" )

        Alchemy ->
            ( class "ui-icon_alchemy", "Alchemy" )

        Attack ->
            ( class "ui-icon_attack", "Attack" )

        Blood ->
            ( class "ui-icon_blood", "Blood" )

        BloodPotencReq ->
            ( class "ui-icon_bloodpotencyrequirement", "Blood Potency Requirement" )

        BloodPotency ->
            ( class "ui-icon_bloodpotency", "Blood Potency" )

        Conspiracy ->
            ( class "ui-icon_conspiracy", "Conspiracy" )

        Damage ->
            ( class "ui-icon_damage", "Damage" )

        Delete ->
            ( class "ui-icon_delete", "Delete" )

        Edit ->
            ( class "ui-icon_edit", "Edit" )

        Faction ->
            ( class "ui-icon_faction", "Faction" )

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

        Social ->
            ( class "ui-icon_social", "Social" )

        Special ->
            ( class "ui-icon_special", "Special" )

        Title ->
            ( class "ui-icon_title", "Title" )

        UnhostedAction ->
            ( class "ui-icon_unhosted_action", "Unhosted Action" )
