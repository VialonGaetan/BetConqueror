package org.polytech.si5.betConqueror.models;

import org.springframework.web.socket.WebSocketSession;

import java.util.Optional;

public class Player {

    private Race race;
    private Optional<WebSocketSession> session;
    private String name;

    public Player(Race race) {
        this.race = race;
        this.name = new String();
        this.session = Optional.empty();
    }


    public Race getRace() {
        return race;
    }

    public Optional<WebSocketSession> getSession() {
        return session;
    }

    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSession(WebSocketSession session) {
        this.session = Optional.of(session);
    }
}
