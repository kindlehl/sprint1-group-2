package cs361.battleships.models;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class startButton {

    private Board board;

    @Before
    public void setUp() {
        board = new Board();
    }

	@Test
	public void startButton(){
		assertTrue(board.placeShip(new Ship("MINESWEEPER"), 1, 'A', true));
        assertTrue(board.placeShip(new Ship("BATTLESHIP"), 5, 'D', true));
        assertTrue(board.placeShip(new Ship("DESTROYER"), 6, 'A', false));
		Result result = board.attack(1, 'A');
		assertEquals(AtackStatus.INVALID, result.getResult());
		startGame = true;
		Result result = board.attack(1, 'A');
		assertEquals(AtackStatus.HIT, result.getResult());
	}
}
