<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>shareCal | 회원인증</title>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/main.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/ui.css">

</head>
<body>
<c:if test="${not empty userid }"> 
	<script type="text/javascript">
		alert("${userid}님!!\n정상적으로 인증되었습니다!");
		var count = 5;
		setInterval(function() {
			$(".alertCount").val(count);
			if(count == 0) location.href='/shareCal/logout';
			count--;
		}, 1000);
	</script>	
	<img src="${pageContext.request.contextPath }/resources/images/welcome.png" alt="welcome" />
	<br />
	<input type="text" class="alertCount" disabled="disabled"/>초 후에 자동으로 로그아웃 됩니다.
</c:if>
<c:if test="${empty userid }"> 
	<script type="text/javascript">
		alert("인증에 실패하였습니다!\n이메일을 다시 확인해주세요!");
	</script>	
	<img src="${pageContext.request.contextPath }/resources/images/fail.png" alt="fail" />
	${msg }
	<button id="shift_main">메인화면</button>
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