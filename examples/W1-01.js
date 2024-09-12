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
}