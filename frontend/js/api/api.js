/*
==========================================
ScholarVerse
API Service
Author: Sudip Pattanayak
==========================================
*/

const API_BASE_URL = "http://localhost:5000/api";

async function apiRequest(endpoint, options = {}) {
  const token = localStorage.getItem("token");

  const config = {
    headers: {
      "Content-Type": "application/json",
      ...options.headers,
    },

    ...options,
  };

  if (token) {
    config.headers.Authorization = `Bearer ${token}`;
  }

  const response = await fetch(`${API_BASE_URL}${endpoint}`, config);

  const data = await response.json();

  if (!response.ok) {
    throw new Error(data.message || "Something went wrong");
  }

  return data;
}

/* ==========================
   AUTH API
========================== */

const AuthAPI = {
  register(userData) {
    return apiRequest("/auth/register", {
      method: "POST",

      body: JSON.stringify(userData),
    });
  },

  login(credentials) {
    return apiRequest("/auth/login", {
      method: "POST",

      body: JSON.stringify(credentials),
    });
  },
};

/*=========================================
        PROFILE API
=========================================*/

const ProfileAPI = {

    completeOnboarding(data) {

        return apiRequest("/profile/onboarding", {

            method: "PUT",

            body: JSON.stringify(data)

        });

    },

    getProfile() {

        return apiRequest("/profile/me");

    }

};

/*=========================================
        PLANNER API
=========================================*/

const PlannerAPI = {

    getTasks() {

        return apiRequest("/planner");

    },

    createTask(taskData) {

        return apiRequest("/planner/create", {

            method: "POST",

            body: JSON.stringify(taskData)

        });

    },

    updateTask(id, taskData) {

        return apiRequest(`/planner/${id}`, {

            method: "PUT",

            body: JSON.stringify(taskData)

        });

    },

    deleteTask(id) {

        return apiRequest(`/planner/${id}`, {

            method: "DELETE"

        });

    },

    completeTask(id) {

        return apiRequest(`/planner/complete/${id}`, {

            method: "PATCH"

        });

    }

};

/*=========================================
        DASHBOARD API
=========================================*/

const DashboardAPI = {

    getDashboard() {

        return apiRequest("/dashboard");

    }

};

DashboardAPI.getDashboard();

/*=========================================
        LEADERBOARD API
=========================================*/

const LeaderboardAPI = {
  async getLeaderboard(season = "weekly") {
    return apiRequest(`/leaderboard?season=${season}`);
  },
};