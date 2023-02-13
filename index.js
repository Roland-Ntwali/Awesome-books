const booksList = document.querySelector('#list'); // Select the HTML element with id "list"
let booklist = []; // Create an empty array to store the books
let bookHtml = ''; // Create an empty string to store the HTML for each book

// Check if the "books" item exists in local storage
if (JSON.parse(localStorage.getItem('books')) == null) {
  const bookObj = { allbook: booklist }; // Create an object to store the booklist
  localStorage.setItem('books', JSON.stringify(bookObj)); // Store the bookObj in local storage as a string
} else {
  booklist = JSON.parse(localStorage.getItem('books')).allbook; // Get the booklist from local storage

  // Generate HTML for each book and add it to the bookHtml string
  booklist.forEach((item, index) => {
    bookHtml += `
<p>${item.title}</p>
<p>${item.author}</p>
<button type="button" class="remove" id="${index}">Remove</button>
<hr>`;
  });

  // Set the innerHTML of the booksList element to the generated HTML
  booksList.innerHTML = bookHtml;
}

const bookForm = document.querySelector('#book-form'); // Select the HTML element with id "book-form"
const bookTitle = document.querySelector('#title'); // Select the HTML element with id "title"
const bookAuthor = document.querySelector('#author'); // Select the HTML element with id "author"

// Add an event listener to the bookForm element to handle form submissions
bookForm.addEventListener('submit', () => {
  const newBook = {
    title: bookTitle.value, // Get the value of the "title" element
    author: bookAuthor.value, // Get the value of the "author" element
  };

  const obj = JSON.parse(localStorage.getItem('books')); // Get the books from local storage

  obj.allbook.push(newBook); // Add the new book to the booklist

  booklist = obj.allbook;
  localStorage.setItem('books', JSON.stringify(obj)); // Update the booklist in local storage
});

const removeBtn = document.querySelectorAll('.remove'); // Select all elements with class "remove"

// Add an event listener to each remove button to handle removal of books
removeBtn.forEach((item) => item.addEventListener('click', () => {
  const removeId = parseInt(item.id, 10); // Get the id of the button that was clicked
  const obj = JSON.parse(localStorage.getItem('books')); // Get the books from local storage
  booklist = obj.allbook;
  // Remove the book with the specified id
  booklist = booklist.filter((element, index) => index !== removeId);
  obj.allbook = booklist;
  localStorage.setItem('books', JSON.stringify(obj)); // Update the booklist in local storage
  window.location.reload(); // Reload the page
}));
