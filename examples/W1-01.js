/**
 * @requires plugins/loopFrame.js
 */

function setup() {
  createCanvas(100, 100);
  background('#abc');
  loopLength(10)
}

function draw() {
  if (mouseIsPressed) {
    circle(mouseX, mouseY, 80);
  }
  circle(width / 2, height / 2, 80);
}