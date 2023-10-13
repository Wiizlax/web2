const divs = document.querySelectorAll("div");

divs.forEach((divElement) => {
    divElement.addEventListener('mouseover',(div)=>{
        let rgb = "rgb(224, 152, 0)";
        divElement.style.backgroundColor  = rgb;
       
    });
    
});