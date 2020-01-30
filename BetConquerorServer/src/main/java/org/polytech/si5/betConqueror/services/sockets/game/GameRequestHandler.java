package org.polytech.si5.betConqueror.services.sockets.game;

import org.polytech.si5.betConqueror.exceptions.InvalidRequestException;
import org.polytech.si5.betConqueror.protocol.EventProtocol;
import org.polytech.si5.betConqueror.protocol.InvalidEvent;
import org.polytech.si5.betConqueror.protocol.game.MoveUnityEvent;
import org.polytech.si5.betConqueror.protocol.init.ChooseRaceEvent;
import org.polytech.si5.betConqueror.protocol.init.ConnectTableEvent;
import org.polytech.si5.betConqueror.protocol.init.JoinGameEvent;
import org.polytech.si5.betConqueror.services.sockets.RequestHandler;
import org.springframework.stereotype.Service;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;

@Service
public class GameRequestHandler implements RequestHandler {
    @Override
    public void handleRequest(WebSocketSession session, Map request) throws InvalidRequestException {

        EventProtocol event;
        if(!request.containsKey("request")) {
            throw new InvalidRequestException();
        }
        String requestName = String.valueOf(request.get("request"));
        System.out.println(requestName);

        switch(requestName){
            case "JOIN_GAME" :
                event = new JoinGameEvent(session,request);
                break;
            case "CHOOSE_ROLE" :
                event = new ChooseRaceEvent(session,request);
                break;
            case "TABLE" :
                event = new ConnectTableEvent(session);
                break;
            case "MOVE":
                event= new MoveUnityEvent(session, request);
                break;
            default:
                event = new InvalidEvent(session);
                break;
        }
        event.processEvent();

    }
}
