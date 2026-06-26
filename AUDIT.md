# Auditoría — Landing IA & Wine Buenos Aires

Fecha: 2026-06-26 (v2) · URL: https://ia-wine-buenos-aires.vercel.app/
Test: https://ia-wine-buenos-aires.vercel.app/test.html

Estado general: **la landing está sólida y rápida, y el embudo ahora pasa por el Test de Dominio IA.** El problema número uno hoy NO es la página: es que **el test todavía no guarda los leads en ningún lado accesible**. Si se difunde así, cada persona que lo complete se pierde.

---

## P0 — Crítico (resolver antes de difundir)

### 1. El test no captura leads (no hay backend conectado)
- **Dónde:** [test.html](test.html) → `CONFIG.APPS_SCRIPT_URL` está vacío.
- **Qué pasa hoy:** al terminar, el test muestra "Solicitud registrada" pero **solo guarda en el localStorage del visitante** (inútil para STANNUM). No llega mail, no hay planilla, no hay nada del lado de ustedes.
- **Riesgo:** como el único camino para anotarse es el test, **hoy se pierde el 100% de las inscripciones**.
- **Acción:** deployar [form-apps-script.gs](form-apps-script.gs) y pegar la URL `/exec` en `CONFIG.APPS_SCRIPT_URL`. (10 min, ya está todo listo.)

### 2. El resultado dice "Solicitud registrada" aunque no se haya guardado
- **Dónde:** [test.html](test.html) → `renderResult()`.
- **Problema:** muestra el mensaje de éxito incluso sin endpoint configurado. Es engañoso para el usuario y para ustedes.
- **Acción:** mostrar "registrada" solo si el envío salió; si no, pedir reintento o dejar contacto. (Se resuelve junto con P0.1.)

---

## P1 — Importantes (difusión y credibilidad)

### 3. Compartir el link no genera preview (Open Graph / favicon)
- **Estado:** sigue faltando `og:title`, `og:image`, Twitter Card, favicon y canonical. Solo está `<title>`.
- **Impacto:** la convocatoria se mueve por WhatsApp/LinkedIn; sin OG el link (y el del test) aparece pelado → menos clics.
- **Acción:** agregar meta OG + favicon. Imagen OG: el poster o la copa.

### 4. Acentos y ñ faltantes en el copy de la landing
- **Ejemplos en vivo:** "Invitacion", "Recepcion", "conversacion" (x3), "Curaduria", "generica", "disenada", "dinamica", "posicionamiento", "Solicita".
- **Nota:** el test.html sí está bien acentuado; el desfasaje se nota.
- **Acción:** pasada de ortografía a `index.html` (no cambia layout).

### 5. Sin medición
- No hay analítica ni eventos de conversión (visita → inicia test → completa test). No van a saber la tasa de conversión del embudo.
- **Acción:** GA4 + eventos `test_iniciado` / `test_completado`.

### 6. Kommo + GECO no integrados
- El Apps Script (cuando se conecte) manda mail/planilla, pero **no carga el lead en Kommo ni avisa a GECO**. Rompe "si no está en Kommo, no pasó".
- **Acción:** 2ª etapa — puentear Apps Script o Make → Kommo (lead + nivel + score) → notificar GECO.

---

## P2 — Mejoras

7. **Accesibilidad del test:** los chips/cards son `<div>` con onclick (no se navegan por teclado ni tienen rol ARIA); los inputs usan solo `placeholder` sin `<label>`. Mejorable para accesibilidad real.
8. **SEO:** falta `schema.org/Event` (fecha, lugar, organizador) y canonical.
9. **CSS muerto:** quedaron estilos `.lead-form` / `.form-status` sin uso tras reemplazar el form por el test. Limpieza menor.
10. **Logo STANNUM con caja de carbono:** pendiente el PNG transparente para emparejar la fila de organizadores.
11. **WhatsApp:** el CTA de WhatsApp del resultado está oculto (no hay número configurado). Definir si se usa.
12. **Primer load en frío:** los assets no están precargados/preconectados; la primera visita sin cache puede picar (cacheada anda en ~266 ms). Menor.

---

## Lo que está BIEN (no tocar)

- **Performance:** imágenes WebP, payload chico, carga cacheada ~266 ms, sin errores de consola.
- **Test de Dominio IA:** flujo limpio (17 preguntas, datos → test → resultado), estética gold/wine coherente, score en vivo, gauge, nivel + solución TRENNO, sin stickers.
- **Embudo con compuerta:** hero + sección de invitación llevan al test; registro gateado por diagnóstico.
- **Estructura y diseño:** secciones con densidad optimizada y alternancia de fondos; copa de fondo en intro; logos de organizadores normalizados; email de contacto corregido (`comercial@stannum.com.ar`).
- **Responsive** correcto en desktop y mobile.

---

## Orden recomendado para avanzar

1. **Conectar el Apps Script** (P0.1 + P0.2) → sin esto, nada de lo demás importa.
2. **OG + favicon + acentos** (P1.3, P1.4) → para difundir con cara.
3. **Analítica** (P1.5) → medir el embudo desde el día 1.
4. **Kommo + GECO** (P1.6) → meter el lead en el proceso.
5. Resto de P2 según prioridad.
