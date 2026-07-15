/*
==========================================
ScholarVerse
Leaderboard
Author: Sudip Pattanayak
==========================================
*/

document.addEventListener("DOMContentLoaded", initializeLeaderboard);

/*=========================================
        INITIALIZE
=========================================*/

async function initializeLeaderboard() {
  if (!Auth.isLoggedIn()) {
    window.location.href = "login.html";

    return;
  }

  loadSidebar("leaderboard");

  await loadLeaderboard();
}

/*=========================================
        LOAD LEADERBOARD
=========================================*/

async function loadLeaderboard() {
  try {
    const response = await LeaderboardAPI.getLeaderboard();

    if (!response.success) {
      throw new Error(response.message);
    }

    renderLeaderboard(response.users);
  } catch (error) {
    console.error(error);

    showToast("error", "Leaderboard", error.message);
  }
}

/*=========================================
        RENDER
=========================================*/

function renderLeaderboard(users) {
  renderPodium(users);

  renderRanking(users);
}

/*=========================================
        PODIUM
=========================================*/

function renderPodium(users) {
  if (users.length < 3) return;

  const first = users[0];

  const second = users[1];

  const third = users[2];

  updatePodiumCard("first", first);

  updatePodiumCard("second", second);

  updatePodiumCard("third", third);
}

function updatePodiumCard(position, user) {
  document.getElementById(`${position}Avatar`).textContent = user.fullName
    .charAt(0)
    .toUpperCase();

  document.getElementById(`${position}Name`).textContent = user.fullName;

  document.getElementById(`${position}Course`).textContent =
    user.course || "Student";

  document.getElementById(`${position}XP`).textContent =
    `Lv ${user.level} • ${user.xp} XP`;
}

/*=========================================
        RANKING LIST
=========================================*/

function renderRanking(users) {
  const container = document.getElementById("leaderboardRows");

  container.innerHTML = "";

  const currentUser = Auth.getUser();

  users.slice(3).forEach((user, index) => {
    const rank = index + 4;

    const isMe = currentUser && currentUser._id === user._id;

    container.innerHTML += createRow(user, rank, isMe);
  });
}

function createRow(user, rank, isMe) {
  return `

        <div class="leaderboard-row ${isMe ? "me" : ""}">

            <div class="rank">

                #${rank}

            </div>

            <div class="student-info">

                <div class="rank-avatar">

                    ${user.fullName.charAt(0).toUpperCase()}

                </div>

                <div>

                    <h4>

                        ${user.fullName}

                        ${isMe ? " ⭐ You" : ""}

                    </h4>

                    <small>

                        ${user.course || "Student"}

                    </small>

                </div>

            </div>

            <div>

                <span class="level-badge">

                    Lv ${user.level}

                </span>

            </div>

            <div class="xp">

                ⭐ ${user.xp}

            </div>

        </div>

    `;
}
