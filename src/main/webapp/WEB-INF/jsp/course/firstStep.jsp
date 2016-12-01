<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<!DOCTYPE html>
<%@ include file="/WEB-INF/jsp/common/taglib.jsp"%>
<html>
<head>
<%@include file="/WEB-INF/jsp/common/common.jsp"%>
<meta content="webkit" name="renderer" />
<meta charset="UTF-8">
<title><spring:message code='title_jibenxinxi'/></title>
<!-- 上传播放组件css -->
<%@include file="/WEB-INF/jsp/common/public-upload-css.jsp"%>
<%@include file="/WEB-INF/jsp/common/public-player-css.jsp"%>
<!-- 自定义css -->
<link href="${ctx}/assets/css/course/firstStep-upload_${z_locale_code}.css?version=${cssJsVersion}" rel="stylesheet" />
<link href="${ctx}/assets/css/os_base_${z_locale_code}.css?version=${cssJsVersion}" rel="stylesheet" />
<link href="${ctx}/assets/css/coursestep/stepcommon.css?version=${cssJsVersion}" rel="stylesheet" />
<link href="${ctx}/assets/css/coursestep/firstStep.css?version=${cssJsVersion}" rel="stylesheet" />
<link href="${ctx}/assets/css/common/imageShow.css?version=${cssJsVersion}" rel="stylesheet" />

<!-- 上传播放js -->
<%@include file="/WEB-INF/jsp/common/public-upload-js.jsp"%>
<%@include file="/WEB-INF/jsp/common/public-player-js.jsp"%>

<!-- 自定义js -->
<script src="${ctx}/assets/js/public/jquery.poshytip-min.js" type="text/javascript"></script>
<script src="${ctx}/assets/js/course/firstStep.js?version=${cssJsVersion}" type="text/javascript"></script>
<script src="${ctx}/assets/js/course/firstStep-upload.js?version=${cssJsVersion}" type="text/javascript"></script>
<script src="${ctx}/assets/js/common/imageShow.js?version=${cssJsVersion}" type="text/javascript"></script>
<script type="text/javascript" charset="utf-8" src="${ctx}/assets/js/ueditor/1.4.2/ueditor.config.js"></script>
<script type="text/javascript" charset="utf-8" src="${ctx}/assets/js/ueditor/1.4.2/ueditor.all.min.js"> </script>
<script type="text/javascript" charset="utf-8" src="${ctx}/assets/js/ueditor/1.4.2/lang/<spring:message code="ueditor_lang" />"></script>
<script src="${ctx}/assets/js/common/common.js?version=${cssJsVersion}" type="text/javascript"></script>
<script src="${ctx}/assets/js/common/cleanTreeRedis.js?version=${cssJsVersion}" type="text/javascript"></script>

<script type="text/javascript">
var prerequisiteEditor=newEditor("prerequisite","100%",50);
</script>
</head>

<body>
<%@ include file="/WEB-INF/jsp/common/header.jsp"%>
<div class="createcourse-div">
		<!-------createcourse-nav start-------->
		<%@include file="/WEB-INF/jsp/course/publicTitle.jsp"%>
	    <!-------createcourse-nav end-------->
    <div class="stepconter-div">
    	<input name="courseId" id="courseId"  value="${courseId }" type="hidden"  >
    	<ul class="stepconte-ul">
        	<li>
            	<div class="icotit_div">
	            	<span class="tit-p" id="tit-p-coursetitle">
	            		<spring:message code='firststep_coursetitle'/>
	            	</span>
            	</div>
                <div class="coursetitle">
                   <div id="coursetitle-input" class="coursetitle-input clearfix"><input id="course_title" name="name" type="text"   class="getFocus fl" value=""  placeholder="" maxlength="120"/><span class="wordlimit fr" id="course_title_maxSum">120</span></div>
                </div>
            </li>
            
            <li>
            	<div class="icotit_div clearfix">
	            	<span class="tit-p fl" id="tit-p-courseimg">
	            		<spring:message code='firststep_courseimage'/>
	            	</span>
	            	<span class="questionmark-ico fl" id="demo-tip-yellowsimple4" title="<spring:message code='firststep_courseimage_tip'/>" ></span>
            	</div>
                <div class="coursetitle">
					<div class="singlePhoto">
						<img style="display: none;" src="" width="223" height="125">
						<div class="uploadBtn_courseTitle" id="_uploadCourseImageDiv">
							<a href="javascript:void(0);"  id="uploadCourseImage">
								
							</a>
						</div>
						
						<input type="hidden" id="course_Image" value="">
			  		</div>
                </div> 
            </li>
            
            <li>
            	<div class="icotit_div clearfix">
	            	<span class="tit-p  fl" id="firststep_institutuion">
	            		<spring:message code="firststep_courseinstitution"/>
	            	</span>
            	</div>
                <div class="coursetitle">
                 	<input name="instiution" id="instiution" class="institution_input"  maxlength="70" type="text" />
                </div>
                
            </li>
            
            
            <li>
            	<div class="icotit_div clearfix">
	            	<span class="tit-p fl" id="tit-p-credits">
	            		<spring:message code="firststep_credits"/>
	            	</span>
	            	<span class="questionmark-ico fl" id="demo-tip-first_credits" title='<spring:message code="firststep_credits_tip"/>'></span>
            	</div>
                <div class="coursetitle">
                 	<input name="credit" class="institution_input40 getFocus" value="" style="width:45px;"  maxlength="4" id="credits_score" onchange="scoreValidation(this)"  onkeyup="scoreValidation(this)" placeholder="" />
                </div>
                
            </li>
            
            
             <li>
            	<div class="icotit_div clearfix">
	            	<span class="tit-p fl" id="tit-p-keshishu">
	            		<spring:message code="firststep_keshushi"/>
	            	</span>
	            	<span class="questionmark-ico fl" id="demo-tip-firststep_keshushi" title='<spring:message code='firststep_keshushi_tip'/>'></span>
            	</div>
                <div class="coursetitle">
                	<div class="lecturesdiv">
                		<p><spring:message code="firststep_videolectures"/></p>
                 		<input name="meetCoursePeriod" class="institution_input40 getFocus"  value="" maxlength="2" placeholder="" type="text" id="hours_video_lectures" onchange="scoreValidation(this)" onkeyup = "scoreValidation(this)"/>
                    </div>
                    <div class="lecturesdiv">
                		<p><spring:message code="firststep_facelectures"/></p>
                 		<input name="onlineCoursePeriod" class="institution_input40 getFocus" value="" maxlength="2"  placeholder="" type="text" id="face_to_face_lectures" onchange="scoreValidation(this)" onkeyup = "scoreValidation(this)"/>
                    </div>
                    <div class="lecturesdiv">
<%--                 		<p id="total_class_hours"><spring:message code="firstsetp_zongxueshi"/>: <span class="totalhours-span" id="totalhours-span-id">20</span></p> --%>
						<p id="total_class_hours"></p> 
                   </div>
                </div>
            </li>
            <li>
            	<div class="icotit_div clearfix">          		
	            	<span class="tit-p  fl" id="tit-p-category">

	            		<spring:message code="firststep_category"/>
	            	</span>
            	</div>
                <div class="coursetitle">
                	<div class="lecturesdiv">
                		<select name="courseCategory" id="course_Category" style="width: 210px;">
                		  <option value ="" id="course_Category_choose"><spring:message code="firststep_please_choose_course_type"/></option>
                          <option value ="1"><spring:message code="firststep_bixiuke"/></option>
                          <option value ="2"><spring:message code="firststep_xuanxiuke"/></option>
                        </select>
                    </div>
                </div>
            </li>
            
            
            <li>
            	<div class="icotit_div clearfix">
	            	<span class="tit-p  fl" id="tit-p-courseinstructor">
	            		<spring:message code="firststep_courseinstructor"/>
	            	</span>
            	</div>
                <div class="coursetitle information-divTitle">
                	<div class="information-div" type="2" id="information-div-1" floor="1" style="display:none"> <!--2 课程负责人  style="display:none-->
                		<span class="informationdelete-ico" ></span>
                    	<div class="information-l fl">
                    		<div class="manyPhoto">
                    			<img id="firstStep_courseInstructorImg-1" src="#123" />
                    			<span class="setedit_editico" id="aspUploadImags-1"></span>
                    		</div>
                    	</div>
                    	<div class="information-r fl">
                        	<ul>
                        		<li style="display:none"><input name="id" id="id-1"  value="id" type="text"></li>
                            	<li><input name="username" id="username-1" class="fullname getFocus" value="username" data-tags= "<spring:message code='firststep_jiangshimingcheng'/>" placeholder="<spring:message code='firststep_jiangshimingcheng'/>" type="text"></li>
                                <li><input name="jobstatus" id="jobstatus-1" class="title getFocus" value="jobstatus"  data-tags="<spring:message code='firststep_jiangshizhiwei'/>"  placeholder='<spring:message code="firststep_jiangshizhiwei"/>' type="text"></li>
                                <li><textarea name="decription" id="decription-1"  data-tags='<spring:message code="firststep_jiangshijianjie"/>'  class="personalprofile getFocus" placeholder='<spring:message code="firststep_jiangshijianjie"/>' cols="" rows=""></textarea></li>
                                <li style="display:none"><input name="userType" id="userType-1"  value="userType" type="text"></li>
                            </ul>
                        </div>
                    </div>
                    
                   <div class="addinstructor clearfix"><a href="javascript:void(0)"  class="addCourseInstructor" id="addCourseInstructor-addfont"><span class="addico fl"></span><span class="addfont fl"><spring:message code="firststep_tianjiajiangshi"/></span></a></div>
                </div>
            </li>
            
            <li>
            	<div class="icotit_div clearfix">
	            	<span class="tit-p fl" id="tit-p-pianhua">
	            		<spring:message code="firststep_pianhua"/>
	            	</span>
	            	<span class="questionmark-ico fl" id="demo-tip-firststep_pianhua" title='<spring:message code="firststep_pianhua_tip"/>'></span>
            	</div>
                <div class="coursetitle">
                 	<a class="courseimage video-image" style="display:none;" href="javascript:void(0);"></a>
                    <div class="upload-div" id="upload-div-id">
                    	
                    <!-- 上传片花  start -->
                    	<div class="uploadPromo-div" id="uploadPromoVideo-div">
                    		<div id="PromoVideo">
		                    	<img  src="" style="display: none;" width="223" height="125">
		                    	<div class="message" style="display:none;"><spring:message code='thirdstep_zhuanmazhong'/></div>
		                    	<div class="imageIcon" style="display:none;"></div>
	                    	</div>
	                    	<div id="uploadBtn_promoVideo-Div" class="uploadBtn_promoVideo">
		                    	<a href="javascript:void(0);" id="uploadPromoVideo">
									
								</a>
							</div>
						
						</div>
					<!-- 上传片花  end -->
						
	                    <!--  播放地址 -->
	                    <input type="hidden" id="videoSrc" value="" src="">
	                    <span style="display:none"><input type="text" value="" id="linkCourseId" name="linkCourseId"></span>
                    </div>
                </div>
              
                
					<!--  播放器 -->
					<!-- 播放器区域 Start-->
					<%@include file="/WEB-INF/jsp/common/publicVideoPlayer.jsp"%>
					<!-- 播放器区域 End-->
					
					
					<!-- 图片查看器 start-->
					<%@include file="/WEB-INF/jsp/common/publicImageShow.jsp"%>
					<!-- 图片查看器 start-->
            </li>
            
            
            <li>
            	<div class="icotit_div clearfix">
	            	<span class="tit-p  fl" id="tit-p-prerequisite">
	            		<spring:message code="firststep_prerequisite"/>
	            	</span>
            	</div>
                <div class="coursetitle">
                 
                 	<div  id="prerequisite" ></div>
   
                </div>
            </li>
            
            <!-- 教师团队 Demo start-->
            
            <!-- 教师团队Demo  end -->
        </ul>
    </div>
    <div class="nextbtn-div">
    	<a href="javascript:void(0);" class="btn-Style greenbg mr10"><spring:message code="firststep_xiayibu"/> </a>
    </div>
   <div class="srollbar-up-btn" style="display:none;" title="<spring:message code='firststep_back_to_top'/>"></div>
</div>
<%@ include file="/WEB-INF/jsp/common/footer.jsp"%>
<script type="text/javascript">
	$(function(){
		selectStepClass(1);
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
			$('#demo-tip-first_credits').poshytip({
				className: 'questionmarksimple',
				showTimeout: 1,
				alignTo: 'target',
				alignX: 'right',
				offsetY: -55,
				offsetX: 10,
				alignY: 'center',
				allowTipHover: false
			});
			$('#demo-tip-firststep_keshushi').poshytip({
				className: 'questionmarksimple',
				showTimeout: 1,
				alignTo: 'target',
				alignX: 'right',
				offsetY: -55,
				offsetX: 10,
				alignY: 'center',
				allowTipHover: false
			});
			$('#demo-tip-firststep_pianhua').poshytip({
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
</body>
</html>
