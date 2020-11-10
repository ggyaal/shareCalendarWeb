package kr.co.shareCal.service.member;

import java.util.List;

import kr.co.shareCal.vo.MemberCodeVO;
import kr.co.shareCal.vo.MemberSortVO;

public interface MemberCodeService {
	MemberCodeVO selectById(String userid);
	boolean insert(MemberCodeVO vo);
	boolean update(MemberCodeVO vo);

	List<MemberSortVO> selectSortByIt(MemberSortVO sortVO);
	boolean insertSort(MemberSortVO sortVO);
	boolean updateSort(MemberSortVO sortVO);

}
