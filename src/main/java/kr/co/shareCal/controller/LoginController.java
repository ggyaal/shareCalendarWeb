package kr.co.shareCal.controller;

import java.text.ParseException;
import java.text.SimpleDateFormat;
import java.util.Date;
import java.util.HashMap;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.security.web.authentication.logout.SecurityContextLogoutHandler;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.ui.ModelMap;
import org.springframework.web.bind.annotation.ModelAttribute;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;

import kr.co.shareCal.HomeController;
import kr.co.shareCal.service.member.MemberService;
import kr.co.shareCal.vo.MemberCodeVO;
import kr.co.shareCal.vo.MemberVO;

@Controller
public class LoginController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	@Autowired
	private MemberService memberService;
	
	//===============================================================================================
	//=================|NONE|========================================================================
	
	@RequestMapping(value = {"/", "/index"})
	public String index(Model model) {
		logger.info("/index 호출 ");
		String principal = getPrincipal();
		MemberVO vo = memberService.selectById(principal);
		if(vo!=null && vo.getLv() == 0) model.addAttribute("auth", "none"); // Lv로 인증상태 구분
		if(vo!=null) {
			logger.info("in code");
			MemberCodeVO codeVO = memberService.selectCodeByuserid(vo.getUserid());
			SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
			String birth = null;
			String regDate = null;
			if(codeVO.getBirth()!=null) birth = sdf.format(codeVO.getBirth());
			if(codeVO.getRegDate()!=null) regDate = sdf.format(codeVO.getRegDate());
			model.addAttribute("userCode", codeVO);
			model.addAttribute("birth", birth);
			model.addAttribute("regDate", regDate);				
		}
		model.addAttribute("vo", vo);
		return "none/index";
	}

//	@RequestMapping(value = "/login", method = RequestMethod.GET)
//	public String login(Model model) {
//		logger.info("/login 호출 ");
//		model.addAttribute("user", getPrincipal());
//		return "none/login";
//	}
//
//	@RequestMapping(value = "/signUp", method = RequestMethod.GET)
//	public String signUp(Model model) {
//		logger.info("/signUp 호출 ");
//		model.addAttribute("user", getPrincipal());
//		
//		return "none/signUp";
//	}

	@RequestMapping(value = "/{name}")
	public String name(@PathVariable("name") String name, ModelMap model) {
		logger.info("/"+ name +" 호출");
		String principal = getPrincipal();
		MemberVO vo = memberService.selectById(principal);
		if("updateMem".contains(name)) {  // code가 필요한 페이지는 데이터 넘기기
			if(vo!=null) {
				logger.info("in code");
				MemberCodeVO codeVO = memberService.selectCodeByuserid(vo.getUserid());
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				String birth = null;
				String regDate = null;
				if(codeVO.getBirth()!=null) birth = sdf.format(codeVO.getBirth());
				if(codeVO.getRegDate()!=null) regDate = sdf.format(codeVO.getRegDate());
				model.addAttribute("userCode", codeVO);
				model.addAttribute("birth", birth);
				model.addAttribute("regDate", regDate);				
			} else {
				logger.info("로그인이 되어있지 않습니다.");
				model.addAttribute("msg", "로그인이 되어 있지 않습니다.");
				name = "index";
			}
		}
		if(vo!=null && vo.getLv() == 0) model.addAttribute("auth", "none"); // Lv로 인증상태 구분
		model.addAttribute("vo", vo);
		return "none/" + name;
	}

	@RequestMapping(value = "/logout", method = RequestMethod.GET)
	public String logoutPage(HttpServletRequest request, HttpServletResponse response) {
		Authentication auth = SecurityContextHolder.getContext().getAuthentication();
		if (auth != null) {
			new SecurityContextLogoutHandler().logout(request, response, auth);
		}
		return "redirect:/";
	}
	//===============================================================================================
	//===============================================================================================

	//===============================================================================================
	//=================|MEMBER|======================================================================
	@RequestMapping(value = "/welcome", method = RequestMethod.GET)
	public String mem(Model model) {
		logger.info("/welcome 호출 : " + getPrincipal());
		model.addAttribute("user", getPrincipal());
		return "mem/welcome";
	}

	@RequestMapping(value = "user/{name}")
	public String nameOk(@PathVariable("name") String name, ModelMap model) {
		logger.info("user/"+ name +" 호출");
		MemberVO vo = null;
		String principal = getPrincipal();
		if(principal!=null) vo = memberService.selectById(principal);
		model.addAttribute("vo", vo);
		return "mem/" + name;
	}
	//===============================================================================================
	//===============================================================================================

	//===============================================================================================
	//=================|ROLE_MVP|====================================================================
	@RequestMapping(value = "mvp/{name}")
	public String nameMVP(@PathVariable("name") String name, ModelMap model) {
		logger.info("mvp/"+ name +" 호출");
		MemberVO vo = null;
		String principal = getPrincipal();
		if(principal!=null) vo = memberService.selectById(principal);
		model.addAttribute("vo", vo);
		return "mvp/" + name;
	}
	
	//===============================================================================================
	//===============================================================================================

	//===============================================================================================
	//=================|ROLE_MEMBER|=================================================================
	@RequestMapping(value = "op/{name}")
	public String nameMEM(@PathVariable("name") String name, ModelMap model) {
		logger.info("op/"+ name +" 호출");
		MemberVO vo = null;
		String principal = getPrincipal();
		if(principal!=null) vo = memberService.selectById(principal);
		model.addAttribute("vo", vo);
		return "operator/" + name;
	}
	
	//===============================================================================================
	//===============================================================================================

	//===============================================================================================
	//=================|ROLE_ADMIN|=====================================================================
	@RequestMapping(value = "mn/{name}")
	public String nameAD(@PathVariable("name") String name, ModelMap model) {
		logger.info("mn/"+ name +" 호출");
		MemberVO vo = null;
		String principal = getPrincipal();
		if(principal!=null) vo = memberService.selectById(principal);
		model.addAttribute("vo", vo);
		return "manager/" + name;
	}
	
	//===============================================================================================
	//===============================================================================================

	//===============================================================================================
	//=================|logic|=======================================================================
	@RequestMapping(value = "/signUpOk", method = RequestMethod.POST)
	public String signUpOkPost(@ModelAttribute MemberVO vo,@ModelAttribute MemberCodeVO codeVO,@RequestParam String birthStr,@RequestParam String userid2, Model model) {
		logger.info("/signUpPost 호출 " + vo + codeVO + birthStr);
		Date birth = null;
		if(birthStr!=null) {
			try {
				SimpleDateFormat sdf = new SimpleDateFormat("yyyy-MM-dd");
				birth = sdf.parse(birthStr);
				codeVO.setBirth(birth);
				logger.info("birthpasing " +birth);
			} catch (ParseException e) {
				logger.info("DateParsing 오류 !! " + birthStr + " : " + birth);
			}
			codeVO.setBirth(birth);
		}
		logger.info(codeVO.getPhoneNo() + " : " + codeVO.getZipCode() + " : " + codeVO.getAddr1() + " : " + codeVO.getAddr2());
		vo.setMemberCode(codeVO);
		if(memberService.insert(vo)) {
			model.addAttribute("msg", "success");
			model.addAttribute("userid", vo.getUserid());
			model.addAttribute("emailAddr", userid2);
		}else model.addAttribute("msg", "error");
		return "none/signUpOk";
	}
		
	@RequestMapping(value = "/LvUP" , method = RequestMethod.POST)
	public String LvUP(@RequestParam("userid")String userid, Model model) {
		logger.info("/LvUP 호출 : " + userid);
		userid = userid.replace("%40", "@");
		if(memberService.updateByLv(userid)) logger.info("~~" + userid + "님은 Lv+1이 되었습니다! ~~ ");	
		return "none/login";
	}
	
	@RequestMapping(value = "/authOk" , method = RequestMethod.POST)
	public String authOk(@RequestParam("useridM")String userid,@RequestParam("authCode")String authCode, Model model) {
		logger.info("/authOk 호출 : " + userid + " : " + authCode);
		HashMap<String, String> dbAuthCodeMap = memberService.selectAuthCode(userid, 1);
		logger.info("/authOk 호출 db : " + dbAuthCodeMap);
		if(!dbAuthCodeMap.get("AUTHCODE").equals("not_matchCode")){
			if(dbAuthCodeMap.get("AUTHCODE").equals(authCode)) {
				if(memberService.updateAuth(userid, 1)) {
					logger.info("~~" + userid + "님 인증되었습니다~~ ");
					if(memberService.updateByLv(userid)) logger.info("~~ " + userid + "님은 Lv 1이 되었습니다! ~~ ");
					memberService.deleteAuthCode(userid, 1);
					model.addAttribute("userid", userid);
				} else { logger.info("~~auth 수정 실패~~ "); }	
			} else { 
				logger.info("~~인증번호가 틀렸습니다~~ ");
				memberService.updateAuthCode(userid, 1, authCode, 1);
				int count = Integer.valueOf(dbAuthCodeMap.get("WCOUNT")) + 1;
				model.addAttribute("msg", count == 5? "5번 틀려 삭제되었습니다. 다시 이메일을 보내세요." : count + "번 틀렸습니다.(5회 틀릴 경우 코드삭제)");
			}
		}else {
			logger.info("~~인증번호가 없습니다~~ ");
			model.addAttribute("msg", "인증코드를 먼저 받아주세요.");
			
		}
		return "none/authOk";
	}
	
//	@RequestMapping(value = "/{doing}Mem")
//	public String member(@PathVariable String doing, @ModelAttribute MemberVO vo, Model model) {
//		logger.info(doing + "호출 : " + vo);
//		model.addAttribute("vo", vo);
//		return "none/" + doing + "Mem";
//	}
	
	@RequestMapping(value = "{doing}MemOk", method = RequestMethod.POST)
	public String updateMem(@PathVariable("doing") String doing,@ModelAttribute MemberVO vo, @ModelAttribute MemberCodeVO codeVO, Model model) {
		logger.info(doing + "MemOk 호출 : " + vo + codeVO);
		// -------- userVO ---------------------------------------
		String principal = getPrincipal();
		MemberVO userVO = memberService.selectById(principal);
		// -------- userVO ---------------------------------------
		String msg = "실패";
		if(doing.equals("update")) {
			vo.setMemberCode(codeVO);
			if(memberService.updateByAll(userVO, vo)) {
				msg = "수정 성공";
			}
		}else if(doing.equals("delete")) {
			if(memberService.delete(userVO.getUserid())) {
				msg = "삭제 성공";
			}
		}else if(doing.equals("updatePass")) {
			
		}else if(doing.equals("updateNick")) {
			memberService.updateByAll(userVO, vo);
		}
		model.addAttribute("msg", msg);
		return "none/logout";
	}
	
	
	//===============================================================================================
	//===============================================================================================

	//===============================================================================================
	//=================|Access|=======================================================================
	@RequestMapping(value = "/403")
	public String error403(Model model) {
		logger.info("/403 호출 : ");
		String principal = getPrincipal();
		MemberVO vo = memberService.selectById(principal);
		if(vo!=null && vo.getLv() == 0) model.addAttribute("auth", "none"); // Lv로 인증상태 구분
		model.addAttribute("vo", vo);
		return "none/403";
	}
	
	@RequestMapping(value = {"/{name}UP", "/{name}Ok", "{name}Check", "send{name}"} , method = RequestMethod.GET)
	public String LvUPGet(@PathVariable String name, Model model) {
		logger.info("/" + name + " : Get 호출 ");
		logger.info("잘못된 접근입니다.");	
		return "redirect:/";
	}
	
	@RequestMapping(value = "/failLogin", method = RequestMethod.GET)
	public String failLogin(Model model) {
		logger.info("/failLogin 호출 ");
		model.addAttribute("failLogin", "로그인 실패!");
		return "none/login";
	}
	
	//===============================================================================================
	//===============================================================================================

	
	// ========================================================================================
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
