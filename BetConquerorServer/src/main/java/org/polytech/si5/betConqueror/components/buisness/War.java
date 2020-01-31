package org.polytech.si5.betConqueror.components.buisness;

import org.polytech.si5.betConqueror.models.Player;
import org.polytech.si5.betConqueror.models.Territory;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

public class War {

    private Map<Player,Integer> betPlayers;

    private Territory territory;

    public War(List<Player> players, Territory territory) {
        this.betPlayers = new HashMap<>();
        for (Player player : players ) {
            this.betPlayers.put(player, -1);
        }
        this.territory = territory;
    }


    public void setBetToAPlayer(Player player, Integer amount){
        if (this.betPlayers.containsKey(player))
            this.betPlayers.put(player, amount);
    }

    public Map<Player, Integer> getBetPlayers() {
        return betPlayers;
    }

    public Territory getTerritory() {
        return territory;
    }
}
