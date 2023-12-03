function addTodo(item) {
  const todoList = document.getElementById('todoList');
  
  const todoItem = document.createElement('li');
  todoItem.setAttribute('id', item.id);
  todoItem.innerHTML = 
    `${item.title}
    <span>
      <button class="completeButton" taskid="${item.id}">&#10003;</button>
      <button class="modifyButton" taskid="${item.id}">&#9998;</button>
      <button class="deleteButton" taskid="${item.id}">&#128465;</button>
    </span>`;

  /**
   * TODO: 
   * refactor structure of the item.
   * a better structure would be:
   * 
   * <div class="task-container">
   *  <div class="task-title">....</div>
   *  <div class="task-buttons">
   *    <button class="completeButton" />
   *    <button class="modifyButton" />
   *    <button class="deleteButton" />
   *  </div>
   * </div>
   */ 
  
  if (item.done) {
    todoItem.classList.add('completed');
  }

  todoList.appendChild(todoItem);

  /**
   * TODO: 
   * this is still not the best way to do it.
   * we can assign event listener to the button above, while creating it separately
   */
  const completeButtons = todoItem.querySelectorAll('button.completeButton');
  completeButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      const taskid = event.target.getAttribute("taskid");
      
      fetch(`http://localhost:3000/task/${taskid}`, {
        method: "PUT", 
        headers: {
            "Content-Type": "application/json",
        },
        body: JSON.stringify({done: true})
      }).then(res => {
          if (res.ok) {
            toggleCompleteTodo(taskid);
          }
      }).catch(error => {
          // do something with the error.
      });
    });
  });

  const modifyButtons = todoItem.querySelectorAll('button.modifyButton');
  modifyButtons.forEach(button => {
    button.addEventListener('click', modifyTodo);
  });

  const deleteButtons = todoItem.querySelectorAll('button.deleteButton');
  deleteButtons.forEach(button => {
    button.addEventListener('click', function (event) {
      let taskid = event.target.getAttribute("taskid");
      fetch(`http://localhost:3000/task/${taskid}`, {
        method: "DELETE"
      }).then(res => {
          if (res.ok) {
            deleteTodo(taskid);
          }
      })
      .catch(error => {
        // todo...
      });
    });
  });
}

function toggleCompleteTodo(id) {
    const taskElement = document.querySelector(`li[id='${id}']`);
    if (taskElement.classList.contains("completed")) {
      taskElement.classList.remove('completed');
    } else {
      taskElement.classList.add('completed');
    }
    
}

function deleteTodo(id) {
  const taskElement = document.querySelector(`li[id='${id}']`);
  taskElement.remove();
}


// TODO: refactor below:
function modifyTodo(event) {
  const button = event.target;
  let taskid = button.getAttribute("taskid");
  
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

function removeCompletedTodos() {
  const completedTodos = document.querySelectorAll('.completed');
  completedTodos.forEach(todo => todo.remove());
}


function addEventListenersInNewTodoContainer() {
    document.querySelector('#newTodoContainer button:nth-of-type(1)').addEventListener('click', function () {
      fetch(`http://localhost:3000/task/${taskid}`, {
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
          console.log(res);
      })
  });
};
// ---  end of section that needs to be refactored.

function buildToDoList() {
  fetch("http://localhost:3000/task")
  .then(response => {
    if (response.ok) {
      return response.json()
    } 
    
    // instead of throwing error 
    // we might want to shoe a popup overlay on our page.
    // and make it look nice and cool
    // some examples here: 
    // https://www.w3schools.com/howto/howto_css_overlay.asp
    throw new Error("Resonse was not Ok!");

  })
  .then(todos => {
    todos.forEach(item => {
      addTodo(item);
    });
  })
  .catch(error => {
    // this error happens when fetch itself totally failed.
    // in case server is completely down, or there is no internet connection.
    // in this case we still might want to let user know out the problem.
    // if we don't catch it, the rest of the functinality on page won't work.
    // script processing crashes our script.js will stop running at the client's side.
    let errorMessage = `AUCHTUNG!!!\n\nRequest to todo server has failed with error:\n${error.message}`;
    alert(errorMessage);
  });
}


function setup () {
  buildToDoList();
  addEventListenersInNewTodoContainer();
}

window.onload = setup();