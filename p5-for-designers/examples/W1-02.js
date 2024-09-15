/**
 * @requires plugins/fakeMouse.js
 */

function setup() {
  createCanvas(540, 540);
  background('#8484ff');
}

function draw() {
  if (mouseIsPressed) {
    fill('#f6d7d7');
    stroke('#292d29');
    strokeWeight(2);
    circle(mouseX, mouseY, 80);
  }
}