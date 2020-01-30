package org.polytech.si5.betConqueror.protocol.init;

import com.google.gson.JsonArray;
import com.google.gson.JsonObject;
import org.polytech.si5.betConqueror.components.buisness.Game;
import org.polytech.si5.betConqueror.components.buisness.Messenger;
import org.polytech.si5.betConqueror.models.LobbyPlayer;
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
        if(!request.containsKey(InitGameJsonKey.RACE.key) ){
            messenger.sendErrorCuzMissingArgument(InitGameJsonKey.RACE.key);
            return;
        }
        if(!request.containsKey(InitGameJsonKey.USERNAME.key) ){
            messenger.sendErrorCuzMissingArgument(InitGameJsonKey.USERNAME.key);
            return;
        }
        Race race;
        try {
            race = Race.getRaceFromName(String.valueOf(request.get(InitGameJsonKey.RACE.key)));
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

        //IF THE PLAYER WANTS TO SWITCH RACE
        //UNCOMMENT FOR PROD

//        for(Player aplayer : game.getPlayerList()){
//            if(aplayer.getSession().isPresent() && aplayer.getSession().get().equals(session)){
//                aplayer.removeSession();
//            }
//        }

        player.setSession(session);
        player.setName(String.valueOf(request.get(InitGameJsonKey.USERNAME.key)));

        messenger.sendSpecificMessageToAUser(generateResponse().toString());
        logger.info("One player has the race : " + player.getRace().getName());

        game.getTable().ifPresent(session1 -> new Messenger(session1).sendSpecificMessageToAUser(generateResponseForAll().toString()));

        for(LobbyPlayer lobbyPlayer: game.getLobbyPlayerList()){
            Messenger aMessenger = new Messenger(lobbyPlayer.getSession());
            aMessenger.sendSpecificMessageToAUser(generateResponseForAll().toString());
        }
        if (game.getPlayerList().stream().allMatch(player1 -> player1.getSession().isPresent())){
            new StartGameEvent().processEvent();
        }

    }

    private JsonObject generateResponse(){
        JsonObject response = new JsonObject();
        response.addProperty(InitGameJsonKey.RESPONSE.key, "OK");

        return response;
    }

    private JsonObject generateResponseForAll(){
        JsonObject response = new JsonObject();
        response.addProperty(InitGameJsonKey.RESPONSE.key, "RACE_SELECTED");
        JsonArray races = new JsonArray();
        for (Player player: game.getPlayerList()) {
            JsonObject raceJSON = new JsonObject();
            raceJSON.addProperty(InitGameJsonKey.AVAILABLE.key, !player.getSession().isPresent());
            raceJSON.addProperty(InitGameJsonKey.NAME.key, player.getRace().getName());
            raceJSON.addProperty(InitGameJsonKey.COLOR.key, player.getRace().getColor().toString());
            raceJSON.addProperty(InitGameJsonKey.PLAYER_ID.key, player.getSession().isPresent() ? player.getSession().get().getId() : "");
            raceJSON.addProperty(InitGameJsonKey.USERNAME.key, player.getName());
            races.add(raceJSON);
        }
        response.add(InitGameJsonKey.RACES.key, races);

        return response;
    }
}
