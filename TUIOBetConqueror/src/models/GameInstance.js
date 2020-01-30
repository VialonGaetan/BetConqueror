


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
                position: -1
            },
            {
                tag: "E1",
                position: -1
            },
            {
                tag: "E2",
                position: -1
            },
            {
                tag: "E3",
                position: -1
            },
            {
                tag: "E4",
                position: -1
            },
            {
                tag: "E5",
                position: -1
            },
            {
                tag: "E6",
                position: -1
            },
            {
                tag: "E7",
                position: -1
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

    changePositionOfTag(tag, position) {
        this.unities.find((el) => el.tag == String(tag)).position = position;
    }

    setCurrentTour(tour) {
        this.currentTour = tour;
    }

    removePlayerPlayed() {
        this.currentTour.pop();
    }

    getCurrentPlayer() {
        return this.currentTour[0];
    }

    getPlotOrCamp(position) {
        return this.plotAndCamp[position];
    }
}

export default GameInstance
