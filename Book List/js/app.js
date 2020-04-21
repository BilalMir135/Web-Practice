class Book {
  constructor(title, author, isbn) {
    this.title = title;
    this.author = author;
    this.isbn = isbn;
  }
}

class UI {
  static displayBook() {
    const books = Store.getBooks();
    books.forEach((book) => UI.addBookToList(book));
  }

  //to add book on UI
  static addBookToList(book) {
    const list = document.querySelector('#book-list');

    const row = document.createElement('tr');
    row.innerHTML = `
        <td>${book.title}</td>
        <td>${book.author}</td>
        <td>${book.isbn}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>`;

    list.appendChild(row);
  }

  static removeBook(targetCell) {
    //check the cell is delete buttom cell
    if (targetCell.classList.contains('delete')) {
      // a parent td and td parent tr so delete tr
      targetCell.parentElement.parentElement.remove();
    }
  }

  static clearFields() {
    document.querySelector('#title').value = '';
    document.querySelector('#author').value = '';
    document.querySelector('#isbn').value = '';
  }

  static showAlert(messsage, className) {
    const div = document.createElement('div');
    div.className = `alert alert-${className}`;
    div.appendChild(document.createTextNode(messsage));
    const container = document.querySelector('.container');
    const form = document.querySelector('#book-form');
    container.insertBefore(div, form);

    //vanish alert in 3s
    setTimeout(() => document.querySelector('.alert').remove(), 3000);
  }
}

class Store {
  static getBooks() {
    let book;
    if (localStorage.getItem('books') === null) {
      book = [];
    } else {
      book = JSON.parse(localStorage.getItem('books'));
    }
    return book;
  }

  static addBook(book) {
    const books = Store.getBooks();
    books.push(book);
    localStorage.setItem('books', JSON.stringify(books));
  }

  static removeBook(isbn) {
    const books = Store.getBooks();
    books.forEach((book, index) => {
      if (book.isbn === isbn) {
        books.splice(index, 1);
      }
    });
    localStorage.setItem('books', JSON.stringify(books));
  }
}

//Event display books
document.addEventListener('DOMContentLoaded', UI.displayBook);

//Event to add book
document.querySelector('#book-form').addEventListener('submit', (e) => {
  //prevent actual submit
  e.preventDefault();

  //get form values
  const title = document.querySelector('#title').value;
  const author = document.querySelector('#author').value;
  const isbn = document.querySelector('#isbn').value;

  //validating
  if (title === '' || author === '' || isbn === '') {
    UI.showAlert('Please fill all fields', 'danger');
  } else {
    //creating obj of book
    const book = new Book(title, author, isbn);

    //add book into UI
    UI.addBookToList(book);

    //add book into local storage
    Store.addBook(book);

    //clear fields
    UI.clearFields();

    //show success message
    UI.showAlert('Book added successfully', 'success');
  }
});

//Event to remove book
document.querySelector('#book-list').addEventListener('click', (e) => {
  //e.traget to get the target cell which is clicked
  UI.removeBook(e.target);

  //remove book from local storage
  Store.removeBook(e.target.parentElement.previousElementSibling.textContent);
  //show success message
  UI.showAlert('Book deleted successfully', 'success');
});
