const header = document.querySelector(".toDo-header");
const input = header.querySelector("input");
const input_btn = header.querySelector("button");
const toDo = document.querySelector(".toDo");
const finish = document.querySelector(".finish");

let toDos = [];
let finishs = [];
let id_num = 1;

function saveToDo() {
    localStorage.setItem("toDos", JSON.stringify(toDos));
}

function saveFinish() {
    localStorage.setItem("finishs", JSON.stringify(finishs));
}

function removeToDo(event) {
    const i = event.target;
    const btn = i.parentNode;
    const icons = btn.parentNode;
    const column = icons.parentNode;
    toDo.removeChild(column);
    const cleanToDos = toDos.filter(function(obj) {
        return obj.id != parseInt(column.id);
    });
    toDos = cleanToDos;
    saveToDo();
}

function removeFinish(event) {
    const i = event.target;
    const btn = i.parentNode;
    const icons = btn.parentNode;
    const column = icons.parentNode;
    finish.removeChild(column);
    const cleanFinishs = finishs.filter(function(obj) {
        return obj.id != parseInt(column.id);
    });
    finishs = cleanFinishs;
    saveFinish();
}

function moveFinish(event) {
    const i = event.target;
    const btn = i.parentNode;
    const icons = btn.parentNode;
    const column = icons.parentNode;
    const text = column.querySelector("span");
    paintFinish(text.innerText);
}

function moveToDo(event) {
    const i = event.target;
    const btn = i.parentNode;
    const icons = btn.parentNode;
    const column = icons.parentNode;
    const text = column.querySelector("span");
    paintToDo(text.innerText);
}

function paintToDo(text) {
    const column = document.createElement("div");
    const content = document.createElement("span");
    const icons = document.createElement("div");
    const trash_icon_btn = document.createElement("button");
    const trash_icon_i = document.createElement("i");
    const check_icon_btn = document.createElement("button");
    const check_icon_i = document.createElement("i");

    trash_icon_i.addEventListener("click", removeToDo);
    check_icon_i.addEventListener("click", removeToDo);
    check_icon_i.addEventListener("click", moveFinish);

    content.innerText = text;
    trash_icon_i.innerText = "🗑";
    check_icon_i.innerText = "✔";

    column.classList.add("toDo_column");
    icons.classList.add("toDo_column_icons");
    trash_icon_btn.classList.add("trash-icon");
    check_icon_btn.classList.add("toDo_check-icon");

    toDo.appendChild(column);
    column.appendChild(content);
    column.appendChild(icons);
    column.id = id_num;
    icons.appendChild(trash_icon_btn);
    icons.appendChild(check_icon_btn);
    trash_icon_btn.appendChild(trash_icon_i);
    check_icon_btn.appendChild(check_icon_i);

    const toDoObj = {
        text: text,
        id: id_num++
    };
    toDos.push(toDoObj);
    saveToDo();
}

function paintFinish(text) {
    const column = document.createElement("div");
    const content = document.createElement("span");
    const icons = document.createElement("div");
    const trash_icon_btn = document.createElement("button");
    const trash_icon_i = document.createElement("i");
    const check_icon_btn = document.createElement("button");
    const check_icon_i = document.createElement("i");

    trash_icon_i.addEventListener("click", removeFinish);
    check_icon_i.addEventListener("click", removeFinish);
    check_icon_i.addEventListener("click", moveToDo);

    content.innerText = text;
    trash_icon_i.innerText = "🗑";
    check_icon_i.innerText = "✔";

    column.classList.add("finish_column");
    icons.classList.add("finish_column_icons");
    trash_icon_btn.classList.add("trash-icon");
    check_icon_btn.classList.add("finish_check-icon");

    finish.appendChild(column);
    column.appendChild(content);
    column.appendChild(icons);
    column.id = id_num;
    icons.appendChild(trash_icon_btn);
    icons.appendChild(check_icon_btn);
    trash_icon_btn.appendChild(trash_icon_i);
    check_icon_btn.appendChild(check_icon_i);

    const finishObj = {
        text: text,
        id: id_num++
    };
    finishs.push(finishObj);
    saveFinish();
}

function handleSubmit(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintToDo(currentValue);
    input.value = "";
}

function handleInputClick(event) {
    event.preventDefault();
    const currentValue = input.value;
    paintToDo(currentValue);
    input.value = "";
}

function loadTodo() {
    const cur_toDos = localStorage.getItem("toDos");
    if(cur_toDos != null) {
        const parsedToDos = JSON.parse(cur_toDos);
        parsedToDos.forEach(function(obj) {
            paintToDo(obj.text);
        });
    }
}

function loadFinish() {
    const cur_finishs = localStorage.getItem("finishs");
    if(cur_finishs != null) {
        const parsedFinishs = JSON.parse(cur_finishs);
        parsedFinishs.forEach(function(obj) {
            paintFinish(obj.text);
        });
    }
}

function init() {
    input.addEventListener("submit", handleSubmit);
    input_btn.addEventListener("click", handleInputClick);
    loadTodo();
    loadFinish();
}

init();