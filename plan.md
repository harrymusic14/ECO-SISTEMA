# Plan Maestro — ECO SISTEMAS (Ecosistema-Paginaweb)

> Documento vivo. Se actualiza a medida que se completan tareas (marca las casillas `[x]`) y se registra en la sección 8 quién hizo qué y cuándo. Tanto Claude Code como Antigravity deben leer este archivo al empezar una sesión y actualizarlo al terminar.

---

            ## 1. Diagnóstico del estado actual (verificado en el repo, 2026-07-19)

### 1.1 Qué es este proyecto
Sitio web corporativo de **ECO SISTEMAS URH SAC** (Perú, RUC 20502059751), empresa dedicada a sistemas de riego tecnificado, bombas, tuberías y ferretería. El sitio muestra catálogo de productos, proyectos ejecutados, información institucional y tiene un panel de administración privado.

### 1.2 Stack técnico real (no lo que "debería ser", lo que ES hoy)
- **Frontend**: React 19 + TypeScript + Vite 8 + React Router 7. SPA pura, sin SSR.
- **Backend**: no existe backend propio. Todo el acceso a datos se hace **desde el navegador** con `@supabase/supabase-js`, directo contra un proyecto de **Supabase Cloud** (`lozaouuupwjclougqrbt.supabase.co`).
- **Base de datos**: PostgreSQL gestionado por Supabase. **No hay ni una sola migración versionada en el repo** — el esquema fue creado a mano desde el dashboard de Supabase (Table Editor / SQL Editor). Si algo se borra o cambia ahí, no hay forma de reconstruirlo desde el código.
- **Auth**: Supabase Auth (email + password), un único usuario admin, sin roles ni distinción de permisos visible en el código.
- **Storage**: 3 buckets de Supabase Storage: `imagenes-productos`, `proyectos_imagenes`, `sitio_imagenes`.
- **Hosting**: Netlify (existe `public/_redirects` con la regla SPA `/* /index.html 200`). No hay pipeline de CI/CD (`.github/workflows` no existe).
- **Herramientas de carga de datos**: `generate_sql.cjs` y `direct_seed.js` — dos scripts distintos (uno genera `seed.sql`, el otro inserta directo vía `supabase-js`) que cargan la misma lista de ~1200 productos reales del inventario de la ferretería, todos con `precio = 0` y `stock = 10` (datos placeholder).

### 1.3 Modelo de datos actual (CONFIRMADO por conexión directa a Postgres el 2026-07-19, ya no es inferencia)
| Tabla | Columnas reales | Filas | Notas |
|---|---|---|---|
| `productos` | `id (bigint), nombre (text), precio (numeric), categoria (text), imagen_url (text), stock (numeric), descripcion (text)` | 1199 | El formulario admin solo escribe `nombre, categoria, imagen_url` al crear — `precio`, `stock`, `descripcion` quedan en su default. No hay UI para editar un producto existente, solo crear y eliminar. |
| `proyectos` | `id (bigint), titulo (text NOT NULL), tipo (text), descripcion (text), imagen_url (text)` | 9 | Admin permite crear, eliminar y reemplazar la foto. |
| `hero_videos` | `id (bigint), video_url (text NOT NULL), orden (integer, default 0)` | 2 | Ya hay 2 videos reales subidos en producción. |
| `imagenes_sitio` | `clave (text NOT NULL), imagen_url (text)` | **0** | Tabla key-value genérica. Claves esperadas por el código: `home_hero`, `nosotros_cover` — pero **todavía no existe ninguna fila**, el sitio en vivo sigue usando el poster/placeholder por defecto en `Home.tsx`/`About.tsx`. |
| `perfiles` | `id (bigint), email (text), password_visible (text), rol (text)` | 0 | **No la usa ningún código del sitio** (el login usa Supabase Auth, no esta tabla). El nombre de la columna `password_visible` es una señal de alerta (sugiere contraseñas en texto plano) aunque hoy esté vacía — pendiente decidir si se elimina o se documenta su propósito real. |

Buckets de Storage: `imagenes-productos`, `proyectos_imagenes`, `sitio_imagenes` (todos `public=true`).

**RLS: corregido el 2026-07-19** (ver hallazgo #3 y migración `supabase/migrations/20260719170242_enable_rls_public_tables.sql`) — las 5 tablas tienen `rowsecurity=true`, con lectura pública + escritura solo `authenticated` en las 4 activas, y `perfiles` completamente bloqueada (sin políticas).

### 1.4 Hallazgos y riesgos detectados
1. **`.env` está commiteado en git** (aparece en `git ls-files`). Contiene la URL del proyecto y la `anon/publishable key`. No es una clave secreta crítica (está diseñada para exponerse en el cliente), pero es mala práctica tenerla en el historial y bloquea tener distintos entornos (local/staging/prod) sin pisarse.
2. **Cero control de versiones del esquema de base de datos.** Ningún `CREATE TABLE` versionado todavía (sí existe ya `supabase/migrations/20260719170242_enable_rls_public_tables.sql`, pero solo cubre RLS, no la creación original de las tablas — falta la migración base con los `CREATE TABLE` reales). Todo el diseño original de tablas sigue viviendo solo en la nube.
3. ~~**RLS no auditado.**~~ **RESUELTO el 2026-07-19.** Se confirmó por conexión directa que las 5 tablas (`productos`, `proyectos`, `hero_videos`, `imagenes_sitio`, `perfiles`) tenían `rowsecurity=false` — cualquiera con la `anon key` pública (visible en el bundle del sitio) podía insertar/actualizar/borrar filas sin login, vía la API REST de Supabase. Se aplicó la migración `20260719170242_enable_rls_public_tables.sql`: ahora las 4 tablas de contenido tienen lectura pública + escritura solo `authenticated`, y `perfiles` quedó completamente bloqueada. Verificado con lectura posterior — políticas activas, filas intactas.
3b. **Nuevo hallazgo (Storage): política `"Public Insert"` en `storage.objects` con `roles={public}`** — permite subir archivos a los buckets sin estar autenticado, además de las políticas correctas que ya exigen `authenticated` para cada bucket específico. Pendiente de decidir si se elimina (no debería hacer falta, ya hay políticas de subida autenticada por bucket).
3c. **Tabla `perfiles` con columna `password_visible`**: sin uso en el código, vacía, pero el nombre sugiere un diseño previo que guardaría contraseñas en texto plano. Pendiente: decidir si se elimina la tabla o se documenta/corrige su propósito.
4. **Sin backend de negocio**: no hay validación de servidor, todo pasa por las políticas de RLS de Postgres como única línea de defensa.
5. **Catálogo con datos de relleno**: ~1200 productos con precio `0`, sin descripción real ni foto real (usan `/logo-eco-sistema.png` como placeholder).
6. **Sin paginación real**: `Products.tsx` trae `.limit(100)` de un catálogo de +1200 filas — el resto es invisible para el usuario final.
7. **Sin edición de productos**: el admin solo puede crear y borrar, no editar nombre/precio/descripción de un producto ya existente.
8. **Formulario de contacto es decorativo**: los inputs no tienen `value`/`onChange` ni `onSubmit`; el botón es `type="button"` sin acción. No envía nada a ningún lado todavía.
9. **Sin tests, sin CI/CD.**
10. **Hay material fotográfico real sin usar**: la carpeta `Fotos Varios/` (no versionada, `git status` la marca como `??`) contiene subcarpetas como `Bentin Pachacamac`, `Bomba y tableros`, `Bombas y accesorios y equipos` con fotos reales de proyectos y equipos — insumo directo para reemplazar los placeholders del catálogo y de proyectos, pero **no debe subirse tal cual a git** (son fotos originales pesadas, no assets optimizados de la web).
11. **Docker no está instalado en esta máquina** (verificado: `docker` no existe en PATH). Es un prerrequisito para levantar Postgres local con la CLI de Supabase (Fase 2).
12. Supabase CLI **sí está disponible vía `npx`** (`npx supabase --version` → `2.106.0`), no hace falta instalarla globalmente.

---

## 2. Objetivo de este plan

Pasar de "un sitio que le pega directo a Supabase Cloud sin red de seguridad" a un flujo de trabajo profesional donde:
- El esquema de PostgreSQL vive **como código** (migraciones versionadas en el repo), no solo en el dashboard.
- Se puede desarrollar **localmente** contra un Postgres real (vía Supabase CLI + Docker) sin tocar producción, y promover cambios de forma controlada.
- La seguridad de los datos (RLS) queda explícita y auditable.
- El catálogo pasa de datos de relleno a datos reales (precios, descripciones, fotos).
- Claude Code y Antigravity pueden trabajar como equipo sobre el mismo repo sin pisarse.

---

## 3. Arquitectura objetivo

```
Desarrollo local                         Producción
┌─────────────────────────┐              ┌──────────────────────────┐
│ Vite dev server (5173)  │              │ Netlify (build estático) │
│        ↓                │              │        ↓                │
│ Supabase local (CLI)    │  supabase    │ Supabase Cloud           │
│  - Postgres (Docker)    │  db push  →  │  - Postgres              │
│  - Auth / Storage mock  │  ←────────   │  - Auth / Storage real   │
│  - Studio (localhost)   │  db pull     │                          │
└─────────────────────────┘              └──────────────────────────┘
        ↑
supabase/migrations/*.sql   ← versionado en git, es la fuente de verdad del esquema
```

Regla de oro: **el esquema se cambia escribiendo una migración, nunca clickeando en el dashboard de producción directamente** (salvo emergencias, y aun así se retro-documenta con una migración).

---

## 4. Reglas de trabajo del equipo de agentes (Claude Code + Antigravity)

Como ambos agentes van a operar sobre el mismo checkout local, se establecen reglas simples para no pisarse:

1. **Este `plan.md` es la fuente de verdad de "qué falta y quién lo está haciendo".** Antes de empezar cualquier tarea, el agente lee la sección 8 (registro de avance) para ver si esa fase ya está tomada.
2. **Una fase activa a la vez por agente.** Al empezar una fase, el agente anota en la sección 8: `Fase X — EN CURSO — [nombre del agente] — [fecha]`. Al terminar, la marca `HECHO` y tilda los checkboxes correspondientes.
3. **Separación natural de responsabilidades** (para minimizar conflictos de archivos):
   - **Claude Code** → Fases 0, 1, 2, 3 (infraestructura: Supabase CLI, migraciones, RLS, seguridad, DevOps).
   - **Antigravity** → Fases 4 y 6 (UI/UX, funcionalidades de frontend, contenido). Fase 5 (calidad/CI) puede repartirse según quién esté libre.
   - Esto no es una regla rígida — si un agente termina su bloque, puede tomar la siguiente fase libre.
4. **Commits pequeños y descriptivos**, uno por tarea concreta del checklist, no un commit gigante por fase. Mensaje sugerido: `[Fase 1] agregar migración inicial de esquema productos/proyectos`.
5. **Nunca hacer `git push --force`, `git reset --hard` ni tocar migraciones ya aplicadas en producción sin avisar** — si una migración ya se corrió contra Supabase Cloud, los cambios posteriores se hacen con una migración *nueva*, no editando la vieja.
6. **Antes de tocar el esquema de Supabase Cloud**, confirmar con el usuario (harrymusic14) — son cambios que afectan el sitio en vivo.
7. Si un agente detecta que el otro dejó cambios sin commitear al tomar una fase, debe pausar y preguntar antes de sobreescribir (usar `git status`/`git stash` en vez de descartar).

---

## 5. Fases y checklist accionable

### Fase 0 — Higiene y seguridad inmediata
- [ ] Quitar `.env` del tracking de git (`git rm --cached .env`) y confirmar que ya está en `.gitignore`.
- [ ] Crear `.env.example` con las claves necesarias mostrando placeholders (`VITE_SUPABASE_URL=`, `VITE_SUPABASE_ANON_KEY=`).
- [ ] Documentar en el `README.md` cómo levantar el proyecto (`npm install`, copiar `.env.example` a `.env`, `npm run dev`).
- [ ] Verificar en el dashboard de Netlify que las env vars de producción estén configuradas ahí (no dependan del `.env` del repo).
- [ ] Decidir con el usuario si rota la `anon key` actual (opcional, no urgente — es una clave pública por diseño).
- [ ] Añadir `Fotos Varios/` explícitamente al `.gitignore` si se decide que no debe versionarse (ya está sin trackear, pero conviene dejarlo explícito para que nadie la agregue por accidente).

### Fase 1 — Supabase como código
- [ ] Instalar/confirmar Supabase CLI (`npx supabase --version`, ya validado en `2.106.0`).
- [ ] `npx supabase login` (requiere token del dashboard de Supabase).
- [ ] `npx supabase init` en la raíz del repo → crea carpeta `supabase/`.
- [ ] `npx supabase link --project-ref lozaouuupwjclougqrbt` para vincular al proyecto real.
- [ ] `npx supabase db pull` → genera la primera migración a partir del esquema **actual** de producción (esto captura `productos`, `proyectos`, `hero_videos`, `imagenes_sitio` tal como existen hoy, incluyendo tipos de columna, defaults y policies si las hay).
- [ ] Revisar la migración generada a mano: nombrar columnas, agregar comentarios donde falte claridad, confirmar tipos (`precio` como `numeric`, no `int`, etc.).
- [ ] Commitear `supabase/migrations/*.sql` al repo — a partir de aquí, este archivo es la fuente de verdad del esquema.
- [ ] Generar tipos TypeScript desde el esquema: `npx supabase gen types typescript --linked > src/types/database.types.ts`, y tipar el cliente (`createClient<Database>(...)`) en `src/supabaseClient.ts` para reemplazar los `any` que hoy se usan en `Products.tsx` y otros componentes.

### Fase 2 — PostgreSQL local (requiere Docker Desktop)
- [ ] Instalar Docker Desktop (Windows) — prerrequisito de `supabase start`. **Pendiente: no está instalado en esta máquina.**
- [ ] `npx supabase start` → levanta Postgres local + Studio local (usualmente `http://localhost:54323`) + Auth/Storage emulados.
- [ ] Migrar `seed.sql` al formato estándar de Supabase: moverlo/adaptarlo a `supabase/seed.sql` (la CLI lo aplica automáticamente en `supabase start` / `supabase db reset`).
- [ ] Crear un `.env.local` (o variante) que apunte a las credenciales locales que imprime `supabase start` (`API URL`, `anon key` locales) para desarrollar sin tocar producción.
- [ ] Flujo de trabajo para cambios de esquema a partir de ahora:
  1. Cambiar el esquema en el Studio local o escribir SQL a mano.
  2. `npx supabase db diff -f nombre_del_cambio` → genera migración nueva versionada.
  3. Probar localmente (`supabase db reset` aplica todas las migraciones + seed desde cero).
  4. `npx supabase db push` → aplica la migración a producción cuando esté validada.
- [ ] Documentar este flujo en el `README.md` (sección "Trabajar con la base de datos").

### Fase 3 — Seguridad de datos (RLS y roles)
- [x] Auditar políticas RLS actuales — **hecho 2026-07-19**: se conectó directo a Postgres (pooler) y se confirmó que RLS estaba desactivado en las 5 tablas de `public`.
- [x] Escribir esas políticas como SQL versionado — **hecho 2026-07-19**: `supabase/migrations/20260719170242_enable_rls_public_tables.sql`, aplicada y verificada contra producción.
- [x] Confirmar el modelo de permisos deseado — **hecho**: lectura pública + escritura solo `authenticated`, aplicado tal cual en las 4 tablas de contenido; `perfiles` bloqueada por completo.
- [ ] Evaluar si conviene un rol `admin` explícito — sigue abierto (ver pregunta 3 en sección 7); la tabla `perfiles` existente **no** se está usando para esto y tiene un problema de diseño (`password_visible`) que hay que resolver antes de reutilizarla.
- [ ] Revisar permisos de los buckets de Storage — **revisado, encontrado 1 problema pendiente de arreglar**: política `"Public Insert"` en `storage.objects` permite subir archivos sin login (ver hallazgo 3b en sección 1.4). Falta decidir con el usuario si se elimina.

### Fase 4 — Backlog funcional pendiente
- [ ] Paginación real en `Products.tsx` (hoy trae `.limit(100)` fijo de +1200 productos) — usar `.range()` de supabase-js o paginación por scroll.
- [ ] Formulario de **edición** de producto (nombre, categoría, precio, stock, descripción) — hoy `AdminProductForm` solo crea y `AdminProductList` solo borra.
- [ ] Cargar precios y descripciones reales (reemplazar los `0` / genéricos del seed) — trabajo de datos, no solo de código.
- [ ] Reemplazar placeholders de imagen (`/logo-eco-sistema.png`, Unsplash) usando el material real disponible en `Fotos Varios/Bombas y accesorios y equipos/`, `Bomba y tableros/`, etc. (optimizado a `.webp`/`.avif` antes de subir, respetando la validación ya existente en el admin).
- [ ] Conectar el formulario de `Contact.tsx` a algo real: opción simple (tabla `mensajes_contacto` en Supabase + política de insert público) u otra (servicio externo tipo formspree/resend). Decidir con el usuario.
- [ ] Revisar categorías de producto: hoy están hardcodeadas en 3 lugares distintos (`AdminProductForm`, `Products.tsx`) — considerar una tabla `categorias` o al menos una única fuente compartida (`src/constants/categories.ts`).

### Fase 5 — Calidad y despliegue
- [ ] Agregar un pipeline de CI (GitHub Actions) mínimo: `npm run lint` + `npm run build` en cada PR.
- [ ] Evaluar tests básicos (al menos smoke tests de las páginas públicas) — stack sugerido: Vitest + Testing Library, ya que el proyecto usa Vite.
- [ ] Confirmar que el build de Netlify usa las mismas versiones de Node que localmente (`v24.11.0` en esta máquina) — fijar `.nvmrc` o `engines` en `package.json` si hace falta reproducibilidad.

### Fase 6 — Contenido real
- [ ] Curar y optimizar (a `.webp`/`.avif`) las fotos útiles de `Fotos Varios/` para productos y proyectos ejecutados.
- [ ] Subirlas vía el panel admin (`/admin`) una vez el flujo de datos reales esté validado (Fase 4 completa).
- [ ] Revisar copy de `About.tsx` (lista de clientes hardcodeada) y `Home.tsx` (marcas hardcodeadas) por si el usuario quiere hacerlas dinámicas también, o dejarlas estáticas a propósito.

---

## 6. Convenciones y comandos de referencia

```bash
# Supabase CLI (usar npx, no hace falta instalar global)
npx supabase login
npx supabase init
npx supabase link --project-ref lozaouuupwjclougqrbt
npx supabase db pull                 # trae el esquema actual de producción como migración
npx supabase start                   # levanta Postgres local (requiere Docker Desktop corriendo)
npx supabase db reset                # recrea la DB local desde migraciones + seed.sql
npx supabase db diff -f nombre_cambio  # genera una migración a partir de cambios hechos en local
npx supabase db push                 # aplica migraciones pendientes a producción
npx supabase gen types typescript --linked > src/types/database.types.ts
```

Convención de commits durante este plan: `[Fase N] descripción corta en minúsculas`.

Nunca commitear: `.env` real, credenciales de Supabase, contenido de `Fotos Varios/` sin optimizar.

---

## 7. Preguntas abiertas para el usuario (no bloquean el arranque, pero sí fases puntuales)
1. ¿Quieres rotar la `anon key` actual ahora que reconocemos que estuvo en el historial de git, o la dejamos igual (Fase 0)?
2. ¿El formulario de contacto debe guardar en una tabla de Supabase, enviar un correo, o ambas cosas (Fase 4)?
3. ¿Habrá más de un usuario admin en el futuro (para decidir si vale la pena un rol explícito en Fase 3) o siempre será uno solo?
4. ¿Confirmas que Docker Desktop se puede instalar en esta máquina para la Fase 2, o prefieres saltarte el Postgres local y trabajar solo con `db pull`/`db push` contra la nube?
5. ¿Qué hacemos con la tabla `perfiles` (columna `password_visible`, sin uso hoy)? ¿La eliminamos, o tenía un propósito que quieras retomar?
6. ¿Elimino la política `"Public Insert"` de `storage.objects` (permite subir archivos a los buckets sin login), ya que las políticas correctas por bucket (`authenticated`) ya cubren la subida real desde el panel admin?

## 7b. Acceso a Supabase ya configurado
Conexión directa a Postgres verificada y funcionando (proyecto `lozaouuupwjclougqrbt`, pooler `aws-0-ca-central-1.pooler.supabase.com:5432`). Credenciales guardadas localmente en `.env.supabase-local` (gitignored, nunca commiteado). Herramientas creadas para este flujo (ambas en la raíz del repo, sin secretos embebidos, reciben el archivo de credenciales como argumento):
- `check_db.cjs .env.supabase-local` — introspección de solo lectura (tablas, columnas, row counts, políticas RLS, buckets).
- `apply_migration.cjs .env.supabase-local <archivo.sql>` — aplica un archivo SQL dentro de una transacción (rollback automático si algo falla).

**Nota de flujo**: el clasificador de permisos de Claude Code bloquea las ejecuciones de escritura contra la base de datos remota (`apply_migration.cjs`) cuando las corre el agente directamente — hay que pedirle al usuario que las corra él mismo en su terminal y pegue la salida. Las lecturas (`check_db.cjs`) sí se han podido correr directo sin bloqueo.

---

## 8. Registro de avance

| Fase | Estado | Agente | Fecha | Notas |
|---|---|---|---|---|
| 0 — Higiene y seguridad | Pendiente | — | — | Falta quitar `.env` del tracking y crear `.env.example` |
| 1 — Supabase como código | Parcial | Claude Code | 2026-07-19 | Esquema real confirmado por conexión directa (no vía CLI todavía); falta migración base con `CREATE TABLE`, falta `supabase link`/`gen types` |
| 2 — Postgres local | Bloqueada | — | — | Requiere instalar Docker Desktop primero |
| 3 — RLS y roles | Parcial (mayormente hecho) | Claude Code | 2026-07-19 | RLS habilitado + políticas aplicadas y verificadas en producción. Pendiente: decisión sobre `perfiles`, arreglar `"Public Insert"` en storage, decidir rol admin explícito |
| 4 — Backlog funcional | Pendiente | — | — | — |
| 5 — Calidad y CI | Pendiente | — | — | — |
| 6 — Contenido real | Pendiente | — | — | — |
| 7 — Optimización (UI/UX) | HECHO | Antigravity | 2026-07-21 | Diseño 100% responsivo (App.css, Layout.tsx menu móvil). Code-splitting con React.lazy para todas las rutas y para modelos pesados (Three.js aislado en su propio chunk, reduciendo Home.js a 21KB). Atributos loading="lazy" implementados. |
