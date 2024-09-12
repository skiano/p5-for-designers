/**
 * @requires ./plugins/plugin-a.js
 * @requires ./plugins/plugin-b.js
 */

function setup() {
  createCanvas(900, 400);
  background('red');
}

function draw() {
  if (mouseIsPressed) {
    circle(mouseX, mouseY, 100); 
  }
}