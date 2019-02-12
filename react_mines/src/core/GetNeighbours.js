class GetNeighbours {
  static execute(target, collection) {
    const result = [];
    const boardH = collection.length;
    const boardW = collection[0].length;

    for (let yOffSet = -1; yOffSet <= 1; yOffSet += 1) {
      for (let xOffSet = -1; xOffSet <= 1; xOffSet += 1) {
        const x = target.posX + xOffSet;
        const y = target.posY + yOffSet;

        // dont add self
        if (x == target.posX && y == target.posY) {
          continue;
        }
        // avoid outer limits
        if (x >= 0 && x < boardW && y >= 0 && y < boardH) {
          result.push(collection[y][x]);
        }
      }
    }
    return result;
  }
}

export default GetNeighbours;
