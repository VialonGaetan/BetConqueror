export default class Zone {
  wars;
  id;
  name;
  constructor(obj) {
    obj && Object.assign(this, obj);
  }

  getOwner() {
    return this.wars[this.wars.length - 1].winner;
  }

  getWonTwice() {
    let players = [];

    let winners = [];
    this.wars.forEach(war => {
      winners.push(war.winner);
    });

    for (i = 0; i < winners.length; i++) {
      for (j = 0; j < winners.length; j++) {
        if (j != i && winners[i].username === winners[j].username) {
          if (
            !players.find(player => player.username === winners[i].username)
          ) {
            players.push(winners[i]);
          }
        }
      }
    }
    return players;
  }

  getWonOnce() {
    let winners = [];
    this.wars.forEach(war => {
      winners.push(war.winner);
    });
    let players = Object.assign([], winners);

    for (i = 0; i < winners.length; i++) {
      for (j = 0; j < winners.length; j++) {
        if (j != i && winners[i].username === winners[j].username) {
          players.splice(i, 1);
          players.splice(j, 1);
        }
      }
    }
    return players;
  }
}
