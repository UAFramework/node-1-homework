function populateTodoList(todos) {
  const list = document.getElementById("todo-list");
  // Write your code to create todo list elements with completed and delete buttons here, all todos should display inside the "todo-list" element.
  for (let i = 0; i < todos.length; i++) {
    const todoTask = document.createElement("li");
    todoTask.textContent = todos[i]["task"];

    const span = document.createElement("span");
    span.className = "badge bg-primary rounded-pill";

    const iFirst = document.createElement("i");
    iFirst.className = "fa fa-check";
    iFirst.addEventListener("click", function () {
      todoTask.style.textDecoration = "line-through";
    });

    const iSecond = document.createElement("i");
    iSecond.className = "fa fa-trash";
    iSecond.addEventListener("click", function() {
      list.removeChild(todoTask);
    });

    span.append(iFirst, iSecond);
    todoTask.append(span);
    list.append(todoTask);
  }
  return list;
}

// These are the same todos that currently display in the HTML
// You will want to remove the ones in the current HTML after you have created them using JavaScript
let todos = [
  { task: "Wash the dishes", completed: false },
  { task: "Do the shopping", completed: false },
];

populateTodoList(todos);

// This function will take the value of the input field and add it as a new todo to the bottom of the todo list. These new todos will need the completed and delete buttons adding like normal.
function addNewTodo() {
  const list = document.querySelector("#todo-list");
  const input = document.querySelector("#todoInput");

  function createNewTodo(event) {
    event.preventDefault();
    if (input.value) {
      const todoTask = document.createElement("li");
      todoTask.textContent = input.value;

      const span = document.createElement("span");
      span.className = "badge bg-primary rounded-pill";

      const iFirst = document.createElement("i");
      iFirst.className = "fa fa-check";
      iFirst.addEventListener("click", function () {
        todoTask.style.textDecoration = "line-through";
      });

      const iSecond = document.createElement("i");
      iSecond.className = "fa fa-trash";
      iSecond.addEventListener("click", function() {
        list.removeChild(todoTask);
      });

      span.append(iFirst, iSecond);
      todoTask.append(span);
      list.append(todoTask);

      input.value = "";
    }
  }

  const addToDoButton = document.querySelector(".btn.btn-primary.mb-3");
  addToDoButton.addEventListener("click", createNewTodo);
}

addNewTodo();

// Advanced challenge: Write a fucntion that checks the todos in the todo list and deletes the completed ones (we can check which ones are completed by seeing if they have the line-through styling applied or not).
function deleteAllCompletedTodos() {
  function removeAllDoneTodos (event) {
    event.preventDefault();
    const list = document.querySelector("#todo-list");
    const allTodos = document.querySelectorAll("#todo-list li");
    for (let i = 0; i < allTodos.length; i++) {
      if (allTodos[i].style.textDecoration === "line-through") {
        list.removeChild(allTodos[i]);
      }
    }
  }

  const removeButton = document.querySelector("#remove-all-completed");
  removeButton.addEventListener("click", removeAllDoneTodos);
}

deleteAllCompletedTodos();