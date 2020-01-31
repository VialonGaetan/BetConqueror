package org.polytech.si5.betConqueror.models;

import java.util.ArrayList;
import java.util.List;
import java.util.Objects;
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

    public Territory(int id, Optional<Unity> owner){
        this.id = id;
        this.owner = owner;
        this.unitiesPresent = new ArrayList<>();
    }

    public int getId() {
        return id;
    }

    public Optional<Unity> getOwner() {
        return owner;
    }

    public void setOwner(Unity owner) {
        this.owner = Optional.of(owner);
    }

    public List<Unity> getUnitiesPresent() {
        return unitiesPresent;
    }

    public void addUnity(Unity unity){
        this.unitiesPresent.add(unity);
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Territory territory = (Territory) o;
        return id == territory.id;
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }
}
