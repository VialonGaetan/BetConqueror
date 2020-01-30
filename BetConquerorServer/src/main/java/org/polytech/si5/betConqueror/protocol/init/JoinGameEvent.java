package org.polytech.si5.betConqueror.protocol.init;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.polytech.si5.betConqueror.components.buisness.Game;
import org.polytech.si5.betConqueror.components.buisness.Messenger;
import org.polytech.si5.betConqueror.models.Player;
import org.polytech.si5.betConqueror.models.Race;
import org.polytech.si5.betConqueror.protocol.EventProtocol;
import org.polytech.si5.betConqueror.protocol.key.InitGameJsonKey;
import org.springframework.web.socket.WebSocketSession;


import java.util.Map;
import java.util.logging.Logger;

public class JoinGameEvent implements EventProtocol {

    private final Logger logger = Logger.getLogger(JoinGameEvent.class.getName());
    private WebSocketSession session;
    private Game game;

    public JoinGameEvent(WebSocketSession session) {
        this.session = session;
        this.game = Game.getInstance();
    }

    @Override
    public void processEvent() {
        logger.info("New Player mobile has join the game");
        Messenger messenger = new Messenger(session);
        System.out.println(game.getPlayerList().toString());
        if (game.getPlayerList().stream().allMatch(player -> player.getSession().isPresent())){
            messenger.sendError("FULL");
            return;
        }else{
            messenger.sendSpecificMessageToAUser(generateAnswer().toString());
        }
    }

    private JsonObject generateAnswer(){
        JsonObject response = new JsonObject();
        response.addProperty(InitGameJsonKey.RESPONSE.key, "JOIN_GAME");
        JsonArray races = new JsonArray();
        for (Player player: game.getPlayerList()) {
            JsonObject raceJSON = new JsonObject();
            raceJSON.addProperty(InitGameJsonKey.AVAILABLE.key, !player.getSession().isPresent());
            raceJSON.addProperty(InitGameJsonKey.NAME.key, player.getRace().getName());
            raceJSON.addProperty(InitGameJsonKey.COLOR.key, player.getRace().getColor().toString());
            raceJSON.addProperty(InitGameJsonKey.PLAYER_ID.key, player.getSession().isPresent() ? player.getSession().get().getId() : "");
            raceJSON.addProperty(InitGameJsonKey.USERNAME.key, player.getName());


            races.add(raceJSON);
        }
        response.add(InitGameJsonKey.RACES.key, races);
        response.addProperty(InitGameJsonKey.PLAYER_ID.key, session.getId());

        return response;
    }
}
