// ── SELECTORS ──
const inputTitle  = document.querySelector("#book-title");
const inputAuthor = document.querySelector("#author-name");
const inputPages  = document.querySelector("#number-of-pages");
const inputState  = document.querySelector("#state");
const container   = document.querySelector("#books-container");
const form        = document.querySelector("form");
const filterBtns  = document.querySelectorAll(".filter-btn");
 
// ── STATS ELEMENTS ──
const statTotal   = document.querySelector("#stat-total");
const statRead    = document.querySelector("#stat-read");
const statUnread  = document.querySelector("#stat-unread");
const bookCount   = document.querySelector("#book-count");
 
// ── DATA ──
let myLibrary  = [];
let filterState = "all";
 
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
 
// ── HELPERS ──
function getBadgeClass(state) {
  if (state === "Read")     return "read";
  if (state === "Reading")  return "reading";
  return "unread";
}
 
function updateStats() {
  const total   = myLibrary.length;
  const read    = myLibrary.filter(b => b.state === "Read").length;
  const unread  = myLibrary.filter(b => b.state === "Not Read").length;
 
  statTotal.textContent  = total;
  statRead.textContent   = read;
  statUnread.textContent = unread;
  bookCount.textContent  = total;
}
 
// ── LIBRARY FUNCTIONS ──
function addBook(title, author, pages, state) {
  const book = new Book(title, author, pages, state);
  myLibrary.push(book);
  displayBooks();
  updateStats();
}
 
function removeBook(id) {
  myLibrary = myLibrary.filter((book) => book.id !== id);
  displayBooks();
  updateStats();
}
 
// ── CREATE CARD ──
function createCard(book) {
  const card       = document.createElement("div");
  const badgeClass = getBadgeClass(book.state);
 
  card.classList.add("card");
  card.innerHTML = `
    <div class="card-bar ${badgeClass}"></div>
    <div class="card-body">
      <h3 class="card-title">${book.title}</h3>
      <p class="card-author">by ${book.author}</p>
      <p class="card-pages">${book.pages} pages</p>
      <span class="badge ${badgeClass}">${book.state}</span>
    </div>
    <div class="card-btns">
      <button class="toggle-btn">${book.state === "Read" ? "Mark Unread" : "Mark Read"}</button>
      <button class="remove-btn">Remove</button>
    </div>
  `;
 
  card.querySelector(".toggle-btn").addEventListener("click", () => {
    book.toggleRead();
    displayBooks();
    updateStats();
  });
 
  card.querySelector(".remove-btn").addEventListener("click", () => {
    removeBook(book.id);
  });
 
  return card;
}
 
// ── DISPLAY BOOKS ──
function displayBooks() {
  container.innerHTML = "";
 
  // filter books based on active filter
  const filtered = filterState === "all"
    ? myLibrary
    : myLibrary.filter(b => b.state === filterState);
 
  // empty state
  if (filtered.length === 0) {
    container.innerHTML = `
      <div class="empty-state">
        <span class="empty-icon">📭</span>
        <h3>No books here yet</h3>
        <p>${filterState === "all" ? "Add your first book using the form!" : `No books with status "${filterState}"`}</p>
      </div>
    `;
    return;
  }
 
  filtered.forEach((book) => {
    container.appendChild(createCard(book));
  });
}
 
// ── FILTER BUTTONS ──
filterBtns.forEach(btn => {
  btn.addEventListener("click", () => {
    filterBtns.forEach(b => b.classList.remove("active"));
    btn.classList.add("active");
    filterState = btn.dataset.filter;
    displayBooks();
  });
});
 
// ── FORM SUBMIT ──
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
addBook("Diary of a Wimpy Kid", "Jeff Kinney",     216, "Read");
addBook("Moby-Dick",            "Herman Melville",  555, "Read");
addBook("Dracula",              "Bram Stoker",      353, "Not Read");
addBook("The Great Gatsby",     "F. Scott Fitzgerald", 180, "Reading");