<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>manager</title>
	<link href="${pageContext.request.contextPath }/resources/css/main.css">
	
	<!-- jquery -->
	<script src="https://code.jquery.com/jquery-3.2.1.js"></script>

	<script src="${pageContext.request.contextPath }/resources/js/main.js"></script>
</head>
<body>
	<h1>MANAGER 전용 페이지</h1>
	<c:if test="${not empty vo }">
		<h2>${vo.nickName }(${vo.name })/RANK ${vo.rank }님 환영합니다!</h2>
		<button id="shift_main">메인으로 돌아가기</button>		
	</c:if>
	<c:if test="${empty vo }">
		<h2>로그인이 필요합니다!</h2>
		
		<button id="shift_login">로그인</button>
	</c:if>
</body>
</html>