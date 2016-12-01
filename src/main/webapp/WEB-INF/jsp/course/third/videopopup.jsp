<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
 	<div class="creatcoursevideopop  display-none" id="thirdStep-videoOptionsShow" >
    	<ul>
        	<li>
            	<p class="title-p"><spring:message code='thirdstep_videoset_title'/>:</p>
            	<div class="thirdstep_videosettitle-div">
            		<div class="thirdstep_videoborder-div clearfix">          		
            			<input id="thirdstep_videoset_title" name="" type="text" data-tags="xxxxxxxxx（上传文件名称）"   class="getFocus titleinput fl" value="123312" maxlength="120"  placeholder="" />
            			<span class="videoOption-titleLength fr">120</span>
            		</div>
            	</div>
            		
            		<input type="hidden" id="thirdstep_videoset_chapterId" value="">
            		<input type="hidden" id="thirdstep_videoset_lessonId" value="">
            		<input type="hidden" id="thirdstep_videoset_lessonVideoId" value="">
            </li>
            <li>
            	<p class="title-p"><spring:message code='thirdstep_videoset_addsutitles'/>:</p>
                <div class="englishchinese-btn clearfix">
                	<span class="english-btn fl" id="thirdStep-en-subTitle"><spring:message code='thirdstep_videoset_englishsubtitles'/></span>
                    <span class="chinese-btn fl" id="thirdStep-zh-subTitle"><spring:message code='thirdstep_videoset_chinesesutitles'/></span>
                    <span class="language-font fl"><spring:message code='thirdstep_videoset_sutitles_tip'/></span>
                </div>
                <!-- 字幕信息提示 start -->
                <input id="thirdStep_videoset_enSutitle" type="hidden" value="<spring:message code='thirdstep_videoset_ensutitle'/>">
                <input id="thirdStep_videoset_zhSutitle" type="hidden" value="<spring:message code='thirdstep_videoset_zhsutitle'/>">
                <!-- 字幕信息提示 start -->
                
                <!-- 字幕信息展示   start -->
                <div class="uploadlanguage-div clearfix display-none" id="thirdStep-en-show">
                	<span class="english-ico fl"></span>
                	<span class="uploadname fl">Learning points.vtt </span>
                    <span class="delete fl" data-subTitleId=""></span>
                </div>
                <div class="uploadlanguage-div clearfix display-none" id="thirdStep-zh-show">
                	<span class="chinese-ico fl"></span>
                	<span class="uploadname fl">Learning points.vtt </span>
                    <span class="delete fl" data-subTitleId=""></span>
                </div>
                <!-- 字幕信息展示   end -->
               
               	
                <div class="videowrap">
					<!-- 播放器区域 图片大小 -->
                    <div class="video-div">
                    	<div id="thirdStep_videoOption_aspUpload" style="width:730px; height:415px;z-index:9999;overflow: hidden;"></div>
                        
                        <!-- 视频打点区域 start -->
                       	<div id="thirdStep_videoOption_videoDotShow"></div>
                       	<!-- 视频打点区域 end -->
                       	
						<!-- 存放视频id跟视频地址 -->
                        <input id="thirdStep-videoSrc" value="" data-videosec="" src="" type="hidden">
                    </div>
                    
                     <div id="thirdStep_videoOption_lessonTestQuestionShow" class="thirdStep_videoOption_lessonTestQuestionShow">
               		<div id="thirdStep_videoOption_mask" class="thirdStep_videoOption_mask"></div>
                    <ul>
                    	<li>
            	<p class="title-p clearfix"><span class="fl"><spring:message code='thirdstep_videoset_videoquiz'/>:</span><span class="questionmark-ico fl" id="demo-tip-yellowsimple4" title="<spring:message code='thirdstep_videoset_videoquiz_tip'/>"></span></p>
            	 <div class="uploadlanguage-quizdiv" id="thirStep_videoOption_timer">
                 	<input name="" type="text" data-tags=""   class="getFocus quizinput1" maxlength="3"  placeholder="00" onkeyup='this.value=this.value.replace(/\D/gi,"")' />:<input name="" type="text" data-tags=""   class="getFocus quizinput2"   placeholder="00" maxlength="2" onkeyup='this.value=this.value.replace(/\D/gi,"")'/>
                 	<!-- 消息提示框 start -->
                 		<span id="thirdstep_videoset_outtime" class="thirdstep_videoset_timeMsg display-none"><spring:message code='thirdstep_videoset_outtime'/></span>
                 		<span id="thirdstep_videoset_havatime" class="thirdstep_videoset_timeMsg display-none"><spring:message code='thirdstep_videoset_havatime'/></span>
                 	<!-- 消息提示框 end-->
                  	<input id="thirdStep-videoOption_testQuestionId" value="" src="" type="hidden">
                  	<input id="thirdStep-videoOption_lessonTestQuestionId" value="" src="" type="hidden">
                  	<input id="thridStep-videoOption_oldTime" value="" type="hidden">
                  </div>
            </li>
            <li>
            	<p class="title-p"><spring:message code='thirdstep_videoset_question'/>:</p>
            	<input id="thirdstep_content_not_null" type="hidden" value="<spring:message code='thirdstep_content_not_null'/>">
            	 <div class="uploadlanguage-div" >
            	 	<!-- 百度编辑器 start -->
                 	<div  id="thirStep_videoOption_question" class="thirstep_videoOption_editor"></div>
                 	<!-- 百度编辑器 end -->
                  </div>
            </li>
             <li id="thirdstep_videoset_answer">
            	<p class="title-p"><spring:message code='thirdstep_videoset_answer'/>:<span class="answer-span"><spring:message code='thirdstep_videoset_answer_tip'/></span></p>
            	
            	<!-- 试题答案信息  start -->
            	<div id="thirdstep_videoset_answerInfo"></div>
            	<input id="thirdstep_muchoice_more_two" type="hidden" value="<spring:message code='thirdstep_muchoice_more_two'/>">
            	<input id="thirdstep_muchoice_answer" type="hidden" value="<spring:message code='thirdstep_muchoice_answer'/>">
            	<input id="thirdStep_videoset_checkAnswer" type="hidden" value="<spring:message code='thirdstep_videoset_checkanswer'/>">
            	<!-- 试题答案信息  start -->
            	 
                  <div id="thirdStep_videoOption_addOptional" >
                  	<a href="javascript:void(0)" class="addoption-button"><spring:message code='thirdstep_tajiaxuanxiang'/></a>
                  </div>
                  
            </li>
            <li>
            	<p class="title-p"><spring:message code='thirdstep_videoset_explain'/>:</p>
            	 <div class="uploadlanguage-div uploadlanguage-m" >
            	 
            	 	<!-- 百度编辑器 start -->
                 	<div  id="thirdstep_videoOption_explain" class="thirstep_videoOption_editor"></div>
                 	<!-- 百度编辑器 end -->
    
                  </div>
            </li>
            <li class="videobtn-list">
            	<a href="###" class="videosave-ico" id="thirdStep-testQuestion-save" ><spring:message code='thirdstep_videoset_save'/></a>
                <a href="###" class="videodelete-ico" id="thirdStep-testQuestion-delete" ><spring:message code='thirdstep_videoset_delete'/></a>
            	<input type="hidden" id="thirdstep_videoset_ispass" value="<spring:message code='thirdstep_videoset_ispass'/>">
            </li>
                    </ul>
                </div>
            </div>
            
            
            </li>
        </ul>
    </div>
	<!-- 答案model start -->
	<div id="thirdstep_videoset_answerModel" style="display: none;">
		<div class="uploadlanguage-div uploadlanguage-m" data-index="" >
			<input name="" class="question-checkbox fl" value="" type="checkbox"
				checked="checked" >
			<div style="margin:0px 30px;" id="" class="thirstep_videoOption_editor"></div>
			<span class="deleteico" data-optionId=""></span>
		</div>
	</div>
	<!-- 答案model end -->
	<script src="${http_treenity}/assets/js/scripts/jquery.poshytip-min.js" type="text/javascript"></script>
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
  /*   var text = document.getElementById("textarea5");
        autoTextarea(text); 调用 */
</script>
