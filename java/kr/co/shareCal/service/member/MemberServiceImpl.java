package kr.co.shareCal.service.member;

import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.crypto.bcrypt.BCryptPasswordEncoder;
import org.springframework.stereotype.Service;

import kr.co.shareCal.dao.MemberDAO;
import kr.co.shareCal.vo.MemberCodeVO;
import kr.co.shareCal.vo.MemberSortVO;
import kr.co.shareCal.vo.MemberVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service("memberService")
public class MemberServiceImpl implements MemberService{

	@Autowired
	private MemberDAO memberDAO;
	@Autowired
	private BCryptPasswordEncoder bCryptPasswordEncoder;
	@Autowired
	private MemberCodeServiceImpl memberCodeService;
	
	private String[] authList = {"ROLE_NONE", "ROLE_USER", "ROLE_MVP", "ROLE_MEMBER", "ROLE_ADMIN"};
	
	@Override
	public int selectCount() {
		log.info("======================================================================");
		log.info("MemberServiceImpl.selectCount 호출 : ");
		log.info("======================================================================");
		return memberDAO.selectCount();
	}

	@Override
	public List<MemberVO> selectAll() {
		log.info("======================================================================");
		log.info("MemberServiceImpl.selectAll 호출 : ");
		log.info("======================================================================");
		return memberDAO.selectAll();
	}

	@Override
	public MemberVO selectById(String userid) {
		log.info("======================================================================");
		log.info("MemberServiceImpl.selectById 호출 : " + userid);
		log.info("======================================================================");
		return memberDAO.selectById(userid);
	}
	
	@Override
	public List<MemberVO> selectByAll(String item) {
		log.info("======================================================================");
		log.info("MemberServiceImpl.selectByAll 호출 : " + item);
		log.info("======================================================================");
		return memberDAO.selectByAll(item);
	}

	@Override
	public List<MemberVO> selectByItem(String item, String whatIs) {
		log.info("======================================================================");
		log.info("MemberServiceImpl.selectByName 호출 : (" + whatIs + ") " + item);
		HashMap<String, String> map = new HashMap<String, String>();
		map.put(whatIs, item);
		log.info("======================================================================");
		return memberDAO.selectByItem(map);
	}

	@Override
	public MemberCodeVO selectCodeByuserid(String userid) {
		log.info("======================================================================");
		log.info("MemberServiceImpl.selectCodeByuserid 호출 : " + userid);
		log.info("======================================================================");
		return memberCodeService.selectById(userid);
	}

	@Override
	public boolean insert(MemberVO vo) {
		log.info("======================================================================");
		log.info("MemberServiceImpl.insert 호출 : " + vo);
		boolean isInsert = false;
		String password = bCryptPasswordEncoder.encode(vo.getPassword());
		vo.setPassword(password);
		try {
			memberDAO.insert(vo); // 회원
			if(vo.getMemberCode()!=null) memberCodeService.insert(vo.getMemberCode()); // 정보
			insertAuth(vo.getUserid(), 0); // 권한
			isInsert = true;			
		}catch (Exception e) {
			isInsert = false;
			memberDAO.delete(vo.getUserid());
			e.printStackTrace();
			log.info("MemberServiceImpl.insert 실패! : ");
			
		}
		log.info("======================================================================");
		return isInsert;
	}
	
	@Override
	public boolean updateByAll(MemberVO vo, MemberVO newVO) {
		log.info("======================================================================");
		log.info("MemberServiceImpl.updateByAll 호출 : " + vo + "| => |" + newVO);
		boolean isUpdate = false;
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("userid", newVO.getUserid());
		map.put("nickName", newVO.getNickName());
		memberDAO.update(map);
		memberCodeService.update(newVO.getMemberCode());
		isUpdate = true;	
		log.info("======================================================================");
		return isUpdate;
	}

	@Override
	public boolean updateByNickName(MemberVO vo, String newNick, String pass) {
		log.info("======================================================================");
		log.info("MemberServiceImpl.updateByNickName 호출 : " + vo + ", " + newNick + " - (" + pass + ")");
		boolean isUpdate = false;
		if(pass.endsWith("_TeM")) {
			if(pass.equals(selectAuthCode(vo.getUserid(), 3).get("AUTHCODE"))) {
				isUpdate = isUpdateIt(vo.getUserid(), newNick, "nickName");				
			}
		} else if(isPass(vo.getUserid(), pass)) {
			isUpdate = isUpdateIt(vo.getUserid(), newNick, "nickName");				
		}
		log.info("======================================================================");
		return isUpdate;
	}

	@Override
	public boolean updateByPassword(MemberVO vo, String newPassword, String pass) {
		log.info("======================================================================");
		log.info("MemberServiceImpl.updateByPassword 호출 : " + vo + ", " + newPassword + " - (" + pass + ")");
		boolean isUpdate = false;
		String crPassword = bCryptPasswordEncoder.encode(newPassword);
		if(pass.endsWith("_TeM")) {
			if(pass.equals(selectAuthCode(vo.getUserid(), 3).get("AUTHCODE"))) {
				isUpdate = isUpdateIt(vo.getUserid(), crPassword, "password");				
			}
		} else if(isPass(vo.getUserid(), pass)) {
			isUpdate = isUpdateIt(vo.getUserid(), crPassword, "password");				
		}
		log.info("======================================================================");
		return isUpdate;
	}

	@Override
	public boolean updateByLv(String userid) {
		log.info("======================================================================");
		log.info("MemberServiceImpl.updateByLv 호출 : " + userid);
		boolean isUpdate = false;
		MemberVO dbVO = memberDAO.selectById(userid);
		if(dbVO!=null) {
			HashMap<String, String> map = new HashMap<String, String>();
			map.put("userid", dbVO.getUserid());
			map.put("lv", dbVO.getLv() + 1 + "");
			log.info("-----------------------------------------------------------------------");
			log.info("dbVO :" + dbVO.getUserid() + ", " + (dbVO.getLv() + 1) );
			log.info("-----------------------------------------------------------------------");
			memberDAO.update(map);
			isUpdate = true;
		}
		
		log.info("======================================================================");
		return isUpdate;
	}
	
	@Override
	public boolean updateCode(MemberCodeVO codeVO) {
		log.info("======================================================================");
		log.info("MemberServiceImpl.updateCode 호출 : " + codeVO);
		boolean isUpdate = false;
		try {
			memberCodeService.update(codeVO);
		}catch (Exception e) {isUpdate = false; }
		log.info("======================================================================");
		return isUpdate;
	}

	@Override
	public boolean delete(String userid) {
		log.info("======================================================================");
		log.info("MemberServiceImpl.delete 호출 : " + userid);
		boolean isDelete = false;
		try {
			memberDAO.delete(userid);
			isDelete = true;
		}catch (Exception e) {isDelete = false; }
		log.info("======================================================================");
		return isDelete;
	}

	@Override
	public boolean isPass(String userid, String password) {
		log.info("######################################################################");
		log.info("MemberServiceImpl.isPass 호출 : " + userid + ", " + password);
		boolean isPass = false;
		MemberVO dbVO = memberDAO.selectById(userid);
		log.info("MemberServiceImpl.isPass 호출 db : " + dbVO);
		if(dbVO!=null && bCryptPasswordEncoder.matches(password, dbVO.getPassword())) {
			log.info("MemberServiceImpl.isPass 호출 true : ");
			isPass = true;
		}	
		log.info("######################################################################");
		return isPass;
	}
	
	@Override
	public boolean insertAuth(String userid, int authNo) {
		log.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		log.info("MemberServiceImpl.insertAuth 호출 : " + userid + ", " + authNo);
		boolean isInsert = true;
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("userid", userid);
		map.put("auth", authList[authNo]);
		log.info("authList[" + authNo + "] : " + authList[authNo]);
		try {memberDAO.insertAuth(map); }
		catch (Exception e) { isInsert = false;}
		log.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		return isInsert;
	}

	@Override
	public boolean updateAuth(String userid, int authNo) {
		log.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		log.info("MemberServiceImpl.updateAuth 호출 : " + userid + ", " + authNo);
		boolean isUpdate = true;
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("userid", userid);
		map.put("auth", authList[authNo]);
		try {memberDAO.updateAuth(map); }
		catch (Exception e) { isUpdate = false;}
		log.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		return isUpdate;
	}


	@Override
	public boolean insertAuthCode(String userid, int codeNo, String authCode) {
		log.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		log.info("MemberServiceImpl.insertAuthCode 호출 : " + userid + ", " + "(" + codeNo + ")" + authCode);
		boolean isInsert = true;
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("userid", userid);
		map.put("codeNo", codeNo + "");
		map.put("authCode", authCode);
		try {memberDAO.insertAuthCode(map); }
		catch (Exception e) { isInsert = false;}
		log.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		return isInsert;
	}

	@Override
	public boolean updateAuthCode(String userid, int codeNo, String authCode, int countUp) {
		log.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		log.info("MemberServiceImpl.updateAuthCode 호출 : " + userid + ", " + "(" + codeNo + ")" + authCode + " : " + countUp);
		boolean isUpdate = true;
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("userid", userid);
		map.put("codeNo", codeNo + "");
		if(countUp == 0) {
			map.put("authCode", authCode);
			map.put("wCount", 0 + "");
		}
		else map.put("wCount", Integer.parseInt(selectAuthCode(userid, codeNo).get("WCOUNT")) + 1 + "");
		try { memberDAO.updateAuthCode(map); }
		catch (Exception e) { isUpdate = false; }
		log.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		return isUpdate;
	}

	@Override
	public HashMap<String, String> selectAuthCode(String userid, int codeNo) {
		log.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		log.info("MemberServiceImpl.selectAuthCode 호출 : " + "(" + codeNo + ")" + userid);
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("userid", userid);
		map.put("codeNo", codeNo + "");
		HashMap<String, String> authCodeMap = memberDAO.selectAuthCode(map);
		log.info("authCodeMap : " + authCodeMap);
		if(authCodeMap == null) {
			authCodeMap = new HashMap<String, String>();
			authCodeMap.put("AUTHCODE", "not_matchCode");
			log.info("authCodeMap : " + authCodeMap);
		} else {
			log.info("authCOde : " + authCodeMap.get("AUTHCODE"));
			int wCount = Integer.valueOf(authCodeMap.get("WCOUNT"));
			log.info("틀린 횟수 : " + wCount);
			if(wCount >= 5) {
				deleteAuthCode(userid, codeNo);
				log.info("5회 이상 틀려 삭제되었습니다.");
				authCodeMap.put("AUTHCODE", "not_matchCode");
			}
		}
		log.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		return authCodeMap;
	}

	@Override
	public boolean deleteAuthCode(String userid, int codeNo) {
		log.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		log.info("MemberServiceImpl.deleteAuthCode 호출 : " + "(" + codeNo + ")" + userid);
		boolean isDelete = true;
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("userid", userid);
		map.put("codeNo", codeNo + "");
		try {memberDAO.deleteAuthCode(map); }
		catch (Exception e) { isDelete = false;}
		log.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		return isDelete;
	}

	private boolean isUpdateIt(String userid, String newIt, String it) {
		log.info("--isUpdateIt-- userid : " + userid + ", (" + it + ")" + newIt);
		boolean isUpdate = true;
		HashMap<String, String> map = new HashMap<String, String>();
		map.put("userid", userid);
		map.put(it, newIt);
		try{ memberDAO.update(map);}
		catch(Exception e) {isUpdate = false; }
		return isUpdate;
	}

	@Override
	public List<MemberSortVO> selectSortByIt(MemberSortVO sortVO) {
		log.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		log.info("MemberServiceImpl.selectSortById 호출 : " + sortVO);
		log.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		return memberCodeService.selectSortByIt(sortVO);
	}

	@Override
	public boolean insertSort(MemberSortVO sortVO) {
		log.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		log.info("MemberServiceImpl.insertSort 호출 : " + sortVO);
		log.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		return memberCodeService.insertSort(sortVO);
	}

	@Override
	public boolean updateSort(MemberSortVO sortVO) {
		log.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		log.info("MemberServiceImpl.updateSort 호출 : " + sortVO);
		log.info("++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++++");
		return memberCodeService.updateSort(sortVO);
	}

}
