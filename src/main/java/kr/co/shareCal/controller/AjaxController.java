package kr.co.shareCal.controller;

import java.io.IOException;
import java.time.LocalDateTime;
import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.format.annotation.DateTimeFormat;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.multipart.MultipartFile;
import org.springframework.web.multipart.MultipartHttpServletRequest;

import kr.co.shareCal.HomeController;
import kr.co.shareCal.security.MakeOTPCode;
import kr.co.shareCal.service.email.EmailService;
import kr.co.shareCal.service.file.FileUploadUtil;
import kr.co.shareCal.service.member.FriendService;
import kr.co.shareCal.service.member.MemberService;
import kr.co.shareCal.service.member.PlanService;
import kr.co.shareCal.vo.FriendVO;
import kr.co.shareCal.vo.MemberCodeVO;
import kr.co.shareCal.vo.MemberPlanVO;
import kr.co.shareCal.vo.MemberSortVO;
import kr.co.shareCal.vo.MemberVO;

@Controller
public class AjaxController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	@Autowired
	private MemberService memberService;
	@Autowired
	private PlanService planService;
	@Autowired
	private EmailService emailService;
	@Autowired
	private FriendService friendService;
	
	
	@RequestMapping(value = "idCheck", produces="text/plain;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public String idCheck(@RequestParam("userid")String userid, Model model) {
		logger.info("idCheck 호출 : " + userid);
		String dbUserid = null;
		try {
			dbUserid = memberService.selectById(userid).getUserid();
		} catch(NullPointerException e) { dbUserid = "notFind"; }
		return dbUserid;
	}
	
	@RequestMapping(value = "passCheck", produces="text/plain;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public String passCheck(@RequestParam("userid")String userid, @RequestParam("password")String password, Model model) {
		logger.info("passCheck 호출 : " + userid + ", " + password);
		String isPass = "notEq";
		if(memberService.isPass(userid, password)) isPass = "Eq";
		return isPass;
	}
	
	@RequestMapping(value = "codeCheck", produces="text/plain;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public String codeCheck(@RequestParam("userid")String userid, @RequestParam("codeNo")int codeNo, @RequestParam("wordCode")String wordCode, Model model) {
		logger.info("codeCheck 호출 : " + userid + "(" + codeNo + ")" + wordCode);
		String isRight = "코드가 일치하지 않습니다.";
		if(wordCode.trim().length()!=0) {	
			logger.info("wordToCode : " + wordToCode(wordCode));
			HashMap<String, String> authCodeMap = memberService.selectAuthCode(userid, codeNo);
			if(authCodeMap.get("AUTHCODE").equals(wordToCode(wordCode))) {
				isRight = "코드가 일치합니다.";
				memberService.deleteAuthCode(userid, codeNo);
			}
			else if(authCodeMap.get("AUTHCODE").equals("not_matchCode")) {isRight = "코드가 없습니다.";}
			else {
				memberService.updateAuthCode(userid, codeNo, "", 1);
				int wCount = Integer.valueOf(authCodeMap.get("WCOUNT")) + 1;
				isRight = wCount == 5?"5회 틀려 삭제되었습니다.": wCount + "회 틀림(5회이상 코드삭제)";
			}
		}else isRight = "코드를 입력해주세요.";
		return isRight;
	}

	@RequestMapping(value = "passChange", produces="text/plain;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public String passChange(@RequestParam("userid")String userid, @RequestParam("password")String password, Model model) {
		logger.info("passChange 호출 : " + userid + ", " + password);
		String msg = "알 수 없는 오류";
		MemberVO vo = memberService.selectById(userid);
		if(vo!= null) {
			if(memberService.updateByPassword(vo, password, memberService.selectAuthCode(userid, 3).get("AUTHCODE"))) { msg = "변경 성공"; }
			else msg = "변경 실패";
		}

		return msg;
	}
	
	
	@RequestMapping(value = "sendAuth", produces="text/plain;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public String sendAuth(@RequestParam("userid")String userid,@RequestParam("codeNo")int codeNo, Model model) {
		logger.info("sendAuth 호출 : " + "(" + codeNo + ")" + userid);
		String isSend = "발송 실패";
		MemberVO vo = memberService.selectById(userid);
		String title = null;
		String content = null;
		String authCode = null;
		String authWord = null;
		if(vo!=null) {
			switch (codeNo) {
			case 1:
				authCode = makeCode(1, 8);
				title = "환영합니다 " + vo.getName() + "님!!";
				content = getAuthContent(vo.getName(), authCode, codeNo);
				break;
			case 2:
				//-------------임시 비밀번호 저장-------------------
				String temporPass = makeCode(3, 6) + "_TeM";
				if(memberService.selectAuthCode(userid, 3).get("AUTHCODE").equals("not_matchCode")) {
					memberService.insertAuthCode(userid, 3, temporPass);
				}else memberService.updateAuthCode(userid, 3, temporPass, 0);
				//-------------임시 비밀번호 저장-------------------

				String codeMap = makeCode(2, 2);				
				authCode = codeMap.split(" ")[0];
				authWord = codeMap.split(" ")[1];
				title = vo.getName() + "님!! 비밀번호를 변경해주세요 !!";
				content = getAuthContent(vo.getName(), authWord, codeNo);
				break;

			default:
				isSend = "발송 실패";
				break;
			}
			if(emailService.sendMail(vo.getUserid(), title, content)) {
				isSend = "발송 성공";
				if(memberService.selectAuthCode(userid, codeNo).get("AUTHCODE").equals("not_matchCode")) {
					if(memberService.insertAuthCode(vo.getUserid(), codeNo, authCode)) logger.info("~~" + vo.getUserid() + "님의 인증코드가 저장되었습니다! ~~ ");
					else {isSend = "발송 실패"; }
				} else {
					if(memberService.updateAuthCode(vo.getUserid(), codeNo, authCode, 0)) logger.info("~~" + vo.getUserid() + "님의 인증코드가 저장되었습니다! ~~ ");
					else {isSend = "발송 실패"; }
				}
			}
			
		}else isSend = "아이디가 존재하지 않습니다.";
		
		return isSend;
	}

	
	// ========================================================================================
	// ========================================================================================
	// 일정 데이터
	@RequestMapping(value = "user/memPlan", produces="application/json;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public List<MemberPlanVO> memberPlan(@RequestParam("userid") String userid,
											@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
											@RequestParam("startDate") LocalDateTime startDate,
											@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
											@RequestParam("endDate") LocalDateTime endDate, Model model) {
		logger.info("memPlan 호출 : " + userid + "(" + startDate + " ~ " + endDate + ")");
		
		return planService.selectByIt(userid, "userid", startDate, endDate);
	}
	
	@RequestMapping(value = "user/updatePlan", produces = "text/plain;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public String updatePlan(@RequestParam("userid") String userid, @RequestParam("id") int id,
								@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
								@RequestParam("startDate") LocalDateTime startDate,
								@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
								@RequestParam("endDate") LocalDateTime endDate, Model model) {
		logger.info("updatePlan 호출 : " + userid + "[" + id + "](" + startDate + " ~ " + endDate + ")");
		String isUpdate = "0";
		MemberPlanVO planVO = new MemberPlanVO();
		planVO.setUserid(userid);
		planVO.setId(id);
		planVO.setStart(startDate);
		planVO.setEnd(endDate);
		if(planService.updateByIt(planVO)) {
			isUpdate = "1";
		}
		
		return isUpdate;
	}
	
	@RequestMapping(value = "user/insertPlan", produces = "text/plain;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public String insertPlan(@ModelAttribute MemberPlanVO planVO,
								@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
								@RequestParam("startDate") LocalDateTime startDate,
								@DateTimeFormat(pattern = "yyyy-MM-dd HH:mm:ss")
								@RequestParam("endDate") LocalDateTime endDate, Model model) {
		logger.info("insertPlan 호출 : " + planVO + "(" + startDate + " ~ " + endDate + ")");
		String isInsert = "0";
		planVO.setStart(startDate);
		planVO.setEnd(endDate);
		if(planService.insert(planVO)) {
			isInsert = "1";
		}
		
		return isInsert;
	}

	@RequestMapping(value = "user/deletePlan", produces = "text/plain;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public String deletePlan(@RequestParam("userid") String userid, @RequestParam("id") int id, Model model) {
		logger.info("deletePlan 호출 : " + userid + "(" + id + ")");
		String isDelete = "0";
		if(planService.delete(userid, id)) {
			isDelete = "1";
		}
		
		return isDelete;
	}
	// ========================================================================================	
	// ========================================================================================
	// 파일업로드
	@RequestMapping(value = "file/profilePhoto", method = RequestMethod.POST)
	@ResponseBody
	public String profilePhoto(MultipartHttpServletRequest request) throws IOException {
		logger.info("profilePhoto 호출 : " + request);	
		String userid = getPrincipal();
		String realPath = request.getSession().getServletContext().getRealPath("/upload/");
		logger.info("파일 서버경로 : " + realPath);
		List<MultipartFile> files = request.getFiles("file");
		logger.info("files : " + files);
		if(files == null || files.size() == 0) {
			return "실패";
		}
		String savedName = "";
		for(MultipartFile file : files) {
			if(file!=null && file.getSize() > 0) {
				savedName = FileUploadUtil.uploadtoJson(userid, "profile", request, realPath, file.getOriginalFilename(), file.getBytes());
				MemberCodeVO codeVO = new MemberCodeVO();
				codeVO.setUserid(userid);
				codeVO.setPhoto(savedName);
				memberService.updateCode(codeVO);
			}
		}
		
		return savedName;
	}
	
	// ========================================================================================
	// ========================================================================================
	// 유저 페이지 데이터
	@RequestMapping(value = "mem/whoIsUser", produces="application/json;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public MemberVO whoIsUser() {
		logger.info("whoIsUser 호출");	
		String userid = getPrincipal();
		MemberVO vo = memberService.selectById(userid);
		return vo;
	}
	
	@RequestMapping(value = "mem/userCode", produces="application/json;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public MemberCodeVO userCode() {
		logger.info("userCode 호출");	
		String userid = getPrincipal();
		MemberCodeVO codeVO = null;
		if(!userid.equals("anonymousUser")) {
			codeVO = memberService.selectCodeByuserid(userid);
		}else {
			codeVO.setUserid(userid);
		}
		
		return codeVO;
	}
	
	@RequestMapping(value = "mem/whoIsIt", produces="application/json;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public MemberVO whoIsIt(@RequestParam("userid")String userid) {
		logger.info("whoIsIt 호출 : " + userid);	
		MemberVO vo = memberService.selectById(userid);
		return vo;
	}
	
	@RequestMapping(value = "mem/itUserCode", produces="application/json;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public MemberCodeVO itUserCode(@RequestParam("userid") String userid) {
		logger.info("itUserCode 호출 : " + userid);	
		MemberCodeVO codeVO = null;
		if(!userid.equals("anonymousUser")) {
			codeVO = memberService.selectCodeByuserid(userid);
		}else {
			codeVO.setUserid(userid);
		}
		return codeVO;
	}
	
	
	
	@RequestMapping(value = "mem/insSort", produces = "text/plain;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public String insSort(@ModelAttribute MemberSortVO sortVO) {
		logger.info("insSort 호출 : " + sortVO);
		String userid = getPrincipal();
		sortVO.setUserid(userid);
		String isInsert = "0";
		List<MemberSortVO> dbSortVO = memberService.selectSortByIt(sortVO);
		
		if(dbSortVO.isEmpty()) {
			if(memberService.insertSort(sortVO)) isInsert = "1";
		}else {
			if(memberService.updateSort(sortVO)) isInsert = "1";
		}
		return isInsert;
	}
	
	@RequestMapping(value = "mem/userSort", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public List<MemberSortVO> userSort() {
		logger.info("userSort 호출");
		String userid = getPrincipal();
		MemberSortVO sortVO = new MemberSortVO();
		sortVO.setUserid(userid);
		
		return memberService.selectSortByIt(sortVO);
	}
	
	@RequestMapping(value = "mem/findUser", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public List<MemberVO> findUser(@RequestParam("item") String item, @RequestParam("whatIs") String whatIs) {
		logger.info("findUser 호출 : (" + whatIs + ")" + item);
		List<MemberVO> list = null;
		if(whatIs.equals("id")) {
			list = new ArrayList<MemberVO>();
			MemberVO vo = memberService.selectById(item);
			list.add(vo);
		}else if(whatIs.equals("all")) {
			list = memberService.selectByAll(item);
		}else {
			list = memberService.selectByItem(item, whatIs);
		}
		
		return list;
	}
	
	
	// ========================================================================================
	// ========================================================================================
	// 친구 데이터
	@RequestMapping(value = "mem/myFriend", produces = "application/json;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public List<FriendVO> myFriend() {
		logger.info("myFriend 호출");
		String userid = getPrincipal();
		
		return friendService.selectById(userid);
	}
	
	@RequestMapping(value = "mem/insFriend", produces = "text/plain;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public String insFriend(@RequestParam("userid2") String userid2) {
		logger.info("insFriend 호출 : " + userid2);
		String isInsert = "0";
		String userid1 = getPrincipal();
		FriendVO fVO = new FriendVO();
		fVO.setUserid1(userid1);
		fVO.setUserid2(userid2);
		if(friendService.insert(fVO)) {
			isInsert = "1";
		}
		
		return isInsert;
	}
	
	@RequestMapping(value = "mem/FriendAlert", produces = "text/plain;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public String FriendAlert(@RequestParam("userid2") String userid2, @RequestParam("who")String who, @RequestParam("msg")String msg) {
		logger.info("FriendAlert 호출 : |" + userid2 + "| " + who + " => " + msg);
		String isUpdate = "0";
		String userid1 = getPrincipal();
		FriendVO fVO = new FriendVO();
		fVO.setUserid1(userid1);
		fVO.setUserid2(userid2);
		
		switch (who) {
			case "you":
				if(friendService.updateAlert(fVO, 4, msg)) {
					isUpdate = "1";
				}
				break;
			case "me":
				if(friendService.updateAlert(fVO, 0, msg)) {
					isUpdate = "1";
				}				
				break;
	
			default:
				logger.info("What should I do? : " + who);
				break;
		}
		
		return isUpdate;
	}
	@RequestMapping(value = "mem/upFriend", produces = "text/plain;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public String upFriend(@RequestParam("userid2") String userid2, @RequestParam("howTo")String howTo) {
		logger.info("upFriend 호출 : |" + userid2 + "| => " + howTo);
		String isUpdate = "0";
		String userid1 = getPrincipal();
		FriendVO fVO = new FriendVO();
		fVO.setUserid1(userid1);
		fVO.setUserid2(userid2);
		
		String comment = "";
		switch (howTo) {
			case "accept":
				comment = "신청을 수락하였습니다.";
				if(friendService.updateRel(fVO, 0, 1) && friendService.updateAlert(fVO, 4, comment)) {
					isUpdate = "1";
				}
				break;
			case "reject":
				comment = "신청을 거절하였습니다.";
				if(friendService.updateRel(fVO, 0, -1) && friendService.updateAlert(fVO, 4, comment)) {
					isUpdate = "1";
				}
				break;
			case "up":
				comment = "절친 신청이 왔습니다!";
				if(friendService.updateRel(fVO, 0, 1) && friendService.updateAlert(fVO, 4, comment)) {
					isUpdate = "1";
				}
				break;
			case "down":
				comment = "절친 신청을 해제하였습니다.";
				if(friendService.updateRel(fVO, 0, -1) && friendService.updateAlert(fVO, 4, comment)) {
					isUpdate = "1";
				}
				break;
	
			default:
				logger.info("What should I do? : " + howTo);
				break;
		}
		
		return isUpdate;
	}
	
	@RequestMapping(value = "mem/msgFriend", produces = "text/plain;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public String msgFriend(@RequestParam("userid2") String userid2, @RequestParam("msg") String msg) {
		logger.info("msgFriend 호출 : " + userid2 + " => \"" + msg + "\"");
		String isUpdate = "0";
		String userid1 = getPrincipal();
		FriendVO fVO = new FriendVO();
		fVO.setUserid1(userid1);
		fVO.setUserid2(userid2);
		if(friendService.updateAlert(fVO, 4, msg)) {isUpdate = "1"; }
		return isUpdate;
	}
	
	@RequestMapping(value = "mem/delFriend", produces = "text/plain;charset=UTF-8", method = RequestMethod.POST)
	@ResponseBody
	public String delFriend(@RequestParam("userid2") String userid2) {
		logger.info("delFriend 호출 : " + userid2);
		String isDelete = "0";
		String userid1 = getPrincipal();
		FriendVO fVO = new FriendVO();
		fVO.setUserid1(userid1);
		fVO.setUserid2(userid2);
		if(friendService.delete(fVO)) {
			isDelete = "1";
		}
		
		return isDelete;
	}
	
	
	
	
	// ========================================================================================
	// ========================================================================================
	// 인증메일
	private String makeCode(int way, int len) {
		String code = "";
		switch (way) {
		case 1:
			code = MakeOTPCode.makingNumCode(len);
			break;
		case 2:
			HashMap<String, String> authCodeMap = MakeOTPCode.makingWordCode(len);
			code = authCodeMap.get("code");
			code += " " + authCodeMap.get("word");
			break;
		case 3:
			code = MakeOTPCode.makingAnyCode(len);
			break;

		default:
			break;
		}
		
		return code;
	}
	
	private String wordToCode(String wordCode) {
		return MakeOTPCode.WordToCode(wordCode);
	}
	
	private String getAuthContent(String name, String authCode, int authNo) {
		StringBuffer sb = new StringBuffer();
		switch (authNo) {
		case 1:
			sb.append("환영합니다~~" + name + "님!!!<br>");
			sb.append("회원가입 진심으로 축하드립니다!<br>");
			break;

		case 2:
			sb.append(name + "님!!!<br>");
			sb.append("비밀번호를 잊으셨다고 해서 인증코드를 메일로 보내드렸습니다!<br>");
			break;

		case 3:
			sb.append(name + "님!!!<br>");
			sb.append("비밀번호를 잊으셨다고 해서 인증코드를 메일로 보내드렸습니다!<br>");
			break;

		default:
			break;
		}
		sb.append("다음 코드를 입력해주세요!!<br><br><br>");			
		//-----input태그--------------------------------------------------
		sb.append("<input type='text' style='border: 1px solid gray; width: 300px; height: 100px; text-align: center;'");
		sb.append(" background-color: #D8D8D8;'");
		sb.append(" value='" + authCode + "'");
		sb.append(" readonly='readonly'/>");
		//---------------------------------------------------------------

		sb.append("<br><br><br><br><br><br><hr><br>");			
		sb.append("혹시 ... 링크가 안보이시나요?<br>");			
		
		return sb.toString();
	}
	
	// ========================================================================================
	// security 사용자 정보 얻기 ==================================================================
	private String getPrincipal() {
		String userName = null;
		Object principal = SecurityContextHolder.getContext().getAuthentication().getPrincipal();
		if(principal instanceof UserDetails) {
			userName = ((UserDetails)principal).getUsername();
		} else {
			userName = principal.toString();
		}
		return userName;
	}
	// ========================================================================================
}
