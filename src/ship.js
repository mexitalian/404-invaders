// ===============
//     ship.js
// ===============
class Ship {
  constructor(baseRotationZ) {
    this.size = 20;
    this.pos = createVector(width/2, height - this.size);
    this.speed = 3;
    this.dir = 0;
    this.img = assetFactory(grids.ship)
  }
  update() {
    this.move();
    return this;
  }
  show() {
    // fill(255);
    // rect(this.pos.x, this.pos.y, this.size, this.size)
    image(this.img, this.pos.x, this.pos.y);
  }
  move() {
    if (this.pos.x <= width && this.pos.x >= 0) {
      this.pos.x += this.dir * this.speed;
    }
    else {
      if (this.pos.x > width)
        this.pos.x = width;

      if (this.pos.x < 0)
        this.pos.x = 0;
    }
  }
  hits(enemies) {
    let last = enemies.list[enemies.list.length - 1];
    return this.pos.y <= last.pos.y + last.h;
  }
}
