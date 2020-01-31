package org.polytech.si5.betConqueror.protocol.game;

import org.polytech.si5.betConqueror.protocol.EventProtocol;

public class ResultWarEvent implements EventProtocol {
    @Override
    public void processEvent() {
        new StartRoundEvent().processEvent();
    }
}
