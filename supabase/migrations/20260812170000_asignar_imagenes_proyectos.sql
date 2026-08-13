-- Asigna la foto correspondiente a cada proyecto (subidas por el usuario en
-- public/assets/fotos/proyectos/), reemplazando el placeholder "[FOTO DEL
-- PROYECTO]" que se mostraba al no haber imagen_url.
update proyectos set imagen_url = '/assets/fotos/proyectos/1200x630-Logo_Fala.jpg' where id = 1;
update proyectos set imagen_url = '/assets/fotos/proyectos/Megaplaza_logo.png' where id = 2;
update proyectos set imagen_url = '/assets/fotos/proyectos/torre-panama.jpg' where id = 3;
update proyectos set imagen_url = '/assets/fotos/proyectos/mall-del-sur.jpg' where id = 4;
update proyectos set imagen_url = '/assets/fotos/proyectos/plaza-norte.jpg' where id = 5;
update proyectos set imagen_url = '/assets/fotos/proyectos/depas-huachipa.jpg' where id = 6;
update proyectos set imagen_url = '/assets/fotos/proyectos/KENTIA.jpg' where id = 7;
update proyectos set imagen_url = '/assets/fotos/proyectos/HARAS-EUCALIPTOS.jpg' where id = 8;
update proyectos set imagen_url = '/assets/fotos/proyectos/COUNTRY-SAN-ANTONIO-CANETE.jpg' where id = 9;
