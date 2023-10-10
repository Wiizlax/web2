const body = document.querySelector("body");
const clickCountElement = document.querySelector("#clickCount");
const counterMessageElement = document.querySelector("#counterMessage");

let nbrClicks = 0;

body.addEventListener("click", function() {
  nbrClicks++;
  clickCountElement.textContent = "Nombre de clics : " + nbrClicks;
  counterMessageElement.textContent = countClick();
});

function countClick() {
    if (nbrClicks >= 5 && nbrClicks <= 9){
        return "Bravo, bel échauffement !";
    } else if (nbrClicks >= 10){
        return "Vous êtes passé maître en l'art du clic !";
    } else {
        return "Cliquez n'importe où sur la page pour incrémenter le compteur";
    }
}
