<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
	<title>shareCal | 회원가입</title>
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
<!-- bootstrap datepicker link -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" >
	<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/datePicker/css/bootstrap-datepicker.css"/>
<!-- jquery -->
	<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
<!-- daum post -->
	<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>
	<script type="text/javascript">
	$(function() {
		// 우편번호 검색 띄우기
		var daumPost = function(){
			new daum.Postcode({
	            oncomplete: function(data) {
	                $("#zipCode").val(data.zonecode);
	                $("#addr1").val(data.roadAddress);
	                $("#addr2").focus();
	            }
	        }).open();
		}
		$("#zipCode").click(daumPost);
		$("#addr1").click(daumPost);
		
		$('#birthStr').datepicker({
			format: "yyyy-mm-dd",
			autoclose : true,
			templates : {
			        leftArrow: '&laquo;',
			        rightArrow: '&raquo;'
			},
			showWeekDays : true ,
			todayHighlight : true ,
			toggleActive : true,
			language : "ko"			
		});
		
	});
	</script>
</head>
<body>
	
	<div class="limiter">
		<div class="container-login100" style="background-image: linear-gradient(rgba(40, 102, 250, 0.6), rgba(200, 9, 182, 0.6));">
			<div class="wrap-login100 p-l-55 p-r-55 p-t-65 p-b-54">
				<form action="signUpOk" id="signUpForm" class="login100-form validate-form" method="post" onsubmit="return formCheck();">
					<%-- security token --%>
					<input type="hidden" name="${_csrf.parameterName}" value="${_csrf.token}" />
					<span class="login100-form-title p-b-49">
						회원가입
					</span>

					<div class="wrap-input100 validate-input m-b-23" data-validate = "아이디를 입력해주세요!">
						<span class="label-input100">이메일 아이디*</span>
						<input class="input100" type="text" id="userid" name="userid" placeholder="이메일아이디">
						<span class="focus-input100" data-symbol="&#xf206;"></span>
					</div>

					<div class="wrap-input100 validate-input m-b-23" data-validate="비밀번호를 입력해주세요!">
						<span class="label-input100">비밀번호*</span>
						<input class="input100" type="password" name="password" placeholder="비밀번호">
						<span class="focus-input100" data-symbol="&#xf190;"></span>
					</div>
					
					<div class="wrap-input100 validate-input m-b-23" data-validate="비밀번호확인을 입력해주세요!">
						<span class="label-input100">비밀번호 확인*</span>
						<input class="input100" type="password" name="passwordCheck" placeholder="비밀번호 확인">
						<span class="focus-input100" data-symbol="&#xf190;"></span>
					</div>
					
					<div class="wrap-input100 validate-input m-b-23" data-validate = "이름을 입력해주세요!">
						<span class="label-input100">이름*</span>
						<input class="input100" type="text" name="name" placeholder="이름">
						<span class="focus-input100" data-symbol="&#xf110;"></span>
					</div>
					
					<div class="wrap-input100 validate-input m-b-23" data-validate = "별명을 입력해주세요!">
						<span class="label-input100">별명*</span>
						<input class="input100" type="text" name="nickName" placeholder="별명">
						<span class="focus-input100" data-symbol="&#xf110;"></span>
					</div>
					
					<div class="wrap-input100 validate-input m-b-23">
						<span class="label-input100">휴대폰 번호</span>
						<input class="input100-nullok" type="text" name="phoneNo" placeholder="휴대폰 번호">
						<span class="focus-input100" data-symbol="&#xf110;"></span>
					</div>
					
					<div class="wrap-input100 validate-input m-b-23">
						<span class="label-input100">생년월일</span>
						<input class="input100-nullok" type="text" id="birthStr" name="birthStr" placeholder="생년월일" readonly="readonly">
						<span class="focus-input100" data-symbol="&#xf110;"></span>
					</div>

					<div class="wrap-input70 validate-input m-b-23">
						<span class="label-input80">주소</span>
						<input class="input100-nullok" type="text" id="addr1" name="addr1" placeholder="주소" readonly="readonly">
						<span class="focus-input100" data-symbol="&#xf201;"></span>						
					</div>
					
					<div class="wrap-input20 validate-input m-b-23">
						<span class="label-input80">우편번호</span>
						<input class="input100-nullok" type="text" id="zipCode" name="zipCode" placeholder="우편번호" readonly="readonly">
						<span class="focus-input100" data-symbol="&#xf201;"></span>						
					</div>
				
					<div class="wrap-input100 validate-input m-b-23">
						<span class="label-input100">상세 주소</span>
						<input class="input100-nullok" type="text" id="addr2" name="addr2" placeholder="나머지 주소">
						<span class="focus-input100" data-symbol="&#xf201;"></span>
					</div>

					<div class="wrap-input100 nonbar validate-input m-b-23">
						<span class="label-input100">성별</span>
						<span class="m-l-20" >
							<input type="radio" id="m" name="gender" value="m" checked="checked">
							남
							<input type="radio" id="w" name="gender" value="w">
							여
						</span>
					</div>
					
					<div class="text-right p-t-8 p-b-31">

					</div>
					
					<div class="container-login100-form-btn">
						<div class="wrap-login100-form-btn">
							<div class="login100-form-bgbtn"></div>
							<button class="login100-form-btn" type="submit" form="signUpForm">
								Sign Up!
							</button>
						</div>
					</div>

					<div class="txt1 text-center p-t-54 p-b-20">
					</div>

					<div class="flex-col-c p-t-155">
						<a href="login" class="txt2">
							뒤로가기
						</a>
					</div>
				</form>
			</div>
		</div>
	</div>
	

	<div id="dropDownSelect1"></div>
	
	
	
	
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
<!-- bootstrap datepicker script -->
	<script src="${pageContext.request.contextPath }/resources/datePicker/js/bootstrap-datepicker.js"></script>
	<script src="${pageContext.request.contextPath }/resources/datePicker/locales/bootstrap-datepicker.ko.min.js"></script> 

</body>
</html>