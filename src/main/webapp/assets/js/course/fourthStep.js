$(document).ready(function(){
	
	selectStepClass(4);//选中导航菜单
	var numberLecture = $("#meetCourseDtoListSize").val();
	
	window.rebdcount = 0;
	window.tdsort = 0;
	
	//置顶
	$(window).scroll(function () {
		if($(this).scrollTop()>$(window).height()){
			$(".srollbar-up-btn").show();
		}else{
			$(".srollbar-up-btn").hide();
		}
	});
	$('.srollbar-up-btn').bind('click', function(){
		$('body,html').animate({scrollTop: 0}, 'fast');
	});
	
	// 初始化百度编辑器
	$("div[sname='ue']").each(function(obj){
		   var id = $("#teachRequire"+(obj + 1)).attr("id");
		   var meetCourseId = $("#teachRequire"+(obj + 1)).attr("meetCourseId");
		   var value = $("#teachRequire"+(obj + 1)).attr("teachRequire");
		   initTip((obj + 1));
		   initCreateUe(id,886,50,value,meetCourseId,(obj + 1));
		   numberLecture =  Number(numberLecture) + Number(1);
		   courseTitelLength(meetCourseId,(obj + 1));
	});
	if (numberLecture <= 0){
		createLecturePage(numberLecture);
	}
});
	
	// 初始化 tip
	function initTip(index){
		$('#demo-tip-yellowsimple5' + index).poshytip({
			className: 'questionmarksimple',
			showTimeout: 1,
			alignTo: 'target',
			alignX: 'right',
			offsetY: -55,
			offsetX: 10,
			alignY: 'center',
			allowTipHover: false
		});
	}

	//初始化创建百度编辑器
	function initCreateUe(id,width,height,value,meetCourseId,number){
		var ue = newEditor(id,width,height);
		loadEditorText(ue,value);
		rebdcount = rebdcount + 1;
		tdsort = tdsort + 1;
		ue.addListener("blur", function (type, event) {
			
			var fag = isRighticoShowNoUe(meetCourseId);
			
	   	 	// 设置默认值
	    	var taskValue = $("#taskType"+number).val();
//			if (taskValue == null || taskValue == '' || taskValue == 'null' || taskValue == 'undefined'){
//				taskValue = "7"; // 默认7
//	    	}
	   	 	
			 var teachRequire = plainTxt(ue);
			 if (fag && (teachRequire != null && teachRequire != '' && teachRequire != 'null' && teachRequire != 'undefined')){
	   	 		 $("#mark"+number).attr("class","rightico"); // 感叹号变成勾
	    	 } else {
	    		 $("#mark"+number).attr("class","hintico"); // 勾变成感叹号
	    	 }
			 
			 var param = {"meetCourseId":meetCourseId,'teachRequire':teachRequire,'taskType':taskValue,'courseId':$("#courseId").val()};
			 $.ajax({
	    		   type: "POST",
	    		   url: basePath + "/course/fourStep/saveOrUpdate",
	    		   data: param,
	    		   success: function(data){
	    			   if (!data.success){
	    				   console.log("数据加载异常！");
	    				   return;
	    			   }
	    		   }
	    		});
		});
	}
	
	//定义一个全局变量
	var numberLecture = $("#meetCourseDtoListSize").val();
    // 隐藏见面课编辑框
    function hideLecture(number){
    	
    	if(!$("#LectureModel"+number).is(":animated")){ //********问题点在这里，这里有判断是否处于动画
		       	 $("#LectureModel"+number).slideToggle("slow");
		       	 $('#span'+number).toggleClass("downarrow");
    		}
    	
    	 return false;
    }
    
    // 创建一个新的见面课创建页面
    function createLecturePage(number){
    	var numberLecture = $("#meetCourseDtoListSize").val();
    	if (isNaN(numberLecture)) {
    		numberLecture = 1;
    	}
    	numberLecture = Number(numberLecture) + Number(1);
    	// 如果上个见面课页面是关闭的 不需要调用 隐藏见面课编辑框操作
    	if ($('#span'+number).attr("class") != 'uparrow downarrow'){
    		hideLecture(number);
    	}
    	number = Number(number) + Number(1);
    	rebdcount =  rebdcount + 1;
    	tdsort = tdsort + 1;
    	var bdid = rebdcount;
    	$("#createLecture-div-a").attr("onclick","createLecturePage("+bdid+")");
    	// 创建新见面课 默认打开
    	var lecturePage = '<li name="lecture" id="Lectureli'+bdid+'">'
        	+ '<div class="icotit_div"><span class="hintico" id="mark'+bdid+'"></span></div>'
            + '<div class="coursetitle">'
            + '<div class="faceLecture-div">'
            + '<div class="faceLecture-title clearfix" onclick="hideLecture(' + bdid + ');">'
            + '<span class="fl">'+zLocale.fourstep_jianmianke+'：'+'<font id="fl'+bdid+'" name="sort">' + tdsort + '</font></span>'        	
            + '<span class="uparrow" id="span'+bdid+'"></span>'
            + ' </div>'
            + '<span class="faceLecturedeleteico" id="removeLec'+bdid+'" onclick="removeLecture('+bdid+');"></span>'            
            + '</div>'        
            + '<div class="faceLecture-content" id="LectureModel'+bdid+'">'    
            + '<ul>'    
            + '<li>'    	
            + '<p>'+zLocale.fourstep_zhuti+'</p>'        	
            + '<div class="themediv">'            	
            + '<input type="text" placeholder="" maxlength="120" onkeyup="courseTitelLengthad('+bdid+');" value="" class="getFocus fl" data-tags="" name="" id="courseTopic'+bdid+'" onchange="saveOrUpdate('+bdid+',\'courseTopic\');">'              
            + '<span class="wordlimit fr" id="word'+bdid+'">120</span>'                	
            + '</div>'                    
            + '</li>'                 
            + '<li>'            
			+ '<p>'+zLocale.fourstep_jiaoxuemoshi+'</p>'			
            + '<div class="teachingmodel-div">'            	
            + '<select name="" id="taskType'+bdid+'" onchange="saveOrUpdate('+bdid+',\'taskType\');">'
            + '<option value ="" selected>'+zLocale.fourthstep_please_choose_mode+'</option>'	
			+ '<option value ="7">'+zLocale.fourstep_zhibohudongke+'</option>'					
			+ '<option value ="8">'+zLocale.fourstep_zhongguojizhongmianshou+'</option>'		
			+ '<option value ="9">'+zLocale.fourstep_faguojizhongmianshou+'</option>'		
			+ '</select>'					
			+ '</div>'					
			+ '</li>'				
            + '<li>'            
			+ '<p class="clearfix"><span class="fl">'+zLocale.fourstep_jiaoxueyaoqiu+'</span><span class="questionmark-ico fl" id="demo-tip-yellowsimple5'+bdid+'" title="'+zLocale.fourstep_jiaoxueyaoqiutishi+'"></span></p>'			
            + '<div class="teachingmodel-div">'            	
            + '<div class="prerequisite_text getFocus" id="teachRequire'+bdid+'" sname="ue" meetCourseId="" teachRequire=""></div>'                
			+ '</div>'					
			+ '</li>'				
            + '<li>'            
            + '<p>'+zLocale.fourstep_zhujiangren+'</p>'            
            + '<div class="teachingrequirements-div">'            	
            + '<input type="text" placeholder="" value="" class="institution_input getFocus" maxlength="50" data-tags="" name="" id="speakerStr'+bdid+'" onchange="saveOrUpdate('+bdid+',\'speakerStr\');">'
            + '</div>'                   
			+ '</li>'				
            + '<li>'            
            + '<a href="javascript:void(0);" class="Savebtn mr10" onclick="hideLecture('+bdid+');">'+zLocale.fourstep_baocun+'</a>'            
            + '</li>'                
			+ '</ul>'			
            + '</div>'        
            + '</div>'    
            + '</li>';
    	$("#createLecture").before(lecturePage);
    	
    	// 初始化tip
    	initTip(bdid);
    	
    	// 加载百度编辑器
    	createUe("teachRequire"+bdid,886,50,bdid);
    	
    	// set numberLecture 值
    	$("#meetCourseDtoListSize").val(numberLecture);
    }
    
    // 删除一个见面课编辑框
    function removeLecture(number,meetCourseId){
    	layer.confirm(zLocale.public_message, {
    			title:' ', 
	    	   skin: 'layui-layer-zhs',
	    	   icon:0,
	    	   shade:.6,
	    	  btn: [zLocale.public_confim,zLocale.public_cancel] //按钮
	    	 }, function(){
	    		 remove(number,meetCourseId);
	    	 }, function(){
	    		 // 取消不做操作
	    	 });
    }
    
    // 删除见面课
    function remove(number,meetCourseId){
    	
    	 var numberLecture = $("#meetCourseDtoListSize").val();
    	 
     	// 删除编辑框
      	$("#Lectureli"+number).remove(); 
     	 
      	var i = 0;
    	// 重新排序
     	$("font[name='sort']").each(function(){
     		i = i + 1;
     		$("#" + this.id).html(i);
		});
     	
     	tdsort = tdsort - 1;
     	 
		numberLecture = Number(numberLecture) - Number(1);
		$("#meetCourseDtoListSize").val(numberLecture);
    	$("#createLecture-div-a").attr("onclick","createLecturePage("+numberLecture+")");
    	
    	if (meetCourseId == null || meetCourseId == '' || meetCourseId == 'null' || meetCourseId == 'undefined'){
    		layer.msg({
	    	     time: 1000, //1s后自动关闭
	    	   });
    		return;
    	}
    	
    	// 清空课程进度redis
		cleanTreeRedis($.trim($("#courseId").val()));
    	
    	//系统业务处理
    	$.ajax({
   		   type: "POST",
   		   url: basePath + "/course/fourStep/remove",
   		   data: "meetCourseId="+meetCourseId+"&courseId="+$("#courseId").val(),
   		   success: function(data){
   			 if (!data.success){
   				 console.log("数据加载异常！");
   				 return;
			 }
   			 layer.msg({
 	    	     time: 1000, //1s后自动关闭
 	    	   });
   		   }
   		});
    }

    // 全局调用 修改触发方法
    function editLecture(id,column,meetCourseId,number){
    	
    	var param = {"meetCourseId":meetCourseId,'courseId':$("#courseId").val()};
    	switch (column) {
	    	case 'courseTopic':
	    	 	param['courseTopic'] = $.trim($("#courseTopic"+meetCourseId).val());
	    	break;
	    	case 'taskType':
	    		param['taskType'] = $("#taskType"+meetCourseId).val();
	    	break;
	    	case 'speakerStr':
	    		param['speakerStr'] = $.trim($("#speakerStr"+meetCourseId).val());
	      	break;  
    	}
    	$.ajax({
    		   type: "POST",
    		   url: basePath + "/course/fourStep/saveOrUpdate",
    		   data: param,
    		   success: function(data){
    			   if (!data.success){
    				   console.log("数据加载异常！");
    				   return;
    			   }
    			   
    			   $("#teachRequire"+number).attr("teachRequire",data.result.teachRequire);
    		   }
    		});
    	
    	var fag = isRighticoShow(number,meetCourseId);
    	if (fag){
			$("#mark"+number).attr("class","rightico"); // 感叹号变成勾
		} else {
			$("#mark"+number).attr("class","hintico"); // 勾变成感叹号
		}
    }
    
    // 判断左边的标签是否显示
	function isRighticoShow(number,meetCourseId){
		
		// 清空课程进度redis
		cleanTreeRedis($.trim($("#courseId").val()));
		
		var courseTopic =  $.trim($("#courseTopic"+meetCourseId).val());
		if (courseTopic == null || courseTopic == '' || courseTopic == 'null' || courseTopic == 'undefined'){
    		return false;
    	}
		
		var taskType = $.trim($("#taskType"+meetCourseId).val());
		if (taskType == null || taskType == '' || taskType == 'null' || taskType == 'undefined'){
    		return false;
    	}
		
		var speakerStr = $.trim($("#speakerStr"+meetCourseId).val());
		if (speakerStr == null || speakerStr == '' || speakerStr == 'null' || speakerStr == 'undefined'){
    		return false;
    	}
		
		var teachRequire =  $("#teachRequire"+number).attr("teachRequire");
		if (teachRequire == null || teachRequire == '' || teachRequire == 'null' || teachRequire == 'undefined'){
    		return false;
    	}
		return true;
	}
	
	// 判断左边的标签是否显示
	function isRighticoShowNoUe(meetCourseId){
		
		// 清空课程进度redis
		cleanTreeRedis($.trim($("#courseId").val()));
		
		var courseTopic = $.trim($("#courseTopic"+meetCourseId).val());
		if (courseTopic == null || courseTopic == '' || courseTopic == 'null' || courseTopic == 'undefined'){
    		return false;
    	}
		
		var taskType = $.trim($("#taskType"+meetCourseId).val());
		if (taskType == null || taskType == '' || taskType == 'null' || taskType == 'undefined'){
    		return false;
    	}
		
		var speakerStr = $.trim($("#speakerStr"+meetCourseId).val());
		if (speakerStr == null || speakerStr == '' || speakerStr == 'null' || speakerStr == 'undefined'){
    		return false;
    	}
		
		return true;
	}
    
    
    // 全局调用 新增触发方法
    function saveOrUpdate(number,column){
    	
    	// 清空课程进度redis
		cleanTreeRedis($.trim($("#courseId").val()));
    	
    	var param = {"courseId":$("#courseId").val()};
    	
    	// 设置默认值
//    	var taskValue = $("#taskType"+column).val();
//		if (taskValue == null || taskValue == '' || taskValue == 'null' || taskValue == 'undefined'){
//			taskValue = "7"; // 默认7
//    	}
    	
    	switch (column) {
	    	case 'courseTopic':
//	    	 	param['taskType'] = taskValue;
	    	 	param['courseTopic'] = $.trim($("#courseTopic"+number).val());
	    	break;
	    	case 'taskType':
	    		param['taskType'] = $.trim($("#taskType"+column).val());
	    	break;
	    	case 'speakerStr':
//	    		param['taskType'] = taskValue;
	    	 	param['speakerStr'] = $.trim($("#speakerStr"+number).val());
	      	break;  
    	}
    	
    	$.ajax({
 		   type: "POST",
 		   url: basePath + "/course/fourStep/saveOrUpdate",
 		   data: param,
 		   success: function(data){
 			  if (!data.success){
 				 console.log("数据加载异常！");
 				 return;
 			  }
	    	 // 更新当前div id属性 和 其 方法调用
	    	 updateFun(number,data.result);
 		   }
 		});
    }
    
  	//新增见面课创建百度编辑器
	function createUe(id,width,height,number){
		var meetCourseId = $("#"+id).attr("meetCourseId");
		if (meetCourseId == null || meetCourseId == '' || meetCourseId == 'null' || meetCourseId == 'undefined'){
			var ue = newEditor(id,width,height);
			loadEditorText(ue,'');
			ue.addListener("blur", function (type, event) {
				
				// 清空课程进度redis
				cleanTreeRedis($.trim($("#courseId").val()));
				
				var teachRequire = plainTxt(ue);
				
				// 设置默认值
//		    	var taskValue = $("#taskType"+number).val();
//				if (taskValue == null || taskValue == '' || taskValue == 'null' || taskValue == 'undefined'){
//					taskValue = "7"; // 默认7
//		    	}
				
				 var param = {"meetCourseId":$("#"+id).attr("meetCourseId"),"courseId":$("#courseId").val(),'teachRequire':teachRequire,'taskType':$("#taskType"+number).val()};
				
				 $.ajax({
		    		   type: "POST",
		    		   url: basePath + "/course/fourStep/saveOrUpdate",
		    		   data: param,
		    		   success: function(data){
		    			   
		    			   if (!data.success){
		    				   console.log("数据加载异常！");
		    				   return;
		    			   }
		    		     
		    			   updateFun(number,data.result);
		    		   }
		    		});
			});
			
    	} 
	}
	
	// 更新页面方法
	function updateFun(number,data){
		
		// theme
		$("#courseTopic" + number).attr("onchange","editLecture(courseTopic"+data.meetCourseId+",'courseTopic',"+data.meetCourseId+","+number+");");
		$("#courseTopic" + number).attr("onkeyup","courseTitelLength("+data.meetCourseId+","+number+");");
		$("#courseTopic" + number).attr("id","courseTopic"+data.meetCourseId);
		// Teaching Requirements
		$("#taskType" + number).attr("onchange","editLecture(taskType"+data.meetCourseId+",'taskType',"+data.meetCourseId+","+number+");");
//		$("#taskType" + number).val(data.taskType);
		$("#taskType" + number).attr("id","taskType"+data.meetCourseId);
		//Main Lecture
		$("#speakerStr" + number).attr("onchange","editLecture(speakerStr"+data.meetCourseId+",'speakerStr',"+data.meetCourseId+","+number+");");
		$("#speakerStr" + number).attr("id","speakerStr"+data.meetCourseId);
		// teachRequire
		$("#teachRequire" + number).attr("meetCourseId",data.meetCourseId);
		$("#teachRequire" + number).attr("teachRequire",data.teachRequire);
		// 重新绑定删除方法
		$("#removeLec" + number).attr("onclick","removeLecture("+number+","+data.meetCourseId+");");
		
	}
	
	//记录 见面课名称的长度
	function courseTitelLength(inputId,spanId){
		var course_title = $.trim($("#courseTopic" + inputId).val());
		var len ;// 记录长度
		if(course_title.length > 120){
			$("#word" + inputId).val(course_title.substr(0,120));
			len = 0;
		} else {
			len = 120 - course_title.length;
		}
		$("#word" + spanId).html(len);
	}
	
	// 新增动态的见面课
	function courseTitelLengthad(number){
		var course_title = $.trim($("#courseTopic" + number).val());
		var len ;// 记录长度
		if(course_title.length > 120){
			$("#word" + number).val(course_title.substr(0,120));
			len = 0;
		} else {
			len = 120 - course_title.length;
		}
		$("#word" + number).html(len);
	}
	
    