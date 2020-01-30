package org.polytech.si5.betConqueror.protocol.game;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.polytech.si5.betConqueror.components.buisness.Game;
import org.polytech.si5.betConqueror.components.buisness.Messenger;
import org.polytech.si5.betConqueror.components.buisness.Round;
import org.polytech.si5.betConqueror.models.Race;
import org.polytech.si5.betConqueror.models.Unity;
import org.polytech.si5.betConqueror.protocol.EventProtocol;
import org.polytech.si5.betConqueror.protocol.key.GameJsonKey;

import java.util.Comparator;
import java.util.Iterator;
import java.util.SortedSet;
import java.util.TreeSet;

public class StartRoundEvent implements EventProtocol {

    private Game game;

    public StartRoundEvent() {
        this.game = Game.getInstance();
    }

    @Override
    public void processEvent() {

        boolean firstRoundBoolean = !game.getRounds().stream().mapToInt(Round::getNumber).max().isPresent();
        Round newRound;
        if (firstRoundBoolean){
            SortedSet<Unity> unities = new TreeSet<>();
            for (int i = 0; i < game.getPlayerList().size() * Race.numberOfUnity(); i++) {
                unities.add(game.getPlayerList().get((i % game.getPlayerList().size())).getRace().getTags().get(i > 3 ? 1 : 0));
            }
            newRound = new Round(0,unities);

        }else{
            Round lastRound = game.getRounds().get(game.getRounds().stream().mapToInt(Round::getNumber).max().getAsInt());
            SortedSet<Unity> newOrderPlayer = new TreeSet<>(lastRound.getOrderPlayers());
            Unity firstUnity = lastRound.getOrderPlayers().first();
            newOrderPlayer.remove(firstUnity);
            newOrderPlayer.add(firstUnity);
            newRound = new Round(0,newOrderPlayer);
        }

        game.addRounds(newRound);

        game.getTable().ifPresent(session -> new Messenger(session).sendSpecificMessageToAUser(generateMessageToTable(newRound).toString()));



    }

    private JsonObject generateMessageToTable(Round round){
        JsonObject response = new JsonObject();
        response.addProperty(GameJsonKey.RESPONSE.key, "NEW_ROUND");
        Iterator<Unity> unityIterator = round.getOrderPlayers().iterator();
        JsonArray orderedPlayers = new JsonArray();
        int i = 1;
        while(unityIterator.hasNext()) {
            Unity element = unityIterator.next();
            JsonObject playerJson = new JsonObject();
            Race race = Race.getRaceFromName(element);
            playerJson.addProperty(GameJsonKey.NAME.key,race.getName());
            playerJson.addProperty(GameJsonKey.UNITY.key,element.getTag());
            playerJson.addProperty(GameJsonKey.ORDER.key,i);

            i++;
            orderedPlayers.add(playerJson);
        }

        response.add(GameJsonKey.PLAYERS.key,orderedPlayers);

        return response;
    }
}
