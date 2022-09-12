-- select * from prestataires;
-- select * from medicaments;
-- select * from rel_medicament_prestataires;
-- insert into rel_medicament_prestataires values 
--     (default,1,2,1,now(),now(),now());
--     (default,1,1,1,now(),now(),now()),
--     (default,2,1,1,now(),now(),now()),
--     (default,3,1,1,now(),now(),now()),
--     (default,2,2,1,now(),now(),now());

select * from prestataires 
    where id 
        in (select id_prestataire from rel_medicament_prestataires 
                where 
                    id_prestataire in (select id_prestataire from rel_medicament_prestataires where id_medicament=1) 
                and id_prestataire in (select id_prestataire from rel_medicament_prestataires where id_medicament=2) 
                and id_prestataire in (select id_prestataire from rel_medicament_prestataires where id_medicament=3)   
           )