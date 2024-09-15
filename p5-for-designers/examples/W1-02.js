/**
 * @requires plugins/loopFrame.js
 */

function setup() {
  createCanvas(900, 400);
  background('#bca');
}

function draw() {
  if (mouseIsPressed) {
    circle(mouseX, mouseY, 100); 
  }
}