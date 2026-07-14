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
let allTasks = [];

let deleteTaskId = null;

/*=========================================
        LOAD TASKS
=========================================*/

async function loadTasks() {
  try {
    const data = await PlannerAPI.getTasks();

    if (!data.success) {
      throw new Error("Failed to load tasks.");
    }

    allTasks = data.tasks;

    updatePlannerStats(allTasks);

    applyFilters();
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

    <div style="font-size:70px">

        📚

    </div>

    <h2>

        Your Planner is Empty

    </h2>

    <p>

        Start organizing your study journey by creating your first task.

    </p>

    <button
        class="primary-btn"
        onclick="document.getElementById('addTaskBtn').click()">

        + Create First Task

    </button>

</div>

        `;

    return;
  }

  taskContainer.innerHTML = tasks
    .map(
      (task) => `

        <div class="task-card ${task.completed ? "completed" : ""}">

    <div class="task-card-header">

        <h3>${task.title}</h3>

        <span class="priority ${task.priority.toLowerCase()}">

            ${task.priority === "High" ? "🔥" : task.priority === "Medium" ? "🟠" : "🟢"}

            ${task.priority}

        </span>

    </div>

    <p class="task-description">

        ${task.description || "No description provided."}

    </p>

    <div class="task-info">

        <span>

            📅 ${getDueStatus(task.dueDate)}

        </span>

        <span>

            ⭐ +${task.xpReward || 10} XP

        </span>

    </div>

    <div class="task-actions">

        <button class="edit-btn"

            onclick="editTask('${task._id}')">

            ✏ Edit

        </button>

        ${
          task.completed
            ? `<button class="complete-btn completed-btn" disabled>

                ✅ Done

            </button>`
            : `<button class="complete-btn"

                onclick="completeTask('${task._id}')">

                ✔ Complete

            </button>`
        }

        <button class="delete-btn"

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

    showToast("success", "Task Completed", "+10 XP earned.");

    loadTasks();
  } catch (error) {
    console.error(error);

    showToast("error", "Error", error.message);
  }
}

/*=========================================
        DELETE TASK
=========================================*/

function deleteTask(id) {
  deleteTaskId = id;

  document

    .getElementById("deleteModal")

    .classList.add("active");
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

    /*=========================================
        VALIDATION
=========================================*/

    if (taskData.title.length < 3) {
      showToast("Task title must be at least 3 characters.", "error");

      return;
    }

    if (taskData.title.length > 100) {
      showToast("Task title cannot exceed 100 characters.", "error");

      return;
    }

    if (taskData.description.length > 300) {
      showToast("Description cannot exceed 300 characters.", "error");

      return;
    }

    const today = new Date();

    today.setHours(0, 0, 0, 0);

    const selectedDate = new Date(taskData.dueDate);

    if (selectedDate < today) {
      showToast("Please choose today or a future date.", "error");

      return;
    }

    try {
      const taskId = document.getElementById("taskId").value;

      if (taskId) {
        await PlannerAPI.updateTask(taskId, taskData);

        showToast("success", "Task Updated", "Task updated successfully.");
      } else {
        await PlannerAPI.createTask(taskData);

        showToast(
          "success",
          "Task Created",
          "Study task created successfully.",
        );
      }

      document.getElementById("taskModal").classList.remove("active");

      form.reset();

      document.getElementById("taskId").value = "";

      document.getElementById("modalTitle").textContent = "Create Study Task";

      document.getElementById("submitTaskBtn").textContent = "Create Task";

      loadTasks();
    } catch (error) {
      console.error(error);

      showToast("error", "Error", error.message);
    }
  },);
}

async function editTask(id) {
  const data = await PlannerAPI.getTasks();

  const task = data.tasks.find((t) => t._id === id);

  if (!task) return;

  document.getElementById("modalTitle").textContent = "Edit Task";

  document.getElementById("submitTaskBtn").textContent = "Update Task";

  document.getElementById("taskId").value = task._id;

  document.getElementById("taskTitle").value = task.title;

  document.getElementById("taskDescription").value = task.description;

  document.getElementById("taskDueDate").value = task.dueDate.split("T")[0];

  document.getElementById("taskPriority").value = task.priority;

  document.getElementById("taskModal").classList.add("active");
}

/*=========================================
        SEARCH FILTER SORT
=========================================*/

function applyFilters() {
  let tasks = [...allTasks];

  const search = document.getElementById("searchTask").value.toLowerCase();

  const filter = document.getElementById("filterTask").value;

  const sort = document.getElementById("sortTask").value;

  if (search) {
    tasks = tasks.filter((task) => task.title.toLowerCase().includes(search));
  }

  if (filter === "completed") {
    tasks = tasks.filter((task) => task.completed);
  }

  if (filter === "pending") {
    tasks = tasks.filter((task) => !task.completed);
  }

  if (sort === "priority") {
    const order = {
      High: 1,

      Medium: 2,

      Low: 3,
    };

    tasks.sort((a, b) => order[a.priority] - order[b.priority]);
  } else if (sort === "newest") {
    tasks.sort((a, b) => new Date(b.createdAt) - new Date(a.createdAt));
  } else {
    tasks.sort((a, b) => new Date(a.dueDate) - new Date(b.dueDate));
  }

  renderTasks(tasks);
}

document.addEventListener("input", (e) => {
  if (e.target.id === "searchTask") {
    applyFilters();
  }
});

document.addEventListener("change", (e) => {
  if (e.target.id === "filterTask" || e.target.id === "sortTask") {
    applyFilters();
  }
});

function updatePlannerStats(tasks) {
  const total = tasks.length;

  const completed = tasks.filter((task) => task.completed).length;

  const pending = total - completed;

  const progress = total === 0 ? 0 : Math.round((completed / total) * 100);

  setText("totalTasksStat", total);

  setText("pendingTasksStat", pending);

  setText("completedTasksStat", completed);

  setText("progressTasksStat", `${progress}%`);
}

function setText(id, value) {
  const element = document.getElementById(id);

  if (element) {
    element.textContent = value;
  }
}

function getDueStatus(date) {
  const today = new Date();

  const due = new Date(date);

  today.setHours(0, 0, 0, 0);

  due.setHours(0, 0, 0, 0);

  const diff = (due - today) / (1000 * 60 * 60 * 24);

  if (diff < 0) return "🔴 Overdue";

  if (diff === 0) return "🟢 Due Today";

  if (diff === 1) return "🟠 Tomorrow";

  return `🔵 ${diff} Days Left`;
}

/*=========================================
        DELETE MODAL
=========================================*/

document

.getElementById("cancelDelete")

.addEventListener("click",()=>{

    document

    .getElementById("deleteModal")

    .classList

    .remove("active");

});

document

document.getElementById("confirmDelete").addEventListener("click", async () => {
  try {
    await PlannerAPI.deleteTask(deleteTaskId);

    document.getElementById("deleteModal").classList.remove("active");

    showToast("warning", "Task Deleted", "Task removed successfully.");

    loadTasks();
  } catch (error) {
    showToast("error", "Error", error.message);
  }
});

document

  .getElementById("deleteModal")

  .addEventListener("click", (e) => {
    if (e.target.id === "deleteModal") {
      e.target.classList.remove("active");
    }
  });