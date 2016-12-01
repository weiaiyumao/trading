<%@ page language="java" contentType="text/html; charset=utf-8" pageEncoding="utf-8"%>

<!-- 教师团队Demo -->

<!--  1:课程助教  2:课程负责人 -->
<div id="teacherTeamsDemo">
<div class="information-div" data-type="" id="firstStep_courseInstructor" style="display:none"> 
	<span class="informationdelete-ico" ></span>
  	<div class="information-l fl">
  		<div class="manyPhoto">
  			<span class="setedit_editico" id="teacherImageUpload"></span>
  		</div>
  	</div>
  	<div class="information-r fl">
      	<ul class="userInfo" data-tid="" data-type="">
          	<li><input name="username"  class="fullname getFocus" value="" data-tags= "<spring:message code='firststep_jiangshimingcheng'/>" placeholder="<spring:message code='firststep_jiangshimingcheng'/>" type="text"></li>
            <li><input name="jobstatus" class="title getFocus" value=""  data-tags="<spring:message code='firststep_jiangshizhiwei'/>"  placeholder='<spring:message code="firststep_jiangshizhiwei"/>' type="text"></li>
            <li><textarea name="decription"  data-tags='<spring:message code="firststep_jiangshijianjie"/>'  class="personalprofile getFocus" placeholder='<spring:message code="firststep_jiangshijianjie"/>' cols="" rows=""></textarea></li>
         </ul>
    </div>
</div>
</div>