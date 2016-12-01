<%@ page language="java" pageEncoding="UTF-8"%>
<%@ include file="/WEB-INF/jsp/common/taglib.jsp"%>
<html xmlns="http://www.w3.org/1999/xhtml">
<head>
<title>对不起，您访问的页面不存_智慧树</title>
<style>
div {
	margin: 0 auto
}

.greayBg {
	background: #f2f2f2;
}

.errorBg {
	width: 665px;
	height: 492px;
	background: url(${ctx }/resources/image/bg-error.png) no-repeat;
	margin-top: 30px;
}

.errorTip {
	width: 665px;
	text-align: center
}

#jumpTo {
	margin: 0 5px
}

a {
	color: #008573;
	marign: 0 5px
}

a:hover {
	text-decoration: none
}
</style>
</head>

<body class="greayBg">
	<div class="errorBg"></div>
	<div class="errorTip">
		<p>页面错误类型：404</p>
		<p>
			系统将在<span id="seconds">5</span>秒后返回treenity首页，如未返回请点击<a href="http://www.treenity.com">这里</a>
		</p>
	</div>
	<script type="text/javascript">     
	window.onload = function() {
		var index = 0;
		var max = 5 ;
		(function() {
			if (index == max) {
				index = 0 ;
				location.href = "http://www.treenity.com" ;
			} else {
				document.getElementById('seconds').innerHTML = (max - index);
			}
			index++;
			setTimeout(arguments.callee, 1000);
		})();
	} ;     
	</script> 
</body>
</html>
