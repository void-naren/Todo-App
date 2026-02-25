
window.onload = function () {
    displayTasks();
};


function addTask() {
    let input = document.getElementById("taskInput");
    let taskText = input.value.trim();

    if (taskText === "") return;

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.push({
        text: taskText,
        completed: false
    });

    localStorage.setItem("tasks", JSON.stringify(tasks));

    input.value = "";
    displayTasks();
}


function displayTasks() {
    let taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let tasks = JSON.parse(localStorage.getItem("tasks")) || [];

    tasks.forEach((task, index) => {
        let li = document.createElement("li");

        if (task.completed) {
            li.classList.add("completed");
        }

        
        let span = document.createElement("span");
        span.textContent = task.text;

        
        span.onclick = function () {
            tasks[index].completed = !tasks[index].completed;
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
        };

        let deleteBtn = document.createElement("button");
        deleteBtn.textContent = "X";
        deleteBtn.onclick = function () {
            tasks.splice(index, 1);
            localStorage.setItem("tasks", JSON.stringify(tasks));
            displayTasks();
        };

        li.appendChild(span);
        li.appendChild(deleteBtn);
        taskList.appendChild(li);
    });
}
