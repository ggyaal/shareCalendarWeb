<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8" %>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>shareCal | 회원가입</title>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/main.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/ui.css">
</head>
<body>
	<c:if test='${msg eq "success"}'>
		<input type="hidden" name="userid" value="${userid }"/>
		가입하신 걸 축하드립니다!<br>
		이메일의 인증확인 버튼을 누르셔야 최종적으로 가입이 가능합니다!<br>
		가입하신 아이디로 인증 이메일을 받고 인증 부탁드립니다!<br>
		<button type="button" id="authSend">인증번호 전송</button>
		<a href="http://www.${emailAddr }">가입하신 이메일로 가기</a>
		<a href="login">로그인하러 가기</a>
	</c:if>
	<c:if test='${msg eq "error"}'>
		이런!<br>
		${msg }<br>
		왜 그런지 한번 알아봅시다.<br>
		
	</c:if>
	
	
	
	<!-- LoadingPage -->
	<div class="loadingPage" id="loadingPage">
		<span class="loading disMsform" id="loadingWin">
			<span class="loadingLogo disMsform" id="loadingLogo">
			  <span class="loadingLogoBg disMsform" id="loadingAni"></span>
			</span>   
			<span class="loadingLogoShadow disMsform" id="loadlogoShadow"></span>
			<input type="text" class="debugInput disMsform" value="회원정보 등록중입니다." disabled="disabled" />
		</span>
	</div>
	<!-- jquery -->
	<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
	<script src="${pageContext.request.contextPath }/resources/js/main.js"></script>
</body>
</html>