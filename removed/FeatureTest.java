package cs361.battleships.models;

import org.junit.Before;
import org.junit.Test;

import static org.junit.Assert.assertEquals;
import static org.junit.Assert.assertFalse;
import static org.junit.Assert.assertTrue;

public class FeatureTest {

    private Board board;

    @Before
    public void setUp() {
        board = new Board();
    }
	
	@Test
	public void hitCaptainArmor(){
		assertTrue(board.placeShip(new Ship("BATTLESHIP"), 1, 'D', false));
		var firstShot = board.attack(1, 'F');
		assertEquals(AtackStatus.MISS, firstShot.getResult());
		var secondShot = board.attack(1,'F');
		assertEquals(AtackStatus.HIT, secondShot.getResult());
		assertTrue(battleship.armor == damaged);
		assertTrue(board.placeShip(new Ship("DESTROYER"), 1, 'A', true));
		var firstShot = board.attack(3, 'A');
		assertEquals(AtackStatus.MISS, firstShot.getResult());
		assertTrue(destroyer.armor == damaged);
		var secondShot = board.attack(3,'A');
		assertEquals(AtackStatus.HIT, secondShot.getResult());
	}
	
	@Test
	public void hitCaptainMinesweeper(){
		assertTrue(board.placeShip(new Ship("MINESWEEPER"), 3, 'H', true));
		var firstShot = board.attack(3, 'H');
		assertEquals(AtackStatus.HIT, firstShot.getResult());
	}
	
	@Test
	public void sonarpulse(){
		assertTrue(board.placeShip(new Ship("MINESWEEPER"), 1, 'A', true));
        assertTrue(board.placeShip(new Ship("BATTLESHIP"), 5, 'D', true));
        assertTrue(board.placeShip(new Ship("DESTROYER"), 6, 'A', false));
		//call sonarpulse function, assert false
		assertFalse(sonarpulse(4,'C'));
		//sink minesweeper
		minesweeper.attack(1,'A');
		var result = minesweeper.attack(2,'A');
		assertEquals(AtackStatus.SUNK, result.getResult());
		//call sonarpulse function, assert true
		assertTrue(sonarpulse(4,'C'));
	}
}
