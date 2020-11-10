package kr.co.shareCal.service.member;

import java.time.LocalDateTime;
import java.util.List;

import kr.co.shareCal.vo.MemberPlanVO;

public interface PlanService {
	List<MemberPlanVO> selectByIt(String it, String whatIt, LocalDateTime start, LocalDateTime end);
	boolean insert(MemberPlanVO planVO);
	boolean updateByIt(MemberPlanVO planVO);
	boolean delete(String userid, int id);
}
