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

  // launch multiple fireworks
  for (let i = 0; i < 5; i++) {
    rockets.push(new Rocket());
  }
});

/* Rocket that shoots up */
class Rocket {
  constructor() {
    this.x = Math.random() * canvas.width;
    this.y = canvas.height;
    this.speed = Math.random() * 3 + 6;
    this.explodeHeight = canvas.height * 0.25 + Math.random() * 50;
    this.color = "#ffe066";
  }

  update() {
    this.y -= this.speed;

    if (this.y <= this.explodeHeight) {
      this.explode();
      return false;
    }
    return true;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 3, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }

  explode() {
    for (let i = 0; i < 60; i++) {
      particles.push(new Particle(this.x, this.y));
    }
  }
}

/* Explosion particles */
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.speedX = (Math.random() - 0.5) * 8;
    this.speedY = (Math.random() - 0.5) * 8;
    this.gravity = 0.05;
    this.life = 100;
    this.color = `hsl(${Math.random() * 60 + 40}, 100%, 60%)`;
  }

  update() {
    this.speedY += this.gravity;
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, 2, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
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
