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
    todoItem.innerHTML = item.title;
    
    const buttonsContainer = document.createElement('span');
	
    const completeButton = document.createElement('button');
    completeButton.className = 'completeButton';
    completeButton.setAttribute('taskid', item.id);
    completeButton.innerHTML = '&#10003';

    const modifyButton = document.createElement('button');
    modifyButton.className = 'modifyButton';
    modifyButton.setAttribute('taskid', item.id);
    modifyButton.innerHTML = '&#9998';

    const deleteButton = document.createElement('button');
    deleteButton.className = 'deleteButton';
    deleteButton.setAttribute('taskid', item.id);
    deleteButton.innerHTML = '&#128465';

    buttonsContainer.append(completeButton, modifyButton, deleteButton);
    todoItem.appendChild(buttonsContainer);

    if(item.done){
      todoItem.classList.add('completed');
    }

    document.getElementById('todoList').appendChild(todoItem);

    const completeButtons = todoItem.querySelectorAll('button.completeButton');
    completeButtons.forEach(button => {
      button.addEventListener('click', function(event){
        const taskid = event.target.getAttribute('taskid');

        fetch(`http://localhost:3000/task/${taskid}`, {
          method: "PUT",
          headers: {
            "Content-Type": "application/json",
            },
            body: JSON.stringify({done: true})
        }).then(res => {
          if(res.ok) {
            toggleCompleteTodo(taskid);
			}
        }).catch(error => {
          console.log("do something with error")
          });
        });
      });

    const modifyButtons = todoItem.querySelectorAll('button.modifyButton');
	  modifyButtons.forEach(button => {
      button.addEventListener('click', modifyTodo);
	 });
	 
	const deleteButtons = todoItem.querySelectorAll('button.deleteButton');
    deleteButtons.forEach(button => {
      button.addEventListener('click', function(event){
        let taskid = event.target.getAttribute('taskid');
        fetch(`http://localhost:3000/task/${taskid}`, {
         method: "DELETE"
         }).then(res => {
          if (res.ok){
		  deleteTodo(taskid);
		  }
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
	
	function deleteTodo(id){
	const taskElement = document.querySelector(`li[id='${id}']`);
	taskElement.remove();
	}
	
	
	function modifyTodo(event){
	const button = event.target;
	let taskid = button.getAttribute('taskid');
	
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
      document.getElementById('newTodoInput').value = " ";
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
