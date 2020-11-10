<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
	<title>shareCal | 로그인</title>
	<meta charset="UTF-8">
	<meta name="viewport" content="width=device-width, initial-scale=1">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/main.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/ui.css">
<!-- google font 추가 -->
	<link href="https://fonts.googleapis.com/css2?family=Gugi&display=swap" rel="stylesheet">
<!--===============================================================================================-->	
	<link rel="icon" type="image/png" href="${pageContext.request.contextPath }/resources/loginPage/images/icons/favicon.ico"/>
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/loginPage/vendor/bootstrap/css/bootstrap.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/loginPage/fonts/font-awesome-4.7.0/css/font-awesome.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/loginPage/fonts/iconic/css/material-design-iconic-font.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/loginPage/vendor/animate/animate.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/loginPage/vendor/css-hamburgers/hamburgers.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/loginPage/vendor/animsition/css/animsition.min.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/loginPage/vendor/select2/select2.min.css">
<!--===============================================================================================-->	
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/loginPage/vendor/daterangepicker/daterangepicker.css">
<!--===============================================================================================-->
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/loginPage/css/util.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/loginPage/css/main.css">
<!--===============================================================================================-->
</head>
<body>
	
	<div class="limiter">
		<div class="container-login100" style="background-image: linear-gradient(rgba(40, 102, 250, 0.6), rgba(200, 9, 182, 0.6));">
			<div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
				<c:if test="${not empty failLogin }"> 
					<script type="text/javascript">
						alert("${failLogin}\n아이디와 비밀번호를 확인해주세요!");
						location.href = "${pageContext.request.contextPath }/login";
					</script>	
				</c:if>
				<form action="login" class="login100-form validate-form" method="post">
					<%-- security token --%>
					<input type="hidden" class="csrf_token" id="${_csrf.headerName }" name="${_csrf.parameterName}" value="${_csrf.token}"/>
					<span class="login100-form-title p-b-49">
						로그인
					</span>

					<div class="wrap-input100 validate-input m-b-23" data-validate = "아이디를 입력해주세요!">
						<span class="label-input100">이메일 아이디</span>
						<input class="input100" type="text" name="userid" placeholder="이메일아이디">
						<span class="focus-input100" data-symbol="&#xf206;"></span>
					</div>

					<div class="wrap-input100 validate-input" data-validate="비밀번호를 입력해주세요!">
						<span class="label-input100">비밀번호</span>
						<input class="input100" type="password" name="password" placeholder="비밀번호">
						<span class="focus-input100" data-symbol="&#xf190;"></span>
					</div>
					
					<div class="text-right p-t-8 p-b-31">
						<span class="findPass">
							비밀번호를 잃어버리셨나요?
						</span>
					</div>
					
					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn" onsubmit="return true;">
								Login
							</button>
						</div>
					</div>

					<div class="flex-col-c p-t-155">
						<span class="txt1 p-b-17">
							회원이 아닌가요?
						</span>

						<a href="signUp" class="txt2">
							회원가입
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
	

	<div id="dropDownSelect1"></div>
	
	<!-- Find password modal -->
	<div class="modalPage hide-it" id="modalPage">
		<fieldset class="modal-01" id="act">
			<span class="modalTitle">아이디 찾기(이메일 발송)</span>
			<span class="modalDocs disMsform p-l-55 p-r-55 p-t-65 p-b-54" style="height: 300px;">
				<span class="wrap-input100 validate-input m-b-23" id="blockSpan" data-validate = "아이디를 입력해주세요!">
					<span class="label-input100">이메일 아이디</span>
					<input class="input100" type="text" name="useridM" placeholder="이메일아이디">
					<span class="focus-input100" data-symbol="&#xf206;"></span>
				</span>
				<input type="text" class="debugInput ii isRightF" disabled="disabled"/>
				<span class="buttonCon">
					<input type="hidden" name="codeNo" value="2"/>
					<input type="button" class="bigActBtn" id="mailSender" value="메일전송"/>
					<input type="button" class="bRadius" id="calcelModal" value="취소"/>
					<input type="button" class="nextModal rRadius nmb" id="nextModal" value="다음"/>
				</span>
			</span>
		</fieldset>
		<fieldset class="modal-02">
			<span class="modalTitle">인증코드 입력</span>
			<span class="modalDocs disMsform p-l-55 p-r-55 p-t-65 p-b-54" style="height: 300px;">
				<span class="wrap-input100 validate-input m-b-23" id="blockSpan" data-validate = "인증코드를 입력해주세요!">
					<span class="label-input100">인증코드</span>
					<input class="input100" type="text" name="wordCode" placeholder="인증코드">
					<span class="focus-input100" data-symbol="&#xf110;"></span>
				</span>
				<input type="text" class="alertInput ii isRightF" disabled="disabled"/>
				<span class="buttonCon">
					<input type="button" class="bigActBtn" id="authOkBtn" value="인증하기"/>
					<input type="button" class="previousModal bRadius" id="previousModal" value="이전"/>
					<input type="button" class="nextModal rRadius nmb" id="nextModal" value="다음"/>
				</span>
			</span>
		</fieldset>
		<fieldset class="modal-03">
			<span class="modalTitle">비밀번호 변경</span>
			<span class="modalDocs disMsform p-l-55 p-r-55 p-t-25 p-b-54" style="height: 360px;">
				<span class="wrap-input100 validate-input m-b-23" id="blockSpan" data-validate = "비밀번호를 입력해주세요!">
					<span class="label-input100">비밀번호</span>
					<input class="input100" type="password" name="passwordM" placeholder="비밀번호">
					<span class="focus-input100" data-symbol="&#xf190;"></span>
				</span>
				<span class="wrap-input100 validate-input m-b-23" id="blockSpan" data-validate = "비밀번호 확인을 입력해주세요!">
					<span class="label-input100">비밀번호 확인</span>
					<input class="input100" type="password" name="passwordC" placeholder="비밀번호 확인">
					<span class="focus-input100" data-symbol="&#xf190;"></span>
				</span>
				<input type="text" class="debugInput ii isRightF" disabled="disabled"/>
				<span class="buttonCon">
					<input type="button" class="bigActBtn" id="passChange" value="변경하기"/>
					<input type="button" class="previousModal bRadius" id="previousModal" value="이전"/>
					<input type="button" class="nextModal rRadius nmb" id="nextModal" value="다음"/>
				</span>
			</span>
		</fieldset>
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
	
	<!-- alertPage -->
	<div class="loadingPage hide-it" id="alertPage">
		<span class="alertWin disMsform p-l-35 p-r-35 p-t-35 p-b-35" id="alertWin">
			<span class="alertContent">
			 	<input type='hidden' id='whatAlert' value='' />
			</span>
			<span class="buttonBorder">
				<button type="button" class="alertCancel">취소</button>
				<button type="button" class="alertOk">확인</button>
			</span>
		</span>
	</div>
	
	
<!-- jquery -->
	<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
	<script src="${pageContext.request.contextPath }/resources/js/main.js"></script>
<!--===============================================================================================-->
	<script src="${pageContext.request.contextPath }/resources/loginPage/vendor/jquery/jquery-3.2.1.min.js"></script>
<!--===============================================================================================-->
	<script src="${pageContext.request.contextPath }/resources/loginPage/vendor/animsition/js/animsition.min.js"></script>
<!--===============================================================================================-->
	<script src="${pageContext.request.contextPath }/resources/loginPage/vendor/bootstrap/js/popper.js"></script>
	<script src="${pageContext.request.contextPath }/resources/loginPage/vendor/bootstrap/js/bootstrap.min.js"></script>
<!--===============================================================================================-->
	<script src="${pageContext.request.contextPath }/resources/loginPage/vendor/select2/select2.min.js"></script>
<!--===============================================================================================-->
	<script src="${pageContext.request.contextPath }/resources/loginPage/vendor/daterangepicker/moment.min.js"></script>
	<script src="${pageContext.request.contextPath }/resources/loginPage/vendor/daterangepicker/daterangepicker.js"></script>
<!--===============================================================================================-->
	<script src="${pageContext.request.contextPath }/resources/loginPage/vendor/countdowntime/countdowntime.js"></script>
<!--===============================================================================================-->
	<script src="${pageContext.request.contextPath }/resources/loginPage/js/main.js"></script>

</body>
</html>