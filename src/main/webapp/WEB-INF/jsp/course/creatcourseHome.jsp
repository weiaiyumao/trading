<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ include file="/WEB-INF/jsp/common/taglib.jsp"%>
<html>
<head>
<%@include file="/WEB-INF/jsp/common/common.jsp"%>
<meta content="webkit" name="renderer" />
<meta charset="UTF-8">
<title><spring:message code="title_kechengzhuye" /></title>

<!-- 自定义css -->
<link href="${ctx}/assets/css/os_base_${z_locale_code}.css" rel="stylesheet"/>
<link href="${ctx}/assets/css/creatcourse/creatcourse-home_${z_locale_code}.css?version=${cssJsVersion}" rel="stylesheet" />
<link href="${ctx}/assets/css/course/createcourseHome.css?version=${cssJsVersion}" rel="stylesheet" />
<link href="${ctx}/assets/css/coursestep/stepcommon.css?version=${cssJsVersion}" rel="stylesheet" />

<!-- 自定义jss -->
<script type="text/javascript" src="${ctx}/assets/js/public/creatcourse-home/creatcourse-home.js?version=${cssJsVersion}"></script>
<script type="text/javascript" src="${ctx}/assets/js/public/scrollbar.js"></script>
<script type="text/javascript" src="${ctx}/assets/js/course/creatcourseHome.js?version=${cssJsVersion}"></script>
<script type="text/javascript" src="${ctx}/assets/js/common/common.js?version=${cssJsVersion}"></script>

<!-- 播放器css+js -->
<%@include file="/WEB-INF/jsp/common/public-player-css.jsp"%>
<%@include file="/WEB-INF/jsp/common/public-player-js.jsp"%>

</head>
<body>
<%@ include file="/WEB-INF/jsp/common/header.jsp"%>
<div class="coursemessage-wrap clearfix">
	 <input type="hidden" name="courseId" id="courseId" value="${courseInfo.courseId}">
     <h1 class="coursemessage-title" title="${courseInfo.name}">${courseInfo.name}</h1>
	 <!--:start coursemessage-content-->
	 <div class="coursemessage-content clearfix">
	      <!--:start coursemessage-lf-->
	      <div class="coursemessage-lf fl">
		       <div class="video-box" id="PromoVideo" >
			        <img width="610" height="340" src="<c:if test="${empty courseInfo.img}">http://image.zhihuishu.com/testzhs/ablecommons/demo/201609/f610ef2152184049a579a331b935ace1.jpg</c:if><c:if test="${not empty courseInfo.img }">${courseInfo.img }</c:if>" />
					<c:if test="${not empty clipsDto.videoId}"><span class="player-btn" id=""></span></c:if>
					   <!--  播放地址 -->
	                    <input type="hidden" id="videoSrc" value="${clipsDto.videoId }" src="${clipsDto.videoPath }">
	                    <span style="display:none"><input type="text" id="linkCourseId" name="linkCourseId"></span>
	                    <!--  播放器 -->
			   </div>
			   <!-- 播放器区域 Start-->
						<%@include file="/WEB-INF/jsp/common/publicVideoPlayer.jsp"%>
					
					<!-- 播放器区域 End-->
			   <div class="videorecommend-wrap">
			        <div class="videorecomd-list sliderItem">
					     <ul id="video-ul" class="videorecomd-list-ul">
							  <c:if test="${not empty lessonVideoList}">
							   <c:forEach items="${lessonVideoList}" var="lessVideo" varStatus="status">
							      <li class="videoLi-class">
							       <a href="javascript:void(0);"><img width="150" height="84" src="${lessVideo.videoImg}" title="${lessVideo.lessonName}"/></a>
							       <c:if test='${status.index<2}'><input type="hidden" class="videoinput-class" value="${lessVideo.videoId}" src="${lessVideo.videoUrl}"></c:if>
							      </li>
							   </c:forEach>
							  </c:if>
						 </ul>
					</div>
					<div id="sliderprev" class="lf-prev project-ico"></div>
					<div id="slidernext" class="rt-next project-ico"></div>
			   </div> 
		  </div>
		  <!--:end coursemessage-lf-->

          <!--:start coursemessage-rt-->
		  <div class="coursemessage-rt fr">
		       <!--:start teacher-info-top-->
		       <div class="teacher-info-top clearfix">
			        <h3 class="m-lecturer"><spring:message code="creatcoursehome_zhujiangren" /></h3>
					<div class="lecturer-brief-box clearfix">
					     <div class="lecturer-pic fl">
						      <img width="147" height="207" src="<c:if test="${empty mainLecturerInfo.img }">http://image.zhihuishu.com/testzhs/ablecommons/demo/201609/b8c1848928664285b8b89383fa337e9d.jpg</c:if><c:if test="${not empty mainLecturerInfo.img }">${mainLecturerInfo.img }</c:if>" />
							  <span class="lecturer-name">
							   <span class="lecturer-name-container" title="${mainLecturerInfo.username}">${mainLecturerInfo.username}</span></br>
							   <span class="lecturer-name-container" title="${mainLecturerInfo.jobstatus }">${mainLecturerInfo.jobstatus}</span>
							  </span>
						 </div>
						 <div class="lecturer-introd fr">
							  <div class="lecturer-conte-div">
								   ${mainLecturerInfo.decription}
							  </div>
						 </div>
						 <br>
  						 <div class="show-wrap  nano h330 has-scrollbar" style='display:none;'>
                            <div class="content">
	                             <div class="show-wrap-div">
	  								${mainLecturerInfo.decription }
								 </div>
							</div>
  						</div>
                         
					</div>
			   </div>
               <!--:end teacher-info-top-->

               <!--:start lecturer-instit-wrap-->
			   <div class="lecturer-instit-wrap clearfix">
			        <ul class=""> 
					    <li class="clearfix"><span class="fl"><spring:message code="creatcoursehome_kaikejigou" /></span>
					    <span class="fr" id="institution">${fn:trim(courseInfo.institute)}</span></li>
						<li class="clearfix"><span class="fl"><spring:message code="creatcoursehome_xuefen" /></span><span class="fr">${courseInfo.credit}</span></li>
						<li class="clearfix">
						    <span class="fl"><spring:message code="creatcoursehome_xueshi" /></span><span class="fr">${courseInfo.onlineCoursePeriod + courseInfo.meetCoursePeriod}</span>
						    <div class="classhoues-lect clearfix">
						         <span class="fl"><spring:message code="creatcoursehome_shipinxueshi" /></span><span class="fr">${courseInfo.onlineCoursePeriod}</span>
						    </div>
						    <div class="classhoues-lect clearfix">
						         <span class="fl"><spring:message code="creatcoursehome_mianduimianxueshi" /></span><span class="fr">${courseInfo.meetCoursePeriod}</span>
						    </div>
						</li>
					</ul>
			   </div>
			   <!--:end lecturer-instit-wrap-->
 
   
			   <div class="prequisit-wrap clearfix">
			        <h3 class="m-lecturer"><spring:message code="creatcoursehome_xueshuzhunbei" /></h3>
					<div class="prequis-cont">
						<div class="prequis">
						    ${courseInfo.courseAcademicPrepare}
						</div>
					</div>
				
				    <div class="preq-show-wrap  nano h130 has-scrollbar"  style='display:none;'>
					<div class="content">
					<div class="preq-show-div">
					     ${courseInfo.courseAcademicPrepare}
					</div>
					</div>
					</div>
			   </div>
		  </div>
		  <!--:end coursemessage-rt-->
	 </div>
	 <!--:end coursemessage-content-->
</div>


<div class="coursemessage-navwrap clearfix">
	<div class="coursemessage-navwrap1 selectclassroom"  id="coursemessageid">
         <div class="coursemessage-nav">
		 <ul class="" id="ultitle">
			 <li><a class="ft-cur" href="javascript:void(0);"><spring:message code="creatcoursehome_kechengjianjie" /></a></li>
			 <li><a href="javascript:void(0);"><spring:message code="creatcoursehome_xuexijihua" /></a></li>
			 <li><a href="javascript:void(0);"><spring:message code="publictitle_pingjia" /></a></li>
			 <li><a href="javascript:void(0);"><spring:message code="creatcoursehome_kechengbiao" /></a></li>
			 <li  class="syllabusli"><a href="javascript:void(0);"><spring:message code="creatcoursehome_jiaoxuedagang" /></a></li> 
		 </ul>
	 </div>
 </div>
</div>

<!-- 1F -->
<div class="course-introd-wrap clearfix div-F" id="1F">
     <span class="set-phone"></span>
	 <div class="course-introd-list-box clearfix">
     	<span class="introduction-bg"></span>
	      <ul class="" id="findtable">
		      <li class="clearfix tableclass">
			      <h3 class="course-name-introd"><spring:message code="creatcoursehome_keshibeijing" /></h3>
				  <div class="course-introd-cont" style="height: 58px;">
				  	<div class="clearfix">
					  ${courseInfo.courseBackground }
					</div>
				  </div>
				  <div style='display:none;' id="course-introd-cont-id0">
				  		${courseInfo.courseBackground }
				  </div>
			  </li>
              <li class="clearfix tableclass">
			      <h3 class="course-name-introd"><spring:message code="creatcoursehome_keshimubiao" /></h3>
				  <div class="course-introd-cont" style="height: 58px;">
				  	<div class="clearfix">
					  ${courseInfo.courseTarget }
					</div> 
				  </div>
				  <div style='display:none;' id="course-introd-cont-id1">
				  		${courseInfo.courseTarget }
				  </div>
			  </li>
              <li class="clearfix tableclass">
			      <h3 class="course-name-introd"><spring:message code="creatcoursehome_shejiyuanze" /></h3>
				  <div class="course-introd-cont" style="height: 58px;">
				  	<div class="clearfix">
					  ${courseInfo.introduction}
					</div>
				  </div>
				  <div style='display:none;' id="course-introd-cont-id2">
				  		 ${courseInfo.introduction}
				  </div>
			  </li>
              <li class="clearfix tableclass">
			      <h3 class="course-name-introd"><spring:message code="creatcoursehome_xuexichengguo" /></h3>
				  <div class="course-introd-cont" style="height: 58px;">
				  	<div class="clearfix">
					  ${courseInfo.learningOutcomes }
					</div>
				  </div>
				  <div style='display:none;' id="course-introd-cont-id3">
				  		 ${courseInfo.learningOutcomes }
				  </div>
			  </li>
              <li class="clearfix tableclass">
			      <h3 class="course-name-introd"><spring:message code="creatcoursehome_xuexifangfa" /></h3>
				  <div class="course-introd-cont" style="height: 58px;"> 
				  	<div class="clearfix">
					  ${courseInfo.learningMethods }
					</div>
				  </div>
				  <div style='display:none;' id="course-introd-cont-id4">
				  		 ${courseInfo.learningMethods }
				  </div>
			  </li>
		  </ul>
	 </div>
</div>

<div class="studytasks-wrap div-F" id="2F">
	<div class="studytasks-div">
    	<div class="studytasksbg">
        </div>
        <div class="studytaskscontent-div">
        
              <div class="studytasks-content">
                <p class="studytasks-p"><spring:message code="creatcoursehome_daxiexuexijihua"/></p>
                <p class="onlinelearning-p"><spring:message code="creatcoursehome_jiaxianxuexi" /></p>
                <div class="onlinelearning-div clearfix" style="text-align:center;">
                    <span class="onlinelearning-l">
                        <span class="question-tit"><spring:message code="creatcoursehome_zongzhangshu" /></span>
                        <span class="number">${count.chaptersCount}</span>
                    </span>
                    <span class="onlinelearning-c">
                        <span class="question-tit"><spring:message code="creatcoursehome_kechengshipingzongshu" /></span>
                        <span class="number">${count.videosCount}</span>
                    </span>
                    <span class="onlinelearning-r">
                        <span class="question-tit"><spring:message code="creatcoursehome_shipingzongshichang" /></span>
                        <c:if test="${count.videosCountTime>59}">
                        <span class="number videonumber"><fmt:formatNumber value="${count.videosCountTime/60}" type="number" pattern="#"/></span>
                        <span class="minutes"><spring:message code="creatcoursehome_fenzhong"/></span>
                        </c:if>
                        <c:if test="${count.videosCountTime<60}">
                        <span class="number videonumber">${count.videosCountTime}</span>
                        <span class="minutes"><spring:message code="creatcoursehome_miao"/></span>
                        </c:if>
                    </span>
                </div>
              </div>
           
             
             <div class="facelectures-wrap">
                <p><spring:message code="creatcoursehome_miandiumianjiangzuo" /></p>
                 <table width="1000">
                    <thead>
                    <tr>
                    <th><spring:message code="creatcoursehome_bianhao" /></th>
                    <th><spring:message code="creatcoursehome_zhuti" /></th>
                    <th><spring:message code="creatcoursehome_jiaoxuemoshi" /></th>
                    <th><spring:message code="creatcoursehome_zhujiangren" /></th>
                    </tr>
                    </thead>
                    <tbody>
                    <c:forEach items="${meetCourseInfos}" var="meet" varStatus="meetStatus">
	                    <tr>
		                    <td><div class="number-td" title="${meetStatus.count  }">${meetStatus.count }</div></td>
		                    <td><div class="theme-td" title="${meet.courseTopic }">${meet.courseTopic }</div></td>
		                    <td><div class="teachingmodel-td">
		                    	 <c:if test="${meet.taskType==7 }"><spring:message code='fourstep_zhibohudongke'/></c:if>
		                    	 <c:if test="${meet.taskType==8 }"><spring:message code='fourstep_zhongguojizhongmianshou'/></c:if>
		                    	 <c:if test="${meet.taskType==9 }"><spring:message code='fourstep_faguojizhongmianshou'/></c:if>
		                    </div></td>
		                    <td><div class="mainlecture-td" title="${meet.speakerName }">${meet.speakerName }</div></td>
	                    </tr>
                    </c:forEach>
                    </tbody>
                    </table>
    
            </div>
        </div>
    </div>
</div>
<!-- 3F -->
<!--assessmentstrategy-wrap start-->
<div class="assessmentstrategy-wrap div-F" id="3F">
	<div class="assessmentstrategy-div">
    	<div class="assessmentstrategy-content">
        	<p class="studytasks-p"><spring:message code="creatcoursehome_daxiekaohecenue" /></p>
            <div class="fullmark-div">
            	<p class="fullmark-p"><spring:message code="creatcoursehome_zhongfen" /> <span class="ininum">${assessRule.totalScore}<c:if test="${empty assessRule.totalScore}">0</c:if></span> <spring:message code="creatcoursehome_fen" /></p>
            </div>
      	<div class="fullmark-progressbar-div clearfix">
              <ul class="fullmark-ul fl">
                  <li style="width:${assessRule.learningProcessScoresShare}%;" class="fullmark-redbar">&nbsp;<span class="fullmark-percentage-font ininum">
                   ${assessRule.learningProcessScoresShare}
                   <c:if test="${empty assessRule.learningProcessScoresShare}">0</c:if></span>
                  </li>
                  <li style="width:${assessRule.chapterTestScoresShare}%;" class="fullmark-bluebar">&nbsp;<span class="fullmark-percentage-font ininum">
                   ${assessRule.chapterTestScoresShare}
                   <c:if test="${empty assessRule.chapterTestScoresShare}">0</c:if> </span>
                  </li>
                  <li style="width:${assessRule.meetCourseScoreShare}%;" class="fullmark-yellowbar">&nbsp;<span class="fullmark-percentage-font ininum">
                   ${assessRule.meetCourseScoreShare}
                   <c:if test="${empty assessRule.meetCourseScoreShare}">0</c:if></span>
                  </li>
                  <li style="width:${assessRule.finalExamScoreShare}%;" class="fullmark-greenbar">&nbsp;<span class="fullmark-percentage-font ininum">
                   ${assessRule.finalExamScoreShare}
                   <c:if test="${empty assessRule.finalExamScoreShare}">0</c:if></span>
                  </li>
                  <li style="width:${assessRule.bbsScore}%;" class="fullmark-graybar">&nbsp;<span class="fullmark-percentage-font ininum">
                   ${assessRule.bbsScore}
                   <c:if test="${empty assessRule.bbsScore}">0</c:if></span>
                  </li>
              </ul>
      	</div>
        <div class="scoringcriteria-div">
        	<ul>
            	<li>
            	<span class="points_redico fl"></span>
            	<span class="fl learningprogress-p"><spring:message code="creatcoursehome_xuexijindu" />
            	<span class="ininum">
            	 <c:if test="${not empty assessRule.learningProcessScoresShare}">${assessRule.learningProcessScoresShare}</c:if>
                 <c:if test="${empty assessRule.learningProcessScoresShare}">0</c:if></span> 
                 <spring:message code="creatcoursehome_fen" /></span>
                </li>
               	<li>
               	<span class="points_blueico fl"></span>
               	<span class="fl learningprogress-p"><spring:message code="creatcoursehome_zhangceshi" />
               	<span class="ininum">
               	  <c:if test="${not empty assessRule.chapterTestScoresShare}">${assessRule.chapterTestScoresShare}</c:if>
                  <c:if test="${empty assessRule.chapterTestScoresShare}">0</c:if></span>
                  <spring:message code="creatcoursehome_fen" /></span>
               	</li>
               	<li>
               	<span class="points_yellowico fl"></span>
               	<span class="fl learningprogress-p"><spring:message code="creatcoursehome_jianmianke" />
               	<span class="ininum">
                  <c:if test="${not empty assessRule.meetCourseScoreShare}">${assessRule.meetCourseScoreShare}</c:if>
                  <c:if test="${empty assessRule.meetCourseScoreShare}">0</c:if></span>
                  <spring:message code="creatcoursehome_fen" /></span>
               	</li>
                <li>
                <span class="points_greenico fl"></span>
                <span class="fl learningprogress-p"><spring:message code="creatcoursehome_qimokaoshi" />
                <span class="ininum">
                    <c:if test="${not empty assessRule.finalExamScoreShare}">${assessRule.finalExamScoreShare}</c:if>
                    <c:if test="${empty assessRule.finalExamScoreShare}">0</c:if></span>
                    <spring:message code="creatcoursehome_fen" /></span>
                </li>
                <li>
                <span class="points_grayico fl"></span>
                <span class="fl learningprogress-p"><spring:message code="creatcoursehome_luntang" />
                <span class="ininum">
                    <c:if test="${not empty assessRule.bbsScore}">${assessRule.bbsScore}</c:if>
                    <c:if test="${empty assessRule.bbsScore}">0</c:if></span>
                    <spring:message code="creatcoursehome_fen" /></span>
                </li>
            </ul>
        </div>
        </div>
    </div>
</div>
<!--assessmentstrategy-wrap end -->
<!-- 4F -->
<div class="courseschedule-wrap" id="4F">
	<div class="courseschedule-div">
    	<div class="courseschedule-content"><p class="courseschedule-tit"><spring:message code="creatcoursehome_daxiekechengbiao" /></p></div>
        <div class="teachinplanview-warap">
    	<ul class="teachinplanview-ul">
        	<li>
            	<div class="teachinstartend-div">
                	<span class="crirclebig-bg"><span class="crirclefont"><spring:message code="creatcoursehome_kaishi"/></br><spring:message code="creatcoursehome_xuexi"/></span></span>
                </div>
                 <c:if test="${not empty chapterList}">
                    <c:forEach items="${chapterList}" var="chapterInfo" varStatus="status">
                  <div class="teachindaytime-div">
                	<span class="crirclebig-bg">
                	<span class="crirclefont">
                	  ${chapterInfo.limitDay}<c:if test="${empty chapterInfo.limitDay}">0</c:if> 
                	  <spring:message code="creatcoursehome_tian"/>
                     </span>
                	</span>
                    <div class="teachindaytime-content">
                    	<p class="chaptertit-p"><spring:message code="creatcoursehome_zhang"/> ${status.index+1}
                    	<span class="minumun-tip">(<spring:message code="creatcoursehome_zuidixueshi"/>${chapterInfo.studyHour}
                    	<c:if test="${empty chapterInfo.studyHour}">0</c:if>)</span></br>${chapterInfo.name}</p>
						<ul class="teachindaytime-ul">
                        	<c:forEach items="${chapterInfo.lessonList}" var="lesson" varStatus="sstatus" >
                        	  <li title="${lesson.name}">${sstatus.index+1}:${lesson.name }</li>
                        	</c:forEach>
                        </ul>
                        <div class="videodataico-div">
                        	<span class="videoico-span fl"><span  class="videoico fl" title="<spring:message code='creatcoursehome_video'/>"></span><span class="videodatafont fl">
                        	${mapCountVideo[chapterInfo.id]}<c:if test="${empty mapCountVideo[chapterInfo.id]}">0</c:if></span></span>
                            <span class="dataico-span fl"><span class="dataico fl" title="<spring:message code='creatcoursehome_zhangtaolun'/>"></span><span class="videodatafont fl">
                            ${mapCountBbs[chapterInfo.id]}<c:if test="${empty mapCountBbs[chapterInfo.id]}">0</c:if></span></span>
                        </div>
                    </div>
                    <div class="chapter-div clearfix">
                    	<span class="chapter-font"><spring:message code="creatcoursehome_zhangceshi"/> ${status.index+1}</span>
                        <span class="chapter-ico"></span>
                    </div>
                 </div>    
                    
                    </c:forEach>
                
                 </c:if>
                
                </div>
                <div class="teachinfinalexam-div">
                	<span class="crirclebig-bg"><span class="crirclefont"><spring:message code="creatcoursehome_qimo"/></br><spring:message code="creatcoursehome_kaoshi"/></span></span>
                    <span class="crircle-border"></span>
                </div>
                <div class="teachinstartend-div">
                	<span class="crirclebig-bg"><span class="crirclefont"><spring:message code="creatcoursehome_jieshu"/></br>...</span></span>
                </div>
                
            </li>
        </ul>
    </div>
    </div>
</div>

<!-- 5F -->
<div class="course-introd-wrap syllabus-wrap div-F" id="5F">
	<div class="syllabus-div">
    	<p class="syllabus-tit"><spring:message code="creatcoursehome_daxiejiaoxuedagang"></spring:message></p>
        	<ul class="syllabus-ul">
              <c:if test="${not empty chapterList}">
              <c:forEach items="${chapterList}"  var="chapterInfo" varStatus="status">
                  <li class="chapterList chapterInfoClass">
                    <c:set var="string2" value="${fn:trim(chapterInfo.name)}"/>
            	   <div class="chaptertitlist-p"><spring:message code="creatcoursehome_zhang"/>&nbsp;${status.index+1}:&nbsp;${fn:trim(chapterInfo.name)}</div>
                    <p>${chapterInfo.description}</p>
                  <ul class="section-title-ul">
                  <c:forEach  items="${chapterInfo.lessonList}" var="lesson" varStatus="status">
                      <li>
                		  <h3 class="section-title"><spring:message code="creatcoursehome_jie"></spring:message>&nbsp;${status.index+1}:&nbsp;${fn:trim(lesson.name)}</h3>
                          <p>${lesson.introduction}</p>
                      </li>
                  </c:forEach>
                
                </ul>
                </li>
              </c:forEach>
            
            </c:if>
        </ul>
    </div>
</div>
<div class="srollbar-up-btn"  title="<spring:message code='sixthstep_back_to_top'/>"></div>
<%@ include file="/WEB-INF/jsp/common/footer.jsp"%>
<script>
$(function(){
	displayText(); 
	backToTop();
	(function($){
		var scrollFunc = function(F){
			var F1 = $("#1F").offset().top-63;
			var F2 = $("#2F").offset().top-63;
			var F3 = $("#3F").offset().top-63;
			var F4 = $("#4F").offset().top-63;
			var F5 = $("#5F").offset().top-63;
			var nowScrollTop = $(window).scrollTop();
			if( F ) {
				F1 = $("#1F").offset().top-63;
				F2 = $("#2F").offset().top-63;
				F3 = $("#3F").offset().top-63;
				F4 = $("#4F").offset().top-63;
				F5 = $("#5F").offset().top-63;
				switch(F){
					case 1 : 
						nowScrollTop = F1;
						break;
					case 2 : 
						nowScrollTop = F2;
						break;
					case 3 : 
						nowScrollTop = F3;
						break;
					case 4 : 
						nowScrollTop = F4;
						break;
					case 5 : 
						nowScrollTop = F5;
						break;	
				}
			}
			 if( nowScrollTop >750) {
				$('.selectclassroom').addClass( 'coursemessage-navfixed' ).css( {});
			} 
			else{
				$('.selectclassroom').removeClass( 'coursemessage-navfixed' ).css( {'left':'0px'});
			} 
			var li = $( '.selectclassroom ul>li' );
			var inx , res;
			if( nowScrollTop >= F1 && nowScrollTop < F2 ) {
				inx = 0;
				res = F1;
			}
			else if(nowScrollTop>=F2 && nowScrollTop <F3){
				inx = 1;
				res = F2;
			}
			else if( nowScrollTop >= F3 && nowScrollTop < F4 ){
				inx = 2;
				res = F3;
			}
			else if ( nowScrollTop >= F4 && nowScrollTop < F5 ){
				inx = 3;
				res = F4;
			}
			else if ( nowScrollTop >= F5 ){
				inx = 4;
				res = F5;
			}
			li.eq(inx).find('a').addClass( 'ft-cur' ).closest( 'li' ).siblings('li').find('a').removeClass( 'ft-cur' );
			return res;
		};
		$(window).on('scroll', function(){
			scrollFunc();
		});
		$('.selectclassroom').on('click','ul>li>a',function(){
			var F = $(this).addClass( 'ft-cur' ).closest( 'li' ).index();
			$(this).addClass( 'ft-cur' ).closest( 'li' ).siblings('li').find('a').removeClass( 'ft-cur' );
			var windows = (window.opera)? (document.compatMode=="CSS1Compat"? $('html') : $('body')) : $('html,body');
			windows.animate({'scrollTop': scrollFunc(F+1)}, 200);

		});
		
	})(jQuery);
	
	});
</script>
</body>

