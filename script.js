// Function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(taskItem => {
        const taskContent = taskItem.querySelector(".task-text");
        const taskDate = taskItem.querySelector(".task-date").textContent.replace(" (Added on: ", "").replace(")", "");
        tasks.push({
            text: taskContent.textContent,
            completed: taskContent.classList.contains("completed"),
            dateAdded: taskDate
        });
    });
    localStorage.setItem("tasks", JSON.stringify(tasks));
}

// Function to load tasks from local storage
function loadTasks() {
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        addTaskToDOM(task.text, task.completed, task.dateAdded);
    });
}

// Helper function to add a task to the DOM
function addTaskToDOM(taskText, isCompleted = false, dateAdded = null) {
    const taskList = document.getElementById("taskList");

    const taskItem = document.createElement("li");

    // Create a span for the task text
    const taskContent = document.createElement("span");
    taskContent.textContent = taskText;
    taskContent.classList.add("task-text");
    if (isCompleted) {
        taskContent.classList.add("completed");
    }

    // Display date added
    const taskDate = document.createElement("span");
    taskDate.classList.add("task-date");
    if (!dateAdded) {
        const now = new Date();
        dateAdded = `${now.toLocaleDateString()} ${now.toLocaleTimeString()}`;
    }
    taskDate.textContent = ` ${dateAdded}`;  // Displaying date when the task was added

    // Create the delete button
    const deleteButton = document.createElement("button");
    deleteButton.textContent = "Delete";
    deleteButton.onclick = () => {
        taskItem.remove();
        saveTasks();
    };

    // Toggle 'completed' class only on the text span
    taskContent.onclick = () => {
        taskContent.classList.toggle("completed");
        saveTasks();
    };

    // Append elements to the list item and list item to the task list
    taskItem.appendChild(taskContent);
    taskItem.appendChild(taskDate);
    taskItem.appendChild(deleteButton);
    taskList.appendChild(taskItem);
}

// Function to handle adding a new task from input
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText) {
        addTaskToDOM(taskText);
        taskInput.value = ""; // Clear the input
        saveTasks(); // Save tasks after adding a new one
    }
}

// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);
