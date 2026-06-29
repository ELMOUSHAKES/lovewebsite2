// زر البداية
const startBtn = document.getElementById("start");
const loading = document.getElementById("loading");
const main = document.getElementById("main");
const music = document.getElementById("music");

startBtn.onclick = () => {
    loading.style.display = "none";
    main.style.display = "block";

    music.play().catch(() => {});
};

// ==========================
// سلايدر الصور
// ==========================

const images = [
    "assets/images/1.jpg",
    "assets/images/2.jpg",
    "assets/images/3.jpg",
    "assets/images/4.jpg",
];

let index = 0;

setInterval(() => {

    index++;

    if(index >= images.length){
        index = 0;
    }

    document.getElementById("slide").src = images[index];

},3000);

// ==========================
// عداد الأيام
// ==========================

// غير التاريخ ده براحتك
const loveDate = new Date("2025-01-01");

function updateCounter(){

const today = new Date();

const diff = today - loveDate;

const days = Math.floor(diff / (1000*60*60*24));

document.getElementById("timer").innerHTML =
days + " Days ❤️";

}

updateCounter();

setInterval(updateCounter,1000);

// ==========================
// قلوب متحركة
// ==========================

function