const toggleCompleteHandler = async (event) => {
  const button = event.target;
  let taskid = button.getAttribute("taskid");
  let isDone = false;

  fetch(`http://localhost:3000/task/${taskid}`)
  .then(res => {
    if (res.ok) {
      return res.json()
    }
    
    // TODO: if request has failed, can we give use a better experirnce
    // by letting them know more about what's exactle gone wrong? 
    // do we get more details about the error from the server?
    throw new Error(`Got response status from server: ${res.statusText}`);
  })
  .then(task => {
    isDone = !task.done;
    return fetch(`http://localhost:3000/task/${task.id}`, {
        method: "PUT",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({ done: isDone })
      });
  })
  .then(res => {
    
    if (res.ok) {
      const taskTitle = document
        .querySelector(`li[id='${taskid}'] div.task-title`);

      if (isDone) {
        taskTitle.classList.add('completed');
      } else {
        taskTitle.classList.remove('completed');
      }

      return;
    }

    // TODO: if request has failed, can we give use a better experirnce
    // by letting them know more about what's exactle gone wrong? 
    // do we get more details about the error from the server?
    throw new Error(`Got response status from server: ${res.statusText}`);

  })
  .catch(error => {
    alert(`Couldn't update task status due to:\n${error}`);
  });
};

function deleteHandler(event) {
  const button = event.target;
  let taskid = button.getAttribute("taskid");

  fetch(`http://localhost:3000/task/${taskid}`, {
    method: "DELETE"
  })
  .then(res => {
    if (res.ok) {
      const taskElement = document.querySelector(`li[id='${taskid}']`);
      taskElement.remove();
      return;
    }

    // TODO: if request has failed, can we give use a better experirnce
    // by letting them know more about what's exactle gone wrong? 
    // do we get more details about the error from the server?
    throw new Error(`Got server response status: ${res.statusText}`);
  })
  .catch(error => {
    alert(`Couldn't delete task due to:\n${error}`);
  });
  
}

function modifyTodoHandler(event) {
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

    if (newTitle !== "") {
      todoItem.firstChild.textContent = newTitle;
      todoItem.removeChild(inputField);
      todoItem.removeChild(saveButton);
    } else {
      alert('Please enter a valid title!');
      
      // ??? why we should do this:
      return;
    }

    fetch(`http://localhost:3000/todos/:${todoItem.id}`, {
      method: "PUT",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({title: newTitle})
    })
    .catch(error => {
      alert(`Couldn't delete task due to:\n${error}`);
    });
  });

  todoItem.appendChild(inputField);
  todoItem.appendChild(saveButton);
}

function addTask(task) {
  const todoList = document.getElementById('todoList');

  const todoItem = document.createElement('li');
  todoItem.setAttribute('id', task.id);
  todoItem.innerHTML = `
    <div class="task-container">
      <div class="task-title">${task.title}</div>
      <div class="task-buttons">
        <button class="completeButton" taskid="${task.id}">&#10003;</button>
        <button class="modifyButton" taskid="${task.id}">&#9998;</button>
        <button class="deleteButton" taskid="${task.id}">&#128465;</button>
      </div>
    </dev>`;

  if (task.done) {
    todoItem.querySelector("div.task-title").classList.add('completed');
  }

  todoList.appendChild(todoItem);

  /**
   * TODO: 
   * this is still not the best way to do it.
   * we can assign event listener to the button above, while creating it separately
   */
  const completeButton = todoItem.querySelector('button.completeButton');
  completeButton.addEventListener('click', toggleCompleteHandler);
  
  const modifyButton = todoItem.querySelector('button.modifyButton');
  modifyButton.addEventListener('click', modifyTodoHandler);

  const deleteButton = todoItem.querySelector('button.deleteButton');
  deleteButton.addEventListener("click", deleteHandler);

}

function removeCompletedTodos() {
  const completedTodos = document.querySelectorAll('.completed');
  completedTodos.forEach(todo => todo.remove());
  // TODO: remove from server.
}


function addEventListenersInNewTodoContainer() {

  const addNewTaskButton = document.querySelector("#newTodoContainer button[ref='add-new-todo']");
  addNewTaskButton.addEventListener('click', () => {
  
    let title = document.getElementById('newTodoInput').value.trim();

    if (title === "") {
      alert("Title must be set");
      return;
    }

    fetch(`http://localhost:3000/task`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ title, done: false })
    })
    .then(res => {
      if (res.ok) {
        return res.json();
      }

      // TODO: if request has failed, can we give use a better experirnce
      // by letting them know more about what's exactle gone wrong? 
      // do we get more details about the error from the server?
      throw new Error(`Got server response status: ${res.statusText}`);
    })
    .then(task => {
      
      // reset "Task's Title field":
      title.value = "";

      // add new task item to the list:
      addTask(task);
    })
    .catch(error => {
      alert(`Failed to add a new task, due to:\n${error}`);
    });
  });
};

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
      alert("Response was not Ok!");

    })
    .then(todos => {
      todos.forEach(task => {
        addTask(task);
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


function setup() {
  addEventListenersInNewTodoContainer();
  buildToDoList();
}

window.onload = setup();