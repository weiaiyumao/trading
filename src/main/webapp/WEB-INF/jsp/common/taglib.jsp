<%@page import="org.apache.commons.lang3.time.DateFormatUtils"%>
<%@page import="org.springframework.web.servlet.i18n.SessionLocaleResolver"%>
<%@page language="java" import="java.util.*" pageEncoding="UTF-8"%>
<%@taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<%@taglib prefix="fn" uri="http://java.sun.com/jsp/jstl/functions" %>
<%@taglib prefix="fmt" uri="http://java.sun.com/jsp/jstl/fmt" %>
<%@taglib prefix="spring" uri="http://www.springframework.org/tags" %>

<%
String currUrl = request.getParameter("target");
String path = request.getContextPath();
String basePath = request.getScheme()+":"+"//"+request.getServerName()+":"+request.getServerPort()+path;
if(request.getServerPort()==80){
	basePath = request.getScheme()+":"+"//"+request.getServerName()+path;
}

String zLocale = "2"; 
String i18nLanguage = "en" ;
Locale locale = (Locale)session.getAttribute(SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME) ;
if(locale == null){
	//locale = Locale.getDefault();
	locale = Locale.ENGLISH;
	request.getSession().setAttribute(SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME,locale);
}
if(locale.equals(Locale.CHINESE)){
	zLocale = "1" ;	
	i18nLanguage = "zh" ;
}

if(locale.equals(Locale.ENGLISH)){
	zLocale = "2" ;
	i18nLanguage = "en" ;
}

%>

<c:set var="cssJsVersion" value="201611301"/>
<c:set var="ctx" value="${pageContext.request.contextPath}"/>
<c:set var="path" value="<%=path %>" />
<c:set var="basePath" value="<%=basePath %>" />
<c:set var="currUri" value="<%=currUrl %>" />
<c:set var="http_treenity" value="http://www.treenity.com" />
<c:set var="http_zhs" value="http://www.zhihuishu.com" />
<c:set var="http_cas" value="http://passport.zhihuishu.com" />
<c:set var="imgPrefix" value="http://image.zhihuishu.com/"/>
<%-- z_locale值与cookie中的z_locale一致：1表示中文、2表示英文 --%>
<c:set var="z_locale" value="<%=zLocale %>" />
<%-- 语言代号[zh|en]用于引入JS语言资源文件时用，如：/web/scripts/i18n/resource_${z_locale_code}.js --%>
<c:set var="z_locale_code" value="<%=i18nLanguage %>" />