const PASSWORD = "joo";

const unlock = document.getElementById("unlock");
const password = document.getElementById("password");
const loader = document.querySelector(".loader");
const container = document.querySelector(".container");
const error = document.getElementById("error");
const music = document.getElementById("music");

const nextBtn = document.getElementById("nextBtn");
const storyContent = document.getElementById("storyContent");

function openSite() {
    loader.style.opacity = "0";
    setTimeout(() => {
        loader.style.display = "none";
        container.style.display = "block";
    }, 600);

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

// عند الضغط على زر الـ Next الكبير يتم فتح باقي الموقع والانتقال له فوراً بنعومة
if(nextBtn && storyContent) {
    nextBtn.addEventListener("click", () => {
        storyContent.classList.add("show-content");
        nextBtn.style.display = "none";
        
        setTimeout(() => {
            const firstChild = storyContent.firstElementChild;
            if(firstChild) {
                firstChild.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 100);
        
        startTypingEffect();
    });
}
// العداد 
const startDate = new Date("2026-04-27T00:00:00").getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const difference = now - startDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if(document.getElementById("days")){
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// إطلاق القلوب المتساقطة
const heartsContainer = document.querySelector(".hearts");
function createHeart(){
    if(!heartsContainer) return;
    const heart = document.createElement("div");
    heart.className = "heart";
    heart.innerHTML = "❤";

    heart.style.left = Math.random() * 100 + "%";
    heart.style.fontSize = (14 + Math.random() * 20) + "px";
    heart.style.animationDuration = (4 + Math.random() * 4) + "s";
    
    const colors = ["#ff4d6d", "#ff7eb3", "#ff8ab8", "#ffccd5"];
    heart.style.color = colors[Math.floor(Math.random() * colors.length)];

    heartsContainer.appendChild(heart);
    setTimeout(() => { heart.remove(); }, 8000);
}
setInterval(createHeart, 350);

// تأثير الكتابة التلقائية للنصوص الأخيرة
function startTypingEffect() {
    const typing = document.getElementById("typing");
    if (typing && typing.getAttribute( data-started ) !==  true ) {
        typing.setAttribute( data-started ,  true );
        const text = typing.innerHTML;
        typing.innerHTML = "";
        let i = 0;

        function write() {
            if (i < text.length) {
                typing.innerHTML += text.charAt(i);
                i++;
                setTimeout(write, 50);
            }
        }
        setTimeout(write, 500);
    }
}

// كود زر الرجوع للأعلى Replay
const replay = document.getElementById("replay");
if(replay){
    replay.onclick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}
