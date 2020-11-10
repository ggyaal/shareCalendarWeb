<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>shareCal | 메인</title>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/main.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/ui.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/indexPage/css/main.css">

</head>
<body>
	<div class="bg-100">
		<div class="bg-image100" style="background-image: url('${pageContext.request.contextPath }/resources/loginPage/images/bg-01.jpg');">
			<div class="bgboard100">
				<h1>메인 화면입니다!</h1>
				<c:if test="${not empty vo }">
					<h2>${vo.nickName }(${vo.name })/LV ${vo.lv }님 환영합니다!</h2>
					<c:if test="${not empty auth }">
						인증이 필요합니다.
						<button id="shift_Auth">인증하러가기</button> <br />						
					</c:if>
					<button id="shift_UpdateMem">정보 수정</button>		
					<button id="shift_DeleteMem">회원 탈퇴</button>		
					<button id="shift_logout">로그아웃</button>		
					<hr />
					<button id="shift_Cal">캘린더</button> <br />	
					<button id="shift_mvp">MVP</button> <br />	
					<button id="shift_op">OPERATOR</button> <br />	
					<button id="shift_mn">MANAGER</button> <br />			
				</c:if>
				<c:if test="${empty vo }">
					<h2>로그인이 필요합니다!</h2>
					
					<button id="shift_login">로그인</button>
				</c:if>
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

</body>
</html>