export class ArrayFlipper {
  private array: number[];
  // limits for traversal algorithm
  private right: number;
  private bottom: number;
  private left = 0;
  private top = 0;

  private side: number;

  // layer means outer 'wall' of square, for 9 element (3x3 square) it would be one layer to traverse
  private layers: number;

  // starting position
  private row = 0;
  private column = 0;

  private previousValue: number;

  constructor(array: number[]) {
    // check if n by n square can be formed
    this.side = Math.sqrt(array.length);

    if (this.side !== Math.floor(this.side)) {
      throw new Error("Cannot form square from given array");
    }

    this.array = array;

    this.bottom = this.side - 1;
    this.right = this.side - 1;

    this.layers = Math.floor(this.side / 2);

    // value at index 0 will be always replaced with value at index 2 if square can be formed from array
    this.previousValue = array[1];
  }

  private countCurrentIndex() {
    return this.row * this.side + this.column;
  }

  private goToNextLayer() {
    this.left++;
    this.top++;
    this.right--;
    this.bottom--;

    this.row = this.top;
    this.column = this.left;
  }

  private conditionallyTraverse(
    conditionCallback: () => boolean,
    alternatePositionCallback: () => void
  ) {
    while (conditionCallback()) {
      const currentIndex = this.countCurrentIndex();
      let temp = this.array[currentIndex];
      this.array[currentIndex] = this.previousValue;
      this.previousValue = temp;

      alternatePositionCallback();
    }
  }

  rotateArray(): number[] {
    while (this.layers > 0) {
      // go down till possible
      this.conditionallyTraverse(
        () => this.column === this.left && this.row < this.bottom,
        () => this.row++
      );

      // go right till possible
      this.conditionallyTraverse(
        () => this.row === this.bottom && this.column < this.right,
        () => this.column++
      );

      // go up till possible
      this.conditionallyTraverse(
        () => this.column === this.right && this.row > this.top,
        () => this.row--
      );

      // go left till possible INCLUDING NEXT INDEX
      this.conditionallyTraverse(
        () => this.row === this.top && this.column >= this.left,
        () => this.column--
      );

      this.layers--;
      this.goToNextLayer();
    }

    return this.array;
  }
}
