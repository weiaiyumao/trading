<%@ page language="java" import="java.util.*,javax.servlet.http.Cookie" pageEncoding="UTF-8"%>
<%
	String targetUrl = request.getParameter("target") ;

	// 切换cookie端语言设置，刷新页面时，后端将自动更换
	Cookie cookie = org.springframework.web.util.WebUtils.getCookie(request, "Z_LOCALE") ;
	// 如果为空或为中文，切换为英文
	if(cookie == null) {
		cookie = new Cookie("Z_LOCALE", "2") ;
	} else {
		if("1".equals(cookie.getValue())) {
			cookie.setValue("2") ;
		} else {
			cookie.setValue("1") ;
		}
	}
	cookie.setDomain(".zhihuishu.com");
	cookie.setPath("/");
	cookie.setMaxAge(365 * 24 * 3600);	// 设定Cookie存在时间为一年
	response.addCookie(cookie) ;
	
	// 跳转
	response.sendRedirect(targetUrl) ;

%>