const PASSWORD = "joo";

// 1. تعريف جميع المتغيرات أولاً لتفادي الأخطاء
const unlock = document.getElementById("unlock");
const password = document.getElementById("password");
const loader = document.querySelector(".loader");
const container = document.querySelector(".container");
const error = document.getElementById("error");

const nextBtn = document.getElementById("nextBtn");
const storyContent = document.getElementById("storyContent");

const audioPlayer = document.getElementById("music");
const toggleMusicBtn = document.getElementById("toggleMusic");
const prevSongBtn = document.getElementById("prevSong");
const nextSongBtn = document.getElementById("nextSong");
const songNameTxt = document.getElementById("songName");

// قائمة الأغاني
const playlist = [
    { src: "assets/music/song1.mp3", name: "الأغنية الأولى 💖" },
    { src: "assets/music/song2.mp3", name: "الأغنية الثانية 💕" }
];
let currentSongIndex = 0;
let isPlaying = false;

// 2. دالة فتح الموقع وتشغيل الموسيقى بأضمن طريقة
function openSite() {
    loader.style.opacity = "0";
    setTimeout(() => {
        loader.style.display = "none";
        container.style.display = "block";
    }, 600);
    
    // تشغيل الأغنية الأولى مباشرة عند الدخول
    isPlaying = true;
    if (toggleMusicBtn) { 
        toggleMusicBtn.textContent = "⏸ Pause"; 
    }
    
    loadSong(0);
}

// 3. دالة تحميل وتشغيل الأغنية
function loadSong(index) {
    if (!audioPlayer) return;
    currentSongIndex = index;
    audioPlayer.src = playlist[index].src;
    
    if (songNameTxt) {
        songNameTxt.textContent = playlist[index].name;
    }
    
    if (isPlaying) {
        audioPlayer.muted = false; // التأكد أن الصوت ليس مكتوماً
        audioPlayer.play().catch(err => {
            console.log("المتصفح حظر التشغيل التلقائي:", err);
        });
    }
}

// 4. دالة التشغيل والإيقاف المؤقت
function playPause() {
    if (!audioPlayer) return;
    if (isPlaying) {
        audioPlayer.pause();
        if (toggleMusicBtn) toggleMusicBtn.textContent = "🎵 Play";
        isPlaying = false;
    } else {
        audioPlayer.play().catch(() => {});
        if (toggleMusicBtn) toggleMusicBtn.textContent = "⏸ Pause";
        isPlaying = true;
    }
}

// 5. أحداث أزرار الموسيقى والتحكم
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
    // إذا انتهت الأغنية يقلب على التالية تلقائياً
    audioPlayer.addEventListener("ended", () => {
        if (nextSongBtn) nextSongBtn.click();
    });
}

// 6. التحكم في شاشة القفل ودخول الموقع
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

// 7. عند الضغط على زر الـ Next الكبير لفتح باقي كروت الموقع
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

// 8. دالة العداد التنازلي المنظم
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

// 9. تأثير القلوب المتساقطة بالخلفية
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

// 10. تأثير الكتابة التلقائية للنصوص الأخيرة
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

// 11. كود زر الرجوع للأعلى Replay
const replay = document.getElementById("replay");
if (replay) {
    replay.onclick = () => {
        window.scrollTo({ top: 0, behavior: "smooth" });
    };
}
