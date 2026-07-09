const registerForm = document.getElementById("registerForm");
const messageBox = document.getElementById("message");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();
  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;
  const confirmPassword = document.getElementById("confirmPassword").value;

  if (password !== confirmPassword) {
    messageBox.innerHTML = "❌ Passwords do not match.";

    return;
  }

  try {
    await AuthAPI.register({
      fullName,
      email,
      password,
    });

    messageBox.innerHTML = "✅ Account Created Successfully! Redirecting...";

    setTimeout(() => {
      window.location.href = "login.html";
    }, 1500);
  } catch (error) {
    messageBox.innerHTML = `❌ ${error.message}`;
  }
});
