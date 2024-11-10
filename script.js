// Function to add a new task
function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskText = taskInput.value.trim();
    if (taskText) {
        const taskList = document.getElementById("taskList");
        
        // create a list item for the tasks
        const taskItem = document.createElement("li");

        //create a span to hold the tasks text
        const taskContent = document.createElement("span");
        taskContent.textContent = taskText;
        taskContent.classList.add("task-text");

        //create delete button
        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => { 
            taskItem.remove();
            saveTasks();
        }

        //taskItem.innerHTML = `
         //   ${taskText}
           // <button onclick="removeTask(this)">Delete</button>
       // `;

       // toggle 'completed' class only on the text span
        taskContent.onclick = () => {
             taskContent.classList.toggle("completed");
             saveTasks();
        }

        //append the text and button to the list item
        taskItem.appendChild(taskContent);
        taskItem.appendChild(deleteButton)

        //append the list item to the task list
        taskList.appendChild(taskItem);

        //clear the input field
        taskInput.value = ""; 
        saveTasks();
    }
}

// Function to remove a task
//function removeTask(taskElement) {
   // const taskItem = taskElement.parentNode;
   // taskItem.remove();
//}

//function to save tasks to local storage
function saveTasks() {
    const tasks = [];
    document.querySelectorAll("#taskList li").forEach(taskItem => {
        const taskContent = taskItem.querySelector(".task-text");
        tasks.push({
            text: taskContent.textContent, 
            completed: taskContent.classList.contains("completed")
        });
    });
    localStorage.setItem("tasks", JSON,stringify(tasks));
}

//function to load tasks from the local storage
function loadtasks(){
    const savedTasks = JSON.parse(localStorage.getItem("tasks")) || [];
    savedTasks.forEach(task => {
        addTaskToDOM(task.text, task.completed);
    });
}

//helper function to add task to the DOM
function addTaskToDOM(taskText, isCompleted = false) {
        const tasklist = document.getElementById("taskList");

        const taskItem = document.createElement("li");

        const taskContent = document.createElement("span");
        taskContent.textContent = task.text;
        taskContent.classList.add("task-text");
        if (isCompleted) {
            taskContent.classList.add("completed");
        }

        const deleteButton = document.createElement("button");
        deleteButton.textContent = "Delete";
        deleteButton.onclick = () => {
            taskItem.remove();
            saveTasks();
        };

        taskContent.onclick = () => {
            taskContent.classList.toggle("completed");
            saveTasks();
        };

        taskItem.appendChild(taskContent);
        taskItem.appendChild(deleteButton);
        taskList.appendChild(taskItem);
    }


// Load tasks when the page loads
document.addEventListener("DOMContentLoaded", loadTasks);
    
