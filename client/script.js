const baseUrl = 'http://localhost:3000';
let allTasks = {};

const getAllTasks = async () => {
  try {
    const response = await fetch(`${baseUrl}/task`);
    const tasks = await response.json();
    console.log('All Tasks:', tasks);
    allTasks = tasks;
    populateTodoList(tasks);
  } catch (error) {
    console.error('Error fetching tasks:', error.message);
  }
};

const createTask = async (details) => {
  try {
    const response = await fetch(`${baseUrl}/task`, {
      method: 'POST',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ details }),
    });
    const newTask = await response.json();
    console.log('New Task:', newTask);
  } catch (error) {
    console.error('Error creating task:', error.message);
  }
};

const updateTask = async (id, details) => {
  try {
    const response = await fetch(`${baseUrl}/task/${id}`, {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
      },
      body: JSON.stringify({ details }),
    });
    console.log('Task Updated:', await response.text());
  } catch (error) {
    console.error('Error updating task:', error.message);
  }
};

const deleteTask = async (id) => {
  try {
    const response = await fetch(`${baseUrl}/task/${id}`, {
      method: 'DELETE',
    });
    console.log('Task Deleted:', await response.text());
  } catch (error) {
    console.error('Error deleting task:', error.message);
  }
};

const populateTodoList = (todos) => {
  const list = document.getElementById("todo-list");
  list.innerHTML = '';

  todos.forEach(async (todo) => {
    let li = document.createElement('li');
    li.innerText = todo.details.task;
    li.setAttribute('task-id', todo.id);

    let span = document.createElement('span');
    span.classList.add('badge', 'bg-primary', 'rounded-pill');

    let dateSpan = document.createElement('span');
    dateSpan.classList.add('deadline')
    let daysLeft = daysUntil(todo.details.deadline);
    dateSpan.innerText = daysLeft >= 0 ? daysLeft + ' days left': -daysLeft + ' days overdue'
    li.appendChild(dateSpan);

    if (todo.details.completed) {
      li.classList.add('crossed-text');
    }

    ['fa-check', 'fa-trash'].forEach(async (iCssClass) => {
      let i = document.createElement('i');
      i.classList.add('fa');
      i.classList.add(iCssClass);
      i.setAttribute("aria-hidden", "true");

      i.addEventListener('click', async function (event) {
        var taskId = event.target.closest('li').getAttribute('task-id');
        if (iCssClass === 'fa-check') {
          let taskIndex = allTasks.findIndex(task => task.id === +taskId);

          if (taskIndex !== -1) {
            allTasks[taskIndex].details.completed = !allTasks[taskIndex].details.completed;
          } else {
            alert('Error');
            return;
          }

          await updateTask(taskId, allTasks[taskIndex].details);
          console.log(allTasks);
        }

        if (iCssClass === 'fa-trash') {
          try {
            const result = await deleteTask(taskId);
          } catch (error) {
            console.error('Ошибка при удалении задачи:', error);
          }
        }

        await getAllTasks();
      });

      span.appendChild(i);
    });

    li.appendChild(span);
    list.appendChild(li);
  });
}

const addNewTodo = async (event) => {
  event.preventDefault();
  let taskText = document.getElementById('todoInput').value;
  if (taskText === '') {
    alert('Value can not be empty');
    return;
  }
  document.getElementById('todoInput').value = '';

  let date = document.getElementById('datepicker').value;

  const result = await createTask({
    task: taskText,
    completed: false,
    deadline: date,
  });
  await getAllTasks();
}

function deleteAllCompletedTodos(event) {
  event.preventDefault();

  let liElements = document.querySelectorAll("#todo-list li");

  let filteredItems = Array.from(liElements).filter(li => {
    return li.classList.contains("crossed-text");
  });

  filteredItems.forEach(item => {
    let taskId = item.getAttribute('task-id');
    deleteTask(+taskId);
  });
  getAllTasks();
}

function daysUntil(targetDateStr) {
  let parts = targetDateStr.split('/');
  let targetDate = new Date(parts[2], parts[0] - 1, parts[1]);

  let currentDate = new Date();

  return Math.ceil((targetDate.getTime() - currentDate.getTime()) / (1000 * 3600 * 24));
}

let addButton = document.querySelector('.btn-primary');
addButton.addEventListener('click', addNewTodo);

let removeButton = document.getElementById('remove-all-completed');
removeButton.addEventListener('click', deleteAllCompletedTodos);

getAllTasks();
