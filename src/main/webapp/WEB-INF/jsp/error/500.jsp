<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ include file="/WEB-INF/jsp/common/taglib.jsp"%>
<html>
<head>
<%@include file="/WEB-INF/jsp/common/common.jsp"%>
<meta content="webkit" name="renderer" />
<meta charset="UTF-8">
<title>sorry,page not found...</title>
<link href="${ctx}/assets/css/os_base.css" rel="stylesheet" />
</head>

<body class="public-tip-body">
<!-- 此处加公共头部 -->
<%@ include file="/WEB-INF/jsp/common/header.jsp"%>
<input type="hidden" id="courseId" value=""><!-- 此处请加入参数 -->
<div class="os-error-wrap"><img src="http://image.zhihuishu.com/testzhs/ablecommons/demo/201609/98f40c42a0fe4060bf474ef0f6c8be8b.jpg" width="1920" height="980" alt="error tip"></div>
</body>
</html>
