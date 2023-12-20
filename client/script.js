function populateTodoList(todos) {
  try {
    let list = document.getElementById("todoList");

    // Clear the contents of the list before creating new items
    list.innerHTML = "";

    // Create task items and add "Mark as Done" and "Delete" buttons
    todos.forEach((todo) => {
      const todoTask = document.createElement("li");
      todoTask.className = "task-item";

      const taskText = document.createElement("span");
      taskText.textContent = todo.task;

      const buttonsContainer = document.createElement("div");
      buttonsContainer.className = "buttons-container";

      const completeButton = document.createElement("button");
      completeButton.textContent = "Mark as Done";
      completeButton.className = "mark-done";
      completeButton.addEventListener("click", function () {
        todoTask.style.textDecoration = "line-through";
        todoTask.classList.add("done");
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete";
      deleteButton.addEventListener("click", function () {
        list.removeChild(todoTask);
      });

      buttonsContainer.append(completeButton, deleteButton);
      todoTask.append(taskText);
      todoTask.appendChild(buttonsContainer);
      list.appendChild(todoTask);
    });
  } catch (error) {
    console.error("Error in populateTodoList:", error);
  }
}

let todos = [
  { task: "Wash dishes", completed: false },
  { task: "Do homework", completed: false },
  { task: "Cooking dinner", completed: false },
];

// Write your code to create todo list elements with "Mark as Done" and "Delete" buttons here,
// all todos should display inside the "todo-list" element.
// These are the same todos that currently display in the HTML
// You will want to remove the ones in the current HTML after you have created them using JavaScript

populateTodoList(todos);

function addNewTodo(event) {
  try {
    event.preventDefault();

    const input = document.querySelector("#todoInput");
    const list = document.getElementById("todoList");

    if (input.value) {
      const todoTask = document.createElement("li");
      todoTask.className = "task-item";

      const taskText = document.createElement("span");
      taskText.textContent = input.value;

      const buttonsContainer = document.createElement("div");
      buttonsContainer.className = "buttons-container";

      const completeButton = document.createElement("button");
      completeButton.textContent = "Mark as Done";
      completeButton.className = "mark-done";
      completeButton.addEventListener("click", function () {
        todoTask.style.textDecoration = "line-through";
        todoTask.classList.add("done");
      });

      const deleteButton = document.createElement("button");
      deleteButton.textContent = "Delete";
      deleteButton.className = "delete";
      deleteButton.addEventListener("click", function () {
        list.removeChild(todoTask);
      });

      buttonsContainer.append(completeButton, deleteButton);
      todoTask.append(taskText);
      todoTask.appendChild(buttonsContainer);
      list.appendChild(todoTask);

      // Очищення введеного значення після додавання завдання
      input.value = "";
    }
  } catch (error) {
    console.error("Помилка в addNewTodo:", error);
  }
}

const addToDoButton = document.getElementById("addTodoButton");
addToDoButton.addEventListener("click", addNewTodo);

function deleteAllCompletedTodos() {
  const list = document.getElementById("todoList");
  const completedTodos = list.querySelectorAll("li.done");
  completedTodos.forEach((completedTodo) => {
    list.removeChild(completedTodo);
  });
}

const removeCompletedButton = document.getElementById("removeCompletedButton");
removeCompletedButton.addEventListener("click", deleteAllCompletedTodos);
