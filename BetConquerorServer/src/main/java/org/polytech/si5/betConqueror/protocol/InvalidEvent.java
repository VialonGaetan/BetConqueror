package org.polytech.si5.betConqueror.protocol;

import org.polytech.si5.betConqueror.components.buisness.Messenger;
import org.springframework.web.socket.WebSocketSession;

public class InvalidEvent implements EventProtocol{

    private Messenger messenger;

    public InvalidEvent(WebSocketSession user) {
        this.messenger = new Messenger(user);
    }

    @Override
    public void processEvent() {
        this.messenger.sendError("Invalid event");

    }
}
