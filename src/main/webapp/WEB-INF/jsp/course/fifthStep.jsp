<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ include file="/WEB-INF/jsp/common/taglib.jsp"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<%@include file="/WEB-INF/jsp/common/common.jsp"%>
<meta content="webkit" name="renderer" />
<title><spring:message code='title_kaohecelve'/></title>
<link href="${ctx}/assets/css/os_base.css?version=${cssJsVersion}" rel="stylesheet" />
<link href="${ctx}/assets/css/coursestep/stepcommon.css?version=${cssJsVersion}" rel="stylesheet" />
<link href="${ctx}/assets/css/coursestep/fifthStep_${z_locale_code}.css?version=${cssJsVersion}" rel="stylesheet" />
</head>

<body>
<%@ include file="/WEB-INF/jsp/common/header.jsp"%>
<div class="createcourse-div">
	<!-------createcourse-nav start-------->
	<%@include file="/WEB-INF/jsp/course/publicTitle.jsp"%>
    <!-------createcourse-nav end-------->
    <div class="stepconter-div">
  				<input id="courseId" name="courseId" value="${courseId }" type="hidden">
  				<input id="scoreassessruleId" name="scoreassessruleId" value="" type="hidden">
            	<div class="icotit_div clearfix"><span class="red-hintico fl"></span><span class="redhint-p fl"><spring:message code='fifthstep_assem_tip'/></span></div>
                <ul class="assessstrategylist-ul">
                    <li class="clearfix mrginbottom40">
                       	<div class="assessstrategylist-l">
                           <div class=" clearfix"> 
                           		<p class="tit-p fl">1. <spring:message code='fifthstep_learn_prog'/>:</p> 
                                <div class="totalpoints-div fr  mt-6"><span class="totalpoints-input"><input name="" id="learningProcessScoresShare" value="" data-tags=""   class="getFocus" type="text" maxlength="3"></span><span class="totalpoints"><spring:message code='fifthstep_zongfen'/></span></div>
                           </div>
                            <p class="font-p">(<spring:message code='fifthstep_learn_prog_tip'/>)</p> 
                        </div>
                        <span class="progressbar-redico"></span>
                    </li>
                    <li class="mrginbottom40">
                        <div class="assessstrategylist-l">
                           <div class=" clearfix"> 
                           		<p class="tit-p fl">2. <spring:message code='fifthstep_chapter_quiz'/>:</p> 
                                <div class="totalpoints-div fr  mt-6"><span class="totalpoints-input"><input name="" id="chapterTestScoresShare" value="" data-tags=""   class="getFocus" type="text" maxlength="3"></span><span class="totalpoints"><spring:message code='fifthstep_zongfen'/></span></div>
                           </div>
                            <p class="font-p">(<spring:message code='fifthstep_chapter_quiz_tip'/>)</p> 
                            
                        </div>
                        <span class="progressbar-blueico"></span>
                    </li>
                    <li class="mrginbottom40">
                    	<div class="assessstrategylist-l">
                           <div class=" clearfix"> 
                           		<p class="tit-p fl">3. <spring:message code='fifthstep_face_to_face'/>:</p> 
                                <div class="totalpoints-div fr"><span class="totalpoints-font" id="meetCourseScoreShare"></span><span class="totalpoints"><spring:message code='fifthstep_zongfen'/></span></div>
                           </div>
                            <p class="font-p ">(<spring:message code='fifthstep_face_to_face_tip'/>)</p> 
                            <ul class="chapter-ul" id="meetCourseList">
<!--                             	<li class="clearfix"> -->
<!--                                 	<div class="tit-p tit-p-leecture fl"> -->
<!--                                     	<span class="fl">face to face lecture - 1:</span> -->
<!--                                         <div class="facelecturediv fl"> -->
<!--                                         	<div class="attendance-p clearfix"><span class="fl">Attendance</span><div class="totalpoints-div fr  mt-6"><span class="totalpoints-input"><input name="" data-tags=""   class="getFocus" type="text" maxlength="3"></span><span class="totalpoints">Points</span></div></div> -->
<!--                                             <div><span class="fl">Performance</span><div class="totalpoints-div fr  mt-15"><span class="totalpoints-input"><input name="" data-tags=""   class="getFocus" type="text" maxlength="3"></span><span class="totalpoints">Points</span></div></div> -->
<!--                                         </div> -->
<!--                                     </div>  -->
                                    
<!--                                 </li> -->
<!--                                 <li class="clearfix"> -->
<!--                                 	<div class="tit-p tit-p-leecture fl"> -->
<!--                                     	<span class="fl">face to face lecture - 2:</span> -->
<!--                                         <div class="facelecturediv fl"> -->
<!--                                         	<div class="attendance-p clearfix"><span class="fl">Attendance</span><div class="totalpoints-div fr  mt-6"><span class="totalpoints-input"><input name="" data-tags=""   class="getFocus" type="text"></span><span class="totalpoints">Points</span></div></div> -->
<!--                                             <div><span class="fl">Performance</span><div class="totalpoints-div fr  mt-15"><span class="totalpoints-input"><input name="" data-tags=""   class="getFocus" type="text"></span><span class="totalpoints">Points</span></div></div> -->
<!--                                         </div> -->
<!--                                     </div>  -->
                                    
<!--                                 </li> -->
                            </ul>
                        </div>
                    	<span class="progressbar-yellowico"></span>
                    </li>
                    <li class="mrginbottom40">
                    	<div class="assessstrategylist-l">
                           <div class=" clearfix"> 
                           		<p class="tit-p fl">4. <spring:message code='fifthstep_final_exam'/>：</p> 
                                <div class="totalpoints-div fr mt-15"><span class="totalpoints-input"><input name="" id="finalExamScoreShare" value="" data-tags=""   class="getFocus" type="text" maxlength="3"></span><span class="totalpoints"><spring:message code='fifthstep_zongfen'/></span></div>
                           </div>
                            <p class="font-p">(<spring:message code='fifthstep_final_exam_tip'/>)</p> 
                        </div>
                    	<span class="progressbar-greenico"></span>
                    </li>
                    <li class="">
                    	<div class="assessstrategylist-l">
                           <div class=" clearfix"> 
                           		<p class="tit-p fl">5. <spring:message code='fifthstep_forum'/>：</p> 
                                <div class="totalpoints-div mt-15 fr"><span class="totalpoints-input"><input name="" id="bbsScore" value="" data-tags=""   class="getFocus" type="text" maxlength="3"></span><span class="totalpoints"><spring:message code='fifthstep_zongfen'/></span></div>
                           </div>
                            <p class="font-p">(<spring:message code='fifthstep_save_and_next'/>)</p> 
                        </div>
                    	<span class="progressbar-grayico"></span>
                    </li>
                </ul>
     </div>
     <div class="nextbtn-div">
    	<a href="${ctx}/course/fourStep?courseId=${courseId }" class="btn-Style bluebg mr10"><spring:message code='fifthstep_shangyibu'/></a>
        <a href="#" class="btn-Style greenbg" id="subScoreAssessRule"><spring:message code='fifthstep_xiayibu'/></a>
    </div> 
    <div class="progressbar-div" id="progressbar">
    	<ul>
        	<li style="width:0%;" name="roundedCorners" class="redbar" id="li_learningProcessScoresShare">&nbsp;<span  class="percentage-font" id="LP_learningProcessScoresShare">LP: 0%</span></li>
            <li style="width:0%;" name="roundedCorners" class="bluebar" id="li_chapterTestScoresShare">&nbsp;<span class="percentage-font" id="CT_chapterTestScoresShare">CT: 0%</span></li>
            <li style="width:0%;" name="roundedCorners" class="yellowbar" id="li_meetCourseScoreShare">&nbsp;<span class="percentage-font" id="FFL_meetCourseScoreShare">FFL: 0%</span></li>
            <li style="width:0%;" name="roundedCorners" class="greenbar" id="li_finalExamScoreShare">&nbsp;<span  class="percentage-font" id="FE_finalExamScoreShare">FE: 0%</span></li>
            <li style="width:0%;" name="roundedCorners" class="graybar" id="li_bbsScore">&nbsp;<span  class="percentage-font" id="F_bbsScore">F: 0%</span></li>
        </ul>
    </div>
    <div class="srollbar-up-btn" style="display:none;" title="<spring:message code='sixthstep_back_to_top'/>"></div>
	<%@include file="/WEB-INF/jsp/common/footer.jsp"%>
</div>
<script src="${ctx}/assets/js/course/fifthStep.js?version=${cssJsVersion}" type="text/javascript"></script>

</body>
</html>
