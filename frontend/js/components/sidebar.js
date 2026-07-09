/*
==========================================
ScholarVerse
Sidebar Component
Author: Sudip Pattanayak
==========================================
*/

function loadSidebar(activePage = "dashboard") {
  const sidebar = document.getElementById("sidebar");

  if (!sidebar) return;

  sidebar.innerHTML = `

    <aside class="sidebar">

        <div class="sidebar-logo">

            <a href="../index.html">

                Scholar<span>Verse</span>

            </a>

        </div>

        <nav class="sidebar-menu">

            <a href="dashboard.html"
               class="${activePage === "dashboard" ? "active" : ""}">
                🏠 Dashboard
            </a>

            <a href="planner.html"
               class="${activePage === "planner" ? "active" : ""}">
                📅 Planner
            </a>

            <a href="community.html"
               class="${activePage === "community" ? "active" : ""}">
                👥 Community
            </a>

            <a href="leaderboard.html"
               class="${activePage === "leaderboard" ? "active" : ""}">
                🏆 Leaderboard
            </a>

            <a href="profile.html"
               class="${activePage === "profile" ? "active" : ""}">
                👤 Profile
            </a>

            <a href="settings.html"
               class="${activePage === "settings" ? "active" : ""}">
                ⚙ Settings
            </a>

            <a href="help.html"
               class="${activePage === "help" ? "active" : ""}">
                ❓ Help
            </a>

        </nav>

        <button id="logoutBtn"
                class="logout-btn">

            🚪 Logout

        </button>

    </aside>

    `;

  const logoutBtn = document.getElementById("logoutBtn");

  if (logoutBtn) {
    logoutBtn.addEventListener("click", () => {
      Auth.logout();
    });
  }
}
