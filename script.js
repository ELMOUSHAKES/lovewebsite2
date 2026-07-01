// =========================
// PASSWORD
// =========================

const PASSWORD = "joo"; // غير الباسورد

const loader = document.querySelector(".loader");
const container = document.querySelector(".container");
const unlock = document.getElementById("unlock");
const password = document.getElementById("password");
const error = document.getElementById("error");
const music = document.getElementById("music");

function openWebsite(){

    loader.style.opacity = "0";

    setTimeout(()=>{

        loader.style.display = "none";

        container.style.display = "block";

        music.play().catch(()=>{});

    },600);

}

unlock.onclick = ()=>{

   
