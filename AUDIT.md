# Auditoría — Landing IA & Wine Buenos Aires

Fecha: 2026-06-24 · URL: https://ia-wine-buenos-aires.vercel.app/

Estado general: **buena base técnica y visual, con fugas críticas en captura de leads y en compartibilidad.** El sitio carga rápido y se ve premium, pero hoy un lead que quiere anotarse puede no llegar a destino, y el link compartido no genera preview. Para un evento de convocatoria C-level, eso es plata que se va.

---

## P0 — Críticos (resolver antes de difundir)

### 1. Email de contacto con dominio equivocado
- **Dónde:** [script.js:32](script.js#L32) y [index.html:328](index.html#L328) → `hola@stannum.com`
- **Problema:** el dominio real es `stannum.com.ar`. `stannum.com` (sin `.ar`) probablemente rebota o cae en otro buzón. Contacto roto = lead perdido.
- **Acción:** confirmar el correo público correcto (¿`hola@stannum.com.ar`? ¿`comercial@stannum.com.ar`?) y corregir en los dos lugares.

### 2. Los leads NO entran a Kommo
- **Dónde:** [script.js:9-33](script.js#L9) — el form arma un `mailto:` y abre el cliente de correo del visitante.
- **Problema doble:**
  1. **Fricción alta:** muchos ejecutivos abren desde el celular sin cliente de mail configurado → el botón "no hace nada" → abandono.
  2. **Viola la regla operativa de STANNUM** ("si no está en Kommo, no pasó"): cero trazabilidad, cero carga automática de lead, cero notificación a GECO.
- **Acción:** reemplazar el `mailto:` por un envío real (Make webhook → Kommo create_lead → notificación GECO). El campo "Nivel actual de uso de IA" ya está: sirve como scoring inicial de madurez.

---

## P1 — Importantes (impactan difusión y credibilidad)

### 3. Compartir el link no genera preview (Open Graph)
- **Problema:** no hay `og:title`, `og:description`, `og:image`, ni Twitter Card, ni favicon. La convocatoria ejecutiva se mueve por **WhatsApp y LinkedIn**; sin OG, el link aparece "pelado" (sin imagen ni título) → menos clics.
- **Acción:** agregar meta OG + Twitter + favicon. Imagen OG ideal: el poster (`ia-wine-poster.webp`) o la copa.

### 4. Faltan acentos y ñ en todo el copy
- **Ejemplos:** "lideres", "presion", "disenada" (→ diseñada), "diseno" (→ diseño), "Recepcion", "Invitacion", "conversacion", "Curaduria", "metodologico", "sintesis", "Donde", "Que".
- **Problema:** para audiencia C-level es un tema de prolijidad y credibilidad de marca.
- **Acción:** pasada de copy con ortografía correcta (no cambia layout).

### 5. Sin medición
- **Problema:** no hay analítica (GA4 / Meta Pixel) ni evento de conversión en el form. No vas a saber visitas vs solicitudes ni de dónde vienen.
- **Acción:** sumar GA4 + evento "solicitud_enviada". Permite medir el funnel de la convocatoria.

---

## P2 — Mejoras

6. **SEO:** falta `<link rel="canonical">` y structured data `schema.org/Event` (ayuda a que Google muestre fecha y lugar en el resultado).
7. **Feedback del form:** no hay mensaje de éxito/error en pantalla. Con el envío real (P0.2) hay que mostrar confirmación.
8. **Logo STANNUM con caja de carbono:** pendiente PNG transparente para emparejar la fila de organizadores en la barra superior.
9. **Texto dorado chico (eyebrows):** contraste algo justo en tamaños pequeños; revisar si se quiere AA estricto.
10. **Deploy no automático desde git:** documentado en [DEPLOY.md](DEPLOY.md). Opción: conectar el repo a Vercel para deploy por push.

---

## Lo que está BIEN (no tocar)

- **Performance excelente:** imágenes WebP, ~142 KB total, carga sub-segundo. (era 2.6 MB / 4.2 s)
- **Responsive sólido** en desktop y mobile.
- **Sin errores de consola.**
- **Estructura semántica correcta:** header / main / section / footer, jerarquía h1→h3, `alt` en imágenes, `lang="es"`, labels en el form.
- **Contraste de texto body OK** (~6.4:1, pasa AA).
- **Densidad de secciones optimizada** (esta sesión): menos aire negro, tarjetas visibles.

---

## Próximo paso: Test de dominio de IA (para los CEOs/empresarios)

La invitación ya promete "un test breve de dominio de IA". Para activarlo bien:

**Encuadre estratégico:** posicionar el test como el diagnóstico de dónde está cada líder en el roadmap LATAM hacia **FRONTIER FIRM** (concepto de Microsoft, *Work Trend Index 2025*). No es "un quiz", es el punto de partida del viaje de transformación. Dato de respaldo: McKinsey (*The State of AI*, 2024) reporta que ~65% de las organizaciones ya usan IA generativa de forma regular — el test separa a quienes la usan de quienes la capitalizan.

**Cómo construirlo (propuesta):**
- Página/flujo multi-paso (8-12 preguntas) que arroje un **nivel de madurez** alineado a las 4 opciones que ya pide el form (Exploratorio / Operativo / Procesos automatizados / Escalando adopción).
- Resultado personalizado + CTA a la invitación.
- **Integración Kommo:** cada test completado → lead con el nivel como campo + estrategia GECO (Atracción/Conversión/Fidelización) + notificación a GECO.
- Sirve como **mecanismo de calificación**: priorizás a quién invitar y con qué mensaje.

Decisiones a definir antes de avanzar: ¿test embebido en esta landing o página aparte? ¿captura datos antes o después de mostrar resultado? ¿se conecta a Kommo vía Make?
