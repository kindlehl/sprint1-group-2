package controllers;

import com.fasterxml.jackson.annotation.JsonProperty;
import cs361.battleships.models.Game;

public class Sonar {

    @JsonProperty private Game game;
    @JsonProperty private int x;
    @JsonProperty private char y;

    public Game getGame() {
        return game;
    }

    public int getRow() {
        return x;
    }

    public char getColumn() {
        return y;
    }
}
