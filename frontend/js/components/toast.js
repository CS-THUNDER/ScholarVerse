/*
==========================================
ScholarVerse Toast
==========================================
*/

function showToast(type, title, message) {
  const container = document.getElementById("toastContainer");

  if (!container) return;

  const toast = document.createElement("div");

  toast.className = `toast ${type}`;

  toast.innerHTML = `

        <h4>${title}</h4>

        <p>${message}</p>

    `;

  container.appendChild(toast);

  setTimeout(() => {
    toast.style.opacity = "0";

    toast.style.transform = "translateX(40px)";

    setTimeout(() => {
      toast.remove();
    }, 300);
  }, 3000);
}
