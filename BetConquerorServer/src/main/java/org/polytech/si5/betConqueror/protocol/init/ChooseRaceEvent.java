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
import java.util.Optional;
import java.util.logging.Logger;

public class ChooseRaceEvent implements EventProtocol {

    private final Logger logger = Logger.getLogger(ChooseRaceEvent.class.getName());
    private Map<String, ?> request;
    private WebSocketSession session;
    private Game game;

    public ChooseRaceEvent(WebSocketSession session, Map<String, ?> request) {
        this.request = request;
        this.session = session;
        this.game = Game.getInstance();
    }


    @Override
    public void processEvent() {
        Messenger messenger = new Messenger(session);
        if(!request.containsKey(InitGameJsonKey.RACE.key)){
            messenger.sendErrorCuzMissingArgument(InitGameJsonKey.RACE.key);
            return;
        }
        Race race;
        try {
            System.out.println(String.valueOf(request.get(InitGameJsonKey.RACE.key)));
            race = Race.valueOf(String.valueOf(request.get(InitGameJsonKey.RACE.key)));
        }catch (Exception e){
            JsonObject error = new JsonObject();
            error.addProperty(InitGameJsonKey.RESPONSE.key, "KO");
            error.addProperty("error", "This Race doesn\'t exist");
            messenger.sendError(error.toString());
            return;
        }

        Optional<Player> optionalPlayer = game.getPlayerList().stream().filter(player -> player.getRace().equals(race)).findAny();
        if(!optionalPlayer.isPresent()){
            return;
        }

        Player player = optionalPlayer.get();
        if(player.getSession().isPresent()){
            JsonObject error = new JsonObject();
            error.addProperty(InitGameJsonKey.RESPONSE.key, "KO");
            error.addProperty("error", "Some has already this race");
            messenger.sendError(error.toString());
            return;
        }
        player.setSession(session);
        messenger.sendSpecificMessageToAUser(generateResponse().toString());
        logger.info("One player has the race : " + player.getRace().getName());


        for(Player aPlayer: game.getPlayerList()){
            Messenger aMessenger = new Messenger(aPlayer.getSession().get());
            aMessenger.sendSpecificMessageToAUser(generateResponseForAll(race).toString());
        }
        System.out.println("lskjdks");
        if (game.getPlayerList().stream().allMatch(player1 -> player1.getSession().isPresent())){
            new StartGameEvent().processEvent();
        }

    }

    private JsonObject generateResponse(){
        JsonObject response = new JsonObject();
        response.addProperty(InitGameJsonKey.RESPONSE.key, "OK");

        return response;
    }

    private JsonObject generateResponseForAll(Race race){
        JsonObject response = new JsonObject();
        response.addProperty(InitGameJsonKey.RESPONSE.key, "RACE_SELECTED");
        response.addProperty(InitGameJsonKey.NAME.key, race.getName());
        return response;
    }
}
