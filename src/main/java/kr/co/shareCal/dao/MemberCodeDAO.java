package kr.co.shareCal.dao;

import java.util.List;

import kr.co.shareCal.vo.MemberCodeVO;
import kr.co.shareCal.vo.MemberSortVO;

public interface MemberCodeDAO {
	MemberCodeVO selectById(String userid);
	void insert(MemberCodeVO vo);
	void update(MemberCodeVO vo);

	List<MemberSortVO> selectSortByIt(MemberSortVO sortVO);
	void insertSort(MemberSortVO sortVO);
	void updateSort(MemberSortVO sortVO);
}
