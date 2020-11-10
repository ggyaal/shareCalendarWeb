package kr.co.shareCal.dao;

import java.util.HashMap;
import java.util.List;

import kr.co.shareCal.vo.MemberPlanVO;
import kr.co.shareCal.vo.SelectDateVO;

public interface MemberPlanDAO {
	List<MemberPlanVO> selectByIt(SelectDateVO sdVO);
	void insert(MemberPlanVO planVO);
	void updateByIt(MemberPlanVO planVO);
	void delete(HashMap<String, String> map);
}
