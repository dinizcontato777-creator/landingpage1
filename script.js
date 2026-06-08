const navToggle = document.querySelector(".nav-toggle");
const siteNav = document.querySelector(".site-nav");

if (navToggle && siteNav) {
  navToggle.addEventListener("click", () => {
    const isOpen = siteNav.classList.toggle("is-open");
    navToggle.setAttribute("aria-expanded", String(isOpen));
  });

  siteNav.addEventListener("click", (event) => {
    if (event.target instanceof HTMLAnchorElement) {
      siteNav.classList.remove("is-open");
      navToggle.setAttribute("aria-expanded", "false");
    }
  });
}

const revealItems = document.querySelectorAll("[data-reveal]");
const revealObserver = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        entry.target.classList.add("is-visible");
        revealObserver.unobserve(entry.target);
      }
    });
  },
  { threshold: 0.12 }
);

revealItems.forEach((item) => revealObserver.observe(item));

const testimonials = [...document.querySelectorAll(".testimonial")];
const prevButton = document.querySelector("[data-testimonial-prev]");
const nextButton = document.querySelector("[data-testimonial-next]");
let activeTestimonial = 0;

function showTestimonial(index) {
  testimonials.forEach((item) => item.classList.remove("active"));
  activeTestimonial = (index + testimonials.length) % testimonials.length;
  testimonials[activeTestimonial].classList.add("active");
}

if (testimonials.length && prevButton && nextButton) {
  prevButton.addEventListener("click", () => showTestimonial(activeTestimonial - 1));
  nextButton.addEventListener("click", () => showTestimonial(activeTestimonial + 1));

  window.setInterval(() => {
    showTestimonial(activeTestimonial + 1);
  }, 6200);
}

const parallaxItems = document.querySelectorAll("[data-parallax]");

window.addEventListener(
  "scroll",
  () => {
    const offset = window.scrollY * 0.035;
    parallaxItems.forEach((item) => {
      item.style.transform = `translate3d(0, ${offset}px, 0)`;
    });
  },
  { passive: true }
);

document.querySelectorAll("[data-video-slot] .play-button").forEach((button) => {
  button.addEventListener("click", () => {
    const slot = button.closest("[data-video-slot]")?.getAttribute("data-video-slot");
    window.alert(`Video "${slot}" ainda nao foi adicionado. Envie o arquivo ou link que eu substituo este placeholder.`);
  });
});

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
