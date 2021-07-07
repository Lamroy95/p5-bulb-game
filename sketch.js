let circ;
const isMobileDevice = /Mobi/i.test(window.navigator.userAgent)


function setup() {
  frameRate(60);
  if (isMobileDevice) {pixelDensity(1)}
  textAlign(CENTER, CENTER);
  createCanvas(windowWidth-1, windowHeight-1);
  circ = new Circle();
}

function draw() {
  background(0, 158, 161);
  circ.update();
  circ.show();
}

function windowResized() {
  resizeCanvas(windowWidth-1, windowHeight-1);
  circ.setup();
}
