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
            JOIN portefeuilles pf ON pf.id = users.id_portefeuille
            JOIN rel_abonnement_utilisateurs rau on rau.id_utilisateur = users.id
            JOIN abonnements abo ON abo.id = rau.id_abonnement
   
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