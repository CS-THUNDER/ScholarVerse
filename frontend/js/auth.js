console.log("ScholarVerse Authentication Loaded 🚀");

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

  if (current >= slides.length) {
    current = 0;
  }

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

/*=========================================
        PASSWORD TOGGLE
=========================================*/

const password = document.getElementById("password");

const togglePassword = document.getElementById("togglePassword");

togglePassword.addEventListener("click", () => {
  const hidden = password.type === "password";

  password.type = hidden ? "text" : "password";

  togglePassword.innerHTML = hidden
    ? '<i data-lucide="eye-off"></i>'
    : '<i data-lucide="eye"></i>';

  lucide.createIcons();
});

/*=========================================
        LOGIN FORM
=========================================*/

const loginForm = document.querySelector(".login-form");

loginForm.addEventListener("submit", (e) => {
  e.preventDefault();

  const email = document.querySelector('input[type="email"]').value.trim();

  const pass = password.value.trim();

  if (email === "") {
    alert("Please enter your email.");

    return;
  }

  if (pass.length < 6) {
    alert("Password must be at least 6 characters.");

    return;
  }

  const button = document.querySelector(".login-btn");

  button.innerHTML = "Logging in...";

  button.disabled = true;

  setTimeout(() => {
    button.innerHTML = "<span>Login</span>";

    button.disabled = false;

    alert("Frontend Login Successful ✅");
  }, 1200);
});

const form = document.querySelector("form");

if (form) {
  form.addEventListener("submit", (e) => {
    e.preventDefault();

    if (form.classList.contains("login-form")) {
      alert("Login Success (Backend Soon)");
    }

    if (form.classList.contains("register-form")) {
      alert("Registration Success (Backend Soon)");
    }

    if (form.classList.contains("forgot-form")) {
      alert("Reset Link Sent (Backend Soon)");
    }
  });
}

