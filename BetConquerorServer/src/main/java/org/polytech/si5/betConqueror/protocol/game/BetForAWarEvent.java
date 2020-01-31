package org.polytech.si5.betConqueror.protocol.game;

import com.google.gson.JsonObject;
import org.polytech.si5.betConqueror.components.buisness.Game;
import org.polytech.si5.betConqueror.components.buisness.Messenger;
import org.polytech.si5.betConqueror.components.buisness.Round;
import org.polytech.si5.betConqueror.components.buisness.War;
import org.polytech.si5.betConqueror.models.Player;
import org.polytech.si5.betConqueror.models.Unity;
import org.polytech.si5.betConqueror.protocol.EventProtocol;
import org.polytech.si5.betConqueror.protocol.key.GameJsonKey;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;
import java.util.Optional;
import java.util.logging.Logger;

public class BetForAWarEvent implements EventProtocol {

    private final Logger logger = Logger.getLogger(BetForAWarEvent.class.getName());
    private Map<String, ?> request;
    private Messenger messenger;
    private Game game;

    public BetForAWarEvent( WebSocketSession session, Map<String, ?> request) {
        this.request = request;
        this.messenger = new Messenger(session);
        this.game = Game.getInstance();
    }

    @Override
    public void processEvent() {

        Round round = game.getCurrentRound();

        if(!request.containsKey(GameJsonKey.WAR_ID.key) &&
                round.getWars().stream().anyMatch(war -> war.getId().equals(request.get(GameJsonKey.WAR_ID.key)))){
            messenger.sendErrorCuzMissingArgument(GameJsonKey.WAR_ID.key);
            return;
        }

        Optional<War> optionalWar = round.getWars().stream().filter(war -> war.getId().equals(request.get(GameJsonKey.WAR_ID.key))).findFirst();
        if (!optionalWar.isPresent()){
            messenger.sendErrorCuzMissingArgument(GameJsonKey.WAR_ID.key);
            return;
        }


        War currentWar = optionalWar.get();

        if(!request.containsKey(GameJsonKey.AMOUNT.key)){
            messenger.sendErrorCuzMissingArgument(GameJsonKey.AMOUNT.key);
            return;
        }

        Integer amount = (int) Double.parseDouble(String.valueOf(request.get(GameJsonKey.AMOUNT.key)));

        if(!request.containsKey(GameJsonKey.USER_ID.key)){
            messenger.sendErrorCuzMissingArgument(GameJsonKey.USER_ID.key);
            return;
        }

        Optional<Player> optionalPlayer = game.getPlayerList().stream().filter(player -> player.getId().equals(request.get(GameJsonKey.USER_ID.key))).findAny();
        if (!optionalPlayer.isPresent()){
            messenger.sendErrorCuzMissingArgument(GameJsonKey.USER_ID.key);
            return;
        }

        Player player = optionalPlayer.get();

        Optional<Unity> optionalUnity = currentWar.getBetPlayers().keySet().stream().filter(unity -> player.getRace().getTags().contains(unity)).findAny();
        if (!optionalUnity.isPresent()){
            messenger.sendErrorCuzMissingArgument(GameJsonKey.USER_ID.key);
            return;
        }
        Unity unity = optionalUnity.get();



        currentWar.setBetToAPlayer(unity,amount);


        messenger.sendSpecificMessageToAUser(generateValidBetResponse(currentWar).toString());

        if (round.getWars().stream().allMatch(war -> war.getBetPlayers().values().stream().allMatch(bet -> bet > -1)))
            new ResultWarEvent().processEvent();

    }

    private JsonObject generateValidBetResponse(War war){
        JsonObject response = new JsonObject();
        response.addProperty(GameJsonKey.RESPONSE.key, "BET");
        response.addProperty(GameJsonKey.WAR_ID.key, war.getId());
        return response;
    }
}
