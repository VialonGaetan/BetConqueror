


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
                faction: "Francais",
                position: 5,
                spawn: 5,
                color: "red",
                x: 0,
                y: 0,
                r: 255,
                g: 0,
                b: 0
            },
            {
                tag: "E1",
                faction: "Francais",
                position: 5,
                spawn: 5,
                color: "red",
                x: 0,
                y: 0,
                r: 255,
                g: 0,
                b: 0
            },
            {
                tag: "E2",
                faction: "Maya",
                position: 6,
                spawn: 6,
                x: 0,
                y: 0,
                color: "yellow",
                r: 255,
                g: 255,
                b: 0
            },
            {
                tag: "E3",
                faction: "Maya",
                position: 6,
                spawn: 6,
                color: "yellow",
                x: 0,
                y: 0,
                r: 255,
                g: 255,
                b: 0
            },
            {
                tag: "E4",
                faction: "Olmeques",
                position: 7,
                spawn: 7,
                color: "green",
                x: 0,
                y: 0,
                r: 51,
                g: 153,
                b: 102
            },
            {
                tag: "E5",
                faction: "Olmeques",
                position: 7,
                spawn: 7,
                color: "green",
                x: 0,
                y: 0,
                r: 0,
                g: 255,
                b: 0
            },
            {
                tag: "E6",
                faction: "Espagnol",
                position: 8,
                spawn: 8,
                color: "blue",
                x: 0,
                y: 0,
                r: 0,
                g: 0,
                b: 255
            },
            {
                tag: "E7",
                faction: "Espagnol",
                position: 8,
                spawn: 8,
                color: "blue",
                x: 0,
                y: 0,
                r: 0,
                g: 0,
                b: 255
            },
        ]

        this.endArrowsPointsPlots = [
            {
                position: 0,
                endX: 600,
                endY: 300
            },
            {
                position: 1,
                endX: 600,
                endY: 750
            },
            {
                position: 2,
                endX: 1350,
                endY: 300
            },
            {
                position: 3,
                endX: 1350,
                endY: 750
            },
            {
                position: 4,
                endX: 960,
                endY: 540
            },
            {
                position: 5,
                endX: 1920 / 2,
                endY: 1080
            },
            {
                position: 6,
                endX: 1920 / 2,
                endY: 0
            },
            {
                position: 7,
                endX: 0,
                endY: 1080 / 2
            },
            {
                position: 8,
                endX: 1920,
                endY: 1080 / 2
            },
        ]

        this.plotAndCamp = [];

        this.currentTour = [];
        this.tourNumber = 0;

        this.currentTourRuturnSpawn = [];
        this.tourNumberRuturnSpawn = 0;
        this.isRuturnSpawn = false;
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


    changePositionOfTag(tag, position, x, y) {
        //console.log("CHANGE POSITION : " + position + " AND TAG " + position)
        if (tag != undefined) {
            let unity = this.unities.find((el) => el.tag == String(tag));
            if (position != undefined && unity != undefined)
                unity.position = position;
            unity.x = x; unity.y = y;
        }
    }

    setCurrentTour(tour) {
        this.currentTour = tour;
        this.tourNumber++;
    }

    setCurrentTourRuturnSpawn(tour) {
        this.currentTourRuturnSpawn = tour;
        this.tourNumberRuturnSpawn++;
        this.isRuturnSpawn=true;
    }
    removePlayerRuturnSpawn(tag) {
        const temp=[];
        this.currentTourRuturnSpawn.forEach(item => {
            if(tag!=item.tag){
                temp.push(item);
            }
        });
    }
    getCurrentTourNumber() {
        return this.tourNumber;
    }

    removePlayerPlayed() {
        this.currentTour.splice(0, 1);
    }

    getCurrentPlayer() {
        if (this.currentTour.length > 0)
            return this.unities.find((el) => el.tag == this.currentTour[0].tag);
        return undefined
        //return this.unities[0];
    }

    getPlotOrCamp(position) {
        //console.log("GET CAMP POSITION : " + position)
        return this.plotAndCamp[position];
    }

    getEndArrowsOfPosition(position) {
        return this.endArrowsPointsPlots.find((el) => el.position == position);
    }

    getEndArrowsPointsPlot(endArrowsPointsPlotsPositions) {
        let endArrowsPointsCopy = [];
        endArrowsPointsPlotsPositions.forEach(item => endArrowsPointsCopy.push(item));
        this.unities.forEach(item => {
            if (item.spawn == this.getCurrentPlayer().spawn) {
                endArrowsPointsCopy = this.removeA(endArrowsPointsCopy, item.position);
            }
        });

        let endArrowsPoints = [];
        endArrowsPointsCopy.forEach(item => endArrowsPoints.push(this.endArrowsPointsPlots[item]));
        return endArrowsPoints;
    }

    removeA(arr) {
        let what, a = arguments, L = a.length, ax;
        while (L > 1 && arr.length) {
            what = a[--L];
            while ((ax = arr.indexOf(what)) !== -1) {
                arr.splice(ax, 1);
            }
        }
        return arr;
    }
}

export default GameInstance
