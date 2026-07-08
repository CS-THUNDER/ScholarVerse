console.log("ScholarVerse Authentication Loaded 🚀");

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

const card = document.querySelector(".feature-card");
const dots = document.querySelectorAll(".dot");

if (card && dots.length > 0) {
  let current = 0;
  let interval;

  function renderSlide(index) {
    const slide = slides[index];

    card.classList.remove("show");

    setTimeout(() => {
      card.innerHTML = `

        <div class="feature-icon">
            <i data-lucide="${slide.icon}"></i>
        </div>

        <div class="feature-content">

            <h3>${slide.title}</h3>

            <p>${slide.description}</p>

            <ul>

                ${slide.features.map((item) => `<li>✔ ${item}</li>`).join("")}

            </ul>

        </div>

      `;

      lucide.createIcons();

      dots.forEach((dot, i) => {
        dot.classList.toggle("active", i === index);
      });

      card.classList.add("show");
    }, 250);
  }

  function nextSlide() {
    current++;

    if (current >= slides.length) current = 0;

    renderSlide(current);
  }

  function startSlider() {
    interval = setInterval(nextSlide, 5000);
  }

  function stopSlider() {
    clearInterval(interval);
  }

  renderSlide(current);

  startSlider();

  card.addEventListener("mouseenter", stopSlider);

  card.addEventListener("mouseleave", startSlider);

  dots.forEach((dot, index) => {
    dot.addEventListener("click", () => {
      current = index;

      renderSlide(current);

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
    const hidden = passwordInput.type === "password";

    passwordInput.type = hidden ? "text" : "password";

    togglePassword.innerHTML = hidden
      ? '<i data-lucide="eye-off"></i>'
      : '<i data-lucide="eye"></i>';

    lucide.createIcons();
  });
}
