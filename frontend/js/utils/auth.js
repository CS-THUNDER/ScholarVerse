/*
==========================================
ScholarVerse
Authentication Utilities
Author: Sudip Pattanayak
==========================================
*/

const Auth = {
  saveToken(token) {
    localStorage.setItem("token", token);
  },

  getToken() {
    return localStorage.getItem("token");
  },

  saveUser(user) {
    localStorage.setItem("user", JSON.stringify(user));
  },

  getUser() {
    return JSON.parse(localStorage.getItem("user"));
  },

  logout() {
    localStorage.removeItem("token");

    localStorage.removeItem("user");

    window.location.href = "login.html";
  },

  isLoggedIn() {
    return !!this.getToken();
  },
};
