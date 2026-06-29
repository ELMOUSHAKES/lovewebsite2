
const startBtn = document.getElementById("startBtn");
const loader = document.querySelector(".loader");
const container = document.querySelector(".container");
const music = document.getElementById("music");

startBtn.onclick = () => {
    loader.style.display = "none";
    container.style.display = "block";

    if(music){
        music.play().catch(()=>{});
    }
};

const hearts = document.querySelector(".hearts");

setInterval(()=>{
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤️";

    heart.style.left = Math.random()*100+"%";
    heart.style.animationDuration = (5+Math.random()*5)+"s";
    heart.style.fontSize = (15+Math.random()*25)+"px";

    hearts.appendChild(heart);

    setTimeout(()=>{
        heart.remove();
    },10000);

},300);