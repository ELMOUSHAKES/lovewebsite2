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
