<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<%@ taglib prefix="spring" uri="http://www.springframework.org/tags"%>
<form id="st">
<input type="hidden" value="" id="testPaperType">
<input type="hidden" value="" id="topicType">
  <!--finalexampopup-wrap start -->
  <div class="finalexampopup-wrap  display-none" id="testType2" style="hiegth:100%;">
      <ul>
      		<li>
            	<p class="finalexam-p finalexam-font"><spring:message code='thirdstep_fen'/></p>
                <div class="inputtexarea-div">
                	<input id="pointsType2"  name="pointsType2" onkeyup = "scoreValidation(this,0)"  type="text" class="points-input" >
                </div>
            </li>
            <li>
                <p class="finalexam-p"><spring:message code='thirdstep_timu'/></p>
                <div class="inputtexarea-div">
                  <div style="border:1px solid #ccc" id="questionType2"></div>
                </div>
            </li>
            <li id="xuanzhexiang">
            	 <p class="finalexam-p"><spring:message code='thirdstep_daan'/>   <span class="answer-span-m"><spring:message code='thirdstep_duoxuan'/></span></p>
                <div id="addOptional"></div>
                 <a onclick="addOptional(this)" href="javascript:void(0)" class="addoption-button"><spring:message code='thirdstep_tajiaxuanxiang'/></a>
            </li>
            <li>
            	<p class="finalexam-p"><spring:message code='thirdstep_jiexi'/></p>
                <div class="inputtexarea-div">
                   <div style="border:1px solid #ccc" id="explainType2"></div>
                </div>
            </li>
           <li>
             	<a href="javascript:void(0)" class="savebtn">Save</a>
                <a href="javascript:void(0)" class="cancelbtn"><spring:message code='thirdstep_quxiao'/></a>
            </li>  
      </ul> 
 </div>
   <!--finalexampopup-wrap end -->
   
   <!--finalexampopup-wrap start -->
   <div class="finalexampopup-wrap  display-none" id="testType3" style="">
      <ul>
      		<li>
            	<p class="finalexam-p finalexam-font"><spring:message code='thirdstep_fen'/></p>
                <div class="inputtexarea-div">
                	<input id="pointsType3" name="pointsType3" onkeyup = "scoreValidation(this,0)" type="text" class="points-input">
                </div>
            </li>
            <li>
                <p class="finalexam-p"><spring:message code='thirdstep_timu'/></p>
                <div class="inputtexarea-div">
              		<div style="border:1px solid #ccc" id="questionType3"></div>
                </div>
            </li>
            <li id="tiankongxiang">
            	 <p class="finalexam-p"><spring:message code='thirdstep_daan'/>  *<spring:message code='thirdstep_tiankongxiang'/></p>
                <div style="display: none" id="addItem"></div>
                <a onclick="addOption()" id="addOption" href="javascript:void(0)" class="addoption-button"><spring:message code='thirdstep_tajiaxuanxiang'/></a>
            </li>
            <li>
            	<p class="finalexam-p"><spring:message code='thirdstep_jiexi'/></p>
                <div class="inputtexarea-div">
                	<div style="border:1px solid #ccc" id="explainType3"></div>
                </div>
            </li>
             <li>
             	<a href="javascript:void(0)" class="savebtn">Save</a>
                <a href="javascript:void(0)" class="cancelbtn"><spring:message code='thirdstep_quxiao'/></a>
            </li>  
      </ul> 
 </div>
   <!--finalexampopup-wrap end -->
   <!--finalexampopup-wrap start -->
   <div class="finalexampopup-wrap  display-none" id="testType14" style="">
      <ul>
      		<li>
            	<p class="finalexam-p finalexam-font"><spring:message code='thirdstep_fen'/></p>
                <div class="inputtexarea-div">
                	<input id="pointsType14" name="pointsType14" onkeyup = "scoreValidation(this,0)" type="text" class="points-input">
                </div>
            </li>
            <li>
                <p class="finalexam-p"><spring:message code='thirdstep_timu'/></p>
                <div class="inputtexarea-div">
                	<div style="border:1px solid #ccc" id="questionType14"></div>
                </div>
            </li>
            <li>
            	 <p class="finalexam-p"><spring:message code='thirdstep_daan'/></p>
                <div class="inputtexarea-div clearfix">
                	<span id="truespan" class="answerrighterror-ico fl"><input id="trueAnswerRadio" name="answerRadio" type="radio" value="对" class="fl" checked="checked"><span class="answerright-ico fl"></span></span>
                    <span id="falsespan"  class="answerrighterror-ico fl"><input id="falseAnswerRadio" name="answerRadio" type="radio" value="错" class="fl" ><span class="answererror-ico fl"></span></span>
                </div>
            </li>
            <li>
            	<p class="finalexam-p"><spring:message code='thirdstep_jiexi'/></p>
                <div class="inputtexarea-div">
                	<div style="border:1px solid #ccc"  id="explainType14" ></div>
                </div>
            </li>
             <li>
             	<a href="javascript:void(0)" class="savebtn">Save</a>
                <a href="javascript:void(0)" class="cancelbtn"><spring:message code='thirdstep_quxiao'/></a>
            </li>  
      </ul> 
 </div>
 <!--finalexampopup-wrap end -->
  <!--finalexampopup-wrap start -->
 <div class="finalexampopup-wrap display-none" id="testType4" style="">
      <ul>
      		<li>
            	<p class="finalexam-p finalexam-font"><spring:message code='thirdstep_fen'/></p>
                <div class="inputtexarea-div">
                	<input id="pointsType4" name="piontsType4" onkeyup = "scoreValidation(this,0)" type="text" class="points-input">
                </div>
            </li>
            <li>
                <p class="finalexam-p"><spring:message code='thirdstep_timu'/></p>
                <div class="inputtexarea-div">
                	<div style="border:1px solid #ccc" id="questionType4"></div>
                </div>
            </li>
            <li>
            	 <p class="finalexam-p"><spring:message code='thirdstep_daan'/>   *<spring:message code='thirdstep_keweikong'/></p>
                <div class="inputtexarea-div">
                	<div style="border:1px solid #ccc" id="answerType4"></div>
                </div>
            </li>
            <li>
            	<p class="finalexam-p"><spring:message code='thirdstep_jiexi'/></p>
                <div class="inputtexarea-div">
                	<div style="border:1px solid #ccc" id="explainType4" ></div>
                </div>
            </li>
            <li>
             	<a href="javascript:void(0)" class="savebtn">Save</a>
                <a href="javascript:void(0)" class="cancelbtn"><spring:message code='thirdstep_quxiao'/></a>
            </li>  
      </ul> 
 </div>
</form>