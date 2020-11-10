//jQuery time
var current_fs, next_fs, previous_fs; //fieldsets
var left, opacity, scale; //fieldset properties which we will animate
var animating; //flag to prevent quick multi-click glitches
var isSubmitPage = false; // Is submitPage?

//------------------Token-------------------------------------------------
var tokenName = $(".csrf_token").attr("id");
var tokenValue = $(".csrf_token").val();
//------------------Token-------------------------------------------------

//***************Animation*****************************************
$(".next").click(function(){
	if(animating) return false;
	if($(".emptyData").hasClass("showAlert")) $(".emptyData").removeClass("showAlert");
	//******************formChecking******************************************
	isMovingF = true;
	$(this).parent("fieldset").find("input").not("#userid, #whatGender").each(function(idx, data) {
       if ($(this).val().trim() == '') {
         	isMovingF = false;
         	$(".emptyData").attr("data-validate", $(this).attr('placeholder')+' 항목을 입력하세요.');
         	shakeWIt('t', 'fieldset', 500);
			if(!($(".emptyData").hasClass("showAlert"))) $(".emptyData").addClass("showAlert");
         	return false;
         }else{
         	isMovingF = false;
         	var isForm = checkForm($(this).attr('id'), $(this).val());
         	if(typeof(isForm) == "string") {
	         	shakeWIt('t', 'fieldset', 500);
	         	isMovingF = false;
	         	$(".emptyData").attr("data-validate", isForm);
         		if(!($(".emptyData").hasClass("showAlert"))) $(".emptyData").addClass("showAlert");
         		return false;
         	}else{
         		isMovingF = true;
         	}
         }
	});
	//******************formChecking******************************************
	if(isMovingF){
		animating = true;
		current_fs = $(this).parent();
		next_fs = $(this).parent().next();

		//activate next step on progressbar using the index of next_fs
		$("#progressbar li").eq($("fieldset").index(next_fs)).addClass("active");

		//show the next fieldset
		next_fs.show(); 
		//hide the current fieldset with style
		current_fs.animate({opacity: 0}, {
			step: function(now, mx) {
				//as the opacity of current_fs reduces to 0 - stored in "now"
				//1. scale current_fs down to 80%
				scale = 1 - (1 - now) * 0.2;
				//2. bring next_fs from the right(50%)
				left = (now * 50)+"%";
				//3. increase opacity of next_fs to 1 as it moves in
				opacity = 1 - now;
				current_fs.css({
			'transform': 'scale('+scale+')',
			'position': 'absolute'
		  });
				next_fs.css({'left': left, 'opacity': opacity});
			}, 
			duration: 800, 
			complete: function(){
				current_fs.hide();
				animating = false;
			}, 
			//this comes from the custom easing plugin
			easing: 'easeInOutBack'
		});
	}
});


$(".previous").click(function(){
	if(animating) return false;
	animating = true;
	
	current_fs = $(this).parent();
	previous_fs = $(this).parent().prev();
	
	//de-activate current step on progressbar
	$("#progressbar li").eq($("fieldset").index(current_fs)).removeClass("active");
	
	//show the previous fieldset
	previous_fs.show(); 
	//hide the current fieldset with style
	current_fs.animate({opacity: 0}, {
		step: function(now, mx) {
			//as the opacity of current_fs reduces to 0 - stored in "now"
			//1. scale previous_fs from 80% to 100%
			scale = 0.8 + (1 - now) * 0.2;
			//2. take current_fs to the right(50%) - from 0%
			left = ((1-now) * 50)+"%";
			//3. increase opacity of previous_fs to 1 as it moves in
			opacity = 1 - now;
			current_fs.css({'left': left});
			previous_fs.css({'transform': 'scale('+scale+')', 'opacity': opacity});
		}, 
		duration: 800, 
		complete: function(){
			current_fs.hide();
			animating = false;
		}, 
		//this comes from the custom easing plugin
		easing: 'easeInOutBack'
	});
});

function shakeWIt(type, idName, time){
	// tag
	if(type == 't') {
		$(idName).addClass('shakeW').delay(time).queue(function(next){
			$(this).removeClass('shakeW');
			next();
		})	
	}
	// class
	else if(type == 'c') {
		$('.' + idName).addClass('shakeW').delay(time).queue(function(next){
			$(this).removeClass('shakeW');
			next();
		})	
	}

	// id
	else if(type == 'i') {
		$('#' + idName).addClass('shakeW').delay(time).queue(function(next){
			$(this).removeClass('shakeW');
			next();
		})	
	}
	
}
//***************Animation*****************************************


//***************logic*****************************************
$(function(){

	//------enter key--------------------------
	$("input").keydown(function(key) {
    	if (key.keyCode == 13) {
        	$(this).nextAll("input[name='next']").click();
        }
    });
	//------enter key--------------------------
	//------readonly alert--------------------------
	$(".ra").click(function() {
         	$(".emptyData").attr("data-validate", $(this).attr('placeholder')+' 항목은 수정할 수 없습니다.');
         	shakeWIt('t', 'fieldset', 500);
			if(!($(".emptyData").hasClass("showAlert"))) $(".emptyData").addClass("showAlert");
         	return false;         	
    });
	//------readonly alert--------------------------
	
	//-------gender----------------------------
	if($("#whatGender").val() == 'w'){
		$("#genderM").removeAttr('checked');
		$("#genderW").attr('checked', true);
	}
	//-------gender----------------------------
	
	//-------radio bound-----------------------
	$("input[type='radio']").click(function(){
		$(this).next().addClass('rubberBand').delay(1000).queue(function(next){
			$(this).removeClass('rubberBand');
			next();
		})	
	});
	//-------radio bound-----------------------

	//-------submitPage-----------------------
	$("#nextSubmit").click(function(){
			setTimeout(function(){
				isSubmitPage = true;
			}, 1000);
	});

	$("#submitPrevious").click(function(){
		isSubmitPage = false;
	});
	//-------submitPage-----------------------

	//-------isDelCheck-----------------------
	$("#isDelCheck").click(function() {
		var isCheck = $(this).is(":checked");
		if(isCheck){
			$("input[name=submit]").removeClass("disButton");
			$("input[name=submit]").attr("disabled", false);
		}else{
			$("input[name=submit]").addClass("disButton");
			$("input[name=submit]").attr("disabled", true);			
		}
	});
	//-------isDelCheck-----------------------
	
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

	$(".emailAddr").click(function() {
		value = $(this).val();
		if(value == "직접입력"){
			$("#userid2").attr("readonly", false);
			if($("#userid2").hasClass("readOnly")) $("#userid2").removeClass("readOnly");
			$("#userid2").val("");
		}else {
			$("#userid2").attr("readonly", true);
			if(!($("#userid2").hasClass("readOnly"))) $("#userid2").addClass("readOnly");				
			$("#userid2").val(value);
		}
	});
	$(".validate-input").not('.ra').click(function() {
		if($(".emptyData").hasClass("showAlert")) $(".emptyData").removeClass("showAlert");
	});
	
	
	
});

		function checkForm(idName, value) {
			var isForm = undefined;
			//----------only eng + num---------------
			var onlyEngNum = /^[a-zA-Z0-9]*$/
			//----------only eng + num---------------
			// userid1
			if(idName == "userid1"){
				if(value.trim() != value || value.replace(/\s/gi, "") != value) return "아이디에 공백은 불가능합니다.";
				if(!(4 <= value.trim().length && value.trim().length <= 10)) return "아이디는 4자 이상 10자 이하 입니다.";
				if(!onlyEngNum.test(value)) return "아이디는 영어와 숫자만 입력 가능합니다.";
			}

			// userid2
			if(idName == "userid2"){
				if(value.trim().match(/((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
	                return "이메일 형식이 잘못 입력되었습니다.";
	            }else {
	            	$("#userid").val("");
	            	var userid = $("#userid1").val() + "@" + value.trim();
	            	$("#userid").val(userid);
					// ajax(idCheck)
					$.ajax("idCheck", {
						type: "POST",
						data:{'userid':userid},
						async:false,
						success: function(data){
					    	if(data != 'notFind'){
					    		isForm = "중복된 아이디입니다.";
					    	}
						},
						beforeSend : function(crsfToken){
							crsfToken.setRequestHeader(tokenName, tokenValue);
						}
					})
	            }
			}

			// password
			if(idName == "password"){
				if(value.trim() != value || value.replace(/\s/gi, "") != value) return "비밀번호에 공백은 불가능합니다.";
				if(value.trim().length < 4) return "비밀번호는 4자 이상입니다.";
			}

			// passwordC
			if(idName == "passwordC"){
				if(value != $("#password").val()) return "비밀번호가 동일하지 않습니다.";
			}

			// passwordR
			if(idName == "passwordR"){
				if(value.trim().length < 4) {
					return "비밀번호는 4자 이상입니다.";
				}else {
	            	var userid = $("#userid").val();
	            	var password = $("#passwordR").val();
					// ajax(passCheck)
					$.ajax("passCheck", {
						type: "POST",
						data:{'userid':userid, 'password':password },
						async:false,
						success: function(data){
					    	if(data != "Eq"){
					    		isForm = "비밀번호가 맞지 않습니다.";
					    	}
						},
						beforeSend : function(crsfToken){
							crsfToken.setRequestHeader(tokenName, tokenValue);
						}
					})
	            }
			}

			// name
			if(idName == "name"){
				if(value.trim() != value || value.replace(/\s/gi, "") != value) return "이름에 공백은 불가능합니다.";
				if(!(2 <= value.trim().length && value.trim().length <= 10)) return "이름은 2~10자 사이입니다.";
			}
			
			// nickName
			if(idName == "nickName"){
				if(value.trim() != value || value.replace(/\s/gi, "") != value) return "별명에 공백은 불가능합니다.";
				if(!(2 <= value.trim().length && value.trim().length <= 10)) return "별명은 2~10자 사이입니다.";
			}
			
			return isForm;
		}
		
		function submitCheck() {
			isSubmit = false;
			//----------only num---------------
			var onlyNum = /^[0-9]*$/
			//----------only num---------------
			
			if(isSubmitPage){
				var phone = $("#phoneNo").val();
				
				if(phone!=null && phone.trim().length!=0) {
					if(phone.trim().length != 11 && onlyNum.test(phone.trim())) {
						$(".emptyData").attr("data-validate", "휴대폰 번호가 잘못 입력되었습니다.");
	         			if(!($(".emptyData").hasClass("showAlert"))) $(".emptyData").addClass("showAlert");
	         			return false;
					}
				}
				isSubmit = true;
				$("#loadingPage").addClass('showL');
			}
			
			return isSubmit;
		}

//***************logic*****************************************
