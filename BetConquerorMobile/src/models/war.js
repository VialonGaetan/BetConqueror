export default class War {
  winner;
  winningBet;
  losers;
  tour;
  constructor(id, players, zoneId) {
    this.id = id;
    this.players = players;
    this.zoneId = zoneId;
    this.hasBet = false;
  }
}
