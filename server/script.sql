--VIEWS--
--Profil utilisateur-----
CREATE VIEW profil_utilisateurs AS (
    SELECT  users.id,
            users.nom nom, 
            users.prenom prenom, 
            users.date_naissance date_naissance, 
            users.situation_matrimonial situation_matrimonial,
            users.adresse adresse,
            abo.nom abonnement, 
            rau.date_expiration date_expiration,
            pf.solde  solde 
        FROM utilisateurs users
            FULL JOIN portefeuilles pf ON pf.id = users.id_portefeuille
            FULL JOIN rel_abonnement_utilisateurs rau on rau.id_utilisateur = users.id
            FULL JOIN abonnements abo ON abo.id = rau.id_abonnement
   
);

---Detail médicament---
CREATE VIEW detail_medicaments AS (
     SELECT  ps.id id_prestataire,ps.nom nom_prestataire,md.id id_medicament,md.nom nom_medicament ,pm.prix prix
        FROM prix_medicaments as pm
        JOIN medicaments as md 
            ON md.id = pm.id_medicament
        JOIN prestataires as ps
            ON ps.id = pm.id_prestataire
        WHERE 
            pm.id = (SELECT max(ppm.id) 
                        FROM prix_medicaments ppm 
                        Where ppm.id_prestataire = pm.id_prestataire 
                        AND ppm.id_medicament = pm.id_medicament 
                    )
        GROUP BY ps.id,ps.nom,md.id,md.nom,pm.prix
)

---DETAIL CODEBIT--
CREATE VIEW detail_codebits AS (
    SELECT 
        id_achat,
        us.nom nom,
        us.prenom prenom,
        us.telephone telephone,
        us.adresse adresse,
        montant,
        date
        FROM codebits cd
        JOIN utilisateurs as us ON cd.demandeur = us.id 
)
---STAT MEDICAMENT--
CREATE VIEW stat_medicaments AS (
    SELECT 
        da.id_medicament id_medicament,
        md.nom nom_medicament,
        count(id_achat) quantite
    FROM detail_achats da
        JOIN medicaments md ON md.id = da.id_medicament   
        JOIN achats ON achats.id = da.id_achat 
    GROUP BY id_medicament,nom_medicament
)
---HISTORIQUE ACHAT---
CREATE OR REPLACE VIEW historique_achats AS (
    SELECT 
        achats.id,
        id_utilisateur,
        sum(da.prix) as total,
        status,
        date
    FROM achats
        JOIN detail_achats as da ON da.id_achat = achats.id
    GROUP BY achats.id
    ORDER BY achats.id DESC
)