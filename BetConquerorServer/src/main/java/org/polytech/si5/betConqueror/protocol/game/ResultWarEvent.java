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

import java.util.Collections;
import java.util.Comparator;
import java.util.Map;

public class ResultWarEvent implements EventProtocol {

    private Game game;
    private Round round;

    public ResultWarEvent() {
        this.game = Game.getInstance();
        this.round = game.getCurrentRound();
    }

    @Override
    public void processEvent() {

        for (War war : round.getWars()) {
            if (!war.getBetPlayers().isEmpty())
                war.getTerritory().setOwner(Collections.max(war.getBetPlayers().entrySet(), Comparator.comparingInt(Map.Entry::getValue)).getKey());
        }

       game.getPlayerList().stream().forEach(player -> player.getSession().ifPresent(
               session -> new Messenger(session).sendSpecificMessageToAUser(generateWarResultMessage(player).getAsString())));


       game.getTable().ifPresent(session ->
               new Messenger(session).sendSpecificMessageToAUser(generateWarResultMessageForTable().getAsString()));
       new StartRoundEvent().processEvent();
    }

    private JsonObject generateWarResultMessageForTable() {
        JsonObject response = new JsonObject();
        response.addProperty(GameJsonKey.RESPONSE.key,"WAR_RESULT");

        JsonArray warsResult = new JsonArray();
        for(War war : round.getWars()) {
            warsResult.add(generatePlayerInThisWarArray(war));
        }
        return response;
    }

    private JsonObject generateWarResultMessage(Player player) {
        JsonObject response = new JsonObject();
        response.addProperty(GameJsonKey.RESPONSE.key,"WAR_RESULT");

        JsonArray warsResultForThisPlayer = new JsonArray();
        for(War war : round.getWars()) {
            if (player.getRace().getTags().stream().anyMatch(unity -> war.getBetPlayers().containsKey(unity))) {


                warsResultForThisPlayer.add(generatePlayerInThisWarArray(war));
            } else
                continue;
        }
        response.addProperty(GameJsonKey.RESULT.key, warsResultForThisPlayer.toString());
        return response;
    }

    private JsonObject generatePlayerInThisWarArray(War war){
        JsonObject warPresent = new JsonObject();
        warPresent.addProperty(GameJsonKey.WAR_ID.key, war.getId());
        if (war.getTerritory().getOwner().isPresent()){
            JsonObject winnerObject = new JsonObject();
            winnerObject.addProperty(GameJsonKey.UNITY.key, game.getPlayerByUnity(war.getTerritory().getOwner().get()).getRace().getTags().get(0).getTag());
            winnerObject.addProperty(GameJsonKey.USERNAME.key, game.getPlayerByUnity(war.getTerritory().getOwner().get()).getName());

            warPresent.addProperty(GameJsonKey.WINNER.key, winnerObject.toString());
        }else{
            warPresent.addProperty(GameJsonKey.WINNER.key, "NONE");
        }
        JsonArray playerInThisWarJsonArray = new JsonArray();
        for (Unity playerInThisWar : war.getBetPlayers().keySet()) {
            JsonObject playerInThisWarJsonObject = new JsonObject();
            playerInThisWarJsonObject.addProperty(GameJsonKey.USERNAME.key, playerInThisWar.getTag());
            playerInThisWarJsonObject.addProperty(GameJsonKey.AMOUNT.key, war.getBetPlayers().get(playerInThisWar));
            playerInThisWarJsonArray.add(playerInThisWarJsonObject);
        }
        warPresent.add(GameJsonKey.PLAYERS.key,playerInThisWarJsonArray );
        warPresent.addProperty(GameJsonKey.TERRITORY_ID.key, war.getTerritory().getId());
        return warPresent;
    }
}
