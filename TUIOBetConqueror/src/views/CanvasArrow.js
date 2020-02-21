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

  drawArrow(arrows) {
    this.movingInProgress = true;
    //we keep the values
    this.currentStartXArrow = arrows[0].startXArrow;
    this.currentStartYArrow = arrows[0].startYArrow;
    this.currentEndArrowsPoints = arrows[0].endArrowsPoints;
    arrows.forEach(arrow =>{
      const arrowsAnimationData=[]
      for (let i = 0; i < arrow.endArrowsPoints.length; i++) {
        let arrowAnimationData = {
          xIncrement: (arrow.endArrowsPoints[i].endX - arrow.startXArrow) / 100,
          yIncrement: (arrow.endArrowsPoints[i].endY - arrow.startYArrow) / 100,
          intermediateX: 0,
          intermediateY: 0,
        };
        arrowsAnimationData.push(arrowAnimationData);
      }
      arrow.arrowAnimationData=arrowsAnimationData;
    });

    let t = 0;
    const canvaArrow = this;
    this.timer = setInterval(function () {
      arrows.forEach(arrow => {
        arrow.arrowAnimationData.forEach(data => {
          data.intermediateX +=data.xIncrement;
          data.intermediateY +=data.yIncrement;
        })
      })
      t = t + 1;
      if (t > 100) {
        clearInterval(this.timer);
        return;
      }
      canvaArrow.clearCanvas();
      // draw the animation
      arrows.forEach(arrow => {
        arrow.arrowAnimationData.forEach(data => {
          const newX = arrow.startXArrow + data.intermediateX;
          const newY = arrow.startYArrow + data.intermediateY;
          canvaArrow.ctx.beginPath();
          canvaArrow.ctx.fillStyle = `rgba(${arrow.player.r},${arrow.player.g},${arrow.player.b},0.3)`;
          canvaArrow.arrow(arrow.startXArrow, arrow.startYArrow, newX, newY, [0, 0, -20, 5, -10, 5]);
          canvaArrow.ctx.fill();
          canvaArrow.ctx.closePath();
        });
      });
    }, 30);
  }

  drawDisplacement(displacementEndArrowPoints,currentPlayer) {
    if (this.movingInProgress) {
      this.clearInterval();
      this.clearCanvas();
      console.log("bob");
      console.log(this.currentEndArrowsPoints);
      console.log("bob");
      console.log(displacementEndArrowPoints);
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
