package org.polytech.si5.betConqueror.models;

import org.springframework.web.socket.WebSocketSession;

import java.util.Objects;
import java.util.Optional;
import java.util.UUID;

public class Player {

    private String id;
    private Race race;
    private Optional<WebSocketSession> session;
    private String name;

    public Player(Race race) {
        this.id = UUID.randomUUID().toString();
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

    public void removeSession() {
        this.session = Optional.empty();
    }


    public String getName() {
        return name;
    }

    public void setName(String name) {
        this.name = name;
    }

    public void setSession(WebSocketSession session) {
        this.session = Optional.of(session);
        this.id = session.getId();
    }

    public String getId() {
        return id;
    }

    @Override
    public boolean equals(Object o) {
        if (this == o) return true;
        if (o == null || getClass() != o.getClass()) return false;
        Player player = (Player) o;
        return Objects.equals(id, player.id);
    }

    @Override
    public int hashCode() {
        return Objects.hash(id);
    }

    @Override
    public String toString() {
        return "Player{" +
                "race=" + race +
                ", name='" + name + '\'' +
                '}';
    }
}
