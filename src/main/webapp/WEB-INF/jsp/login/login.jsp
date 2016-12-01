<%@ page language="java" contentType="text/html; charset=UTF-8"
    pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ include file="/WEB-INF/jsp/common/taglib.jsp"%>
<%@ include file="/WEB-INF/jsp/common/common.jsp"%>


<html>
<head>

<meta content="webkit" name="renderer" />
<meta http-equiv="X-UA-Compatible" content="IE=edge,chrome=1">
<meta charset="UTF-8">
<title><spring:message code='title_login'/></title>
<link href="http://www.treenity.com/assets/css/os_base.css?version=${cssJsVersion}" rel="stylesheet" />
<link href="http://www.treenity.com/assets/css/wall/wall.css?version=${cssJsVersion}" rel="stylesheet" />

<script src="http://assets.zhihuishu.com/jquery/1.8.3/jquery.min.js" type="text/javascript"></script>
<%-- <script type="text/javascript" src="${ctx }/assets/js/jquery/jquery-1.8.3.min.js"></script> --%>

<script src="http://assets.zhihuishu.com/jquery-cookie/1.4.1/jquery.cookie.min.js"></script>
<script type="text/javascript" src="http://www.treenity.com/assets/js/login/login.js?version=${cssJsVersion}"></script>
<script type="text/javascript">
var ctx = "${ctx}";
var path = "${path}";
var basePath = "${basePath}";
</script>

</head>

<body>
<div class="login-section">
	<div class="login-section-container">
        <div class="login-logo"></div>
        <h1 class="login-slogan">Innovation & Transformation</h1>
        <div class="login-form clearfix">
		<!-- <input type="text" placeholder="Please enter your usename" id="username"> -->
		<input type="text" placeholder="<spring:message code='login_qingshurunindeyonghuming'/>" id="username">
		<!-- <input type="password" placeholder="Password" id="password"> -->
		<input type="password" placeholder="<spring:message code='login_mima'/>" id="password">
		<!-- <button id="loginBtn">LOGIN</button> -->
			
            <button id="loginBtn"><spring:message code="login_denglu"/></button>
        </div>
        <div   class="login-error-tip"><span id="loginErrorSpan" style="display:none"><spring:message code='login_yonghumingbunengweikong'/></span></div>
        <!-- <table>
        	<tr>
        		<td width="22%"></td>
        		<td width="78%"><font color="red"><span id="loginErrorSpan" style="display:none">用户名或密码不正确！</span></font></td>
        		<td></td>
        		<td></td>
        		<td></td>
        	</tr>
        </table> -->
        <a class="forgetten-password-link" href="#" title="Forgetten Password?" style="display:none" ><spring:message code="login_wangjimima"/></a>
        <span class="login-decorate-line" style="display:none" ></span>
        <div class="login-copyright">&copy;2016 Zhihuishu 沪ICP备10007183号-7</div>
    </div>
</div>
<!-- <script src="http://assets.zhihuishu.com/jquery/1.8.3/jquery.min.js" type="text/javascript"></script> -->
<script>
$(function(){
	$(".login-section").css("height",$(window).height());	
});
</script>
</body>
</html>

