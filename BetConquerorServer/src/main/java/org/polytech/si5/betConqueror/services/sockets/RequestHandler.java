package org.polytech.si5.betConqueror.services.sockets;

import org.polytech.si5.betConqueror.exceptions.InvalidRequestException;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;

public interface RequestHandler {

    void handleRequest(WebSocketSession session, Map request) throws InvalidRequestException;
}
