const PASSWORD = "joo";

const unlock = document.getElementById("unlock");
const password = document.getElementById("password");
const loader = document.querySelector(".loader");
const container = document.querySelector(".container");
const error = document.getElementById("error");
const music = document.getElementById("music");

function openSite() {
    loader.style.display = "none";
    container.style.display = "block";

    if (music) {
        music.play().catch(() => {});
    }
}

unlock.addEventListener("click", () => {
    if (password.value.trim() === PASSWORD) {
        openSite();
    } else {
        error.textContent = "💖 Wrong Password";
    }
});

password.addEventListener("keydown", (e) => {
    if (e.key === "Enter") {
        unlock.click();
    }
});
// =====================
// Floating Hearts
// =====================

const heartsContainer = document.querySelector(".hearts");

function createHeart(){

    const heart = document.createElement("div");

    heart.className = "heart";

    heart.innerHTML = "💖";

    heart.style.left = Math.random()*100 + "%";

    heart.style.fontSize = (18 + Math.random()*28) + "px";

    heart.style.animationDuration = (5 + Math.random()*5) + "s";

    heartsContainer.appendChild(heart);

    setTimeout(()=>{

        heart.remove();

    },10000);

}

setInterval(createHeart,250);
// =====================
// Typing Effect
// =====================

const typing = document.getElementById("typing");

if (typing) {

const text = typing.innerHTML;

typing.innerHTML = "";

let i = 0;

function write() {

if (i < text.length) {

typing.innerHTML += text.charAt(i);

i++;

setTimeout(write, 40);

}

}

setTimeout(write, 800);

}
// Replay

const replay = document.getElementById("replay");

if(replay){

replay.onclick = ()=>{

window.scrollTo({

top:0,

behavior:"smooth"

});

};

}