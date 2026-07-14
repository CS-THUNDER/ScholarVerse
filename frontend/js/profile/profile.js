/*
==========================================
ScholarVerse
Profile Module
Author: Sudip Pattanayak
==========================================
*/

document.addEventListener("DOMContentLoaded", initializeProfile);

/*=========================================
        INITIALIZE
=========================================*/

async function initializeProfile() {
  if (!Auth.isLoggedIn()) {
    window.location.href = "login.html";

    return;
  }

  loadSidebar("profile");

  //   loadNavbar();

  await loadProfile();

  await loadStudyOverview();

  initializeProfileForm();
}

/*=========================================
        LOAD PROFILE
=========================================*/

async function loadProfile() {
  try {
    const response = await ProfileAPI.getProfile();

    if (!response.success) {
      throw new Error(response.message);
    }

    const user = response.user;

    populateProfile(user);
  } catch (error) {
    console.error(error);

    showToast(error.message, "error");
  }
}

/*=========================================
        LOAD STUDY OVERVIEW
=========================================*/

async function loadStudyOverview() {
  try {
    const response = await DashboardAPI.getDashboard();

    if (!response.success) {
      throw new Error(response.message);
    }

    const { stats, user } = response.data;

    // Study Overview

    document.getElementById("completedTasks").textContent =
      stats.completedTasks;

    document.getElementById("pendingTasks").textContent = stats.pendingTasks;

    document.getElementById("studyProgress").textContent = `${stats.progress}%`;

    // Dynamic Achievements

    updateAchievements(user, stats);
  } catch (error) {
    console.error(error);

    showToast(error.message, "error");
  }
}

/*=========================================
        POPULATE UI
=========================================*/

function populateProfile(user) {
  // Save latest user

  Auth.saveUser(user);

  //   loadNavbar();

  // Avatar

  document.getElementById("profileAvatar").textContent = user.fullName
    .charAt(0)
    .toUpperCase();

  // Basic Info

  document.getElementById("profileName").textContent = user.fullName;

  document.getElementById("profileEmail").textContent = user.email;

  // Form

  document.getElementById("university").value = user.university || "";

  document.getElementById("course").value = user.course || "";

  document.getElementById("semester").value = user.semester || "";

  document.getElementById("goal").value = user.goal || "";

  document.getElementById("experience").value = user.experience || "Beginner";

  // Left Card

  // Left Card

  document.getElementById("profileXP").textContent = user.xp;

  document.getElementById("profileLevel").textContent = user.level;

  document.getElementById("profileStreak").textContent = `${user.streak} Days`;

  // XP Progress

  const currentXP = user.xp % 100;

  const remainingXP = 100 - currentXP;

  document.getElementById("xpText").textContent = `${currentXP} / 100 XP`;

  document.getElementById("xpRemaining").textContent =
    `${remainingXP} XP until Level ${user.level + 1}`;

  const xpFill = document.getElementById("xpFill");

  xpFill.style.width = "0%";

  setTimeout(() => {
    xpFill.style.width = `${currentXP}%`;
  }, 100);
}

/*=========================================
        SAVE PROFILE
=========================================*/

function initializeProfileForm() {
  const form = document.getElementById("profileForm");

  form.addEventListener("submit", saveProfile);
}

async function saveProfile(e) {
  e.preventDefault();

  const data = {
    university: document.getElementById("university").value,

    course: document.getElementById("course").value,

    semester: document.getElementById("semester").value,

    goal: document.getElementById("goal").value,

    experience: document.getElementById("experience").value,
  };

  try {
    const response = await ProfileAPI.completeOnboarding(data);

    if (!response.success) {
      throw new Error(response.message);
    }

    await loadProfile();

    await loadStudyOverview();

    showToast(
      "success",
      "Profile Updated",
      "Your profile has been updated successfully.",
    );
  } catch (error) {
    console.error(error);

    showToast(error.message, "error");
  }
}

/*=========================================
        UPDATE ACHIEVEMENTS
=========================================*/

function updateAchievements(user, stats) {
  unlockAchievement("achievement-first-task", stats.completedTasks >= 1, "✅");

  unlockAchievement("achievement-100xp", user.xp >= 100, "⭐");

  unlockAchievement("achievement-streak", user.streak >= 7, "🔥");
}

function unlockAchievement(id, unlocked, icon) {
  const card = document.getElementById(id);

  if (!card) return;

  const iconElement = card.querySelector(".achievement-icon");

  const achievementTitle = card.querySelector("h3").textContent;

  const storageKey = `achievement_${id}`;

  if (unlocked) {
    // Show toast only once
    if (!localStorage.getItem(storageKey)) {
      showToast("success", "🏆 Achievement Unlocked!", achievementTitle);

      localStorage.setItem(storageKey, "true");
    }

    card.classList.remove("locked");

    card.classList.add("unlocked");

    iconElement.textContent = icon;
  } else {
    card.classList.remove("unlocked");

    card.classList.add("locked");

    iconElement.textContent = "🔒";
  }
}