package org.polytech.si5.betConqueror.protocol.init;

import com.google.gson.JsonObject;
import org.polytech.si5.betConqueror.components.buisness.Game;
import org.polytech.si5.betConqueror.models.LobbyPlayer;
import org.polytech.si5.betConqueror.protocol.EventProtocol;
import org.polytech.si5.betConqueror.protocol.key.InitGameJsonKey;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;
import java.util.logging.Logger;

public class ChooseNameEvent implements EventProtocol {

    private final Logger logger = Logger.getLogger(ChooseRaceEvent.class.getName());
    private Map<String, ?> request;
    private WebSocketSession session;
    private Game game;

    public ChooseNameEvent(WebSocketSession session, Map<String, ?> request) {
        this.request = request;
        this.session = session;
        this.game = Game.getInstance();
    }
    @Override
    public void processEvent() {
        game.addLobbyPlayer(new LobbyPlayer(String.valueOf(request.get(InitGameJsonKey.USERNAME.key)),session));
        generateResponse();
        new JoinGameEvent(session).processEvent();
    }

    private JsonObject generateResponse(){
        JsonObject response = new JsonObject();
        response.addProperty(InitGameJsonKey.RESPONSE.key, "OK");
        response.addProperty(InitGameJsonKey.USERNAME.key, String.valueOf(request.get(InitGameJsonKey.USERNAME.key)));

        return response;
    }
}
