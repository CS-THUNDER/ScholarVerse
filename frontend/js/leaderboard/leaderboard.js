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

  await loadLeaderboard("weekly");

  initializeTabs();
}

/*=========================================
        LOAD LEADERBOARD
=========================================*/

async function loadLeaderboard(season = "weekly") {

    try{

        const response =
            await LeaderboardAPI.getLeaderboard(season);

        if(!response.success){

            throw new Error(response.message);

        }

        renderLeaderboard(
            response.users,
            season
        );

        updateJourney(
            response,
            season
        );

        updateSeason(response);

    }

    catch(error){

        console.error(error);

        showToast(
            "error",
            "Leaderboard",
            error.message
        );

    }

}

/*=========================================
        RENDER
=========================================*/

function renderLeaderboard(users, season){

    renderPodium(users, season);

    renderRanking(users, season);

}

/*=========================================
        PODIUM
=========================================*/

function renderPodium(users, season){

    if(users[0]){

        updatePodiumCard(
            "first",
            users[0],
            season
        );

    }

    if(users[1]){

        updatePodiumCard(
            "second",
            users[1],
            season
        );

    }

    if(users[2]){

        updatePodiumCard(
            "third",
            users[2],
            season
        );

    }

}

function updatePodiumCard(position, user, season) {
  document.getElementById(`${position}Avatar`).textContent = user.fullName
    .charAt(0)
    .toUpperCase();

  document.getElementById(`${position}Name`).textContent = user.fullName;

  document.getElementById(`${position}Course`).textContent =
    user.course || "Student";

  const seasonXP = user.xp;

  document.getElementById(`${position}XP`).textContent =
    `Lv ${user.level} • ${seasonXP} XP`;
}

/*=========================================
        RANKING LIST
=========================================*/

function renderRanking(users,season){

    const container =
        document.getElementById("leaderboardRows");

    container.innerHTML="";

    const currentUser =
        Auth.getUser();

    if(users.length<=3){

        container.innerHTML=`

            <div class="empty-state">

                🚀 Invite your friends to compete!

            </div>

        `;

        return;

    }

    users.slice(3).forEach((user,index)=>{

        container.innerHTML+=createRow(

            user,

            index+4,

            currentUser &&
            currentUser._id===user._id,

            season

        );

    });

}

function createRow(user, rank, isMe, season) {

 const seasonXP = user.xp;

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

                ⭐ ${seasonXP}

            </div>

        </div>

    `;
}

/*=========================================
        Your Journey
=========================================*/

function updateJourney(data, season) {
  document.getElementById("userRank").textContent = "#" + data.currentUserRank;

  const seasonXP = data.currentUser.xp;

  document.getElementById("journeyXP").textContent = `⭐ ${seasonXP} XP`;

  document.getElementById("journeyText").textContent =
    data.currentUserRank <= 100
      ? "🔥 You're inside Top 100!"
      : `Need ${data.xpNeeded} XP to enter Top 100`;

  document.getElementById("journeyPercent").textContent =
    `${Math.round(data.progress)}%`;

  document.getElementById("journeyProgress").style.width = `${data.progress}%`;
}

/*=========================================
        UPDATE SEASON
=========================================*/

function updateSeason(data) {
  document.getElementById("participantCount").textContent = data.participants;
}

/*=========================================
        TABS
=========================================*/

function initializeTabs() {
  console.log("Tabs Initialized");

  const tabs = document.querySelectorAll(".leaderboard-tab");

  console.log(tabs);

  tabs.forEach((tab) => {
    tab.addEventListener("click", async () => {
      console.log("Clicked", tab.dataset.season);

      tabs.forEach((t) => t.classList.remove("active"));

      tab.classList.add("active");

      const season = tab.dataset.season;

      await loadLeaderboard(season);
    });
  });
}