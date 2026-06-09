const floatingVideo = document.querySelector("[data-floating-video]");
const floatingVideoClose = document.querySelector(".floating-video-close");
let floatingVideoDismissed = false;

function updateFloatingVideo() {
  if (!floatingVideo || floatingVideoDismissed) return;
  floatingVideo.classList.toggle("is-visible", window.scrollY > 520);
}

if (floatingVideo) {
  updateFloatingVideo();
  window.addEventListener("scroll", updateFloatingVideo, { passive: true });
}

if (floatingVideoClose && floatingVideo) {
  floatingVideoClose.addEventListener("click", (event) => {
    event.stopPropagation();
    floatingVideoDismissed = true;
    floatingVideo.classList.add("is-dismissed");
  });
}

const seatsElements = document.querySelectorAll("[data-seats-left]");
const seatsKey = "antiAgenciaSeats";
const now = Date.now();
let seatsState;

try {
  seatsState = JSON.parse(localStorage.getItem(seatsKey) || "null");
} catch {
  seatsState = null;
}

if (!seatsState || now - seatsState.createdAt > 24 * 60 * 60 * 1000) {
  seatsState = {
    createdAt: now,
    lastDropAt: now,
    seats: Math.floor(Math.random() * 17) + 7,
  };
}

const hoursPassed = Math.floor((now - seatsState.lastDropAt) / (60 * 60 * 1000));
if (hoursPassed > 0) {
  seatsState.seats = Math.max(3, seatsState.seats - hoursPassed);
  seatsState.lastDropAt = now;
}

localStorage.setItem(seatsKey, JSON.stringify(seatsState));
seatsElements.forEach((element) => {
  element.textContent = String(seatsState.seats);
});

const mobileSticky = document.querySelector("[data-mobile-sticky]");

function updateMobileSticky() {
  if (!mobileSticky) return;
  const maxScroll = document.documentElement.scrollHeight - window.innerHeight;
  const progress = maxScroll > 0 ? window.scrollY / maxScroll : 0;
  mobileSticky.classList.toggle("is-visible", progress > 0.5);
}

if (mobileSticky) {
  updateMobileSticky();
  window.addEventListener("scroll", updateMobileSticky, { passive: true });
}

document.querySelectorAll(".faq-question").forEach((button) => {
  button.addEventListener("click", () => {
    const answer = button.nextElementSibling;
    const isOpen = button.classList.contains("is-open");

    document.querySelectorAll(".faq-question").forEach((item) => item.classList.remove("is-open"));
    document.querySelectorAll(".faq-answer").forEach((item) => {
      item.style.maxHeight = null;
    });

    if (!isOpen && answer) {
      button.classList.add("is-open");
      answer.style.maxHeight = `${answer.scrollHeight}px`;
    }
  });
});

const showTestimonialsButton = document.querySelector("[data-show-testimonials]");
const testimonialGrid = document.querySelector("[data-testimonial-grid]");

if (showTestimonialsButton && testimonialGrid) {
  showTestimonialsButton.addEventListener("click", () => {
    testimonialGrid.classList.toggle("is-expanded");
    showTestimonialsButton.textContent = testimonialGrid.classList.contains("is-expanded")
      ? "Ver menos entregaveis"
      : "Ver mais entregaveis";
  });
}
