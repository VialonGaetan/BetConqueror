package org.polytech.si5.betConqueror.models;

import java.util.Arrays;
import java.util.List;

public enum Race {

    FRANCAIS("Francais",ColorRace.BLUE, new String[]{"E0", "E1"}),
    MAYA("Maya",ColorRace.GREEN,new String[]{"E4", "E5"}),
    OLMEQUES("Olmeques", ColorRace.YELLOW,new String[]{"E2", "E3"}),
    ESPAGNOL("Espagnol",ColorRace.RED,new String[]{"E6", "E7"});

    private final String[] tags;
    private final ColorRace color;
    private final String name;

    Race(String name,ColorRace color, String... tags) {
        this.name = name;
        this.tags = tags;
        this.color = color;
    }

    public List<String> getTags() {
        return Arrays.asList(tags);
    }

    public ColorRace getColor() {
        return color;
    }

    public String getName() {
        return name;
    }
}
