document.addEventListener("DOMContentLoaded", () => {
    const startBtn = document.querySelector("[data-start]");
    const stopBtn = document.querySelector("[data-stop]");
    let timer = null;
    function getRandomHexColor() {
        return `#${Math.floor(Math.random() * 16777215).toString(16)}`;
    }

    startBtn.addEventListener('click', () => {
        startBtn.disabled = true;
        stopBtn.disabled = false;
        timer = setInterval(() => {
            document.body.style.backgroundColor = getRandomHexColor();
        }, 1000);
    });

    stopBtn.addEventListener('click', () => {
        startBtn.disabled = false;
        stopBtn.disabled = true;
        clearInterval(timer);
    });
});
