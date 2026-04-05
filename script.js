const taskForm = document.getElementById("taskForm");
const taskInput = document.getElementById("taskInput");
const taskList = document.getElementById("taskList");
const totalCount = document.getElementById("totalCount");
const doneCount = document.getElementById("doneCount");
const pendingCount = document.getElementById("pendingCount");
const emptyState = document.getElementById("emptyState");
let tasks = JSON.parse(localStorage.getItem("todoTasks") || "[]");

function saveTasks() {
  localStorage.setItem("todoTasks", JSON.stringify(tasks));
}

function updateStats() {
  const done = tasks.filter((task) => task.done).length;
  const total = tasks.length;
  totalCount.textContent = total;
  doneCount.textContent = done;
  pendingCount.textContent = total - done;
}

function renderTasks() {
  taskList.innerHTML = "";
  if (!tasks.length) {
    taskList.appendChild(emptyState);
    return;
  }

  tasks.forEach((task, index) => {
    const item = document.createElement("div");
    item.className = "task";

    const text = document.createElement("div");
    text.className = "task-text";
    const title = document.createElement("p");
    title.textContent = task.text;
    if (task.done) title.classList.add("completed");
    text.appendChild(title);

    const actions = document.createElement("div");
    actions.className = "actions";

    const doneButton = document.createElement("button");
    doneButton.className = "action-btn done-btn";
    doneButton.textContent = task.done ? "Batal" : "Selesai";
    doneButton.addEventListener("click", () => {
      tasks[index].done = !tasks[index].done;
      saveTasks();
      renderTasks();
      updateStats();
    });

    const deleteButton = document.createElement("button");
    deleteButton.className = "action-btn delete-btn";
    deleteButton.textContent = "Hapus";
    deleteButton.addEventListener("click", () => {
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
      updateStats();
    });

    actions.appendChild(doneButton);
    actions.appendChild(deleteButton);
    item.appendChild(text);
    item.appendChild(actions);
    taskList.appendChild(item);
  });
}

taskForm.addEventListener("submit", (event) => {
  event.preventDefault();
  const text = taskInput.value.trim();
  if (!text) return;
  tasks.unshift({ text, done: false });
  taskInput.value = "";
  saveTasks();
  renderTasks();
  updateStats();
});

renderTasks();
updateStats();
