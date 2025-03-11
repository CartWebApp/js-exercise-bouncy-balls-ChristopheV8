// setup canvas

const canvas = document.querySelector('canvas');
const ctx = canvas.getContext('2d');

const width = canvas.width = window.innerWidth;
const height = canvas.height = window.innerHeight;

// function to generate random number

function random(min, max) {
  const num = Math.floor(Math.random() * (max - min + 1)) + min;
  return num;
}

function Ball(x, y, velX, velY, color, size) {
  this.x = x;
  this.y = y;
  this.velX = velX;
  this.velY = velY;
  this.color = color;
  this.size = size;
}

Ball.prototype.draw = function() {
  ctx.beginPath();
  ctx.fillStyle = this.color;
  ctx.arc(this.x, this.y, this.size, 0, 2 * Math.PI);
  ctx.fill();

  ctx.lineWidth = 2;   
  ctx.strokeStyle = 'black'; 
  ctx.stroke();           
}

let testBall = new Ball(50, 100, 4, 4, 'blue', 10);

Ball.prototype.update = function() {
  if ((this.x + this.size) >= width) {
    this.velX = -(this.velX);
  }

  if ((this.x - this.size) <= 0) {
    this.velX = -(this.velX);
  }

  if ((this.y + this.size) >= height) {
    this.velY = -(this.velY);
  }

  if ((this.y - this.size) <= 0) {
    this.velY = -(this.velY);
  }

  this.x += this.velX;
  this.y += this.velY;
}


let collidedPairs = new Set();

Ball.prototype.collisionDetect = function() {
  for (let j = 0; j < balls.length; j++) {
    if (this !== balls[j]) {
      const dx = this.x - balls[j].x;
      const dy = this.y - balls[j].y;
      const distance = Math.sqrt(dx * dx + dy * dy);
      const minDistance = this.size + balls[j].size;

      const pairKey = `${Math.min(balls.indexOf(this), balls.indexOf(balls[j]))}-${Math.max(balls.indexOf(this), balls.indexOf(balls[j]))}`;

      if (distance < minDistance) { 
        if (!collidedPairs.has(pairKey)) {
          this.size += 1;  
          balls[j].size += 1;
        }
        collidedPairs.add(pairKey); 
      }
    }
  }
};


let balls = [];

while (balls.length < 100) {
  let size = random(1, 1);
  let ball = new Ball(
    random(0 + size,width - size),
    random(0 + size,height - size),
    random(-7,7),
    random(-7,7),
    'blue',
    size
  );

  balls.push(ball);

}

function loop() {
  ctx.fillStyle = 'gray';
  ctx.fillRect(0, 0, width, height);
  

  for (let i = 0; i < balls.length; i++) {
    balls[i].draw();
    balls[i].update();
    balls[i].collisionDetect();
  }

  requestAnimationFrame(loop);
}

loop();

// document.addEventListener('keydown', function(event) {
//   if (event.key === ' ') { // Check if the spacebar is pressed
//       // Your code here
//       console.log('Spacebar was pressed!');
//   }
// });

// document.addEventListener('keyup', function(event) {
//   if (event.key === ' ') {
//       // Your code here
//       console.log('Spacebar was released!');
//   }
// });
