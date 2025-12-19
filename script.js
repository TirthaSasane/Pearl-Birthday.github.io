const btn = document.getElementById("celebrateBtn");
const msg = document.getElementById("message");
const canvas = document.getElementById("fireworks");
const ctx = canvas.getContext("2d");

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

let fireworks = [];

btn.addEventListener("click", () => {
  msg.classList.remove("hidden");
  launchFireworks();
});

/* Firework particle */
class Particle {
  constructor(x, y) {
    this.x = x;
    this.y = y;
    this.radius = Math.random() * 2 + 1;
    this.color = `hsl(${Math.random() * 60 + 40}, 100%, 60%)`;
    this.speedX = (Math.random() - 0.5) * 6;
    this.speedY = (Math.random() - 0.5) * 6;
    this.life = 100;
  }

  update() {
    this.x += this.speedX;
    this.y += this.speedY;
    this.life--;
  }

  draw() {
    ctx.beginPath();
    ctx.arc(this.x, this.y, this.radius, 0, Math.PI * 2);
    ctx.fillStyle = this.color;
    ctx.fill();
  }
}

function launchFireworks() {
  for (let i = 0; i < 100; i++) {
    fireworks.push(
      new Particle(
        Math.random() * canvas.width,
        Math.random() * canvas.height
      )
    );
  }
}

function animate() {
  ctx.clearRect(0, 0, canvas.width, canvas.height);

  fireworks.forEach((p, index) => {
    p.update();
    p.draw();
    if (p.life <= 0) {
      fireworks.splice(index, 1);
    }
  });

  requestAnimationFrame(animate);
}

animate();

window.addEventListener("resize", () => {
  canvas.width = window.innerWidth;
  canvas.height = window.innerHeight;
});
