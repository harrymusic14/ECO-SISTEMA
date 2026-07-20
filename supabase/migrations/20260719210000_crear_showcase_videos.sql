-- Tabla para los videos cortos (estilo shorts/tiktok, grabados con celular)
-- que reemplazan la seccion "Certificado de Calidad" del inicio. Reutiliza
-- el bucket sitio_imagenes (ya tiene RLS: lectura publica, escritura solo
-- authenticated) bajo el prefijo showcase/.

create table public.showcase_videos (
  id bigint generated always as identity primary key,
  video_url text not null,
  titulo text,
  orden integer not null default 0
);

alter table public.showcase_videos enable row level security;

create policy "lectura publica showcase_videos" on public.showcase_videos
  for select using (true);

create policy "escritura autenticados showcase_videos" on public.showcase_videos
  for all to authenticated using (true) with check (true);
