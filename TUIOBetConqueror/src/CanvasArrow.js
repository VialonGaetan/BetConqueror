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
        canvas.style.width = `${this.endX-this.startX}px`;
        canvas.style.height = `${this.endY-this.startY}px`;
        canvas.style.position = 'absolute';
        canvas.style.zIndex = '1';
        canvas.width = this.endX-this.startX;
        canvas.height = this.endY-this.startY;
        this.ctx = canvas.getContext('2d');
        $('#game-container').append(canvas);
        this.movingInProgress = false;
    }

    drawArrow(startXArrow, startYArrow, endArrowsPoints) {
        this.movingInProgress = true;
        //we keep the values
        this.currentStartXArrow=startXArrow; this.currentStartYArrow=startYArrow;this.currentEndArrowsPoints=endArrowsPoints;

        let xIncrement = []; let yIncrement = [];
        let intermediateX = []; let intermediateY = [];
        for(let i=0;i<endArrowsPoints.length;i++){
            xIncrement[i]=(endArrowsPoints[i].endX-startXArrow)/100;
            yIncrement[i]=(endArrowsPoints[i].endY-startYArrow)/100;
            intermediateX[i]=0;
            intermediateY[i]=0;
        }
        let t=0;
        let canvaArrow = this;
        let timer = setInterval(function() {
            for(let i=0;i<endArrowsPoints.length;i++){
                intermediateX[i]+=xIncrement[i];
                intermediateY[i]+=yIncrement[i];
            }
            t=t+1;
            if (t>100){
                clearInterval(timer);
                return;
            }
            canvaArrow.clearCanvas();
            canvaArrow.ctx.save();
            // draw the animation
            for(let i=0;i<endArrowsPoints.length;i++){
                let newX,newY;
                newX=startXArrow+intermediateX[i];
                newY=startYArrow+intermediateY[i];
                canvaArrow.ctx.beginPath();
                canvaArrow.ctx.fillStyle = "#FF0000";
                canvaArrow.arrow(startXArrow, startYArrow, newX, newY, [0, 0, -20, 5, -10, 5]);
                canvaArrow.ctx.fill();
                canvaArrow.ctx.closePath();
            };
            canvaArrow.ctx.restore();
        }, 30);
        this.clearCanvas();
    }

    drawDisplacement(displacementEndArrowPoints) {
        if(this.movingInProgress) {
            this.clearCanvas();
            this.ctx.save();
            // draw the animation
            this.currentEndArrowsPoints.forEach(element => {
                this.ctx.beginPath();
                if (displacementEndArrowPoints.endX == element.endX && displacementEndArrowPoints.endY == element.endY) {
                    this.ctx.fillStyle = "#008000";
                } else {
                    this.ctx.fillStyle = "#FF0000";
                }
                this.arrow(this.currentStartXArrow, this.currentStartYArrow, element.endX, element.endY, [0, 0, -20, 5, -10, 5]);
                this.ctx.fill();
                this.ctx.closePath();
            });
            this.ctx.restore();
        }
    }

    arrow(startX, startY, endX, endY, controlPoints) {
        let dx = endX - startX;
        let dy = endY - startY;
        let len = Math.sqrt(dx * dx + dy * dy);
        let sin = dy / len;
        let cos = dx / len;
        let a = [];
        a.push(0, 0);
        for (let i = 0; i < controlPoints.length; i += 2) {
            let x = controlPoints[i];
            let y = controlPoints[i + 1];
            a.push(x < 0 ? len + x : x, y);
        }
        a.push(len, 0);
        for (let i = controlPoints.length; i > 0; i -= 2) {
            let x = controlPoints[i - 2];
            let y = controlPoints[i - 1];
            a.push(x < 0 ? len + x : x, -y);
        }
        a.push(0, 0);
        for (let i = 0; i < a.length; i += 2) {
            let x = a[i] * cos - a[i + 1] * sin + startX;
            let y = a[i] * sin + a[i + 1] * cos + startY;
            if (i === 0) this.ctx.moveTo(x, y);
            else this.ctx.lineTo(x, y);
        }
    };

    clearCanvas(){
        this.ctx.restore();
        this.ctx.clearRect(this.startX,this.startY,this.endX,this.endY);
    }
}
export default CanvasArrow;
