let menuOptions = document.querySelectorAll("#menu #menuList h2");
let cakes = document.querySelector("#productCardsCntOfCakes");
let cupCakes = document.querySelector("#productCardsCntOfCupCakes");

menuOptions[0].style.borderBottomColor = "#eab9c9";
cakes.style.display = "block";


menuOptions[0].addEventListener("click",()=>{
    menuOptions[0].style.borderBottomColor = "#eab9c9";
    menuOptions[1].style.borderBottomColor = "#eab9c900";
    cakes.style.display = "block";
    cupCakes.style.display = "none";
})

menuOptions[1].addEventListener("click",()=>{
    menuOptions[1].style.borderBottomColor = "#eab9c9";
    menuOptions[0].style.borderBottomColor = "#eab9c900";
    cupCakes.style.display = "block";
    cakes.style.display = "none";
})