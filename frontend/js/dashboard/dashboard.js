/*
==========================================
ScholarVerse Dashboard
==========================================
*/

document.addEventListener("DOMContentLoaded", () => {
  if (!Auth.isLoggedIn()) {
    window.location.href = "login.html";

    return;
  }

  loadSidebar("dashboard");

  loadDashboard();
});

async function loadDashboard() {
  try {
    const data = await ProfileAPI.getProfile();

    if (!data.success) return;

    const user = data.user;

    // Update local storage
    Auth.saveUser(user);

    // Refresh navbar with latest user
    loadNavbar();

    // Greeting
    const greeting = document.getElementById("greeting");

    const hour = new Date().getHours();

    let wish;

    if (hour >= 5 && hour < 12) {
      wish = "Good Morning";
    } else if (hour >= 12 && hour < 17) {
      wish = "Good Afternoon";
    } else if (hour >= 17 && hour < 21) {
      wish = "Good Evening";
    } else {
      wish = "Good Night";
    }

    greeting.textContent = `${wish}, ${user.fullName.split(" ")[0]} 👋`;

    document.getElementById("xpValue").textContent = user.xp;

    document.getElementById("levelValue").textContent = user.level;

    document.getElementById("streakValue").textContent = user.streak;

    document.getElementById("taskValue").textContent = "0";
  } catch (error) {
    console.error(error);
  }
}