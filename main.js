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
    taskIcon.classList.add("fa-regular", "fa-circle", "index"); //<i class="fa-regular fa-circle"></i>

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

// Save checkedIndex To Local Storage
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
      let newTaskDiv = document.createElement("div");
      newTaskDiv.classList.add("task");
      let newTask = document.createElement("p");
      newTask.textContent = taskArray[i];
      let taskIcon = document.createElement("i");
      taskIcon.classList.add("fa-regular", "fa-circle", "index");
      let deleteIcon = document.createElement("i");
      deleteIcon.classList.add("fa-solid", "fa-xmark", "del");
      newTaskDiv.appendChild(taskIcon);
      newTaskDiv.appendChild(newTask);
      newTaskDiv.appendChild(deleteIcon);

      taskList.prepend(newTaskDiv);
    }
    // Add checked attributes to checked tasks
    if (window.localStorage.getItem("checked")) {
      let checkedArr = window.localStorage.getItem("checked").split("|");
      for (let i = 0; i < taskArray.length; i++) {
        if (checkedArr.includes(taskArray[i])) {
          // console.log(i);
          taskList.children[i].children[0].classList.remove(
            "fa-circle",
            "fa-regular"
          );
          taskList.children[i].children[0].classList.add(
            "fa-circle-check",
            "fa-solid"
          );
          taskList.children[i].children[0].style.color = "rgb(255, 116, 66)";
          taskList.children[i].children[1].style.textDecorationLine =
            "line-through";
          taskList.children[i].classList.add("checked");
        }
      }
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

    if (e.target.parentElement.classList.contains("checked")) {
      let checkedArr = window.localStorage.getItem("checked").split("|");
      checkedArr.splice(
        checkedArr.indexOf(e.target.parentElement.textContent),
        1
      );
      let newArr2 = checkedArr.join("|");
      window.localStorage.setItem("checked", newArr2);
    }
  }
  if (taskList.childElementCount == 0) {
    card.style.paddingBottom = "63px";
  }
});

// Mark as done
document.addEventListener("click", (e) => {
  let tasks = document.querySelectorAll(".task");
  tasks = Array.from(tasks);

  if (
    e.target.classList.contains("task") &&
    !e.target.classList.contains("checked")
  ) {
    e.target.children[0].classList.remove("fa-circle", "fa-regular");
    e.target.children[0].classList.add("fa-circle-check", "fa-solid");
    e.target.children[0].style.color = "rgb(255, 116, 66)";
    e.target.children[1].style.textDecorationLine = "line-through";
    e.target.classList.add("checked");

    saveChecked(e.target.textContent);
  } else if (
    e.target.classList.contains("task") &&
    e.target.classList.contains("checked")
  ) {
    e.target.children[0].classList.remove("fa-circle-check", "fa-solid");
    e.target.children[0].classList.add("fa-circle", "fa-regular");
    e.target.children[0].style.color = "#333";
    e.target.children[1].style.textDecorationLine = "none";
    e.target.classList.remove("checked");

    let checkedArr = window.localStorage.getItem("checked").split("|");
    checkedArr.splice(checkedArr.indexOf(e.target.textContent), 1);
    let newArr = checkedArr.join("|");
    window.localStorage.setItem("checked", newArr);
  }
});

// window.localStorage.clear();
