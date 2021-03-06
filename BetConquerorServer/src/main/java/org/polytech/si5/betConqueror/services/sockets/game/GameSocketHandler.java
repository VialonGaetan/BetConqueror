package org.polytech.si5.betConqueror.services.sockets.game;

import com.google.gson.Gson;
import org.polytech.si5.betConqueror.exceptions.InvalidRequestException;
import org.polytech.si5.betConqueror.services.sockets.RequestHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Component;
import org.springframework.web.socket.CloseStatus;
import org.springframework.web.socket.TextMessage;
import org.springframework.web.socket.WebSocketSession;
import org.springframework.web.socket.handler.TextWebSocketHandler;

import java.io.IOException;
import java.util.Map;
import java.util.logging.Logger;

@Component
public class GameSocketHandler extends TextWebSocketHandler {

    private final Logger logger = Logger.getLogger(GameSocketHandler.class.getName());
    private RequestHandler requestHandler;

    @Autowired
    public GameSocketHandler(GameRequestHandler gameRequestHandler) {
        this.requestHandler = gameRequestHandler;
    }

    @Override
    public void handleTextMessage(WebSocketSession session, TextMessage message) throws IOException, InvalidRequestException {
        Map value = new Gson().fromJson(message.getPayload(), Map.class);
        logger.info("Nouveau message de : " + session.getId() + " contenu : " + value.toString());
        requestHandler.handleRequest(session,value);



    }

    @Override
    public void afterConnectionEstablished(WebSocketSession session) throws IOException {
        logger.info("PingSocketHandler : New user on socket with ip : " + session.getRemoteAddress().toString());

    }

    @Override
    public void afterConnectionClosed(WebSocketSession session, CloseStatus status){
        logger.info("PingSocketHandler : Close session on socket with ip : " + session.getRemoteAddress().toString());
    }

}
