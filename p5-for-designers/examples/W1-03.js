let focusX = 0;
let focusY = 0;

function setup() {
  createCanvas(540, 540);
}

function draw() {
  background('#ff5555');
  noFill();
  stroke('#e3e37d');
  strokeWeight(4);
  rectMode(CENTER);
  noCursor();
  
  let margin = width / 8;
  let spinnerWidth = width / 8;
  let left = margin;
  let right = width - margin;
  let top = margin;
  let bottom = height - margin;
  let copiesX = 5;
  let copiesY = 4;

  if (mouseX && mouseY) {
    focusX = lerp(focusX, mouseX, 0.6);
    focusY = lerp(focusY, mouseY, 0.6);
  } 

  for (let x = 0; x < copiesX; x += 1) {
    for (let y = 0; y < copiesY; y += 1) {
      let cx = lerp(left, right, x / (copiesX - 1));
      let cy = lerp(top, bottom, y / (copiesY - 1));
      let dx = cx - focusX;
      let dy = cy - focusY;
      let ang = atan2(dy, dx);
      push();
      translate(cx, cy);
      rotate(ang);
      rect(0, 0, spinnerWidth, 10, 6);
      pop();
    }
  }

  noStroke();
  fill('#c0c0f2');
  circle(mouseX, mouseY, margin / 2);
}