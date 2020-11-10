//------------------Token-------------------------------------------------
var tokenHeader = $(".csrf_token").attr("id");
var tokenValue = $(".csrf_token").val();
//------------------Token-------------------------------------------------

$(function(){
	var userid = $("#userid").val();

	var screenWid = screen.availWidth;
	var isMenuAlert = false;
	var isCon02Modal = false;
	var isprofileModal = false;
	var isprofileModalTop;

	var isScrollFilter = false;
	var isFilterTop;

	$("html, body").css("width", screenWid + "px");
	
	$(window).scroll(function(event){
	    var scrHei = document.scrollingElement.scrollTop;
	    if(110 <= scrHei) {
			$('.main-header').css("display", "none");
	    } else {
			$('.main-header').css("display", "");
	    }
	    setTimeout(function(){
	    	$(".main-block02").css("top", scrHei);
	    	if(isScrollFilter){
	    		$(".filter-menu").css("top", isFilterTop*1 + scrHei*1);
	    	}
	    	if(isprofileModal){
	    		$(".profile-modal").css("top", isprofileModalTop*1 + scrHei*1);
	    	}
	    	if(isCon02Modal){	    		
            	$(".content02-modal").addClass("hide-it");
            	$(".content02-modal").removeClass("blockForm");
	    		isCon02Modal = false;
	    	}
	    }, 100);
	});
	
    $(window).click(function(e){
    	if(isMenuAlert){
            if(!$(".menu-alert").is(e.target)){
            	$(".main-menu").children().removeClass("active-menu");
            	$(".menu-alert").addClass("hide-it");
            	$(".menu-alert").removeClass("blockForm");
            	
            	returnContainerL(false);	
            	isMenuAlert = false;
            }
    	}else if(isprofileModal) {
            if(!$(".profile-modal").is(e.target) && !$(".profile-modal").find("*").is(e.target)){
            	$(".profile-modal").addClass("hide-it");
            	$(".profile-modal").removeClass("blockForm");
            	
            	removProfile();
            	isprofileModalTop = 0;
            	isprofileModal = false;
            }
    	}else if(isCon02Modal) {
            if(!$(".content02-modal").is(e.target) && !$(".content02-modal").find("*").is(e.target)){
            	$(".content02-modal").addClass("hide-it");
            	$(".content02-modal").removeClass("blockForm");

            	isCon02Modal = false;
            }
    	}
    });
	
	$(window).resize(function() {
	    if(this.resizeTO) {
	    	if(isMenuAlert){
	    		$(".menu-alert").addClass("hide-it");
	    		$(".menu-alert").removeClass("blockForm");    		
	    	}
	        clearTimeout(this.resizeTO);
	    }
	    this.resizeTO = setTimeout(function() {
	        $(this).trigger('resizeEnd');
	    }, 300);
	});

	$(window).on('resizeEnd', function() {
		if(isMenuAlert){
			menuAlert();
		}
	});
	
	//-------filter-----------------------------------------
	$(".filter-menu").draggable({
		disabled: true,
		stop	: function(){
			isFilterTop = $(this).css("top").slice(0, -2);
		}
	});

	$(".filterToggle").click(function(){
		toggleBlock($(".filter-menu"));
		if($(".filter-menu").hasClass("hide-it")){
			$(".filterToggle").html("필터보이기");
			$(".filterMove").addClass("hide-it");
		}else {
			$(".filterToggle").html("필터숨기기");
			$(".filterMove").removeClass("hide-it");
		}
	});

	$(".filterMove").click(function(){
		var disabled = $(".filter-menu").draggable("option", "disabled");
		var filterMove = $(".filterMove");
		var filterMenu = $(".filter-menu");
		
		if(disabled){
			filterMove.html("필터고정");
			$(".filter-menu").draggable( "option", "disabled", false );
			$(".filtering").css("height", "50px");
			$(".filterScroll").removeClass("hide-it");
			
			filterMenu.css("box-shadow", "0 0 15px 1px rgba(0, 0, 0, 0.4)");
			filterMenu.css("top", -120);
			filterMenu.css("left", 320);
		}else {
			$(".filtering").css("height", "auto");
			$(".filter-menu").animate({ top : 0, left : 0 }, 1000, 'easeOutElastic' );
			setTimeout(function(){
				$(".filterScroll").addClass("hide-it");
				isScrollFilter = false;
				
				filterMove.html("필터이동");
				$(".filter-menu").draggable( "option", "disabled", true );
				filterMenu.css("box-shadow", "none");
			}, 1000);
		}
		
	});
	
	$(".filterScroll").click(function(){
		isScrollFilter = !isScrollFilter;
	});
	//-------filter-----------------------------------------

	
	//-------block01-----------------------------------------
	$(document).on("click", ".mainContent-button", function(){
		toggleWrap($(this));
	});
	//-------block01-----------------------------------------

	function toggleWrap(obj) {
		var thisWrap = obj.parent().find(".wrapper");
		var thisFilter = thisWrap.next();
		thisWrap.toggleClass("hide-it");
		thisFilter.toggleClass("hide-it");
	}
	
	
	function toggleBlock(obj){
		obj.toggleClass("hide-it");
		obj.toggleClass("blockForm");
	}
	
	function toggleDisButton(obj, boolean){
		obj.attr("disabled", boolean);
	}
	
	
	//-------buttons-----------------------------------------
	$(document).on("click", "#page_setting", function(){

		if(isLogin()){	
			if($(".block-edit").hasClass("hide-it")){
				$(".block-edit").removeClass("hide-it");
			}else {
				$(".block-edit").addClass("hide-it");
				$(".block-edit").children(".editIcon").html("table_rows");
				$(".content-edit").addClass("hide-it");
				$(".disabledForm").addClass("hide-it");
				toggleDisButton($("button"), false);
				$(".main-block02").sortable( "option", "disabled", true );
				$(".sortable-content").children().removeClass("shake");
			}
		}else {
			location.href = "login";
		}
	});
	
	$(document).on("click", ".friend", function(){
		$(this).parent().prev(".friend-modal").toggleClass("hide-it");
	});
	$(document).on("click", ".friend-", function(){
		var thisModal = $(this).parent();
		var thisFriend = $(this).attr("data-name");
		
		thisModal.addClass("hide-it");
		thisModal.next().find(".friend")
								.attr("data-name", thisFriend)
								.html(thisFriend)
		findFriend(thisFriend);
	});
	
	$(document).on("click", ".disabledForm", function(){
		var isContent = $(this).parent().parent();
		var thisBlock = isContent.parent();
		var thisTop = $(this).offset().top;
		var contents = "";
		
		if(isContent.attr("id").charAt(0).match("c|p")) {
			if(!$("#c999").length){contents += "<div id='c999-' class='content02-' style='background-color: rgb(190, 245, 156);' data-id='"+ isContent.attr("id") +"'>프로필</div>";}
			if(!$("#c998").length){contents += "<div id='c998-' class='content02-' style='background-color: rgb(156, 208, 245);' data-id='"+ isContent.attr("id") +"'>메신저</div>";}
			if(!$("#c997").length){contents += "<div id='c997-' class='content02-' style='background-color: rgb(143, 133, 226);' data-id='"+ isContent.attr("id") +"'>유저찾기</div>";}
			
			contents += "<div id='c00-' class='content02-' data-id='"+ isContent.attr("id") +"'>빈 컨텐츠</div>";
		}
		
		setContentModal(thisBlock, thisTop, contents);
	});
	
	$(document).on("click", ".content02-", function(){
		var thisId = $(this).attr("data-id");
		var changeId = $(this).attr("id").slice(0, -1);
		var thisSortable = $("#"+thisId);
		alert(thisId + " => " + changeId);
		
		thisSortable.attr("id", changeId);
		
        $(".content02-modal").addClass("hide-it");
        $(".content02-modal").removeClass("blockForm");
	    isCon02Modal = false;

		saveOrderThisBlock(thisSortable.parent());		
		block02ContainerSet();
	});
	
	$(document).on("click", ".sendMesBtn", function(){
		var friendid = $(".friend").attr("data-name");
		var thisTop = $(this).offset().top;
		
		setContentModal($(this).parents(".main-block02"), thisTop, friendid);
	});
	
	$(".search-user").keyup(function(e){if(e.keyCode == 13)  $("#search-id").click(); });

	$(document).on("click", "#search-id", function(){
		var searchid = $(".search-user").val();
		var search_category = $("#search-category").attr("data-id");
		
		if(searchid.length < 2) {
			alert("검색어는 두 자 이상입니다.");
			return;
		}
		
		$.ajax({
	    	data		: {
				item: searchid,
				whatIs: search_category
	        },
	        dataType	: "json",
	        type		: "POST",
	        url			: 'mem/findUser',
	        success		: function(data) {
	        	var search_info = $(".search-info");
	        	search_info.empty();
	        	
	        	if(data.length == 0) {
	        		search_info.html("검색된 회원이 없습니다.");
	        		return;
	        	}
	        		
	        	var list = data.map(function(array){
	        		var userDiv = $("<div>");
	        		userDiv.attr("class", "searchUser-");
	        		userDiv.attr("id", array.userid);
	        		userDiv.html(array.name + "(" + array.nickName + ")");
	        		
	        		search_info.append(userDiv);
	        	});
	        },
			beforeSend	: function(crsfToken){
				crsfToken.setRequestHeader(tokenHeader, tokenValue);
			}
	 	});
	});

	$(document).on("click", "#search-category", function(){
		toggleBlock($(".id-category"));
	});
	
	$(document).on("click", ".id-category-", function(){
		var search_category = $("#search-category");
		var icon = $(this).attr("data-icon");
		var category = $(this).attr("id").replace("ca-", "");
		
		search_category.attr("data-id", category);
		search_category.find(".material-icons").html(icon);
				
		toggleBlock($(".id-category"));
	});
	
	$(document).on("click", ".searchUser-", function(){
		var thisBlock = $(this).parents(".main-block02");
		var thisTop = $(this).offset().top;

		$.ajax({
	    	data		: {
				userid: $(this).attr("id")
	        },
	        dataType	: "json",
	        type		: "POST",
	        url			: 'mem/whoIsIt',
	        success		: function(data) {
	        	var contents = "<div class='find-ph'></div><div class='find-code'>" + data.name + "</div>";
				$.ajax({
			    	data		: {
						userid: data.userid
			        },
			        dataType	: "json",
			        type		: "POST",
			        url			: 'mem/itUserCode',
			        success		: function(code) {
			        	if(code.gender == 'm' ) code.gender = '남';
			        	else code.gender = '여';
			        
			        	var contents = "<div class='find-ph'><img src='" + code.photo + "' id='find-photo' onerror='this.src=\"upload/unknown/wProfile.gif\"' alt='찾은회원프로필'>"
			        				+ "</div><div class='find-code'>" + data.nickName + "<br />"
			        				+ data.name + "(" + code.gender + ")</div>"
			        				+ "<button type='button' id='shellWeFriendBtn' data-id='" + data.userid + "'>친구신청</button>";
			        				
						setContentModal(thisBlock, thisTop, contents);
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
	});
	
	$(document).on("click", "#shellWeFriendBtn", function(){
		var userid2 = $(this).attr("data-id");
		alert(userid2 + ", shell we friend?");
		
		$.ajax({
			data		: {
				userid2: userid2
			},
			dataType	: "json",
			type		: "POST",
			url			: 'mem/insFriend',
			success		: function(data) {
				if(data == '1') alert("친구신청이 완료되었습니다!");
				else alert("친구신청에 실패하였습니다.\n잠시후 다시 시도해주세요!");
			},
			beforeSend	: function(crsfToken){
				crsfToken.setRequestHeader(tokenHeader, tokenValue);
			}
		});
		
	});
	
	//-------buttons-----------------------------------------
	//-------menu-----------------------------------------
	$("#main-logo").click(function(){
		location.href = "index";
	});
	$("#menu-setting").click(function(){
		alreadyBlock();
		$(".menu-alert").empty();
		$(this).addClass("active-menu");
		$(".menu-alert").append("<a class='list-a n-drag' href='#'>"
							+ "계정 설정"
							+ "</a>"
		);
		$(".menu-alert").append("<a class='list-a n-drag' id='page_setting'>"
							+ "페이지 설정"
							+ "</a>"
		);
		setTimeout(function() {
			menuAlert();			
		}, 100);
	});

	$(document).on("click", "#menu-user", function(){
		alreadyBlock();
		$(".menu-alert").empty();
		$(this).addClass("active-menu");
		
		if(userid.length!=0) {
			$(".menu-alert").append("<a class='list-a n-drag' href='#'>"
					+ "프로필 보기"
					+ "</a>"
			);		
			$(".menu-alert").append("<a class='list-a n-drag' href='logout'>"
					+ "로그아웃"
					+ "</a>"
			);		
		} else {
			$(".menu-alert").append("<a class='list-a n-drag' href='login'>"
					+ "로그인"
					+ "</a>"
			);		
		}
		setTimeout(function() {
			menuAlert();			
		}, 100);
	});
	$("#menu-noti").click(function(){
		alreadyBlock();
		$(".menu-alert").empty();
		$(this).addClass("active-menu");
		$(".menu-alert").append("<a class='list-a n-drag' id='alertList' href='#'>"
				+ "<p>알림이 없습니다.</p>"
				+ "</a>"
		);
		var container = $("#l1-myAlertList");
		
		if(container.children().length!=0) {
			$("#alertList").find("p").remove();
			$("#alertList").append(container);
		}else {
			$("#alertList").append(container);		
		}
		setTimeout(function() {
			menuAlert();			
		}, 100);
	});
	
	function alreadyBlock(obj){
		if(isMenuAlert){
			$(".main-menu").children().removeClass("active-menu");
			toggleBlock($(".menu-alert"));
			
			returnContainerL(false);
			isMenuAlert = false;
		}
	}

	function menuAlert(){
		var innerX = window.innerWidth;
		var scrX = window.scrollX;
		var itX = $(".main-menu").find(".active-menu").parent().offset().left;
		if(itX + 75 - scrX > innerX){
			$(".menu-alert").addClass("rPoint");
			$(".menu-alert").css("left", itX - 235 - scrX);
		}else {
			$(".menu-alert").removeClass("rPoint");
			$(".menu-alert").css("left", itX - 175 - scrX);
		}
			isMenuAlert = true;
			toggleBlock($(".menu-alert"));
		
	}
	//-------menu-----------------------------------------

	//-------block01-----------------------------------------
	$(".main-block01").sortable({
		disabled			: true,
		connectWith 		: '.main-block01',
		cursor				: 'move',
		handle				: '.edit-content',
		cursorAt			: { top: 30, left: 30 },
		start 				: function( event, ui ){
			$(ui.item).children().removeClass("shake");				
		},
		update				: function(event, ui){
			 var thisBlock = $(this).attr("id");
			 var order = $(this).sortable('toArray').toString();
		
			 console.log(thisBlock);
			 console.log(order);
			 
			//----------------------------------------------------------------------------------------------------------------
			$.ajax({
	        	data		: {
	        					block: thisBlock,
	        					contents: order
	        	},
	        	dataType	: "json",
	        	type		: "POST",
	        	url			: 'mem/insSort',
	        	success		: function(data) {
	        		// alert(data);
	        	},
				beforeSend	: function(crsfToken){
					crsfToken.setRequestHeader(tokenHeader, tokenValue);
				}
	 		});
			//----------------------------------------------------------------------------------------------------------------
		},
		stop  				: function(event, ui){
			$(ui.item).children().addClass("shake");
		},
		forcePlaceholderSize: true,
		revert				: true,
		tolerance			: 'pointer',
		helper 				: 'clone'
	});
	
	//-------block01-----------------------------------------
	
	//-------block02-----------------------------------------
	
		
	
	$(".main-block02").sortable({
		disabled			: true,
		connectWith 		: '.main-block02',
		placeholder 		: '.sortable-content',
		cursor				: 'move',
		handle				: '.edit-content',
		cursorAt			: { top: 20, left: 20 },
		create				: function( event, ui ) {
			// $(this).sortable('serialize', {'data-name': "sort"});
		},
		start 				: function( event, ui ){
			$(ui.item).children().removeClass("shake");				
		},
		update				: function(event, ui){
			var thisBlock = $(this).attr("id");
			var order = $(this).sortable('toArray').toString();
			 
			console.log(thisBlock);
			console.log(order);
			 
			//----------------------------------------------------------------------------------------------------------------
			$.ajax({
	        	data		: {
	        					block: thisBlock,
	        					contents: order
	        	},
	        	dataType	: "json",
	        	type		: "POST",
	        	url			: 'mem/insSort',
	        	success		: function(data) {
	        		// alert(data);
	        	},
				beforeSend	: function(crsfToken){
					crsfToken.setRequestHeader(tokenHeader, tokenValue);
				}
	 		});
			//----------------------------------------------------------------------------------------------------------------
			 
			 
			 // var order2 = $(this).sortable('serialize');
			
//			$(".main-block02").each(function(idx, item){
//				alert($(this).data("name"));
//				$(this).find(".content-edit").parent().each(function(){
//					alert($(this).data("name"));
//				});
//			});						
		},
		stop  				: function(event, ui){
			$(ui.item).children().addClass("shake");
		},
		forcePlaceholderSize: true,
		revert				: true,
		tolerance			: 'pointer',
		helper 				: 'clone'
	});
	
	var order1 = ['m999', 'm998', 'm3']; // main-block01
	var order2 = ['c3', 'c4']; // main-block02_1
	var order3 = ['c999', 'c998']; // main-block02_2
	
	var block01 = $("#block01");
	var block02_1 = $("#block02_1");
	var block02_2 = $("#block02_2");
	
	if(userid.length!=0) {
	
		$.ajax({
		        	data		: "",
		        	type		: "POST",
		        	url			: 'mem/userSort',
		        	success		: function(sortList) {
		        	
		        		if(sortList.length == 0) {
			        		block01_order(order1);
							block02_order(order2, order3);
		        			return;
		        		}	

		        		var orderSet = sortList.map(function(list){
		        			if(list.block == 'block01') {
				        		order1 = [];
		        				list.contents.split(",").map(function(content){
		        					if(content == ""){}
		        					else order1.push(content);
		        				});	        				
		        			}else if(list.block == 'block02_1'){
				        		order2 = [];
		        				list.contents.split(",").map(function(content){
		        					if(content == ""){}
		        					else order2.push(content);
		        				});	        				
		        			}else if(list.block == 'block02_2'){        			
				        		order3 = [];
		        				list.contents.split(",").map(function(content){
		        					if(content == ""){}
		        					else order3.push(content);
		        				});
		        			}
		        		});
						
						block01_order(order1);
		        		block02_order(order2, order3);
		        	},
					beforeSend	: function(crsfToken){
						crsfToken.setRequestHeader(tokenHeader, tokenValue);
					}
		 });
		 
	 } else { 
		 block01_order(order1);
		 block02_order(order2, order3);
	 }

	function block01_order(order1) {
		for(var i=0, content; content=order1[i]; i++) {
			// console.log(content);
				
				var sortable_content = $("<div>");
				sortable_content.attr('class', 'sortable-content');
				sortable_content.attr('id', content);
				sortable_content.append("<div class='main-contentTitle blockForm'>"
										+ "<div class='content-edit hide-it'><span class='edit-content f-l'></span><span class='remove-content f-r'></span></div>"
										+ "<div class='mainContent-button'><span class='material-icons i-s-16 i-cbk'>loyalty</span>"
										+ "<span class='mainContent-title'>UNKNOWN-CONTENT</span></div>"
										+ "<div class='disabledForm hide-it'></div>"
				);
				
				block01.append(sortable_content);
				block01ContainerSet()
		}
	}
	
	function block02_order(order2, order3) {
		for(var i=0, content; content=order2[i]; i++) {
			// console.log(content);
					
			var sortable_content = $("<div>");
			sortable_content.attr('class', 'sortable-content');
			sortable_content.attr('id', content);
			
			sortable_content.append( "<div class='main-content02 blockForm'>"
									+ "<div class='content-edit hide-it'><span class='edit-content f-l'></span><span class='remove-content f-r'></span></div>"
									+ "<div class='disabledForm hide-it'></div>"
									+ "</div>"
			);

			block02_1.append(sortable_content);	
		}
		
		for(var i=0, content; content=order3[i]; i++) {
			// console.log(content);
	
			var sortable_content = $("<div>");
			sortable_content.attr('class', 'sortable-content');
			sortable_content.attr('id', content);

			sortable_content.append( "<div class='main-content02 blockForm'>"
									+ "<div class='content-edit hide-it'><span class='edit-content f-l'></span><span class='remove-content f-r'></span></div>"
									+ "<div class='disabledForm hide-it'></div>"
									+ "</div>"
			);

			block02_2.append(sortable_content);
		}
		block02ContainerSet();
	}
	
	
	
	$(".block-edit").children(".plusIcon").click(function(){
		var thisBlock = $(this).parent().parent();
		addSortable(thisBlock);
	});

	$(".block-edit").children(".editIcon").click(function(){
		editSortable($(this).parent().parent());
	});

	$(document).on("click", ".remove-content", function(){
		var thisCon = $(this).parent().parent().parent();
		var obj = thisCon.parent();
		var isIt = confirm("정말로 삭제하시겠습니까?");
		
		if(isIt) {
			$("#containers").append(thisCon.find(".container-c"));
			thisCon.remove();
			saveOrderThisBlock(obj);
		}
	});
	
	function addSortable(obj) {
		if(obj.find(".sortable-content").length > 3) {
			alert("하나의 블록에 최대 4개까지 만들 수 있습니다.");
			return;
		}
		
		var objClass = obj.hasClass("main-block01")? "main-block01" : "main-block02";
		var contentNum = getContentId(objClass);
		
		var isEdit;
		if(obj.find(".shake").hasClass("shake")){ isEdit = ["", "shake"]; }
		else {isEdit = ["hide-it", ""]; }
		
		if(objClass == 'main-block01'){
			var sortable_content = $("<div>");
			sortable_content.attr('class', 'sortable-content');
			sortable_content.attr('id', 'm' + contentNum);
			sortable_content.append("<div class='main-contentTitle blockForm " + isEdit[1] + "'>"
									+ "<div class='content-edit " + isEdit[0] + "'><span class='edit-content f-l'></span><span class='remove-content f-r'></span></div>"
									+ "<div class='mainContent-button'><span class='material-icons i-s-16 i-cbk'>loyalty</span>"
									+ "<span class='mainContent-title'>UNKNOWN-CONTENT</span></div>"
									+ "<div class='disabledForm " + isEdit[0] + "'></div>"
			);
			obj.append(sortable_content);
		}else if(objClass == 'main-block02'){
			obj.append("<div class='sortable-content' id='c" + contentNum + "'>"
							+ "<div class='main-content02 blockForm " + isEdit[1] + "'>"
							+ "<div class='content-edit " + isEdit[0] + "'><span class='edit-content f-l'></span><span class='remove-content f-r'></span></div>"
							+ "<div class='disabledForm " + isEdit[0] + "'></div>"
							+ "</div></div>"
			);
		}
		
		saveOrderThisBlock(obj);
	}
	
	function editSortable(obj) {
		var objClass = obj.hasClass("main-block01")? "main-block01" : "main-block02";
		var objIsSort = $("."+objClass).sortable("option", "disabled");
		var editBtn = $("."+objClass).find(".editIcon");
		
		
		if(objIsSort){
			if(objClass == "main-block01"){
                $(".wrapper").addClass("hide-it");
                $(".filtering").addClass("hide-it");
			}
			if(objClass == ""){ }
			editBtn.html("clear");
			toggleDisButton($("button"), true);
			$("."+objClass).find(".content-edit").removeClass("hide-it");
			$("."+objClass).find(".disabledForm").removeClass("hide-it");
			$("."+objClass).sortable( "option", "disabled", false );
			$("."+objClass).children(".sortable-content").children().addClass("shake");
		} else {
			editBtn.html("table_rows");
			toggleDisButton($("button"), false);
			$("."+objClass).find(".content-edit").addClass("hide-it");
			$("."+objClass).find(".disabledForm").addClass("hide-it");
			$("."+objClass).sortable( "option", "disabled", true );
			$("."+objClass).children(".sortable-content").children().removeClass("shake");		
		}
		
	}

	//-------block02-----------------------------------------

	//-------modal-----------------------------------------
	$(document).on("click", ".profile-ph", function(){
		var thisBlock = $(this).parent().parent().parent().parent();
		var thisTop = $(this).offset().top;
		var thisLeft = $(this).offset().left;
		
		isprofileModalTop = thisTop;
		
		if(isLogin()) {
			if(thisBlock.attr("id") == 'block02_1') {
				$(".profile-modal").addClass("lPoint");
	            $(".profile-modal").css("top", thisTop);
	            $(".profile-modal").css("left", (thisLeft + 130) + "px");
			} else {
				$(".profile-modal").removeClass("lPoint");		
	            $(".profile-modal").css("top", thisTop);
	            $(".profile-modal").css("left", (thisLeft - 300) + "px");
			}
			setTimeout(function(){
	            toggleBlock($(".profile-modal"));
				isprofileModal = !isprofileModal;
			}, 100);
		}else {
			location.href = "login";
		}
	});
	
	function setContentModal(obj, thisTop, contents){
		var isLeft = obj.attr("id");
		var offset = obj.offset();
		
		$(".content02-modal").empty();
		$(".content02-modal").html(contents);
		
			$(".content02-modal").css("top", thisTop*1 - 25);
		if(isLeft == "block02_1") {
			$(".content02-modal").css("left", offset.left*1 + 310);
			$(".content02-modal").addClass("lPoint");
		} else {
			$(".content02-modal").css("left", offset.left*1 - 210);
			$(".content02-modal").removeClass("lPoint");
		}
		setTimeout(function(){
			$(".content02-modal").addClass("blockForm");
			$(".content02-modal").removeClass("hide-it");
			isCon02Modal = true;
		}, 100);
	}
	//-------modal-----------------------------------------

	//-------labal-----------------------------------------

	//-------labal-----------------------------------------

	//-------file-----------------------------------------	
	$("#profilePhotoBtn").click(function(){
		event.preventDefault();
		var profile = $("#pro-upload");
		var files = profile[0].files;
		
		if(files!=null && files.length!=0) {
			var form_data = new FormData();
			for(var i=0;i<files.length;i++){
				form_data.append('file', files[i]);
			}
			$.ajax({
	        	data		: form_data,
	        	type		: "POST",
	        	url			: 'file/profilePhoto',
	        	cache		: false,
	        	contentType	: false,
	        	enctype		: 'multipart/form-data',
	        	processData	: false,
	        	success		: function(img_url) {
	          		alert(img_url);
	          		reloadProfile();
	        	},
				beforeSend	: function(crsfToken){
					crsfToken.setRequestHeader(tokenHeader, tokenValue);
				}
	      	});
		}
	});


	var fileTarget = $('#pro-upload');
	fileTarget.on('change', function(){ // 값이 변경되면
		if(window.FileReader){// modern browser
			var filename = $(this)[0].files[0].name;
		} else { // old IE
			var filename = $(this).val().split('/').pop().split('\\').pop(); // 파일명만 추출
		} // 추출한 파일명 삽입
		$(this).siblings('.upload-name').val(filename);
	});


	$("#removePhotoBtn").click(function(){
		var thisFile = $("#pro-upload");
		thisFile.replaceWith( thisFile = thisFile.clone( true ) );
		$(".upload-name").val("");		
		removProfile();
	});
	
	function removProfile(){
		$("#o-pre-profile").remove();
		$("#pre-profile").remove();
		$("#pre-min-profile").remove();
		$("canvas").remove();
	}
	
	$("#pro-upload").change(function() {
		filePrev(this);
	});
	
	function filePrev(input) {
		if(input.files && input.files[0]) {
			var reader = new FileReader();
			
			reader.onload = function(e) {
				removProfile();
				
				var img = document.createElement("img");
				img.src = e.target.result;
				img.id = "o-pre-profile";
				
				var flame = $(".profile-photo");
				var prof = document.createElement("img");
				prof.src = e.target.result;
				prof.id = "pre-profile";
				
				setTimeout(function(){
					var width = img.width;
					var height = img.height;
					if( width != height ) {
						alert("사진비율은 1:1만 가능합니다.");
						return;
					}
					
					var canvas = document.createElement("canvas");
					var ctx = canvas.getContext("2d");

					if(width != 100) {
						ctx.drawImage(img, 0, 0, 100, 100);
						var dataUrl = canvas.toDataURL("image/png");
						prof.src = dataUrl;
					}
					flame.append(prof);					

				// min-photo
				var minFlame = $(".profile-photo-min");
				var minProf = document.createElement("img");
				minProf.id = "pre-min-profile";

				ctx.clearRect(0, 0, canvas.width, canvas.height);
				ctx.drawImage(img, 0, 0, 50, 50);
				var dataUrl2 = canvas.toDataURL("image/png");
				minProf.src = dataUrl2;
				minFlame.append(minProf);
					
				}, 100);
			}
			reader.readAsDataURL(input.files[0]);
		}
	}
	//-------file-----------------------------------------

	//-------contents-------------------------------------
	function reloadProfile(){
		var profilePhoto = null;
		$.ajax({
	        	data		: "",
	        	type		: "POST",
	        	url			: 'mem/whoIsUser',
	        	success		: function(user) {
	        	
	        		$(".profile-code").html("<ul class='profile-info' ></ul>");        		
	        	
					if(user.userid == undefined) {
						$(".profile-info").html("로그인이<br />필요합니다.");
						$(".profile-code").append("<button class='blockbtn' id='shift_login'>로그인</button>");
					} else {
						var userid = user.userid;
						var name = user.name;
						var nickName = user.nickName;
						var lv = user.lv;					
						
						$(".profile-info").append("<li class='profile-attr' id='li-nickName'>" + nickName + "</li>");
						$(".profile-info").append("<li class='profile-attr' id='li-name'>" + name + "</li>");
						$(".profile-info").append("<li class='profile-attr' id='li-lv'> LV : " + lv + "</li>");
						
						if(lv == 0) $(".profile-code").append("인증이 필요합니다." + "<button class='blockbtn' id='shift_Auth'>인증하러가기</button> <br />");
						
						$(".profile-code").append("<button class='blockbtn' id='shift_UpdateMem'>정보 수정</button>"
												+ "<button class='blockbtn' id='shift_DeleteMem'>회원 탈퇴</button>"
												+ "<button class='blockbtn' id='shift_logout'>로그아웃</button>");
						
						$.ajax({
					        	data		: "",
					        	type		: "POST",
					        	url			: 'mem/userCode',
					        	success		: function(codeVO) {
					        		var proPhURI = codeVO.photo;
					        		var gender = codeVO.gender;
					        		
					        		if(gender == 'm') gender = '남';
					        		else gender = '여';
					        		
									$(".profile-info").append("<li class='profile-attr' id='li-gender'>" + gender + "</li>");

					        		if(proPhURI!=undefined){
						        		var minPHURI = proPhURI.replace('thumb_', 'min_');
						        		
						          		$(".profile-ph").empty();
						          		$(".profile-ph").html("<img src='upload" + proPhURI + "' id='pro-photo' onerror='this.src=\"upload/unknown/wProfile.gif\"' alt='프로필사진'>");
						          		
						          		$("#min-user").empty();
						          		$("#min-user").html("<div class='circleFlame' id='menu-user'><img src='upload" + minPHURI + "' style='margin-left: -2px;' onerror='this.src=\"upload/unknown/min_mProfile.gif\"' alt='상단프로필'></div>");
					          		}
					        	},
								beforeSend	: function(crsfToken){
									crsfToken.setRequestHeader(tokenHeader, tokenValue);
								}
					    });
					}
	        	},
				beforeSend	: function(crsfToken){
					crsfToken.setRequestHeader(tokenHeader, tokenValue);
				}
	      	});
		
	}
	
	function errorPh(gender){
		if(gender =='m') {
			$("#pro-photo").attr("src", "/upload/unknown/mProfile.gif");			
			$("#menu-user").children().attr("src", "/upload/unknown/min-mProfile.png");			
		}
		else {
			$("#pro-photo").attr("src", "/upload/unknown/wProfile.gif");
			$("#menu-user").children().attr("src", "/upload/unknown/min-wProfile.png");			
		}
	}
	
	function block01ContainerSet(){
		returnContainerM();
	
		var m999 = $("#m999");
		m999.find(".disabledForm").after($("#m999-calContainer"));
		m999.find(".mainContent-title").html("Calendar");
		m999.find(".material-icons").html("calendar_today");

		var m998 = $("#m998");
		m998.find(".disabledForm").after($("#m998-timeLineContainer"));
		m998.find(".material-icons").html("amp_stories");
		m998.find(".mainContent-title").html("TimeLine");
		
	}
	
	function block02ContainerSet(){
		returnContainerC(true);
	
		var c997 = $("#c997").find(".main-content02");
		c997.css("background-color", 'rgb(143, 133, 226)');
		c997.find(".disabledForm").after($("#c997-findContainer"));
	
		var c998 = $("#c998").find(".main-content02");
		c998.css("background-color", '#9CD0F5');
		c998.find(".disabledForm").after($("#c998-friendContainer"));
		loadMessenger();

		var c999 = $("#c999").find(".main-content02");
		c999.css("margin", '0px 30px');
		c999.css("background-color", 'rgb(190 245 156)');
		c999.find(".disabledForm").after($("#c999-profile"));
		reloadProfile();
		
	}
	
	function returnContainerM(isClear){
		$(".main-contentTitle").removeAttr("style");
		$(".container-m").each(function(){
			if(isClear) {
				$(this).find("input").val("");
				$(this).find(".return-rem").empty();
			}
			$("#containers").append($(this));
		});
	}
	
	function returnContainerC(isClear){
		$(".main-content02").removeAttr("style");
		$(".container-c").each(function(){
			if(isClear) {
				$(this).find("input").val("");
				$(this).find(".return-rem").empty();
			}
			$("#containers").append($(this));
		});
	}
	
	function returnContainerL(isClear){
		$(".container-l").each(function(){
			if(isClear) {
				$(this).find("input").val("");
				$(this).find(".return-rem").empty();
			}
			$("#containers").append($(this));
		});
	}
	
	function customBlockSet(){
		
	}

	function saveOrderThisBlock(obj) {
		var order = "";

		obj.find(".sortable-content").each(function(idx, item){
		    order += "," + item.id;
		});
		
		$.ajax({
	    	data		: {
				block: obj.attr("id"),
				contents: order
	        },
	        dataType	: "json",
	        type		: "POST",
	        url			: 'mem/insSort',
	        success		: function(data) {
	        	// alert(data);
	        },
			beforeSend	: function(crsfToken){
				crsfToken.setRequestHeader(tokenHeader, tokenValue);
			}
	 	});

	}
	
	function findFriend(userid){
		
		$("#messenger-pho").empty();
		$("#messenger-info").empty();
		
		if(userid.length == 0) return;
		
		$.ajax({
	    	data		: {
				userid: userid
	        },
	        dataType	: "json",
	        type		: "POST",
	        url			: 'mem/whoIsIt',
	        success		: function(data) {
	        	$("#messenger-info").html("<li class='profile-attr'>" + data.nickName + "(LV " + data.lv + ")</li>"
	        	                     + "<li class='profile-attr'>" + data.name + "</li>"
	        	                    );
				$.ajax({
			    	data		: {
						userid: userid
			        },
			        dataType	: "json",
			        type		: "POST",
			        url			: 'mem/itUserCode',
			        success		: function(code) {
			        	if(code.photo!=null){$("#messenger-pho").append("<img src='upload/" + code.photo + "' id='fr-ph' onerror='this.src=\"upload/unknown/wProfile.gif\"' alt='친구프로필사진'>"); }
			        	if(code.phoneNo!=null){$("#messenger-info").append("<li class='profile-attr'>" + code.phoneNo + "</li>"); }
			        	if(code.birth!=null){$("#messenger-info").append("<li class='profile-attr'>" + code.birth + "</li>"); }
			        	
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
		
	}
	
	function loadMessenger() {
		var friend_modal = $(".friend-modal");
		var friendList = myFriends();

		setTimeout(function(){
			// alert(friendList[0].userid1);
			friend_modal.empty();
			friendList.map(function(array){
				var isFriend = false;
				
				if(array.relationship1 != 0 && array.relationship2 != 0) isFriend = true;
				
				if(isFriend && array.userid1 != userid) {
					friend_modal.append("<div class='friend-' data-name='" + array.userid1 + "'>"
										 + array.userid1 + "</div>"
					);
				}else if(isFriend && array.userid2 != userid) {
					friend_modal.append("<div class='friend-' data-name='" + array.userid2 + "'>"
										 + array.userid2 + "</div>"
					);	
				}
			});
			
			if($(".friend-").length == 0) friend_modal.append("등록된 친구가 없습니다.");
			else {friend_modal.append("<div class='friend-' data-name=''>원래대로</div>");}
		}, 100);
	}
	function myFriends() {
		var friendList = [];
		$.ajax({
			data		: "",
			dataType	: "json",
			type		: "POST",
			url			: 'mem/myFriend',
			success		: function(data) {
				var list = data.map(function(array){
					friendList.push(array);
				});
			},
			beforeSend	: function(crsfToken){
				crsfToken.setRequestHeader(tokenHeader, tokenValue);
			}
		});
		return friendList;
	}
	
	function getContentId(objClass) {
		var isNum = [];
		var contentNum = 1;
		
		$("." + objClass).find(".sortable-content").each(function(idx, item){
			isNum.push(item.id.slice(1)*1);
		});
		isNum.sort(function(a,b){return a-b;});
		
		isNum.forEach(function(num){
			if(num!=contentNum){
				return;
			}
			contentNum++;
		})
		return contentNum;
	}
	//-------contents-------------------------------------
		
	function isLogin(){
		if(userid.length == 0) {
			alert("로그인 후에 설정해주시기 바랍니다.");
			return false;
		}else { return true; }
	}

});
