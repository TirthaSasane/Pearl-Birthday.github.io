const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");
const btn = document.getElementById("celebrateBtn");
const letter = document.getElementById("letter");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let rockets = [];
let particles = [];
let fireworksOn = false;

/* CLICK CELEBRATE */
btn.addEventListener("click", () => {
  btn.remove();               // delete button
  letter.classList.remove("hidden");
  fireworksOn = true;
});

/* ROCKET */
class Rocket {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.speed = 7 + Math.random() * 3;
    this.targetY = canvas.height * (0.2 + Math.random() * 0.15);
  }

  update() {
    this.y -= this.speed;
    if (this.y <= this.targetY) {
      this.explode();
      return false;
    }
    return true;
  }

  draw() {
    ctx.strokeStyle = "#FFD700";
    ctx.lineWidth = 2.5;
    ctx.beginPath();
    ctx.moveTo(this.x, this.y);
    ctx.lineTo(this.x, this.y + 15);
    ctx.stroke();
  }

  explode() {
    for (let i = 0; i < 100; i++) {
      particles.push(new Particle(this.x, this.y));
    }
  }
}

/* PARTICLES */
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.vx = (Math.random() - 0.5) * 7;
    this.vy = (Math.random() - 0.5) * 7;
    this.life = 80;
  }

  update() {
    this.vy += 0.05;
    this.x += this.vx;
    this.y += this.vy;
    this.life--;
  }

  draw() {
    ctx.fillStyle = "rgba(255, 215, 0, 0.9)";
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fill();
  }
}

/* LOOP */
function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  if (fireworksOn && Math.random() < 0.05) {
    rockets.push(new Rocket());
  }

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
