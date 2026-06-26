// Pegá acá la URL del Web App de Google Apps Script (termina en /exec).
// Mientras esté vacío, el formulario cae al modo mail (mailto) como respaldo.
const APPS_SCRIPT_URL = "";

const year = document.getElementById("year");
const leadForm = document.getElementById("lead-form");
const revealItems = document.querySelectorAll("[data-reveal]");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (leadForm) {
  const statusEl = document.getElementById("form-status");
  const submitBtn = leadForm.querySelector('button[type="submit"]');

  const setStatus = (msg, kind) => {
    if (!statusEl) return;
    statusEl.textContent = msg;
    statusEl.className = "form-status" + (kind ? " is-" + kind : "");
  };

  leadForm.addEventListener("submit", async (event) => {
    event.preventDefault();

    const data = Object.fromEntries(new FormData(leadForm).entries());

    // Respaldo: si todavía no hay endpoint configurado, abrir el cliente de mail.
    if (!APPS_SCRIPT_URL) {
      const subject = encodeURIComponent("Solicitud de invitacion - IA & Wine Buenos Aires");
      const body = encodeURIComponent(
        [
          `Nombre: ${data.name}`,
          `Empresa y cargo: ${data.company}`,
          `Email: ${data.email}`,
          `Nivel de IA: ${data.level}`,
          "",
          "Interes de conversacion:",
          data.message,
        ].join("\n")
      );
      window.location.href = `mailto:comercial@stannum.com.ar?subject=${subject}&body=${body}`;
      return;
    }

    submitBtn.disabled = true;
    submitBtn.textContent = "Enviando...";
    setStatus("", "");

    try {
      await fetch(APPS_SCRIPT_URL, {
        method: "POST",
        mode: "no-cors",
        body: JSON.stringify({
          ...data,
          source: "landing-ia-wine",
          ts: new Date().toISOString(),
        }),
      });
      leadForm.reset();
      setStatus("¡Listo! Recibimos tu solicitud. Te contactamos a la brevedad.", "ok");
    } catch (err) {
      setStatus(
        "No pudimos enviar la solicitud. Escribinos a comercial@stannum.com.ar.",
        "error"
      );
    } finally {
      submitBtn.disabled = false;
      submitBtn.textContent = "Enviar solicitud";
    }
  });
}

if ("IntersectionObserver" in window) {
  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        if (entry.isIntersecting) {
          entry.target.classList.add("is-visible");
          observer.unobserve(entry.target);
        }
      });
    },
    { threshold: 0.14 }
  );

  revealItems.forEach((item) => observer.observe(item));
} else {
  revealItems.forEach((item) => item.classList.add("is-visible"));
}
