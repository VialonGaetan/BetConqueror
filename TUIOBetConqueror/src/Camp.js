import { WINDOW_WIDTH, WINDOW_HEIGHT } from 'tuiomanager/core/constants';
import $ from 'jquery/dist/jquery.min';

class Camp {
  constructor(x, y, radius, startAngle, endAngle, id) {
    this.id = id;
    this.x = x;
    this.y = y;
    this.radius = radius;
    this.startAngle = startAngle;
    this.endAngle = endAngle;
    const camp = document.createElement('CANVAS');
    camp.style.left = `${this.getStartXEvent()}px`;
    camp.style.top = `${this.getStartYEvent()}px`;
    camp.style.width = `${this.getWidthEvent()}px`;
    camp.style.height = `${this.getHeightEvent()}px`;
    camp.style.position = 'absolute';
    camp.width = this.getWidthEvent();
    camp.height = this.getHeightEvent();
    this.ctx = camp.getContext('2d');
    $('#game-container').append(camp);
  }

  draw() {
    this.ctx.beginPath();
    this.ctx.arc(this.getStartXDraw(), this.getStartYDraw(), this.radius - this.ctx.lineWidth, this.startAngle, this.endAngle, false);
    this.ctx.stroke();
  }

  getStartXEvent() {
    if (this.x === 0) {
      return this.x;
    } else {
      return this.x - this.radius;
    }
  }

  getStartYEvent() {
    if (this.y === 0) {
      return this.y;
    } else {
      return this.y - this.radius;
    }
  }

  getWidthEvent() {
    if (this.x === WINDOW_WIDTH / 2) {
      return this.radius * 2;
    } else {
      return this.radius;
    }
  }

  getHeightEvent() {
    if (this.y === WINDOW_HEIGHT / 2) {
      return this.radius * 2;
    } else {
      return this.radius;
    }
  }

  getStartXDraw() {
    if (this.x === 0) {
      return this.x;
    } else {
      return this.radius;
    }
  }

  getStartYDraw() {
    if (this.y === 0) {
      return this.y;
    } else {
      return this.radius;
    }
  }

  highLight() {
    this.ctx.clearRect(0, 0, this.getWidthEvent(), this.getHeightEvent())
    this.ctx.strokeStyle = "#FF0000";
    this.draw();
  }
}
export default Camp;
