// =========================
//     asset-factory.js
// =========================

// Asset factory will create a bitmap-like image from a grid
let assetFactory = function(grid, index = 0, c = 55) {
//  will return a PImage
let scale = 2;
  let seq = grid.seq[index];
  let img = createImage(
    grid.cols * scale,
    (seq.length/grid.cols) * scale
  );
  img.loadPixels();

  for (let i = 0; i < seq.length; i++) {
    let x = i % grid.cols;
    let y = i < grid.length ? 0 : floor(i/grid.cols);
    let c1 = seq[i] ? color(c) : color('rgba(0,0,0,0)');
    let xoff = x * scale;
    let yoff = y * scale;

    for (let j = 0; j < scale; j++) {
      for (let k = 0; k < scale; k++) {
        img.set(
          xoff + j,
          yoff + k,
          c1
        );
      }
    }
  }
  img.updatePixels();

  // NOTE cannot do it this way as the resize antialiases
  // for (let j = 0; j < img.height; j++) {
  //   for (let i = 0; i < img.width; i++) {
  //     let index = (i + (grid.cols * j));
  //     img.set(
  //       i,
  //       j,
  //       grid.seq[index] ? color(c) : color('rgba(0,0,0,0)')
  //     );
  //   }
  // }
  // img.resize(img.width*3, 0);

  return img;
};
