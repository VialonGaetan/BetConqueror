


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
                position: 5
            },
            {
                tag: "E1",
                position: 5
            },
            {
                tag: "E2",
                position: 6
            },
            {
                tag: "E3",
                position: 6
            },
            {
                tag: "E4",
                position: 7
            },
            {
                tag: "E5",
                position: 7
            },
            {
                tag: "E6",
                position: 8
            },
            {
                tag: "E7",
                position: 8
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
        this.currentTour.splice(0, 1);
    }

    getCurrentPlayer() {
        return this.currentTour[0];
    }

    getPlotOrCamp(position) {
        return this.plotAndCamp[position];
    }
}

export default GameInstance
