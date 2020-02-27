package org.polytech.si5.betConqueror.protocol.game;

import com.google.gson.JsonObject;
import org.polytech.si5.betConqueror.components.buisness.Game;
import org.polytech.si5.betConqueror.components.buisness.Messenger;
import org.polytech.si5.betConqueror.components.buisness.Round;
import org.polytech.si5.betConqueror.components.buisness.War;
import org.polytech.si5.betConqueror.models.Player;
import org.polytech.si5.betConqueror.models.Race;
import org.polytech.si5.betConqueror.models.Territory;
import org.polytech.si5.betConqueror.models.Unity;
import org.polytech.si5.betConqueror.protocol.EventProtocol;
import org.polytech.si5.betConqueror.protocol.key.GameJsonKey;
import org.polytech.si5.betConqueror.protocol.key.InitGameJsonKey;
import org.springframework.web.socket.WebSocketSession;

import java.util.Iterator;
import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

public class MoveUnityEvent implements EventProtocol {


    private final Logger logger = Logger.getLogger(MoveUnityEvent.class.getName());
    private Map<String, ?> request;
    private Messenger messenger;
    private Game game;

    public MoveUnityEvent(WebSocketSession session, Map<String, ?> request) {
        this.request = request;
        this.messenger = new Messenger(session);
        this.game = Game.getInstance();
    }

    @Override
    public void processEvent() {

        Round currentRound = game.getCurrentRound();

        logger.info(request.toString());


        if(!request.containsKey(GameJsonKey.TAG.key) && currentRound.getOrderPlayers().contains(request.get(GameJsonKey.TAG.key))){
            messenger.sendErrorCuzMissingArgument(GameJsonKey.TAG.key);
            return;
        }

        Optional<Unity> optionalUnity = currentRound.getOrderPlayersAndPlayed().keySet().stream().filter(unity1 -> unity1.getTag().equals(request.get(GameJsonKey.TAG.key))).findAny();
        if (!optionalUnity.isPresent()){
            messenger.sendErrorCuzMissingArgument(GameJsonKey.TAG.key);
            return;
        }
        Unity unity = optionalUnity.get();

        if(!request.containsKey(GameJsonKey.TERRITORY_ID.key) && currentRound.getTerritories().stream().anyMatch(territory -> territory.getId() == Integer.valueOf(String.valueOf(request.get(GameJsonKey.TERRITORY_ID.key))))){
            messenger.sendErrorCuzMissingArgument(GameJsonKey.TERRITORY_ID.key);
            return;
        }

        Optional<Territory> optionalTerritory= currentRound.getTerritories().stream().filter(territory -> territory.getId() == Integer.valueOf(String.valueOf(request.get(GameJsonKey.TERRITORY_ID.key)))).findFirst();
        if (!optionalTerritory.isPresent()){
            messenger.sendErrorCuzMissingArgument(GameJsonKey.TERRITORY_ID.key);
            return;
        }
        Territory territory = optionalTerritory.get();

        territory.addUnity(unity);
        currentRound.setPlayerHasPlayed(unity);

        logger.info("MOVE IS VALID");


        game.getTable().ifPresent(session -> new Messenger(session).sendSpecificMessageToAUser(generateResponse().toString()));


        if(currentRound.getOrderPlayersAndPlayed().values().stream().allMatch(aBoolean -> aBoolean))
            new StartWarEvent().processEvent();
            //new StartRoundEvent().processEvent();
            //new ResultWarEvent().processEvent();

        Iterator<Unity> iterator = currentRound.getOrderPlayers().iterator();
        while (iterator.hasNext()){
            Unity currentUnity = iterator.next();
            if (Race.getRaceFromName(currentUnity).getName() == Race.getRaceFromName(unity).getName() && iterator.hasNext()){
                Unity unity1 = iterator.next();
                game.getPlayerByUnity(unity1).getSession().ifPresent(session -> new Messenger(session).sendSpecificMessageToAUser(generateResponse().toString()));
                return;
            }
        }

    }

    private JsonObject generateResponse(){
        JsonObject response = new JsonObject();
        response.addProperty(GameJsonKey.RESPONSE.key, "MOVE");

        return response;
    }
}
