//------------------Token-------------------------------------------------
var tokenHeader = $(".csrf_token").attr("id");
var tokenValue = $(".csrf_token").val();
//------------------Token-------------------------------------------------

var eventModal = $('#eventModal');

var modalTitle = $('.modal-title');
var editAllDay = $('#edit-allDay');
var editTitle = $('#edit-title');
var editStart = $('#edit-start');
var editEnd = $('#edit-end');
var editType = $('#edit-type');
var editColor = $('#edit-color');
var editDesc = $('#edit-desc');

var addBtnContainer = $('.modalBtnContainer-addEvent');
var modifyBtnContainer = $('.modalBtnContainer-modifyEvent');


/* ****************
 *  새로운 일정 생성
 * ************** */
var newEvent = function (start, end, eventType) {

    $("#contextMenu").hide(); //메뉴 숨김

    modalTitle.html('새로운 일정');
    editType.val(eventType).prop('selected', true);
    editTitle.val('');
    editStart.val(start);
    editEnd.val(end);
    editDesc.val('');
    
    addBtnContainer.show();
    modifyBtnContainer.hide();
    eventModal.modal('show');
    
    var userid = $("#userid").val();
    var name = $("#name").val();
    var nickName = $("#nickName").val();

    //새로운 일정 저장버튼 클릭
    $('#save-event').unbind();
    $('#save-event').on('click', function () {
	
		var editDisclo = $("input[name='edit-disclo']:checked").val();
		
        var eventData = {
            userid: userid,
            title: editTitle.val(),
            startDate: editStart.val(),
            endDate: editEnd.val(),
            description: editDesc.val(),
            type: editType.val(),
            name: name,
            nickName: nickName,
            backgroundColor: editColor.val(),
            textColor: '#ffffff',
            allDay: 'F',
            disclosed: editDisclo
        };

        if (eventData.start > eventData.end) {
            alert('끝나는 날짜가 앞설 수 없습니다.');
            return false;
        }

        if (eventData.title === '') {
            alert('일정명은 필수입니다.');
            return false;
        }

        var realEndDay;

        if (editAllDay.is(':checked')) {
            eventData.startDate = moment(eventData.startDate).hours('00').minutes('00').seconds('00').format('YYYY-MM-DD HH:mm:ss');
            eventData.endDate = moment(eventData.endDate).hours('00').minutes('00').seconds('00').format('YYYY-MM-DD HH:mm:ss');
            //render시 날짜표기수정
            // eventData.endDate = moment(eventData.endDate).add(1, 'days').format('YYYY-MM-DD HH:mm:ss');
            //DB에 넣을때(선택)
            // realEndDay = moment(eventData.endDate).format('YYYY-MM-DD HH:mm:ss');

            eventData.allDay = 'T';
        }else {
            eventData.startDate = moment(eventData.startDate).format('YYYY-MM-DD HH:mm:ss');
            eventData.endDate = moment(eventData.endDate).format('YYYY-MM-DD HH:mm:ss');
        }

        $("#calendar").fullCalendar('renderEvent', eventData, true);
        eventModal.find('input, textarea').not("input[type='radio']").val('');
        editAllDay.prop('checked', false);
        eventModal.modal('hide');

        //새로운 일정 저장
        $.ajax({
            type: "post",
            url: "user/insertPlan",
            dataType: "json",
            data: eventData,
            success: function (response) {
                //DB연동시 중복이벤트 방지를 위한
                $('#calendar').fullCalendar('removeEvents');
                $('#calendar').fullCalendar('refetchEvents');
            },
		  	beforeSend: function(crsfToken){
			 	crsfToken.setRequestHeader(tokenHeader, tokenValue);
		  	},
		  	error: function(xhr, status, error) {
				alert(error);
		  	}
        });
    });
};