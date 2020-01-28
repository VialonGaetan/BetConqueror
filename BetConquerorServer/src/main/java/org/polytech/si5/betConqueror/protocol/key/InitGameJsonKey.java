package org.polytech.si5.betConqueror.protocol.key;

public enum InitGameJsonKey {
    RESPONSE("response"),
    RACE("race"),
    RACES("races"),
    AVAILABLE("available"),
    NAME("name"),
    COLOR("color"),
    PLAYER_ID("playerID"),
    ;


    public final String key;

    InitGameJsonKey(String key) {
        this.key = key;
    }
}
