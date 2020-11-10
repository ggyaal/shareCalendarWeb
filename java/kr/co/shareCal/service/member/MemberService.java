package kr.co.shareCal.service.member;

import java.util.HashMap;
import java.util.List;

import kr.co.shareCal.vo.MemberCodeVO;
import kr.co.shareCal.vo.MemberSortVO;
import kr.co.shareCal.vo.MemberVO;

public interface MemberService {
	int selectCount();
	List<MemberVO> selectAll();
	MemberVO selectById(String userid);
	List<MemberVO> selectByAll(String item);
	List<MemberVO> selectByItem(String item, String whatIs);
	MemberCodeVO selectCodeByuserid(String userid);
	boolean insert(MemberVO vo);	
	boolean updateByAll(MemberVO vo, MemberVO newVO);
	boolean updateByNickName(MemberVO vo, String newNick, String pass);
	boolean updateByPassword(MemberVO vo, String newPassword, String pass);
	boolean updateByLv(String userid);
	boolean updateCode(MemberCodeVO codeVO);
	boolean delete(String userid);
	boolean isPass(String userid, String password);
	
	boolean insertAuth(String userid, int authNo);
	boolean updateAuth(String userid, int authNo);
	
	boolean insertAuthCode(String userid, int codeNo, String authCode);
	boolean updateAuthCode(String userid, int codeNo, String authCode, int countUp);
	HashMap<String, String> selectAuthCode(String userid, int codeNo);
	boolean deleteAuthCode(String userid, int codeNo);
	
	List<MemberSortVO> selectSortByIt(MemberSortVO sortVO);
	boolean insertSort(MemberSortVO sortVO);
	boolean updateSort(MemberSortVO sortVO);
}
