let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

const taskInput = document.getElementById("taskInput");
const taskTime = document.getElementById("taskTime");
const taskTable = document.getElementById("taskTable");

document.addEventListener("DOMContentLoaded", renderTasks);

function addTask() {
    const name = taskInput.value.trim();
    const time = taskTime.value;

    if (!name || !time) {
        alert("Please enter task and time");
        return;
    }

    const task = {
        id: Date.now(),
        name,
        time,
        completed: false
    };

    tasks.push(task);
    saveTasks();
    renderTasks();
    clearInputs();
}

function renderTasks() {
    taskTable.innerHTML = "";

    if (tasks.length === 0) {
        taskTable.innerHTML = `<tr><td colspan="5">No tasks yet</td></tr>`;
        return;
    }

    tasks.forEach(task => {
        const row = document.createElement("tr");

        row.innerHTML = `
            <td>
                <input type="checkbox" 
                    ${task.completed ? "checked" : ""} 
                    onchange="toggleTask(${task.id})">
            </td>
            <td>${task.name}</td>
            <td>${formatTime(task.time)}</td>
            <td class="status ${task.completed ? 'completed' : 'pending'}">
                ${task.completed ? "Completed" : "Pending"}
            </td>
            <td>
                <button class="btn-delete" onclick="deleteTask(${task.id})">
                    X
                </button>
            </td>
        `;

        taskTable.appendChild(row);
    });
}

function toggleTask(id) {
    tasks = tasks.map(task =>
        task.id === id ? { ...task, completed: !task.completed } : task
    );
    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    tasks = tasks.filter(task => task.id !== id);
    saveTasks();
    renderTasks();
}

function saveTasks() {
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

function clearInputs() {
    taskInput.value = "";
    taskTime.value = "";
}

function formatTime(time) {
    const [h, m] = time.split(":");
    const hour = Number(h);
    const suffix = hour >= 12 ? "PM" : "AM";
    const formattedHour = hour % 12 || 12;
    return `${formattedHour}:${m} ${suffix}`;
}