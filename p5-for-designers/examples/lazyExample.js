/**
 * @requires /p5-for-designers/plugins/lazyValues.js
 */

function setup() {
  createCanvas(540, 540);
  lazy.x = 0;
  lazy.y = 0;
  lazy.damping({ x: 0.3, y: 0.3 });
}

function draw() {
  background('#00a2a2');
  fill('#f3c7c7');
  noStroke();

  circle(lazy.x, lazy.y, 30);

  lazy.x = mouseX;
  lazy.y = mouseY;
}