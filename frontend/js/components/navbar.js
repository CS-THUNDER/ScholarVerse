/*
==========================================
ScholarVerse
Navbar Component
Author: Sudip Pattanayak
==========================================
*/

function getNavbarGreeting() {
  const hour = new Date().getHours();

  if (hour >= 5 && hour < 12) {
    return "Good Morning";
  }

  if (hour >= 12 && hour < 17) {
    return "Good Afternoon";
  }

  if (hour >= 17 && hour < 21) {
    return "Good Evening";
  }

  return "Good Night";
}

function loadNavbar() {
  const navbar = document.getElementById("navbar");

  if (!navbar) return;

  const user = Auth.getUser();

  const fullName = (user?.fullName || "Student")
    .split(" ")
    .map((word) => word.charAt(0).toUpperCase() + word.slice(1))
    .join(" ");

  const firstLetter = fullName.charAt(0).toUpperCase();

  navbar.innerHTML = `

    <header class="dashboard-navbar">

        <div class="dashboard-navbar-left">

    <h2>Dashboard</h2>

    <p class="dashboard-navbar-subtitle">

        Welcome back! Ready to study?

    </p>

</div>

        <div class="dashboard-navbar-right">

            <button class="notification-btn">

                🔔

            </button>

            <div class="user-info">

    <div class="avatar">

        ${firstLetter}

    </div>

    <div class="user-details">

        <span class="user-name">

            ${fullName}

        </span>

        <span class="user-role">

            🎓 Student

        </span>

    </div>

</div>

        </div>

    </header>

    `;
}
