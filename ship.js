// ===============
//     ship.js
// ===============
class Ship {
  constructor(pos) {
    this.size = 20;
    this.pos = createVector(width/2, height - this.size);
    this.speed = 3;
    this.dir = 0;
  }
  update() {
    this.move();
    return this;
  }
  show() {
    // fill(255);
    rect(this.pos.x, this.pos.y, this.size, this.size)
  }
  move() {
    this.pos.x += this.dir * this.speed;
  }
  hits(enemies) {
    let hit = false;
    for (let i = enemies.list.length -1; i >= 0; i--) {
      hit = this.pos.y <= enemies.list[i].pos.y + enemies.list[i].h;
      break;
    }
    return hit;
  }
}
