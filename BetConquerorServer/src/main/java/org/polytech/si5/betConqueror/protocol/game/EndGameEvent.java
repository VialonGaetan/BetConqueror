package org.polytech.si5.betConqueror.protocol.game;

import com.google.gson.JsonObject;
import org.polytech.si5.betConqueror.components.buisness.Game;
import org.polytech.si5.betConqueror.components.buisness.Messenger;
import org.polytech.si5.betConqueror.protocol.EventProtocol;
import org.polytech.si5.betConqueror.protocol.key.GameJsonKey;

public class EndGameEvent implements EventProtocol {

    private Game game;

    public EndGameEvent() {
        this.game = Game.getInstance();
    }

    @Override
    public void processEvent() {
        game.getPlayerList().forEach(player -> player.getSession().ifPresent(session -> new Messenger(session).sendSpecificMessageToAUser(generateGameResult().toString())));
        game.getTable().ifPresent(session -> new Messenger(session).sendSpecificMessageToAUser(generateGameResult().toString()));
    }

    private JsonObject generateGameResult(){
        JsonObject response = new JsonObject();
        response.addProperty(GameJsonKey.RESPONSE.key,"GAME_END");
        return response;
    }
}
