package org.polytech.si5.betConqueror.components.buisness;

import org.polytech.si5.betConqueror.models.Territory;
import org.polytech.si5.betConqueror.models.Unity;

import java.util.*;

public class Round {

    private int number;

    private Map<Unity, Boolean> orderPlayersAndPlayed;
    private List<Territory> territories;

    private List<War> wars;

    public Round(int number, Set<Unity> orderPlayers, List<Territory> territories) {
        this.number = number;
        this.orderPlayersAndPlayed = new LinkedHashMap<>();
        for (Unity unity: orderPlayers) {
            this.orderPlayersAndPlayed.put(unity,false);
        }
        this.territories = new ArrayList<>();
        for (Territory territory: territories) {
            this.territories.add(new Territory(territory.getId(),territory.getOwner()));
        }
        this.wars = new ArrayList<>();

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

    public List<War> getWars() {
        return wars;
    }

    public void setPlayerHasPlayed(Unity unity){
        if(orderPlayersAndPlayed.containsKey(unity))
            orderPlayersAndPlayed.put(unity, true);
    }

    public List<Territory> getTerritories() {
        return territories;
    }

    public void generateWar(){
        for (Territory territory: this.territories ) {
            if (territory.getUnitiesPresent().size() == 1){
                this.wars.add(new War(territory.getUnitiesPresent().get(0),territory));
            }
            else{

                this.wars.add(new War(territory.getUnitiesPresent(),territory));
            }
        }
    }
}
