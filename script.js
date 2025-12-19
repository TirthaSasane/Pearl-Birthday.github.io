const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
const btn = document.getElementById("celebrateBtn");
const msg = document.getElementById("message");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let rockets = [];
let particles = [];

btn.addEventListener("click", () => {
  msg.classList.remove("hidden");

  for (let i = 0; i < 6; i++) {
    rockets.push(new Rocket());
  }
});

/* ROCKET */
class Rocket {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.speed = Math.random() * 3 + 7;
    this.explodeY = canvas.height * (0.15 + Math.random() * 0.2);
  }

  update() {
    this.y -= this.speed;
    if (this.y <= this.explodeY) {
      this.explode();
      return false;
    }
    return true;
  }

  draw() {
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + 20);
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 3;
    ctx.stroke();
  }

  explode() {
    for (let i = 0; i < 120; i++) {
      particles.push(new Particle(this.x, this.y));
    }
  }
}

/* PARTICLES — GOLD ONLY */
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speedX = (Math.random() - 0.5) * 8;
    this.speedY = (Math.random() - 0.5) * 8;
    this.gravity = 0.05;
    this.life = 100;
  }

  update() {
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2.2, 0, Math.PI * 2);
    ctx.fillStyle = "rgba(255, 215, 0, 0.9)";
    ctx.fill();
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  rockets = rockets.filter(r => {
    r.draw();
    return r.update();
  });

  particles = particles.filter(p => {
    p.update();
    p.draw();
    return p.life > 0;
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
