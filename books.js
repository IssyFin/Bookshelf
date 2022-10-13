const displayBlock = document.querySelector("#displayBlock");
const shelf=document.querySelector("#shelf");
const bookList = document.createElement('bookList');
bookList.classList.add("bookList");
bookList.textContent = "My books: \n";
displayBlock.appendChild(bookList);

const newBookButton = document.querySelectorAll("button");

let myLibrary = [
{title:"The Hobbit", author:"JRR Tolkien", pages:295, read:true},
{title:"The Way of Kings", author:"Brandon Sanderson", pages:1007, read:true},
{title:"Name of the Wind", author:"Patrick Rothfuss", pages:662, read:false},
{title:"Throne of Glass", author:"Sara J. Maas",pages:416, read:true}
];

function book(title, author, pages,read){
    this.title=title;
    this.author=author;
    this.pages=pages;
    this.read=read;
    this.info=function(){
    if(this.read===false){
        return(title+" by "+author+", "+pages+" pages, not yet read");
    }
    else{
        return(title+" by "+author+", "+pages+" pages, read");
    }
    }
}

function addBookToLibrary(){
    let title = prompt("What is the book's title?", "The Night Circus");
    let author = prompt("What is the book's author?","Erin Morganstern");
    let pages = prompt("How many pages is the book?","387");
    let read = prompt("Have you read this book? (Y/N)","N");
    let myBook = Object.create(book);
        myBook.title=title;
        myBook.author=author;
        myBook.pages=pages;
    if(read==="Y"){
        myBook.read=true;
    }
    else{
        myBook.read=false;
    }
    myLibrary.push(myBook);
    displayLibrary(myLibrary);
}

function displayLibrary(myLibrary){ 
    var child = shelf.lastElementChild; 
    while (child) {
        shelf.removeChild(child);
        child = shelf.lastElementChild;
    }
    for(let i=0;i<myLibrary.length;i++){
        const thisBook = document.createElement('book');
        thisBook.classList.add("book");
        thisBook.textContent = myLibrary[i].title;
        shelf.appendChild(thisBook);
        const removeBookButton = document.createElement('button');
        removeBookButton.classList.add("removeBook");
        removeBookButton.textContent = "X";

        thisBook.appendChild(removeBookButton);
        removeBookButton.addEventListener("click",(e)=>{
            removeBook(i);
        })

        const toggleReadButton = document.createElement('button');
        toggleReadButton.classList.add("toggleRead");
        toggleReadButton.textContent="";
        thisBook.appendChild(toggleReadButton);
        toggleReadButton.addEventListener("click",(e)=>{
            toggleRead(i);
        })

    }
}

function removeBook(index){
    myLibrary.splice(index,1);
    displayLibrary(myLibrary);
}

function toggleRead(index){
    myLibrary[index].read = !myLibrary[index].read;
    displayLibrary(myLibrary);
}

newBookButton.forEach(newBookButton => newBookButton.addEventListener('click', (e) => {
    addBookToLibrary();
}))

displayLibrary(myLibrary);
