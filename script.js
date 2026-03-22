// ── SELECTORS ──
const inputTitle  = document.querySelector("#book-title");
const inputAuthor = document.querySelector("#author-name");
const inputPages  = document.querySelector("#number-of-pages");
const inputState  = document.querySelector("#state");
const container   = document.querySelector("#books-container");
const form        = document.querySelector("form");
 
// ── DATA ──
let myLibrary = [];
 
// ── CONSTRUCTOR ──
function Book(title, author, pages, state) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id     = crypto.randomUUID();
  this.title  = title;
  this.author = author;
  this.pages  = pages;
  this.state  = state;
}
 
// ── PROTOTYPE ──
Book.prototype.toggleRead = function () {
  this.state = this.state === "Read" ? "Not Read" : "Read";
};
 
// ── LIBRARY FUNCTIONS ──
function addBook(title, author, pages, state) {
  const book = new Book(title, author, pages, state);
  myLibrary.push(book);
  displayBooks();
}
 
function removeBook(id) {
  myLibrary = myLibrary.filter((book) => book.id !== id);
  displayBooks();
}
 
// ── DISPLAY FUNCTIONS ──
function createCard(book) {
  const card = document.createElement("div");
  card.classList.add("card");
 
  const isRead = book.state === "Read";
 
  card.innerHTML = `
    <h3>${book.title}</h3>
    <p>${book.author}</p>
    <p>${book.pages} pages</p>
    <span class="state ${isRead ? "state-read" : "state-unread"}">${book.state}</span>
    <div class="card-btns">
      <button class="toggle-btn">${isRead ? "Mark Unread" : "Mark Read"}</button>
      <button class="remove-btn">Remove</button>
    </div>
  `;
 
  card.querySelector(".toggle-btn").addEventListener("click", () => {
    book.toggleRead();
    displayBooks();
  });
 
  card.querySelector(".remove-btn").addEventListener("click", () => {
    removeBook(book.id);
  });
 
  return card;
}
 
function displayBooks() {
  container.innerHTML = "";
 
  if (myLibrary.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <p>Your library is empty — add your first book! 📖</p>
      </div>
    `;
    return;
  }
 
  myLibrary.forEach((book) => {
    container.appendChild(createCard(book));
  });
}
 
// ── FORM HANDLER ──
form.addEventListener("submit", (e) => {
  e.preventDefault();
  addBook(
    inputTitle.value,
    inputAuthor.value,
    inputPages.value,
    inputState.value,
  );
  form.reset();
});
 
// ── DEFAULT BOOKS ──
addBook("Diary of a Wimpy Kid", "Jeff Kinney",    216, "Read");
addBook("Moby-Dick",            "Herman Melville", 555, "Read");
addBook("Dracula",              "Bram Stoker",     353, "Not Read");