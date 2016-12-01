<div class="createcourse-nav">
    <div class="tit" id="public_title_name">${CURRENT_SELECT_COURSENAME}</div>
    <div class="stepdiv">
        <ul class="clearfix">
            <li ><a href="${ctx}/course/firstStep?courseId=${courseId}" class="public_title" ><span class="stepfont"><spring:message code="publictitle_diyibu" /></span><span class="stepnav"><spring:message code="publictitle_jibenxinxi" /></span></a></li>
            <li><a href="${ctx}/course/secondStep?courseId=${courseId}" class="public_title"><span class="stepfont"><spring:message code="publictitle_dierbu" /></span><span class="stepnav"><spring:message code="publictitle_gaiyaosheji" /></span></a></li>
            <li><a href="${ctx}/course/thirdStep?courseId=${courseId}" class="public_title"><span class="stepfont"><spring:message code="publictitle_disanbu" /></span><span class="stepnav"><spring:message code="publictitle_shipinjiangzuo" /></span></a></li>
            <li><a href="${ctx}/course/fourStep?courseId=${courseId}" class="public_title"><span class="stepfont"><spring:message code="publictitle_disibu" /></span><span class="stepnav"><spring:message code="publictitle_miandiumianjiangzuo" /></span></a></li>
            <li><a href="${ctx}/course/fifthStep?courseId=${courseId}" class="public_title"><span class="stepfont"><spring:message code="publictitle_diwubu" /></span><span class="stepnav"><spring:message code="publictitle_pingjia" /></span></a></li>
            <li><a href="${ctx}/course/sixthStep?courseId=${courseId}" class="public_title"><span class="stepfont"><spring:message code="publictitle_diliubu" /></span><span class="stepnav"><spring:message code="publictitle_fabu" /></span></a></li>
        </ul>
    </div>
</div>
<script>
	/**
	*@param:stepIndex 当前第几步
	**/
	/* function selectStepClass(stepIndex){
		$(".public_title").each(function(i,u){
			$(u).attr("class","public_title");
			if(i==stepIndex-1){
				$(u).attr("class","cur public_title");
				$(u).attr("href","javascript:void(0);"); 
			}
		});
	} */
	function selectStepClass(stepIndex){
		switch (stepIndex)
		{
		case 1:
		  step="firstStep";
		  break;
		case 2:
		  step="secondStep";
		  break;
		case 3:
		  step="thirdStep";
		  break;
		case 4:
		  step="fourStep";
		  break;
		case 5:
		  step="fifthStep";
		  break;
		case 6:
		  step="sixthStep";
		  break;
		}
		var curTarget = window.name;
		if(curTarget!=""){
			var curTargetCourseId = curTarget.replace(/[^0-9]/ig,"");
			var curTargetStep = curTarget.replace(/[^a-z]||[^A-Z]/ig,"");
			//var curLocation=window.location.href;
			if(step!=curTargetStep){
				window.name=curTargetCourseId+step;
			}
		}
		$(".public_title").each(function(i,u){
			$(u).attr("class","public_title");
			if(i==stepIndex-1){
				$(u).attr("class","cur public_title");
				$(u).attr("href","javascript:void(0);"); 
			}
		});
	}
	
	/* $(function(){
		if(typeof step == "undefined"){
			var step = {};
			step.firstStep = 1;
			step.secondStep = 2;
			step.thirdStep = 3;
			step.fourStep = 4;
			step.fifthStep = 5;
			step.sixthStep = 6;
			}
		
	}); */
</script>
