
(function ($) {
    "use strict";


     /*==================================================================
    [ Focus input ]*/
    $('.input100').each(function(){
        $(this).on('blur', function(){
            if($(this).val().trim() != "") {
                $(this).addClass('has-val');
            }
            else {
                $(this).removeClass('has-val');
            }
        })    
    })
  
  
    /*==================================================================
    [ Validate ]*/
    var input = $('.validate-input .input100').not('.modalPage *');

    $('.validate-form').on('submit',function(){
        var check = true;

        for(var i=0; i<input.length; i++) {
            if(validate(input[i]) == false){
                showValidate(input[i]);
                check=false;
            }
        }

        return check;
    });


    $('.validate-form .input100').each(function(){
        $(this).focus(function(){
           hideValidate(this);
        });
    });

    function validate (input) {
        if($(input).attr('type') == 'email' || $(input).attr('name') == 'email') {
            if($(input).val().trim().match(/^([a-zA-Z0-9_\-\.]+)@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.)|(([a-zA-Z0-9\-]+\.)+))([a-zA-Z]{1,5}|[0-9]{1,3})(\]?)$/) == null) {
                return false;
            }
        }
        else {
            if($(input).val().trim() == ''){
                return false;
            }
        }
    }

    function showValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).addClass('alert-validate');
    }

    function hideValidate(input) {
        var thisAlert = $(input).parent();

        $(thisAlert).removeClass('alert-validate');
    }
    /*==================================================================
     [ modal ]*/
    $(document).ready(function() {
		var fp = $(".findPass").offset();
		$(".modalDocs").css("top", (fp.top - 300) + "px");
		$(".modalTitle").css("top", (fp.top - 340) + "px");

	});
	
	$(document).ajaxSuccess(function(e, xhr, settings) {
    	var actModal = $("#modalPage").find("fieldset[id='act']");
		if(xhr.responseText == "발송 성공") {
			$(".isRightF").css("color", "green");
			actModal.find("#nextModal").attr("disabled", false);			
		}
		if(xhr.responseText == "코드가 일치합니다.") {
			$(".isRightF").css("color", "green");
			actModal.find("#nextModal").attr("disabled", false);			
		}
	});
	    
    function disBtn(isTrue) {
    	$("input").not(".ii").attr("disabled", isTrue);
    };
    
    function disVal() {
    	$(".isRightF").val("");
		$(".isRightF").css("color", "red");
    };
    
    function titleOp(field, opacity) {
    	if(opacity == 1){
			field.children(".modalTitle").css("opacity", "1");		
			field.children(".modalTitle").addClass("fadeInUp");
    	}else if(opacity == 0){
    		field.children(".modalTitle").css("opacity", "0");		    		
    	}
    };
    
    $(".findPass").click(function() {
    	disBtn(true);
    	disVal();
    	var actModal = $("#modalPage").find("fieldset[id='act']");
		$("#modalPage").removeClass("hide-it");
		actModal.children(".modalDocs").addClass("rotateInUpRight");
		setTimeout(function() {
			titleOp(actModal, 1);
			disBtn(false);
			actModal.find("#nextModal").attr("disabled", true);
		}, 1000);
	});
    
    $(".nextModal").click(function() {
    	var formCheck = false;
    	if($(".isRightF").css("color") == "rgb(0, 128, 0)") formCheck = true;
    	
    	if(formCheck) {
	    	disBtn(true);
	    	disVal();
	    	var actModal = $("#modalPage").find("fieldset[id='act']");
	    	var nextModal = actModal.next();
	    	titleOp(actModal, 0);	
	    	actModal.children(".modalDocs").removeClass("rotateInUpRight");
	    	actModal.children(".modalDocs").addClass("rotateOutUpRight");
	    	nextModal.children(".modalDocs").removeClass("rotateOutDownRight");
	    	nextModal.children(".modalDocs").addClass("rotateInUpRight");
	    	setTimeout(function() {
		    	actModal.children(".modalDocs").removeClass("rotateOutUpRight");
		    	nextModal.children(".modalDocs").removeClass("rotateInUpRight");
	    		actModal.removeAttr('id');
	    		disBtn(false);
	    		titleOp(nextModal, 1);
				nextModal.find("#nextModal").attr("disabled", true);
				nextModal.find("#passChange").attr("disabled", true);
			}, 1000);
	    	nextModal.attr('id', 'act');			
	    }else{
	    	$(".isRightF").val("형식이 잘못되었습니다.");
	    }
    });
    
    $(".previousModal").click(function() {
    	disBtn(true);
    	disVal();
    	var actModal = $("#modalPage").find("fieldset[id='act']");
    	var preModal = actModal.prev();
    	
        if(actModal.attr("class") == "modal-03"){
        	$(".alertContent").html("이 창을 나가면<br />다시 코드를 받아야 합니다.<br />정말로 나가시겠습니까?<input type='hidden' id='whatAlert' value='002'/>");
        	$("#alertPage").removeClass("hide-it");
        	return false;
        }
    	
    	titleOp(actModal, 0);
    	actModal.children(".modalDocs").removeClass("rotateInUpRight");
    	actModal.children(".modalDocs").addClass("rotateOutDownRight");
    	preModal.children(".modalDocs").removeClass("rotateOutUpRight");
    	preModal.children(".modalDocs").addClass("rotateInDownRight");
    	setTimeout(function() {
    	actModal.children(".modalDocs").removeClass("rotateOutDownRight");
    	preModal.children(".modalDocs").removeClass("rotateInDownRight");
    		titleOp(preModal, 1);
    		actModal.removeAttr('id');
    		disBtn(false);
			preModal.find("#nextModal").attr("disabled", true);
    	}, 1000);
    	preModal.attr('id', 'act');			
    	
    });
    
    $("#calcelModal").click(function() {
    	$(".modalTitle").css("opacity", "0");			
    	$(".modalTitle").removeClass("fadeInUp");			
    	$(".modalDocs").removeClass("rotateInUpRight");
    	$(".modalDocs").addClass("rotateOutDownRight");
    	setTimeout(function() {			
    		$("#modalPage").addClass("hide-it");
    		$(".modalDocs").removeClass("rotateOutDownRight");
    	}, 1000);
	});
	
	    /*==================================================================
     [ alert ]*/
	
	$(".alertOk").click(function(){
		var whatAlert = $('#whatAlert').val();
		
		if(whatAlert == '001') {
			$(".modalPage").addClass("hide-it");
			$("#alertPage").addClass("hide-it");

	    	var actModal = $("#modalPage").find("fieldset[id='act']");
	    	var firstModal = $("#modalPage").find("fieldset[class='modal-01']");
	    	actModal.removeAttr('id');
	    	firstModal.attr('id', 'act');
			$(".modalPage").find("input[type='text'], input[type='password']").val("");
			
		}else if(whatAlert == '002') {
	    	var actModal = $("#modalPage").find("fieldset[id='act']");
	    	var preModal = actModal.prev();
	    	
			$("#alertPage").addClass("hide-it");
			$(".alertContent").html("");
			
	    	titleOp(actModal, 0);
	    	preModal.find("input[type='text']").val("");
	    	actModal.children(".modalDocs").removeClass("rotateInUpRight");
	    	actModal.children(".modalDocs").addClass("rotateOutDownRight");
	    	preModal.children(".modalDocs").removeClass("rotateOutUpRight");
	    	preModal.children(".modalDocs").addClass("rotateInDownRight");
	    	setTimeout(function() {
	    		titleOp(preModal, 1);
	    		actModal.removeAttr('id');
	    		disBtn(false);
				preModal.find("#nextModal").attr("disabled", true);
	    	}, 1000);
	    	preModal.attr('id', 'act');	

		}
		$(".alertCancel").show();
	});
	
	$(".alertCancel").click(function(){
		$("#alertPage").addClass("hide-it");
		$(".alertContent").html("");
	    disBtn(false);
	});
	
	$("input[name='passwordM'").keyup(function(){
		var passwordM = $(this).val();
		var passwordC = $("input[name='passwordC']").val();
		if(passwordM.length < 4){	
			$("#passChange").attr("disabled", true);	
			$(".isRightF").attr("id", "notRight");	
			$(".isRightF").css("color", "red");
			$(".isRightF").val("비밀번호는 4자 이상입니다.");
		} else if(passwordM.trim() != passwordM || passwordM.replace(/\s/gi, "") != passwordM) {
			$(".isRightF").attr("id", "notRight");	
			$("#passChange").attr("disabled", true);	
			$(".isRightF").css("color", "red");
			$(".isRightF").val("비밀번호에 공백은 불가능합니다.");		
		} else {
			$(".isRightF").attr("id", "right");	
			$(".isRightF").val("");					
		}
	});
	$("input[name='passwordC'").keyup(function(){
		var passwordM = $("input[name='passwordM']").val();
		var passwordC = $(this).val();
		var isForm = $(".isRightF").attr("id");
		
		if(isForm != "right"){
	
		} else {
			if(passwordM == passwordC) {
				$("#passChange").attr("disabled", false);	
				$(".isRightF").css("color", "green");
				$(".isRightF").val("비밀번호가 일치합니다.");
			}else {
				$("#passChange").attr("disabled", true);	
				$(".isRightF").css("color", "red");
				$(".isRightF").val("비밀번호가 일치하지 않습니다.");
			}
		}
		
	});
	
})(jQuery);