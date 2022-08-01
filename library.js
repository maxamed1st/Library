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
    //toggle read state;
    this.toggleReadState = () => {
        this.readState = !this.readState;
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
    let book = document.createElement("div");
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
const readCheckBox = function(book, readState, index) {
    let div = document.createElement("div");
    let input = document.createElement("input");
    div.innerText = "Read";
    input.setAttribute("type", "checkbox");
    if (readState) {
        input.checked = true;
    }
    input.addEventListener("click", () => {
        library[index].toggleReadState();
        checked = library[index].readState;
        toggleBookBg(book, checked);

    })
    div.appendChild(input);
    book.appendChild(div);
}
//delete from library
const deleteBtn = function(book, index) {
    let btn = document.createElement("button");
    btn.setAttribute("id", index);
    btn.textContent = "X";
    btn.addEventListener("click", () => {
        library.splice(btn.id, 1);
        getFromLibrary();
        console.log(library);
    })
    book.appendChild(btn);
}
//Get books from library
const getFromLibrary = function() {
    //Empty books container
    while (books.firstChild) {
        books.removeChild(books.lastChild);
    }
    if (library.length === 0) {
        newElement(books, "div", "There is no books to show");
    } else {
        library.forEach((bookObject, index) => {
            //get bookobject info
            [title, author, pages, readState] = bookObject.info();
            //display books
            book = newBook();
            deleteBtn(book, index);
            newElement(book, "div", title);
            newElement(book, "div", "by "+author);
            newElement(book, "div", pages+" pages");
            readCheckBox(book, readState, index);
        })
    }   
}
const toggleBookBg = function(book, checked) {
    console.log(checked, book);
    if(checked) {
        book.style.backgroundColor = "rgb(214, 214, 214)";
    } else {
        book.style.backgroundColor = "rgb(255, 170, 0)";
    }
}
