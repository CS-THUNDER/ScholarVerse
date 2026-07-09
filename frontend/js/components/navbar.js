/*
==========================================
ScholarVerse
Navbar Component
Author: Sudip Pattanayak
==========================================
*/

function loadNavbar() {
  const navbar = document.getElementById("navbar");

  if (!navbar) return;

  const user = Auth.getUser();

  const fullName = user?.fullName || "Student";

  const firstLetter = fullName.charAt(0).toUpperCase();

  navbar.innerHTML = `

    <header class="navbar">

        <div>

            <h2>Welcome Back 👋</h2>

        </div>

        <div class="navbar-right">

            <button class="notification-btn">

                🔔

            </button>

            <div class="user-info">

                <div class="avatar">

                    ${firstLetter}

                </div>

                <span>

                    ${fullName}

                </span>

            </div>

        </div>

    </header>

    `;
}
