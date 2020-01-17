package org.polytech.si5.betConqueror;


import org.polytech.si5.betConqueror.services.sockets.PingSocketHandler;
import org.polytech.si5.betConqueror.services.sockets.game.GameRequestHandler;
import org.polytech.si5.betConqueror.services.sockets.game.GameSocketHandler;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.context.annotation.Configuration;
import org.springframework.web.servlet.config.annotation.CorsRegistry;
import org.springframework.web.servlet.config.annotation.WebMvcConfigurer;
import org.springframework.web.socket.config.annotation.EnableWebSocket;
import org.springframework.web.socket.config.annotation.WebSocketConfigurer;
import org.springframework.web.socket.config.annotation.WebSocketHandlerRegistry;


@Configuration
@EnableWebSocket
public class WebSocketConfig implements WebSocketConfigurer, WebMvcConfigurer{

    private final PingSocketHandler pingSocket;
    private final GameSocketHandler gameSocket;

    @Autowired
    public WebSocketConfig(PingSocketHandler pingSocketHandler, GameSocketHandler gameSocketHandler) {
        this.pingSocket = pingSocketHandler;
        this.gameSocket = gameSocketHandler;
    }


    @Override
    public void registerWebSocketHandlers(WebSocketHandlerRegistry registry) {
        registry.addHandler(pingSocket, "/ping").setAllowedOrigins("*");
        registry.addHandler(pingSocket, "/ping").setAllowedOrigins("*").withSockJS();
        registry.addHandler(pingSocket, "/game").setAllowedOrigins("*");
        registry.addHandler(pingSocket, "/game").setAllowedOrigins("*").withSockJS();
    }


    @Override
    public void addCorsMappings(CorsRegistry registry) {
        registry.addMapping("/**")
                .allowedOrigins("*");
    }
}
