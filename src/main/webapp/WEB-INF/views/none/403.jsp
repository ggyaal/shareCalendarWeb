<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title> | 403 |</title>
	
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/main.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/ui.css">

</head>
<body>
	<h1>접근 금지 403!!!!!!!!!!!!!!!!</h1>
	<c:if test="${not empty vo }">
		<h2>${vo.nickName }(${vo.name })/LV ${vo.lv }님은 접근권한이 없습니다.</h2>
		<button id="shift_main">메인으로 돌아가기</button>		
	</c:if>
	<c:if test="${empty vo }">
		<h2>로그인이 필요합니다!</h2>
		
		<button id="shift_login">로그인</button>
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