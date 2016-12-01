// 建课第5步
$(document).ready(function(){
	
	selectStepClass(5);//选中导航菜单
	var numberLecture = $("#meetCourseDtoListSize").val();
	
	//置顶
	$(window).scroll(function () {
		if($(this).scrollTop()>$(window).height()){
			$(".srollbar-up-btn").show();
		}else{
			$(".srollbar-up-btn").hide();
		}
	})
	$('.srollbar-up-btn').bind('click', function(){
		$('body,html').animate({scrollTop: 0}, 'fast');
	});
	
	window.courseId = $("#courseId").val();
	
	window.isShowMeetValue = true;
	window.scoreassessruleId = null;
	
	// 修改见面课分数
	function updateMeetCourse(meetCourseId,column,columnValue){
		// 清空课程进度redis
		cleanTreeRedis($.trim(courseId));
		// 默认加入总成绩
		var param = {"courseId":courseId,'meetCourseId':meetCourseId,'isAddScore':1};
		
		switch (column) {
		case 'checkScore':
		 	param['checkScore'] = $.trim(columnValue);
		break;
		case 'siteScore':
			param['siteScore'] = $.trim(columnValue);
			
		break;
		}
		
		$.ajax({
		   type: "POST",
		   url: basePath + "/course/fiveStep/updateMeetCourse",
		   data: param,
		   success: function(data){
			   if (!data.success){
				   console.log("数据加载异常！");
			   }
		   }
		});
	}
	
	// 修改考核成绩规则
	function updateScoreAssessRule(column){
		
		// 清空课程进度redis
		cleanTreeRedis($.trim(courseId));
		
		// 封装参数
		var param = {"courseId":$.trim(courseId),'id':scoreassessruleId};
		
		switch (column) {
	    	case 'learningProcessScoresShare':
	    		param['learningProcessScoresShare'] = $.trim($("#learningProcessScoresShare").val());
	    	break;
	    	case 'chapterTestScoresShare':
	    		param['chapterTestScoresShare'] = $.trim($("#chapterTestScoresShare").val());
	    	break;
	    	case 'meetCourseScoreShare':
	    		param['meetCourseScoreShare'] = $.trim($("#meetCourseScoreShare").html());
	      	break;
	    	case 'finalExamScoreShare':
	    		param['finalExamScoreShare'] = $.trim($("#finalExamScoreShare").val());
	      	break;
	    	case 'bbsScore':
	    		param['bbsScore'] = $.trim($("#bbsScore").val());
	      	break; 
		}
		
		// 数据保存
		$.ajax({
		   type: "POST",
		   url: basePath + "/course/fiveStep/saveOrUpdate",
		   data: param,
		   success: function(data){
			   if (!data.success){
				   console.log("数据加载异常！");
			   }
			   scoreassessruleId = data.result.id;
			   console.log(scoreassessruleId);
		   }
		});
	}
	
	// 修改考核成绩规则
	function updateScoreAssessRuleAllParam(){
		
		// 封装参数
		var param = {"courseId":$.trim(courseId),'id':scoreassessruleId};
		param['learningProcessScoresShare'] = $.trim($("#learningProcessScoresShare").val());
		param['chapterTestScoresShare'] = $.trim($("#chapterTestScoresShare").val());
		param['meetCourseScoreShare'] = $.trim($("#meetCourseScoreShare").html());
		param['finalExamScoreShare'] = $.trim($("#finalExamScoreShare").val());
		param['bbsScore'] = $.trim($("#bbsScore").val());
		console.log(param);
		// 数据保存
		$.ajax({
		   type: "POST",
		   url: basePath + "/course/fiveStep/saveOrUpdate",
		   data: param,
		   success: function(data){
			   if (!data.success){
				   console.log("数据加载异常！");
			   }
			   scoreassessruleId = data.result.id;
			   console.log(scoreassessruleId);
		   }
		});
	}
	
	// 变实保存
	$.fn.numeral = function() {     
	    $(this).css("ime-mode", "disabled");    
	    this.bind("keypress",function(e) {     
	    var code = (e.keyCode ? e.keyCode : e.which);  //兼容火狐 IE
	        if(!$.browser.msie&&(e.keyCode==0x8))  //火狐下不能使用退格键     
	        {     
	             return ;     
	            }     
	            return code >= 48 && code<= 57;     
	    });     
	    this.bind("blur", function() {     
	        if (this.value.lastIndexOf(".") == (this.value.length - 1)) {     
	            this.value = this.value.substr(0, this.value.length - 1);
	        } else if (isNaN(this.value)) {     
	            this.value = "";     
	        }
	        
	        // 验证分数
     		var totalScore = Number(totalMeetSourse()) + Number(getTotalSourse());
     		// 超过100分清空该值
     		if (totalScore > 100) {
     			this.value="";
     			layer.open({
    				title:" ",
    				icon:0,
    				content:zLocale.fifthstep_total_score_below,
    				shade:.6,
    				skin: 'layui-layer-zhs',
    				btn: [zLocale.public_confim] //按钮  
    			}); 
     			return;
     		}
     		
     		var inputValue = (this.value == "" ? 0 : this.value);
     		
	        if (this.id == 'learningProcessScoresShare'){
	        	 updateScoreAssessRule("learningProcessScoresShare");
	        	 $("#LP_learningProcessScoresShare").html("LP: " + inputValue + "%");
	        	 $("#li_learningProcessScoresShare").attr("style","width:" + inputValue + "%;");
	        	 showOrHideText("LP_learningProcessScoresShare");
	        } else if (this.id == 'chapterTestScoresShare'){
	        	 updateScoreAssessRule("chapterTestScoresShare");
	        	 $("#CT_chapterTestScoresShare").html("CT: " + inputValue + "%");
	        	 $("#li_chapterTestScoresShare").attr("style","width:" + inputValue + "%;");
	        	 showOrHideText("CT_chapterTestScoresShare");
	        } else if (this.id == 'finalExamScoreShare'){
	        	 updateScoreAssessRule("finalExamScoreShare");
	        	 $("#FE_finalExamScoreShare").html("FE: " + inputValue + "%");
	        	 $("#li_finalExamScoreShare").attr("style","width:" + inputValue + "%;");
	        	 showOrHideText("FE_finalExamScoreShare");
	        } else if (this.id == 'bbsScore'){
	        	 updateScoreAssessRule("bbsScore");
	        	 $("#F_bbsScore").html("F: " + inputValue + "%");
	        	 $("#li_bbsScore").attr("style","width:" + inputValue + "%;");
	        	 showOrHideText("F_bbsScore");
	        }
	        // 见面课分数 需要触发修改见面课总值
	        if (this.name == 'meetSourse'){
	        	// 图表
	        	$("#FFL_meetCourseScoreShare").html("FFL: " + totalMeetSourse() + "%");
	        	$("#li_meetCourseScoreShare").attr("style","width:" + totalMeetSourse() + "%;");
	        	showOrHideText("FFL_meetCourseScoreShare");
	        	
	        	// 展示总值
	        	$("#meetCourseScoreShare").html(totalMeetSourse());
	        	
	        	var meetcourseid = $("#"+this.id).attr("meetcourseid");
	        	var meetparam = $("#"+this.id).attr("meetparam");	        	
	        	
	        	// 修改见面课
	        	updateMeetCourse(meetcourseid,meetparam,inputValue);
	        	
	        	updateScoreAssessRule("meetCourseScoreShare");
	        }
	        
	        // 设置圆角
	        setleftRoundedCorners();
	        setRightRoundedCorners(totalScore);
	        
	    });     
	    this.bind("paste", function() { 
	        var s = clipboardData.getData('text');     
	        if (!/\D/.test(s));     
	        value = s.replace(/^0*/, '');     
	        return false;     
	    });     
	    this.bind("dragenter", function() {   
	        return false;     
	    });     
	    this.bind("keyup", function() {   
	    if (/(^00+)/.test(this.value)) {  
	        this.value = this.value.replace(/^0*/, '');    
	        updateScoreAssessRuleAllParam();
	        }     
	    });     
	}; 
	
	// 加载页面展示
	initPage(courseId);
	//文本框输入控制
    $("#bbsScore").numeral();
    $("#finalExamScoreShare").numeral();
    $("#chapterTestScoresShare").numeral();  
    $("#learningProcessScoresShare").numeral();
	
	// 绑定提交事件  TODO 下一步提示 消息
	$("#subScoreAssessRule").bind("click",function(){
		updateScoreAssessRuleAllParam();
		window.location.href= basePath + '/course/sixthStep?courseId=' + courseId;
	});
});

/**
 * 显示或者隐藏 图表提示
 * @param id
 * @returns
 */
function showOrHideText(id){
	if($("#" + id).width()<=48 ){
		$("#" + id).attr('style',"display: none;");
	}else {
		$("#" + id).attr('style',""); 
	}
}

/**
 * 设置左边圆角
 */
function setleftRoundedCorners(){
	try {
		// 清空开头
		$("li[name='roundedCorners']").each(function(){
			$(this).removeClass("addGraybar-left");
		});
		// 添加开头
		$("li[name='roundedCorners']").each(function(){
			if ($(this).width() > 0){
				$(this).addClass("addGraybar-left");
				throw '设置'+this.id+'开头为圆角';
			}
		});
	} catch (e) {
		console.log(e);
        return false;
    }
}

/**
 * 设置右边圆角 （此方式不优阅，待优化）
 */
function setRightRoundedCorners(total){
	try {
		// 清空结束
		$("li[name='roundedCorners']").each(function(){
			$(this).removeClass("addGraybar-right");
		});
		
		// 创建数组
		var arr = new Array("li_bbsScore", "li_finalExamScoreShare", "li_meetCourseScoreShare","li_chapterTestScoresShare","li_learningProcessScoresShare");
		
		// 添加结尾
		for(var i=0;i<arr.length;i++){
			if ($("#"+arr[i]).width() > 0 && total == 100) {
				$("#"+arr[i]).addClass("addGraybar-right");
				throw '设置' + arr[i] +'结束为圆角';
			}
		}
		
	} catch (e) {
		console.log(e);
        return false;
    }
}


/**
 * 统计总见面课分数
 * @returns
 */
function totalMeetSourse(){
	var total = 0;
	$("input[name='meetSourse']").each(function(){
		if ($(this).val() != null && $(this).val() != '' && $(this).val() != 'null' && $(this).val() != 'undefined') {
			total = Number(total) + Number($(this).val());
		}
	});
	return total;
}


/**
 * bbsScore + finalExamScoreShare + chapterTestScoresShare + learningProcessScoresShare 的总分
 * @returns
 */
function getTotalSourse(){
	var total = 0;
	var bbsScore = $("#bbsScore").val();
	var finalExamScoreShare = $("#finalExamScoreShare").val();
	var chapterTestScoresShare = $("#chapterTestScoresShare").val();
	var learningProcessScoresShare = $("#learningProcessScoresShare").val();
	
	if (bbsScore != null && bbsScore != '' && bbsScore != 'null' && bbsScore != 'undefined') {
		total = Number(total) + Number(bbsScore);
	}
	if (finalExamScoreShare != null && finalExamScoreShare != '' && finalExamScoreShare != 'null' && finalExamScoreShare != 'undefined') {
		total = Number(total) + Number(finalExamScoreShare);
	}
	if (chapterTestScoresShare != null && chapterTestScoresShare != '' && chapterTestScoresShare != 'null' && chapterTestScoresShare != 'undefined') {
		total = Number(total) + Number(chapterTestScoresShare);
	}
	if (learningProcessScoresShare != null && learningProcessScoresShare != '' && learningProcessScoresShare != 'null' && learningProcessScoresShare != 'undefined') {
		total = Number(total) + Number(learningProcessScoresShare);
	}
	return total;
}

/**
 * 页面初始化
 * @returns
 */
function initPage(courseId) {
	initMeetList(courseId);
	initScoreAssessRule(courseId);
	
}

/**
 * 初始化考核标准内容
 * @returns
 */
function initScoreAssessRule(courseId) {
	$.ajax({
	   type: "POST",
	   url: basePath + "/course/fiveStep/findByCourseId",
	   data: "courseId="+courseId,
	   success: function(data){
		   
		   var scoreAssessRule = data.result;
		   
		   if (!data.success){
			   console.log("数据加载异常！");
		   }
		   
		   if (scoreAssessRule == null) {
			   isShowMeetValue = false;
			   
			   $("#progressbar li").each(function(){
					if( $(this).width()<=48 ){
						$(this).find('.percentage-font').hide();
					}
				});
			   
			   return;
		   }
		   
		   // 设置id 方便提交的时候知道是新增还是修改
		   $("#scoreassessruleId").val(scoreAssessRule.id);
		   scoreassessruleId = scoreAssessRule.id;
		   
		   var bbsScore = (scoreAssessRule.bbsScore == null ? 0 : scoreAssessRule.bbsScore);
		   var meetCourseScoreShare = (scoreAssessRule.meetCourseScoreShare == null ? 0 : scoreAssessRule.meetCourseScoreShare);
		   var finalExamScoreShare = (scoreAssessRule.finalExamScoreShare == null ? 0 : scoreAssessRule.finalExamScoreShare);
		   var chapterTestScoresShare = (scoreAssessRule.chapterTestScoresShare == null ? 0 : scoreAssessRule.chapterTestScoresShare);
		   var learningProcessScoresShare = (scoreAssessRule.learningProcessScoresShare == null ? 0 : scoreAssessRule.learningProcessScoresShare);
		   
		   // 初始化考核分数
		   $("#bbsScore").val(scoreAssessRule.bbsScore == null ? '' : scoreAssessRule.bbsScore);
		   $("#meetCourseScoreShare").html(scoreAssessRule.meetCourseScoreShare == null ? '' : scoreAssessRule.meetCourseScoreShare);
		   $("#finalExamScoreShare").val(scoreAssessRule.finalExamScoreShare == null ? '' : scoreAssessRule.finalExamScoreShare);
		   $("#chapterTestScoresShare").val(scoreAssessRule.chapterTestScoresShare == null ? '' : scoreAssessRule.chapterTestScoresShare);
		   $("#learningProcessScoresShare").val(scoreAssessRule.learningProcessScoresShare == null ? '' : scoreAssessRule.learningProcessScoresShare);
		   
		   // 初始化图表比例条
		   // 文案
		   $("#LP_learningProcessScoresShare").html("LP: " + learningProcessScoresShare + "%");
		   $("#CT_chapterTestScoresShare").html("CT: " + chapterTestScoresShare + "%");
		   $("#FFL_meetCourseScoreShare").html("FFL: " + meetCourseScoreShare + "%");
		   $("#FE_finalExamScoreShare").html("FE: " + finalExamScoreShare + "%");
		   $("#F_bbsScore").html("F: " + bbsScore + "%");
		   // 比例
		   $("#li_learningProcessScoresShare").attr("style","width:" + learningProcessScoresShare + "%;");
		   showOrHideText("LP_learningProcessScoresShare");
		   $("#li_chapterTestScoresShare").attr("style","width:" + chapterTestScoresShare + "%;");
		   showOrHideText("CT_chapterTestScoresShare");
		   $("#li_meetCourseScoreShare").attr("style","width:" + meetCourseScoreShare + "%;");
		   showOrHideText("FFL_meetCourseScoreShare");
		   $("#li_finalExamScoreShare").attr("style","width:" + finalExamScoreShare + "%;");
		   showOrHideText("FE_finalExamScoreShare");
		   $("#li_bbsScore").attr("style","width:" + bbsScore + "%;");
		   showOrHideText("F_bbsScore");
		   
		   // 验证分数
		   var totalScore = Number(bbsScore) + Number(meetCourseScoreShare) + Number(finalExamScoreShare) + Number(chapterTestScoresShare) + Number(learningProcessScoresShare);
		   
		   // 设置圆角
		   setleftRoundedCorners();
		   setRightRoundedCorners(totalScore);
	   }
	});
	
}

/**
 * 初始化见面课列表
 * @returns
 */
function initMeetList(courseId) {
	$.ajax({
	   type: "POST",
	   url: basePath + "/course/fiveStep/getMeetCourseList",
	   data: "courseId="+courseId,
	   success: function(data){
		   if (!data.success){
			   console.log("数据加载异常！");
		   }
		   
		   if (data.result.length == 0){
			   return;
		   }
		   // 循环加载列表
		   for(i = 0 ;i <data.result.length; i++ ) {
			   
			   var meetCourse = data.result[i];
			   
			   var html = '<li class="clearfix">' +
               				'<div class="tit-p tit-p-leecture fl">' +
               					'<span class="fl" meetCourseTopic="'+meetCourse.courseTopic+'">'+zLocale.fifthstep_jianmianke+' - '+(i+1)+':</span>' +
               					'<div class="facelecturediv fl">' +
               						'<div class="attendance-p clearfix"><span class="fl">'+zLocale.fifthstep_chuqing+'</span><div class="totalpoints-div fr  mt-6"><span class="totalpoints-input"><input name="meetSourse" id="siteScore'+meetCourse.meetCourseId+'" meetcourseid="'+meetCourse.meetCourseId+'" meetparam="siteScore" value="'+(isShowMeetValue == false ? "" : (meetCourse.siteScore == null ? "" : meetCourse.siteScore))+'" data-tags=""   class="getFocus" type="text" maxlength="3"></span><span class="totalpoints">'+zLocale.fifthstep_fen+'</span></div></div>' +
               						'<div><span class="fl">'+zLocale.fifthstep_biaoxian+'</span><div class="totalpoints-div fr  mt-15"><span class="totalpoints-input"><input name="meetSourse" id="checkScore'+meetCourse.meetCourseId+'" meetcourseid="'+meetCourse.meetCourseId+'" meetparam="checkScore" value="'+(isShowMeetValue == false ? "" : (meetCourse.checkScore == null ? "" : meetCourse.checkScore))+'" data-tags=""   class="getFocus" type="text" maxlength="3"></span><span class="totalpoints">'+zLocale.fifthstep_fen+'</span></div></div>' +
               					'</div>' +
               				'</div>' + 
               			'</li>';
			   
			   $("#meetCourseList").append(html);
			   $("#siteScore"+meetCourse.meetCourseId).numeral();  
			   $("#checkScore"+meetCourse.meetCourseId).numeral();  
		   }
	   }
	});
}



	
