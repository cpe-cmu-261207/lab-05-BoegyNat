const inputAdd = document.getElementById("input-add-todo");
const todoCtn = document.getElementById("todo-container");

inputAdd.onkeyup = (event) => {
  if (event.key !== "Enter") return;
  if (inputAdd.value == "") {
    alert("todo can not be empty");
  } else {
    let check = false;
    addTodo(inputAdd.value, check);
    inputAdd.value = "";
    saveTodo();
  }

  //your code here
};

function addTodo(title, completed) {
  //create a div that holds todo title, done button, delete button
  const div = document.createElement("div");
  div.className = "border-bottom p-1 py-2 fs-2 d-flex";

  //create span for showing title
  const span = document.createElement("span");
  span.innerText = title;
  span.style.textDecoration = completed ? "line-through" : "";
  span.className = "me-3";

  //create done button
  const doneBtn = document.createElement("button");
  doneBtn.innerText = "Done";
  doneBtn.className = "btn btn-success me-2";

  //create delete button
  const deleteBtn = document.createElement("button");
  deleteBtn.innerText = "Delete";
  deleteBtn.className = "btn btn-danger";

  doneBtn.style.display = "none";
  deleteBtn.style.display = "none";
  div.appendChild(span);
  div.appendChild(doneBtn);
  div.appendChild(deleteBtn);
  todoCtn.prepend(div);

  div.onmouseover = () => {
    doneBtn.style.display = "";
    deleteBtn.style.display = "";
  };
  div.onmouseout = () => {
    doneBtn.style.display = "none";
    deleteBtn.style.display = "none";
  };

  doneBtn.onclick = () => {
    if (span.style.textDecoration === "line-through") {
      completed = false;
      span.style.textDecoration = "";
    } else {
      completed = true;
      span.style.textDecoration = "line-through";
    }
    saveTodo();
  };
  deleteBtn.onclick = () => {
    todoCtn.removeChild(div);
    saveTodo();
  };
  //your code here
  //append todo to HTML...
  //define buttons event...
}

function saveTodo() {
  const data = [];
  for (const todoDiv of todoCtn.children) {
    const todoObj = {};
    console.log(todoDiv);
    todoObj.title = todoDiv.children[0].innerText;

    todoObj.completed =
      todoDiv.children[0].style.textDecoration === "line-through";
    data.push(todoObj);
    //your code here
  }
  console.log(data);
  const dataStr = JSON.stringify(data);
  localStorage.setItem("data", dataStr);
  //your code here
}

function loadTodo() {
  const dataStr = localStorage.getItem("Data");
  const data = JSON.parse(dataStr);
  for (const todoOdj in data) {
    addTodo(todoOdj.title, todoOdj.completed);
  }
  //your code here
}

loadTodo();
