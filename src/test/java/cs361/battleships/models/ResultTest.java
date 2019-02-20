package cs361.battleships.models;

import org.junit.Test;

import static org.junit.Assert.*;

public class ResultTest {

    @Test
    public void testresultfunctions {
        
        Result result  = new Result();
     
	assertTrue(result.setResult("HIT");
	system.out.println(result.getResult());
	
	assertTrue(result.setResult("MISS");
	system.out.println(result.getResult());
	
    }
