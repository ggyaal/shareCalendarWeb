package kr.co.shareCal.service.test;

import java.util.HashMap;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.shareCal.dao.TestDAO;

@Service("testService")
public class TestServiceImpl implements TestService {
	@Autowired
	private TestDAO testDAO;

	@Override
	public String selectToday() {
		return testDAO.selectToday();
	}

	@Override
	public int selectSum(int num1, int num2) {
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		map.put("num1", num1);
		map.put("num2", num2);
		return testDAO.selectSum(map);
	}

	@Override
	public int selectMul(int num1, int num2, int num3) {
		HashMap<String, Integer> map = new HashMap<String, Integer>();
		map.put("num1", num1);
		map.put("num2", num2);
		map.put("num3", num3);
		return testDAO.selectMul(map);
	}
}
