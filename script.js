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

const paymentModal = document.getElementById("paymentModal");
const paymentTitle = document.getElementById("paymentTitle");
const selectedPlanName = document.getElementById("selectedPlanName");
const selectedPlanPrice = document.getElementById("selectedPlanPrice");
const selectedPaypal = document.getElementById("selectedPaypal");
const selectedTransfer = document.getElementById("selectedTransfer");
const modalWhatsapp = document.getElementById("modalWhatsapp");

function openPlanModal(plan, price, paypalUrl) {
  paymentTitle.textContent = plan;
  selectedPlanName.textContent = plan;
  selectedPlanPrice.textContent = `$${price}`;
  selectedPaypal.href = paypalUrl;

  const transferMessage = `Hola, quiero pagar por transferencia el plan ${plan} de IA STORE, con un valor de $${price} por dispositivo. Por favor envíame los datos disponibles para realizar el pago.`;
  selectedTransfer.href = whatsappUrl(transferMessage);
  modalWhatsapp.href = whatsappUrl(`Hola, quiero activar el plan ${plan} de IA STORE por $${price}. Ya realicé o voy a realizar el pago y necesito confirmar la activación.`);

  paymentModal.classList.add("open");
  paymentModal.setAttribute("aria-hidden", "false");
  document.body.classList.add("modal-active");
}

function closePaymentModal() {
  paymentModal.classList.remove("open");
  paymentModal.setAttribute("aria-hidden", "true");
  document.body.classList.remove("modal-active");
}

document.querySelectorAll(".plan-button").forEach((button) => {
  button.addEventListener("click", () => {
    openPlanModal(button.dataset.plan, button.dataset.price, button.dataset.paypal);
  });
});

document.getElementById("paypalButton").addEventListener("click", () => {
  openPlanModal("Claude Pro", "9.99", CONFIG.claudeProUrl);
});

document.querySelectorAll("[data-close-modal]").forEach((element) => element.addEventListener("click", closePaymentModal));
document.addEventListener("keydown", (event) => {
  if (event.key === "Escape") closePaymentModal();
});

selectedPaypal.addEventListener("click", () => {
  const plan = paymentTitle.textContent;
  const price = selectedPlanPrice.textContent;
  modalWhatsapp.href = whatsappUrl(`Hola, voy a pagar el plan ${plan} por $${price.replace('$','')}. Después de completar el pago, quiero activar mi acceso.`);
});

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
