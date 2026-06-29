const startBtn = document.getElementById("startBtn");
const loader = document.querySelector(".loader");
const container = document.querySelector(".container");
const music = document.getElementById("music");

// تشغيل الموقع
startBtn.addEventListener("click", () => {

    loader.style.opacity = "0";

    setTimeout(() => {
        loader.style.display = "none";
        container.style.display = "block";
    }, 500);

    music.play().catch(() => {});

});

// =========================
// القلوب
// =========================

const hearts = document.querySelector(".hearts");

function createHeart(){

    const heart = document.createElement("div");

    heart.classList.add("heart");

    heart.innerHTML = "❤️";

    heart.style.left = Math.random()*100+"%";

    heart.style.fontSize = (15 + Math.random()*25)+"px";

    heart.style.animationDuration =
    (5 + Math.random()*5)+"s";

    hearts.appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    },9000);

}

setInterval(createHeart,250);

// =========================
// ظهور العناصر
// =========================

const observer = new IntersectionObserver((entries)=>{

entries.forEach(entry=>{

if(entry.isIntersecting){

entry.target.animate([

{
opacity:0,
transform:"translateY(60px)"
},

{
opacity:1,
transform:"translateY(0)"
}

],{

duration:900,
fill:"forwards"

});

}

});

});

document.querySelectorAll(".page").forEach(section=>{

observer.observe(section);

});

// =========================
// تكبير الصورة أثناء النزول
// =========================

window.addEventListener("scroll",()=>{

document.querySelectorAll(".page img").forEach(img=>{

let rect = img.getBoundingClientRect();

let center = window.innerHeight/2;

let distance = Math.abs(center-rect.top);

let scale = Math.max(.92,1-distance/1000);

img.style.transform = `scale(${scale})`;

});

});
