/**
 * IA & Wine Buenos Aires — receptor del Test de Dominio IA (test.html).
 *
 * Cada test completado dispara:
 *   1) Mail BRANDEADO (gold/wine) al participante con su resultado.
 *   2) Aviso interno a comercial@stannum.com.ar con todos los datos.
 *   3) Una fila en la Google Sheet.
 *
 * PROBAR EL MAIL SIN DEPLOYAR:
 *   Pegá este código, guardá, elegí la función "testEmail" arriba y tocá ▶ Ejecutar.
 *   Te llega a comercial@stannum.com.ar un mail de muestra para ver el branding.
 *
 * APLICAR LOS CAMBIOS AL WEB APP (cuando el mail te guste):
 *   Implementar → Gestionar implementaciones → ✏️ (editar) → Versión: Nueva versión → Implementar.
 *   La URL /exec NO cambia.
 */

const DESTINO_EMAIL = "comercial@stannum.com.ar";
const SHEET_ID = "1B8VoteTnaDtwWFFB5qGnDDUtvTajNiyUIpmaFEBCHdM"; // Sheet "IA & Wine — Leads (Test de Dominio IA)"
const EVENT = "IA & Wine Buenos Aires";

// Niveles (mismos que el test) — fuente del copy del mail
const LEVELS = [
  {min:0,  max:34,  name:"Principiante", tag:"Etapa inicial de exploración",
   desc:"Estás en las primeras etapas del uso de IA generativa. La oportunidad es construir una base práctica con casos de uso reales que generen impacto inmediato en tu operación.",
   sol:"TRENNO iA Starter", solD:"Alfabetización ejecutiva con casos de uso aplicados, prompts prácticos y rutinas de adopción para líderes y equipos."},
  {min:35, max:59,  name:"Intermedio", tag:"Uso regular con potencial de escala",
   desc:"Usás IA de forma regular para tareas específicas. El siguiente paso es sistematizar ese uso, ampliar herramientas y comenzar a medir el impacto concreto en el negocio.",
   sol:"TRENNO iA Starter", solD:"Capacitación aplicada por área con prompts avanzados, automatización básica y métricas de adopción."},
  {min:60, max:79,  name:"Avanzado", tag:"Optimización y diseño de sistemas",
   desc:"Optimizás tareas con IA y diseñás prompts personalizados. El siguiente nivel es integrar IA como sistema operativo del equipo con flujos automatizados y gobierno claro.",
   sol:"TRENNO iA Enterprise", solD:"Implementación sistémica con SOPs, automatizaciones conectadas, entrenamiento de equipos y tablero de control de impacto."},
  {min:80, max:100, name:"Experto", tag:"IA como ventaja estratégica",
   desc:"Usás IA para automatizar procesos y optimizar estrategias. El foco es el gobierno, la escalabilidad organizacional y el roadmap de IA como ventaja competitiva sostenible.",
   sol:"TRENNO iA Agentic", solD:"Diseño de agentes y workflows autónomos, gobierno de IA y roadmap estratégico para escalar la organización."}
];
function levelFor(score){ score = Number(score)||0; return LEVELS.find(l=>score>=l.min && score<=l.max) || LEVELS[0]; }

const LABELS = {
  name:"Nombre", company:"Empresa", role:"Rol / función", email:"Email", phone:"WhatsApp",
  team:"Tamaño del equipo", time:"Distribución del tiempo",
  freq:"Frecuencia de uso de IA", plats:"Plataformas que usa", pago:"¿Paga por IA?",
  areas:"Áreas donde usa IA", reaccion:"Método ante un mal output", integracion:"Integración en el equipo",
  funciones:"Funciones avanzadas", conceptos:"Conceptos familiares", aprender:"Qué quiere aprender",
  autonivel:"Autopercepción de nivel",
  score:"Score (0-100)", levelName:"Nivel de dominio", solution:"Solución recomendada",
  event:"Evento", date:"Fecha", source:"Origen"
};

// ====================== EMAIL BRANDEADO (participante) ======================
function resultEmailHtml(name, score, lv){
  var first = (name||"").split(/\s+/)[0] || "";
  return `
  <div style="background:#050505;margin:0;padding:0;">
    <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#050505;">
      <tr><td align="center" style="padding:30px 14px;">
        <table role="presentation" width="600" cellpadding="0" cellspacing="0" style="width:100%;max-width:600px;background:#0b0b0a;border:1px solid rgba(197,139,49,.30);border-radius:14px;overflow:hidden;font-family:Arial,Helvetica,sans-serif;">
          <tr><td style="padding:26px 32px;border-bottom:1px solid rgba(197,139,49,.22);">
            <div style="font-size:11px;letter-spacing:3px;color:#9a9286;text-transform:uppercase;">STANNUM · Diagnóstico Ejecutivo</div>
            <div style="font-size:25px;font-weight:bold;color:#f2eee6;letter-spacing:1px;margin-top:8px;">IA <span style="color:#c58b31;">&amp;</span> WINE <span style="color:#c58b31;">BUENOS AIRES</span></div>
          </td></tr>
          <tr><td style="padding:32px;">
            <p style="color:#f2eee6;font-size:16px;margin:0 0 8px;">Hola ${first},</p>
            <p style="color:#9a9286;font-size:15px;line-height:1.6;margin:0 0 26px;">Este es tu diagnóstico de dominio de IA, calibrado por STANNUM.</p>
            <table role="presentation" width="100%" cellpadding="0" cellspacing="0" style="background:#100d08;border:1px solid rgba(197,139,49,.30);border-radius:12px;">
              <tr><td align="center" style="padding:30px;">
                <div style="font-size:54px;font-weight:bold;color:#f1c56d;line-height:1;">${score}<span style="font-size:20px;color:#9a9286;"> / 100</span></div>
                <div style="font-size:22px;font-weight:bold;color:#f2eee6;text-transform:uppercase;letter-spacing:1px;margin-top:12px;">Nivel ${lv.name}</div>
                <div style="font-size:11px;letter-spacing:2px;color:#c58b31;text-transform:uppercase;margin-top:6px;">${lv.tag}</div>
              </td></tr>
            </table>
            <p style="color:#9a9286;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:28px 0 8px;">Lectura ejecutiva</p>
            <p style="color:#ddd6c9;font-size:15px;line-height:1.7;margin:0;">${lv.desc}</p>
            <p style="color:#9a9286;font-size:11px;letter-spacing:2px;text-transform:uppercase;margin:26px 0 8px;">Recomendación STANNUM</p>
            <div style="color:#f1c56d;font-size:18px;font-weight:bold;text-transform:uppercase;">${lv.sol}</div>
            <p style="color:#9a9286;font-size:14px;line-height:1.6;margin:6px 0 0;">${lv.solD}</p>
            <p style="color:#9a9286;font-size:11px;color:#6b6359;margin:24px 0 0;">Marco de referencia: Microsoft, Work Trend Index 2025 (FRONTIER FIRM).</p>
            <table role="presentation" width="100%"><tr><td style="padding-top:28px;border-top:1px solid rgba(255,255,255,.07);margin-top:20px;">
              <p style="color:#d8d8d8;font-size:15px;line-height:1.6;margin:18px 0 0;">Nos vemos en <b style="color:#f2eee6;">${EVENT}</b>. El equipo de STANNUM se pone en contacto para confirmar tu lugar. Cupo limitado.</p>
            </td></tr></table>
          </td></tr>
          <tr><td style="padding:20px 32px;border-top:1px solid rgba(255,255,255,.08);">
            <div style="color:#6b6359;font-size:12px;">STANNUM · <a href="mailto:comercial@stannum.com.ar" style="color:#9a8a63;text-decoration:none;">comercial@stannum.com.ar</a></div>
          </td></tr>
        </table>
      </td></tr>
    </table>
  </div>`;
}

// ====================== WEBHOOK ======================
function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);
    const score = Number(d.score)||0;
    const lv = levelFor(score);

    // 1) Mail brandeado al participante
    if (d.email) {
      MailApp.sendEmail({
        to: d.email,
        subject: "Tu diagnóstico de dominio IA · " + EVENT,
        htmlBody: resultEmailHtml(d.name, score, lv),
        name: "STANNUM · IA & Wine",
        replyTo: DESTINO_EMAIL
      });
    }

    // 2) Aviso interno a comercial con todos los datos
    const linea = (k) => { let v=d[k]; if(v==null||v==="") return null; if(Array.isArray(v)) v=v.join(", "); return (LABELS[k]||k)+": "+v; };
    const orden = ["name","company","role","email","phone","score","levelName","solution",
      "team","time","freq","plats","pago","areas","reaccion","integracion",
      "funciones","conceptos","aprender","autonivel","event","date","source"];
    MailApp.sendEmail({
      to: DESTINO_EMAIL,
      subject: "IA & Wine — " + (d.name||"lead") + " · " + (d.company||"") + " · Nivel " + lv.name + " (" + score + "/100)",
      body: ["Nueva solicitud — " + EVENT + " (Test de Dominio IA)", ""].concat(orden.map(linea).filter(Boolean)).join("\n"),
      replyTo: d.email || DESTINO_EMAIL
    });

    // 3) Fila en la Sheet
    if (SHEET_ID) {
      SpreadsheetApp.openById(SHEET_ID).getSheets()[0].appendRow([
        new Date(), d.name||"", d.company||"", d.role||"", d.email||"", d.phone||"",
        score, lv.name, d.solution||lv.sol,
        d.team||"", d.freq||"", d.pago||"", d.reaccion||"", d.integracion||"", d.autonivel||""
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok:true })).setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok:false, error:String(err) })).setMimeType(ContentService.MimeType.JSON);
  }
}

// ====================== DASHBOARD PÚBLICO (solo agregados, sin datos personales) ======================
function doGet(e) {
  var out = { ok:true, total:0, avgScore:0,
    levels:{ "Principiante":0, "Intermedio":0, "Avanzado":0, "Experto":0 },
    updated:new Date().toISOString() };
  try {
    if (SHEET_ID) {
      var rows = SpreadsheetApp.openById(SHEET_ID).getSheets()[0].getDataRange().getValues();
      var sum=0, n=0;
      for (var i=1; i<rows.length; i++) {
        var name = (rows[i][1]||"").toString().trim();
        if (!name) continue;                    // fila vacía
        if (/^prueba/i.test(name)) continue;    // descarta filas de prueba
        var score = Number(rows[i][6])||0;
        var lvl = (rows[i][7]||"").toString().trim();
        if (out.levels[lvl] !== undefined) out.levels[lvl]++;
        sum += score; n++;
      }
      out.total = n;
      out.avgScore = n ? Math.round(sum/n) : 0;
    }
  } catch (err) { out.ok=false; out.error=String(err); }

  var json = JSON.stringify(out);
  var cb = e && e.parameter && e.parameter.callback;
  if (cb) return ContentService.createTextOutput(cb+"("+json+")").setMimeType(ContentService.MimeType.JAVASCRIPT);
  return ContentService.createTextOutput(json).setMimeType(ContentService.MimeType.JSON);
}

// ====================== TEST (correlo desde el editor: ▶ con "testEmail") ======================
function testEmail() {
  var score = 72;
  var lv = levelFor(score);
  MailApp.sendEmail({
    to: DESTINO_EMAIL,
    subject: "[PRUEBA] Tu diagnóstico de dominio IA · " + EVENT,
    htmlBody: resultEmailHtml("Carlos Ponte", score, lv),
    name: "STANNUM · IA & Wine",
    replyTo: DESTINO_EMAIL
  });
}
