// Main elements definitions
let card = document.getElementById("card");
let taskList = document.querySelector(".taskList");
let myInput = document.querySelector("input");
let addButton = document.querySelector("button");

// Display tasks saved in storage when page is loaded
window.addEventListener("load", () => {
  getSavedTasks();
});

// Enter task by clicking the mouse
addButton.addEventListener("click", () => enterTask());

// Enter task by pressing Enter
document.addEventListener("keydown", (e) => {
  if (e.key == "Enter") {
    enterTask();
  }
});

// Delete task through delete button
document.addEventListener("click", (e) => {
  if (e.target.classList.contains("del")) {
    let delTask = e.target.parentElement.children[1];
    e.target.parentElement.remove();
    removeFromLs("tasks", delTask);

    if (e.target.parentElement.classList.contains("checked")) {
      removeFromLs("checked", e.target.parentElement);
    }
  }
  if (taskList.childElementCount == 0) {
    card.style.paddingBottom = "63px";
  }
});

// Mark as done
taskList.addEventListener("click", (e) => {
  if (
    e.target.classList.contains("clickTask") &&
    !e.target.parentElement.classList.contains("checked")
  ) {
    checkTask(e.target.parentElement);
    saveChecked(e.target.parentElement.textContent);
  } else if (
    e.target.classList.contains("clickTask") &&
    e.target.parentElement.classList.contains("checked")
  ) {
    uncheckTask(e.target.parentElement);
    removeFromLs("checked", e.target.parentElement);
  }
});

// Create task
function newTask(taskText) {
  let newTaskDiv = document.createElement("div");
  newTaskDiv.classList.add("task");

  let newTask = document.createElement("p");
  newTask.textContent = taskText;

  let taskIcon = document.createElement("i");
  taskIcon.classList.add("fa-regular", "fa-circle", "index");

  let deleteIcon = document.createElement("i");
  deleteIcon.classList.add("fa-solid", "fa-xmark", "del");

  let clickSpace = document.createElement("div");
  clickSpace.classList.add("clickTask");

  newTaskDiv.appendChild(taskIcon);
  newTaskDiv.appendChild(newTask);
  newTaskDiv.appendChild(deleteIcon);
  newTaskDiv.appendChild(clickSpace);

  taskList.prepend(newTaskDiv);
}

// Enter task
function enterTask() {
  let taskText = myInput.value;
  if (taskText != "") {
    newTask(taskText);
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

// Add checked class and attributes
function checkTask(target) {
  target.children[0].classList.remove("fa-circle", "fa-regular");
  target.children[0].classList.add("fa-circle-check", "fa-solid");
  target.children[0].style.color = "rgb(255, 116, 66)";
  target.children[1].style.textDecorationLine = "line-through";
  target.classList.add("checked");
}

// Remove checked class and attributes
function uncheckTask(target) {
  target.children[0].classList.remove("fa-circle-check", "fa-solid");
  target.children[0].classList.add("fa-circle", "fa-regular");
  target.children[0].style.color = "#333";
  target.children[1].style.textDecorationLine = "none";
  target.classList.remove("checked");
}

// Save checked textContent To Local Storage
function saveChecked(num) {
  if (window.localStorage.getItem("checked")) {
    window.localStorage.setItem(
      "checked",
      `${window.localStorage.getItem("checked")}|${num}`
    );
  } else {
    window.localStorage.setItem("checked", `${num}`);
  }
}

// Display saved tasks
function getSavedTasks() {
  if (window.localStorage.getItem("tasks")) {
    let taskArray = window.localStorage.getItem("tasks").split("|");
    for (let i = 0; i < taskArray.length; i++) {
      newTask(taskArray[i]);
    }
    // Add checked attributes to checked tasks
    if (window.localStorage.getItem("checked")) {
      let checkedArr = window.localStorage.getItem("checked").split("|");
      // console.log(checkedArr);
      for (let i = 0; i < taskArray.length; i++) {
        if (checkedArr.includes(taskList.children[i].textContent)) {
          let currentTask = taskList.children[i];
          checkTask(currentTask);
        }
      }
    }

    card.style.paddingBottom = "5px";
  }
}

// Remove item from Local Storage using target
function removeFromLs(item, target) {
  let lsArray = window.localStorage.getItem(`${item}`).split("|");
  lsArray.splice(lsArray.indexOf(target.textContent), 1);
  let newArr = lsArray.join("|");
  window.localStorage.setItem(`${item}`, newArr);
}
