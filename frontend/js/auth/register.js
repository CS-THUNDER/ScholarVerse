const registerForm = document.getElementById("registerForm");

const messageBox = document.getElementById("message");

registerForm.addEventListener("submit", async (e) => {
  e.preventDefault();

  const fullName = document.getElementById("fullName").value.trim();

  const email = document.getElementById("email").value.trim();

  const password = document.getElementById("password").value;

  const confirmPassword = document.getElementById("confirmPassword").value;

  // Password Match Check

  if (password !== confirmPassword) {
    messageBox.innerHTML = "❌ Passwords do not match.";

    return;
  }

  try {
    const response = await fetch("http://localhost:5000/api/auth/register", {
      method: "POST",

      headers: {
        "Content-Type": "application/json",
      },

      body: JSON.stringify({
        fullName,

        email,

        password,
      }),
    });

    const data = await response.json();

    if (data.success) {
      messageBox.innerHTML = "✅ Account Created Successfully! Redirecting...";

      setTimeout(() => {
        window.location.href = "login.html";
      }, 1500);
    } else {
      messageBox.innerHTML = `❌ ${data.message}`;
    }
  } catch (error) {
    console.error(error);

    messageBox.innerHTML = "❌ Server Error";
  }
});
