package org.polytech.si5.betConqueror.components.buisness;

import org.polytech.si5.betConqueror.models.Player;
import org.polytech.si5.betConqueror.models.Territory;
import org.polytech.si5.betConqueror.models.Unity;

import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.UUID;

public class War {

    private String id;
    private Map<Unity,Integer> betPlayers;

    private Territory territory;

    public War(List<Unity> unities, Territory territory) {
        this.id = UUID.randomUUID().toString();
        this.betPlayers = new HashMap<>();
        for (Unity unity : unities ) {
            this.betPlayers.put(unity, -1);
        }
        this.territory = territory;
    }


    public void setBetToAPlayer(Unity unity, Integer amount){
        if (this.betPlayers.containsKey(unity))
            this.betPlayers.put(unity, amount);
    }

    public Map<Unity, Integer> getBetPlayers() {
        return betPlayers;
    }

    public Territory getTerritory() {
        return territory;
    }

    public String getId() {
        return id;
    }

    @Override
    public String toString() {
        return "War{" +
                "betPlayers=" + betPlayers +
                ", territory=" + territory +
                '}';
    }
}
