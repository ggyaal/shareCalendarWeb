package kr.co.shareCal.dao;

import java.util.HashMap;
import java.util.List;

import kr.co.shareCal.vo.MemberVO;

public interface MemberDAO {
	int selectCount();
	List<MemberVO> selectAll();
	MemberVO selectById(String userid);
	List<MemberVO> selectByAll(String item);
	List<MemberVO> selectByItem(HashMap<String, String> map);
	void insert(MemberVO vo);
	void update(HashMap<String, String> map);
	void delete(String userid);
	
	void insertAuth(HashMap<String, String> map);
	void updateAuth(HashMap<String, String> map);
	
	void insertAuthCode(HashMap<String, String> map);
	void updateAuthCode(HashMap<String, String> map);
	HashMap<String, String> selectAuthCode(HashMap<String, String> map);
	void deleteAuthCode(HashMap<String, String> map);
}
