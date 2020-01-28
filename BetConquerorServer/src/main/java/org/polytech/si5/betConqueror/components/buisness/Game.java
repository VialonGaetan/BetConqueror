package org.polytech.si5.betConqueror.components.buisness;

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


    private Game() {
        this.initGame();

    }


    public List<Player> getPlayerList() {
        return playerList;
    }

    public List<WebSocketSession> getLobbyPlayerList() {
        return lobbyPlayerList;
    }

    public void addLobbyPlayer(WebSocketSession session){
        lobbyPlayerList.add(session);
    }


    public List<WebSocketSession> lobbyPlayerList;

    private void initGame(){
        table = Optional.empty();
        this.playerList = new ArrayList<>();
        this.lobbyPlayerList = new ArrayList<>();
        playerList.add(new Player(Race.FRANCAIS));
        playerList.add(new Player(Race.ESPAGNOL));
        playerList.add(new Player(Race.MAYA));
        playerList.add(new Player(Race.OLMEQUES));


        this.territories = new ArrayList<>();
        this.territories.add(new Territory(0));
    }

    public Optional<WebSocketSession> getTable() {
        return table;
    }

    public void setTable(WebSocketSession table) {
        this.table = Optional.of(table);
    }
}
