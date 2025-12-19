const btn = document.getElementById('fireworkBtn');
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
const message = document.getElementById('message');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let particles = [];

// Particle class for glowing sparks
class Particle {
    constructor(x, y, color, speed, angle) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.speed = speed || Math.random() * 5 + 2;
        this.angle = angle || Math.random() * 2 * Math.PI;
        this.alpha = 1;
        this.decay = Math.random() * 0.015 + 0.01;
        this.size = Math.random() * 2 + 1;
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
        ctx.arc(this.x, this.y, this.size, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.restore();
    }
}

// Firework burst
function launchFirework() {
    const x = Math.random() * canvas.width * 0.9 + canvas.width * 0.05;
    const y = Math.random() * canvas.height * 0.5 + canvas.height * 0.1;
    const hue = Math.random() * 360;
    for (let i = 0; i < 80; i++) {
        particles.push(new Particle(x, y, `hsl(${hue}, 100%, 50%)`));
    }
}

// Continuous fireworks show
function autoFireworks() {
    launchFirework();
    setTimeout(autoFireworks, Math.random() * 800 + 400); // random intervals
}

// Animation loop
function animate() {
    ctx.fillStyle = "rgba(15,32,39,0.25)"; // fading trail effect
    ctx.fillRect(0, 0, canvas.width, canvas.height);

    particles = particles.filter(p => p.update());
    particles.forEach(p => p.draw());

    requestAnimationFrame(animate);
}

// Button click triggers fireworks and message
btn.addEventListener('click', () => {
    btn.style.display = 'none';
    message.classList.remove('hidden');
    autoFireworks();
    animate();
});

// Resize canvas on window resize
window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
