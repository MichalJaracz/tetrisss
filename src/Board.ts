import { Block, colors, RotationShape } from "./Block";

export const COLS = 11;
export const ROWS = 16;
export const BLOCK_SIZE = 30;

export type BoardCollection = Array<Array<number>>;
const initialCollection: BoardCollection = [
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0],
  [0, 0, 0, 0, 0, 0, 0, 0, 0, 0, 0]
];

const canvas = document.getElementById("board") as HTMLCanvasElement;

export class Board {
  private ctx: CanvasRenderingContext2D;
  public collection: BoardCollection;

  constructor() {
    this.ctx = canvas.getContext("2d") as CanvasRenderingContext2D;
    this.collection = initialCollection;
  }

  public configureCtx = (): void => {
    this.ctx.canvas.width = COLS * BLOCK_SIZE;
    this.ctx.canvas.height = ROWS * BLOCK_SIZE;
    this.ctx.scale(BLOCK_SIZE, BLOCK_SIZE);
  };

  public clearBoard = (): void => {
    this.ctx.clearRect(0, 0, canvas.width, canvas.height);
  };

  public getColorIndex = (color: string): number => {
    return colors.findIndex((c) => c === color) + 1;
  };

  public getColor = (colorIndex: number): string => {
    return colors[colorIndex - 1];
  };

  public setCollectionValue = (
    x: number,
    y: number,
    colorIndex: number
  ): void => {
    this.collection[y][x] = colorIndex;
  };

  public canMove = (x: number, y: number): boolean => {
    return this.collection[y][x] === 0;
  };

  public drawPoint = (x: number, y: number, color: string): void => {
    this.ctx.fillStyle = color;
    this.ctx.fillRect(x, y, 1, 1);
  };

  public removeBlock = (): void => {
    this.collection = [...this.collection].map((row) => {
      return row.map((element) => (element === 9 ? 0 : element));
    });
  };

  public addBlock = (block: Block, x: number, y: number): void => {
    block.rotationShape[block.rotation as keyof RotationShape].forEach(
      (row, rowI) => {
        row.forEach((element, elementI) => {
          if (element !== 0) {
            this.setCollectionValue(x + elementI, y + rowI, 9);
          }
        });
      }
    );
  };

  public saveBlock = (block: Block, x: number, y: number): void => {
    block.rotationShape[block.rotation as keyof RotationShape].forEach(
      (row, rowI) => {
        row.forEach((element, elementI) => {
          if (element !== 0) {
            this.setCollectionValue(
              x + elementI,
              y + rowI,
              this.getColorIndex(block.color)
            );
          }
        });
      }
    );
  };

  public canBlockMoveRight = (block: Block, x: number, y: number): boolean => {
    return block.rotationShape[block.rotation as keyof RotationShape].every(
      (row, rowI) => {
        return row.every((element, elementI) => {
          if (element !== 0) {
            return this.canMove(x + elementI + 1, y + rowI);
          }
          return true;
        });
      }
    );
  };

  public canBlockMoveLeft = (block: Block, x: number, y: number): boolean => {
    return block.rotationShape[block.rotation as keyof RotationShape].every(
      (row, rowI) => {
        return row.every((element, elementI) => {
          if (element !== 0) {
            return this.canMove(x - 1, y + rowI);
          }
          return true;
        });
      }
    );
  };

  public canBlockRotate = (block: Block, x: number, y: number): boolean => {
    return block.rotationShape[
      block.getNextRotate() as keyof RotationShape
    ].every((row, rowI) => {
      return row.every((element, elementI) => {
        if (y + rowI >= ROWS) {
          return false;
        }
        if (element !== 0) {
          return this.canMove(x + elementI, y + rowI);
        }
        return true;
      });
    });
  };

  public canBlockMoveDown = (block: Block, x: number, y: number): boolean => {
    return block.rotationShape[block.rotation as keyof RotationShape].every(
      (row, rowI) => {
        return row.every((element, elementI) => {
          const nextY = y + rowI + 1;
          if (nextY >= ROWS) {
            return false;
          }
          if (element !== 0) {
            return this.canMove(x + elementI, y + rowI + 1);
          }
          return true;
        });
      }
    );
  };

  public drawBoardCollection = (blockColor: string): void => {
    console.table(this.collection);
    this.collection.forEach((row, rowI) => {
      row.forEach((colorIndex, xIndex) => {
        if (colorIndex === 9) {
          this.drawPoint(xIndex, rowI, blockColor);
        }
        if (colorIndex !== 0) {
          this.drawPoint(xIndex, rowI, this.getColor(colorIndex));
        }
      });
    });
  };

  public crushLines = (): void => {
    let score = 0;
    const newCollection = [...this.collection].filter((row) => {
      const everyRowElement = row.every((element) => element !== 0);
      if (everyRowElement) {
        score += 1;
      }
      return !everyRowElement;
    });
    if (score) {
      const newEmptyRows = new Array(score).fill(new Array(COLS).fill(0));
      this.collection = [...newEmptyRows, ...newCollection];
    }
  };
}
