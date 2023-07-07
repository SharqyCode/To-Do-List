// Main elements definitions
let card = document.getElementById("card");
let taskList = document.querySelector(".taskList");
let myInput = document.querySelector("input");
let addButton = document.querySelector("button");

// Display tasks saved in storage
getSavedTasks();

// Display entered task and save to storage
addButton.addEventListener("click", () => enterTask());

document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    enterTask();
  }
});

// Enter task
function enterTask() {
  let taskText = myInput.value;
  if (taskText != "") {
    let newTaskDiv = document.createElement("div");
    newTaskDiv.classList.add("task");

    let newTask = document.createElement("p");
    newTask.textContent = taskText;

    let taskIcon = document.createElement("i");
    taskIcon.classList.add("fa-solid", "fa-circle-dot", "index");

    let deleteIcon = document.createElement("i");
    deleteIcon.classList.add("fa-solid", "fa-xmark", "del");

    newTaskDiv.appendChild(taskIcon);
    newTaskDiv.appendChild(newTask);
    newTaskDiv.appendChild(deleteIcon);

    taskList.prepend(newTaskDiv);
    saveTask(taskText);

    myInput.value = "";

    card.style.paddingBottom = "5px";
  } else {
    alert("Enter a task, dummy!");
  }
}

// Save Task To Local Storage
function saveTask(text) {
  if (window.localStorage.getItem("tasks")) {
    window.localStorage.setItem(
      "tasks",
      `${window.localStorage.getItem("tasks")}|${text}`
    );
  } else {
    window.localStorage.setItem("tasks", `${text}`);
  }
}

// Display saved tasks
function getSavedTasks() {
  if ((window, localStorage.getItem("tasks"))) {
    let taskArray = window.localStorage.getItem("tasks").split("|");
    for (let i = 0; i < taskArray.length; i++) {
      let newTaskDiv = document.createElement("div");
      newTaskDiv.classList.add("task");
      let newTask = document.createElement("p");
      newTask.textContent = taskArray[i];
      let taskIcon = document.createElement("i");
      taskIcon.classList.add("fa-solid", "fa-circle-dot", "index");
      let deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-xmark", "del");
      newTaskDiv.appendChild(taskIcon);
      newTaskDiv.appendChild(newTask);
      newTaskDiv.appendChild(deleteIcon);
      taskList.prepend(newTaskDiv);
    }
    card.style.paddingBottom = "5px";
  }
}

// Delete task through delete button
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    let delText = e.target.parentElement.children[1].textContent;
    e.target.parentElement.remove();
    let taskArray = window.localStorage.getItem("tasks").split("|");
    taskArray.splice(taskArray.indexOf(delText), 1);
    let newArr = taskArray.join("|");
    window.localStorage.setItem("tasks", newArr);
  }
  if (taskList.childElementCount == 0) {
    card.style.paddingBottom = "63px";
  }
});
