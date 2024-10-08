// @see https://github.com/processing/p5.js/blob/main/contributor_docs/creating_libraries.md#step-6

///////////////////////
// LOOP FRAME PLUGIN //
///////////////////////

// USAGE:
// in setup() call loopLength() with the number of frames the loop should take
// then, inside draw(), you can access loopFrame, loopFraction, and loopAngle (radians)

// TODO: 'this' is not behaving as i expected now that i am loading in global mode
// Still need to learn how to better support isolated and global mode

(function p5Loop(p5) {
  p5.prototype.loopLength = function(v) {
    this._loopLength = v;
  }

  p5.prototype.getLoopLength = function() {
    return this._loopLength;
  }

  p5.prototype.updateLoopValues = function() {
    let len = this.getLoopLength();
    if (!len) return;
    // NOTE: the -1 here is because frameCount begins at 1 with p5 (not helpful for using %)
    this.loopFrame = (this.frameCount - 1) % len;
    this.loopFraction = this.loopFrame / len;
    this.loopAngle = this.loopFraction * this.TAU;
  }

  p5.prototype.registerMethod('pre', p5.prototype.updateLoopValues);

})(window.p5); // assumes this is loaded in global mode
