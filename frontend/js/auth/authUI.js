/*
==========================================
ScholarVerse
File: authUI.js
Description: Authentication UI
Author: Sudip Pattanayak
==========================================
*/

console.log("ScholarVerse Authentication UI Loaded 🚀");

/*=========================================
        FEATURE CAROUSEL
=========================================*/

const slides = [
  {
    icon: "brain",
    title: "Smart Study Planner",
    description: "Never wonder what to study next.",
    features: [
      "Adaptive Study Schedule",
      "Revision Planner",
      "Weak Subject Priority",
    ],
  },
  {
    icon: "gamepad-2",
    title: "Gamified Learning",
    description: "Stay motivated every single day.",
    features: ["XP & Levels", "Daily Streaks", "Achievement Badges"],
  },
  {
    icon: "users",
    title: "Community",
    description: "Study together and grow faster.",
    features: ["Ask Seniors", "Discussion Rooms", "Study Groups"],
  },
  {
    icon: "briefcase",
    title: "Career Hub",
    description: "Everything for your career.",
    features: ["Jobs", "Internships", "Hackathons"],
  },
];

const featureCard = document.querySelector(".feature-card");
const dots = document.querySelectorAll(".dot");

if (featureCard && dots.length > 0) {
  let currentSlide = 0;

  let sliderInterval;

  function renderSlide(index) {
    const slide = slides[index];

    featureCard.classList.remove("show");

    setTimeout(() => {
      featureCard.innerHTML = `

        <div class="feature-icon">

            <i data-lucide="${slide.icon}"></i>

        </div>

        <div class="feature-content">

            <h3>${slide.title}</h3>

            <p>${slide.description}</p>

            <ul>

                ${slide.features
                  .map((feature) => `<li>✔ ${feature}</li>`)
                  .join("")}

            </ul>

        </div>

      `;

      lucide.createIcons();

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });

      featureCard.classList.add("show");
    }, 250);
  }

  function nextSlide() {
    currentSlide++;

    if (currentSlide >= slides.length) {
      currentSlide = 0;
    }

    renderSlide(currentSlide);
  }

  function startSlider() {
    sliderInterval = setInterval(nextSlide, 5000);
  }

  function stopSlider() {
    clearInterval(sliderInterval);
  }

  renderSlide(currentSlide);

  startSlider();

  featureCard.addEventListener("mouseenter", stopSlider);

  featureCard.addEventListener("mouseleave", startSlider);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      currentSlide = index;

      renderSlide(currentSlide);

      stopSlider();

      startSlider();
    });
  });
}

/*=========================================
        PASSWORD TOGGLE
=========================================*/

const passwordInput = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

if (passwordInput && togglePassword) {
  togglePassword.addEventListener("click", () => {
    const isHidden = passwordInput.type === "password";

    passwordInput.type = isHidden ? "text" : "password";

    togglePassword.innerHTML = isHidden
      ? '<i data-lucide="eye-off"></i>'
      : '<i data-lucide="eye"></i>';

    lucide.createIcons();
  });
}
