"use strict";

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
    let assets = {
      enemy1: {
        grid: grids.easy,
        imgs: [assetFactory(grids.easy, 0), assetFactory(grids.easy, 1)],
      },
      enemy2: {
        grid: grids.medium,
        imgs: [assetFactory(grids.medium, 0), assetFactory(grids.medium, 1)]
      },
      enemy3: {
        grid: grids.hard,
        imgs: [assetFactory(grids.hard, 0), assetFactory(grids.hard, 1)]
      }
    };
    let area = {
      width: 18,
      height: 12
    };

    // center the grid
    let gridWidth = this.cols * (area.width * 2);
    let xstart = (width - gridWidth) / 2;

    for (let i = 0; i < grid.length; i++) {
      if (grid[i]) {
        let col = i % cols; // get the current column, reset after each column limit
        let row = floor(i / cols); // find out which row we are on
        let imgs = row < 1
          ? assets.enemy3.imgs
          : row < 3 ? assets.enemy2.imgs : assets.enemy1.imgs;

        this.list.push(
          new Pixel(
            col,
            row,
            area.width,
            area.height,
            xstart,
            imgs
          )
        );
      }
    }
  }
  update() {
//  if any of the enemys are getting too close to the edge, change direction
    let isOutOfBounds = false;

    if (this.list.length === 0) {
      game.reset();
    }

    for (let i = 0; i < this.list.length; i++) {
      if (this.list[i].isOutOfBounds()) {
        isOutOfBounds = true;
        break;
      }
    }

    if (isOutOfBounds) {
      this.dir *= -1;
      this.list.forEach(e => { e.drop = true });
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
    game.score++;
    console.log(game.score);
    this.list.splice(i, 1);
  }
  // detectCol(laser) {
  //   this.list.forEach(e => {  });
  // }
  move() {
    this.list.forEach(enemy => {
      enemy.update(this.dir, this.drop);
    });
  }
}

class Pixel {
  constructor(col = 0, row = 0, w = 16, h = 10, xstart, imgs) {
    this.w = w;
    this.h = h;
    this.pos = createVector(
      xstart + this.w + (this.w * 2) * col,
      (this.h * 3) + (this.h * 2 * row)
    );
    this.speed = 3;
    this.imgs = imgs;
    this.switch = false;
    this.dir;
  }
  show() {
    // fill(255, 0, 200);
    // console.log(`x:${this.pos.x}, y:${this.pos.y}`);
    // rect(this.pos.x, this.pos.y, this.w * 2, this.h * 2);
    image(
      this.imgs[this.switch ? 0 : 1],
      this.pos.x,
      this.pos.y
    );
  }
  update(dir, drop) {
    this.dir = dir;
    if (frameCount % 30 === 0) {
      if (!this.drop) {
        this.pos.x += dir * this.w * 2;
        this.switch = !this.switch;
      }
      else {
        this.pos.y += this.h * 2;
        this.drop = !this.drop;
      }
    }
    // this.pos.x += dir * this.speed;
  }
  getLimit(side) {
    switch (side) {
      case "left": return this.pos.x - this.w;
      case "right": return this.pos.x + this.w;
    }
  }
  isOutOfBounds() {
    return (this.dir === -1)
      ? this.getLimit("left") <= 0 + this.w * 3
      : this.getLimit("right") >= width - this.w * 4;
  }
}
