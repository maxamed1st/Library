let books = document.getElementById("books");
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
        return [this.title, this.author, this.pages, this.readState]
    }
}
//add new bookObject to library
const addNewBook = function(bookObject) {
    library.push(bookObject);
}
//create new bookObject on submit and update bookArray
form.submit.addEventListener("click", (e)=> {
    title = form.title.value;
    author = form.author.value;
    pages = form.pages.value;
    readStatus = form.readStatus;

    const book = new bookObject(title, author, pages);
    if (form.readStatus.checked) {
        book.read();
    }
    addNewBook(book);
    getFromLibrary();
    e.preventDefault();
})
//get last item with class books
const newBook = function() {
    book = document.createElement("div");
    book.setAttribute("class", "book");
    books.appendChild(book);
    return book;
}
//create new element and add to books
const newElement = function(book, tagname, content) {
    let element = document.createElement(`${tagname}`);
    element.textContent = content;
    book.appendChild(element);
    return book;
}
//create checkbox for readingstate
const readCheckBox = function(book, readState) {
    let div = document.createElement("div");
    let input = document.createElement("input");
    div.innerText = "Read";
    input.setAttribute("type", "checkbox");
    if (readState) {
        input.checked = true;
    }
    div.appendChild(input);
    book.appendChild(div);
}
//Get books from library
const getFromLibrary = function() {
    if (library.length === 0) {
    } else {
        //Make sure screen is empty of books
        while (books.firstChild) {
            books.removeChild(books.lastChild);
        }
        library.forEach((bookObject) => {
            //get bookobject info
            [title, author, pages, readState] = bookObject.info();
            //display books
            book = newBook();
            newElement(book, "div", title);
            newElement(book, "div", author);
            newElement(book, "div", pages);
            readCheckBox(book, readState);
        })
    }   
}