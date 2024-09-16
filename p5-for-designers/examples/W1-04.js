let colors = [
  '#969600',
  '#ff5555',
  '#8484ff',
  '#00a2a2',
  '#ff00ff',
];

let dotI = 0;

function setup() {
  createCanvas(540, 540);
  background('#292d29');
}

function draw() {
  cursor('crosshair');
  if (mouseIsPressed) {
    fill(random(colors));
    // stroke('#292d29');
    noStroke();
    let gap = 2;
    let d = dist(mouseX, mouseY, pmouseX, pmouseX);
    let steps = floor(d / gap);
    let size;
    // TODO: think through and prove this is the right loop intervals
    // no redrawing and actually catches the mouse
    for (let i = 0; i < steps; i++) {
      let x = lerp(pmouseX, mouseX, i / steps);
      let y = lerp(pmouseY, mouseY, i / steps);
      size = 20 + (cos(dotI / 50)) * 10;
      circle(x, y, size);
      dotI++;
    }
    fill('#ff00ff');
    circle(mouseX, mouseY, size);
    dotI++;
  }
}

function mousePressed() {
  dotI = 0; 
}