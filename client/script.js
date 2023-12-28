window.onload = function (){
    fetch ("http://localhost:3000/task")
    .then(response => response.json())
    .then(todos => {
      todos.map(item =>{
        addTodo(item);
      });
    })
}

   function addTodo(item) {
    const todoItem = document.createElement('li');
    todoItem.setAttribute('id', item.id);
    todoItem.innerHTML = `
        ${item.title}
        <span>
          <button class="completeButton" taskId = "${item.id}">&#10003;</button>
          <button class="modifyButton" taskId = "${item.id}">&#9998;</button>
          <button class="deleteButton" taskId = "${item.id}">&#128465;</button>
        </span>
      `;
      if (item.done) {
        todoItem.classList.add('completed');
      }
  
      document.getElementById('todoList').appendChild(todoItem);
  
      const completeButtons = todoItem.querySelectorAll('button.completeButton');
      completeButtons.forEach(button => {
       button.addEventListener('click', function(event) {
          const taskId = event.target.taskId;
  
          fetch(`http://localhost:3000/task/${taskId}`, {
            method: "PUT",
            headers: {
            "Content-Type": "application/json"
            },
            body: JSON.stringify({done: true})
          }).then(res => {
            toggleCompleteTodo(event.target.taskId);
            console.log(res.status);
          }).catch(error => {
            console.log("do something with error");
          })
        })
      });
  
      const modifyButtons = button.classList.contains('modifyButton');
      modifyButtons.forEach(button =>{
        button.addEventListener('click', modifyTodo);
      });
  
      const deleteButtons = button.classList.contains('deleteButton');
      deleteButtons.forEach(button =>{
          button.addEventListener('click', function (event) {
          const parentLiId = event.target.taskId;
  
          fetch(`http://localhost:3000/task/:${taskId}`, {
          method: "DELETE"
          }).then(res => {
              deleteTodo(event.target);
              const todosContainer = document.querySelector('ul');
              const todosList = todosContainer.querySelectorAll('li');
              updateIdForLi(todosList);
              console.log(res.status);
          });
        });
      });
    }
  
  

  function toggleCompleteTodo(id) {
    const taskElement = document.querySelector(`li#${id}`);
    if (taskElement.classList.contains("completed")) {
      taskElement.classList.remove('completed');
    } else {
      taskElement.classList.add('completed');
    }
    
  }
  
  function modifyTodo(event) {
    const button = event.target;
    const todoItem = button.parentNode.parentNode;
    const todoTitle = todoItem.firstChild.textContent.trim();
  
    const inputField = document.createElement('input');
    inputField.type = 'text';
    inputField.value = todoTitle;
  
    const saveButton = document.createElement('button');
    saveButton.textContent = 'Save';
    saveButton.addEventListener("click", function (event) {
      const newTitle = inputField.value.trim();
      if (newTitle !== '') {
        todoItem.firstChild.textContent = newTitle;
        todoItem.removeChild(inputField);
        todoItem.removeChild(saveButton);
      } else {
        alert('Please enter a valid title!');
      }
      fetch(`http://localhost:3000/todos/:${todoItem.id}`, {
        method: "PATCH", 
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          id: +todoItem.id,
          title: newTitle})
        }).then(res => {
            console.log(res.status);
          })
      });
    
      todoItem.appendChild(inputField);
      todoItem.appendChild(saveButton);
  }
  
  function deleteTodo(element) {
    const todoItem = element.parentNode.parentNode;
    todoItem.parentNode.removeChild(todoItem);
  }
  
  function removeCompletedTodos() {
    const completedTodos = document.querySelectorAll('.completed');
    completedTodos.forEach(todo => todo.remove());
  }
  
  function updateIdForLi (arr) {
    arr.forEach((item, index) => {
      item.id = index + 1; 
    });
  }
  
  document.querySelector('#newTodoContainer button:nth-of-type(1)').addEventListener('click', function () {
    fetch("http://localhost:3000/todos", {
        method: "POST", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({
            title: document.getElementById('newTodoInput').value,
            done: false})
    }).then(res => {
      const todoItem = document.getElementById('newTodoInput');
      const todosContainer = document.querySelector("ul");
      const liCount = todosContainer.querySelectorAll('li').length;
      if (todoItem.value.trim() !== '') {
        let item = {
          title: todoItem.value.trim(),
          done: false,
          id: liCount + 1
        };
        addTodo(item);
        document.getElementById('newTodoInput').value = '';
        console.log(res);
      } else {
        alert('Please enter a todo title!');
      }
    })
  
  });
  
  document.querySelector('#newTodoContainer button:nth-of-type(2)').addEventListener('click', function () {
  fetch("http://localhost:3000/todos", {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
        }
    }).then(res => {
        removeCompletedTodos();
        const todosContainer = document.querySelector('ul'); // Get the <ul> element
        const todosList = todosContainer.querySelectorAll('li');
        updateIdForLi(todosList);
        console.log(res);
    })
  });
  

// function populateTodoList(todos) {
//   try {
//     let list = document.getElementById("todoList");

//     // Clear the contents of the list before creating new items
//     list.innerHTML = "";

//     // Create task items and add "Mark as Done" and "Delete" buttons
//     todos.forEach((todo) => {
//       const todoTask = document.createElement("li");
//       todoTask.className = "task-item";

//       const taskText = document.createElement("span");
//       taskText.textContent = todo.task;

//       const buttonsContainer = document.createElement("div");
//       buttonsContainer.className = "buttons-container";

//       const completeButton = document.createElement("button");
//       completeButton.textContent = "Mark as Done";
//       completeButton.className = "mark-done";
//       completeButton.addEventListener("click", function () {
//         todoTask.style.textDecoration = "line-through";
//         todoTask.classList.add("done");
//       });

//       const deleteButton = document.createElement("button");
//       deleteButton.textContent = "Delete";
//       deleteButton.className = "delete";
//       deleteButton.addEventListener("click", function () {
//         list.removeChild(todoTask);
//       });

//       buttonsContainer.append(completeButton, deleteButton);
//       todoTask.append(taskText);
//       todoTask.appendChild(buttonsContainer);
//       list.appendChild(todoTask);
//     });
//   } catch (error) {
//     console.error("Error in populateTodoList:", error);
//   }
// }

// let todos = [
//   { task: "Wash dishes", completed: false },
//   { task: "Do homework", completed: false },
//   { task: "Cooking dinner", completed: false },
// ];

// // Write your code to create todo list elements with "Mark as Done" and "Delete" buttons here,
// // all todos should display inside the "todo-list" element.
// // These are the same todos that currently display in the HTML
// // You will want to remove the ones in the current HTML after you have created them using JavaScript

// populateTodoList(todos);

// function addNewTodo(event) {
//   try {
//     event.preventDefault();

//     const input = document.querySelector("#todoInput");
//     const list = document.getElementById("todoList");

//     if (input.value) {
//       const todoTask = document.createElement("li");
//       todoTask.className = "task-item";

//       const taskText = document.createElement("span");
//       taskText.textContent = input.value;

//       const buttonsContainer = document.createElement("div");
//       buttonsContainer.className = "buttons-container";

//       const completeButton = document.createElement("button");
//       completeButton.textContent = "Mark as Done";
//       completeButton.className = "mark-done";
//       completeButton.addEventListener("click", function () {
//         todoTask.style.textDecoration = "line-through";
//         todoTask.classList.add("done");
//       });

//       const deleteButton = document.createElement("button");
//       deleteButton.textContent = "Delete";
//       deleteButton.className = "delete";
//       deleteButton.addEventListener("click", function () {
//         list.removeChild(todoTask);
//       });

//       buttonsContainer.append(completeButton, deleteButton);
//       todoTask.append(taskText);
//       todoTask.appendChild(buttonsContainer);
//       list.appendChild(todoTask);

//       // Очищення введеного значення після додавання завдання
//       input.value = "";
//     }
//   } catch (error) {
//     console.error("Помилка в addNewTodo:", error);
//   }
// }

// const addToDoButton = document.getElementById("addTodoButton");
// addToDoButton.addEventListener("click", addNewTodo);

// function deleteAllCompletedTodos() {
//   const list = document.getElementById("todoList");
//   const completedTodos = list.querySelectorAll("li.done");
//   completedTodos.forEach((completedTodo) => {
//     list.removeChild(completedTodo);
//   });
// }

// const removeCompletedButton = document.getElementById("removeCompletedButton");
// removeCompletedButton.addEventListener("click", deleteAllCompletedTodos);
