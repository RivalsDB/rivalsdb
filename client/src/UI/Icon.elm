module UI.Icon exposing
    ( agenda
    , animalism
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
    , fortitude
    , influence
    , leader
    , malkavian
    , mental
    , obfuscate
    , physical
    , potence
    , presence
    , protean
    , ranged
    , save
    , shield
    , social
    , thinBlood
    , thinBloodAlchemy
    , toreador
    , tremere
    , ventrue
    )

import Cards
import Html
import Html.Attributes as Attr


icon : String -> String -> Html.Html msg
icon src name =
    Html.img
        [ Attr.src <| "/assets/icons/" ++ src
        , Attr.alt name
        , Attr.title name
        , Attr.attribute "loading" "eager"
        , Attr.class "ui-icon"
        ]
        []


clan : Cards.Clan -> Html.Html msg
clan c =
    case c of
        Cards.Brujah ->
            brujah

        Cards.Malkavian ->
            malkavian

        Cards.ThinBlood ->
            thinBlood

        Cards.Toreador ->
            toreador

        Cards.Tremere ->
            tremere

        Cards.Ventrue ->
            ventrue


discipline : Cards.Discipline -> Html.Html msg
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


attackType : Cards.AttackType -> Html.Html msg
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


thinBlood : Html.Html msg
thinBlood =
    icon "clan-thinblood.svg" "Thin Blood"


tremere : Html.Html msg
tremere =
    icon "clan-tremere.svg" "Tremere"


brujah : Html.Html msg
brujah =
    icon "clan-brujah.svg" "Brujah"


malkavian : Html.Html msg
malkavian =
    icon "clan-malkavian.svg" "Malkavian"


toreador : Html.Html msg
toreador =
    icon "clan-toreador.svg" "Toreador"


ventrue : Html.Html msg
ventrue =
    icon "clan-ventrue.svg" "Ventrue"


animalism : Html.Html msg
animalism =
    icon "discipline-animalism.svg" "Animalism"


auspex : Html.Html msg
auspex =
    icon "discipline-auspex.svg" "Auspex"


bloodSorcery : Html.Html msg
bloodSorcery =
    icon "discipline-blood-sorcery.svg" "Blood Sorcery"


celerity : Html.Html msg
celerity =
    icon "discipline-celerity.svg" "Celerity"


dominate : Html.Html msg
dominate =
    icon "discipline-dominate.svg" "Dominate"


fortitude : Html.Html msg
fortitude =
    icon "discipline-fortitude.svg" "Fortitude"


obfuscate : Html.Html msg
obfuscate =
    icon "discipline-obsfuscate.svg" "Obsfuscate"


potence : Html.Html msg
potence =
    icon "discipline-potence.svg" "Potence"


presence : Html.Html msg
presence =
    icon "discipline-presence.svg" "Presence"


protean : Html.Html msg
protean =
    icon "discipline-protean.svg" "Protean"


thinBloodAlchemy : Html.Html msg
thinBloodAlchemy =
    icon "discipline-thin-blood-alchemy.svg" "Thin-blood Alchemy"


agenda : Html.Html msg
agenda =
    icon "icon-agenda.svg" "Agenda"


blood : Html.Html msg
blood =
    icon "icon-blood.svg" "Blood"


bloodPotency : Html.Html msg
bloodPotency =
    icon "icon-bloodpotency.svg" "Blood Potency"


bloodPotencReq : Html.Html msg
bloodPotencReq =
    icon "icon-bloodpotencyrequirement.svg" "Blood Potency Requirement"


damage : Html.Html msg
damage =
    icon "icon-damage.svg" "Damage"


influence : Html.Html msg
influence =
    icon "icon-influence.svg" "Influence"


mental : Html.Html msg
mental =
    icon "icon-mental.svg" "Mental"


physical : Html.Html msg
physical =
    icon "icon-physical.svg" "Physical"


ranged : Html.Html msg
ranged =
    icon "icon-ranged.svg" "Ranged"


shield : Html.Html msg
shield =
    icon "icon-shield.svg" "Shield"


social : Html.Html msg
social =
    icon "icon-social.svg" "Social"


leader : Html.Html msg
leader =
    icon "icon-leader.svg" "Leader"


material : String -> Html.Html msg
material code =
    Html.span [ Attr.class "material-icons" ] [ Html.text code ]


save : Html.Html msg
save =
    material "save"
