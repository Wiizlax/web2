const feux = document.querySelectorAll(".light");
let indexLumiereCourante = 0;

function basculerLumieres() {
  feux.forEach((feu, index) => {
    if (index === indexLumiereCourante) {
      feu.classList.add("active");
      feu.classList.remove("inactive");
    } else {
      feu.classList.remove("active");
      feu.classList.add("inactive");
    }
  });
  indexLumiereCourante = (indexLumiereCourante + 1) % feux.length;
}

function demarrerFeuTricolore() {
  basculerLumieres();
  setInterval(basculerLumieres, 2000);
}

demarrerFeuTricolore();
