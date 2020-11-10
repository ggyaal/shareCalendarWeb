<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>shareCal | 회원인증</title>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/main.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/ui.css">
</head>
<body>
	<h1>${vo.userid }님 어서오세요 인증번호를 입력해주세요</h1>
	<form action="authOk" method="post">
		<%-- security token --%>
		<input type="hidden" class="csrf_token" id="${_csrf.headerName }" name="${_csrf.parameterName}" value="${_csrf.token}" />
		<input type="text" name="useridM" value="${vo.userid }" readonly="readonly"/>
		<input type="text" id="authCode" name="authCode" placeholder="인증번호 입력" />
		<input type="text" class="alertInput" id="8" disabled="disabled"/><br />
		<button type="submit" disabled="disabled">인증하기</button>
	</form>
	<input type="hidden" name="codeNo" value="1"/>
	<button type="button" id="mailSender">인증번호 전송</button>
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