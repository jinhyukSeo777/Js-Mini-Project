const form = document.querySelector(".greeting-main");
const input = form.querySelector("input");
const greetingMessage = form.querySelector(".greeting")

function saveCurrentUser(currentUser) {
    localStorage.setItem("currentUser", currentUser);
}

function handleSubmit(event){
    event.preventDefault();
    input.classList.add("hiding");
    input.classList.remove("showing");
    currentUser = input.value;
    saveCurrentUser(currentUser);
    showGreeting(currentUser);
}

function askName() {
    input.classList.remove("hiding");
    input.classList.add("showing");
    form.addEventListener("submit", handleSubmit);
}

function getTime() {
    const date = new Date();
    const hours = date.getHours();
    if(hours < 6) {return "Dawn"}
    else if(hours < 12) {return "Morning";}
    else if(hours < 18) {return "AfterNoon"}
    else {return "Evening"}
}

function showGreeting(currentUser) {
    greetingMessage.classList.remove("hiding");
    greetingMessage.classList.add("showing");
    const time = getTime();
    greetingMessage.innerText = `Good ${time} ${currentUser}!`;
}

function loadName() {
    const currentUser = localStorage.getItem("currentUser");
    if(currentUser == null) {
        askName();
    }
    else {
        showGreeting(currentUser);
    }
}

function init() {
    loadName();
}

init();