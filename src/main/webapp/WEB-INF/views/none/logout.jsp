<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>shareCal | 로그아웃</title>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/main.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/ui.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/indexPage/css/main.css">
	

</head>
<body>
	<div class="bg-100">
		<div class="bg-image100" style="background-image: url('${pageContext.request.contextPath }/resources/loginPage/images/bg-01.jpg');">
			<div class="bgboard100">
				<c:if test="${not empty msg }">
					<input type="text" id="alertInput" value="${msg }" readonly="readonly"/>
				</c:if>
				<h1>로그아웃되었습니다! 다시 로그인 해주세요 !</h1>
					<button id="shift_main">메인으로 가기</button>
			</div>
		</div>
	</div>





	
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
	<script type="text/javascript">
		$(document).ready(function() {
			$.ajax("logout", {
				
			});
		});
	</script>
</body>
</html>