package org.polytech.si5.betConqueror.protocol;

import javax.websocket.Session;
import java.util.Map;

public class CreateGameEvent implements EventProtocol {

    private Map<String, ?> request;
    private Session session;

    public CreateGameEvent(Map<String, ?> request, Session session) {
        this.request = request;
        this.session = session;
    }

    @Override
    public void processEvent() {

    }
}
