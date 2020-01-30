package org.polytech.si5.betConqueror.protocol.game;

import org.polytech.si5.betConqueror.components.buisness.Game;
import org.polytech.si5.betConqueror.components.buisness.Messenger;
import org.polytech.si5.betConqueror.components.buisness.Round;
import org.polytech.si5.betConqueror.protocol.EventProtocol;
import org.polytech.si5.betConqueror.protocol.key.GameJsonKey;
import org.polytech.si5.betConqueror.protocol.key.InitGameJsonKey;
import org.springframework.web.socket.WebSocketSession;

import java.util.Map;
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

        if(!request.containsKey(GameJsonKey.TAG.key)){
            messenger.sendErrorCuzMissingArgument(GameJsonKey.TAG.key);
            return;
        }

        if(!request.containsKey(GameJsonKey.TERRITORY_ID.key)){
            messenger.sendErrorCuzMissingArgument(GameJsonKey.TERRITORY_ID.key);
            return;
        }





    }
}
