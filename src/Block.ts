export type Shape = Array<number[]>;
export type RotationShape = {
  0: Shape;
  1: Shape;
  2: Shape;
  3: Shape;
};

const lRotationShape: RotationShape = {
  0: [
    [9, 0],
    [9, 0],
    [9, 1]
  ],
  1: [
    [9, 9, 9],
    [9, 0, 0]
  ],
  2: [
    [9, 9],
    [0, 9],
    [0, 9]
  ],
  3: [
    [0, 0, 9],
    [9, 9, 9]
  ]
};
const zRotationShape: RotationShape = {
  0: [
    [0, 9, 9],
    [9, 9, 0]
  ],
  1: [
    [9, 0],
    [9, 9],
    [0, 9]
  ],
  2: [
    [0, 9, 9],
    [9, 9, 0]
  ],
  3: [
    [9, 0],
    [9, 9],
    [0, 9]
  ]
};
const iRotationShape: RotationShape = {
  0: [[9], [9], [9], [9]],
  1: [[9, 9, 9, 9]],
  2: [[9], [9], [9], [9]],
  3: [[9, 9, 9, 9]]
};
const tRotationShape: RotationShape = {
  0: [
    [9, 9, 9],
    [0, 9, 0],
    [0, 9, 0]
  ],
  1: [
    [0, 0, 9],
    [9, 9, 9],
    [0, 0, 9]
  ],
  2: [
    [0, 9, 0],
    [0, 9, 0],
    [9, 9, 9]
  ],
  3: [
    [9, 0, 0],
    [9, 9, 9],
    [9, 0, 0]
  ]
};

export const shapes: Array<RotationShape> = [
  tRotationShape,
  lRotationShape,
  zRotationShape,
  iRotationShape
];
export const colors: Array<string> = ["blue", "red", "green", "yellow"];

export class Block {
  color: string;
  rotationShape: RotationShape;
  rotation: number;
  width: number;
  height: number;

  constructor() {
    this.color = this.getRandomColor();
    this.rotationShape = this.getRandomRotationShape();
    this.rotation = 0;
    this.width = this.rotationShape[0].length;
    this.height = this.rotationShape[0].length;
  }

  public getNextRotate = (): number => {
    if (this.rotation === 3) {
      return 0;
    } else {
      return this.rotation + 1;
    }
  };

  public rotate = () => {
    this.rotation = this.getNextRotate();
  };

  private getRandomRotationShape = (): RotationShape => {
    const randomIndex = Math.floor(Math.random() * shapes.length);
    return shapes[randomIndex];
  };

  private getRandomColor = (): string => {
    const randomIndex = Math.floor(Math.random() * colors.length);
    return colors[randomIndex];
  };
}
