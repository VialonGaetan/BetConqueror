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

        for (Player player : game.getPlayerList() ) {
            player.addNumberOfPiece(10);
        }

        for (War war : round.getWars()) {
            if (!war.getBetPlayers().isEmpty()){
                Map.Entry<Unity, Integer> maxBet = Collections.max(war.getBetPlayers().entrySet(), Comparator.comparingInt(Map.Entry::getValue));
                war.getTerritory().setOwner(maxBet.getKey());
                war.getTerritory().getUnitiesPresent().forEach(unity -> {
                    if (unity.equals(maxBet.getKey()))
                        return;
                    else if(war.getTerritory().getUnitiesPresent().size() > 1){
                        int amountGiveToLoser = maxBet.getValue() / (war.getTerritory().getUnitiesPresent().size() - 1);
                        game.getPlayerByUnity(unity).addNumberOfPiece(amountGiveToLoser);
                    }



                });

            }
        }

       game.getPlayerList().stream().forEach(player -> player.getSession().ifPresent(
               session -> new Messenger(session).sendSpecificMessageToAUser(generateWarResultMessage(player).toString())));


       game.getTable().ifPresent(session ->
               new Messenger(session).sendSpecificMessageToAUser(generateWarResultMessageForTable().toString()));

       if(gameIsFinish()){
           new EndGameEvent().processEvent();
           return;
       }
    }

    private boolean gameIsFinish(){
        return round.getNumber() == 1;
    }


    private JsonObject generateWarResultMessageForTable() {
        JsonObject response = new JsonObject();
        response.addProperty(GameJsonKey.RESPONSE.key,"WAR_RESULT");

        JsonArray warsResult = new JsonArray();
        for(War war : round.getWars()) {
            warsResult.add(generatePlayerInThisWarArray(war));
        }
        response.add(GameJsonKey.RESULT.key, warsResult);
        return response;
    }

    private JsonObject generateWarResultMessage(Player player) {
        JsonObject response = new JsonObject();
        response.addProperty(GameJsonKey.RESPONSE.key,"WAR_RESULT");
        response.addProperty(GameJsonKey.MONEY.key, player.getNumberOfPiece());

        JsonArray warsResultForThisPlayer = new JsonArray();
        for(War war : round.getWars()) {
            if (player.getRace().getTags().stream().anyMatch(unity -> war.getBetPlayers().containsKey(unity))) {


                warsResultForThisPlayer.add(generatePlayerInThisWarArray(war));
            } else
                continue;
        }
        response.add(GameJsonKey.RESULT.key, warsResultForThisPlayer);
        return response;
    }

    private JsonObject generatePlayerInThisWarArray(War war){
        JsonObject warPresent = new JsonObject();
        warPresent.addProperty(GameJsonKey.WAR_ID.key, war.getId());
        if (war.getTerritory().getOwner().isPresent()){
            JsonObject winnerObject = new JsonObject();
            winnerObject.addProperty(GameJsonKey.UNITY.key, war.getTerritory().getOwner().get().getTag());
            winnerObject.addProperty(GameJsonKey.USERNAME.key, game.getPlayerByUnity(war.getTerritory().getOwner().get()).getName());

            warPresent.add(GameJsonKey.WINNER.key, winnerObject);
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
