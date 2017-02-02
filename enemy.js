// ================
//     enemy.js
// ================

class PixelController {
  constructor(grid, cols) {
    this.cols = cols;
    this.rows = grid.length/this.cols;
    this.score = 0;
    this.list = [];
    this.dir = 1; // go right
    this.enemy = {
      img: assetFactory(grids.easy1),
      width: 22,
      height: 14
    };

    // center the grid
    let gridWidth = this.cols * (this.enemy.width * 2);
    let xstart = (width - gridWidth) / 2;

    for (let i = 0; i < grid.length; i++) {
      if (grid[i])
        this.list.push(new Pixel(
          i % this.cols,
          floor(i / this.cols),
          this.enemy.width,
          this.enemy.height,
          xstart,
          this.enemy.img
        ));
    }

    this.y = this.list[0].pos.y;
  }
  update() {
//  if any of the enemys are getting too close to the edge, change direction
    let isOutOfBounds = this.list.find(enemy => {
      return enemy.isOutOfBounds();
    });

    if (isOutOfBounds) {
      this.dir *= -1;
      this.list.forEach(e => { e.pos.y += this.enemy.height; });
    }

    this.move();
    return this;
  }
  show() {
    this.list.forEach(enemy => {
      enemy.show();
    });
  }
  collision(laser) {
    if (laser.list.length > 0) {
      for (let i = laser.list.length -1; i >= 0; i--) {
        for (let j = this.list.length - 1; j >= 0; j--) {
          if (laser.list[i]) {
            if (laser.list[i].hits(this.list[j])) {
              laser.remove(i);
              this.die(j);
            }
          }
        }
      }
    }
  }
  die(i) {
    this.list.splice(i, 1);
  }
  // detectCol(laser) {
  //   this.list.forEach(e => {  });
  // }
  move() {
    this.list.forEach(enemy => {
      enemy.move(this.dir);
    });
  }
}

class Pixel {
  constructor(col = 0, row = 0, w = 16, h = 10, xstart, img) {
    this.w = w;
    this.h = h;
    this.pos = createVector(
      xstart + this.w + (this.w * 2) * col,
      this.h * 2 * row
    );
    this.speed = 3;
    this.img = img;
  }
  show() {
    // fill(255, 0, 200);
    // console.log(`x:${this.pos.x}, y:${this.pos.y}`);
    // rect(this.pos.x, this.pos.y, this.w * 2, this.h * 2);
    image(this.img, this.pos.x, this.pos.y);
  }
  move(dir) {
    this.pos.x += dir * this.speed;
  }
  getLimit(side) {
    switch (side) {
      case "left": return this.pos.x - this.w;
      case "right": return this.pos.x + this.h;
    }
  }
  isOutOfBounds() {
    return this.getLimit("left") <= 0 || this.getLimit("right") >= width;
  }
}
