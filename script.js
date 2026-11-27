const CONFIG = {
  whatsapp: "593982402878",
  claudeProUrl: "https://www.paypal.com/ncp/payment/TL4M6XHNXC3F6",
  claudeMaxUrl: "https://www.paypal.com/ncp/payment/SNWG9A9946RUA",
  ecuadorWhatsappMessage: "Hola, soy de Ecuador y quiero comprar Claude Pro por $9.99 al mes. ¿Cómo puedo pagar y recibir mi acceso?"
};

function whatsappUrl(message) {
  return `https://wa.me/${CONFIG.whatsapp}?text=${encodeURIComponent(message)}`;
}

const defaultMessage = "Hola, quiero información sobre Claude Pro de IA STORE.";

for (const id of ["navWhatsapp", "heroWhatsapp", "ecuadorWhatsapp"]) {
  const element = document.getElementById(id);
  if (!element) continue;
  element.href = whatsappUrl(id === "ecuadorWhatsapp" ? CONFIG.ecuadorWhatsappMessage : defaultMessage);
}

document.querySelectorAll(".plan-button").forEach((button) => {
  button.addEventListener("click", () => {
    const plan = button.dataset.plan;
    const message = `Hola, quiero solicitar el plan: ${plan}. Mi pago será por el dispositivo que voy a utilizar. ¿Cuál es el siguiente paso?`;
    window.open(whatsappUrl(message), "_blank", "noopener");
  });
});

const paymentModal = document.getElementById("paymentModal");
const modalWhatsapp = document.getElementById("modalWhatsapp");

function openPaymentModal() {
  paymentModal.classList.add("open");
  paymentModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-active");
}

function closePaymentModal() {
  paymentModal.classList.remove("open");
  paymentModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-active");
}

document.getElementById("paypalButton").addEventListener("click", openPaymentModal);
document.querySelectorAll("[data-close-modal]").forEach((element) => element.addEventListener("click", closePaymentModal));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePaymentModal();
});

modalWhatsapp.href = whatsappUrl("Hola, ya realicé el pago. Quiero contactar con IA STORE para activar el acceso a mi plan de Claude.");

document.querySelectorAll("[data-paypal-plan]").forEach((link) => {
  link.addEventListener("click", () => {
    const plan = link.dataset.paypalPlan;
    modalWhatsapp.href = whatsappUrl(`Hola, voy a pagar el plan ${plan} por PayPal. Después de completar el pago, quiero activar mi acceso.`);
  });
});

const welcome = document.getElementById("welcome");
if (welcome) welcome.remove();
document.body.classList.remove("welcome-active", "modal-active");

const nav = document.querySelector(".nav");
window.addEventListener("scroll", () => {
  nav.classList.toggle("scrolled", window.scrollY > 80);
}, { passive: true });

const observer = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      entry.target.classList.add("visible");
      observer.unobserve(entry.target);
    }
  });
}, { threshold: 0.12 });

document.querySelectorAll(".reveal").forEach((element) => observer.observe(element));

document.getElementById("year").textContent = new Date().getFullYear();
