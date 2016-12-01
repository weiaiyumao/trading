
//生成编辑器
            var ue= newEditor("textarea",950,50);
			var ue1= newEditor("textarea1",950,50);
			var ue2= newEditor("textarea2",950,50);
			var ue3= newEditor("textarea3",950,50);
			var ue4= newEditor("textarea4",950,50);
	
	
	/*加载————start*/
$(function(){
	//置顶
	backToTop();
	//加载数据
	querySecondStep();
	//编辑器失焦事件
	ue.addListener("blur", function (type, event) {
		upSecondStep("courseBackground",getTxt(ue).trim()==""?"":plainTxt(ue));
		warn("#course_background",getTxt(ue).trim());
	});
	ue1.addListener("blur", function (type, event) {
		upSecondStep("courseTarget",getTxt(ue1).trim()==""?"":plainTxt(ue1));
		warn("#course_objectives",getTxt(ue1).trim());
	});
	ue2.addListener("blur", function (type, event) {
		upSecondStep("introduction",getTxt(ue2).trim()==""?"":plainTxt(ue2));
		warn("#design_principles",getTxt(ue2).trim());
	});
	ue3.addListener("blur", function (type, event) {
		upSecondStep("learningOutcomes",getTxt(ue3).trim()==""?"":plainTxt(ue3));
		warn("#learning_outcomes",getTxt(ue3).trim());
	});
	ue4.addListener("blur", function (type, event) {
		upSecondStep("learningMethods",getTxt(ue4).trim()==""?"":plainTxt(ue4));
		warn("#learning_methods",getTxt(ue4).trim());
	});
			selectStepClass(2);//选中导航菜单
			//悬浮提示
			$('#demo-tip-yellowsimple').poshytip({
				className: 'questionmarksimple',
				showTimeout: 1,
				alignTo: 'target',
				alignX: 'right',
				offsetY: -155,
				offsetX: 10,
				alignY: 'center',
				allowTipHover: false
			});
			
			$('#demo-tip-yellowsimple1').poshytip({
				className: 'questionmarksimple',
				showTimeout: 1,
				alignTo: 'target',
				alignX: 'right',
				offsetY: -140,
				offsetX: 10,
				alignY: 'center',
				allowTipHover: false
			});
			$('#demo-tip-yellowsimple2').poshytip({
				className: 'questionmarksimple',
				showTimeout: 1,
				alignTo: 'target',
				alignX: 'right',
				offsetY: -235,
				offsetX: 10,
				alignY: 'center',
				allowTipHover: false
			});
			$('#demo-tip-yellowsimple3').poshytip({
				className: 'questionmarksimple',
				showTimeout: 1,
				alignTo: 'target',
				alignX: 'right',
				offsetY: -235,
				offsetX: 10,
				alignY: 'center',
				allowTipHover: false
			});
			$('#demo-tip-yellowsimple4').poshytip({
				className: 'questionmarksimple',
				showTimeout: 1,
				alignTo: 'target',
				alignX: 'right',
				offsetY: -235,
				offsetX: 10,
				alignY: 'center',
				allowTipHover: false
			});
			 
});
/*加载————end*/
        //跟新
        function upSecondStep(name,str){
        	//console.log("courseId=" + $("#courseId").val() + "&" +name + "=" + str);
        var dataparm={"courseId":$("#courseId").val()};
        dataparm[name]=str;
        	$.ajax({
        		   type: "POST",
        		   url: basePath + "/course/secondStep/upSecondStep",
        		   //data: "courseId=" + $("#courseId").val() + "&" +name + "=" + str,
        		   data:dataparm,
        		   success: function(data){
        			   $.ajax( {
                       	url : basePath+"/course/cleanTreeRedis",
               			type : "POST",
               			data: {"courseId":$("#courseId").val()}
                       });
        		   }
        		});
        	
        }
      //查询
        function querySecondStep(){
        	$.ajax( {
    			url : basePath+"/course/secondStep/querySecondStep",
    			type : "POST",
    			data: {"courseId":$("#courseId").val()},
    			success : function(data) {
    			
    				var result=data.result;
    				//加载全部资源后判断是否显示警告
    				warn("#course_background",result.courseBackground==null?"":result.courseBackground);
    				warn("#course_objectives",result.courseTarget==null?"":result.courseTarget);
    				warn("#design_principles",result.introduction==null?"":result.introduction);
    				warn("#learning_outcomes",result.learningOutcomes==null?"":result.learningOutcomes);
    				warn("#learning_methods",result.learningMethods==null?"":result.learningMethods);
    				//加载内容
    				loadEditorText(ue,result.courseBackground==null?"":result.courseBackground);
    				loadEditorText(ue1,result.courseTarget==null?"":result.courseTarget);
    				loadEditorText(ue2,result.introduction==null?"":result.introduction);
    				loadEditorText(ue3,result.learningOutcomes==null?"":result.learningOutcomes);
    				loadEditorText(ue4,result.learningMethods==null?"":result.learningMethods);
    			}
        	});
        	
        }