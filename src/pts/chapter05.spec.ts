// tslint:disable:max-classes-per-file

// A chess piece
abstract class Piece {
  protected position: Position;
  constructor(readonly color: Color, file: FileP, rank: RankP) {
    this.position = new Position(file, rank);
  }

  moveTo(position: Position) {
    this.position = position;
  }

  abstract canMoveTo(position: Position): boolean;
}

// A set of coordinates for a piece
class Position {
  constructor(private file: FileP, private rank: RankP) {}

  distanceFrom(position: Position) {
    return {
      rank: Math.abs(position.rank - this.rank),
      file: Math.abs(position.file.charCodeAt(0) - this.file.charCodeAt(0)),
    };
  }
}

class King extends Piece {
  canMoveTo(position: Position) {
    const distance = this.position.distanceFrom(position);
    return distance.rank < 2 && distance.file < 2;
  }
}
/*
class Queen extends Piece {}
class Bishop extends Piece {}
class Knight extends Piece {}
class Rook extends Piece {}
class Pawn extends Piece {}
*/

type Color = "Black" | "White";
type FileP = "A" | "B" | "C" | "D" | "E" | "F" | "G";
type RankP = 1 | 2 | 3 | 4 | 5 | 6 | 7 | 8;

class Game {
  public pieces = Game.makePieces();

  private static makePieces() {
    return [
      // Kings
      new King("White", "E", 1),
      new King("Black", "E", 8),
    ];
  }
}

describe("Chapter05", () => {
  it("chess", () => {
    const game = new Game();
    const pieces = game.pieces;

    expect(pieces.length).toEqual(2);
    const whiteKing = pieces[0];
    expect(whiteKing.color).toEqual("White");
  });
});
