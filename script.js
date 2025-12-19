const btn = document.getElementById('fireworkBtn');
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
const message = document.getElementById('message');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let particles = [];

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = Math.random() * 5 + 2;
        this.angle = Math.random() * 2 * Math.PI;
        this.alpha = 1;
        this.decay = Math.random() * 0.02 + 0.01;
    }
    update() {
        this.x += Math.cos(this.angle) * this.speed;
        this.y += Math.sin(this.angle) * this.speed;
        this.alpha -= this.decay;
        return this.alpha > 0;
    }
    draw() {
        ctx.save();
        ctx.globalAlpha = this.alpha;
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 15;
        ctx.fill();
        ctx.restore();
    }
}

function launchFirework() {
    const x = Math.random() * canvas.width;
    const y = Math.random() * canvas.height / 2;
    const color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    for (let i = 0; i < 50; i++) {
        particles.push(new Particle(x, y, color));
    }
}

function animate() {
    ctx.fillStyle = "rgba(15,32,39,0.2)"; // slight trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(p => p.update());
    particles.forEach(p => p.draw());

    requestAnimationFrame(animate);
}

btn.addEventListener('click', () => {
    btn.style.display = 'none';
    message.classList.remove('hidden');

    // Launch multiple fireworks
    for (let i = 0; i < 8; i++) {
        setTimeout(launchFirework, i * 300);
    }

    animate();
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
