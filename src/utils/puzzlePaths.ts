/**
 * Exact 6-piece interlocking jigsaw puzzle definitions.
 * Canvas size: 600 x 400
 * 3 columns x 2 rows = 6 pieces
 * Piece 0: Row 0, Col 0 (Top-Left)
 * Piece 1: Row 0, Col 1 (Top-Center)
 * Piece 2: Row 0, Col 2 (Top-Right)
 * Piece 3: Row 1, Col 0 (Bottom-Left)
 * Piece 4: Row 1, Col 1 (Bottom-Center)
 * Piece 5: Row 1, Col 2 (Bottom-Right)
 */

export interface JigsawPieceDef {
  id: number;
  row: number;
  col: number;
  targetX: number; // in board coordinates
  targetY: number;
  width: number;
  height: number;
  pathD: string;
  name: string;
}

// Canvas size
export const PUZZLE_WIDTH = 600;
export const PUZZLE_HEIGHT = 400;
export const PIECE_BASE_WIDTH = 200;
export const PIECE_BASE_HEIGHT = 200;

/**
 * 6 Interlocking puzzle pieces paths for 600x400 canvas.
 * Outer edges are straight, inner edges have interlocking bulb tabs and sockets.
 */
export const JIGSAW_PIECES: JigsawPieceDef[] = [
  {
    id: 0,
    row: 0,
    col: 0,
    targetX: 0,
    targetY: 0,
    width: 200,
    height: 200,
    name: 'Keping 1 (Kiri Atas)',
    // Start (0,0) -> top edge straight to (200,0)
    // -> right edge has tab pointing right into Col 1 (x=200, y goes 0 to 200)
    // -> bottom edge has tab pointing down into Row 1 (y=200, x goes 200 to 0)
    // -> left edge straight from (0,200) to (0,0)
    pathD: `
      M 0 0
      L 200 0
      L 200 70
      C 200 65 228 60 230 100
      C 232 140 200 135 200 130
      L 200 200
      L 130 200
      C 135 200 140 228 100 230
      C 60 232 65 200 70 200
      L 0 200
      Z
    `,
  },
  {
    id: 1,
    row: 0,
    col: 1,
    targetX: 200,
    targetY: 0,
    width: 200,
    height: 200,
    name: 'Keping 2 (Tengah Atas)',
    // Start (200,0) -> top edge straight to (400,0)
    // -> right edge with socket/tab into Col 2 (x=400, socket pointing left)
    // -> bottom edge with socket indented upward (y=200, x goes 400 to 200)
    // -> left edge with socket matching piece 0 (x=200, socket pointing left)
    pathD: `
      M 200 0
      L 400 0
      L 400 70
      C 400 65 372 60 370 100
      C 368 140 400 135 400 130
      L 400 200
      L 330 200
      C 335 200 340 172 300 170
      C 260 168 265 200 270 200
      L 200 200
      L 200 130
      C 200 135 232 140 230 100
      C 228 60 200 65 200 70
      Z
    `,
  },
  {
    id: 2,
    row: 0,
    col: 2,
    targetX: 400,
    targetY: 0,
    width: 200,
    height: 200,
    name: 'Keping 3 (Kanan Atas)',
    // Start (400,0) -> top edge straight to (600,0)
    // -> right edge straight (600,0) to (600,200)
    // -> bottom edge has tab pointing down into Row 1 (y=200, x goes 600 to 400)
    // -> left edge with tab matching piece 1 (x=400, tab pointing left into piece 1 socket)
    pathD: `
      M 400 0
      L 600 0
      L 600 200
      L 530 200
      C 535 200 540 228 500 230
      C 460 232 465 200 470 200
      L 400 200
      L 400 130
      C 400 135 368 140 370 100
      C 372 60 400 65 400 70
      Z
    `,
  },
  {
    id: 3,
    row: 1,
    col: 0,
    targetX: 0,
    targetY: 200,
    width: 200,
    height: 200,
    name: 'Keping 4 (Kiri Bawah)',
    // Start (0,200) -> top edge has socket matching piece 0 (tab from piece 0 into piece 3)
    // -> right edge has socket pointing left (x=200, y goes 200 to 400)
    // -> bottom edge straight from (200,400) to (0,400)
    // -> left edge straight from (0,400) to (0,200)
    pathD: `
      M 0 200
      L 70 200
      C 65 200 60 232 100 230
      C 140 228 135 200 130 200
      L 200 200
      L 200 270
      C 200 265 172 260 170 300
      C 168 340 200 335 200 330
      L 200 400
      L 0 400
      Z
    `,
  },
  {
    id: 4,
    row: 1,
    col: 1,
    targetX: 200,
    targetY: 200,
    width: 200,
    height: 200,
    name: 'Keping 5 (Tengah Bawah)',
    // Start (200,200) -> top edge has tab pointing up into piece 1 (y=200)
    // -> right edge has tab pointing right into piece 5 (x=400)
    // -> bottom edge straight from (400,400) to (200,400)
    // -> left edge has tab pointing left into piece 3 (x=200)
    pathD: `
      M 200 200
      L 270 200
      C 265 200 260 168 300 170
      C 340 172 335 200 330 200
      L 400 200
      L 400 270
      C 400 265 428 260 430 300
      C 432 340 400 335 400 330
      L 400 400
      L 200 400
      L 200 330
      C 200 335 168 340 170 300
      C 172 260 200 265 200 270
      Z
    `,
  },
  {
    id: 5,
    row: 1,
    col: 2,
    targetX: 400,
    targetY: 200,
    width: 200,
    height: 200,
    name: 'Keping 6 (Kanan Bawah)',
    // Start (400,200) -> top edge has socket matching piece 2 tab (y=200)
    // -> right edge straight (600,200) to (600,400)
    // -> bottom edge straight (600,400) to (400,400)
    // -> left edge has socket matching piece 4 tab (x=400)
    pathD: `
      M 400 200
      L 470 200
      C 465 200 460 232 500 230
      C 540 228 535 200 530 200
      L 600 200
      L 600 400
      L 400 400
      L 400 330
      C 400 335 432 340 430 300
      C 428 260 400 265 400 270
      Z
    `,
  },
];
