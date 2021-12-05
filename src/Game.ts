import { Block } from "./Block";
import { Board } from "./Board";

const newBlockXPosition = 4;
const newBlockYPosition = 0;

export class Game {
  private blockXPosition: number;
  private blockYPosition: number;
  private board: Board;
  private block: Block;
  public gameOver: boolean;

  constructor() {
    this.blockXPosition = newBlockXPosition;
    this.blockYPosition = newBlockYPosition;
    this.board = new Board();
    this.block = new Block();
    this.board.configureCtx();
    this.gameOver = false;
    this.board.removeBlock();
    this.moveBlock();
  }

  public reset = () => {
    this.blockXPosition = newBlockXPosition;
    this.blockYPosition = newBlockYPosition;
    this.board = new Board();
    this.block = new Block();
    this.board.configureCtx();
    this.gameOver = false;
    this.board.removeBlock();
    this.moveBlock();
  };

  public moveBlock = () => {
    this.board.clearBoard();
    this.board.addBlock(this.block, this.blockXPosition, this.blockYPosition);
    this.board.drawBoardCollection(this.block.color);
  };

  public start = () => {
    this.moveBlock();
    this.board.addBlock(this.block, this.blockXPosition, this.blockYPosition);
    this.board.drawBoardCollection(this.block.color);
  };

  public rotateBlock = () => {
    this.board.removeBlock();
    if (
      this.board.canBlockRotate(
        this.block,
        this.blockXPosition,
        this.blockYPosition
      )
    ) {
      this.block.rotate();
      this.moveBlock();
    } else {
      this.moveBlock();
    }
  };

  public moveLeft = () => {
    this.board.removeBlock();
    if (
      this.board.canBlockMoveLeft(
        this.block,
        this.blockXPosition,
        this.blockYPosition
      )
    ) {
      this.blockXPosition = this.blockXPosition - 1;
      this.moveBlock();
    } else {
      this.moveBlock();
    }
  };

  public moveRight = () => {
    this.board.removeBlock();
    if (
      this.board.canBlockMoveRight(
        this.block,
        this.blockXPosition,
        this.blockYPosition
      )
    ) {
      this.blockXPosition = this.blockXPosition + 1;
      this.moveBlock();
    } else {
      this.moveBlock();
    }
  };

  public moveDown = () => {
    this.board.removeBlock();
    if (
      this.board.canBlockMoveDown(
        this.block,
        this.blockXPosition,
        this.blockYPosition
      )
    ) {
      this.blockYPosition = this.blockYPosition + 1;
      this.moveBlock();
    } else {
      if (this.blockYPosition === 0) {
        this.board.saveBlock(
          this.block,
          this.blockXPosition,
          this.blockYPosition
        );
        this.moveBlock();
        this.gameOver = true;
      } else {
        this.board.saveBlock(
          this.block,
          this.blockXPosition,
          this.blockYPosition
        );
        this.board.crushLines();
        this.blockXPosition = newBlockXPosition;
        this.blockYPosition = newBlockYPosition;
        this.block = new Block();
        this.moveBlock();
      }
    }
  };
}
