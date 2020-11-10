//------------------Token-------------------------------------------------
var tokenHeader = $(".csrf_token").attr("id");
var tokenValue = $(".csrf_token").val();
//------------------Token-------------------------------------------------



//------------------load--------------------------------------------------
window.onload = function(){
	$("#loadingPage").addClass("hide-it");
	//------------------Login-------------------------------------------------
	var userid = $("#userid").val();
	var userName = $("#name").val();
	//------------------Login-------------------------------------------------
};
$(function(){

//	$(window).ajaxStart(function (){
//	    $("#loadingPage").show();
//	}).ajaxStop(function (){
//	    $("#loadingPage").hide();
//	});
//------------------load--------------------------------------------------

//------------------modal-------------------------------------------------
	
	
//------------------modal-------------------------------------------------



//######################################login/out############################################//
	$(document).on("click", "#shift_login", function(){
		location.href='/shareCal/login';
	});
	$(document).on("click", "#shift_logoutTo", function(){
		location.href='/shareCal/logout';
	});
	$(document).on("click", "#shift_logout", function(){
		$.ajax("logout",{
			success: function(data){
				window.location.reload();
			}
		});
	});
//######################################login/out############################################//

//######################################AUTH#################################################//

//********************none*******************************************************//
	$(document).on("click", "#shift_main", function(){
		location.href='/shareCal/index';
	});
	$(document).on("click", "#shift_Auth", function(){
		location.href='/shareCal/auth';
	});
	$(document).on("click", "#shift_DeleteMem", function(){
		location.href='/shareCal/deleteMem';
	});
	$(document).on("click", "#shift_UpdateMem", function(){
		location.href='/shareCal/updateMem';
	});
//********************none*******************************************************//

//********************user*******************************************************//
	$(document).on("click", "#shift_Cal", function(){
		location.href='/shareCal/auth_main';
	});
//********************user*******************************************************//

//********************MVP********************************************************//
	$(document).on("click", "#shift_mvp", function(){
		location.href='/shareCal/mvp/mvpMain';
	});
//********************MVP********************************************************//

//********************operator***************************************************//
	$(document).on("click", "#shift_op", function(){
		location.href='/shareCal/op/operator';
	});
//********************operator***************************************************//

//********************manager****************************************************//
	$(document).on("click", "#shift_mn", function(){
		location.href='/shareCal/mn/manager';
	});
//********************manager****************************************************//
//######################################AUTH#################################################//



//####################################functions##############################################//

//********************SendMail***************************************************//
	$("#mailSender").click(function(){
		var userid = $("input[name='useridM']").val();
		var codeNo = $("input[name='codeNo']").val();
		$(".debugInput").val("이메일 보내는 중");
		$("#loadingPage").removeClass("hide-it");
		if(userid.trim().length!=0){
			setTimeout(function(){	
				$.ajax("sendAuth", {
					type: "POST",
					data:{'userid':userid, 'codeNo':codeNo },
					async:false,
					success: function(data){
						$(".debugInput").val(data);
					},
					beforeSend : function(crsfToken){
						crsfToken.setRequestHeader(tokenHeader, tokenValue);
					},
					complete:function(){
						setTimeout(function(){
							$("#loadingPage").addClass("hide-it");
						}, 1000);
					}
					
				});
			}, 1000);
		}else {
			$(".debugInput").val("보낼 아이디를 입력해주세요.");
			$("#loadingPage").addClass("hide-it");
		}
	});
//********************SendMail***************************************************//

//********************code*******************************************************//
	$("#authCode").keyup(function(){
		var data = $(this).val();
		var len = parseInt($(".alertInput").attr('id'));

		//----------only eng + num---------------
		var isForm =  /^[A-Za-z0-9+]*$/;
		//----------only eng + num---------------

		if(data.length == len ){
			$(".alertInput").css("color", "green");
			$(".alertInput").val(len + "자 입니다.");	
			$("button[type=submit]").attr("disabled", false);
		} else {
			$(".alertInput").css("color", "red");
			$(".alertInput").val(len + "자가 아닙니다.");			
			$("button[type=submit]").attr("disabled", true);
		}
		if(data.trim().match(isForm) == null){
			$(".alertInput").css("color", "red");
			$(".alertInput").val("영문 대소문자와 숫자만 가능합니다.");						
			$("button[type=submit]").attr("disabled", true);
		}
	});
	
	$("#authOkBtn").click(function() {
		var userid = $("input[name='useridM']").val();
		var wordCode = $("input[name='wordCode']").val();
		var codeNo = $("input[name='codeNo']").val();
		$(".debugInput").val("인증코드 확인중");
		$("#loadingPage").removeClass("hide-it");
		setTimeout(function() {
			$.ajax("codeCheck", {
				type: "POST",
				data:{'userid':userid, 'wordCode':wordCode, 'codeNo':codeNo },
				async:false,
				success: function(data){
						$(".alertInput").val(data);	
				},
				beforeSend : function(crsfToken){
					crsfToken.setRequestHeader(tokenHeader, tokenValue);
				},
				complete:function(){
					setTimeout(function(){
						$("#loadingPage").addClass("hide-it");
					}, 1000);
				}
				
			});	
		}, 1000);
		
	});
//********************code*******************************************************//

//********************pass*******************************************************//
	$("#passChange").click(function(){
		var userid = $("input[name='useridM']").val();
		var password = $("input[name='passwordM']").val();
		
		$(".debugInput").val("비밀번호 변경 중");
		$("#loadingPage").removeClass("hide-it");
		setTimeout(function() {
			$.ajax("passChange", {
				type: "POST",
				data:{'userid':userid, 'password':password },
				async:false,
				success: function(data){
						$(".alertInput").val(data);	
						$(".debugInput").val(data);
						if(data == "변경 성공") {
				        	$(".alertContent").html("비밀번호 변경이 완료되었습니다!<br /><input type='hidden' id='whatAlert' value='001'/>");
				        	$(".alertCancel").hide();
				        	$("#alertPage").removeClass("hide-it");
						}
				},
				beforeSend : function(crsfToken){
					crsfToken.setRequestHeader(tokenHeader, tokenValue);
				},
				complete:function(){
					setTimeout(function(){
						$("#loadingPage").addClass("hide-it");
					}, 1000);
				}
				
			});	
		}, 1000);	
				
	});
//********************pass*******************************************************//


//####################################functions##############################################//

});