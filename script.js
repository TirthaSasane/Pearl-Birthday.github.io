const btn = document.getElementById('startBtn');


btn.addEventListener('click', () => {
overlay.style.display = 'none';
canvas.style.display = 'block';
msg.style.opacity = 1;
setInterval(() => fireworks.push(new Firework()), 400);
animate();
});


class Firework {
constructor() {
this.x = Math.random() * canvas.width;
this.y = canvas.height;
this.targetY = Math.random() * canvas.height * 0.25;
this.speed = 6 + Math.random() * 4;
this.angle = Math.random() * Math.PI/8 - Math.PI/16;
this.color = `hsl(${Math.random()*360}, 100%, 60%)`;
}
update() {
this.y -= this.speed;
this.x += Math.tan(this.angle) * this.speed;
if (this.y <= this.targetY) { explode(this.x,this.y,this.color); return true; }
return false;
}
draw() {
ctx.beginPath();
ctx.arc(this.x,this.y,3,0,Math.PI*2);
ctx.shadowBlur = 20;
ctx.shadowColor = this.color;
ctx.fillStyle = this.color;
ctx.fill();
}
}


class Particle {
constructor(x, y, color) {
this.x = x; this.y = y; this.radius = Math.random() * 2 + 1;
this.color = color;
this.speedX = (Math.random() - 0.5) * 8;
this.speedY = (Math.random() - 0.5) * 8;
this.gravity = 0.05;
this.life = 100;
}
update() {
this.x += this.speedX;
this.y += this.speedY;
this.speedY += this.gravity;
this.life--;
}
draw() {
ctx.beginPath();
ctx.arc(this.x,this.y,this.radius,0,Math.PI*2);
ctx.shadowBlur = 25;
ctx.shadowColor = this.color;
ctx.fillStyle = this.color;
ctx.fill();
}
}


function explode(x,y,color){
for(let i=0;i<60;i++){ particles.push(new Particle(x,y,color)); }
}


function animate(){
ctx.fillStyle='rgba(0,0,0,0.2)';
ctx.fillRect(0,0,canvas.width,canvas.height);
fireworks = fireworks.filter(fw=>{ fw.draw(); return !fw.update(); });
particles = particles.filter(p=>{ p.draw(); p.update(); return p.life>0; });
requestAnimationFrame(animate);
}


window.addEventListener('resize',()=>{ canvas.width=window.innerWidth; canvas.height=window.innerHeight; });
