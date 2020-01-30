package org.polytech.si5.betConqueror.components.buisness;

import org.polytech.si5.betConqueror.models.Player;
import org.polytech.si5.betConqueror.models.Unity;

import java.util.*;

public class Round {

    private int number;

    private SortedMap<Unity, Boolean> orderPlayersAndPlayed;

    public Round(int number, SortedSet<Unity> orderPlayers) {
        this.number = number;
        this.orderPlayersAndPlayed = new TreeMap<>();
        for (Unity unity: orderPlayers) {
            this.orderPlayersAndPlayed.put(unity,false);
        }

    }


    public int getNumber() {
        return number;
    }

    public SortedMap<Unity, Boolean> getOrderPlayersAndPlayed() {
        return orderPlayersAndPlayed;
    }

    public SortedSet<Unity> getOrderPlayers(){
        return new TreeSet(orderPlayersAndPlayed.keySet());
    }
}
