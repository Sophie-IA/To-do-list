"use strict";

// Function to save tasks to local storage
// saveTasks() function collects all tasks from the DOM and saves them to local storage in an array format.
function saveTasks() {
  var tasks = [];
  document.querySelectorAll("#taskList li").forEach(function (taskItem) {
    var taskContent = taskItem.querySelector(".task-text");
    var taskDate = taskItem.querySelector(".task-date").textContent;
    tasks.push({
      text: taskContent.textContent,
      completed: taskContent.classList.contains("completed"),
      dateAdded: taskDate
    });
  });
  localStorage.setItem("tasks", JSON.stringify(tasks));
} // Function to load tasks from local storage
// loadTasks() function reads the saved tasks from the local storage and calls addTasksToDOM() to add each task to the list when the page loads


function loadTasks() {
  var savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
  savedTasks.forEach(function (task) {
    addTaskToDOM(task.text, task.completed, task.dateAdded);
  });
} // Helper function to add a task to the DOM
// used to create  each task item (with the delete button and task text).
// it applies the .completed class if the task was marked as completed


function addTaskToDOM(taskText) {
  var isCompleted = arguments.length > 1 && arguments[1] !== undefined ? arguments[1] : false;
  var dateAdded = arguments.length > 2 && arguments[2] !== undefined ? arguments[2] : null;
  var taskList = document.getElementById("taskList");
  var taskItem = document.createElement("li"); // Create a span for the task text

  var taskContent = document.createElement("span");
  taskContent.textContent = taskText;
  taskContent.classList.add("task-text");

  if (isCompleted) {
    taskContent.classList.add("completed");
  } // Display date added


  var taskDate = document.createElement("span");
  taskDate.classList.add("task-date");

  if (!dateAdded) {
    var now = new Date();
    dateAdded = '$ {now.toLocaleDateString()} ${now.toLocaleTimeString()}';
  }

  taskDate.textContent = '(Added on: ${dateAdded})'; // Create the delete button

  var deleteButton = document.createElement("button");
  deleteButton.textContent = "Delete";

  deleteButton.onclick = function () {
    taskItem.remove();
    saveTasks();
  }; // Toggle 'completed' class only on the text span


  taskContent.onclick = function () {
    taskContent.classList.toggle("completed");
    saveTasks();
  }; // Append elements to the list item and list item to the task list


  taskItem.appendChild(taskContent);
  taskItem.appendChild(taskDate);
  taskItem.appendChild(deleteButton);
  taskList.appendChild(taskItem);
} // Function to handle adding a new task from input


function addTask() {
  var taskInput = document.getElementById("taskInput");
  var taskText = taskInput.value.trim();

  if (taskText) {
    addTaskToDOM(taskText);
    taskInput.value = ""; // Clear the input

    saveTasks(); // Save tasks after adding a new one
  }
} // Load tasks when the page loads
// DOMContentLoaded event calls loadTasks() when the page is loaded, ensuring tasks appear automatically from the local storage


document.addEventListener("DOMContentLoaded", loadTasks);