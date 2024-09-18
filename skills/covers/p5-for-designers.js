/**
 * @requires /skills/plugins/fakeMouse.js
 */


let finalX;
let finalY;

function setup() {
  createCanvas(540, 540);
  finalX = width / 2;
  finalY = height / 2;
}

function draw() {
  background('#292d29');
  fill('#757e75');
  stroke('#292d29');
  strokeWeight(2);
  textStyle(BOLD);
  textAlign(CENTER, CENTER);
  textSize(width / 4);
  textFont('Helvetica');

  let defaultX = width / 2 + 20;
  let defaultY = height / 2 + 10;

  if (
    mouseX > 0 && mouseX < width && 
    mouseY > 0 && mouseY < height
  ) {
    finalX = lerp(finalX, mouseX, 0.3);
    finalY = lerp(finalY, mouseY, 0.3);
  } else {
    finalX = lerp(finalX, defaultX, 0.1);
    finalY = lerp(finalY, defaultY, 0.1);
  }

  let mirrorX = width - finalX;
  let mirrorY = height - finalY;

  let copies = 21;

  for (let i = 0; i <= copies; i += 1) {
    let amt = i / copies;
    let x = lerp(mirrorX, finalX, amt);
    let y = lerp(mirrorY, finalY, amt);
    text('Yay.', x, y);
  }
}