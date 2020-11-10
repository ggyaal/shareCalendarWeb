<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1">
<title>ShareCal | 메인</title>
    <!-- jQuery UI -->
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/main.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/ui.css?after">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/icon.css">
	<link rel="stylesheet" type="text/css" href="${pageContext.request.contextPath }/resources/css/util.css">
	<!-- calendar -->
    <link rel="stylesheet" href="${pageContext.request.contextPath }/resources/calPage/vendor/css/fullcalendar.min.css" />
    <link rel="stylesheet" href="${pageContext.request.contextPath }/resources/calPage/vendor/css/bootstrap.min.css">
    <link rel="stylesheet" href='${pageContext.request.contextPath }/resources/calPage/vendor/css/select2.min.css' />
    <link rel="stylesheet" href='${pageContext.request.contextPath }/resources/calPage/vendor/css/bootstrap-datetimepicker.min.css' />
    <link rel="stylesheet" href="${pageContext.request.contextPath }/resources/calPage/css/main.css">
</head>
<body>
	<input type='hidden' id='userid' value='${vo.userid }' />
	<input type='hidden' id='name' value='${vo.name }' />
	<input type='hidden' id='nickName' value='${vo.nickName }' />
	<div class="main-page">
		<%-- security token --%>
		<input type="hidden" class="csrf_token" id="${_csrf.headerName }" name="${_csrf.parameterName}" value="${_csrf.token}" />
		<div class="main-header">
			<div class="main-logo f-l" id="main-logo">logo</div>
			<div class="main-menu f-r"><span id="menu-setting" class="material-icons lh-1-3 op-0-7">settings</span></div>
			<div class="main-menu f-r" id="min-user"><span id="menu-user" class="material-icons lh-1-3 op-0-7">account_circle</span></div>
			<div class="main-menu f-r"><span id="menu-noti" class="material-icons lh-1-3 op-0-7">notifications</span></div>
			<div class='menu-alert hide-it'></div>
		</div>
		<div class="main-body">
			<div class="profile-modal hide-it">
				<div class="modal-data" style="height: 140px;">
					<div class="filebox">
						<input class="upload-name" value="파일선택" disabled="disabled">
						<label for="pro-upload">업로드</label>
						<input type="file" id="pro-upload" accept="image/png,.jpeg,.gif">
					</div>
					<div class="profile-photo"><span class="photoSize" style="top: 86px; left: 57px;">100x100</span></div>
					<div class="profile-photo-min"><span class="photoSize" style="top: 36px; left: 20px;">50x50</span></div>
					<button type="button" class="photoBtn blockbtn" id="profilePhotoBtn">사진등록...</button>
					<button type="button" class="photoBtn blockbtn" id="removePhotoBtn">사진삭제...</button>
				</div>
				<hr style="margin: 10px;"/>
				<div class="modal-data">
					<div class="profile-data">${vo.name }</div>
					<button type="button" class="hideData blockbtn">숨기기</button>
				</div>
				<div class="modal-data">
					<div class="profile-data">${vo.nickName }</div>
					<button type="button" class="hideData blockbtn">숨기기</button>
				</div>
				
			</div>
			
			<div class="content02-modal hide-it">
				
			</div>
			
			<div class="main-block02 blockForm f-l"  id="block02_1">
				<div class="block-edit hide-it"><span class="editIcon material-icons i-s-20 lh-1-1">table_rows</span><span class="plusIcon material-icons i-s-20 lh-1-1 f-r">add</span></div>
			</div>
			<div class="main-block01 blockForm f-l" id="block01">
				<div class="block-edit hide-it"><span class="editIcon material-icons i-s-20 lh-1-1">table_rows</span><span class="plusIcon material-icons i-s-20 lh-1-1 f-r">add</span></div>

			</div>
			<div class="main-block02 blockForm f-r" id="block02_2">
				<div class="block-edit hide-it"><span class="editIcon material-icons i-s-20 lh-1-1">table_rows</span><span class="plusIcon material-icons i-s-20 lh-1-1 f-r">add</span></div>
			</div>
			

		</div>
		<div class="main-footer p-t-10">footer</div>
	</div>

	<!-- LoadingPage -->
	<div class="loadingPage" id="loadingPage">
		<span class="loading disMsform" id="loadingWin">
			<span class="loadingLogo disMsform" id="loadingLogo">
			  <span class="loadingLogoBg disMsform" id="loadingAni"></span>
			</span>   
			<span class="loadingLogoShadow disMsform" id="loadlogoShadow"></span>
			<input type="text" class="debugInput disMsform" value="" disabled="disabled" />
		</span>
	</div>


	<!-- Containers -->
	<div id="containers" class="hide-it">
		<div class="container-m" id="m999-calContainer">
			<!-- 일자 클릭시 메뉴오픈 -->
			<div id="contextMenu" class="dropdown clearfix only-user">
				<ul class="dropdown-menu dropNewEvent" role="menu"
					aria-labelledby="dropdownMenu"
					style="display: block; position: static; margin-bottom: 5px;">
					<li><a tabindex="-1" href="#">카테고리1</a></li>
					<li><a tabindex="-1" href="#">카테고리2</a></li>
					<li><a tabindex="-1" href="#">카테고리3</a></li>
					<li><a tabindex="-1" href="#">카테고리4</a></li>
					<li class="divider"></li>
					<li><a tabindex="-1" href="#" data-role="close">Close</a></li>
				</ul>
			</div>
		
			<div class="wrapper hide-it">
				<div id="loading"></div>
				<div id="calendar"></div>
			</div>
		
			<div class="filtering hide-it">
				<div class="filterToggle-content">
					<button type="button" class="filterToggle">필터보이기</button>
					<button type="button" class="filterMove hide-it">필터이동</button>
				</div>
		
				<div class="filter-menu hide-it">
		
					<div class="col-lg-6 w-full">
						<label for="calendar_view">구분별</label> <span class="f-r m-r-5 m-b-5">
							<button type="button" class="filterMove hide-it">필터이동</button>
							<button type="button" class="filterScroll hide-it">따라다니기</button>
						</span>
						<div class="input-group">
							<select class="filter" id="type_filter" multiple="multiple">
								<option value="카테고리1">카테고리1</option>
								<option value="카테고리2">카테고리2</option>
								<option value="카테고리3">카테고리3</option>
								<option value="카테고리4">카테고리4</option>
							</select>
						</div>
					</div>
		
					<div class="col-lg-6 w-full">
						<label for="calendar_view">등록자별</label>
						<div class="input-group">
							<label class="checkbox-inline"><input class='filter'
								type="checkbox" value="정연" checked>정연</label> <label
								class="checkbox-inline"><input class='filter'
								type="checkbox" value="다현" checked>다현</label> <label
								class="checkbox-inline"><input class='filter'
								type="checkbox" value="사나" checked>사나</label> <label
								class="checkbox-inline"><input class='filter'
								type="checkbox" value="나연" checked>나연</label> <label
								class="checkbox-inline"><input class='filter'
								type="checkbox" value="지효" checked>지효</label> <label
								class="checkbox-inline"><input class='filter'
								type="checkbox" value="${vo.name }" checked>${vo.name }</label>
						</div>
					</div>
				</div>
			</div>
			<!-- 일정 추가 MODAL -->
			<div class="modal fade only-user" tabindex="-1" role="dialog"
				id="eventModal">
				<div class="modal-dialog" role="document">
					<div class="modal-content">
						<div class="modal-header">
							<button type="button" class="close" data-dismiss="modal"
								aria-label="Close">
								<span aria-hidden="true">&times;</span>
							</button>
							<h4 class="modal-title"></h4>
						</div>
						<div class="modal-body">
		
							<div class="row">
								<div class="col-xs-12">
									<label class="col-xs-4" for="edit-allDay">하루종일</label> <input
										class='allDayNewEvent' id="edit-allDay" type="checkbox">
								</div>
							</div>
		
							<div class="row">
								<div class="col-xs-12">
									<label class="col-xs-4" for="edit-title">일정명</label> <input
										class="inputModal" type="text" name="edit-title" id="edit-title"
										required="required" />
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12">
									<label class="col-xs-4" for="edit-start">시작</label> <input
										class="inputModal" type="text" name="edit-start" id="edit-start" />
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12">
									<label class="col-xs-4" for="edit-end">끝</label> <input
										class="inputModal" type="text" name="edit-end" id="edit-end" />
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12">
									<label class="col-xs-4" for="edit-type">구분</label> <select
										class="inputModal" name="edit-type" id="edit-type">
										<option value="카테고리1">카테고리1</option>
										<option value="카테고리2">카테고리2</option>
										<option value="카테고리3">카테고리3</option>
										<option value="카테고리4">카테고리4</option>
									</select>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12">
									<label class="col-xs-4" for="edit-color">색상</label> <select
										class="inputModal" name="color" id="edit-color">
										<option value="#D25565" style="color: #D25565;">빨간색</option>
										<option value="#9775fa" style="color: #9775fa;">보라색</option>
										<option value="#ffa94d" style="color: #ffa94d;">주황색</option>
										<option value="#74c0fc" style="color: #74c0fc;">파란색</option>
										<option value="#f06595" style="color: #f06595;">핑크색</option>
										<option value="#63e6be" style="color: #63e6be;">연두색</option>
										<option value="#a9e34b" style="color: #a9e34b;">초록색</option>
										<option value="#4d638c" style="color: #4d638c;">남색</option>
										<option value="#495057" style="color: #495057;">검정색</option>
									</select>
								</div>
							</div>
							<div class="row">
								<div class="col-xs-12">
									<label class="col-xs-4" for="edit-desc">설명</label>
									<textarea rows="4" cols="50" class="inputModal" name="edit-desc"
										id="edit-desc"></textarea>
								</div>
							</div>
		
							<div class="row">
								<div class="col-xs-12">
									<label class="col-xs-4" for="edit-allDay">공개여부</label> <input
										type="radio" id="public" name="edit-disclo" value="public"
										checked="checked"><span class="radioSpan">모두 공개</span> <input
										type="radio" id="part-pub" name="edit-disclo" value="part-pub"><span
										class="radioSpan">친구만 공개</span> <input type="radio" id="private"
										name="edit-disclo" value="private"><span
										class="radioSpan">비공개</span>
								</div>
							</div>
		
						</div>
						<div class="modal-footer modalBtnContainer-addEvent">
							<button type="button" class="btn btn-default" data-dismiss="modal">취소</button>
							<button type="button" class="btn btn-primary" id="save-event">저장</button>
						</div>
						<div class="modal-footer modalBtnContainer-modifyEvent">
							<button type="button" class="btn btn-default" data-dismiss="modal">닫기</button>
							<button type="button" class="btn btn-danger" id="deleteEvent">삭제</button>
							<button type="button" class="btn btn-primary" id="updateEvent">저장</button>
						</div>
					</div>
					<!-- /.modal-content -->
				</div>
				<!-- /.modal-dialog -->
			</div>
			<!-- /.modal -->
			<!-- mainContents -->
		</div>
		
		<div class="container-m" id="m998-timeLineContainer">
			<div class="wrapper hide-it">
			</div>
		</div>

		<div class="container-c" id="c997-findContainer">
			<div class="search-form">
				<div class="search-btn f-l lRadiusBtn" id="search-category" data-id="all"><span class='material-icons lh-1-1 i-s-30 i-cbk'>category</span></div>
				<input type="text" class="search-user" placeholder="회원 검색"/>
				<div class="search-btn f-r rRadiusBtn" id="search-id"><span class='material-icons lh-1-1 i-s-30 i-cbk'>person_search</span></div>
				<div class="id-category hide-it">
					<div class="id-category-" id="ca-all" data-icon="category">전체</div>
					<div class="id-category-" id="ca-id" data-icon="fiber_manual_record">아이디</div>
					<div class="id-category-" id="ca-nickName" data-icon="play_arrow">닉네임</div>
					<div class="id-category-" id="ca-name" data-icon="stop">이름</div>
				</div>
			</div>
			<div class="search-info return-rem">
			</div>
		</div>

		<div class="container-c" id="c999-profile">
				<div class='profile-ph blockForm'>
					<span class='material-icons i-s-90 i-cbk lh-1-1 op-0-1'>account_circle</span>
				</div>
				<div class='profile-code'>
					<ul class='profile-info'></ul>
				</div>
		</div>
		
		<div class="container-c" id="c998-friendContainer">
			<div class="contentArea">
				<div class="friend-modal hide-it">
				</div>
				<div class="friendLi">
					<div class="friend return-rem"></div>
					<div class="sendMesBtn"><span class='material-icons lh-1-3 i-s-30 i-cbk'>chat</span></div>
				</div>
				<div class="friend-profile">
					<div class="friend-pho return-rem" id="messenger-pho"></div>
					<ul class="friend-info f-l return-rem" id="messenger-info"></ul>
				</div>
			</div>
		</div>
		
		<div class="container-l return-rem" id="l1-myAlertList">
		</div>
	</div>
	
	<!-- jquery -->
	<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
	
	<script src="${pageContext.request.contextPath }/resources/js/main.js"></script>
	<script src="${pageContext.request.contextPath }/resources/js/ui.js"></script>
	<script src="${pageContext.request.contextPath }/resources/js/container.js"></script>
	<script src="${pageContext.request.contextPath }/resources/js/alert.js"></script>
	<!-- calendar -->
	<script src="${pageContext.request.contextPath }/resources/calPage/vendor/js/jquery.min.js"></script>
    <script src="${pageContext.request.contextPath }/resources/calPage/vendor/js/bootstrap.min.js"></script>
    <script src="${pageContext.request.contextPath }/resources/calPage/vendor/js/moment.min.js"></script>
    <script src="${pageContext.request.contextPath }/resources/calPage/vendor/js/fullcalendar.min.js"></script>
    <script src="${pageContext.request.contextPath }/resources/calPage/vendor/js/ko.js"></script>
    <script src="${pageContext.request.contextPath }/resources/calPage/vendor/js/select2.min.js"></script>
    <script src="${pageContext.request.contextPath }/resources/calPage/vendor/js/bootstrap-datetimepicker.min.js"></script>
    <script src="${pageContext.request.contextPath }/resources/calPage/js/main.js"></script>
    <script src="${pageContext.request.contextPath }/resources/calPage/js/addEvent.js"></script>
    <script src="${pageContext.request.contextPath }/resources/calPage/js/editEvent.js"></script>
    <script src="${pageContext.request.contextPath }/resources/calPage/js/etcSetting.js"></script>
    <!-- jQuery UI -->
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
</body>
</html>