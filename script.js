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
