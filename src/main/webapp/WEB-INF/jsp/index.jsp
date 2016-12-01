<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglib.jsp"%>
<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8">
<title>treenity</title>

<!-- <script type="text/javascript">
	$(function(){
		window.open("http://www.treenity.com/login");
		
	})
</script> -->
</head>
<body>

	<% 
		response.sendRedirect(basePath+"/login");
	%>
	
	<h3>您好，欢迎访问本页 ~</h3>
	<a href="${ctx }/loginout">用户注销</a>

</body>
</html>