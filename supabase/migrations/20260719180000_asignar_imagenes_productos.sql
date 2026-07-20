-- Asigna una imagen real (donde hay coincidencia exacta de modelo) o una imagen
-- representativa de categoria (fallback) a los 1199 productos del catalogo.
-- Paso A: fallback por categoria (cubre TODOS los productos primero).
-- Paso B: sobreescribe con foto especifica donde hay coincidencia real (Tier 1).

update public.productos set imagen_url = '/productos/categoria-tuberias.webp' where categoria = 'Tuberías y Conexiones';
update public.productos set imagen_url = '/productos/categoria-valvulas.webp' where categoria = 'Válvulas';
update public.productos set imagen_url = '/productos/categoria-riego.webp' where categoria = 'Sistemas de Riego';
update public.productos set imagen_url = '/productos/categoria-electricos.webp' where categoria = 'Accesorios Eléctricos';
update public.productos set imagen_url = '/productos/categoria-filtros.webp' where categoria = 'Filtros';
update public.productos set imagen_url = '/productos/categoria-electrobombas.webp' where categoria = 'Electrobombas y Tanques';
update public.productos set imagen_url = '/productos/icon-ferreteria.svg' where categoria = 'Ferretería y Otros';

-- Paso B: fotos especificas (coincidencia real de codigo de modelo)
update public.productos set imagen_url = '/productos/aspersor-2009hs.webp' where id = 31;
update public.productos set imagen_url = '/productos/aspersor-2023hbs.webp' where id = 32;
update public.productos set imagen_url = '/productos/electrovalvula-210-055.webp' where id = 381;
update public.productos set imagen_url = '/productos/electrovalvula-215-050.webp' where id = 375;
update public.productos set imagen_url = '/productos/electrovalvula-220-050.webp' where id = 388;
update public.productos set imagen_url = '/productos/aspersor-3123pc.webp' where id = 33;
update public.productos set imagen_url = '/productos/electrovalvula-515-050.webp' where id = 374;
update public.productos set imagen_url = '/productos/electrovalvula-515-050.webp' where id = 376;
update public.productos set imagen_url = '/productos/electrovalvula-520-050.webp' where id = 387;
update public.productos set imagen_url = '/productos/electrovalvula-8410.webp' where id = 382;
update public.productos set imagen_url = '/productos/caja-portavalvula-vb7bg.webp' where id = 147;
update public.productos set imagen_url = '/productos/conector-dbc-br.webp' where id = 250;
update public.productos set imagen_url = '/productos/controlador-hdc4s.webp' where id = 283;
update public.productos set imagen_url = '/productos/controlador-hdc6s.webp' where id = 287;
update public.productos set imagen_url = '/productos/controlador-lp42sc.webp' where id = 274;
update public.productos set imagen_url = '/productos/programador-lphhrp.webp' where id = 705;
update public.productos set imagen_url = '/productos/convertor-lpuni2.webp' where id = 292;
update public.productos set imagen_url = '/productos/convertor-lpuni2.webp' where id = 714;
update public.productos set imagen_url = '/productos/controlador-p2.webp' where id = 272;
update public.productos set imagen_url = '/productos/controlador-p2.webp' where id = 273;
update public.productos set imagen_url = '/productos/decodificador-p2d.webp' where id = 298;
update public.productos set imagen_url = '/productos/decodificador-p2d.webp' where id = 299;
update public.productos set imagen_url = '/productos/modulo-rpxc4.webp' where id = 606;
update public.productos set imagen_url = '/productos/controlador-rpxc315s.webp' where id = 279;
update public.productos set imagen_url = '/productos/aspersor-sd2214m.webp' where id = 34;
update public.productos set imagen_url = '/productos/filtro-wt2hua.webp' where id = 427;
update public.productos set imagen_url = '/productos/filtro-wtyps02012.webp' where id = 423;
update public.productos set imagen_url = '/productos/aspersor-7025rd.webp' where id = 30;
