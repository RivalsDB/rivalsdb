module UI.Icon exposing
    ( action
    , agenda
    , agendaCard
    , animalism
    , attack
    , attackType
    , auspex
    , blood
    , bloodPotencReq
    , bloodPotency
    , bloodSorcery
    , brujah
    , celerity
    , clan
    , damage
    , discipline
    , dominate
    , faction
    , fortitude
    , gangrel
    , haven
    , influence
    , influenceModifier
    , leader
    , library
    , malkavian
    , mental
    , nosferatu
    , obfuscate
    , physical
    , potence
    , presence
    , protean
    , ranged
    , reaction
    , save
    , shield
    , social
    , thinBlood
    , thinBloodAlchemy
    , toreador
    , tremere
    , unhostedAction
    , ventrue
    )

import Cards
import Html exposing (Html, span, text)
import Html.Attributes as Attr exposing (class, title)



------
-- MATCHERS
------


clan : Cards.Clan -> Html msg
clan c =
    case c of
        Cards.Brujah ->
            brujah

        Cards.Gangrel ->
            gangrel

        Cards.Malkavian ->
            malkavian

        Cards.Nosferatu ->
            nosferatu

        Cards.ThinBlood ->
            thinBlood

        Cards.Toreador ->
            toreador

        Cards.Tremere ->
            tremere

        Cards.Ventrue ->
            ventrue


discipline : Cards.Discipline -> Html msg
discipline d =
    case d of
        Cards.Animalism ->
            animalism

        Cards.Auspex ->
            auspex

        Cards.BloodSorcery ->
            bloodSorcery

        Cards.Celerity ->
            celerity

        Cards.Dominate ->
            dominate

        Cards.Fortitude ->
            fortitude

        Cards.Obfuscate ->
            obfuscate

        Cards.Potence ->
            potence

        Cards.Presence ->
            presence

        Cards.Protean ->
            protean

        Cards.ThinBloodAlchemy ->
            thinBloodAlchemy


attackType : Cards.AttackType -> Html msg
attackType a =
    case a of
        Cards.Mental ->
            mental

        Cards.Physical ->
            physical

        Cards.Ranged ->
            ranged

        Cards.Social ->
            social



------
-- ICONS
------


thinBlood : Html msg
thinBlood =
    icon "ui-icon_thinblood" "Thin Blood"


tremere : Html msg
tremere =
    icon "ui-icon_tremere" "Tremere"


brujah : Html msg
brujah =
    icon "ui-icon_brujah" "Brujah"


gangrel : Html msg
gangrel =
    icon "ui-icon_gangrel" "Gangrel"


malkavian : Html msg
malkavian =
    icon "ui-icon_malkavian" "Malkavian"


nosferatu : Html msg
nosferatu =
    icon "ui-icon_nosferatu" "Nosferatu"


toreador : Html msg
toreador =
    icon "ui-icon_toreador" "Toreador"


ventrue : Html msg
ventrue =
    icon "ui-icon_ventrue" "Ventrue"


animalism : Html msg
animalism =
    icon "ui-icon_animalism" "Animalism"


auspex : Html msg
auspex =
    icon "ui-icon_auspex" "Auspex"


bloodSorcery : Html msg
bloodSorcery =
    icon "ui-icon_blood_sorcery" "Blood Sorcery"


celerity : Html msg
celerity =
    icon "ui-icon_celerity" "Celerity"


dominate : Html msg
dominate =
    icon "ui-icon_dominate" "Dominate"


fortitude : Html msg
fortitude =
    icon "ui-icon_fortitude" "Fortitude"


obfuscate : Html msg
obfuscate =
    icon "ui-icon_obsfuscate" "Obsfuscate"


potence : Html msg
potence =
    icon "ui-icon_potence" "Potence"


presence : Html msg
presence =
    icon "ui-icon_presence" "Presence"


protean : Html msg
protean =
    icon "ui-icon_protean" "Protean"


thinBloodAlchemy : Html msg
thinBloodAlchemy =
    icon "ui-icon_thin_blood_alchemy" "Thin-blood Alchemy"


agenda : Html msg
agenda =
    icon "ui-icon_agenda" "Agenda"


library : Html msg
library =
    icon "ui-icon_library" "Library"


agendaCard : Html msg
agendaCard =
    icon "ui-icon_crown" "Agenda"


haven : Html msg
haven =
    icon "ui-icon_haven" "Haven"


faction : Html msg
faction =
    icon "ui-icon_faction" "Faction"


action : Html msg
action =
    icon "ui-icon_action" "Action"


unhostedAction : Html msg
unhostedAction =
    icon "ui-icon_unhosted_action" "Unhosted Action"


blood : Html msg
blood =
    icon "ui-icon_blood" "Blood"


bloodPotency : Html msg
bloodPotency =
    icon "ui-icon_bloodpotency" "Blood Potency"


bloodPotencReq : Html msg
bloodPotencReq =
    icon "ui-icon_bloodpotencyrequirement" "Blood Potency Requirement"


damage : Html msg
damage =
    icon "ui-icon_damage" "Damage"


influence : Html msg
influence =
    icon "ui-icon_influence" "Influence"


mental : Html msg
mental =
    icon "ui-icon_mental" "Mental"


physical : Html msg
physical =
    icon "ui-icon_physical" "Physical"


ranged : Html msg
ranged =
    icon "ui-icon_ranged" "Ranged"


shield : Html msg
shield =
    icon "ui-icon_shield" "Shield"


social : Html msg
social =
    icon "ui-icon_social" "Social"


attack : Html msg
attack =
    icon "ui-icon_attack" "Attack"


influenceModifier : Html msg
influenceModifier =
    icon "ui-icon_influence_modifier" "Influence Modifier"


reaction : Html msg
reaction =
    icon "ui-icon_reaction" "Reaction"


leader : Html msg
leader =
    icon "ui-icon_leader" "Leader"


save : Html msg
save =
    material "save"



------
-- HELPERS
------


icon : String -> String -> Html msg
icon icoClass name =
    span [ class "ui-icon", class icoClass, title name ]
        [ span []
            [ text name
            ]
        ]


material : String -> Html msg
material code =
    span [ Attr.class "material-icons" ] [ text code ]
