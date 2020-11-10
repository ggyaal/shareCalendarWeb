<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>shareCal | 회원정보 삭제</title>
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/signUpPage/main.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/main.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/ui.css">
	<!-- bootstrap datepicker link -->
	<link rel="stylesheet" href="https://stackpath.bootstrapcdn.com/bootstrap/4.3.1/css/bootstrap.min.css" >
	<link rel="stylesheet" href="${pageContext.request.contextPath }/resources/datePicker/css/bootstrap-datepicker.css"/>
	
</head>
<body>
	<!-- multistep form -->
	<form action="deleteMemOk" id="msform" method="post" onsubmit="return submitCheck();">
	  <%-- security token --%>
	  <input type="hidden" class="csrf_token" id="${_csrf.headerName }" name="${_csrf.parameterName}" value="${_csrf.token}" />
	  <!-- progressbar -->
	  <ul id="progressbar">
	    <li class="wi active">본인 확인</li>
	    <li class="wi">정보 확인</li>
	  </ul>
	  <!-- fieldsets -->
	  <fieldset class="one validate-field">
	    <h2 class="fs-title">본인 확인</h2>
	    <h3 class="fs-subtitle">(필수)비밀번호 입력</h3>

	    <div class="emptyData alert-validate" data-validate= "무언가를 입력해주세요!"></div>
	    <input type="hidden" id="whatGender" name="whatGender" value="${userCode.gender }" />
	    <input type="text" class="validate-input readOnly ra" id="userid" name="userid" value="${vo.userid }" readonly="readonly" placeholder="아이디"/>
	    <input type="password" onsubmit="return false;" class="validate-input" id="passwordR" name="passwordR" placeholder="비밀번호"/>
	    <input type="button" name="next" id="nextSubmit" class="next action-button disMsform" value="다음" />
	  </fieldset>
	  <fieldset class="two validate-field">
	    <h2 class="fs-title">삭제 확인</h2>
	    <h3 class="fs-subtitle">정보 확인</h3>
	    <div class="emptyData alert-validate" data-validate= "무언가를 입력해주세요!"></div>
	    <input type="text" class="validate-input readOnly" id="useridC" value="${vo.userid }" readonly="readonly" />
	    <input type="text" class="validate-input readOnly" id="name-nickName" value="${vo.name }(${vo.nickName })" readonly="readonly"/>
	    <br />
	    <input type="text" class="validate-alert disMsform" value="삭제하시겠습니까?" disabled="disabled"/>
	    <label class="checkLab">
	    <input type="checkbox" id="isDelCheck" class="validate-check disMsform"><span class="disMsform">OK</span>
	    </label>
	    <br />
	    <input type="button" name="previous" id="submitPrevious" class="previous action-button disMsform" value="이전" />
	    <input type="submit" name="submit" class="submit action-button disMsform disButton" value="삭제완료" disabled="disabled"/>
	  </fieldset>
	<!-- LoadingPage -->
	<div class="loadingPage showL" id="loadingPage">
		<span class="loading disMsform" id="loadingWin">
			<span class="loadingLogo disMsform" id="loadingLogo">
			  <span class="loadingLogoBg disMsform" id="loadingAni"></span>
			</span>   
			<span class="loadingLogoShadow disMsform" id="loadlogoShadow"></span>
			<input type="text" class="debugInput disMsform" value="회원정보 등록중입니다." disabled="disabled" />
		</span>
	</div>
	</form>
	<!-- jquery -->
	<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
	<!-- daum post -->
	<script src="https://t1.daumcdn.net/mapjsapi/bundle/postcode/prod/postcode.v2.js"></script>	
	<!-- jquery -->
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery/2.1.3/jquery.min.js"></script>
	<script src="https://cdnjs.cloudflare.com/ajax/libs/jquery-easing/1.3/jquery.easing.min.js"></script>

	<script src="${pageContext.request.contextPath }/resources/signUpPage/main.js"></script>
		<script src="${pageContext.request.contextPath }/resources/js/main.js"></script>
	<!-- bootstrap datepicker script -->
	<script src="${pageContext.request.contextPath }/resources/datePicker/js/bootstrap-datepicker.js"></script>
	<script src="${pageContext.request.contextPath }/resources/datePicker/locales/bootstrap-datepicker.ko.min.js"></script>
	<script type="text/javascript">
	
	</script>
</body>
</html>