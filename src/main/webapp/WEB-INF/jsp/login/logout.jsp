<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8" %>
<%-- <%@page import="com.zhihuishu.treenity.consts.WebConsts"%>
<%@page import="com.zhihuishu.treenity.consts.Constants"%> --%>
<%@ include file="/WEB-INF/jsp/common/taglib.jsp"%>

<!DOCTYPE html>
<html>
<head>
<meta charset="UTF-8" />
<title>注销用户 ...</title>
</head>
<body>
	<%-- <%
		// Destroy session
		session.removeAttribute("_const_cas_assertion_");
		session.removeAttribute(WebConsts.SESSION_LOGIN_USER);
		session.removeAttribute(WebConsts.SESSION_LOGIN_USER_ID);
		session.removeAttribute(WebConsts.SESSION_LOGIN_USERNAME);
		session.removeAttribute("FtpUrlSuffixImg");
		session.removeAttribute(Constants.CURRENT_SELECT_COURSEID);
		session.removeAttribute(Constants.CURRENT_SELECT_COURSENAME);
		//session.invalidate();
		//System.out.println("123");
		// Clear cookies.
		/* Cookie[] cookies = request.getCookies();
		if (cookies != null) {
			try {
				for (int i = 0; i < cookies.length; i++) {
					String killClientCookie = cookies[i].getName();
					cookies[i].setMaxAge(0);
					Cookie killCookie = new Cookie(killClientCookie, "");
					killCookie.setMaxAge(0);
					killCookie.setPath("/");
					response.addCookie(killCookie);
				}
			} catch (Exception ex) {
				out.println("exception!!!");
				ex.printStackTrace();
			}
		} */
		
		//response.sendRedirect("http://www.treenity.com/login");
	%> --%>

<!-- <script type="text/javascript">     
function countDown(secs,surl){     
 //alert(surl);     
 var jumpTo = document.getElementById('jumpTo');
 jumpTo.innerHTML=secs;  
 if(--secs>0){     
     setTimeout("countDown("+secs+",'"+surl+"')",1000);     
     }     
 else{       
     location.href=surl;     
     }     
 }     
</script>  -->
<!-- <span id="jumpTo">5</span>秒后自动跳转到<a href="http://www.treenity.com/login">登录页
<script type="text/javascript">countDown(1,'http://www.treenity.com/login');</script>   -->

	

	<!-- <h3>注销用户 ...</h3> -->
	
	<script type="text/javascript">
	window.onload = function(){
		location.href ="http://treenity.zhihuishu.com/login" ;
	} ; 
	</script>
<iframe src="${http_cas}/logout" width="0" height="0" style="display: none;" ></iframe>
<!-- 清除onlineschool的缓存 -->
<!-- <iframe src="http://online.zhihuishu.com/onlineSchool/logout.jsp" width="0" height="0" style="border:none;"></iframe>
 <iframe src="http://online.zhihuishu.com/CreateCourse/logout.jsp" width="0" height="0" style="border:none;"></iframe> -->
<!-- <iframe src="http://exam.zhihuishu.com/onlineExam/logout.jsp" width="0" height="0" style="border:none;"></iframe> -->
</body>
</html>
