


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
                spawn: 5
            },
            {
                tag: "E1",
                position: 0,
                spawn: 5
            },
            {
                tag: "E2",
                position: 0,
                spawn: 6
            },
            {
                tag: "E3",
                position: 0,
                spawn: 6
            },
            {
                tag: "E4",
                position: 0,
                spawn: 7
            },
            {
                tag: "E5",
                position: 0,
                spawn: 7
            },
            {
                tag: "E6",
                position: 0,
                spawn: 8
            },
            {
                tag: "E7",
                position: 0,
                spawn: 8
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


    changePositionOfTag(tag, position) {
        console.log("CHANGE POSITION : " + position + " AND TAG " + position)
        if (tag != undefined) {
            let unity = this.unities.find((el) => el.tag == String(tag));
            if (position != undefined && unity != undefined)
                unity.position = position;

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
}

export default GameInstance
