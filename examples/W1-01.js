/**
 * @requires plugins/loopFrame.js
 */

function setup() {
  createCanvas(900, 400);
  background('#abc');
}

function draw() {
  if (mouseIsPressed) {
    circle(mouseX, mouseY, 80); 
  }
}