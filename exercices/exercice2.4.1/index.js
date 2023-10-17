const btn = document.getElementById("btn");

let timeoutID;
let clickNbr = 0;
const delayInSeconds = 5;
const delayInMilliseconds = delayInSeconds * 1000;
let startTime;

function start() {
  btn.removeEventListener("mouseover", start);
  startTime = new Date().getTime();
  timeoutID = setTimeout(() => {
    alert("Game over, you did not click 10 times within 5s !");
    btn.removeEventListener("click", clickCounter);
  }, delayInMilliseconds);
  btn.addEventListener("click", clickCounter);
}

function clearAlert() {
  clearTimeout(timeoutID);
}

function clickCounter() {
  clickNbr++;
  if (clickNbr >= 10) {
    const endTime = new Date().getTime();
    const elapsedTime = endTime - startTime;
    alert(`You win! You clicked 10 times within ${elapsedTime} ms`);
    btn.removeEventListener("click", clickCounter);
    clearAlert();
  }
}

btn.addEventListener("mouseover", start);
