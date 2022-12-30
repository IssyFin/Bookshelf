const displayBlock = document.querySelector("#displayBlock");
const shelf=document.querySelector("#shelf");
const bookList = document.createElement('bookList');
bookList.classList.add("bookList");
bookList.textContent = "My books: \n";
displayBlock.appendChild(bookList);

const newBookButton = document.querySelectorAll("button");


//Set up our library array here:
let myLibrary = [ 
{title:"The Hobbit", author:"JRR Tolkien", pages:295, read:true},
{title:"The Way of Kings", author:"Brandon Sanderson", pages:1007, read:true},
{title:"Name of the Wind", author:"Patrick Rothfuss", pages:662, read:false},
{title:"Throne of Glass", author:"Sara J. Maas",pages:416, read:true}
];

function bindEvents(){
    let displayBlock = document.getElementById("description");
    displayBlock.addEventListener("click",(e)=>{
        hideBookInfo();
    })
    let titleInput = document.getElementById("title");
    let authorInput = document.getElementById("author");
    let pageCountInput = document.getElementById("pageCount");
    let readInput = document.getElementById("readBook");
    titleInput.addEventListener("focusout",(event)=>{
        showError();}
    )
    authorInput.addEventListener("focusout",(event)=>{
        showError();}
    )
    pageCountInput.addEventListener("focusout",(event)=>{
        showError();}
    )
    readInput.addEventListener("focusout",(event)=>{
        showError();}
    )
}

//class to create a book
class Book{

    //constructor for book
    constructor(title,author,pages,read){
        this.title =title;
        this.author = author;
        this.pages = pages;
        this.read = read; 
    }

    //getter for book info
    get info(){
        if(this.read===false){
            return(title+" by "+author+", "+pages+" pages, not yet read");
        }
        else{
            return(title+" by "+author+", "+pages+" pages, not yet read");
        }
    }
}

//function to add a book to my library
function addBookToLibrary(){
    let titleInput = document.getElementById("title");
    let authorInput = document.getElementById("author");
    let pagesInput = document.getElementById("pageCount");
    let readInput = document.getElementById("readBook");
    let title = titleInput.value;
    let author = authorInput.value;
    let pages = pagesInput.value;
    let read=readInput.value;
    if(read==="Yes"){
        read=true;
    }
    else{
        read=false;
    }
    let myBook = new Book(title, author, pages, read);
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

        thisBook.addEventListener("click",(e)=>{
            displayBookInfo(i);
        })

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

function displayBookInfo(index){
    let displayBox = document.getElementById("description");
    let displayContents = displayBox.children;
    displayContents[0].textContent = myLibrary[index].title;
    displayContents[1].textContent = "by "+myLibrary[index].author;
    displayContents[2].textContent = myLibrary[index].pages+" pages";
    if(myLibrary[index].read === true){
        displayContents[3].textContent = "Read";
    }
    else{
        displayContents[3].textContent = "Not yet read";
    }
    displayBox.classList.remove("hidden");
}

function hideBookInfo(){
    displayBox = document.getElementById("description");
    displayBox.classList.add("hidden");
}

function showError(){
    let titleInput = document.getElementById("title");
    let authorInput = document.getElementById("author");
    let pageCountInput = document.getElementById("pageCount");
    let readInput = document.getElementById("readBook");
    let errorMessage=document.getElementById("errorMessage");
    if(titleInput.value===""){
        errorMessage.textContent = "Please enter a title."
        return true;
    }
    else if(authorInput.value === ""){
        errorMessage.textContent = "Please enter an author.";
        return true;
    }
    else if(pageCountInput.value===""){
        errorMessage.textContent = "Please enter a page count.";
        return true;
    }
    else if(readInput.value === ""){
        errorMessage.textContent = "Please indicate whether the book has been read.";
        return true;
    }
    else{
        errorMessage.textContent = "";
        return false;
    }
}

newBookButton.forEach(newBookButton => newBookButton.addEventListener('click', (e) => {
    let titleInput = document.getElementById("title");
    let authorInput = document.getElementById("author");
    let pageCountInput = document.getElementById("pageCount");
    let readInput = document.getElementById("readBook");
    if(showError()===false){
        addBookToLibrary();
        titleInput.value="";
        authorInput.value="";
        pageCountInput.value="";
        readInput.value="";
    }   
}))

bindEvents();
displayLibrary(myLibrary);
