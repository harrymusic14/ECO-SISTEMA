-- Los 1199 productos cargados desde el seed inicial eran datos de PRUEBA
-- (precio 0, mezclados con gastos internos). El usuario los va a reemplazar
-- por productos reales, agregados uno por uno desde el panel /admin.
-- Esto deja la tabla completamente vacia y reinicia el contador de id.
truncate table public.productos restart identity;
