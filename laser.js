// ================
//     laser.js
// ================
class LaserController {
  constructor() {
    this.list = new Array();
  }
  add(laser) {
    if (this.list.length === 0) // only allow one laser at a time
      this.list.push(laser);
  }
  remove(i) {
    this.list.splice(i, 1);
  }
  update() {
    let list = this.list;

    if (list.length > 0) {
      for (let i = list.length -1; i >= 0; i--) {
        let laser = list[i];
        laser.update().show();

        if (laser.pos.y <= 0) {
          list.splice(i, 1);
        }
      }
    }

    return this;
  }
  show() {
    this.list.forEach(laser => {
      laser.show();
    })
  }
}

class Laser {
  constructor(pos) {
    this.pos = pos.copy();
    this.w = 2;
    this.h = 4;
    this.speed = 4;
  }
  hits(enemy) {
    return this.pos.dist(enemy.pos) < this.w + enemy.w / 2;
  }
  update() {
    this.pos.y -= this.speed;
    return this;
  }
  show() {
    noStroke();
    // fill(50, 0, 200);
    rect(this.pos.x, this.pos.y, this.w, this.h);
  }
}
