/*
==========================================
ScholarVerse
Authentication Utilities
Author: Sudip Pattanayak
==========================================
*/

const Auth = {
  /*=====================================
            TOKEN
    =====================================*/

  saveToken(token) {
    localStorage.setItem("token", token);
  },

  getToken() {
    return localStorage.getItem("token");
  },

  /*=====================================
            USER
    =====================================*/

  saveUser(user) {
    if (!user) return;

    localStorage.setItem("user", JSON.stringify(user));
  },

  getUser() {
    const user = localStorage.getItem("user");

    if (!user || user === "undefined") {
      return null;
    }

    try {
      return JSON.parse(user);
    } catch (error) {
      console.error("Invalid user data in localStorage.");

      localStorage.removeItem("user");

      return null;
    }
  },

  /*=====================================
            AUTH
    =====================================*/

  logout() {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "login.html";
  },

  isLoggedIn() {
    return !!this.getToken();
  },
};
