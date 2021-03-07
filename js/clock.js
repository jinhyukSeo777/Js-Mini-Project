const div = document.querySelector(".clock_div");
const time = div.querySelector(".clock_time");


function getTime() {
    const date = new Date();
    const hours = date.getHours();
    const minutes = date.getMinutes();
    const seconds = date.getSeconds();
    time.innerText = `${hours < 12 ? `AM ${hours}` : `PM ${hours-12}`} : ${minutes < 10 ? `0${minutes}` : `${minutes}`} : ${seconds < 10 ? `0${seconds}` : `${seconds}`}`;
}

function init() {
    getTime();
    setInterval(getTime, 1000);
}

init();