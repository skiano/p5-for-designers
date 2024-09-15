/**
 * @requires plugins/fakeMouse.js
 */

function setup() {
  createCanvas(540, 540);
  background('#abc');
}

function draw() {
  if (mouseIsPressed) {
    circle(mouseX, mouseY, 80);
  }
}
