function setup() {
  createCanvas(900, 400);
  background('red');
}

function draw() {
  if (mouseIsPressed) {
    circle(mouseX, mouseY, 100); 
  }
}