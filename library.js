let books = document.getElementById("books");
let form = document.querySelector("form");

class Library {
    //Library to hold books and operate on them
    constructor() {
        this.bookArray = [];
    }
    //add new bookObject to bookArray
    addNewBook = function(bookObject) {
    this.bookArray.push(bookObject);
    }
    //Get books from library
    getFromLibrary = function() {
        let ui = new userInterface();
        //Empty books container
        while (books.firstChild) {
            books.removeChild(books.lastChild);
        }
        if (this.bookArray.length === 0) {
            ui.newElement(books, "There is no books to show");
        } else {
            this.bookArray.forEach((bookObject, index) => {
                //get bookobject info
                let [title, author, pages, readState] = bookObject.info();
                //display books
                let book = ui.newBook();
                ui.deleteBtn(book, index);
                ui.newElement(book, title);
                ui.newElement(book, "by "+author);
                ui.newElement(book, pages+" pages");
                ui.readCheckBox(book, readState, index);
                ui.toggleBookBg(book, readState);
            })
        }   
    }
}
const libraryObject = new Library();
//create bookobject
class bookObject { 
    constructor (title, author, pages) {
        this.title = title;
        this.author = author;
        this.pages = pages;
        this.readState = false;
    }
    //update read state
    read = () => {
        this.readState = true
    }
    //return book info
    info = () => {
        return [this.title, this.author, this.pages, this.readState,];
    }
    //toggle read state;
    toggleReadState = () => {
        this.readState = !this.readState;
    }
}
class userInterface {
    //get last item with class books
    newBook = function() {
        let book = document.createElement("div");
        book.setAttribute("class", "book");
        books.appendChild(book);
        return book;
}
    //create new element and add to books
    newElement = function(book, content) {
        let element = document.createElement(`div`);
        element.textContent = content;
        book.appendChild(element);
        return book;
    }
    //create checkbox for readingstate
    readCheckBox = function(book, readState, index) {
        let div = document.createElement("div");
        let input = document.createElement("input");
        div.innerText = "Read";
        input.setAttribute("type", "checkbox");
        if (readState) {
            input.checked = true;
        }
        input.addEventListener("click", () => {
            libraryObject.bookArray[index].toggleReadState();
            let checked = libraryObject.bookArray[index].readState;
            this.toggleBookBg(book, checked);

        })
        div.appendChild(input);
        book.appendChild(div);
    }
        //delete from library
    deleteBtn = function(book, index) {
        let btn = document.createElement("button");
        btn.setAttribute("id", index);
        btn.textContent = "X";
        btn.addEventListener("click", () => {
            libraryObject.bookArray.splice(btn.id, 1);
            libraryObject.getFromLibrary();
        })
        book.appendChild(btn);
    }
    toggleBookBg = function(book, checked) {
        if(checked) {
            book.style.backgroundColor = "rgb(214, 214, 214)";
        } else {
            book.style.backgroundColor = "rgb(255, 170, 0)";
        }
    }
}
//create new bookObject on submit and update Library
form.submit.addEventListener("click", (e)=> {
    title = form.title.value;
    author = form.author.value;
    pages = form.pages.value;
    readStatus = form.readStatus;

    const book = new bookObject(title, author, pages);
    if (form.readStatus.checked) {
        book.read();
    }
    libraryObject.addNewBook(book);
    libraryObject.getFromLibrary();
    e.preventDefault();
})
