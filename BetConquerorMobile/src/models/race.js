export default class Race {
  constructor(available, name, color) {
    this.available = available;
    this.name = name;
    this.color = color;
    this.isMine = false;
  }

  changeAvailable() {
    this.available = !this.available;
  }
}
