module UI.Icon exposing
    ( IconImage(..)
    , IconStyle(..)
    , attackType
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
    | Alchemy
    | Animal
    | Arsenal
    | Attack
    | Blood
    | BloodPotencReq
    | BloodPotency
    | City
    | CityConclave
    | CityCore
    | CityHaH
    | CityHoE
    | Conspiracy
    | Damage
    | Delete
    | DroneJockey
    | Edit
    | Faction
    | Fleet
    | Form
    | Ghoul
    | Gift
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
    | Ordnance
    | Physical
    | Ranged
    | Reaction
    | Relic
    | Rite
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
    | Vehicle


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

        Arsenal ->
            ( class "ui-icon_arsenal", "Arsenal" )

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

        Conspiracy ->
            ( class "ui-icon_conspiracy", "Conspiracy" )

        Damage ->
            ( class "ui-icon_damage", "Damage" )

        Delete ->
            ( class "ui-icon_delete", "Delete" )

        DroneJockey ->
            ( class "ui-icon_dronejockey", "Drone Jockey" )

        Edit ->
            ( class "ui-icon_edit", "Edit" )

        Faction ->
            ( class "ui-icon_faction", "Faction" )

        Fleet ->
            ( class "ui-icon_fleet", "Fleet" )

        Form ->
            ( class "ui-icon_form", "Form" )

        Ghoul ->
            ( class "ui-icon_ghoul", "Ghoul" )

        Gift ->
            ( class "ui-icon_gift", "Gift" )

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

        Monster ->
            ( class "ui-icon_monster", "Monster" )

        Ongoing ->
            ( class "ui-icon_ongoing", "Ongoing" )

        Ordnance ->
            ( class "ui-icon_ordnance", "Ordnance" )

        Physical ->
            ( class "ui-icon_physical", "Physical" )

        Ranged ->
            ( class "ui-icon_ranged", "Ranged" )

        Reaction ->
            ( class "ui-icon_reaction", "Reaction" )

        Relic ->
            ( class "ui-icon_relic", "Relic" )

        Rite ->
            ( class "ui-icon_rite", "Rite" )

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

        UnhostedAction ->
            ( class "ui-icon_unhosted_action", "Unhosted Action" )

        Vehicle ->
            ( class "ui-icon_vehicle", "Vehicle" )
