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
    behavior: "smooth", // Smooth scroll
  });
}

const toggleBtn = document.getElementById("toggle--btn");
const cvImage = document.querySelector(".my_cv");

toggleBtn.addEventListener("click", function () {
  // Check if the CV image is currently hidden
  if (cvImage.style.display === "none" || cvImage.style.display === "") {
    cvImage.style.display = "block"; // Show the CV image
    toggleBtn.textContent = "Hide CV"; // Change button text to "Hide CV"
  } else {
    cvImage.style.display = "none"; // Hide the CV image
    toggleBtn.textContent = "Show CV"; // Change button text back to "Show CV"
  }
});
