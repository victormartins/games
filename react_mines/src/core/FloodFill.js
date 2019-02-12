import GetNeighbours from './GetNeighbours';

class FloodFill {
  constructor(collection) {
    this.collection = [...collection];
    this.toVisit = [];
  }

  flood(target) {
    const targetHasNoBombsInProximity = !(
      target.detectedBombs !== undefined && target.detectedBombs > 0
    );
    // console.log('FLOOD TARGET: ', target);

    // console.log('Flooding: ', target, this.collection);

    // open target
    this.collection[target.posY][target.posX].open = true;

    // get neighbours
    const neighboursOfTarget = GetNeighbours.execute(target, this.collection);

    // filter neighbours:
    // - must be closed
    // - must be empty
    const neighboursToOpen = neighboursOfTarget.filter(neighbour => {
      const isClosed = !neighbour.open;
      const isEmpty = !neighbour.isBomb;

      return isClosed && isEmpty && targetHasNoBombsInProximity;
    });

    // add filtered neighbours to toVisit collection
    this.toVisit = [...this.toVisit, ...neighboursToOpen];

    // pop one and call flood() again to that target
    if (this.toVisit.length > 0) {
      this.flood(this.toVisit.pop());
    }

    return this.collection;
  }
}

export default FloodFill;
