const plusIcon = document.querySelector(".plus-icon");
const popUp = document.querySelector(".pop-up");
let display = document.querySelector(".display");
let card = document.querySelectorAll("article");
const done = document.querySelector(".btn-icon");
const titleTag = document.querySelector(".title");
const body = document.body;
const textBody = document.querySelector(".textarea");
let months = ["January","February","March","April","May","June","July","August","September","October","November","December"]
const notes = JSON.parse(localStorage.getItem("notes") || "[]");


// Opening the page for typing your note
plusIcon.addEventListener("click",()=>{
    popUp.classList.toggle("hidden");
    // body.style.overflow = "hidden"
})

function showNotes(){
    card.forEach((n) =>{
        return n.remove()
    } )
    notes.forEach((note, index) => {
        stopDuplicateNote(note.body);
       let article = document.createElement("article");
       article.innerHTML= `<h3>${note.title}</h3>
       <p>${note.body}</p>
       <p>${note.date}</p>
       <button class="edit" onclick="openNote('${index}','${note.title}','${note.body}')">Edit</button><button onclick="deleteNote(${index})" class="delete">Delete</button>`
       display.append(article)
     
    
    });    
}
function openNote(noteId, title, body){
    stopDuplicateNote(body);
    popUp.classList.toggle("hidden");
    titleTag.value = title
    textBody.value = body
}

function deleteNote(noteId){
    alert("Are you sure, you want to delete note?")
    notes.splice(noteId, 1);
    localStorage.setItem("notes", JSON.stringify(notes))
    document.location.reload();
}
showNotes()
function stopDuplicateNote(note){
    if(textBody.value == note){
        textBody.value = "";
        titleTag.value = "";
    }
}

// Add to LocalStorage
done.addEventListener("click",()=>{
   let noteTitle = titleTag.value;
   let noteBody = textBody.value 
   if (noteTitle || noteBody){
    let dateObj = new Date();
    let month = months[dateObj.getMonth()]
    let day = dateObj.getDate();
    let year = dateObj.getFullYear();

    let noteInfo = {
        title: noteTitle,
        body: noteBody,
        date: `${month} ${day}, ${year}`
    }
    stopDuplicateNote(noteInfo.body);
    notes.push(noteInfo);
    localStorage.setItem("notes", JSON.stringify(notes))
   }
   popUp.classList.toggle("hidden");
   showNotes();
   document.location.reload();
   body.style.overflow = "scroll"

})

const x = document.querySelector(".x");
x.addEventListener("click", () => {
    titleTag.value = "";
    textBody.value = "";
    popUp.classList.toggle("hidden");
})

// Search/ filter notes
const search = document.querySelector(".search-notes")
search.addEventListener("keyup", filterNotes)
function filterNotes() {
        const input = search.value;
    const li = document.getElementsByTagName("article");
    for (let i = 0; i < li.length; i++) {
        if (li[i].innerHTML.toLowerCase().includes(input)) {
          li[i].style.display ="";  
        }
        else{
            li[i].style.display = "none";
        }
    }
}
