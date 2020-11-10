<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page contentType="text/html; charset=UTF-8" %>
<html>
<head>
	<title>Home</title>
	<meta charset="UTF-8"/>
	    <!-- jQuery UI -->
    	<link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
		<link href="${pageContext.request.contextPath }/resources/css/main.css">
		<style type="text/css">
			.alert {
	width: 400px;
    height: 50px;
    background: #000000;
    border-radius: 5px;
    opacity: .8;
    position: relative;
    top: 10px;
    left: 20px;
			}
			.alert::after {
	border-top: 0 solid transparent;
    border-left: 10px solid transparent;
    border-right: 10px solid transparent;
    border-bottom: 10px solid black;
    content: "";
    position: relative;
    bottom: 30px;
    left: 200px;
			}
			
	#draggable { width: 150px; height: 150px; padding: 0.5em; }
			
		</style>
</head>
<body>
<!-- jquery -->
	<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
<script type="text/javascript">
//	var count = 5;
//	setInterval(function() {
//		$(".alertCount").val(count);
//		if(count == 0) location.href='/shareCal/index';
//		count--;
//	}, 10000);
  $( function() {
    $( "#draggable" ).draggable();
  } );

</script>

<h1>DB날짜 : ${vo.today } </h1>
<h1>덧셈 : ${vo.sum } </h1>
<h1>곱셈 : ${vo.mul } </h1>
<h1>ID : ${userid } </h1>

<br />
<hr />
<br />

<input type="text" style="border: 1px solid gray; background-color: #E2A9F3;" value="shei234sSCF" readonly="readonly"/>
<input type="text" class="alertCount"/>초 후 메인 페이지로 이동

<br />
<hr />
<br />

<div class="alert"></div>

<div id="draggable" class="ui-widget-content">
  <p>Drag me around</p>
</div>

    <!-- jQuery UI -->
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
</body>
</html>
