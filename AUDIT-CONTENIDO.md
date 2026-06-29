# Auditoría CONTENIDO & FORMATO — Landing IA & Wine Buenos Aires

Fecha: 2026-06-28 · URL: https://ia-wine-buenos-aires.vercel.app/
Foco: copy, ortografía, mensaje, estructura, SEO/compartir, formato técnico.

**Puntaje global: 7 / 10.** El mensaje y la estructura están bien armados y el embudo (test → registro) es sólido. Lo que baja la nota es ortografía (acentos) y la capa de "compartir/medir" que todavía no está.

---

## Lo que está bien
- **Mensaje claro y segmentado:** "exclusivo para líderes", encuentro boutique, IA aplicada a negocio. Tono ejecutivo correcto.
- **Arquitectura lógica:** hero → intro → métricas → valor → agenda → ejes de conversación → invitación (con test) → footer.
- **Embudo con compuerta:** el test califica antes de registrar. Muy buen recurso comercial.
- **Terminología alineada:** TRENNO Starter/Enterprise/Agentic y FRONTIER FIRM (atribuido a Microsoft) bien usados en test/mail.
- **Agenda concreta** (3h30, cata 21h con fiambres y quesos), métricas claras (20-30 invitados, etc.).

---

## P0 — Crítico de credibilidad

### 1. Faltan acentos y ñ en TODA la landing
Para audiencia C-level es lo primero que resta seriedad. Ejemplos en vivo:
- "Invitacion" → Invitación · "Recepcion" → Recepción · "conversacion" → conversación
- "Curaduria" → Curaduría · "generica" → genérica · "disenada" → diseñada · "diseno" → diseño
- "dinamica" → dinámica · "metodologico" → metodológico · "sintesis" → síntesis
- "posicionamiento" (ok) · "Donde/Que" → Dónde/Qué · "Solicita" → Solicitá (voseo)
- En el nav: "INVITACION" → INVITACIÓN
- **Acción:** pasada completa de ortografía a `index.html` (el `test.html` ya está bien acentuado; se nota el desfasaje).

## P1 — Compartir y medir

### 2. Sin Open Graph / Twitter / favicon
Al compartir el link por WhatsApp/LinkedIn (canal principal de convocatoria) aparece pelado, sin imagen ni título. Baja el clic.
- **Acción:** meta `og:title/description/image` + `twitter:card` + favicon. Imagen OG: el poster o la copa.

### 3. Sin analítica
No se mide visita → inicia test → completa. No vas a saber la conversión del embudo.
- **Acción:** GA4 + eventos `test_iniciado` / `test_completado`.

### 4. Sin nota de privacidad en el test/registro
Se piden datos personales (nombre, email, WhatsApp) sin una línea de "para qué se usan". Suma confianza y prolijidad legal.
- **Acción:** microcopy bajo el form/test: "Usamos tus datos solo para gestionar tu invitación. No los compartimos."

## P2 — Formato y SEO

5. **Mezcla de idioma:** "Save the date" en inglés dentro de copy en español. Es estilístico, pero decidir si se mantiene o se pasa a "Reservá la fecha".
6. **SEO técnico:** falta `schema.org/Event` (fecha, lugar, organizador) y `<link rel="canonical">`. Ayuda a que Google muestre el evento.
7. **CTA del nav "INVITACION":** lleva a la sección de invitación, que a su vez manda al test. Está bien, pero podría ir directo al test para acortar el camino.
8. **Consistencia de fecha:** verificar que "jueves 16 de julio de 2026" aparezca igual en todos lados (hero, intro, invitación).
9. **Footer:** sumar links útiles (test, dashboard) y, si corresponde, redes/contacto.

---

## Quick wins de contenido (orden sugerido)
1. **Acentos** en `index.html` (P0) — rápido y de alto impacto en credibilidad.
2. **Open Graph + favicon** (P1.2) — para difundir con cara.
3. **Nota de privacidad** en el test (P1.4) — confianza.
4. **Analítica** (P1.3) — medir desde el día 1.
5. SEO (schema Event + canonical) (P2.6).

> Nota: 1, 2, 3 y 5 los puedo hacer yo sin que dependás de nadie. La analítica (4) necesita tu ID de GA4.
