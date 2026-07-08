const loginForm = document.getElementById("loginForm");
const messageBox = document.getElementById("message");

loginForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const email = document.getElementById("email").value.trim();
  const password = document.getElementById("password").value;

  try {
    const response = await fetch("http://localhost:5000/api/auth/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({
        email,
        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      // Save JWT
      localStorage.setItem("token", data.token);

      // Save user
      localStorage.setItem("user", JSON.stringify(data.user));

      messageBox.innerHTML = "✅ Login Successful!";

      setTimeout(() => {
        window.location.href = "onboarding.html";
      }, 1200);
    } else {
      messageBox.innerHTML = `❌ ${data.message}`;
    }
  } catch (error) {
    console.error(error);

    messageBox.innerHTML = "❌ Server Error";
  }
});
