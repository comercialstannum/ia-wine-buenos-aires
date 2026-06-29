# Auditoría ESTÉTICA — Landing IA & Wine Buenos Aires

Fecha: 2026-06-28 · URL: https://ia-wine-buenos-aires.vercel.app/
Foco: diseño visual, consistencia, identidad. (La de contenido va aparte.)

**Puntaje global estético: 8 / 10.** Sistema visual fuerte y coherente (dark + gold/wine, condensado en mayúsculas, acentos dorados). Lo que falta para un 10 es resolver 4-5 detalles de acabado que hoy "delatan" que es una web hecha rápido.

---

## Lo que está MUY bien (no tocar)
- **Paleta cohesiva:** negro + oro (#c58b31) + champagne + dorado suave. Lectura premium, alineada a "vino + ejecutivo".
- **Sistema de tarjetas unificado** (value, agenda, preguntas, form): mismo borde dorado + fondo. Da consistencia.
- **Ritmo de secciones** ya optimizado: alternancia charcoal/negro + cortes dorados.
- **Hero entra completo** en la primera pantalla. Buena jerarquía: marca → save the date → IA & WINE → fecha.
- **Test y dashboard** mantienen la misma estética: el sistema se siente uno solo.

---

## P1 — Detalles que más suman al acabado

### 1. Logo STANNUM con caja de carbono (rompe la fila)
- En el nav y el footer, STANNUM viene con su recuadro fotográfico de fondo, mientras FUDRE y Sensorium son transparentes. A simple vista se nota "pegado".
- **Fix:** logo STANNUM en PNG transparente (isotipo + wordmark, sin caja). Es el arreglo de mayor impacto visual.

### 2. "IA & WINE" aparece duplicado en el hero
- El texto grande en vivo dice IA & WINE **y** el poster de fondo (derecha) también tiene IA & WINE. Compiten y se lee redundante.
- **Fix:** bajar la opacidad del poster, reencuadrarlo (mostrar la copa/obelisco, no su texto) o usar un degradado que tape el texto del poster. Que el único "IA & WINE" sea el tipográfico.

### 3. Tipografía sin webfont (renderiza distinto en cada compu)
- Los títulos usan `Arial Narrow / Roboto Condensed` como stack del sistema. En máquinas sin esas fuentes cae a Arial/Segoe y **pierde el condensado** — se ve distinto según el dispositivo.
- **Fix:** cargar una display condensada real (ej. Archivo / Oswald / Anton, self-hosted o Google Fonts) + una sans para texto. Rinde igual en todos lados y sube el nivel.

### 4. Íconos dibujados a mano (quick-facts)
- Los íconos de "IA aplicada / experiencia / networking" están hechos con CSS (círculos y líneas) y se ven algo rudimentarios al lado de lo demás.
- **Fix:** reemplazar por un set de íconos de línea fino y consistente (mismo grosor, dorado).

## P2 — Pulido fino
5. **Gráfico radar/círculos del hero:** queda detrás de los botones del nav y agrega ruido en esa zona. Bajar opacidad o correrlo.
6. **Mayúsculas en bloques largos:** los títulos gritados funcionan, pero revisar que ningún párrafo largo quede todo en mayúscula (cansa la lectura).
7. **Motion:** el reveal al scrollear es bueno; sumar un stagger leve (que las tarjetas aparezcan en cascada, no todas juntas) le daría más vida.
8. **Contraste del texto `muted`** (#9a9286) en algunos subtítulos chicos sobre negro queda algo bajo; subir medio tono donde el texto sea importante.
9. **Coherencia del "&"** en serif (Georgia): es un lindo acento, mantenerlo igual en hero, footer y test (hoy ok).

---

## Quick wins estéticos (orden sugerido)
1. Logo STANNUM transparente (P1.1) — el de mayor impacto.
2. Resolver el doble "IA & WINE" del hero (P1.2).
3. Webfont condensada (P1.3) — consistencia total.
4. Set de íconos de línea (P1.4).
