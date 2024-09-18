let finalX;
let finalY;

function setup() {
  createCanvas(540, 540);
}

function star(cx, cy, r1, r2, points) {
  let inc = TAU / points;
  beginShape();
  for (let i = 0; i < points; i++) {
    let ang = i * inc;
    vertex(cx + cos(ang) * r1, cy + sin(ang) * r1)
    let ang2 = ang + inc / 2;
    vertex(cx + cos(ang2) * r2, cy + sin(ang2) * r2)
  }
  endShape(CLOSE);
}

function draw() {
  background('#292d29');
  fill('#292d29');
  stroke('#757e75');
  strokeWeight(1.5);

  translate(width / 2, height / 2);

  let variation = 20;
  let rf = sin(frameCount / 30) * variation;
  let r1 = height / 4;
  let r2 = width / 2;

  push();
  stroke('#00a2a2');
  rotate(-frameCount / 140);
  star(0, 0, r2, r1 + rf, 12);
  pop();

  push();
  stroke('magenta');
  rotate(frameCount / 140);
  star(0, 0, r2, r1 - rf, 18);
  pop();
}