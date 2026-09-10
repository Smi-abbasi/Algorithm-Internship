const clock = document.getElementById("clock");
const greeting = document.getElementById("greeting");

const timer = document.getElementById("timer");
const startBtn = document.getElementById("start-btn");
const pauseBtn = document.getElementById("pause-btn");
const resetBtn = document.getElementById("reset-btn");

function updateClock() {
    const now = new Date();

    let hours = now.getHours();
    let minutes = now.getMinutes();
    let seconds = now.getSeconds();

    if (hours >= 5 && hours < 12) {
        greeting.textContent = "Good Morning";
    } else if (hours >= 12 && hours < 17) {
        greeting.textContent = "Good Afternoon";
    } else {
        greeting.textContent = "Good Evening";
    }

    let period = hours >= 12 ? "PM" : "AM";

    hours = hours % 12;
    hours = hours ? hours : 12;

    hours = String(hours).padStart(2, "0");
    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    clock.textContent = `${hours}:${minutes}:${seconds} ${period}`;
}

updateClock();
setInterval(updateClock, 1000);

const toast = document.getElementById("toast");
let toastTimeout;

function showToast(message) {
    clearTimeout(toastTimeout);
    toast.textContent = message;
    toast.classList.remove("hidden");

    toastTimeout = setTimeout(function () {
        toast.classList.add("hidden");
    }, 2000);
}

const taskInput = document.getElementById("task-input");
const addBtn = document.getElementById("add-btn");
const taskList = document.getElementById("task-list");
const noTasks = document.getElementById("no-tasks");

function updateEmptyState() {
    noTasks.style.display = taskList.children.length === 0 ? "block" : "none";
}

addBtn.addEventListener("click", addTask);

function addTask() {

    const taskText = taskInput.value.trim();

    if (taskText === "") {
        showToast("Please enter a task.");
        return;
    }
    if (taskList.children.length >= 3) {
        showToast("You can only add 3 active tasks.");
        return;
    }

    const li = document.createElement("li");
    li.className =
        "flex items-center justify-between gap-3 bg-slate-800/60 border border-slate-700 rounded-lg px-4 py-2.5 text-sm";

    const label = document.createElement("span");
    label.textContent = taskText;
    label.className = "flex-1";

    const actions = document.createElement("div");
    actions.className = "flex gap-2 shrink-0";

    const completeBtn = document.createElement("button");
    completeBtn.textContent = "Done";
    completeBtn.className =
        "text-xs font-medium bg-emerald-600 hover:bg-emerald-500 text-white rounded-md px-2.5 py-1.5 transition";

    completeBtn.addEventListener("click", function () {
        label.classList.toggle("completed");

        const isDone = label.classList.contains("completed");
        showToast(isDone ? "Task marked complete." : "Task marked incomplete.");
    });

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Remove";
    deleteBtn.className =
        "text-xs font-medium bg-slate-700 hover:bg-slate-600 text-white rounded-md px-2.5 py-1.5 transition";

    deleteBtn.addEventListener("click", function () {
        const confirmed = confirm(`Remove "${taskText}"? This can't be undone.`);
        if (!confirmed) return;

        li.remove();
        updateEmptyState();
        showToast("Task removed.");
    });

    actions.appendChild(completeBtn);
    actions.appendChild(deleteBtn);

    li.appendChild(label);
    li.appendChild(actions);

    taskList.appendChild(li);
    updateEmptyState();
    showToast("Task added.");

    taskInput.value = "";
}

let timeLeft = 1800;
let interval;

function updateTimer() {

    let minutes = Math.floor(timeLeft / 60);
    let seconds = timeLeft % 60;

    minutes = String(minutes).padStart(2, "0");
    seconds = String(seconds).padStart(2, "0");

    timer.textContent = `${minutes}:${seconds}`;
}
updateTimer();
startBtn.addEventListener("click", startTimer);
function startTimer() {
    if (interval) {
        return;
    }
    interval = setInterval(function () {
        if (timeLeft > 0) {
            timeLeft--;
            updateTimer();

        } else {
            clearInterval(interval);
            interval = null;
            timeLeft = 1800;
            updateTimer();
            showToast("Pomodoro completed! Great job.");
        }
    }, 1000);
}
pauseBtn.addEventListener("click", pauseTimer);

function pauseTimer() {
    clearInterval(interval);
    interval = null;
}

resetBtn.addEventListener("click", resetTimer);
function resetTimer() {
    clearInterval(interval);
    interval = null;
    timeLeft = 1800;
    updateTimer();
}

updateEmptyState();