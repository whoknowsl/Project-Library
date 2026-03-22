const addbook = document.querySelector("#addbook");

const container = document.querySelector("#books-container");
let myLibrary = [];
function Book(title, author, pages, state) {
  if (!new.target) {
    throw Error("You must use the 'new' operator to call the constructor");
  }
  this.id = crypto.randomUUID();
  this.title = title;
  this.author = author;
  this.pages = pages;
  this.state = state;
}

function addBok(title, author, pages, state) {
  const newbook = new Book(title, author, pages, state);
  myLibrary.push(newbook);
}

addBok("Diary of a Wimpy Kid Rodrick Rules", "Jeff Kinney", 216, "Read");
addBok("Moby-Dick, or, The whale", "Herman Melville", 555, "Read");
addBok("Dracula", "Bram Stoker", 353, "Read");
console.log(myLibrary);

function displaybook() {
  myLibrary.forEach((book) => {
    const card = document.createElement("div");
    card.classList.add("card");
    card.innerHTML = `<h3>${book.title}</h3>
    <p>${book.author}</p>
    <p>${book.pages}</p>
    <p>${book.state}</p>`;
    container.appendChild(card);
  });
}
displaybook();
function removebook() {}
function toggelread() {}
