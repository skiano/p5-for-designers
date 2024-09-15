// @see https://github.com/processing/p5.js/blob/main/contributor_docs/creating_libraries.md#step-6

(function p5Responsive(p5) {

  let x = 0;
  let y = 0;
  let vx = 5;
  let vy = 7;

  p5.prototype.fakeMouse = function() {
    this.mouseX = x;
    this.mouseY = y;
    this.mouseIsPressed = Math.floor(this.frameCount / 18) % 4;
    x += vx;
    y += vy;

    if (x > this.width || x < 0) vx = -vx + (-1 + Math.random() * 2);
    if (y > this.height || y < 0) vy = -vy + (-1 + Math.random() * 2);
  }

  setInterval(() => {
    window.location.reload();
  }, 5000);

  p5.prototype.registerMethod('pre', p5.prototype.fakeMouse);

})(window.p5); // assumes this is loaded in global mode
