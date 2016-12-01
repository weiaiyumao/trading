<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ include file="/WEB-INF/jsp/common/taglib.jsp"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<%@ taglib prefix="c" uri="http://java.sun.com/jsp/jstl/core" %>
<html>
<head>
<%@include file="/WEB-INF/jsp/common/common.jsp"%>
<meta content="webkit" name="renderer" />
<title><spring:message code='title_jianmiankejiaocheng'/></title>
<link href="${ctx}/assets/css/os_base.css" rel="stylesheet" />
<link href="${ctx}/assets/css/coursestep/stepcommon.css?version=${cssJsVersion}" rel="stylesheet" />
<link href="${ctx}/assets/css/coursestep/fourthStep.css?version=${cssJsVersion}" rel="stylesheet" />
</head>
<style>
input {
    color: black;
}
</style>
<body>
<%@ include file="/WEB-INF/jsp/common/header.jsp"%>
<div class="createcourse-div">
	<!-------createcourse-nav start-------->
	<%@include file="/WEB-INF/jsp/course/publicTitle.jsp"%>
    <!-------createcourse-nav end-------->
    <div class="stepconter-div">
    	<ul class="stepconte-ul">
    		<input id="courseId" name="courseId" value="${courseId }" type="hidden">
    		<input id="meetCourseDtoListSize" value="<c:if test="${MeetCourseDtoList != null }">${fn:length(MeetCourseDtoList)}</c:if><c:if test="${MeetCourseDtoList == null }">0</c:if>" type="hidden">
    		<c:forEach items="${MeetCourseDtoList }" var="meetCourseDto" varStatus="status">
    			<li name="lecture" id="Lectureli${ status.index + 1}">
	            	<div class="icotit_div"><span id="mark${ status.index + 1}" class="${(meetCourseDto.courseTopic == '' || meetCourseDto.taskType == '' || meetCourseDto.speakerName == '' || meetCourseDto.teachRequire == '' || meetCourseDto.courseTopic == null || meetCourseDto.taskType == null || meetCourseDto.speakerName == null || meetCourseDto.teachRequire == null) == true ? 'hintico' : 'rightico' }"></span></div>
	                <div class="coursetitle">
	                   	<div class="faceLecture-div" >
	                    	<div class="faceLecture-title clearfix" id="title_clearfix${ status.index + 1}" onclick="hideLecture(${ status.index + 1});">
	                            <span class="fl"><spring:message code='fourstep_jianmianke'/>：<font id="fl${ status.index + 1}" name="sort">${ status.index + 1}</font></span>
	                            <span class="uparrow" id="span${ status.index + 1}"></span>
	                        </div>
	                        <span class="faceLecturedeleteico" id="removeLec${ status.index + 1}" number="${ status.index + 1}" onclick="removeLecture(${ status.index + 1},${meetCourseDto.meetCourseId });"></span>
	                    </div>
	                    <div class="faceLecture-content" id="LectureModel${ status.index + 1}">
	                    	<ul>
	                        	<li>
	                            	<p><spring:message code='fourstep_zhuti'/></p>
	                                <div class="themediv">
	                                	<input type="text" placeholder="" maxlength="120" value="${meetCourseDto.courseTopic }" onkeyup="courseTitelLength(${meetCourseDto.meetCourseId },${ status.index + 1});" class="getFocus fl" data-tags="" id="courseTopic${meetCourseDto.meetCourseId }" name="" onchange="editLecture(courseTopic${meetCourseDto.meetCourseId },'courseTopic',${meetCourseDto.meetCourseId },${ status.index + 1});">
	                                    <span class="wordlimit fr" id="word${ status.index + 1}">120</span>
	                                 </div>
	                            </li>
								<li>
	                            	<p><spring:message code='fourstep_jiaoxuemoshi'/></p>
	                                <div class="teachingmodel-div">
										<select id="taskType${meetCourseDto.meetCourseId }" onchange="editLecture(taskType${meetCourseDto.meetCourseId },'taskType',${meetCourseDto.meetCourseId },${ status.index + 1});">
											<option value =""><spring:message code='fourthstep_please_choose_mode'/></option>
											<option value ="7" <c:if test="${meetCourseDto.taskType == '7' }">selected</c:if>><spring:message code='fourstep_zhibohudongke'/></option>
											<option value ="8" <c:if test="${meetCourseDto.taskType == '8' }">selected</c:if>><spring:message code='fourstep_zhongguojizhongmianshou'/></option> 
											<option value ="9" <c:if test="${meetCourseDto.taskType == '9' }">selected</c:if>><spring:message code='fourstep_faguojizhongmianshou'/></option> 
										</select>
									</div>
	                            </li>
								<li>
	                            	<p class="clearfix"><span class="fl"><spring:message code='fourstep_jiaoxueyaoqiu'/></span><span class="questionmark-ico fl" id="demo-tip-yellowsimple5${ status.index + 1}" title="<spring:message code="fourstep_jiaoxueyaoqiutishi" />"></span></p>
	                                <div class="teachingmodel-div">
	                                	<div class="prerequisite_text getFocus" id="teachRequire${ status.index + 1}" sname="ue" meetCourseId="${meetCourseDto.meetCourseId }" teachRequire='${meetCourseDto.teachRequire }' ></div>
									</div>
	                            </li>
	                            <li>
	                            	<p><spring:message code='fourstep_zhujiangren'/></p>
	                                <div class="teachingrequirements-div">
	                                    <input type="text" placeholder="" value="${meetCourseDto.speakerName }" class="institution_input getFocus" maxlength="50" data-tags="" id="speakerStr${meetCourseDto.meetCourseId }" onchange="editLecture(speakerStr${meetCourseDto.meetCourseId },'speakerStr',${meetCourseDto.meetCourseId },${ status.index + 1});">
									</div>
	                            </li>
	                            <li>
	                                <a href="javascript:void(0);" class="Savebtn mr10" id="save1" onclick="hideLecture(${ status.index + 1});"><spring:message code='fourstep_baocun'/></span></a>
								</li>
	                        </ul>
	                    </div>
	                </div>
	            </li>
    		</c:forEach>
    	
			<li id="createLecture">
				<div class="coursetitle">
				<a href="javascript:void(0);" class="lectereaddico-div clearfix" onclick="createLecturePage(<c:if test="${MeetCourseDtoList != null }">${fn:length(MeetCourseDtoList)}</c:if><c:if test="${MeetCourseDtoList == null }">0</c:if>);" id="createLecture-div-a"><span class="lectereaddico fl"></span><span class="fl"><spring:message code='fourstep_tianjiajianmianke'/></span></a>
				</div>
			</li>
        </ul>
    </div>
    <div class="nextbtn-div">
    	<a href="${ctx}/course/thirdStep?courseId=${courseId }" class="btn-Style bluebg  mr10"><spring:message code='fourstep_zuihouyibu'/></a>
    	<a href="${ctx}/course/fifthStep?courseId=${courseId }" class="btn-Style greenbg"><spring:message code='fourstep_xiayibu'/></a>
    </div>
	<div class="srollbar-up-btn" style="display:none;" title="<spring:message code='sixthstep_back_to_top'/>"></div>
	<%@include file="/WEB-INF/jsp/common/footer.jsp"%>
</div>

</body>
<script type="text/javascript" charset="utf-8" src="${ctx}/assets/js/ueditor/1.4.2/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="${ctx}/assets/js/ueditor/1.4.2/ueditor.all.min.js"> </script>
<script type="text/javascript" charset="utf-8" src="${ctx}/assets/js/ueditor/1.4.2/lang/en/en.js"></script>
<script src="${ctx}/assets/js/common/common.js" type="text/javascript"></script>
<script src="${ctx}/assets/js/public/jquery.poshytip-min.js" type="text/javascript"></script>
<script src="${ctx}/assets/js/course/fourthStep.js?version=${cssJsVersion}" type="text/javascript"></script>
</html>
