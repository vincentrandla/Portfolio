"use strict";

const section1 = document.querySelector("#section--1");

// Smooth navigation
document.querySelector(".nav__links").addEventListener("click", function (e) {
  e.preventDefault();

  // Matching strategy
  if (e.target.classList.contains("nav__link")) {
    const id = e.target.getAttribute("href");
    document.querySelector(id).scrollIntoView({ behavior: "smooth" });
  }
});

// // Reveal sections
// const allSections = document.querySelectorAll(".section");

// const revealSection = function (entries, observer) {
//   const [entry] = entries;

//   if (!entry.isIntersecting) return;

//   entry.target.classList.remove("section--hidden");
//   observer.unobserve(entry.target);
// };

// const sectionObserver = new IntersectionObserver(revealSection, {
//   root: null,
//   threshold: 0.1,
// });

// allSections.forEach(function (section) {
//   sectionObserver.observe(section);
//   section.classList.add("section--hidden");
// });

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

// Hiding / displaying CV
const toggleBtn = document.getElementById("toggle--btn");
const cvImage = document.querySelector(".my_cv");

toggleBtn.addEventListener("click", function () {
  if (cvImage.style.display === "none" || cvImage.style.display === "") {
    cvImage.style.display = "block";
    toggleBtn.textContent = "Hide CV";
  } else {
    cvImage.style.display = "none";
    toggleBtn.textContent = "Show CV";
  }
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
