package org.polytech.si5.betConqueror.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Optional;

public class Territory {

    private int id;
    private Optional<Unity> owner;
    private List<Unity> unitiesPresent;

    public Territory(int id){
        this.id = id;
        this.owner = Optional.empty();
        this.unitiesPresent = new ArrayList<>();
    }

    public int getId() {
        return id;
    }

    public Optional<Unity> getOwner() {
        return owner;
    }

    public List<Unity> getUnitiesPresent() {
        return unitiesPresent;
    }
}
