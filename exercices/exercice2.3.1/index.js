const formulaire = document.getElementById("form");
const texte = document.getElementById("text");
const bouton = document.getElementById("btn");
const txtApresSubmit = document.getElementById("textAfterSubmit");

bouton.addEventListener("click", onSubmit);

function onSubmit (e){
  e.preventDefault();
  formulaire.style.display = "none";
  let nouveauTexte = text.value;
  txtApresSubmit.innerText = nouveauTexte;
};
