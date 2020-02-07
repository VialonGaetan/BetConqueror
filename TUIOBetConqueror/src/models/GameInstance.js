


let gameInstance = null

class GameInstance {

    constructor() {
        if (gameInstance !== null) {
            return gameInstance
        }

        gameInstance = this;

        this.unities = [
            {
                tag: "E0",
                position: 0,
                spawn: 5,
                x: 0,
                y:0,
                color: ""
            },
            {
                tag: "E1",
                position: 0,
                spawn: 5,
                color: "",
                x: 0,
                y:0
            },
            {
                tag: "E2",
                position: 0,
                spawn: 6,
                x: 0,
                y:0,
                color: ""
            },
            {
                tag: "E3",
                position: 0,
                spawn: 6,
                color: "",
                x: 0,
                y:0
            },
            {
                tag: "E4",
                position: 0,
                spawn: 7,
                color: "",
                x: 0,
                y:0
            },
            {
                tag: "E5",
                position: 0,
                spawn: 7,
                color: "",
                x: 0,
                y:0
            },
            {
                tag: "E6",
                position: 0,
                spawn: 8,
                color: "",
                x: 0,
                y:0
            },
            {
                tag: "E7",
                position: 0,
                spawn: 8,
                color: "",
                x: 0,
                y:0
            },
        ]

        this.endArrowsPointsPlots = [
            {
                position:0,
                endX : 600,
                endY: 300
            },
            {
                position:1,
                endX : 600,
                endY: 750
            },
            {
                position:2,
                endX : 1350,
                endY: 300
            },
            {
                position:3,
                endX : 1350,
                endY: 750
            },
            {
                position:4,
                endX : 960,
                endY: 540
            },
            {
                position:5,
                endX : 600,
                endY: 300
            },
            {
                position:6,
                endX : 600,
                endY: 750
            },
            {
                position:7,
                endX : 1350,
                endY: 300
            },
            {
                position:8,
                endX : 1350,
                endY: 750
            },
        ]

        this.plotAndCamp = [];

        this.currentTour = [];

        return gameInstance
    }

    static getInstance() {
        return new GameInstance()
    }


    getPositionByTag(tag) {
        return this.unities.find((el) => el.tag == String(tag)).position;
    }

    getSpawnByTag(tag) {
        return this.unities.find((el) => el.tag == String(tag)).spwan;
    }


    changePositionOfTag(tag, position,x,y) {
        console.log("CHANGE POSITION : " + position + " AND TAG " + position)
        if (tag != undefined) {
            let unity = this.unities.find((el) => el.tag == String(tag));
            if (position != undefined && unity != undefined)
                unity.position = position;
                unity.x=x;unity.y=y;
        }
    }

    setCurrentTour(tour) {
        this.currentTour = tour;
    }

    removePlayerPlayed() {
        this.currentTour.splice(0, 1);
    }

    getCurrentPlayer() {
        return this.unities.find((el) => el.tag == this.currentTour[0].tag);
    }

    getPlotOrCamp(position) {
        return this.plotAndCamp[position];
    }

    getEndArrowsPointsPlot(endArrowsPointsPlotsPositions){
        this.unities.forEach(item =>{
            if(item.spawn==this.getCurrentPlayer().spawn){
                endArrowsPointsPlotsPositions = this.removeA(endArrowsPointsPlotsPositions,item.position);
            }
        });

        let endArrowsPoints = [];
        endArrowsPointsPlotsPositions.forEach(item => endArrowsPoints.push(this.endArrowsPointsPlots[item]));
        return endArrowsPoints;
    }

    removeA(arr) {
        let what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax= arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }
}

export default GameInstance
