package org.polytech.si5.betConqueror.services.web.rest;


import org.polytech.si5.betConqueror.components.buisness.Game;
import org.polytech.si5.betConqueror.components.buisness.Round;
import org.springframework.web.bind.annotation.GetMapping;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RestController;

import java.util.List;

@RestController
public class GameWebService {

    private Game game;

    public GameWebService() {
        this.game = Game.getInstance();
    }

    @GetMapping(value = "/Game")
    public Game getGame(){
        return this.game;
    }

    @GetMapping(value = "/Rounds")
    public List<Round> getRounds(){
        return this.game.getRounds();
    }

    @GetMapping(value = "/Round/{id}")
    public Round getRounds(@PathVariable int id){
        return this.game.getRounds().stream().filter(round -> round.getNumber() == id).findFirst().get();
    }

}
