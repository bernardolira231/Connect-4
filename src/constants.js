export const TURNS = {
  X: "🔴",
  O: "🟡",
};

const SIZE_X = 8;
const SIZE_Y = 7;
const WIN_LENGTH = 4;
const DIRECTIONS = [
  { x: 0, y: 1 }, // horizontal
  { x: 1, y: 0 }, // vertical
  { x: 1, y: 1 }, // diagonal /
  { x: 1, y: -1 }, // diagonal \
];

export const WINNER_COMBOS = [];

for (let x = 0; x < SIZE_X; x++) {
  for (let y = 0; y < SIZE_Y; y++) {
    for (let dir of DIRECTIONS) {
      let combo = [];
      for (let i = 0; i < WIN_LENGTH; i++) {
        let xi = x + i * dir.x;
        let yi = y + i * dir.y;
        if (xi >= 0 && xi < SIZE_X && yi >= 0 && yi < SIZE_Y) {
          combo.push(xi * SIZE_Y + yi);
        }
      }
      if (combo.length === WIN_LENGTH) {
        WINNER_COMBOS.push(combo);
      }
    }
  }
}
console.log(`winner:  ${JSON.stringify(WINNER_COMBOS, null, 2)}`);
