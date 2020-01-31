package org.polytech.si5.betConqueror.protocol.game;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.polytech.si5.betConqueror.components.buisness.Game;
import org.polytech.si5.betConqueror.components.buisness.Messenger;
import org.polytech.si5.betConqueror.components.buisness.Round;
import org.polytech.si5.betConqueror.components.buisness.War;
import org.polytech.si5.betConqueror.models.Player;
import org.polytech.si5.betConqueror.protocol.EventProtocol;
import org.polytech.si5.betConqueror.protocol.key.GameJsonKey;

public class StartWarEvent implements EventProtocol {

    private Game game;

    public StartWarEvent() {
        this.game = Game.getInstance();
    }

    @Override
    public void processEvent() {
        Round round = game.getCurrentRound();

        round.generateWar();

        game.getPlayerList().stream()
                .forEach(player -> player.getSession()
                        .ifPresent(session -> new Messenger(session).sendSpecificMessageToAUser(generateWarResponse(player, round).toString())));



    }

    private JsonObject generateWarResponse(Player player, Round round) {
        JsonObject response = new JsonObject();

        response.addProperty(GameJsonKey.RESPONSE.key, "START_WARS");

        JsonArray warsForThisPlayer = new JsonArray();

        for(War war : round.getWars()) {
            if (war.getBetPlayers().containsKey(player)) {
                JsonObject warPresent = new JsonObject();
                warPresent.addProperty(GameJsonKey.WAR_ID.key, war.getId());
                JsonArray playerInThisWarJsonArray = new JsonArray();
                for (Player playerInThisWar : war.getBetPlayers().keySet()) {
                    JsonObject playerInThisWarJsonObject = new JsonObject();
                    playerInThisWarJsonObject.addProperty(GameJsonKey.USERNAME.key, playerInThisWar.getName());
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