export default class War {
  winner;
  winningBet;
  losers;
  constructor(id, players, zoneName) {
    this.id = id;
    this.players = players;
    this.zoneName = zoneName;
    this.hasBet = false;
  }
}
