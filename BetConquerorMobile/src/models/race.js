export default class Race {
  constructor(available, name, color) {
    this.available = available;
    this.name = name;
    this.color = color;
  }

  changeAvailable() {
    this.available = !this.available;
  }
}
