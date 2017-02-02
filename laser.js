// ================
//     laser.js
// ================
class LaserController {
  constructor() {
    this.list = new Array()
  }
  add(laser) {
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
    this.r = 4;
    this.speed = 3;
  }
  hits(enemy) {
    return this.pos.dist(enemy.pos) < this.r + enemy.h;
  }
  update() {
    this.pos.y -= this.speed;
    return this;
  }
  show() {
    noStroke();
    // fill(50, 0, 200);
    ellipse(this.pos.x, this.pos.y, this.r * 2);
  }
}
