<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ include file="/WEB-INF/jsp/common/taglib.jsp"%>
<html>
<head>
<%@include file="/WEB-INF/jsp/common/common.jsp"%>
<meta content="webkit" name="renderer" />
<meta charset="UTF-8">
<title><spring:message code='title_fabu'/></title>
<link href="${ctx}/assets/css/os_base.css?version=${cssJsVersion}" rel="stylesheet" />
<link href="${ctx}/assets/css/coursestep/stepcommon.css?version=${cssJsVersion}" rel="stylesheet" />
<link href="${ctx}/assets/css/coursestep/sixStep.css?version=${cssJsVersion}" rel="stylesheet" />

<script src="http://assets.zhihuishu.com/jquery/1.8.3/jquery.min.js" type="text/javascript"></script>
<script src="${ctx}/assets/js/course/sixthStep.js?version=${cssJsVersion}" type="text/javascript"></script>
<script src="${ctx}/assets/js/common/common.js?version=${cssJsVersion}" type="text/javascript"></script>
<script src="${ctx }/assets/js/public/jquery.poshytip-min.js" type="text/javascript"></script>
<!-- 第六步样式 -->
</head>

<body>
<%@ include file="/WEB-INF/jsp/common/header.jsp"%>
<div class="createcourse-div">
	<!-------createcourse-nav start-------->
	<%@include file="/WEB-INF/jsp/course/publicTitle.jsp"%>
    <!-------createcourse-nav end -------->
    <input id="courseId" type="hidden" value="${courseId}"/>
    <input id="linkCourseId" type="hidden" value="${linkCourseId}"/>
    <input id="state" type="hidden" value="${state}"/>
    
     <div class="stepconter-div">
    	<p class="checklist-p"><spring:message code="sixthstep_kechengwanzhengdujiancha"/><em id="checkAgain" class="check-btn" title="<spring:message code='sixthstep_re_check'/>"></em></p>
        <!-------Step 1: Basic Info start-------->
    	<div class="stepcompletion-div">
        	<p class="stepcompletion-p"><spring:message code="sixthstep_diyibu"/>: <spring:message code="publictitle_jibenxinxi"/> </p>
            <ul class="stepconte-ul">
                <li>
                    <a href="###" name="firstStep" mailValue="tit-p-coursetitle" class="icotit_div"><span class="hintico"></span><span id="name" class="tit-p"><spring:message code="firststep_coursetitle"/></span></a>
                </li>
                <li>
                    <a href="###" name="firstStep" mailValue="tit-p-courseimg" class="icotit_div"><span class="rightico"></span><span id="img" class="tit-p"><spring:message code="firststep_courseimage"/></span></a>
                </li>
                <li>
                    <a href="###" name="firstStep" mailValue="firststep_institutuion" class="icotit_div"><span class="rightico"></span><span id="institute" class="tit-p"><spring:message code="firststep_courseinstitution"/></span></a>
                </li>
                <li>
                    <a href="###" name="firstStep" mailValue="tit-p-credits" class="icotit_div clearfix"><span class="rightico"></span><span id="credit" class="tit-p noico-tit-p"><spring:message code="firststep_credits"/></span></a>
                </li>
                 <li>
                    <a href="###" name="firstStep" mailValue="tit-p-keshishu" class="icotit_div"><span class="rightico"></span><span id="period" class="tit-p noico-tit-p"><spring:message code="sixthstep_keshi"/></span></a>
                </li>
                <li>
                    <a href="###" name="firstStep" mailValue="tit-p-category" class="icotit_div"><span class="rightico"></span><span id="courseCategory" class="tit-p noico-tit-p"><spring:message code="firststep_category"/></span></a>
                </li>
                <li>
                    <a href="###" name="firstStep" mailValue="tit-p-courseinstructor" class="icotit_div"><span class="rightico"></span><span id="courseSpeaker" class="tit-p noico-tit-p"><spring:message code="firststep_courseinstructor"/></span></a>
                </li>
                <li>
                    <a href="###" name="firstStep" mailValue="tit-p-pianhua" class="icotit_div"><span class="rightico"></span><span id="videoId" class="tit-p noico-tit-p"><spring:message code="firststep_pianhua"/></span></a>
                </li>
                <li>
                    <a href="###" name="firstStep" mailValue="tit-p-prerequisite" class="icotit_div"><span class="rightico"></span><span id="courseAcademicPrepare" class="tit-p noico-tit-p"><spring:message code="firststep_prerequisite"/></span></a>
                </li>
            </ul>
        </div>
          <!-------Step 1: Basic Info end-------->
           <!-------Step 2: Summary Design start-------->
    	<div class="stepcompletion-div">
        	<p class="stepcompletion-p"><spring:message code="sixthstep_dierbu"/>: <spring:message code="sixthstep_gaiyaosheji"/></p>
            <ul class="stepconte-ul">
                <li>
                    <a href="###" name="secondStep" mailValue="course_background" class="icotit_div"><span class="hintico"></span><span id="courseBackground" class="tit-p"><spring:message code="secondstep_beijing"/></span></a>
                </li>
                <li>
                    <a href="###" name="secondStep" mailValue="course_objectives" class="icotit_div"><span class="hintico"></span><span id="courseTarget" class="tit-p"><spring:message code="secondstep_mubiao"/></span></a>
                </li>
                <li>
                    <a href="###" name="secondStep" mailValue="design_principles" class="icotit_div"><span class="hintico"></span><span id="introduction" class="tit-p"><spring:message code="secondstep_yuanze"/></span></a>
                </li>
                <li>
                    <a href="###" name="secondStep" mailValue="learning_outcomes" class="icotit_div clearfix"><span class="hintico"></span><span id="learningOutcomes" class="tit-p noico-tit-p"><spring:message code="secondstep_chengguo"/></span></a>
                </li>
                 <li>
                    <a href="###" name="secondStep" mailValue="learning_methods" class="icotit_div"><span class="hintico"></span><span id="learningMethods" class="tit-p noico-tit-p"><spring:message code="secondstep_fangfa"/></span></a>
                </li>
            </ul>
        </div>
          <!-------Step 2: Summary Design end-------->
           <!-------Step 3: Video Lectures start-------->
    	<div class="stepcompletion-div">
        	<p class="stepcompletion-p"><spring:message code="sixthstep_disanbu"/>: <spring:message code="publictitle_shipinjiangzuo"/></p>
            <ul class="stepconte-ul">
                <!-- <li>
                    <a href="###" name="thirdStep" class="icotit_div"><span class="hintico"></span><span class="tit-p">Intro-chapter</span></a>
                </li> -->
	            <!-- <li>
	                    <a href="###" name="thirdStep" class="icotit_div"><span class="hintico"></span><span class="tit-p"><spring:message code="creatcoursehome_zhang"/> 1</span></a> 
	            </li>-->
                <li id="finalExam">
                   <!-- <a href="###" name="thirdStep" class="icotit_div"><span class="hintico"></span><span class="tit-p"><spring:message code="thirdstep_exam_title"/></span></a> -->
                </li>
            </ul>
        </div>
          <!-------Step 3: Video Lectures end-------->
           <!-------Step 4: Face to Face Lectures start-------->
         
    	<div class="stepcompletion-div">
        	<p class="stepcompletion-p"><spring:message code="sixthstep_disibu"/>: <spring:message code="publictitle_miandiumianjiangzuo"/></p>
            	<ul id="fourStep" class="stepconte-ul">
               	 <!-- <li>
                  	 <a href="###" name="fourStep" class="icotit_div">
                  	 	<span class="hintico"></span><span class="tit-p">Face to Face Lecture-1</span></a>
               	 </li> -->
           	 	</ul>
        </div>
          <!-------Step 4: Face to Face Lectures end-------->
           <!-------Step 5: Assessment Strategy start-------->
    	<div class="stepcompletion-div">
        	<p class="stepcompletion-p"><spring:message code="sixthstep_diwubu"/>: <spring:message code="title_kaohecelve"/></p>
            <ul id="fifthStep" class="stepconte-ul">
                <%-- <li>
                   <a href="###" name="fiveStep" class="icotit_div"><span class="hintico"></span><span class="tit-p"><spring:message code="title_kaohecelve"/></span></a>
                </li> --%>
            </ul>
        </div>
          <!-------Step 5: Assessment Strategy end-------->
    </div>
    
        <div class="nextbtn-div">
        	<a href="${ctx}/course/fifthStep?courseId=${courseId}" class="btn-Style bluebg mr10"><spring:message code="sixthstep_shangyibu" /></a>
        	<a href="${ctx}/course/courseHome?courseId=${courseId}"  class="btn-Style darkgreenbg mr10 _preview" target="view_window"><spring:message code="sixthstep_preview" /> </a>
   			<a href="javascript:void(0);" id="launchBtn" class="btn-Style greenbg"><spring:message code="sixthstep_apply_for_launching"/></a>
   			<%-- <a href="${ctx}/course/courseHome?courseId=${courseId}" class="btn-Style greenbg" ><spring:message code="sixthstep_apply_for_launching" /> </a> --%>
        </div>
        <div class="srollbar-up-btn" style="display:none;" title="<spring:message code='sixthstep_back_to_top'/>"></div>
<%@include file="/WEB-INF/jsp/common/footer.jsp"%>
</div>
</body>

<script type="text/javascript">
	$(function(){
			$('#demo-tip-yellowsimple4').poshytip({
				className: 'questionmarksimple',
				showTimeout: 1,
				alignTo: 'target',
				alignX: 'right',
				offsetY: -55,
				offsetX: 10,
				alignY: 'center',
				allowTipHover: false
			});
			});
</script>

</html>
