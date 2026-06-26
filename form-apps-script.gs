/**
 * IA & Wine Buenos Aires — receptor del formulario de la landing.
 *
 * QUÉ HACE: cuando alguien completa el form, le manda el lead por mail a
 * comercial@stannum.com.ar y (opcional) lo registra en una Google Sheet.
 *
 * CÓMO PUBLICARLO (una sola vez):
 *  1. Entrá a https://script.google.com  →  Nuevo proyecto.
 *  2. Borrá todo y pegá ESTE código. Guardá.
 *  3. (Opcional) Para registrar en una planilla: creá una Google Sheet,
 *     copiá su ID (lo que va entre /d/ y /edit en la URL) y pegalo en SHEET_ID.
 *  4. Implementar  →  Nueva implementación  →  Tipo: Aplicación web.
 *       - Descripción: IA & Wine form
 *       - Ejecutar como: Yo (tu cuenta de Google)
 *       - Quién tiene acceso: Cualquier usuario
 *  5. Autorizá los permisos cuando los pida.
 *  6. Copiá la "URL de la aplicación web" (termina en /exec)
 *     y pasásela a Crack para enchufarla en script.js (constante APPS_SCRIPT_URL).
 */

const DESTINO_EMAIL = "comercial@stannum.com.ar";
const SHEET_ID = ""; // opcional: ID de una Google Sheet para registrar cada lead

function doPost(e) {
  try {
    const data = JSON.parse(e.postData.contents);

    // 1) Notificación por mail al equipo comercial
    const cuerpo = [
      "Nueva solicitud — IA & Wine Buenos Aires",
      "",
      "Nombre: " + (data.name || ""),
      "Empresa y cargo: " + (data.company || ""),
      "Email: " + (data.email || ""),
      "Nivel de uso de IA: " + (data.level || ""),
      "",
      "Qué le interesa conversar:",
      (data.message || ""),
      "",
      "Origen: " + (data.source || "") + "  ·  " + (data.ts || ""),
    ].join("\n");

    MailApp.sendEmail({
      to: DESTINO_EMAIL,
      subject: "Solicitud IA & Wine — " + (data.company || data.name || "nuevo lead"),
      body: cuerpo,
      replyTo: data.email || DESTINO_EMAIL,
    });

    // 2) Registro opcional en Google Sheet
    if (SHEET_ID) {
      const hoja = SpreadsheetApp.openById(SHEET_ID).getSheets()[0];
      hoja.appendRow([
        new Date(),
        data.name || "",
        data.company || "",
        data.email || "",
        data.level || "",
        data.message || "",
        data.source || "",
      ]);
    }

    return ContentService.createTextOutput(JSON.stringify({ ok: true }))
      .setMimeType(ContentService.MimeType.JSON);
  } catch (err) {
    return ContentService.createTextOutput(JSON.stringify({ ok: false, error: String(err) }))
      .setMimeType(ContentService.MimeType.JSON);
  }
}
