import { WINDOW_HEIGHT, WINDOW_WIDTH } from 'tuiomanager/core/constants';
import $ from 'jquery/dist/jquery.min';

class Plot {
    constructor(x, y, width, height, img, id, canvasArrow, possibleDisplacement) {
        this.img = img;
        this.id = id;
        this.x = x;
        this.y = y;
        this.width = width;
        this.height = height;
        this.canvasArrow = canvasArrow;
        this.possibleDisplacement = possibleDisplacement
        const plot = document.createElement('CANVAS');
        plot.style.left = `${this.x}px`;
        plot.style.top = `${this.y}px`;
        plot.style.width = `${this.width}px`;
        plot.style.height = `${this.height}px`;
        plot.style.position = 'absolute';
        plot.style.borderColor = 'transparent';
        plot.width = this.width;
        plot.height = this.height;



        this.ctx = plot.getContext('2d');

        this.ctx.fillStyle = "transparent";
        this.drawImage();


        $('#game-container').append(plot);
    }

    drawImage() {
        const base_image = new Image();
        base_image.src = this.img;
        const context = this.ctx;
        base_image.onload = function () {
            //plot.getContext('2d').drawImage(base_image, 0, 0);
            context.drawImage(base_image,
                0,
                0,
                base_image.width / 2.3, base_image.height / 2.5
            );
        }
    }

    draw() {
        this.ctx.beginPath();
        this.ctx.fillRect(this.ctx.lineWidth, this.ctx.lineWidth, this.width - (2 * this.ctx.lineWidth), this.height - (2 * this.ctx.lineWidth));
        this.ctx.stroke();
    }

    getWidthEvent() {
        return this.width;
    }

    getHeightEvent() {
        return this.height;
    }

    highLight(color) {
        //this.ctx.clearRect(0, 0, this.getWidthEvent(), this.getHeightEvent())
        this.ctx.fillStyle = color;
        this.drawImage();
        this.draw();
    }

    removeHighlight() {
        this.ctx.fillStyle = "transparent";
        this.drawImage();
        this.draw();
    }
}

export default Plot;
