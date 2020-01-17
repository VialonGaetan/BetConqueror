package org.polytech.si5.betConqueror.services.sockets;

import org.springframework.web.socket.WebSocketSession;

import java.util.Map;

public interface RequestHandler {

    void handleRequest(WebSocketSession session, Map request);
}
