/**
 * @requires /skills/plugins/fakeMouse.js
 */

function setup() {
  createCanvas(540, 540);
  background('#eeeead');
}

function draw() {
  if (mouseIsPressed) {
    fill('#c0c0f2');
    stroke('#292d29');
    strokeWeight(2);
    circle(mouseX, mouseY, 80);
  }
}
