package kr.co.shareCal.controller;

import org.slf4j.Logger;
import org.slf4j.LoggerFactory;
import org.springframework.security.core.context.SecurityContextHolder;
import org.springframework.security.core.userdetails.UserDetails;
import org.springframework.stereotype.Controller;

import kr.co.shareCal.HomeController;

@Controller
public class AuthController {
	
	private static final Logger logger = LoggerFactory.getLogger(HomeController.class);
	
	
	
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
