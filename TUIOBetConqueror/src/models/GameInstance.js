


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

        return gameInstance
    }

    static getInstance() {
        return new GameInstance()
    }


    getPositionByTag(tag) {
        return this.unities.find((el) =>  el.tag==String(tag)).position;
    }

    changePositionOfTag(tag, position) {        
        this.unities.find((el) =>  el.tag==String(tag)).position = position;
    }



}

export default GameInstance