import Navbar from "@/components/nav";

export default function CGV() {
    return (
        <div className="min-h-screen">
            <Navbar/>
            <div className="pt-24">
                <h1 className="text-center font-bold text-4xl">Conditions générales de vente (CGV) :</h1>
                <p className="p-8">
                    1. Objet <br />
                    Les présentes CGV s’appliquent à toutes les ventes de luminaires réalisées par Philippe Lopez, auto-entrepreneur, via les plateformes tierces (Vinted, Leboncoin, etc.). <br />
                    Elles complètent les conditions générales des plateformes utilisées, qui restent applicables en priorité. <br />
                    <br />
                    2. Identification du vendeur <br />
                    Se conformer aux <a className="underline text-blue-500" href="">CGU</a> <br />
                    <br />
                    3. Produits et prix <br />
                    - Les produits proposés sont des luminaires artisanaux, décrits dans chaque annonce. <br />
                    - Les prix sont indiqués en euros (TTC) et incluent les frais de commission des plateformes. <br />
                    - Les frais de livraison sont précisés dans chaque annonce sur les plateformes et sont à la charge de l’acheteur. <br />
                    <br />
                    4. Commande et paiement <br />
                    - Les commandes sont passées directement via la plateforme utilisée (Vinted, Leboncoin, etc.). <br />
                    - Le paiement est sécurisé par la plateforme. Aucune transaction en direct (hors plateforme) n’est autorisée. <br />
                    - La vente est considérée comme définitive après confirmation par la plateforme. <br />
                    <br />
                    5. Livraison <br />
                    - Les délais de livraison sont indiqués dans chaque annonce. <br />
                    - En cas de retard, l’acheteur sera informé via la messagerie de la plateforme. <br />
                    - Les frais de livraison et les risques liés au transport sont régis conformément à chaque plateforme. <br />
                    <br />
                    6. Droit de rétractation <br />
                    - Conformément à la loi, l’acheteur dispose du délai prévu par chaque plateforme pour se rétracter (sauf pour les produits personnalisés). <br />
                    - Les frais de retour sont à la charge de l’acheteur. <br />
                    - Le remboursement sera effectué via la plateforme utilisée. <br />
                    <br />
                    7. Garanties légales <br />
                    - Garantie de conformité : 2 ans à compter de la livraison. <br />
                    - Garantie des vices cachés : Conformément au Code civil. <br />
                    - Pour toute réclamation, contactez le vendeur via la plateforme. <br />
                    <br />
                    8. Droits d’utilisation des images après vente <br />
                    L’acheteur reconnaît que le vendeur conserve le droit d’utiliser les images des créations vendues (photographies, vidéos, etc.) à des fins de promotion, notamment sur son site internet, ses réseaux sociaux, ses supports publicitaires ou tout autre média. <br />
                    Ces images pourront être utilisées indéfiniment et sans limitation géographique, dans le respect de la vie privée de l’acheteur (aucune mention de son identité ou de son domicile ne sera publiée sans son accord explicite). <br />
                    En achetant une création, l’acheteur accepte cette utilisation et renonce à toute réclamation ultérieure liée à l’exploitation de ces images. <br />
                    <br />
                    9. Protection des données <br />
                    - Les données personnelles des acheteurs sont traitées conformément au RGPD et aux conditions des plateformes utilisées. <br />
                    - Pour exercer vos droits (accès, rectification, suppression), contactez : petita-lumieres@protonmail.com <br />
                    <br />
                    10. Litiges <br />
                    - En cas de litige, une médiation pourra être proposée via la plateforme concernée. <br />                    - À défaut, les tribunaux français seront compétents.
                    <br />
                    11. Acceptation des CGV <br />
                    - L’achat via une annonce implique l’acceptation des présentes CGV et des conditions de la plateforme utilisée. <br />
                </p>
            </div>  
        </div>
    )
}