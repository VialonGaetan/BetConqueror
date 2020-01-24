package org.polytech.si5.betConqueror.models;

import java.util.Optional;

public class Territory {

    private int id;
    private Optional<Player> owner;

    public Territory(int id){
        this.id = id;
        this.owner = Optional.empty();
    }


}
