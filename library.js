const books = document.getElementById("books");
const newBook = document.getElementById("newBook");
let form = document.querySelector("form");

//Array for bookObjects
library = []

//create bookobject
const bookObject = function(title, author, pages){
    this.title = title,
    this.author = author,
    this.pages = pages,
    this.readState = false,
    //update read state
    this.read = () => {
        this.readState = true
    },
    //return book info
    this.info = () => {
        return [this.title, this.author, this.pages, this.read]
    }
}
//add new bookObject to library
const addNewBook = function(bookObject) {
    library.push(bookObject);
}
//create new bookObject on submit and update bookArray
form.submit.addEventListener("click", ()=> {
    title = form.title.value;
    author = form.author.value;
    pages = form.pages.value;
    readStatus = form.readStatus;

    book = new bookObject(title, author, pages);
    if (form.readStatus.checked) {
        book.read();
    }
    addNewBook(book);
})