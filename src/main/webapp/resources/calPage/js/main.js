//------------------Token-------------------------------------------------
var tokenHeader = $(".csrf_token").attr("id");
var tokenValue = $(".csrf_token").val();
//------------------Token-------------------------------------------------

var draggedEventIsAllDay;
var auth = true;
var activeInactiveWeekends = true;

setTimeout(function(){
	var calendar = $('#calendar').fullCalendar({
	
	 /** ******************
	   *  OPTIONS
	   * *******************/
	  locale                    : 'ko',    
	  timezone                  : "local", 
	  nextDayThreshold          : "09:00:00",
	  allDaySlot                : true,
	  displayEventTime          : true,
	  displayEventEnd           : true,
	  firstDay                  : 0, //월요일이 먼저 오게 하려면 1
	  weekNumbers               : false,
	  selectable                : true,
	  weekNumberCalculation     : "ISO",
	  eventLimit                : true,
	  contentHeight				: "auto",
	  views                     : { 
	                                month : { eventLimit : 12 } // 한 날짜에 최대 이벤트 12개, 나머지는 + 처리됨
	                              },
	  eventLimitClick           : 'week', //popover
	  navLinks                  : true,
	  defaultDate               : moment(), //실제 사용시 현재 날짜로 수정
	  timeFormat                : 'HH:mm',
	  defaultTimedEventDuration : '01:00:00',
	  editable                  : true,
	  minTime                   : '00:00:00',
	  maxTime                   : '24:00:00',
	  slotLabelFormat           : 'HH:mm',
	  weekends                  : true,
	  nowIndicator              : true,
	  dayPopoverFormat          : 'MM/DD dddd',
	  longPressDelay            : 0,
	  eventLongPressDelay       : 0,
	  selectLongPressDelay      : 0,  
	  header                    : {
	                                left   : 'today, prevYear, nextYear, viewWeekends',
	                                center : 'prev, title, next',
	                                right  : 'month, agendaWeek, agendaDay, listWeek'
	                              },
	  views                     : {
	                                month : {
	                                  columnFormat : 'dddd'
	                                },
	                                agendaWeek : {
	                                  columnFormat : 'M/D ddd',
	                                  titleFormat  : 'YYYY년 M월 D일',
	                                  eventLimit   : false
	                                },
	                                agendaDay : {
	                                  columnFormat : 'dddd',
	                                  eventLimit   : false
	                                },
	                                listWeek : {
	                                  columnFormat : ''
	                                }
	                              },
	  customButtons             : { //주말 숨기기 & 보이기 버튼
	                                viewWeekends : {
	                                  text  : '주말',
	                                  click : function () {
	                                    activeInactiveWeekends ? activeInactiveWeekends = false : activeInactiveWeekends = true;
	                                    $('#calendar').fullCalendar('option', { 
	                                      weekends: activeInactiveWeekends
	                                    });
	                                  }
	                                }
	                               },
	
	
	  eventRender: function (event, element, view) {
	
	    //일정에 hover시 요약
	    element.popover({
	      title: $('<div />', {
	        class: 'popoverTitleCalendar',
	        text: event.title
	      }).css({
	        'background': event.backgroundColor,
	        'color': event.textColor
	      }),
	      content: $('<div />', {
	          class: 'popoverInfoCalendar'
	        }).append('<p><strong>등록자:</strong> ' + event.name + '</p>')
	        .append('<p><strong>구분:</strong> ' + event.type + '</p>')
	        .append('<p><strong>시간:</strong> ' + getDisplayEventDate(event) + '</p>')
	        .append('<div class="popoverDescCalendar"><strong>설명:</strong> ' + event.description + '</div>'),
	      delay: {
	        show: "800",
	        hide: "50"
	      },
	      trigger: 'hover',
	      placement: 'top',
	      html: true,
	      container: 'body'
	    });
	
	    return filtering(event);
	
	  },
	
	  /* ****************
	   *  일정 받아옴 
	   * ************** */
	  events: function (start, end, timezone, callback) {
	  	// 회원 일정
	  	if($("#userid").val().length!= 0){
			$("#cal-filter-name").append($("#i998-user-fil-name"));
			$("#cal-filter-category").append($("#i998-user-fil-category"));
		    $.ajax({
		      type: "POST",
		      url: "user/memPlan",
		      dataType: "json",
		      data: {
		    	userid: $("#user-fil-name-self").attr("data-id"),
		        // 화면이 바뀌면 Date 객체인 start, end 가 들어옴
		        startDate : moment(start).format('YYYY-MM-DD HH:mm:ss'),
		        endDate   : moment(end).format('YYYY-MM-DD HH:mm:ss')
		      },
		      success: function (response) {
		      	var fixedDate = response.map(function(array) {
		      		if(array.allDay == 'T') array.allDay = true; // T이면 true F이면 false
		      		else array.allDay = false;
		      		array.start = moment.utc(array.start).format('YYYY-MM-DD HH:mm:ss');
		      		array.end = moment.utc(array.end).format('YYYY-MM-DD HH:mm:ss');
			      	if(array.allDay && array.start !== array.end) {
			        	array.end = moment(array.end).add(1, 'days'); // 이틀 이상 AllDay 일정인 경우 달력에 표기시 하루를 더해야 정상출력
			      	}
			      	return array;
		     	});
		     	//-------------------------------------------------------------------------------------------------------------------------------------------------
		     		if($("#i998-user-fil-name").find("input").length > 1) {
				    	$("#i998-user-fil-name").find("input").each(function(idx, item){
							if(idx != '0') {
							    $.ajax({
							      type: "POST",
							      url: "user/memPlan",
							      dataType: "json",
							      data: {
							    	userid: item.getAttribute("data-id"),
							        // 화면이 바뀌면 Date 객체인 start, end 가 들어옴
							        startDate : moment(start).format('YYYY-MM-DD HH:mm:ss'),
							        endDate   : moment(end).format('YYYY-MM-DD HH:mm:ss')
							      },
							      success: function (response) {
							      	var fixedDate2 = response.map(function(array) {
							      		if(array.allDay == 'T') array.allDay = true; // T이면 true F이면 false
							      		else array.allDay = false;
							      		array.start = moment.utc(array.start).format('YYYY-MM-DD HH:mm:ss');
							      		array.end = moment.utc(array.end).format('YYYY-MM-DD HH:mm:ss');
								      	if(array.allDay && array.start !== array.end) {
								        	array.end = moment(array.end).add(1, 'days'); // 이틀 이상 AllDay 일정인 경우 달력에 표기시 하루를 더해야 정상출력
								      	}
								      	fixedDate.push(array);
							     	});
							      },
								  beforeSend: function(crsfToken){
									 crsfToken.setRequestHeader(tokenHeader, tokenValue);
								  },
								  error: function(xhr, status, error) {
									auth = false; // 인증을 안해 접근이 제한된 사용자
								  }
							    });
				    		}
				    	});
				    }
		     	//-------------------------------------------------------------------------------------------------------------------------------------------------
		     	setTimeout(function(){
			        callback(fixedDate);
			   	}, 100);
		      },
			  beforeSend: function(crsfToken){
				 crsfToken.setRequestHeader(tokenHeader, tokenValue);
			  },
			  error: function(xhr, status, error) {
				auth = false; // 인증을 안해 접근이 제한된 사용자
			  }
		    });
		    
		    
		} else {
			$("#cal-filter-name").append($("#i999-basic-fil-name"));
			$(".user-fil-name").addClass("hide-it");
			$(".basic-fil-name").removeClass("hide-it");
			$.ajax({
		      type: "get",
		      url: "resources/calPage/data.json",
		      data: {
		        // 화면이 바뀌면 Date 객체인 start, end 가 들어옴
		        //startDate : moment(start).format('YYYY-MM-DD'),
		        //endDate   : moment(end).format('YYYY-MM-DD')
		      },
		      success: function (response) {
		        var fixedDate = response.map(function (array) {
		          if (array.allDay && array.start !== array.end) {
		            array.end = moment(array.end).add(1, 'days'); // 이틀 이상 AllDay 일정인 경우 달력에 표기시 하루를 더해야 정상출력
		          }
		          return array;
		        });
		        callback(fixedDate);
		      }
		    });
		}
	  },
	
	  eventAfterAllRender: function (view) {
	    if (view.name == "month") $(".fc-content").css('height', 'auto');
	  },
	
	  //일정 리사이즈
	  eventResize: function (event, delta, revertFunc, jsEvent, ui, view) {
	    $('.popover.fade.top').remove();
	
	    /** 리사이즈시 수정된 날짜반영
	     * 하루를 빼야 정상적으로 반영됨. */
	    var newDates = calDateWhenResize(event);
	    var userid = $("#userid").val();
	    var id = event.id;	
	
	    //리사이즈한 일정 업데이트
	    $.ajax({
	      type: "post",
	      url: "user/updatePlan",
	      data: {
	        userid: userid,
	        id: id,
	        startDate: moment(newDates.startDate).format('YYYY-MM-DD HH:mm:ss'),
	        endDate: moment(newDates.endDate).format('YYYY-MM-DD HH:mm:ss')
	      },
	      success: function (response) {
			
	      },
		  beforeSend: function(crsfToken){
				 crsfToken.setRequestHeader(tokenHeader, tokenValue);
			  },
			  error: function(xhr, status, error) {
				alert(error);
			  }
	    });
	
	  },
	
	  eventDragStart: function (event, jsEvent, ui, view) {
	    draggedEventIsAllDay = event.allDay;
	  },
	
	  //일정 드래그앤드롭
	  eventDrop: function (event, delta, revertFunc, jsEvent, ui, view) {
	    $('.popover.fade.top').remove();
	
	    //주,일 view일때 종일 <-> 시간 변경불가
	    if (view.type === 'agendaWeek' || view.type === 'agendaDay') {
	      if (draggedEventIsAllDay !== event.allDay) {
	        alert('드래그앤드롭으로 종일<->시간 변경은 불가합니다.');
	        location.reload();
	        return false;
	      }
	    }
	
	    // 드랍시 수정된 날짜반영
	    var newDates = calDateWhenDragnDrop(event);
	    var userid = $("#userid").val();
	    var id = event.id;
	
	    //드롭한 일정 업데이트
	    $.ajax({
	      type: "post",
	      url: "user/updatePlan",
	      data: {
	        userid: userid,
	        id: id,
	        startDate: moment(newDates.startDate).format('YYYY-MM-DD HH:mm:ss'),
	        endDate: moment(newDates.endDate).format('YYYY-MM-DD HH:mm:ss')
	      },
	      success: function (response) {
			
	      },
		  beforeSend: function(crsfToken){
				 crsfToken.setRequestHeader(tokenHeader, tokenValue);
			  },
			  error: function(xhr, status, error) {
				alert(error);
			  }
	    });
	
	  },
	
	  select: function (startDate, endDate, jsEvent, view) {
	
	    $(".fc-body").unbind('click');
	    $(".fc-body").on('click', 'td', function (e) {
	    
		if($("input[id='userid']").val().length != 0){
			if(auth){
				$("#contextMenu")
			    	.addClass("contextOpened")
			    	.css({
			        	display: "block",
			        	left: e.pageX,
			        	top: e.pageY
			        });
	    	}else {
	    		alert("인증을 먼저 진행해주세요 !");
	    	}
	    }
	     return false;
	  });
	
	    var today = moment();
	
	    if (view.name == "month") {
	      startDate.set({
	        hours: today.hours(),
	        minute: today.minutes()
	      });
	      startDate = moment(startDate).format('YYYY-MM-DD HH:mm');
	      endDate = moment(endDate).subtract(1, 'days');
	
	      endDate.set({
	        hours: today.hours() + 1,
	        minute: today.minutes()
	      });
	      endDate = moment(endDate).format('YYYY-MM-DD HH:mm');
	    } else {
	      startDate = moment(startDate).format('YYYY-MM-DD HH:mm');
	      endDate = moment(endDate).format('YYYY-MM-DD HH:mm');
	    }
	
	    //날짜 클릭시 카테고리 선택메뉴
	    var $contextMenu = $("#contextMenu");
	    $contextMenu.on("click", "a", function (e) {
	      e.preventDefault();
	
	      //닫기 버튼이 아닐때
	      if ($(this).data().role !== 'close') {
	        newEvent(startDate, endDate, $(this).html());
	      }
	
	      $contextMenu.removeClass("contextOpened");
	      $contextMenu.hide();
	    });
	
	    $('body').on('click', function () {
	      $contextMenu.removeClass("contextOpened");
	      $contextMenu.hide();
	    });
	
	  },
	
	  //이벤트 클릭시 수정이벤트
	  eventClick: function (event, jsEvent, view) {
	    editEvent(event);
	  }
	
	});
	
	function getDisplayEventDate(event) {
	
	  var displayEventDate;
	  if (!event.allDay) {
	    var startTimeEventInfo = moment(event.start).format('HH:mm');
	    var endTimeEventInfo = moment(event.end).format('HH:mm');
	    displayEventDate = startTimeEventInfo + " - " + endTimeEventInfo;
	  } else {
	    displayEventDate = "하루종일";
	  }
	
	  return displayEventDate;
	}
	
	function filtering(event) {
	  var show_name = true;
	  var show_type = true;
	
	  var name = $('input:checkbox.filter:checked').map(function () {
	    return $(this).val();
	  }).get();
	  var types = $('#type_filter').val();
	
	  show_name = name.indexOf(event.name) >= 0;
	
	  if (types && types.length > 0) {
	    if (types[0] == "all") {
	      show_type = true;
	    } else {
	      show_type = types.indexOf(event.type) >= 0;
	    }
	  }
	
	  return show_name && show_type;
	}
	
	function calDateWhenResize(event) {
	
	  var newDates = {
	    startDate: '',
	    endDate: ''
	  };
	
	  if (event.allDay) {
	    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD');
	    newDates.endDate = moment(event.end._d).subtract(1, 'days').format('YYYY-MM-DD');
	  } else {
	    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD HH:mm');
	    newDates.endDate = moment(event.end._d).format('YYYY-MM-DD HH:mm');
	  }
	
	  return newDates;
	}
	
	function calDateWhenDragnDrop(event) {
	  // 드랍시 수정된 날짜반영
	  var newDates = {
	    startDate: '',
	    endDate: ''
	  }
	
	  // 날짜 & 시간이 모두 같은 경우
	  if(!event.end) {
	    event.end = event.start;
	  }
	
	  //하루짜리 all day
	  if (event.allDay && event.end === event.start) {
	    console.log('1111')
	    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD');
	    newDates.endDate = newDates.startDate;
	  }
	
	  //2일이상 all day
	  else if (event.allDay && event.end !== null) {
	    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD');
	    newDates.endDate = moment(event.end._d).subtract(1, 'days').format('YYYY-MM-DD');
	  }
	
	  //all day가 아님
	  else if (!event.allDay) {
	    newDates.startDate = moment(event.start._d).format('YYYY-MM-DD HH:mm');
	    newDates.endDate = moment(event.end._d).format('YYYY-MM-DD HH:mm');
	  }
	
	  return newDates;
	}
}, 1000);