const PASSWORD = "joo";

// 1. تعريف عناصر التحكم في الموسيقى أولاً عشان المتصفح يشوفها
const audioPlayer = document.getElementById("music");
const toggleMusicBtn = document.getElementById("toggleMusic");
const prevSongBtn = document.getElementById("prevSong");
const nextSongBtn = document.getElementById("nextSong");
const songNameTxt = document.getElementById("songName");

// قائمة الأغاني بالمسارات الصحيحة
const playlist = [
    { src: "assets/Music/song1.mp3", name: "الأغنية الأولى 💖" },
    { src: "assets/Music/song2.mp3", name: "الأغنية الثانية 💕" }
];
let currentSongIndex = 0;
let isPlaying = false;

const unlock = document.getElementById("unlock");
const password = document.getElementById("password");
const loader = document.querySelector(".loader");
const container = document.querySelector(".container");
const error = document.getElementById("error");

const nextBtn = document.getElementById("nextBtn");
const storyContent = document.getElementById("storyContent");

// 2. دالة تشغيل الأغنية المضمونة
function loadSong(index) {
    if (!audioPlayer) return;
    currentSongIndex = index;
    audioPlayer.src = playlist[index].src;
    
    if (songNameTxt) {
        songNameTxt.textContent = playlist[index].name;
    }
    
    if (isPlaying) {
        audioPlayer.muted = false; // إلغاء كتم الصوت تماماً
        audioPlayer.play().catch(err => {
            console.log("المتصفح حظر التشغيل التلقائي:", err);
        });
    }
}

// 3. دالة فتح الموقع عند كتابة الباسورد
function openSite() {
    loader.style.opacity = "0";
    setTimeout(() => {
        loader.style.display = "none";
        container.style.display = "block";
    }, 600);
    
    // تفعيل التشغيل فوراً بناءً على ضغطة الـ Unlock (تفاعل المستخدم)
    isPlaying = true;
    if (toggleMusicBtn) { 
        toggleMusicBtn.textContent = "⏸ Pause"; 
    }
    
    loadSong(0);
}

// 4. دالة التشغيل والإيقاف المؤقت
function playPause() {
    if (!audioPlayer) return;
    if (isPlaying) {
        audioPlayer.pause();
        if (toggleMusicBtn) toggleMusicBtn.textContent = "🎵 Play";
        isPlaying = false;
    } else {
        audioPlayer.muted = false;
        audioPlayer.play().catch(() => {});
        if (toggleMusicBtn) toggleMusicBtn.textContent = "⏸ Pause";
        isPlaying = true;
    }
}

// تشغيل الأحداث
if (toggleMusicBtn) toggleMusicBtn.addEventListener("click", playPause);

if (nextSongBtn) {
    nextSongBtn.addEventListener("click", () => {
        let nextIndex = (currentSongIndex + 1) % playlist.length;
        loadSong(nextIndex);
    });
}

if (prevSongBtn) {
    prevSongBtn.addEventListener("click", () => {
        let prevIndex = (currentSongIndex - 1 + playlist.length) % playlist.length;
        loadSong(prevIndex);
    });
}

if (audioPlayer) {
    audioPlayer.addEventListener("ended", () => {
        if (nextSongBtn) nextSongBtn.click();
    });
}

if (unlock) {
    unlock.addEventListener("click", () => {
        if (password.value.trim() === PASSWORD) {
            openSite();
        } else {
            error.textContent = "💖 Wrong Password";
        }
    });
}

if (password) {
    password.addEventListener("keydown", (e) => {
        if (e.key === "Enter") {
            unlock.click();
        }
    });
}

if (nextBtn && storyContent) {
    nextBtn.addEventListener("click", () => {
        storyContent.classList.add("show-content");
        nextBtn.style.display = "none";
        
        setTimeout(() => {
            const firstChild = storyContent.firstElementChild;
            if (firstChild) {
                firstChild.scrollIntoView({ behavior: "smooth", block: "start" });
            }
        }, 100);
        
        startTypingEffect();
    });
}

// العداد التنازلي
const startDate = new Date("2025-05-24T00:00:00").getTime();
function updateCountdown() {
    const now = new Date().getTime();
    const difference = now - startDate;

    const days = Math.floor(difference / (1000 * 60 * 60 * 24));
    const hours = Math.floor((difference % (1000 * 60 * 60 * 24)) / (1000 * 60 * 60));
    const minutes = Math.floor((difference % (1000 * 60 * 60)) / (1000 * 60));
    const seconds = Math.floor((difference % (1000 * 60)) / 1000);

    if (document.getElementById("days")) {
        document.getElementById("days").innerText = days;
        document.getElementById("hours").innerText = hours < 10 ? "0" + hours : hours;
        document.getElementById("minutes").innerText = minutes < 10 ? "0" + minutes : minutes;
        document.getElementById("seconds").innerText = seconds < 10 ? "0" + seconds : seconds;
    }
}
setInterval(updateCountdown, 1000);
updateCountdown();

// القلوب المتساقطة
const heartsContainer = document.querySelector(".hearts");
function createHeart() {
    if (!heartsContainer) return;
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

const replay = document.getElementById("replay");
if (replay) {
    replay.onclick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}
