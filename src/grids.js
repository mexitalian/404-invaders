// ================
//     grid.js
// ================

let formation = [ // 404
  0,0,1, 0, 0,1,1,0, 0, 0,0,1,
  0,1,1, 0, 1,0,0,1, 0, 0,1,1,
  1,0,1, 0, 1,0,0,1, 0, 1,0,1,
  1,1,1, 0, 1,0,0,1, 0, 1,1,1,
  0,0,1, 0, 0,1,1,0, 0, 0,0,1
]
, three = [
  1,0,1, 0, 0,1,1,1,0, 0, 1,0,1,
  1,0,1, 0, 0,0,0,1,0, 0, 1,0,1,
  1,1,1, 0, 0,0,1,0,0, 0, 1,1,1,
  0,0,1, 0, 0,0,0,1,0, 0, 0,0,1,
  0,0,1, 0, 0,1,1,1,0, 0, 0,0,1
]
, two = [
  1,0,1, 0, 0,1,1,1,0, 0, 1,0,1,
  1,0,1, 0, 0,0,0,1,0, 0, 1,0,1,
  1,1,1, 0, 0,0,1,0,0, 0, 1,1,1,
  0,0,1, 0, 0,1,0,0,0, 0, 0,0,1,
  0,0,1, 0, 0,1,1,1,0, 0, 0,0,1
]
, one = [
  1,0,1, 0, 0,1,1,0,0, 0, 1,0,1,
  1,0,1, 0, 0,0,1,0,0, 0, 1,0,1,
  1,1,1, 0, 0,0,1,0,0, 0, 1,1,1,
  0,0,1, 0, 0,0,1,0,0, 0, 0,0,1,
  0,0,1, 0, 0,1,1,1,0, 0, 0,0,1
]
, text_old = [ // 404
  0,0,0,1,0, 0, 0,1,1,1,0, 0, 0,0,0,1,0,
  0,0,1,1,0, 0, 1,0,0,0,1, 0, 0,0,1,1,0,
  0,1,0,1,0, 0, 1,0,1,0,1, 0, 0,1,0,1,0,
  1,1,1,1,1, 0, 1,0,1,0,1, 0, 1,1,1,1,1,
  0,0,0,1,0, 0, 1,0,0,0,1, 0, 0,0,0,1,0,
  0,0,0,1,0, 0, 0,1,1,1,0, 0, 0,0,0,1,0
]
, grids = {
    easy: {
      cols: 12,
      seq: [
        [
          0,0,0,0,1,1,1,1,0,0,0,0,
          0,1,1,1,1,1,1,1,1,1,1,0,
          1,1,1,1,1,1,1,1,1,1,1,1,
          1,1,1,0,0,1,1,0,0,1,1,1,
          1,1,1,1,1,1,1,1,1,1,1,1,
          0,0,0,1,1,0,0,1,1,0,0,0,
          0,0,1,1,0,1,1,0,1,1,0,0,
          1,1,0,0,0,0,0,0,0,0,1,1
        ],
        [
          0,0,0,0,1,1,1,1,0,0,0,0,
          0,1,1,1,1,1,1,1,1,1,1,0,
          1,1,1,1,1,1,1,1,1,1,1,1,
          1,1,1,0,0,1,1,0,0,1,1,1,
          1,1,1,1,1,1,1,1,1,1,1,1,
          0,0,1,1,1,0,0,1,1,1,0,0,
          0,1,1,0,0,1,1,0,0,1,1,0,
          0,0,1,1,0,0,0,0,1,1,0,0
        ]
      ]
    },
    medium: {
      cols: 11,
      seq: [
        [
          0,0,1,0,0,0,0,0,1,0,0,
          0,0,0,1,0,0,0,1,0,0,0,
          0,0,1,1,1,1,1,1,1,0,0,
          0,1,1,0,1,1,1,0,1,1,0,
          1,1,1,1,1,1,1,1,1,1,1,
          1,0,1,1,1,1,1,1,1,0,1,
          1,0,1,0,0,0,0,0,1,0,1,
          0,0,0,1,1,0,1,1,0,0,0
        ],
        [
          0,0,1,0,0,0,0,0,1,0,0,
          1,0,0,1,0,0,0,1,0,0,1,
          1,0,1,1,1,1,1,1,1,0,1,
          1,1,1,0,1,1,1,0,1,1,1,
          1,1,1,1,1,1,1,1,1,1,1,
          0,1,1,1,1,1,1,1,1,1,0,
          0,0,1,0,0,0,0,0,1,0,0,
          0,1,0,0,0,0,0,0,0,1,0
        ]
      ]
    },
    hard: {
      cols: 8,
      seq: [
        [
          0,0,0,1,1,0,0,0,
          0,0,1,1,1,1,0,0,
          0,1,1,1,1,1,1,0,
          1,1,0,1,1,0,1,1,
          1,1,1,1,1,1,1,1,
          0,0,1,0,0,1,0,0,
          0,1,0,1,1,0,1,0,
          1,0,1,0,0,1,0,1
        ],
        [
          0,0,0,1,1,0,0,0,
          0,0,1,1,1,1,0,0,
          0,1,1,1,1,1,1,0,
          1,1,0,1,1,0,1,1,
          1,1,1,1,1,1,1,1,
          0,1,0,1,1,0,1,0,
          1,0,0,0,0,0,0,1,
          0,1,0,0,0,0,1,0
        ]
      ]
    },
    ship: {
      cols: 15,
      seq: [
        [
          0,0,0,0,0,0,0,1,0,0,0,0,0,0,0,
          0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
          0,0,0,0,0,0,1,1,1,0,0,0,0,0,0,
          0,1,1,1,1,1,1,1,1,1,1,1,1,1,0,
          1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
          1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
          1,1,1,1,1,1,1,1,1,1,1,1,1,1,1,
          1,1,1,1,1,1,1,1,1,1,1,1,1,1,1
        ]
      ]
    }
};