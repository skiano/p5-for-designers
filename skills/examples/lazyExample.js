/**
 * @requires /skills/plugins/lazyValues.js
 */

function setup() {
  createCanvas(540, 540);
  lazy.x = 0;
  lazy.y = 0;
  lazy.x2 = 0;
  lazy.y2 = 0;
  lazy.damping({
    x: 0.03,
    y: 0.03,
    x2: 0.2,
    y2: 0.2,
  });
}

function draw() {
  background('#00a2a2');
  

  stroke('#eeeead');
  strokeWeight(2);
  strokeCap('round');
  line(lazy.x, lazy.y, lazy.x2, lazy.y2);
  line(lazy.x2, lazy.y2, mouseX, mouseY);

  noStroke();

  fill('#f3c7c7');
  circle(lazy.x, lazy.y, 30);

  fill('#c0c0f2');
  circle(lazy.x2, lazy.y2, 20);

  fill('#79e3e3');
  circle(mouseX, mouseY, 10);

 

  lazy.x = mouseX;
  lazy.y = mouseY;
  lazy.x2 = mouseX;
  lazy.y2 = mouseY;
}