package org.polytech.si5.betConqueror.protocol.key;

public enum GameJsonKey {
    RESPONSE("response"),
    ORDER("order"),
    TAG("tag"),
    WARS("wars"),
    WAR_ID("warId"),
    TERRITORY_ID("territoryId"),
    PLAYERS("players"),
    NAME("name"),
    UNITY("unity"),
    USERNAME("username"),
    USER_ID("userId"),

    AMOUNT("amount");


    public final String key;

    GameJsonKey(String key) {
        this.key = key;
    }
}
