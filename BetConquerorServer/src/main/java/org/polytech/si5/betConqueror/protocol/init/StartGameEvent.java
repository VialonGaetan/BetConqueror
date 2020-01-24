package org.polytech.si5.betConqueror.protocol.init;

import com.google.gson.JsonObject;
import org.polytech.si5.betConqueror.components.buisness.Game;
import org.polytech.si5.betConqueror.components.buisness.Messenger;
import org.polytech.si5.betConqueror.protocol.EventProtocol;
import org.polytech.si5.betConqueror.protocol.key.InitGameJsonKey;

public class StartGameEvent implements EventProtocol {

    private Game game;
    public StartGameEvent() {
        game = Game.getInstance();
    }

    @Override
    public void processEvent() {
        JsonObject response = generateGameStartResponse();
        game.getPlayerList().forEach(player -> player.getSession().ifPresent(socket -> new Messenger(socket).sendSpecificMessageToAUser(response.toString())));
        game.getTable().ifPresent(session -> new Messenger(session).sendSpecificMessageToAUser(response.toString()));
    }

    public JsonObject generateGameStartResponse(){
        JsonObject response = new JsonObject();
        response.addProperty(InitGameJsonKey.RESPONSE.key, "GAME_START");
        return response;
    }
}
