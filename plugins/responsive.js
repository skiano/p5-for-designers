// @see https://github.com/processing/p5.js/blob/main/contributor_docs/creating_libraries.md#step-6

//////////////////////////////
// RESPONSIVE SKETCH PLUGIN //
//////////////////////////////

function affixCanvas(canvas) {
  canvas.style.position = 'fixed';
  canvas.style.top = '0px';
  canvas.style.left = '0px';
  canvas.style.right = '0px';
  canvas.style.bottom = '0px';
  canvas.style.width = '100%';
  canvas.style.height = '100%';
}

const resizeObserver = new ResizeObserver((entries) => {
  for (const entry of entries) {
    if (entry.target.children[0]._handleResize) entry.target.children[0]._handleResize()
  }
});

// todo: prevent flicker by waiting to resize the canvas in a before draw hook

(function p5Responsive(p5) {
  let previousBackground;

  const _fr = p5.prototype.background;
  p5.prototype.background = function patchedBackground(x) {
    previousBackground = x;
    _fr.call(this, x);
  }

  p5.prototype.handleResize = function() {
    this.resizeCanvas(this.windowWidth, this.windowHeight);
    affixCanvas(this.canvas);
    if (previousBackground) {
      this.background(previousBackground)
    }
  }

  p5.prototype.postSetup = function() {
    this.canvas._handleResize = this.handleResize.bind(this);
    resizeObserver.observe(this.canvas.parentNode);
  }

  p5.prototype.registerMethod('afterSetup', p5.prototype.postSetup);

})(window.p5); // assumes this is loaded in global mode
