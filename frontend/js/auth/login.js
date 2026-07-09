const loginForm = document.getElementById("loginForm");
const messageBox = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const data = await AuthAPI.login({
      email,
      password,
    });

    Auth.saveToken(data.token);

    Auth.saveUser(data.user);

    messageBox.innerHTML = "✅ Login Successful!";

    setTimeout(() => {
      window.location.href = "onboarding.html";
    }, 1200);
  } catch (error) {
    messageBox.innerHTML = `❌ ${error.message}`;
  }
});
