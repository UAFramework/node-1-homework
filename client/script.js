window.onload = function () {
  fetch("http://localhost:3000/todos")
  .then(response => response.json())
  .then(todos => {
    todos.map(item => {
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
        <button class="completeButton">&#10003;</button>
        <button class="modifyButton">&#9998;</button>
        <button class="deleteButton">&#128465;</button>
      </span>
    `;
    if (item.done) {
      todoItem.classList.add('completed');
    }
    document.getElementById('todoList').appendChild(todoItem);

    const buttons = todoItem.querySelectorAll('button');
    buttons.forEach(button => {
      if (button.classList.contains('completeButton')) {
        button.addEventListener('click', function (event) {
          const parentLiId = event.target.parentNode.parentNode.id;
          fetch(`http://localhost:3000/todos`, {
          method: "PATCH", 
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              id: +parentLiId})
          }).then(res => {
              completeTodo(event.target);
              console.log(res.status);
          })
        });
      } else if (button.classList.contains('modifyButton')) {
        button.addEventListener('click', modifyTodo);
      } else if (button.classList.contains('deleteButton')) {
        button.addEventListener('click', function (event) {
          const parentLiId = event.target.parentNode.parentNode.id;
          fetch(`http://localhost:3000/todos/:${parentLiId}`, {
          method: "DELETE", 
          headers: {
              "Content-Type": "application/json",
          },
          body: JSON.stringify({
              id: +parentLiId})
          }).then(res => {
              deleteTodo(event.target);
              const todosContainer = document.querySelector('ul');
              const todosList = todosContainer.querySelectorAll('li');
              updateIdForLi(todosList);
              console.log(res.status);
          })
        });
      }
    });
}

function completeTodo(element) {
    const todoItem = element.parentNode.parentNode;
    todoItem.classList.add('completed');
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
