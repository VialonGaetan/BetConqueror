package org.polytech.si5.betConqueror.models;

import org.springframework.web.socket.WebSocketSession;

public class LobbyPlayer {
    private String name;
    private WebSocketSession session;
    public LobbyPlayer(String name, WebSocketSession session){
        this.session = session;
        this.name = name;
    }

    public String getName() {
        return name;
    }

    public WebSocketSession getSession() {
        return session;
    }
}
