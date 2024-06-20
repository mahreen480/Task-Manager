document.addEventListener("DOMContentLoaded", () => {
    const taskForm = document.getElementById("task-form");
    const tasksContainer = document.getElementById("tasks-container");
    const sortButton = document.getElementById("sort-tasks");
    const searchInput = document.getElementById("search-tasks");

    let tasks = [];

    // Function to display tasks
    function displayTasks(filteredTasks = tasks) {
        tasksContainer.innerHTML = "";
        filteredTasks.forEach((task, index) => {
            const taskElement = createTaskElement(task, index);
            tasksContainer.appendChild(taskElement);
        });
    }

    // Function to create task element
    function createTaskElement(task, index) {
        const taskElement = document.createElement("div");
        taskElement.className = `task ${task.completed ? "completed" : ""}`;
        taskElement.setAttribute("data-id", index);
        taskElement.innerHTML = `
            <h3>${task.title}</h3>
            <p>${task.description || "No description"}</p>
            <p>Status: ${task.completed ? "Completed" : "Not completed"}</p>
            <button onclick="deleteTask(${index})">Delete</button>
            <button onclick="toggleTask(${index})">${task.completed ? "Mark as Not Completed" : "Mark as Completed"}</button>
            <button onclick="editTask(${index})">Edit</button>
        `;
        return taskElement;
    }

    // Function to add new task
    taskForm.addEventListener("submit", (e) => {
        e.preventDefault();
        const title = document.getElementById("task-title").value;
        const description = document.getElementById("task-desc").value;

        const newTask = {
            title,
            description,
            completed: false,
        };

        tasks.push(newTask);
        displayTasks();
        taskForm.reset();
    });

    // Function to delete task
    window.deleteTask = function (index) {
        tasks.splice(index, 1);
        displayTasks();
    };

    // Function to toggle task completion status
    window.toggleTask = function (index) {
        tasks[index].completed = !tasks[index].completed;
        displayTasks();
    };

    // Function to edit task
    window.editTask = function (index) {
        const task = tasks[index];
        const newTitle = prompt("Edit task title:", task.title);
        const newDescription = prompt("Edit task description:", task.description);

        if (newTitle !== null && newTitle.trim() !== "") {
            task.title = newTitle;
        }
        if (newDescription !== null && newDescription.trim() !== "") {
            task.description = newDescription;
        }

        displayTasks();
    };

    // Function to sort tasks by status
    sortButton.addEventListener("click", () => {
        tasks.sort((a, b) => a.completed - b.completed);
        displayTasks();
    });

    // Function to search tasks
    searchInput.addEventListener("input", () => {
        const searchText = searchInput.value.toLowerCase();
        const filteredTasks = tasks.filter(task =>
            task.title.toLowerCase().includes(searchText) ||
            (task.description && task.description.toLowerCase().includes(searchText))
        );
        displayTasks(filteredTasks);
    });

    // Initial display of tasks
    displayTasks();
});