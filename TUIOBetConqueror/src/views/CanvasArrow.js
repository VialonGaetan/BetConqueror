import $ from 'jquery/dist/jquery.min';

class CanvasArrow {
  constructor(startX, startY, endX, endY) {
    this.startX = startX;
    this.startY = startY;
    this.endX = endX;
    this.endY = endY;
    const canvas = document.createElement('CANVAS');
    canvas.style.left = `${this.startX}px`;
    canvas.style.top = `${this.startY}px`;
    canvas.style.width = `${this.endX - this.startX}px`;
    canvas.style.height = `${this.endY - this.startY}px`;
    canvas.style.position = 'absolute';
    canvas.style.zIndex = '1';
    canvas.width = this.endX - this.startX;
    canvas.height = this.endY - this.startY;
    this.ctx = canvas.getContext('2d');
    $('#game-container').append(canvas);
    this.movingInProgress = false;
  }

  drawArrow(startXArrow, startYArrow, endArrowsPoints,currentPlayer) {
    this.movingInProgress = true;
    //we keep the values
    this.currentStartXArrow = startXArrow;
    this.currentStartYArrow = startYArrow;
    this.currentEndArrowsPoints = endArrowsPoints;
    const xIncrement = [];
    const yIncrement = [];
    const intermediateX = [];
    const intermediateY = [];
    for (let i = 0; i < endArrowsPoints.length; i++) {
      xIncrement[i] = (endArrowsPoints[i].endX - startXArrow) / 100;
      yIncrement[i] = (endArrowsPoints[i].endY - startYArrow) / 100;
      intermediateX[i] = 0;
      intermediateY[i] = 0;
    }
    let t = 0;
    const canvaArrow = this;
    this.timer = setInterval(function () {
      for (let i = 0; i < endArrowsPoints.length; i++) {
        intermediateX[i] += xIncrement[i];
        intermediateY[i] += yIncrement[i];
      }
      t = t + 1;
      if (t > 100) {
        clearInterval(this.timer);
        return;
      }
      canvaArrow.clearCanvas();
      // draw the animation
      for (let i = 0; i < endArrowsPoints.length; i++) {
        const newX = startXArrow + intermediateX[i];
        const newY = startYArrow + intermediateY[i];
        canvaArrow.ctx.beginPath();
        canvaArrow.ctx.fillStyle = `rgba(${currentPlayer.r},${currentPlayer.g},${currentPlayer.b},0.3)`;
        canvaArrow.arrow(startXArrow, startYArrow, newX, newY, [0, 0, -20, 5, -10, 5]);
        canvaArrow.ctx.fill();
        canvaArrow.ctx.closePath();
      }
    }, 30);
  }

  drawDisplacement(displacementEndArrowPoints,currentPlayer) {
    if (this.movingInProgress) {
      this.clearInterval();
      this.clearCanvas();
      // draw the animation
      this.currentEndArrowsPoints.forEach(element => {
        this.ctx.beginPath();
        if (displacementEndArrowPoints[0].endX == element.endX && displacementEndArrowPoints[0].endY == element.endY) {
          this.ctx.fillStyle = `rgba(${currentPlayer.r},${currentPlayer.g},${currentPlayer.b},1)`;
        } else {
          this.ctx.fillStyle = `rgba(${currentPlayer.r},${currentPlayer.g},${currentPlayer.b},0.3)`;
        }
        this.arrow(this.currentStartXArrow, this.currentStartYArrow, element.endX, element.endY, [0, 0, -20, 5, -10, 5]);
        this.ctx.fill();
        this.ctx.closePath();
      });
    }
  }

  arrow(startX, startY, endX, endY, controlPoints) {
    const dx = endX - startX;
    const dy = endY - startY;
    const len = Math.sqrt(dx * dx + dy * dy);
    const sin = dy / len;
    const cos = dx / len;
    const a = [];
    a.push(0, 0);
    for (let i = 0; i < controlPoints.length; i += 2) {
      const x = controlPoints[i];
      const y = controlPoints[i + 1];
      a.push(x < 0 ? len + x : x, y);
    }
    a.push(len, 0);
    for (let i = controlPoints.length; i > 0; i -= 2) {
      const x = controlPoints[i - 2];
      const y = controlPoints[i - 1];
      a.push(x < 0 ? len + x : x, -y);
    }
    a.push(0, 0);
    for (let i = 0; i < a.length; i += 2) {
      const x = a[i] * cos - a[i + 1] * sin + startX;
      const y = a[i] * sin + a[i + 1] * cos + startY;
      if (i === 0) {
        this.ctx.moveTo(x, y);
      } else {
        this.ctx.lineTo(x, y);
      }
    }
  }

  clearCanvas() {
    this.ctx.clearRect(this.startX, this.startY, this.endX, this.endY);
  }

  clearInterval() {
    clearInterval(this.timer);
  }

  reset(){
    this.clearInterval();
    this.clearCanvas();
    this.movingInProgress = false;
  }
}

export default CanvasArrow;
