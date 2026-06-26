const year = document.getElementById("year");
const leadForm = document.getElementById("lead-form");
const revealItems = document.querySelectorAll("[data-reveal]");

if (year) {
  year.textContent = new Date().getFullYear();
}

if (leadForm) {
  leadForm.addEventListener("submit", (event) => {
    event.preventDefault();

    const formData = new FormData(leadForm);
    const name = formData.get("name");
    const company = formData.get("company");
    const email = formData.get("email");
    const level = formData.get("level");
    const message = formData.get("message");
    const subject = encodeURIComponent("Solicitud de invitacion - IA & Wine Buenos Aires");
    const body = encodeURIComponent(
      [
        `Nombre: ${name}`,
        `Empresa y cargo: ${company}`,
        `Email: ${email}`,
        `Nivel de IA: ${level}`,
        "",
        "Interes de conversacion:",
        message,
      ].join("\n")
    );

    window.location.href = `mailto:comercial@stannum.com.ar?subject=${subject}&body=${body}`;
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
