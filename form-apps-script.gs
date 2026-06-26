/**
 * IA & Wine Buenos Aires — receptor del Test de Dominio IA (test.html).
 *
 * QUÉ HACE: cuando alguien termina el test, recibe el resultado + los datos del
 * participante por mail en comercial@stannum.com.ar y (opcional) los registra en
 * una Google Sheet (una fila por participante, con score y nivel).
 *
 * CÓMO PUBLICARLO (una sola vez):
 *  1. https://script.google.com  →  Nuevo proyecto.
 *  2. Borrá todo y pegá ESTE código. Guardá.
 *  3. (Opcional) Para registrar en planilla: creá una Google Sheet, copiá su ID
 *     (lo que va entre /d/ y /edit en la URL) y pegalo en SHEET_ID.
 *  4. Implementar → Nueva implementación → Tipo: Aplicación web.
 *       - Ejecutar como: Yo
 *       - Quién tiene acceso: Cualquier usuario
 *  5. Autorizá los permisos.
 *  6. Copiá la "URL de la aplicación web" (termina en /exec) y pegásela a Crack
 *     para ponerla en test.html → CONFIG.APPS_SCRIPT_URL.
 */

const DESTINO_EMAIL = "comercial@stannum.com.ar";
const SHEET_ID = ""; // opcional: ID de una Google Sheet para registrar cada participante

// Etiquetas legibles para el mail (las claves que manda test.html)
const LABELS = {
  name:"Nombre", company:"Empresa y cargo", email:"Email", phone:"WhatsApp",
  area:"Área", exp:"Experiencia", reportan:"Personas a cargo",
  tools:"Herramientas que usa/conoce", tareas:"Tareas con IA", barrera:"Principal barrera",
  problema:"Problema a resolver con IA", preocup:"Mayor preocupación", formacion:"Tiempo para formación",
  score:"Score (0-100)", levelName:"Nivel de madurez", solution:"Solución recomendada",
  event:"Evento", date:"Fecha", source:"Origen", levelN:"Nivel (n°)", id:"ID"
};

function doPost(e) {
  try {
    const d = JSON.parse(e.postData.contents);

    const linea = (k) => {
      let v = d[k];
      if (v == null || v === "") return null;
      if (Array.isArray(v)) v = v.join(", ");
      return (LABELS[k] || k) + ": " + v;
    };

    // Orden de campos en el mail
    const orden = ["name","company","email","phone","score","levelName","solution",
      "area","exp","reportan","tools","tareas","barrera","problema","preocup","formacion",
      "event","date","source"];
    const cuerpo = ["Nueva solicitud — IA & Wine Buenos Aires (Test de Dominio IA)", ""]
      .concat(orden.map(linea).filter(Boolean))
      .join("\n");

    MailApp.sendEmail({
      to: DESTINO_EMAIL,
      subject: "IA & Wine — " + (d.name || "lead") + " · " + (d.company || "") +
               " · Nivel " + (d.levelName || "?") + " (" + (d.score != null ? d.score : "?") + "/100)",
      body: cuerpo,
      replyTo: d.email || DESTINO_EMAIL
    });

    if (SHEET_ID) {
      const hoja = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
      hoja.appendRow([
        new Date(), d.name||"", d.company||"", d.email||"", d.phone||"",
        d.score!=null?d.score:"", d.levelName||"", d.solution||"",
        d.area||"", (d.tools||[]).join(", "), (d.tareas||[]).join(", "),
        d.barrera||"", d.problema||"", d.preocup||"", d.formacion||""
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
