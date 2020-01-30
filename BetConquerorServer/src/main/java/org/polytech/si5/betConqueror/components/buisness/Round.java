package org.polytech.si5.betConqueror.components.buisness;

import org.polytech.si5.betConqueror.models.Player;
import org.polytech.si5.betConqueror.models.Unity;

import java.util.*;

public class Round {

    private int number;

    private Map<Unity, Boolean> orderPlayersAndPlayed;

    public Round(int number, Set<Unity> orderPlayers) {
        this.number = number;
        this.orderPlayersAndPlayed = new LinkedHashMap<>();
        for (Unity unity: orderPlayers) {
            this.orderPlayersAndPlayed.put(unity,false);
        }

    }


    public int getNumber() {
        return number;
    }

    public Map<Unity, Boolean> getOrderPlayersAndPlayed() {
        return orderPlayersAndPlayed;
    }

    public Set<Unity> getOrderPlayers(){
        return orderPlayersAndPlayed.keySet();
    }
}
