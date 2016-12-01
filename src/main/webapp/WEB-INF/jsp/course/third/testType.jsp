<%@ page language="java" contentType="text/html;charset=UTF-8" pageEncoding="UTF-8"%>
<div class="finalexam-div display-none"  id="testType">
        <ul class="finalexam-ul">
          <li class="ui-state-default">
                <a href="javascript:void(0)" class="bordergreen">
                    <span class="multiplechoices-ico"></span>
                    <p class="font-p1"><spring:message code='thirdstep_xuanzheti'/></p><!--选择题  -->
                </a>
          </li>
          <li class="ui-state-default">
                <a href="javascript:void(0)" class="borderyellow">
                    <span class="blankquestions-ico"></span >
                   <p class="font-p2"><spring:message code="thirdstep_tiankongti"/> </p><!--填空题  -->
                </a>
           </li>
          <li class="ui-state-default">
                <a href="javascript:void(0)" class="borderred">
                    <span class="fales-ico"></span >
                    <p class="font-p2"><spring:message code='thirdstep_panduanti'/></p><!--判断题  -->
                </a>
           </li>
          <li class="ui-state-default">
                <a href="javascript:void(0)" class="borderblue">
                    <span class="questionsproblems-ico"></span >
                    <p class="font-p2"><spring:message code='thirdstep_wendati'/></p> <!--问答题  -->
                </a>
           </li>
           
        </ul>
 </div>
