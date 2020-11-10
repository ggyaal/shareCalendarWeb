var userid = $("#userid").val();
var isBodyAlert = false;
	
if(userid.length != 0) {
	setInterval(function updateAlert() { // 30초마다 갱신

			if(isBodyAlert) return;
			
			$.ajax({
		    	data		: "",
				dataType	: "json",
		 		type		: "POST",
		 		url			: 'mem/myFriend',
				success		: function(data) {
		    		if(data.length == 0) return;
		    		var alertList = $("#alertList");
		    		var alertContainer = $("#l1-myAlertList");
			   		
					$("#alertList").find("p").remove();
			    	alertContainer.empty();
			    	
		    		var list = data.map(function(array){
	    				if(array.userid1 == userid) {
		    				if(array.alert1!=null && array.alert1.length!=0) {
			   					alertContainer.append("<div class='myAlert- fr-alert lh-1-2' data-name='" + array.userid2 + "' data-alert='" + array.alert1 + "'>[" + array.userid2 + "]<br />" + array.alert1 + "</div>");
					    		isMenu_alert(true);
			   				}
		    			}else if(array.alert2!=null && array.userid2 == userid) {
		    				if(array.alert2.length!=0) {
			   					alertContainer.append("<div class='myAlert- fr-alert lh-1-2' data-name='" + array.userid1 + "' data-alert='" + array.alert2 + "'>[" + array.userid1 + "]<br />" +  array.alert2 + "</div>");
					    		isMenu_alert(true);
			   				}
		    			}
			   		});
			   		if(alertContainer.find(".myAlert-").length == 0) alertList.append("<p>알림이 없습니다.</p>");
				},
				beforeSend	: function(crsfToken){
					crsfToken.setRequestHeader(tokenHeader, tokenValue);
				},
				error		: function(){
					alert("오랫동안 동작이 없어 다시 로드합니다.");
					rocation.href = "/";
				}
			});
		}
	, 10000);
}

if(userid.length != 0) {
	setInterval(function() { // 20초마다 갱신
			
	}, 20000);
}

$(document).on("click", ".myAlert-", function(){
	$(this).remove();
	if(!scanAlert()) isMenu_alert(false);
});

$(document).on("click", ".fr-alert", function(){
	var alertWho = $(this).attr("data-name");
	var alertMsg = $(this).attr("data-alert");
	
	if(alertMsg == '친구신청이 왔습니다!' || alertMsg.slice(1, 4) == '재요청') {
		var contents = $("<div>");
		var friend_con = $("<div>");
		var friend_pho = $("<div>");
		var friend_info = $("<ul>");
		
		contents.attr("class", "body-alert-contents");

		var fri_photo = $("<img>");
		var thisFriend = findThisFriend(alertWho);
		
		setTimeout(function(){
			friend_con.css("height", "110px");
			
			friend_pho.attr("class", "friend-pho");
			friend_pho.attr("id", "friendAlert-pho");
			friend_info.attr("class", "friend-info f-l");
			friend_info.attr("id", "friendAlert-info");
			
			fri_photo.attr("src", "upload" + thisFriend[6]);
			fri_photo.attr("onerror", 'this.src=\"upload/unknown/wProfile.gif\"');
			fri_photo.attr("alt", '친구프로필사진');
			friend_pho.append(fri_photo);
			
			friend_info.append("<li class='profile-attr' id='friend-userid' data-id='" + thisFriend[0] + "'>ID\t: " + thisFriend[0] + "</li>");
			friend_info.append("<li class='profile-attr'>이름\t: " + thisFriend[1] + "(LV : " + thisFriend[3] + ")" + "</li>");
			friend_info.append("<li class='profile-attr'>닉네임\t:" + thisFriend[2] + "</li>");
			if(thisFriend[5]!=null){friend_info.append("<li class='profile-attr'>전번\t:" + thisFriend[5] + "</li>"); }
			if(thisFriend[7]!=null){friend_info.append("<li class='profile-attr'>생일\t:" + thisFriend[7] + "</li>"); }
			
			friend_con.append(friend_pho);
			friend_con.append(friend_info);
			contents.append(friend_con);
			contents.append("<div id='body-alertMsg' style='color: #945616;'>수락하시겠습니까?</div>");
			appearAlert("userModal", contents, ['수락', '거절'], true);
		}, 100);
	} else if(alertMsg == '신청을 수락하였습니다.') {
		$.ajax({
			data		: {
				userid2: alertWho,
				who: 'me',
				msg: ''
			},
			dataType	: "json",
			type		: "POST",
			url			: 'mem/FriendAlert',
			success		: function(data) {
				
			},
			beforeSend	: function(crsfToken){
				crsfToken.setRequestHeader(tokenHeader, tokenValue);
			}
		});
		
	} else if(alertMsg == '신청을 거절하였습니다.') {
		// 다시 요청할 것인지 요청을 취소할 것인지 alert
		// 만약 다시 요청을 하게 되면 comment를 줘서 보낼 수 있게 한다.
		// 취소할 경우 delFriend시킨다.
		var contents = $("<div>");
		var input_con = $("<div>");
		var sendInput = $("<input>");
		
		contents.attr("class", "body-alert-contents");
		
		sendInput.attr("type","text");
		sendInput.attr("data-id", alertWho);
		sendInput.attr("placeholder","메세지 입력");
		sendInput.attr("id","send-body-alert-input");
		
		input_con.css("height", "80px");
		input_con.append("<div style='color: #945616; font-size: large; margin-bottom: 10px;'>다시 요청하기</div>");
		input_con.append(sendInput);
		contents.append(input_con);
		contents.append("<div id='body-alertMsg' style='color: #945616;'>보내시겠습니까?</div>");
		appearAlert("send-body-alert", contents, ["보내기", "취소"], true);
	}
	
});
function scanAlert(){
	if($(".myAlert-").length == 0) return false;
	else return true;
}
	
function isMenu_alert(is){
	if(is) {
		$("#menu-noti").css("color", "#EEE16D");
		$("#menu-noti").addClass("swing");
	}else {
		$("#menu-noti").css("color", "#FFFFFF");
		$("#menu-noti").removeClass("swing");
	}
}

//===========================================================
//=[alert]===================================================
function popBodyAlert(is){
	isBodyAlert = is;
}

function appearAlert(id, contents, btnComment, cancelBtn) {
	var screenWid = $(window).width();
	var main_body = $(".main-body");
	var alertWin = $("<div>");
	var contentCon = $("<div>");
	var btnCon = $("<div>");
	var yesBtn = $("<button>");
	var noBtn = $("<button>");
	
	alertWin.attr("class", "body-Alert blockForm");
	alertWin.attr("id", id);
	alertWin.css("left", screenWid/2);
	
	contentCon.attr("class", "contentCon");
	btnCon.attr("class", "btnCon");
	
	contentCon.append(contents);
	
	yesBtn.attr("class", "body-alertBtn");
	yesBtn.attr("id", "body-alertYes");
	yesBtn.html(btnComment[0]);
	
	if(cancelBtn) {
		noBtn.attr("class", "body-alertBtn");
		noBtn.attr("id", "body-alertNo");		
		noBtn.html(btnComment[1]);
		btnCon.append(noBtn);
	}
	btnCon.append(yesBtn);
	
	alertWin.append(contentCon);
	alertWin.append(btnCon);
	main_body.append(alertWin);
	popBodyAlert(true);
}
// 친구수락
$(document).on("click", "#userModal #body-alertYes", function(){
	var userid2 = $("#userModal").find("#friend-userid").attr("data-id");
	
	$.ajax({
		data		: {
			userid2: userid2,
			howTo: 'accept'
		},
		dataType	: "json",
		type		: "POST",
		url			: 'mem/upFriend',
		success		: function(code) {
			var contents = "";
			
			if(code == '1') {
				contents = "수락하였습니다.";
			}else {
				contents = "수락에 실패하였습니다.";			
			}
			appearAlert("userModal-yesBtn-alert", contents, ["확인",""], false);
		},
		beforeSend	: function(crsfToken){
			crsfToken.setRequestHeader(tokenHeader, tokenValue);
		}
	});
});

// 친구거절
$(document).on("click", "#userModal #body-alertNo", function(){
	var userid2 = $("#userModal").find("#friend-userid").attr("data-id");

	$.ajax({
		data		: {
			userid2: userid2,
			howTo: 'reject'
		},
		dataType	: "json",
		type		: "POST",
		url			: 'mem/upFriend',
		success		: function(code) {
			var contents = "";
			
			if(code == '1') {
				contents = "거절하였습니다.";
			}else {
				contents = "거절에 실패하였습니다.<br />다시 시도해주세요 ...";			
			}
			appearAlert("userModal-yesBtn-alert", contents, ["확인",""], false);
		},
		beforeSend	: function(crsfToken){
			crsfToken.setRequestHeader(tokenHeader, tokenValue);
		}
	});
	
});
$(document).on("click", "#userModal-yesBtn-alert #body-alertYes", function(){
	$(".body-Alert").remove();
	popBodyAlert(false);
});

$(document).on("click", "#send-body-alert #body-alertYes", function(){
	var userid2 = $("#send-body-alert-input").attr("data-id");
	var sendMsg = $("#send-body-alert-input");
	var alertMsg = $("#send-body-alert #body-alertMsg");
	var alertWin = $("#send-body-alert");
	
	if(sendMsg.val().length == 0 || sendMsg.val().length >= 10) {
		alertMsg.html("메세지는 1글자 이상 10글자 미만입니다.");
		alertWin.addClass("shakeW");
		setTimeout(function(){
			alertWin.removeClass("shakeW");			
		}, 1000);
	}else {
		$.ajax({
			data		: {
				userid2: userid2,
				msg: "[재요청]<br />" + sendMsg.val()
			},
			dataType	: "json",
			type		: "POST",
			url			: 'mem/msgFriend',
			success		: function(code) {
				var contents = "";
				
				if(code == '1') {
					contents = "재요청하였습니다.";
				}else {
					contents = "전송에 실패하였습니다.<br />다시 시도해주세요 ...";			
				}
				appearAlert("userModal-yesBtn-alert", contents, ["확인",""], false);
			},
			beforeSend	: function(crsfToken){
				crsfToken.setRequestHeader(tokenHeader, tokenValue);
			}
		});	
	}
	
});
//===========================================================

//===========================================================
//=[ajax]====================================================
function findThisFriend(userid){
	if(userid.length == 0) return;
	
	var thisFriend = []; //[userid, name, nickName, lv, gender, phoneNo, photo, birth]
		
	$.ajax({
		data		: {
			userid: userid
		},
		dataType	: "json",
		type		: "POST",
		url			: 'mem/whoIsIt',
		success		: function(data) {
			thisFriend.push(data.userid);
			thisFriend.push(data.name);
			thisFriend.push(data.nickName);
			thisFriend.push(data.lv);
			
			$.ajax({
				data		: {
					userid: userid
				},
				dataType	: "json",
				type		: "POST",
				url			: 'mem/itUserCode',
				success		: function(code) {
					thisFriend.push(code.gender);    	
					if(code.phoneNo!=null && code.phoneNo.length!=0) {
						thisFriend.push(code.phoneNo);						
					}else {thisFriend.push(""); }
					if(code.photo!=null && code.photo.length!=0) {
						thisFriend.push(code.photo);						
					}else {thisFriend.push(""); }
					if(code.birth!=null && code.birth.length!=0) {
						thisFriend.push(code.birth);						
					}else {thisFriend.push(""); }
					return thisFriend;
			    },
				beforeSend	: function(crsfToken){
					crsfToken.setRequestHeader(tokenHeader, tokenValue);
				}
			 });
	    },
		beforeSend	: function(crsfToken){
			crsfToken.setRequestHeader(tokenHeader, tokenValue);
		}
	 });
	return thisFriend;
}

