<%@ page language="java" contentType="text/html; charset=UTF-8"
	pageEncoding="UTF-8"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>Insert title here</title>
<link rel="stylesheet" href="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/css/bootstrap.min.css">
<script src="https://code.jquery.com/jquery-3.2.1.min.js"></script>
<script src="https://cdnjs.cloudflare.com/ajax/libs/popper.js/1.12.9/umd/popper.min.js"></script>
<script src="https://maxcdn.bootstrapcdn.com/bootstrap/4.0.0/js/bootstrap.min.js"></script>
<!-- fullcalendar 사용시 추가!!! -->
<link href='https://cdn.jsdelivr.net/npm/@fortawesome/fontawesome-free@5.13.1/css/all.css' rel='stylesheet'>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/fullcalendar@5.1.0/main.css">
<script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.1.0/main.min.js"></script>
<script src="https://cdn.jsdelivr.net/npm/fullcalendar@5.1.0/locales/ko.js"></script>
<script type="text/javascript" src="resources/datetime/jquery.datetimepicker.full.min.js"></script>
<link rel="stylesheet" type="text/css" href="resources/datetime/jquery.datetimepicker.min.css" />  
<script type="text/javascript">
	var calendar;
	$(function() {
		var calendarEl = document.getElementById('calendar');
		calendar = new FullCalendar.Calendar(calendarEl, {
			headerToolbar : {
				left : 'today prevYear,prev,next,nextYear',
				center : 'title',
				right : 'dayGridMonth,timeGridWeek,timeGridDay,listWeek'
			},
			locale : "ko",
			editable : true, // 수정이 가능하게 한다.
			droppable : true, // 드롭이 가능하게 한다.
			drop : function(arg) {

			},
			// 이벤트가 많을경우 more표시
			dayMaxEvents : true,
			// 선택가능하게
			selectable : true,
			selectMirror : true,
			// 선택했을때
			select : function(arg) {
				// 일정 입력받아
				$("#exampleModal").modal(); // 대화상자 띄우기
				calendar.unselect(); // 선택해제
			},
			// 이벤트 클릭하면
			eventClick : function(arg) {
				// 삭제 물어보고
				if (confirm('지울래?')) {
					arg.event.remove(); // 삭제
				}
			},
		});
		calendar.addEvent(
				{
					title : '하루종일',
					start : '2020-08-01'
				}	
			);
		// 달력 그리기
		calendar.render();
	});

	$(function() {
		$("#saveBtn").click(function() {
			var allDay = $("#allDay").val();
			var title = $("#title").val();
			var edit_start = $("#edit-start").val();
			var edit_end = $("#edit-end").val();
			var edit_type = $("#edit-type").val();
			var edit_color = $("#edit-color").val();
			var edit_desc = $("#edit-desc").val();
			calendar.addEvent({
				title : title,
				start : edit_start,
				end : edit_end,
				type : edit_type,
				backgroundColor : edit_color,
				allDay : allDay ? true : false
			});
			$("#exampleModal").modal('hide');
		});
	});
	
	$(function(){
			 $('#edit-start').datetimepicker({
			  	format:'Y-m-d H:i',
			  onShow:function( ct ){
			   	this.setOptions({
			    	maxDate:$('#edit-end').val() ? $('#edit-end').val():false
			   	})
			  },
			  timepicker:true
			 });
			 $('#edit-end').datetimepicker({
			  format:'Y-m-d H:i',
			  onShow:function( ct ){
			   		this.setOptions({
			    	minDate:jQuery('#edit-start').val()?jQuery('#edit-start').val():false
			   })
			  },
			  timepicker:true
			 });
	
	});
</script>
<style type="text/css">
body {
	margin-top: 40px;
	font-size: 14px;
	font-family: Arial, Helvetica Neue, Helvetica, sans-serif;
}
/* 요일 색상 변경 */
.fc-day-sat {
	color: #0000FF;
} /* 토요일 */
.fc-day-sun {
	color: #FF0000;
} /* 일요일 */
#calendar {
	width: 1100px;
	margin: 0 auto;
}
</style>
</head>
<body>
	<!-- Modal -->
	<div class="modal fade" id="exampleModal" tabindex="-1" role="dialog"
		aria-labelledby="exampleModalLabel" aria-hidden="true">
		<div class="modal-dialog" role="document">
			<div class="modal-content">
				<div class="modal-header">
					<h5 class="modal-title" id="exampleModalLabel">일정 입력하기</h5>
					<button type="button" class="close" data-dismiss="modal"
						aria-label="Close">
						<span aria-hidden="true">&times;</span>
					</button>
				</div>

				<div class="modal-body">
					<div class="form-group row">
						<label class="col-sm-3 col-form-label" for="allDay">구분</label>
						<div class="form-check col-sm-9">
							<input class="form-check-input" type="checkbox" id="allDay"
								checked="checked"> <label class="form-check-label"
								for="allDay">하루종일</label>
						</div>
					</div>
					<div class="form-group row">
						<label for="title" class="col-sm-2 col-form-label">일정명</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" name="title" id="title"
								required="required">
						</div>
					</div>

					<div class="form-group row">
						<label for="edit-start" class="col-sm-2 col-form-label">시작</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" name="edit-start"
								id="edit-start" required="required">
						</div>
					</div>
					<div class="form-group row">
						<label for="edit-end" class="col-sm-2 col-form-label">끝</label>
						<div class="col-sm-10">
							<input type="text" class="form-control" name="edit-end"
								id="edit-end" required="required">
						</div>
					</div>
					<div class="form-group row">
						<label for="edit-type" class="col-sm-2 col-form-label">구분</label>
						<div class="col-sm-10">
							<select name="edit-type" id="edit-type" class="form-control">
								<option value="카테고리1">카테고리1</option>
								<option value="카테고리2">카테고리2</option>
								<option value="카테고리3">카테고리3</option>
								<option value="카테고리4">카테고리4</option>
							</select>
						</div>
					</div>
					<div class="form-group row">
						<label for="edit-color" class="col-sm-2 col-form-label">색상</label>
						<div class="col-sm-10">
							<select id="edit-color" class="form-control">
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
					<div class="form-group row">
						<label for="edit-desc" class="col-sm-2 col-form-label">설명</label>
						<div class="col-sm-10">
							<textarea rows="6" cols="40" id="edit-desc" class="form-control"></textarea>
						</div>
					</div>


				</div>
				<div class="modal-footer">
					<button type="button" class="btn btn-secondary"
						data-dismiss="modal">취소</button>
					<button type="button" class="btn btn-primary" id="saveBtn">저장</button>
				</div>
			</div>
		</div>
	</div>


	<div id='calendar'></div>
</body>
</html>