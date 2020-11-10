<%@ taglib uri="http://java.sun.com/jsp/jstl/core" prefix="c" %>
<%@ page session="false" %>
<html>
<head>
	<title>Home</title>
	<!-- jQuery UI -->
    <link rel="stylesheet" href="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/themes/smoothness/jquery-ui.css">
    <link rel="stylesheet" href="${pageContext.request.contextPath }/resources/home.css">
</head>
<body>
<div class="scrumboard row">
<div class="column flex">
 <!-- todo -->
	<h1>Todo</h1>
  <div class="portlet">
    <div class="portlet-header">Task</div>
    <div class="portlet-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
  </div>
 
  <div class="portlet">
    <div class="portlet-header">Task</div>
    <div class="portlet-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
  </div>
 
</div>
 
<div class="column flex">
  <!-- ongoing -->
	<h1>Ongoing</h1>

  <div class="portlet">
    <div class="portlet-header">Task</div>
    <div class="portlet-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
  </div>
 
</div>
 


	
	
<div class="column flex">
   <!-- done -->
	<h1>Testing</h1>

  <div class="portlet">
    <div class="portlet-header">Task</div>
    <div class="portlet-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
  </div>
 
  <div class="portlet">
    <div class="portlet-header">Task</div>
    <div class="portlet-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
  </div>
 
</div>
	
<div class="column flex">
   <!-- done -->
	<h1>Done</h1>

  <div class="portlet">
    <div class="portlet-header">Task</div>
    <div class="portlet-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
  </div>
 
  <div class="portlet">
    <div class="portlet-header">Task</div>
    <div class="portlet-content">Lorem ipsum dolor sit amet, consectetuer adipiscing elit</div>
  </div>
 
</div>


	
</div>
	
	<!-- jquery -->
	<script src="https://code.jquery.com/jquery-3.2.1.js"></script>
	
	
	
	<script src="${pageContext.request.contextPath }/resources/home.js"></script>
    <!-- jQuery UI -->
	<script src="https://ajax.googleapis.com/ajax/libs/jqueryui/1.12.1/jquery-ui.min.js"></script>
</body>
</html>
