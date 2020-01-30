package org.polytech.si5.betConqueror.components.buisness;

import com.fasterxml.jackson.annotation.JsonIgnore;
import org.polytech.si5.betConqueror.models.LobbyPlayer;
import org.polytech.si5.betConqueror.models.Player;
import org.polytech.si5.betConqueror.models.Race;
import org.polytech.si5.betConqueror.models.Territory;
import org.springframework.web.socket.WebSocketSession;

import java.util.*;

public class Game {


    private static Game INSTANCE = new Game();

    public static Game getInstance() {
        return INSTANCE;
    }


    private List<Player> playerList;
    private Optional<WebSocketSession> table;
    private List<Territory> territories;
    private List<Round> rounds;


    private Game() {
        this.initGame();
        this.rounds = new ArrayList<>();

    }


    public List<Player> getPlayerList() {
        return playerList;
    }

    public List<LobbyPlayer> getLobbyPlayerList() {
        return lobbyPlayerList;
    }

    public void addLobbyPlayer(LobbyPlayer lobbyPlayer){
        lobbyPlayerList.add(lobbyPlayer);
    }

    public List<Round> getRounds() {
        return rounds;
    }


    @JsonIgnore
    public Round getCurrentRound(){
        return rounds.get(rounds.size()-1);
    }

    public boolean addRounds(Round round){
        return this.rounds.add(round);
    }

    public List<LobbyPlayer> lobbyPlayerList;

    private void initGame(){
        this.table = Optional.empty();
        this.playerList = new ArrayList<>();
        this.lobbyPlayerList = new ArrayList<>();
        playerList.add(new Player(Race.FRANCAIS));
        playerList.add(new Player(Race.ESPAGNOL));
        playerList.add(new Player(Race.MAYA));
        playerList.add(new Player(Race.OLMEQUES));


        this.territories = new ArrayList<>();
        this.territories.add(new Territory(0));
        this.territories.add(new Territory(1));
        this.territories.add(new Territory(2));
        this.territories.add(new Territory(3));
        this.territories.add(new Territory(4));
    }

    public Optional<WebSocketSession> getTable() {
        return table;
    }

    public void setTable(WebSocketSession table) {
        this.table = Optional.of(table);
    }


}
