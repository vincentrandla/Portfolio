"use strict";

const section1 = document.querySelector("#section--1");

// Smooth navigation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  if (!e.target.classList.contains("nav__link")) return;

  const id = e.target.getAttribute("href");

  // For external links to work in navbar
  if (id.startsWith("#")) {
    e.preventDefault();
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// Reveal sections
const allSections = document.querySelectorAll(".section");

const revealSection = function (entries, observer) {
  const [entry] = entries;

  if (!entry.isIntersecting) return;

  entry.target.classList.remove("section--hidden");
  observer.unobserve(entry.target);
};

const sectionObserver = new IntersectionObserver(revealSection, {
  root: null,
  threshold: 0.1,
});

allSections.forEach(function (section) {
  sectionObserver.observe(section);
  section.classList.add("section--hidden");
});

const goUpButton = document.getElementById("goUpButton");

// Show the button when scrolling down
window.addEventListener("scroll", function () {
  if (window.pageYOffset > 100) {
    goUpButton.style.display = "block";
  } else {
    goUpButton.style.display = "none";
  }
});

// Scroll to the top when the button is clicked
function goUp() {
  window.scrollTo({
    top: 0,
    behavior: "smooth",
  });
}

// Slider image

document.addEventListener("DOMContentLoaded", function () {
  const images = document.querySelectorAll(".reisi_picture");
  const leftArrow = document.querySelector(".left_arrow");
  const rightArrow = document.querySelector(".right_arrow");
  let currentImageIndex = 0;

  images[currentImageIndex].classList.add("active");

  leftArrow.addEventListener("click", function () {
    images[currentImageIndex].classList.remove("active");
    currentImageIndex =
      currentImageIndex === 0 ? images.length - 1 : currentImageIndex - 1;
    images[currentImageIndex].classList.add("active");
  });

  rightArrow.addEventListener("click", function () {
    images[currentImageIndex].classList.remove("active");
    currentImageIndex =
      currentImageIndex === images.length - 1 ? 0 : currentImageIndex + 1;
    images[currentImageIndex].classList.add("active");
  });
});

// Dots for slider images

document.addEventListener("DOMContentLoaded", () => {
  const dotsContainer = document.querySelector(".dot_container");
  const slides = document.querySelectorAll(".reisi_picture");
  let currentSlide = 0;

  slides.forEach((_, index) => {
    const dot = document.createElement("span");
    dot.classList.add("dot");
    dot.addEventListener("click", () => goToSlide(index));
    dotsContainer.appendChild(dot);
  });

  const dots = document.querySelectorAll(".dot");

  function updateDots() {
    dots.forEach((dot, index) => {
      dot.classList.toggle("active", index === currentSlide);
    });
  }

  function goToSlide(index) {
    slides[currentSlide].classList.remove("active");
    dots[currentSlide].classList.remove("active");
    currentSlide = index;
    slides[currentSlide].classList.add("active");
    dots[currentSlide].classList.add("active");
  }

  function showNextSlide() {
    const nextSlide = (currentSlide + 1) % slides.length;
    goToSlide(nextSlide);
  }

  function showPreviousSlide() {
    const prevSlide = (currentSlide - 1 + slides.length) % slides.length;
    goToSlide(prevSlide);
  }

  updateDots();

  document
    .querySelector(".right_arrow")
    .addEventListener("click", showNextSlide);
  document
    .querySelector(".left_arrow")
    .addEventListener("click", showPreviousSlide);
});

// Mobile hamburger menu dropdown

function toggleDropdown(event) {
  const dropdownContent = document.getElementById("dropdownContent");
  if (dropdownContent.style.display == "block") {
    dropdownContent.style.display = "none";
  } else {
    dropdownContent.style.display = "block";
  }
  changeMenu(event.currentTarget);
}

function changeMenu(element) {
  element.classList.toggle("change");
}

// Underline for navbar headlines

const sections = document.querySelectorAll("section");
const navLinks = document.querySelectorAll(".dropdown-content .nav__link");

const observer = new IntersectionObserver(
  (entries) => {
    entries.forEach((entry) => {
      if (entry.isIntersecting) {
        // Remove active from every link
        navLinks.forEach((link) => {
          link.classList.remove("active");
        });

        // Find the link matching this section
        const activeLink = document.querySelector(
          `.nav__link[href="#${entry.target.id}"]`,
        );

        // Add active
        if (activeLink) {
          activeLink.classList.add("active");
        }
      }
    });
  },
  {
    threshold: 0.5,
  },
);

sections.forEach((section) => {
  observer.observe(section);
});

const projects = [
  {
    title: "Reisigalerii",
    description:
      "A travel agency website for the Estonian market. Users browse by country, then connect with a real agent to finalize the booking.",
    thumbnail: "/Assets/screenshot-home.png",
    demoUrl: "https://reisigalerii-frontend.vercel.app/",
    repoUrl: "https://github.com/vincentrandla/Reisigalerii-frontend",
  },
  {
    title: "What's for Dinner?",
    description:
      "A small fun project to get dinner ideas. Learned how to use and consume public API endpoints.",
    thumbnail: "/Assets/whatsfordinnerpic.png",
    demoUrl: "https://dinner-ideas.netlify.app/",
    repoUrl: "https://github.com/vincentrandla/What-s-for-Dinner",
  },
];

const carousel = document.getElementById("carousel");
const dotsWrap = document.getElementById("dots");
let current = 0;
let cardEls = [];

function buildCards() {
  projects.forEach((p, i) => {
    const card = document.createElement("div");
    card.className = "card";
    card.innerHTML = `
        <img class="thumb" src="${p.thumbnail}" alt="${p.title}" />
        <div class="body">
          <h3>${p.title}</h3>
          <p>${p.description}</p>
          <div class="links">
            <a href="${p.demoUrl}" target="_blank" rel="noopener">Live demo</a>
            <a href="${p.repoUrl}" target="_blank" rel="noopener">GitHub</a>
          </div>
        </div>
      `;
    card.addEventListener("click", () => goTo(i));
    carousel.appendChild(card);
    cardEls.push(card);
  });

  projects.forEach((_, i) => {
    const dot = document.createElement("div");
    dot.className = "dot";
    dot.addEventListener("click", () => goTo(i));
    dotsWrap.appendChild(dot);
  });
}

function render() {
  const dots = dotsWrap.children;
  cardEls.forEach((card, i) => {
    const offset = i - current;
    const abs = Math.abs(offset);

    let opacity = 1;
    let zIndex = 10 - abs;
    const x = offset * 200;
    const scale = 1 - abs * 0.18;
    const rotate = offset * -22;
    opacity = abs > 3 ? 0 : 1 - abs * 0.3;

    card.style.transform = `translate(-50%, 0) translateX(${x}px) scale(${scale}) rotateY(${rotate}deg)`;
    card.style.opacity = opacity;
    card.style.zIndex = zIndex;
    card.style.filter = abs === 0 ? "brightness(1)" : "brightness(0.55)";
    card.classList.toggle("active", i === current);
  });

  Array.from(dots).forEach((dot, i) => {
    dot.classList.toggle("active", i === current);
  });
}

function goTo(index) {
  current = (index + projects.length) % projects.length;
  render();
}

document
  .getElementById("prevBtn")
  .addEventListener("click", () => goTo(current - 1));
document
  .getElementById("nextBtn")
  .addEventListener("click", () => goTo(current + 1));

buildCards();
render();
