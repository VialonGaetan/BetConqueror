package org.polytech.si5.betConqueror.protocol.game;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.polytech.si5.betConqueror.components.buisness.Game;
import org.polytech.si5.betConqueror.components.buisness.Messenger;
import org.polytech.si5.betConqueror.components.buisness.Round;
import org.polytech.si5.betConqueror.components.buisness.War;
import org.polytech.si5.betConqueror.models.Player;
import org.polytech.si5.betConqueror.models.Unity;
import org.polytech.si5.betConqueror.protocol.EventProtocol;
import org.polytech.si5.betConqueror.protocol.key.GameJsonKey;

import java.util.logging.Logger;

public class StartWarEvent implements EventProtocol {

    private final Logger logger = Logger.getLogger(StartWarEvent.class.getName());
    private Game game;

    public StartWarEvent() {
        this.game = Game.getInstance();
    }

    @Override
    public void processEvent() {
        Round round = game.getCurrentRound();

        round.generateWar();

        game.getTable().ifPresent(session -> new Messenger(session).sendSpecificMessageToAUser(informWarsStart().toString()));
        game.getPlayerList().stream()
                .forEach(player -> player.getSession()
                        .ifPresent(session -> new Messenger(session).sendSpecificMessageToAUser(generateWarResponse(player, round).toString())));



    }


    private JsonObject informWarsStart(){
        JsonObject response = new JsonObject();
        response.addProperty(GameJsonKey.RESPONSE.key, "START_WARS");
        return response;
    }

    private JsonObject generateWarResponse(Player player, Round round) {
        JsonObject response = new JsonObject();

        response.addProperty(GameJsonKey.RESPONSE.key, "START_WARS");

        JsonArray warsForThisPlayer = new JsonArray();

        for(War war : round.getWars()) {
            if (player.getRace().getTags().stream().anyMatch(unity -> war.getBetPlayers().containsKey(unity))) {
                JsonObject warPresent = new JsonObject();
                warPresent.addProperty(GameJsonKey.WAR_ID.key, war.getId());
                JsonArray playerInThisWarJsonArray = new JsonArray();
                for (Unity playerInThisWar : war.getBetPlayers().keySet()) {
                    JsonObject playerInThisWarJsonObject = new JsonObject();
                    playerInThisWarJsonObject.addProperty(GameJsonKey.USERNAME.key, playerInThisWar.getTag());
                    playerInThisWarJsonArray.add(playerInThisWarJsonObject);
                }
                warPresent.add(GameJsonKey.PLAYERS.key, playerInThisWarJsonArray);
                warPresent.addProperty(GameJsonKey.TERRITORY_ID.key, war.getTerritory().getId());

                warsForThisPlayer.add(warPresent);
            } else
                continue;
        }
        response.add(GameJsonKey.WARS.key, warsForThisPlayer);

        return response;

    }


}
