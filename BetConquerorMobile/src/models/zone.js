export default class Zone {
  constructor(name, player, coordinates) {
    this.name = name;
    this.player = player;
    this.coordinates = coordinates;
  }

  isInTheZone(x, y) {
    if (x > this.coordinates.xRight) {
      return false;
    }
    if (x < this.coordinates.xLeft) {
      return false;
    }
    if (y > this.coordinates.yDown) {
      return false;
    }
    if (y < this.coordinates.yUp) {
      return false;
    }
    return true;
  }
}
