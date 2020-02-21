package org.polytech.si5.betConqueror.models;

import java.util.Arrays;
import java.util.List;

public enum Race {
/*
    FRANCAIS("Francais",ColorRace.BLUE, new Unity[]{new Unity("E0"),new Unity("E1")}),
    MAYA("Maya",ColorRace.GREEN,new Unity[]{new Unity("E4"), new Unity("E5")}),
    OLMEQUES("Olmeques", ColorRace.YELLOW,new Unity[]{new Unity("E2"), new Unity("E3")}),
    ESPAGNOL("Espagnol",ColorRace.RED,new Unity[]{new Unity("E6"),new Unity( "E7")});
   */
    FRANCAIS("Francais",ColorRace.BLUE, new Unity[]{new Unity("0"),new Unity("1")}),
    MAYA("Maya",ColorRace.GREEN,new Unity[]{new Unity("2"), new Unity("3")}),
    OLMEQUES("Olmeques", ColorRace.YELLOW,new Unity[]{new Unity("4"), new Unity("5")}),
    ESPAGNOL("Espagnol",ColorRace.RED,new Unity[]{new Unity("6"),new Unity( "7")});

    private final Unity[] tags;
    private final ColorRace color;
    private final String name;

    public static int numberOfUnity(){
        return 2;
    }

    Race(String name,ColorRace color, Unity... tags) {
        this.name = name;
        this.tags = tags;
        this.color = color;
    }

    public static Race getRaceFromName(String name){
        switch (name){
            case "Espagnol":
                return ESPAGNOL;
            case "Maya":
                return MAYA;
            case "Olmeques":
                return OLMEQUES;
            default:
                return FRANCAIS;

        }
    }

    public static Race getRaceFromName(Unity unity){
        for (Race race: Race.values() ) {
            if (race.getTags().contains(unity))
                return race;
        }
        return null;
    }

    public List<Unity> getTags() {
        return Arrays.asList(tags);
    }

    public ColorRace getColor() {
        return color;
    }

    public String getName() {
        return name;
    }


}
