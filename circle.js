let CIRCLE_COLOR = "#FF91C8";
let TEXT_COLOR = "#FFFFFF";
let FILL_INC = 1;


class Circle {
  constructor() {
    this.pos = createVector(width/2, height/2);
    this.text_pos = createVector(width/2, height/2);
    this.velocity = createVector();
    this.fill_percent = 0;
    this.setup();
  }

  setup() {
    this.radius = max(width, height) * 0.1;
    this.border_force_range = max(width, height) * 0.03;
    this.border_force_mult = 2;
    this.force_range = this.radius * 2.5;
    this.force_mult = 1;
    this.fill_range = this.radius * 1.3;
    this.slowdown_coeff = 0.1;
  }

  show() {
    stroke(TEXT_COLOR);
    strokeWeight(this.radius * 0.063);
    fill(CIRCLE_COLOR);
    circle(this.pos.x, this.pos.y, this.radius);

    strokeWeight(0);
    fill(TEXT_COLOR);
    textSize(this.radius * 0.5);
    text(round(this.fill_percent, 0), this.text_pos.x, this.text_pos.y + this.radius * 0.05);
  }

  bounce_border() {
    let left_dist = this.pos.x - this.radius;
    if (left_dist < this.border_force_range) {
      let mul = this.border_force_range - left_dist;
      this.velocity.add(mul * this.border_force_mult, 0);
    }

    let bottom_dist = this.pos.y + this.radius;
    if (bottom_dist > height - this.border_force_range) {
      let mul = bottom_dist - (height - this.border_force_range);
      this.velocity.add(0, -mul * this.border_force_mult);
    }

    let right_dist = this.pos.x + this.radius;
    if (right_dist > width - this.border_force_range) {
      let mul = right_dist - (width - this.border_force_range);
      this.velocity.add(-mul * this.border_force_mult, 0);
    }

    let top_dist = this.pos.y - this.radius;
    if (top_dist < this.border_force_range) {
      let mul = this.border_force_range - (top_dist);
      this.velocity.add(0, mul * this.border_force_mult);
    }
  }

  bounce_mouse() {
    let mouse = createVector(mouseX, mouseY);
    let dist_to_mouse = this.pos.dist(mouse);
    if (dist_to_mouse < this.force_range) {
      let mul = this.force_range - dist_to_mouse;
      this.velocity.add(mul * this.force_mult);
      this.velocity.setHeading(mouse.sub(this.pos).heading() + PI);
    }
    return dist_to_mouse;
  }

  update() {
    this.text_pos.lerp(createVector(width/2, height/2), 0.07);

    if (this.fill_percent >= 100) {
      this.pos.lerp(createVector(width/2, height/2), 0.07)
      return;
    }

    let dist_to_mouse = this.bounce_mouse();
    if (dist_to_mouse < this.fill_range) {
      this.fill_percent += FILL_INC;
    }

    this.bounce_border();

    this.velocity.mult(this.slowdown_coeff);
    this.pos.add(this.velocity);
  }
}
