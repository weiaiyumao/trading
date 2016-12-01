/**
 * Hugo 
 * 建课第三步: （章测试，期末考试）
 */  
var delIds="";
var layerIndex=0;
$(function(){
	//判断题单选按钮点击优化
	 $("#truespan").live("click",function(){
		 $("#trueAnswerRadio").attr("checked","checked");
	 });
	 $("#falsespan").live("click",function(){
		 $("#falseAnswerRadio").attr("checked","checked");
	 });
	//选这题复选框点击优化
	 $("[name=checkboxdiv]").live("click", function () {
		   $(this).toggle(function () {
			   $(this).find("input").attr("checked","checked");
		   },function () {
			   $(this).find("input").removeAttr("checked");
		   });
		   $(this).trigger('click');
		});
	 
	//添加试题弹窗
	$(".ui-state-default").live("click",function(){
		 $("#up").val(0);
		var index=($(this).index()+1)==1?2:($(this).index()+1)==2?3:($(this).index()+1)==3?14:($(this).index()+1);
		$("#topicType").val(index);//设置试题类型【2：选择；3：填空；14：判断；4：问答】
	    layerQuestionType("#testType"+index,"790px","auto",($(this).index()+1)==1?zLocale.thirdstep_xuanzheti:($(this).index()+1)==2?zLocale.thirdstep_tiankongti:($(this).index()+1)==3?zLocale.thirdstep_panduanti:zLocale.thirdstep_wendati,null,1);
	});
	//保存
	$(".savebtn").live("click",function(){
		var delId= delIds.split(" ");
		for(var i=0;i<delId.length;i++){
		if(delId[i].trim()!=""){
				$.ajax({
		  		   type: "POST",
		  		   url: basePath + "/course/thirdStep/StepQuiz/updateQuestion",
		  		   data:{"isDel":"0","optionId":delId[i].trim(),"type":upData.type,"examId":upData.quizId},
		  		  dataType:"json",
		  		   success: function(data){
		  		   }
		  		});
		}
		};
		
		var topicType=$("#topicType").val();
		var type=$("#testPaperType").val();
	    var optionList=[];
		if(topicType==2){
			var xuanzhexiang =$("#xuanzhexiang").find("[name=optional]");
			xuanzhexiang.each(function(i){
				var idindex=$(this).find("div").eq(1).attr("id");
				var id=$(this).find('span:first').text()==null?"":$(this).find('span:first').text();
				if(plainTxt(UE.getEditor(idindex))!=""){
				var YN=false; 
				if($(this).find("div").eq(0).children("input").attr("checked")=="checked")
				{
					YN=true;
				}
				var option={"id":id,"content":plainTxt(UE.getEditor(idindex)),"isResult":YN,"sort":i+1};
				optionList.push(option);
				}
			});
		}else if(topicType==3){
			var tiankongxiang =$("#tiankongxiang").find("[name=item]");
			tiankongxiang.each(function(i){
				var idindex=$(this).children("div").attr("id");
				if(plainTxt(UE.getEditor(idindex))!="")
				{
					var id=$(this).find('span:first').text()==null?"":$(this).find('span:first').text();
					var option={"id":id,"content":plainTxt(UE.getEditor(idindex)),"isResult":true,"sort":i+1};
					optionList.push(option);
				}
			});
		}else if(topicType==14){
			var answerRadios =$('[name=answerRadio]');
			answerRadios.each(function(i){
				var YN=false; 
				var id=""; 
				if($(this).attr("checked")=="checked")
				{
					YN=true;
				}
				if($("#up").val()==1){
					id=upData.optionList[i].id
				}
				var option={"id":id,"content":$(this).val(),"isResult":YN,"sort":i+1};
				optionList.push(option);
			});
		};
		if(isNullItem(topicType)){
			var result="";
			if( $("#up").val()!=1){
			var dataparm={"isDel":"",
					"examId":curQuizAddParam.quizId,
					"type":topicType,
					"id":curQuizAddParam.id,
					"courseId":$("#courseId").val(),
					"name":plainTxt(UE.getEditor("questionType"+topicType)).trim(),
					"name1":getTxt(UE.getEditor("questionType"+topicType)).trim(),
					"score":$("#pointsType"+topicType).val(),
					"sort": curQuizAddParam.curQuizindex+1,
					"result":topicType==4?plainTxt(UE.getEditor("answerType4")).trim():"",
					"explain":plainTxt(UE.getEditor("explainType"+topicType)).trim(),
					"optionListString":topicType!=4?JSON.stringify(optionList):"",
					
			};
			
			$.ajax({
     		   type: "POST",
     		   url: basePath + "/course/thirdStep/StepQuiz/saveQuestion",
     		   data:dataparm,
     		  dataType:"json",
     		   success: function(datas){
     			 data=datas.result;
     			  var tdata = {"result":data.result,"explain":data.explain,"score":data.score,"optionList":data.optionList,"id":data.questionid,"type":topicType,"name":dataparm.name1,"quizId":data.examId};   
     			  $curAdd.drawOneProcess({}, tdata); 
     			 $curAddQuiz.find(".fullMark").text($curAddQuiz.find(".fullMark").text()*1+data.score*1);
     			$curAddQuiz.find(".totalNumber").text($curAddQuiz.find(".totalNumber").text()*1+1);
                  
     			 $curAdd.drawIndex();

                   //检查quiz完整度
                   customCheckRowIntegrity($curAddQuiz);
     		   }
     		});
			}else{
				var dataparm={
				"isDel":"",
				"score":$("#pointsType"+topicType).val(),
				"result":topicType==4?plainTxt(UE.getEditor("answerType4")).trim():"",
				"explain":plainTxt(UE.getEditor("explainType"+topicType)).trim(),
				"name"	:plainTxt(UE.getEditor("questionType"+topicType)).trim(),	
				"name1"	:getTxt(UE.getEditor("questionType"+topicType)).trim(),	
				"id":upData.id,
				"type":topicType,
				"courseId":$("#courseId").val(),
				"examId":upData.examId,
				"optionListString":topicType!=4?JSON.stringify(optionList):"",	
				}
				$.ajax({
		     		   type: "POST",
		     		   url: basePath + "/course/thirdStep/StepQuiz/updateQuestion",
		     		   data:dataparm,
		     		   dataType:"json",
		     		   success: function(data){
		     			  _crud_quiz_question_replace_problem($curAdd,dataparm.name1);
		     			  $curAddQuiz.find(".fullMark").text($curAddQuiz.find(".fullMark").text()-upData.score+dataparm.score*1);  
		     		   }
		     		});
				
			}
		layer.close(layerIndex);
		}
	});
	//取消
	$(".cancelbtn").live("click",function(){
		layer.close(layerIndex);
	});
	
  }); 
//添加选择项
function addOptional(obj){
	   edIndex++;
		var htmladdOptional='<div name="optional" class="inputtexarea-div1 inputtexarea-div clearfix"><div name="checkboxdiv" style="float:left; width:35px;height:68px;"><input name="" type="checkbox" class="question-checkbox fl" value=""></div> <div class="answer-textarea fl" id="choice'+edIndex+'" ></div><span class="display-none"></span><span  onclick="delOptional(this)" class="deleteico"></span></div>';
		$("#addOptional").before(htmladdOptional);
		newEditor("choice"+edIndex,660,60);
}
//添加填空项
function  addOption(){
	edIndex++;
	var htmlItem='<div name="item"  class="inputtexarea-div inputtexarea-div1 clearfix"><div id="item'+edIndex+'"></div><span class="display-none"></span><span  onclick="delBlankFillingQuestions(this)" class="deleteico"></span> </div>';
	$("#addItem").before(htmlItem);
	newEditor("item"+edIndex,710,72);
	$("#item"+edIndex+" div:first-child").css("border","1px solid #ccc");
};

//判断试题完整
function isNullItem(type){
	var bool=true;
	var bool2=false;
	//var answerType=$("#answerType"+type).val();
	var questionType=getTxt(UE.getEditor("questionType"+type));//题目
	var pointsType=$("#pointsType"+type).val();//分数
	//判断试题分数，问题是否为空
	if(pointsType.trim()==""){
		layer.open({
			title:" ",
			icon:0,
			content:zLocale.thirdstep_points_not_null,
			shade:.6,
			skin: 'layui-layer-zhs',
			btn: [zLocale.public_confim] //按钮  
		});
		return false;
	}
	if(questionType.trim()==""){
		layer.open({
			title:" ",
			icon:0,
			content:zLocale.thirdstep_content_not_null,
			shade:.6,
			skin: 'layui-layer-zhs',
			btn: [zLocale.public_confim] //按钮  
		});
		return false;
	}
	//判断选择项是否完整 type2
	if(type==2 && bool){
		var sum=0;
	var xuanzhexiang =$("#xuanzhexiang").find("input");
		xuanzhexiang.each(function(i){
		var id=$(this).parent("div").parent("div").find("div").eq(1).attr("id");
	
		if(getTxt(UE.getEditor(id)).trim()!=""){
			sum=sum+1
		}
		if($(this).attr("checked")=="checked" && getTxt(UE.getEditor(id)).trim()=="")
		{
			bool2=false;
			return ;
		}
		if($(this).attr("checked")=="checked" && getTxt(UE.getEditor(id)).trim()!="")
		{
			bool2=true;
			return ;
		}
	});
		if (sum<2){
			layer.open({
				title:" ",
				icon:0,
				content:zLocale.thirdstep_muchoice_more_two,
				shade:.6,
				skin: 'layui-layer-zhs',
				btn: [zLocale.public_confim] //按钮  
			});
			return  false ;
		}
		if (!bool2){
			layer.open({
				title:" ",
				icon:0,
				content:zLocale.thirdstep_muchoice_answer,
				shade:.6,
				skin: 'layui-layer-zhs',
				btn: [zLocale.public_confim] //按钮  
			});
			return  false ;
		}
	}
	
	//判断填空项是否完整 type3
	if(type==3&& bool){
	var tiankongxiang =$("#tiankongxiang").find("[name=item]");
	tiankongxiang.each(function(){
		var id=$(this).children("div").attr("id");
		if(getTxt(UE.getEditor(id)).trim()!="")
		{
			bool2=true;
			return ;
		}
	});
	if(!bool2){
		layer.open({
			title:" ",
			icon:0,
			content:zLocale.thirdstep_blankanswer_not_null,
			shade:.6,
			skin: 'layui-layer-zhs',
			btn: [zLocale.public_confim] //按钮  
		});
		return  false ;
	}
	}
	if( type==4 && bool){
		bool2=true;
	}
	if(type==14){
		bool2=true;
	}
	return bool&&bool2;
}


//删除选择选
function delOptional(obj){
	var xuanzhexiang =$("[name=optional]");
	var id=$(obj).prev().text();
	if(xuanzhexiang.size()>2){
	layer.confirm(zLocale.public_message, {
  	   title:' ', 
  	   skin: 'layui-layer-zhs',
  	   icon:0,
  	   shade:.6,
  	   btn: [zLocale.public_confim,zLocale.public_cancel] //按钮  
  	 }, function(index,layero ){
  		var id=$(obj).prev().text();
  		if(id!=""){
  			delIds=delIds+" "+id
  		}
 		 $(obj).parent("div").remove();
 		 layer.close(index) ;
  	 });
	
}else{
	layer.open({
		title:" ",
		icon:0,
		content:zLocale.thirdstep_muchoice_more_two,
		shade:.6,
		skin: 'layui-layer-zhs',
		btn: [zLocale.public_confim] //按钮  
	});
	}
}
	
//删除填空项
function delBlankFillingQuestions(obj){
	if($("[name=item]").size()>1){
	 layer.confirm(zLocale.public_message, {
	  	   title:' ', 
	  	   skin: 'layui-layer-zhs',
	  	   icon:0,
	  	   shade:.6,
	  	   btn: [zLocale.public_confim,zLocale.public_cancel] //按钮  
	  	 }, function(index,layero){  
	  		var id=$(obj).prev().text();
	  		if(id!=""){
	  			delIds=delIds+" "+id
	  		}
	  		 $(obj).parent("div").remove();
	  		 layer.close(index) ;
	  	 });
	}
};


//layer弹窗
function   layerQuestionType(id,width,height,title,data,isfirst){
	if(data=="add"){
		  showDetail("bgDiv_zz");	
	}else{
	$("#testType").parent("div").parent("div").hide();
	}
	//初始化设置
	var top=0;
	if(isfirst!=null){
		$(".savebtn").html(zLocale.thirdstep_baocun);
		//添加题目弹窗成功创建百度编辑器
	  var answerType4ed=newEditor("answerType4",698,60,"T");
	  var explainType4ed=newEditor("explainType4",698,60,"T");
	  var questionType4ed=newEditor("questionType4",698,60,"T");
	  var explainType14ed=newEditor("explainType14",698,60,"T");
	  var questionType14ed=newEditor("questionType14",698,60,"T");
	  var explainType2ed=newEditor("explainType2",698,60,"T");
	  var questionType2ed=newEditor("questionType2",698,60,"T");
	  var explainType3ed=newEditor("explainType3",698,60,"T");
	  var questionType3ed=newEditor("questionType3",698,60,"T");
	  //初始化选项 
		 if( $("#topicType").val()==3&&$("[name=item]").length==0){
			 var htmlItem='<div name="item"  class="inputtexarea-div inputtexarea-div1 clearfix"><div id="item"></div><span class="display-none"></span><span  onclick="delBlankFillingQuestions(this)" class="deleteico"></span></div>';
				$("#addItem").before(htmlItem);
			    newEditor("item",710,72,"T");
				$("#item div:first-child").css("border","1px solid #ccc");
		  }else if($("#topicType").val()==2){
			for(var i=0;i<4;i++){
				   edIndex++;
					var htmladdOptional='<div name="optional" class="inputtexarea-div1 inputtexarea-div clearfix"><div name="checkboxdiv" style="float:left; width:35px;height:68px;"><input name="" type="checkbox" class="question-checkbox fl" value=""></div> <div class="answer-textarea fl" id="choice'+edIndex+'" ></div><span class="display-none"></span><span  onclick="delOptional(this)" class="deleteico"></span></div>';
					$("#addOptional").before(htmladdOptional);
					newEditor("choice"+edIndex,660,60,"T");
			}
		  }
		
  };
  //编辑试题 加载数据设置
	  if(data!=null&&data!="add"){
		  delIds="";
		  showDetail("bgDiv_zz");
		  loadEditorText(UE.getEditor("explainType"+data.type),data.explain==null?"":data.explain);
		  loadEditorText(UE.getEditor("questionType"+data.type),data.name);
		  $("#pointsType"+data.type).val(data.score);
		  $("#up").val(1);
		$(".savebtn").html(zLocale.thirdstep_xiugai);
		  if(data.optionList==null){
			 loadEditorText(answerType4ed,data.result==null?"":data.result);
		  }else{
			 if(data.type==2){
				 $("[name=optional]").remove();
				 for ( var option in data.optionList) {
					 var checkbox="";
					 if(data.optionList[option].isResult==true){
						 checkbox= 'checked="checked"';
					 }
					 edIndex++;
						var htmladdOptional='<div name="optional" class="inputtexarea-div1 inputtexarea-div clearfix"><div name="checkboxdiv" style="float:left; width:35px;height:68px;"><input name="" type="checkbox" class="question-checkbox fl" '+checkbox+' value=""></div> <div class="answer-textarea fl" id="choice'+edIndex+'" ></div><span class="display-none">'+data.optionList[option].id+'</span><span  onclick="delOptional(this)" class="deleteico"></span></div>';
						$("#addOptional").before(htmladdOptional);
						newEditor("choice"+edIndex,660,60);
						loadEditorText(UE.getEditor("choice"+edIndex),data.optionList[option].content);
				}
				
			 }else if(data.type==3){
				 $("[name=item]").remove();
				 for ( var option in data.optionList) {
					 edIndex++;
					 var htmlItem='<div name="item"  class="inputtexarea-div inputtexarea-div1 clearfix"><div id="item'+edIndex+'"></div><span class="display-none">'+data.optionList[option].id+'</span><span  onclick="delBlankFillingQuestions(this)" class="deleteico"></span></div>';
						$("#addItem").before(htmlItem);
						newEditor("item"+edIndex,710,72,"T");
						loadEditorText(UE.getEditor("item"+edIndex),data.optionList[option].content);
						$("#item"+edIndex+" div:first-child").css("border","1px solid #ccc");
				}
			 }else if(data.type==14){
				 for ( var option in data.optionList) {
					 if(data.optionList[option].content=="错" && data.optionList[option].isResult==true)
					 $("#falseAnswerRadio").attr("checked","checked");
					 if(data.optionList[option].content=="对" && data.optionList[option].isResult==true)
					 $("#trueAnswerRadio").attr("checked","checked");
				}
				
			 }
		  }
	  };
	  //设置弹出窗口top值
	  top=($(window).height()-($(id).height()+70))/2
	  if(top<0){
		  top=0;
	  };
	  //弹出窗口
	  layer.open({
	   offset:[top+"px"],
		  type:1,
		  shade: false,
		  title :title,
		  area:[width,height],
		  fix: false, //不固定
		  content:$(id),
		  success: function(layero, index){
				  layerIndex=index;
			},
		  end:function(){
			  $("#testType").parent("div").parent("div").show();
			 $("#st")[0].reset();
			  $("#toupdatapopup").load( basePath + "/course/thirdStep/StepQuiz/toupdatapopup",function() {
				 
			  });
			 if(isfirst!=1){
				 hideDetail("bgDiv_zz");
			 }
		  }
			 
		});
};
