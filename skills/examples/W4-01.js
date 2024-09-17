let capture;
let x = 0;

function setup() {
  createCanvas(540, 540);

  // Create the video capture and hide the element.
  capture = createCapture(VIDEO);
  capture.hide();
  capture.loadPixels();
  // if (capture.canvas && !capture.canvas.hasAttribute('willReadFrequently')) {
  //   capture.canvas.setAttribute('willReadFrequently', true);
  // }

  
  // this.canvas.setAttributes("willReadFrequently", true);

  describe('A video stream from the webcam with inverted colors.');
}

function draw() {
  capture.loadPixels();
  let w = 3; // Width of the slice
  copy(capture, capture.width / 2, 0, w, capture.height, x, 0, w, height);
  x = (x + w) % width;
}