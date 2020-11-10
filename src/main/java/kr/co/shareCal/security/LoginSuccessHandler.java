package kr.co.shareCal.security;

import java.io.IOException;

import javax.servlet.ServletException;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.security.core.Authentication;
import org.springframework.security.web.authentication.AuthenticationSuccessHandler;

import kr.co.shareCal.dao.MemberDAO;
import kr.co.shareCal.vo.MemberVO;
import lombok.Data;
import lombok.extern.slf4j.Slf4j;

@Data
@Slf4j
public class LoginSuccessHandler implements AuthenticationSuccessHandler {
	@Autowired
	private MemberDAO memberDAO;
	private String successUrl;

	@Override
	public void onAuthenticationSuccess(HttpServletRequest request, HttpServletResponse response,
			Authentication authentication) throws IOException, ServletException {
		log.debug("##########################LoginSuccessHandler 실행됨###############################");
		// 여기서는 회원 정보를 읽어서 세션에 저장하기
		// 아이디 받기
		String userid = request.getParameter("userid");
		// 아이디로 회원정보 얻기
		log.debug("LoginSuccessHandler userid : " + userid);
		MemberVO vo = memberDAO.selectById(userid);
		log.debug("LoginSuccessHandler vo : " + vo);
		if(vo!=null) request.getSession().setAttribute("memberVO", vo);
		// 어딘가로 이동
		log.debug("##################################################################################");
		response.sendRedirect(successUrl);
	}

}
