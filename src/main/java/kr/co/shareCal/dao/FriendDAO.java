package kr.co.shareCal.dao;

import java.util.List;

import kr.co.shareCal.vo.FriendVO;

public interface FriendDAO {
	List<FriendVO> selectById(String userid);
	FriendVO selectById2(FriendVO fVO);
	void insert(FriendVO fVO);
	void update(FriendVO fVO);
	void delete(FriendVO fVO);
	
}
