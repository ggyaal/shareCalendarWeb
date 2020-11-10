package kr.co.shareCal.service.member;

import java.time.LocalDateTime;
import java.util.HashMap;
import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.shareCal.dao.MemberPlanDAO;
import kr.co.shareCal.vo.MemberPlanVO;
import kr.co.shareCal.vo.SelectDateVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service("planService")
public class PlanServiceImpl implements PlanService{

	@Autowired
	private MemberPlanDAO memberPlanDAO;
	
	@Override
	public List<MemberPlanVO> selectByIt(String it, String whatIt, LocalDateTime start, LocalDateTime end) {
		log.info("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
		log.info("PlanServiceImpl.selectByIt 호출 : " + "(" + whatIt + ") - " + it + "[" + start + " ~ " + end + "]");
		SelectDateVO sdVO = new SelectDateVO();
		if(whatIt.equals("userid")) sdVO.setUserid(it);
		else if(whatIt.equals("name")) sdVO.setName(it);
		else if(whatIt.equals("title")) sdVO.setTitle(it);
		else if(whatIt.equals("nickName")) sdVO.setNickName(it);
		else if(whatIt.equals("disclosed")) sdVO.setDisclosed(it);
		else return null;
		sdVO.setStart(start);
		sdVO.setEnd(end);
		log.info("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
		return memberPlanDAO.selectByIt(sdVO);
	}

	@Override
	public boolean insert(MemberPlanVO planVO) {
		log.info("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
		log.info("PlanServiceImpl.insert 호출 : " + planVO);
		boolean isInsert = false;
		try {
			memberPlanDAO.insert(planVO);
			isInsert = true;
		}
		catch (Exception e) {
			e.printStackTrace();
			isInsert = false;}
		
		log.info("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
		return isInsert;
	}

	@Override
	public boolean updateByIt(MemberPlanVO planVO) {
		log.info("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
		log.info("PlanServiceImpl.updateByIt 호출 : " + planVO);
		boolean isUpdate = false;
		try {
			memberPlanDAO.updateByIt(planVO);
			isUpdate = true;
		}
		catch (Exception e) {
			e.printStackTrace();
			isUpdate = false;}
		log.info("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
		return isUpdate;
	}

	@Override
	public boolean delete(String userid, int id) {
		log.info("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
		log.info("PlanServiceImpl.delete 호출 : " + userid + ", (" + id + ")");
		boolean isDelete = false;
		try {
			HashMap<String, String> map = new HashMap<String, String>();
			map.put("userid", userid);
			map.put("id", id + "");
			memberPlanDAO.delete(map);
			isDelete = true;
		}catch (Exception e) {isDelete = false;}
		
		log.info("^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^^");
		return isDelete;
	}

}
