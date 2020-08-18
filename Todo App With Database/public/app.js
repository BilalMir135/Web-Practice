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
  li.id = id;
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
  firebase
    .database()
    .ref('tasks/' + taskWrapper.id)
    .remove();
  e.parentNode.parentNode.parentNode.remove();
};

const completeTask = (e) => {
  const taskContent = e.parentNode.previousSibling;
  const taskWrapper = e.parentNode.parentNode.parentNode;
  firebase
    .database()
    .ref('tasks/' + taskWrapper.id)
    .set({
      completed: true,
      text: taskContent.childNodes[0].innerHTML,
    });
  taskContent.style.backgroundColor = '#CCFF99';
  taskContent.style.textDecoration = 'line-through';
  e.remove();
};

let tasksData = {};
firebase
  .database()
  .ref('tasks')
  .once('value', (data) => {
    Object.entries(data.val()).forEach(([key, value]) => {
      document
        .querySelector('ul')
        .appendChild(createTask(value.text, key, value.completed));
    });
  });

window.addEventListener('load', () => {
  // if (tasksData) {
  /*  console.log(tasksData);
  Object.entries(tasksData).forEach(([key, value]) => console.log(key)); */
  /*  document
      .querySelector('ul')
      .appendChild(createTask(value.text, key, value.completed));
  */
  // }
});

document.querySelector('#addTask').addEventListener('click', () => {
  const task = document.querySelector('#task');
  if (task.value) {
    //const taskId = Math.floor(Math.random() * 1000);
    const taskId = firebase.database().ref('taskts').push().key;
    console.log(taskId);
    task.value &&
      document.querySelector('ul').appendChild(createTask(task.value, taskId));
    //tasksList.push({ id: taskId, text: task.value, completed: false });
    firebase
      .database()
      .ref('tasks/' + taskId)
      .set({ text: task.value, completed: false });
    //localStorage.setItem('tasks', JSON.stringify(tasksList));
    task.value = '';
  }
});
