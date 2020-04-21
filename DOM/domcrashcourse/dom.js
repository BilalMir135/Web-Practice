function addItems(item) {
  const button = document.createElement('button');
  button.className = 'btn btn-danger btn-sm float-right';
  button.append(document.createTextNode('X'));

  const ul = document.getElementById('items');
  const listItem = document.createElement('li');
  listItem.className = 'list-group-item';
  listItem.append(document.createTextNode(item));
  listItem.append(button);
  ul.appendChild(listItem);
}

function removeItems(li) {
  document.querySelector('#items').removeChild(li.parentNode);
}

const item = document.querySelector('form input');

//adding items
document.querySelector('form button').addEventListener('click', (e) => {
  e.preventDefault();
  addItems(item.value);
});

//removing items
document.querySelector('#items').addEventListener('click', (e) => {
  if (e.target.classList.contains('btn')) {
    removeItems(e.target);
  }
});

//searching items
document.getElementById('filter').addEventListener('keyup', (e) => {
  const listItems = document.getElementsByTagName('li');
  const text = e.target.value.toLowerCase();
  Array.from(listItems).forEach((item) => {
    if (item.firstChild.textContent.toLowerCase().indexOf(text) != -1) {
      item.style.display = 'block';
    } else {
      item.style.display = 'none';
    }
  });
});
