// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText) {
        const taskList = document.getElementById("taskList");
        const taskItem = document.createElement("li");

        taskItem.innerHTML = `
            ${taskText}
            <button onclick="removeTask(this)">Delete</button>
        `;
        taskItem.onclick = () => taskItem.classList.toggle("completed");

        taskList.appendChild(taskItem);
        taskInput.value = ""; // Clear the input
    }
}

// Function to remove a task
function removeTask(taskElement) {
    const taskItem = taskElement.parentNode;
    taskItem.remove();
}
