// --- SOUNDS ---
const swordSound = new Audio("./png/SwordSound.mp3");
swordSound.volume = 0.5;

document.addEventListener("DOMContentLoaded", () => {
    swordSound.play().catch((error) => {
        console.log("Autoplay is blocked by the browser until the first click.", error);
    });
});

const btn = document.getElementById("btn");
if (btn) {
    btn.addEventListener("click", (e) => {
        e.preventDefault();
        swordSound.currentTime = 0;
        swordSound.play();
    });
}



// --- BG EFFECTS ---
const canvas = document.getElementById("smokeCanvas");
const ctx = canvas.getContext("2d");

function resizeCanvas() {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
}
resizeCanvas();
window.addEventListener("resize", resizeCanvas);

const particles = [];
const particleCount = 60;

class Particle{
    constructor(){
        this.reset();
    }

    reset(){
        this.x = Math.random() * canvas.width;
        this.y = canvas.height + Math.random() * 20;
        this.radius = Math.random() * 3 + 1;
        this.speedY = Math.random() * 1.5 + 0.5;
        this.speedX = (Math.random() - 0.5) * 0.8;
        this.opacity = Math.random() * 0.8 + 0.2;
        this.color = Math.random() > 0.5 ? "255, 100, 0" : "255, 30, 0";
    }

    update(){
        this.y -= this.speedY;
        this.x += this.speedX;
        this.opacity -= 0.003;

        if (this.y < 0 || this.opacity <= 0) {
            this.reset();
        }
    }

    draw(){
        ctx.beginPath();
        ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
        ctx.fillStyle = `rgba(${this.color}, ${this.opacity})`;
        ctx.shadowBlur = 10;
        ctx.shadowColor = `rgba(${this.color}, 0.8)`;
        ctx.fill();
        ctx.shadowBlur = 0;
    }
}

for (let i = 0; i < particleCount; i++) {
    particles.push(new Particle());
}

function animateSmoke(){
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    particles.forEach(particle => {
        particle.update();
        particle.draw();
    });
    requestAnimationFrame(animateSmoke);
}

animateSmoke();



// ---


