package kr.co.shareCal.service.member;

import java.util.List;

import kr.co.shareCal.vo.FriendVO;

public interface FriendService {
	List<FriendVO> selectById(String userid);
	FriendVO selectById2(FriendVO fVO);
	boolean insert(FriendVO fVO);
	boolean updateRel(FriendVO fVO, int relNo, int rel);
	boolean updateAlert(FriendVO fVO, int alertNo, String msg);
	boolean delete(FriendVO fVO);
	
}
