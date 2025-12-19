const btn = document.getElementById('fireworkBtn');
const canvas = document.getElementById('fireworksCanvas');
const ctx = canvas.getContext('2d');
const message = document.getElementById('message');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];
let particles = [];

class Firework {
    constructor(x, y) {
        this.x = x;
        this.y = y;
        this.targetY = Math.random() * canvas.height / 2;
        this.color = `hsl(${Math.random() * 360}, 100%, 50%)`;
    }
    update() {
        this.y -= 5;
        if (this.y <= this.targetY) {
            this.explode();
            return false;
        }
        return true;
    }
    explode() {
        for (let i = 0; i < 50; i++) {
            particles.push(new Particle(this.x, this.y, this.color));
        }
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;
        ctx.fill();
    }
}

class Particle {
    constructor(x, y, color) {
        this.x = x;
        this.y = y;
        this.color = color;
        this.velocityX = (Math.random() - 0.5) * 8;
        this.velocityY = (Math.random() - 0.5) * 8;
        this.alpha = 1;
    }
    update() {
        this.x += this.velocityX;
        this.y += this.velocityY;
        this.alpha -= 0.02;
        return this.alpha > 0;
    }
    draw() {
        ctx.beginPath();
        ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
        ctx.fillStyle = this.color;
        ctx.globalAlpha = this.alpha;
        ctx.shadowColor = this.color;
        ctx.shadowBlur = 20;
        ctx.fill();
        ctx.globalAlpha = 1;
    }
}

function animate() {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    fireworks = fireworks.filter(fw => fw.update());
    fireworks.forEach(fw => fw.draw());

    particles = particles.filter(p => p.update());
    particles.forEach(p => p.draw());

    requestAnimationFrame(animate);
}

btn.addEventListener('click', () => {
    btn.style.display = 'none';
    message.classList.remove('hidden');
    
    // Launch multiple fireworks
    for (let i = 0; i < 5; i++) {
        fireworks.push(new Firework(Math.random() * canvas.width, canvas.height));
    }

    animate();
});

window.addEventListener('resize', () => {
    canvas.width = window.innerWidth;
    canvas.height = window.innerHeight;
});
