package cs361.battleships.models;

import org.junit.Test;

import static org.junit.Assert.*;

public class ResultTest {

    @Test
    public void testresultfunctions() {
        
        Result result  = new Result();
     
	    result.setResult(AtackStatus.HIT);
        System.out.println(result.getResult());
	
	    result.setResult(AtackStatus.MISS);
	    System.out.println(result.getResult());
	
    }
}