// console.log("value2 "+ids+":"+$("#id-"+ids+"").val());
/**
 * 建课第六步:js
 */
$(function(){
	//======查询课程信息start======
	selectCourseInfo();
	selectCourseSpeaker();
	selectMeetCourse();
	selectChapter();
	selectFinalExam();
	//======查询课程信息end======
	
	//======页面跳转start======
	selectStepClass(6);
	toPage("firstStep");
	toPage("secondStep");
	toPage("thirdStep");
	toPage("fourStep");
	toPage("fifthStep");
	//======页面跳转end======
	
	//======课程发布start======
	courseLaunch();
	//======课程发布end======
	
	//======重新检查start======
	checkAgain();
	//======重新检查end======
	
	//======置顶start======
	backToTop();
	//======置顶end======
	
	firefoxPageJump("stepconte-ul a");
	firefoxPageJump("_preview");
});

/**
 * 检查章成绩考核的完整度
 */
function selectAssessmentStrategy(){
	var courseId = $("#courseId").val();
	$.ajax({
		url : basePath+"/course/sixthStep/queryAssessmentStrategy",
		type : "POST",
		data : {"courseId":courseId},
		dataType :"json",
	    success :function(result){
	    	var html="<li><a name='fifthStep' class='icotit_div' target='"+courseId+"fifthStep' href='"+basePath+"/course/fifthStep?courseId="+courseId;
	    	if(result != null){
	    		if(result.meetCourseScoreShare+result.finalExamScoreShare+result.chapterTestScoresShare+result.learningProcessScoresShare+result.bbsScore==100){
	    			/*if(result.meetCourseScoreShare !=null &&result.finalExamScoreShare !=null && result.chapterTestScoresShare != null && result.learningProcessScoresShare != null && result.bbsScore != null){
	    				html=html+"<span class='rightico'></span>";
	    	    		completeNum++;
	    			}else{
	    				html=html+"<span class='hintico'></span>";
			    		incompleteNum++;
	    			}*/
	    			if(result.learningProcessScoresShare == null){
	    				html=html+"#learningProcessScoresShare' >";
	    				html=html+"<span class='hintico'></span>";
	    				incompleteNum++;
	    			}else if(result.chapterTestScoresShare == null){
	    				html=html+"#chapterTestScoresShare' >";
	    				html=html+"<span class='hintico'></span>";
	    				incompleteNum++;
	    			}else if(result.meetCourseScoreShare ==null){
	    				html=html+"#meetCourseScoreShare' >";
	    				html=html+"<span class='hintico'></span>";
	    				incompleteNum++;
	    			}else if(result.finalExamScoreShare ==null){
	    				html=html+"#finalExamScoreShare' >";
	    				html=html+"<span class='hintico'></span>";
	    				incompleteNum++;
	    			}else if(result.bbsScore == null){
	    				html=html+"#bbsScore' >";
	    				html=html+"<span class='hintico'></span>";
	    				incompleteNum++;
	    			}else{
	    				html=html+"'>";
	    				html=html+"<span class='rightico'></span>";
	    				completeNum++;
	    			}
	    		}else{
	    			html=html+"'>";
	    			html=html+"<span class='hintico'></span>";
		    		incompleteNum++;
	    		}
	    	}else{
	    		html=html+"'>";
	    		html=html+"<span class='hintico'></span>";
	    		incompleteNum++;
	    	}
	    	html=html+"<span class='tit-p'>"+zLocale.title_kaohecelve+"</span></a></li>";
			$("#fifthStep").append($(html));
	    }
	});
}

/**
 * 检查章期末考试的完整度
 */
function selectFinalExam(){
	var courseId = $("#courseId").val();
	$.ajax({
		url : basePath+"/course/sixthStep/queryFinalExam",
		type : "POST",
		data : {"courseId":courseId},
		dataType :"json",
	    success :function(result){
	    	var html="<a href='"+basePath+"/course/thirdStep?courseId="+courseId+"&hash=exam-1' name='thirdStep' class='icotit_div' target='"+courseId+"thirdStep'>";
	    	if(null != result){
	    		if(result.totalQuestionNumber==null || result.title==null || result.limitTime==null||result.totalQuestionNumber=="" || result.title==""){
	    			html=html+"<span class='hintico'></span>";
	    			incompleteNum++;
	    		}else{
	    			html=html+"<span class='rightico'></span>";
	    			completeNum++;
	    		}
	    		
	    	}else{
	    		html=html+"<span class='hintico'></span>";
	    		incompleteNum++;
	    	}
	    	html=html+"<span class='tit-p'>"+zLocale.thirdstep_exam_title+"</span></a>";
			$("#finalExam").append($(html));
	    }
	});
}

/**
 * 检查章节的完整度
 */
function selectChapter(){
	var courseId = $("#courseId").val();
	$.ajax({
		url : basePath+"/course/sixthStep/queryChapter",
		type : "POST",
		data : {"courseId":courseId},
		dataType :"json",
	    success :function(result){
	    	if(result.length>0){
	    		for(var i = 1; i<=result.length;i++){
	    			var html="<li><a href='"+basePath+"/course/thirdStep?courseId="+courseId+"&hash=chapter-"+i+"' name='thirdStep' class='icotit_div' target='"+courseId+"thirdStep'>";
	    			if(result[i-1].isPass == 1){
	    				html=html+"<span class='rightico'></span>";
		    			completeNum++;
	    			}else{
	    				html=html+"<span class='hintico'></span>";
		    			incompleteNum++;
	    			}
	    			html=html+"<span class='tit-p'>"+zLocale.creatcoursehome_zhang+" "+i+"</span></a></li>";
	    			$("#finalExam").before($(html));
	    		}
	    	}else{
	    		var html="<li><a href='"+basePath+"/course/thirdStep?courseId="+courseId+"&hash=temp' name='thirdStep' class='icotit_div' target='"+courseId+"thirdStep'>";
	    		html=html+"<span class='hintico'></span>";
	    		incompleteNum++;
				html=html+"<span class='tit-p'>"+zLocale.sixthstep_jiangjiebuwanzheng+"</span></a>";
				$("#finalExam").before($(html));
	    	}
			
	    }
	});
}

/**
 * 检查见面课的完整度
 */
function selectMeetCourse(){
	var courseId = $("#courseId").val();
	$.ajax({
		url : basePath+"/course/sixthStep/queryMeetCourse",
		type : "POST",
		data : {"courseId":courseId},
		dataType :"json",
	    success :function(result){
	    	var assessmentStrategyFlag = true;
	    	if(result.length > 0){
	    		for(var i=1;i<=result.length;i++){
	    			var html4="<li><a href='"+basePath+"/course/fourStep?courseId="+courseId+"#fl"+i+"' name='fourStep' class='icotit_div' target='"+courseId+"fourStep'>";
	    			if(result[i-1].complete){
	    				html4=html4+"<span class='rightico'></span>";
	    				completeNum++;
	    			}else{
	    				html4=html4+"<span class='hintico'></span>";
	    				incompleteNum++;
	    			}
	    			html4=html4+"<span class='tit-p'>"+zLocale.sixthstep_jianmianke+"："+i+"</span></a></li>";
	    			$("#fourStep").append($(html4));
	    			if(result[i-1].checkScore == null || result[i-1].siteScore == null){
	    				assessmentStrategyFlag = false;
	    			}
	    		}
	    		//=====当成绩考核已完整后，再次新增见面课，成绩考核仍完整BUG修复start =====
	    		if(assessmentStrategyFlag){
    				selectAssessmentStrategy();
    			}else{
    				var html="<li><a name='fifthStep' class='icotit_div' target='"+courseId+"fifthStep' href='"+basePath+"/course/fifthStep?courseId="+courseId;
    	    		html=html+"#meetCourseScoreShare' >";
    				html=html+"<span class='hintico'></span>";
	    	    	html=html+"<span class='tit-p'>"+zLocale.title_kaohecelve+"</span></a></li>";
	    	    	incompleteNum++;
	    	    	$("#fifthStep").append($(html));
    			}
	    		//=====当成绩考核已完整后，再次新增见面课，成绩考核仍完整BUG修复end =====
	    	}else{
	    		selectAssessmentStrategy();
	    		var html4="<li><a href='"+basePath+"/course/fourStep?courseId="+courseId+"' name='fourStep' class='icotit_div' target='"+courseId+"fourStep'>";
	    		incompleteNum++;
	    		html4=html4+"<span class='hintico'></span>";
	    		html4=html4+"<span class='tit-p'>"+zLocale.sixthstep_jianmiankebuwanzheng+"</span></a></li>";
	    		$("#fourStep").append($(html4));
	    	}
	    }
	});
}

/**
 * 检查教学团队的完整度
 */
function selectCourseSpeaker(){
	var courseId = $("#courseId").val();
	$.ajax({
		url : basePath+"/course/sixthStep/querySpeaker",
		type : "POST",
		data : {"courseId":courseId},
		dataType :"json",
	    success :function(result){
	    	if(result !=null){
	    		warnbool("#courseSpeaker",result.all);
	    	}
	    }
	});
}

/**
 * 检查课程基础信息的完整度
 */
function selectCourseInfo(){
	var courseId = $("#courseId").val();
	$.ajax({
		url : basePath+"/course/sixthStep/queryCourseInfo",
		type : "POST",
		data : {"courseId":courseId},
		dataType :"json",
	    success :function(result){
	    	if(result !=null){
	    		warn("#name",result.name == null ? "" : result.name);
	    		warn("#img",result.img == null ? "" : result.img);
	    		warn("#institute",result.institute == null ? "" : result.institute);
	    		warn("#credit",(result.credit == null || result.credit==0) ? "" : result.credit);
	    		warn("#period",(result.meetCoursePeriod == null || result.meetCoursePeriod ==0 || result.onlineCoursePeriod == null || result.onlineCoursePeriod ==0 )  ? "" : result.period);
	    		warn("#courseCategory",result.courseCategory == null ? "" : result.courseCategory);
	    		warn("#courseAcademicPrepare",result.courseAcademicPrepare == null ? "" : result.courseAcademicPrepare);
	    		warn("#courseBackground",result.courseBackground == null ? "" : result.courseBackground);
	    		warn("#courseTarget",result.courseTarget == null ? "" : result.courseTarget);
	    		warn("#introduction",result.introduction == null ? "" : result.introduction);
	    		warn("#learningOutcomes",result.learningOutcomes == null ? "" : result.learningOutcomes);
	    		warn("#learningMethods",result.learningMethods == null ? "" : result.learningMethods);
	    		
	    		$('#linkCourseId').val(result.linkCourseId);
	    		$("#state").val(result.state);
	    		selectCourseClips();
	    	}
	    }
	});
	
}

/**
 * 查询片花是否完整
 */
function selectCourseClips(){
	var clipsId = $('#linkCourseId').val();
	$.ajax({
		url : basePath+"/course/sixthStep/queryCourseClips",
		type : "POST",
		data : {"clipsId":clipsId},
		dataType :"json",
		success : function(result){
			if(result !=null){
				warn("#videoId",result.videoId == null ? "" : result.videoId);
			}
		}
	});
}

/**
 * 完成度的页面跳转
 * @param stepIndex
 * 
 */
/*function toPage(stepIndex){
	var courseId = $("#courseId").val();
	$('[name='+stepIndex+"]").attr("href",basePath+"/course/"+stepIndex+"?courseId="+courseId);
	$('[name='+stepIndex+"]").attr("target",courseId+stepIndex);
}*/
/**
 * 完成度的页面跳转
 * @param stepIndex 
 * @param mailId 锚点
 * 
 */
function toPage(stepIndex){
	var courseId = $("#courseId").val();
	var stepIndexNameArr=$('[name='+stepIndex+"]");
	stepIndexNameArr.each(function(){
		var mailValue = $(this).attr("mailValue");
		$(this).attr("href",basePath+"/course/"+stepIndex+"?courseId="+courseId+"#"+mailValue);
		$(this).attr("target",courseId+stepIndex);
	});
}
//
///**
// * 优化火狐页面的跳转问题
// */
//function firefoxPageJump(strClass){
//	var browserName=getOs();
//	console.log(browserName);
//	$("."+strClass).live("click",function(event){
//		if(browserName=="Firefox"){
//			event.preventDefault();
//			var newwindowHref = $(this).attr("href");
//			var newWindowName = $(this).attr("target");
//			MyWindow = window.open(newwindowHref,newWindowName);
//			if(!MyWindow.closed){
//				MyWindow.close();
//			}
//			MyWindow = window.open(newwindowHref,newWindowName);
//			
//		}
//	})
//}
//
///**
// * 判断浏览器
// * @returns {String}
// */
//function getOs()  
//{  
//    var OsObject = "";  
//   if(navigator.userAgent.indexOf("MSIE")>0) {  
//        return "MSIE";  
//   }  
//   if(isFirefox=navigator.userAgent.indexOf("Firefox")>0){  
//        return "Firefox";  
//   }  
//   if(isSafari=navigator.userAgent.indexOf("Safari")>0) {  
//        return "Safari";  
//   }   
//   if(isCamino=navigator.userAgent.indexOf("Camino")>0){  
//        return "Camino";  
//   }  
//   if(isMozilla=navigator.userAgent.indexOf("Gecko/")>0){  
//        return "Gecko";  
//   }  
//     
//}  

/**
 * 重新检查
 */
function checkAgain(){
	$('#checkAgain').click(function(){
		location.reload();
	})
}

/**
 * 课程发布
 */
function courseLaunch(){
	$("#launchBtn").click(function(even){
		if(incompleteNum==0){
			layer.confirm(zLocale.sixthstep_sure_launch, {
		    	   title:' ', 
		    	   skin: 'layui-layer-zhs',
		    	   icon:5,
		    	   shade:.6,
		    	   btn: [zLocale.public_confim,zLocale.public_cancel] //按钮  
		    	 }, function(index){
		    		 releaseCourse(index);	
			});
		}else{
			layer.open({
				title:" ",
				icon:6,
				content:zLocale.sixthstep_required_information,
				shade:.6,
				skin: 'layui-layer-zhs',
				btn: [zLocale.public_confim] //按钮  
			});
		}
		imglocation();
	});
}

/**
 * 修改弹框中的图标的位置（相对提示信息的来说，属于居中的位置）
 */
function imglocation(){
	var icoTop = $(".layui-layer-dialog.layui-layer-zhs .layui-layer-content").css('height').replace(/[^0-9]/ig,"")/2+20;
	$(".layui-layer-dialog.layui-layer-zhs .layui-layer-content .layui-layer-ico").css('top',icoTop);
}

/**
 * 课程发布请求
 */
function releaseCourse(index){
	var courseId = $("#courseId").val();
	var state = $('#state').val();
	if(state==""||state=="null" || state==null){
		$.ajax({
			 url : basePath+"/course/sixthStep/releaseCourse",
				type : "POST",
				data : {"courseId":courseId},
				dataType :"json",
				success : function(result){
					if(result.success){
						$('#state').val(result.result.state);
						layer.close(index);
					}
				} 
		 });
	}else if(state==0){
		layerAlert(" ",0,zLocale.sixthstep_launch_approval,.6,'layui-layer-zhs',[zLocale.public_confim]);
	}else if(state==1){
		layerAlert(" ",0,zLocale.sixthstep_launch_success,.6,'layui-layer-zhs',[zLocale.public_confim]);
	}else if(state==2){
		layer.confirm("审核未通过，您的申请被驳回，原因如下：xxxxxx，是否再次发布课程", {
	    	   title:' ', 
	    	   skin: 'layui-layer-zhs',
	    	   icon:0,
	    	   shade:.6,
	    	   btn: [zLocale.public_confim,zLocale.public_cancel] //按钮  
	    	 }, function(index){
	    		 $.ajax({
	    			 url : basePath+"/course/sixthStep/releaseCourse",
	    				type : "POST",
	    				data : {"courseId":courseId},
	    				dataType :"json",
	    				success : function(result){
	    					if(result.success){
	    						$('#state').val(result.result.state);
	    						layer.close(index);
	    					}
	    				} 
	    		 });
		});
	}
	imglocation();
}

/**
 * 提示框
 * @param title
 * @param icon
 * @param content
 * @param shade
 * @param skin
 * @param btn
 */
function layerAlert(title,icon,content,shade,skin,btn){
	layer.open({
		title:title,
		icon:icon,
		content:content,
		shade:shade,
		skin: skin,
		btn: btn //按钮  
	});
}
