--VIEWS--
--Profil utilisateur-----
CREATE VIEW profil_utilisateur AS (
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
            JOIN portefeuilles pf ON pf.id_utilisateur = users.id
            JOIN rel_abonnement_utilisateurs rau on rau.id_utilisateur = users.id
            JOIN abonnements abo ON abo.id = rau.id_abonnement
        WHERE users.id = 1
);
