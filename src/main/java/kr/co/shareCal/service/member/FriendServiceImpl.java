package kr.co.shareCal.service.member;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.shareCal.dao.FriendDAO;
import kr.co.shareCal.vo.FriendVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service("friendService")
public class FriendServiceImpl implements FriendService{
	
	@Autowired
	FriendDAO friendDAO;

	@Override
	public List<FriendVO> selectById(String userid) {
		log.info("<><><><><><><><><><><><><><><><><><><><><><><><>");
		log.info("FriendServiceImpl.selectById 호출 : " + userid);
		log.info("<><><><><><><><><><><><><><><><><><><><><><><><>");
		return friendDAO.selectById(userid);
	}

	@Override
	public FriendVO selectById2(FriendVO fVO) {
		log.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		log.info("FriendServiceImpl.selectById2 호출 : " + fVO);
		FriendVO dbVO = friendDAO.selectById2(fVO);
		if(dbVO == null) {
			FriendVO tempVO = new FriendVO();
			tempVO.setUserid1(fVO.getUserid2());
			tempVO.setUserid2(fVO.getUserid1());
			dbVO = friendDAO.selectById2(tempVO);
		}
		log.info("~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~~");
		return dbVO;
	}

	@Override
	public boolean insert(FriendVO fVO) {
		log.info("<><><><><><><><><><><><><><><><><><><><><><><><>");
		log.info("FriendServiceImpl.insert 호출 : " + fVO);
		boolean isInsert = false;
		FriendVO dbVO = selectById2(fVO);
		if(dbVO!=null) {
			log.info("테이블이 이미 존재합니다.");			
			if(!fVO.getUserid1().equals(dbVO.getUserid1())) {
				updateRel(dbVO, 2, 1);
				updateAlert(dbVO, 1, "친구신청을 수락하였습니다!");
				updateAlert(dbVO, 2, "");
				isInsert = true;
			}
			return isInsert;
		}
		try {
			fVO.setAlert2("친구신청이 왔습니다!");
			friendDAO.insert(fVO);
			isInsert = true;
		}catch (Exception e) {isInsert = false; }
		log.info("<><><><><><><><><><><><><><><><><><><><><><><><>");
		return isInsert;
	}

	@Override
	public boolean updateRel(FriendVO fVO, int relNo, int rel) {
		log.info("<><><><><><><><><><><><><><><><><><><><><><><><>");
		log.info("FriendServiceImpl.updateRel 호출 : " + fVO + " => (" + relNo + ") " + rel);
		boolean isUpdate = true;
		FriendVO dbVO = selectById2(fVO);
		if(relNo == 0) {
			if(fVO.getUserid1().equals(dbVO.getUserid1())) {
				relNo = 1;
			} else {relNo = 2; }			
			log.info("relNo == 0 ==> " + dbVO.getUserid1() + " : " + relNo);				
		}else if(relNo == 4) {
			if(fVO.getUserid1().equals(dbVO.getUserid1())) {
				relNo = 2;
			} else {relNo = 1; }
			log.info("relNo == 4 ==> " + dbVO.getUserid1() + " : " + relNo);				
		}
		switch (relNo) {
			case 1:
				if((dbVO.getRelationship1() + rel) <= 0 && dbVO.getRelationship2() <= 0) {
					
				} else if((dbVO.getRelationship1() + rel) > 4) {
					log.info("이미 최고레벨입니다.");
					return false;
				}
				if(dbVO.getRelationship1() + rel >= 0) dbVO.setRelationship1(dbVO.getRelationship1() + rel);
				break;
			case 2:
				if((dbVO.getRelationship2() + rel) <= 0 && dbVO.getRelationship1() <= 0) {
			
				} else if((dbVO.getRelationship2() + rel) > 4) {
					log.info("이미 최고레벨입니다.");
					return false;
				}			
				if(dbVO.getRelationship2() + rel >= 0) dbVO.setRelationship2(dbVO.getRelationship2() + rel);
				break;
			default:
				return false;
		}
		try {
			friendDAO.update(dbVO);
		}catch (Exception e) {isUpdate = false; }
		log.info("<><><><><><><><><><><><><><><><><><><><><><><><>");
		return isUpdate;
	}

	@Override
	public boolean updateAlert(FriendVO fVO, int alertNo, String msg) {
		log.info("<><><><><><><><><><><><><><><><><><><><><><><><>");
		log.info("FriendServiceImpl.updateAlert 호출 : " + fVO + " => (" + alertNo + ") " + msg);
		boolean isUpdate = true;
		FriendVO dbVO = selectById2(fVO);
		if(alertNo == 0) {
			if(fVO.getUserid1().equals(dbVO.getUserid1())) {
				alertNo = 1;
				log.info("relNo == 0 ==> " + dbVO.getUserid1() + " : " + alertNo);
			} else {alertNo = 2; }			
			log.info("relNo == 0 ==> " + dbVO.getUserid1() + " : " + alertNo);
		}else if(alertNo == 4) {
			if(fVO.getUserid1().equals(dbVO.getUserid1())) {
				alertNo = 2;
			} else {alertNo = 1; }
			log.info("relNo == 4 ==> " + dbVO.getUserid1() + " : " + alertNo);
		}
		switch (alertNo) {
		case 1:
			dbVO.setAlert1(msg);			
			dbVO.setAlert2("");			
			break;
		case 2:
			dbVO.setAlert2(msg);			
			dbVO.setAlert1("");			
			break;
		default:
			log.info("what should I do? : " + alertNo);
			return false;
		}
		try {
			friendDAO.update(dbVO);
		}catch (Exception e) {isUpdate = false; }
		log.info("<><><><><><><><><><><><><><><><><><><><><><><><>");
		return isUpdate;
	}

	@Override
	public boolean delete(FriendVO fVO) {
		log.info("<><><><><><><><><><><><><><><><><><><><><><><><>");
		log.info("FriendServiceImpl.delete 호출 : " + fVO);
		boolean isDelete = true;
		FriendVO dbVO = selectById2(fVO);
		
		try {
			friendDAO.delete(dbVO);
		}catch (Exception e) {isDelete = false; }
		log.info("<><><><><><><><><><><><><><><><><><><><><><><><>");
		return isDelete;
	}

}
