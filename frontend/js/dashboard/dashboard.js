/*
==========================================
ScholarVerse Dashboard
Author: Sudip Pattanayak
==========================================
*/

document.addEventListener("DOMContentLoaded", initializeDashboard);

/*=========================================
        INITIALIZE DASHBOARD
=========================================*/

async function initializeDashboard() {
  if (!Auth.isLoggedIn()) {
    window.location.href = "login.html";

    return;
  }

  loadSidebar("dashboard");

  loadNavbar();

  await loadDashboard();
}

/*=========================================
        LOAD DASHBOARD
=========================================*/

async function loadDashboard() {
  try {
    const response = await DashboardAPI.getDashboard();

    if (!response.success) {
      throw new Error(response.message || "Failed to load dashboard.");
    }

    const { user, stats, profile, recentTasks } = response.data;

    // Save latest user
    Auth.saveUser(user);

    // Refresh navbar
    loadNavbar();

    // Update dashboard
    updateGreeting(user);

    updateStats(stats);

    updateProfileWidgets(profile);

    renderPlannerWidget(recentTasks);

    updateProgress(stats);

    renderRecentActivity(recentTasks);

  } 
  catch (error) {
    console.error("Dashboard Error:", error);
    showDashboardError(error.message);
  }
}

/*=========================================
        GREETING
=========================================*/

function updateGreeting(user) {
  const greeting = document.getElementById("greeting");

  if (!greeting) return;

  const hour = new Date().getHours();

  let wish = "Good Evening";

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
}

/*=========================================
        DASHBOARD STATS
=========================================*/

function updateStats(stats){

    setText("xpValue",stats.xp);

    setText("levelValue",stats.level);

    setText("streakValue",stats.streak);

    setText("taskValue",stats.pendingTasks);

    setText("completedValue",stats.completedTasks);

    setText("progressStat",`${stats.progress}%`);

}

/*=========================================
        PROFILE SUMMARY
=========================================*/
function updateProfileWidgets(profile) {
  setText("goalWidget", profile.goal || "Not Set");

  const universityWidget = document.getElementById("universityWidget");

  if (!universityWidget) return;

  universityWidget.innerHTML = `
        <strong>${profile.university || "Not Set"}</strong>
        <br>
        <small>
            ${profile.course || ""}
            • Semester ${profile.semester || "-"}
        </small>
    `;
}

/*=========================================
        PLANNER WIDGET
=========================================*/

function renderPlannerWidget(tasks) {
  const container = document.getElementById("plannerWidget");

  if (!container) return;

  if (!tasks || tasks.length === 0) {
    container.innerHTML = `

            <p>No study tasks yet 📚</p>

        `;

    return;
  }

  container.innerHTML = tasks
    .map(
      (task) => `

        <div class="planner-mini-task">

            <strong>

                ${task.completed ? "✅" : "📖"}

                ${task.title}

            </strong>

            <small>

                ${task.priority}

                •

                ${formatDate(task.dueDate)}

            </small>

        </div>

    `,
    )
    .join("");
}

/*=========================================
        STUDY PROGRESS
=========================================*/

function updateProgress(stats){

    setText(

        "progressValue",

        `${stats.progress}%`

    );

}

/*=========================================
        RECENT ACTIVITY
=========================================*/

function renderRecentActivity(tasks) {
  const container = document.getElementById("activityWidget");

  if (!container) return;

  if (!tasks || tasks.length === 0) {
    container.innerHTML = `

            <p>No recent activity.</p>

        `;

    return;
  }

  container.innerHTML = tasks
    .map(
      (task) => `

        <div class="activity-item">

            <div class="activity-icon">

                ${task.completed ? "✅" : "📖"}

            </div>

            <div>

                <strong>${task.title}</strong>

                <br>

                <small>

                    ${task.completed ? "Completed" : "Task Created"}

                </small>

            </div>

        </div>

    `,
    )
    .join("");
}

/*=========================================
        DATE FORMATTER
=========================================*/

function formatDate(date) {

    return new Date(date).toLocaleDateString("en-IN", {

        day: "numeric",

        month: "short",

        year: "numeric"

    });

}

/*=========================================
        HELPER
=========================================*/

function setText(id,value){

    const element=document.getElementById(id);

    if(element){

        element.textContent=value;

    }

}

/*=========================================
        ERROR UI
=========================================*/

function showDashboardError(message){

    const dashboard=
        document.getElementById("dashboardContent");

    if(!dashboard) return;

    dashboard.innerHTML=`

        <div class="card">

            <h2>

                ⚠ Dashboard Error

            </h2>

            <p>

                ${message}

            </p>

        </div>

    `;

}
