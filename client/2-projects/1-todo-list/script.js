function populateTodoList(todos) {
  const list = document.getElementById("todo-list");
  todos.forEach(todo => {
    let li = document.createElement('li');
    li.innerText = todo.task;

    let span = document.createElement('span');
    span.classList.add('badge', 'bg-primary', 'rounded-pill');

    let dateSpan = document.createElement('span');
    dateSpan.classList.add('deadline')
    let daysLeft = daysUntil(todo.deadline);
    dateSpan.innerText = daysLeft >= 0 ? daysLeft + ' days left': -daysLeft + ' days overdue'
    li.appendChild(dateSpan);

    ['fa-check', 'fa-trash'].forEach(iCssClass => {
      let i = document.createElement('i');
      i.classList.add('fa');
      i.classList.add(iCssClass);
      i.setAttribute("aria-hidden", "true");
      i.addEventListener('click', function(event) {
        if (iCssClass === 'fa-check') {
          event.target.closest('li').classList.toggle('crossed-text');
        }
        if (iCssClass === 'fa-trash') {
          event.target.closest('li').remove();
        }
      });
      span.appendChild(i);
    });

    li.appendChild(span);
    list.appendChild(li);
  });
}

function addNewTodo(event) {
  event.preventDefault();
  let taskText = document.getElementById('todoInput').value;
  if (taskText === '') {
    alert('Value can not be empty');
    return;
  }
  document.getElementById('todoInput').value = '';

  let date = document.getElementById('datepicker').value;

  populateTodoList([{
    task: taskText,
    completed: false,
    deadline: date,
}]);
}

function deleteAllCompletedTodos(event) {
  event.preventDefault();

  let liElements = document.querySelectorAll("#todo-list li");

  let filteredItems = Array.from(liElements).filter(li => {
    return li.classList.contains("crossed-text");
  });

  filteredItems.forEach(item => {
    item.remove();
  });
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

let todos = [
  { task: "Wash the dishes", completed: false, deadline: '05/16/2024' },
  { task: "Do the shopping", completed: false, deadline: '05/16/2024' },
];

populateTodoList(todos);
