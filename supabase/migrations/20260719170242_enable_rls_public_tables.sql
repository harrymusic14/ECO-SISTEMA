-- Habilita Row Level Security en las 5 tablas del esquema public.
-- Antes de esta migracion, RLS estaba desactivado en las 5: cualquiera con la
-- anon key publica podia insertar/actualizar/borrar filas directamente via la
-- API REST de Supabase, sin necesitar login.
--
-- Regla aplicada: lectura publica (el sitio publico solo hace SELECT sin login),
-- escritura restringida a usuarios autenticados (el panel /admin exige login
-- via Supabase Auth antes de escribir).

-- productos
alter table public.productos enable row level security;
create policy "lectura publica productos" on public.productos
  for select using (true);
create policy "escritura autenticados productos" on public.productos
  for all to authenticated using (true) with check (true);

-- proyectos
alter table public.proyectos enable row level security;
create policy "lectura publica proyectos" on public.proyectos
  for select using (true);
create policy "escritura autenticados proyectos" on public.proyectos
  for all to authenticated using (true) with check (true);

-- hero_videos
alter table public.hero_videos enable row level security;
create policy "lectura publica hero_videos" on public.hero_videos
  for select using (true);
create policy "escritura autenticados hero_videos" on public.hero_videos
  for all to authenticated using (true) with check (true);

-- imagenes_sitio
alter table public.imagenes_sitio enable row level security;
create policy "lectura publica imagenes_sitio" on public.imagenes_sitio
  for select using (true);
create policy "escritura autenticados imagenes_sitio" on public.imagenes_sitio
  for all to authenticated using (true) with check (true);

-- perfiles: tabla sin uso en el codigo actual (el login usa Supabase Auth, no
-- esta tabla) y con una columna "password_visible" que no deberia existir.
-- Se bloquea por completo (RLS habilitado, sin policies) hasta que se defina
-- su proposito real o se elimine.
alter table public.perfiles enable row level security;
