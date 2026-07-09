/*
==========================================
ScholarVerse
Planner
Author: Sudip Pattanayak
==========================================
*/

document.addEventListener("DOMContentLoaded", () => {
  if (!Auth.isLoggedIn()) {
    window.location.href = "login.html";
    return;
  }

  loadSidebar("planner");

  loadNavbar();

  initializeModal();

  initializeTaskForm();

  loadTasks();
});

/*=========================================
        LOAD TASKS
=========================================*/

async function loadTasks() {
  try {
    const data = await PlannerAPI.getTasks();

    if (!data.success) {
      throw new Error("Failed to load tasks.");
    }

    renderTasks(data.tasks);
  } catch (error) {
    console.error(error);

    document.getElementById("taskContainer").innerHTML = `

            <div class="empty-state">

                <h2>⚠ Error Loading Tasks</h2>

                <p>${error.message}</p>

            </div>

        `;
  }
}

/*=========================================
        RENDER TASKS
=========================================*/

function renderTasks(tasks) {
  const taskContainer = document.getElementById("taskContainer");

  if (!taskContainer) return;

  if (tasks.length === 0) {
    taskContainer.innerHTML = `

            <div class="empty-state">

                <h2>No Tasks Yet 📚</h2>

                <p>

                    Click "Add Task" to create your first study task.

                </p>

            </div>

        `;

    return;
  }

  taskContainer.innerHTML = tasks
    .map(
      (task) => `

        <div class="task-card ${task.completed ? "completed" : ""}">

            <h3>${task.title}</h3>

            <p>${task.description || "No description provided."}</p>

            <span class="priority ${task.priority.toLowerCase()}">

                ${task.priority}

            </span>

            <p>

                📅 ${new Date(task.dueDate).toLocaleDateString()}

            </p>

            <div class="task-actions">

    <button
        class="edit-btn"
        onclick="editTask('${task._id}')">

        ✏ Edit

    </button>

    ${
      task.completed
        ? `<button disabled>✅ Completed</button>`
        : `<button onclick="completeTask('${task._id}')">✅ Complete</button>`
    }

    <button
        class="delete-btn"
        onclick="deleteTask('${task._id}')">

        🗑 Delete

    </button>

</div>
        </div>

    `,
    )
    .join("");
}

/*=========================================
        COMPLETE TASK
=========================================*/

async function completeTask(id) {
  try {
    await PlannerAPI.completeTask(id);

    loadTasks();
  } catch (error) {
    console.error(error);

    alert(error.message);
  }
}

/*=========================================
        DELETE TASK
=========================================*/

async function deleteTask(id) {
  const confirmDelete = confirm("Are you sure you want to delete this task?");

  if (!confirmDelete) return;

  try {
    await PlannerAPI.deleteTask(id);

    loadTasks();
  } catch (error) {
    console.error(error);

    alert(error.message);
  }
}

/*=========================================
        MODAL
=========================================*/

function initializeModal() {
  const modal = document.getElementById("taskModal");

  const addTaskBtn = document.getElementById("addTaskBtn");

  const closeModalBtn = document.getElementById("closeModal");

  if (!modal || !addTaskBtn || !closeModalBtn) return;

  addTaskBtn.addEventListener("click", () => {
    modal.classList.add("active");
  });

  closeModalBtn.addEventListener("click", () => {
    modal.classList.remove("active");
  });

  modal.addEventListener("click", (e) => {
    if (e.target === modal) {
      modal.classList.remove("active");
    }
  });
}

/*=========================================
        CREATE TASK
=========================================*/

function initializeTaskForm() {
  const form = document.getElementById("taskForm");

  if (!form) return;

  form.addEventListener("submit", async (e) => {
    e.preventDefault();

    const taskData = {
      title: document.getElementById("taskTitle").value.trim(),

      description: document.getElementById("taskDescription").value.trim(),

      dueDate: document.getElementById("taskDueDate").value,

      priority: document.getElementById("taskPriority").value,
    };

    try {
      const taskId = document.getElementById("taskId").value;

      if (taskId) {
        await PlannerAPI.updateTask(taskId, taskData);
      } else {
        await PlannerAPI.createTask(taskData);
      }

      document.getElementById("taskModal").classList.remove("active");

      form.reset();

      document.getElementById("taskId").value = "";

      document.getElementById("modalTitle").textContent = "Create Study Task";

      loadTasks();
    } catch (error) {
      console.error(error);

      alert(error.message);
    }
  });
}

async function editTask(id) {
  const data = await PlannerAPI.getTasks();

  const task = data.tasks.find((t) => t._id === id);

  if (!task) return;

  document.getElementById("modalTitle").textContent = "Edit Task";

  document.getElementById("taskId").value = task._id;

  document.getElementById("taskTitle").value = task.title;

  document.getElementById("taskDescription").value = task.description;

  document.getElementById("taskDueDate").value = task.dueDate.split("T")[0];

  document.getElementById("taskPriority").value = task.priority;

  document.getElementById("taskModal").classList.add("active");
}