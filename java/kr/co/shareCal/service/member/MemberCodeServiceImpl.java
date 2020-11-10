package kr.co.shareCal.service.member;

import java.util.List;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import kr.co.shareCal.dao.MemberCodeDAO;
import kr.co.shareCal.vo.MemberCodeVO;
import kr.co.shareCal.vo.MemberSortVO;
import lombok.extern.slf4j.Slf4j;

@Slf4j
@Service("memberCodeService")
public class MemberCodeServiceImpl implements MemberCodeService{
	
	@Autowired
	MemberCodeDAO memberCodeDAO;

	@Override
	public MemberCodeVO selectById(String userid) {
		log.info("------------------------------------------------------------------------");
		log.info("MemberCodeServiceImpl.selectById 호출 :" + userid);
		log.info("------------------------------------------------------------------------");
		return memberCodeDAO.selectById(userid);
	}

	@Override
	public boolean insert(MemberCodeVO vo) {
		log.info("------------------------------------------------------------------------");
		log.info("MemberCodeServiceImpl.insert 호출 :" + vo);
		boolean isInsert = true;
		try {
			memberCodeDAO.insert(vo);
		}catch (Exception e) {isInsert = false; }
		log.info("------------------------------------------------------------------------");
		return isInsert;
	}

	@Override
	public boolean update(MemberCodeVO vo) {
		log.info("------------------------------------------------------------------------");
		log.info("MemberCodeServiceImpl.update 호출 :" + vo);
		boolean isUpdate = true;
		try {
			memberCodeDAO.update(vo);			
		}catch (Exception e) {isUpdate = false; }
		log.info("------------------------------------------------------------------------");
		return isUpdate;
	}

	@Override
	public List<MemberSortVO> selectSortByIt(MemberSortVO sortVO) {
		log.info("------------------------------------------------------------------------");
		log.info("MemberCodeServiceImpl.selectSortById 호출 :" + sortVO);
		log.info("------------------------------------------------------------------------");
		return memberCodeDAO.selectSortByIt(sortVO);
	}

	@Override
	public boolean insertSort(MemberSortVO sortVO) {
		log.info("------------------------------------------------------------------------");
		log.info("MemberCodeServiceImpl.insertSort 호출 :" + sortVO);
		boolean isInsert = true;
		try {
			memberCodeDAO.insertSort(sortVO);
		}catch (Exception e) {isInsert = false; }
		log.info("------------------------------------------------------------------------");
		return isInsert;
	}

	@Override
	public boolean updateSort(MemberSortVO sortVO) {
		log.info("------------------------------------------------------------------------");
		log.info("MemberCodeServiceImpl.updateSort 호출 :" + sortVO);
		boolean isUpdate = true;
		try {
			memberCodeDAO.updateSort(sortVO);
		}catch (Exception e) {isUpdate = false; }
		log.info("------------------------------------------------------------------------");
		return isUpdate;
	}

}
