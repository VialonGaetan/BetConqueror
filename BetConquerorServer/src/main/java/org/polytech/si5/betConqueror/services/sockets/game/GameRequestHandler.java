package org.polytech.si5.betConqueror.services.sockets.game;

import org.polytech.si5.betConqueror.services.sockets.RequestHandler;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;

@Service
public class GameRequestHandler implements RequestHandler {
    @Override
    public void handleRequest(WebSocketSession session, Map request) {

    }
}
