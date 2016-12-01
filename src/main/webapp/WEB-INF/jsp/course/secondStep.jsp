<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ include file="/WEB-INF/jsp/common/taglib.jsp"%>
<html>
<head>
<%@include file="/WEB-INF/jsp/common/common.jsp"%>
<meta content="webkit" name="renderer" />
<meta charset="UTF-8">
<title><spring:message code='title_gaiyaosheji'/></title>
<link href="${ctx}/assets/css/os_base.css?version=${cssJsVersion}" rel="stylesheet" />
<link href="${ctx}/assets/css/coursestep/stepcommon.css?version=${cssJsVersion}" rel="stylesheet" />
<link href="${ctx}/assets/css/coursestep/secondStep.css?version=${cssJsVersion}" rel="stylesheet" />
<script src="http://assets.zhihuishu.com/jquery/1.8.3/jquery.min.js" type="text/javascript"></script>
<script src="${ctx}/assets/js/public/jquery.poshytip-min.js" type="text/javascript"></script>

<script type="text/javascript" charset="utf-8" src="${ctx}/assets/js/ueditor/1.4.2/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="${ctx}/assets/js/ueditor/1.4.2/ueditor.all.min.js"> </script>
<script type="text/javascript" charset="utf-8" src="${ctx}/assets/js/ueditor/1.4.2/lang/<spring:message code="ueditor_lang" />"></script>
<script src="${ctx}/assets/js/common/common.js?version=${cssJsVersion}" type="text/javascript"></script>
<script src="${ctx}/assets/js/course/secondStep.js?version=${cssJsVersion}" type="text/javascript"></script>

</head>

 
<body>
<%@ include file="/WEB-INF/jsp/common/header.jsp"%>
<div class="createcourse-div">
		<!-------createcourse-nav start-------->
	<%@include file="/WEB-INF/jsp/course/publicTitle.jsp"%>
    <!-------createcourse-nav end-------->
     <input id="courseId" type="hidden" value="${courseId}"/>
    <div class="stepconter-div">
    	<ul class="stepconte-ul">
        	<li>
            	<div class="icotit_div clearfix"><span class="red-hintico fl"></span><span class="redhint-p fl"><spring:message code="secondstep_zhuyishixiang" /></span></div>
        </li>
            <li>
            	<div class="icotit_div clearfix">
            	<span id="course_background" class="tit-p fl"><spring:message code="secondstep_beijing" /></span><span id="demo-tip-yellowsimple" title="<spring:message code="secondstep_tishiyi" />" class="questionmark-ico fl"></span></div>
                <div class="coursetitle">
                     <div class="prerequisite_text getFocus" id="textarea"  style="width:1024px;height:500px;"></div>
                </div>
            </li>
            <li>
            	<div class="icotit_div clearfix">
            	
            	<span id="course_objectives" class="tit-p fl"><spring:message code="secondstep_mubiao" /></span><span class="questionmark-ico fl" title="<spring:message code="secondstep_tishier" /></span> " id="demo-tip-yellowsimple1"></span></div>
                <div class="coursetitle">
                	<div class="prerequisite_text getFocus" id="textarea1"  style="width:1024px;height:500px;"></div>
                </div>
            </li>
            <li>
            	<div class="icotit_div clearfix">
            	<span id="design_principles" class="tit-p fl"><spring:message code="secondstep_yuanze" /></span><span class="questionmark-ico fl"  id="demo-tip-yellowsimple2" title="<spring:message code="secondstep_tishisan" /></span>"></span></div>
                <div class="coursetitle">
                	<div class="prerequisite_text getFocus" id="textarea2" style="width:1024px;height:500px;"></div>
                </div>
            </li>
            <li>
            	<div class="icotit_div clearfix">
            	<span id="learning_outcomes" class="tit-p fl"><spring:message code="secondstep_chengguo" /></span><span class="questionmark-ico fl" id="demo-tip-yellowsimple3" title="<spring:message code="secondstep_tishisi" />"></span></div>
                <div class="coursetitle">
                	<div class="prerequisite_text getFocus" id="textarea3"  style="width:1024px;height:500px;"></div>
                </div>
            </li>
            <li>
            	<div class="icotit_div clearfix">
            	<span id="learning_methods" class="tit-p fl"><spring:message code="secondstep_fangfa" /></span><span class="questionmark-ico fl" id="demo-tip-yellowsimple4" title="<spring:message code="secondstep_tishiwu" />"></span></div>
                <div class="coursetitle">
                	<div class="prerequisite_text getFocus" id="textarea4" style="width:1024px;height:500px;"></div>
                </div>
            </li>
        </ul>
    </div>
    <div class="nextbtn-div">
    	<a href="${ctx}/course/firstStep?courseId=${courseId}" class="btn-Style bluebg mr10"><spring:message code="secondstep_shang" /></a>
        <a href="${ctx}/course/thirdStep?courseId=${courseId}" class="btn-Style greenbg"><spring:message code="secondstep_xia" /> </a>
    </div>
    <div class="srollbar-up-btn" style="display:none;" title="<spring:message code='sixthstep_back_to_top'/>"></div>
    <%@include file="/WEB-INF/jsp/common/footer.jsp"%>
</div>
</body>
</html>
