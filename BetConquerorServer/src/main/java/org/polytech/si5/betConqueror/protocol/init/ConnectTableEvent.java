package org.polytech.si5.betConqueror.protocol.init;

import com.google.gson.JsonObject;
import org.polytech.si5.betConqueror.components.buisness.Game;
import org.polytech.si5.betConqueror.components.buisness.Messenger;
import org.polytech.si5.betConqueror.protocol.EventProtocol;
import org.polytech.si5.betConqueror.protocol.key.InitGameJsonKey;
import org.springframework.web.socket.WebSocketSession;

import java.util.logging.Logger;

public class ConnectTableEvent implements EventProtocol {

    private WebSocketSession table;
    private final Logger log = Logger.getLogger(ConnectTableEvent.class.getName());

    public ConnectTableEvent(WebSocketSession session) {
        this.table = session;
    }

    @Override
    public void processEvent() {
        Game.getInstance().setTable(table);
        log.info("The table is now connected");
        JsonObject response = new JsonObject();
        response.addProperty(InitGameJsonKey.RESPONSE.key, "OK");
        new Messenger(table).sendSpecificMessageToAUser(response.toString());
        return;
    }
}
