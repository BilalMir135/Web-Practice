//const tasksList = [];

const createHTMLElement = (tag, attribute = '', attributeValue = '') => {
  const element = document.createElement(tag);
  attribute && element.setAttribute(attribute, attributeValue);
  return element;
};

const createButton = (color, type) => {
  const anchor = createHTMLElement(
    'a',
    'class',
    `btn-floating waves-effect waves-light ${color}`
  );
  const icon = createHTMLElement('i', 'class', 'material-icons');
  icon.innerHTML = type;
  anchor.appendChild(icon);
  if (color === 'red') {
    anchor.setAttribute('onClick', 'deleteTask(this)');
  } else {
    anchor.setAttribute('onClick', 'completeTask(this)');
  }
  return anchor;
};

const createTask = (task, id, completed = false) => {
  const li = document.createElement('li');
  li.value = id;
  const taskListDiv = createHTMLElement('div', 'class', 'task-list');
  const taskListContentDiv = createHTMLElement(
    'div',
    'class',
    'task-list-content'
  );
  const para = document.createElement('p');
  para.innerHTML = task;
  taskListContentDiv.appendChild(para);
  taskListDiv.appendChild(taskListContentDiv);
  const btnsDiv = createHTMLElement('div', 'class', 'task-list-btns');
  !completed && btnsDiv.appendChild(createButton('green', 'done'));
  btnsDiv.appendChild(createButton('red', 'delete'));
  taskListDiv.appendChild(btnsDiv);
  li.appendChild(taskListDiv);
  if (completed) {
    taskListContentDiv.style.backgroundColor = '#CCFF99';
    taskListContentDiv.style.textDecoration = 'line-through';
  }
  return li;
};

const deleteTask = (e) => {
  const taskWrapper = e.parentNode.parentNode.parentNode;
  const index = tasksList.indexOf(
    tasksList.find((taskObj) => taskObj.id === taskWrapper.value)
  );
  index > -1 && tasksList.splice(index, 1);
  localStorage.setItem('tasks', JSON.stringify(tasksList));
  e.parentNode.parentNode.parentNode.remove();
};

const completeTask = (e) => {
  const taskContent = e.parentNode.previousSibling;
  const taskWrapper = e.parentNode.parentNode.parentNode;
  const requiredTask = tasksList.find(
    (taskObj) => taskObj.id === taskWrapper.value
  );
  requiredTask.completed = true;
  localStorage.setItem('tasks', JSON.stringify(tasksList));
  taskContent.style.backgroundColor = '#CCFF99';
  taskContent.style.textDecoration = 'line-through';
  e.remove();
};

let tasksList = [];
window.addEventListener('load', () => {
  if (localStorage.getItem('tasks') === null) {
    tasksList = [];
  } else {
    tasksList = JSON.parse(localStorage.getItem('tasks'));
    tasksList.forEach((item) => {
      document
        .querySelector('ul')
        .appendChild(createTask(item.text, item.id, item.completed));
    });
  }
  return tasksList;
});

document.querySelector('#addTask').addEventListener('click', () => {
  const task = document.querySelector('#task');
  if (task.value) {
    const taskId = Math.floor(Math.random() * 1000);
    task.value &&
      document.querySelector('ul').appendChild(createTask(task.value, taskId));
    tasksList.push({ id: taskId, text: task.value, completed: false });
    localStorage.setItem('tasks', JSON.stringify(tasksList));
    task.value = '';
  }
});
