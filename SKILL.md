---
name: Ecosistema-Paginaweb
description: Convenciones de este proyecto (ECO SISTEMAS URH SAC) para trabajar con Supabase/PostgreSQL, el equipo de agentes Claude Code + Antigravity, y el flujo de plan.md
---

# Ecosistema-Paginaweb (ECO SISTEMAS URH SAC)

Sitio web de ECO SISTEMAS URH SAC (Perú, sistemas de riego/bombas/ferretería). React 19 + Vite + TypeScript, sin backend propio — todo el acceso a datos es client-side vía `@supabase/supabase-js` contra un proyecto de Supabase Cloud.

## Cuándo usar esta skill

Automático al abrir este repo, antes de tocar código, esquema de base de datos, o coordinar trabajo con otro agente.

## Instrucciones

1. **Lee `plan.md` primero.** Es la fuente de verdad de qué falta, qué ya está hecho y qué fase está en curso (sección 8, registro de avance). No asumas el estado del proyecto sin leerlo.

2. **Equipo de dos agentes**: Claude Code = decide/coordina, Antigravity = ejecuta. Antes de tomar una fase del plan, revisa si otro agente ya la marcó "EN CURSO" en la sección 8 de `plan.md`. Una fase activa por agente a la vez. Actualiza esa sección al terminar.

3. **No corras `npm run dev` ni intentes abrir el sitio en un navegador.** El usuario verifica visualmente los cambios él mismo, en su propia terminal.

4. **Flujo de Supabase/PostgreSQL** (ya configurado, no reinventar):
   - Proyecto real: `lozaouuupwjclougqrbt` (el que está en `.env` / `VITE_SUPABASE_URL`). Si alguna vez aparece un connection string con un project ref *distinto*, DETENTE y confirma con el usuario cuál es — ya pasó una vez que se compartió por error la credencial de otro sistema (un ERP interno no relacionado).
   - Credenciales de conexión directa a Postgres viven en `.env.supabase-local` (gitignored, nunca se commitea, nunca se pega en texto plano si se puede evitar).
   - Herramientas ya creadas en la raíz del repo: `check_db.cjs .env.supabase-local` (introspección de solo lectura: tablas, columnas, RLS, buckets) y `apply_migration.cjs .env.supabase-local <archivo.sql>` (aplica un `.sql` dentro de una transacción con rollback automático si falla).
   - **El esquema se cambia escribiendo una migración versionada en `supabase/migrations/`, nunca clickeando directo en el dashboard de Supabase.**
   - Las escrituras contra la base remota (`apply_migration.cjs`) quedan bloqueadas por el clasificador de permisos del agente cuando las corre el agente directamente — hay que pedirle al usuario que las corra él mismo en su terminal y pegue la salida. Las lecturas (`check_db.cjs`) sí se pueden correr directo.
   - Antes de tocar el esquema o los datos de producción, confirmar explícitamente con el usuario (harrymusic14) — afecta el sitio en vivo.

5. **Idioma**: responder y preguntar siempre en español en este proyecto.

6. **Nunca commitear**: `.env` real, `.env.supabase-local`, ningún archivo de credenciales, ni el contenido de `Fotos Varios/` sin optimizar (son fotos fuente pesadas, no assets de la web).
