package org.polytech.si5.betConqueror.protocol.key;

public enum GameJsonKey {
    RESPONSE("response"),
    ORDER("order"),
    TAG("tag"),
    TERRITORY_ID("territoryId"),
    PLAYERS("players"),
    NAME("name"),
    UNITY("unity"),
    PLAYER_ID("playerID");


    public final String key;

    GameJsonKey(String key) {
        this.key = key;
    }
}
