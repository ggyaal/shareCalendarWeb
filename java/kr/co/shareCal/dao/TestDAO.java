package kr.co.shareCal.dao;

import java.util.HashMap;

public interface TestDAO {
	String selectToday();
	int selectSum(HashMap<String, Integer> map);
	int selectMul(HashMap<String, Integer> map);
	
}
