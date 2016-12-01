
/**
 * 建课第三步:视频设置
 * @author JinXing
 * @Date 2016年11月4日 15:34
 */

var $thirdstep_videoset_title;
var $thirdstep_videoset_time;
var $thirdstep_videoset_videoWidth=712;
var $thirdstep_videoset_quizWidth=15;
var $thirdstep_videoset_timeList=[];
var $thirdstep_videoset_deleteOptionList=[];
var $thirdstep_videoset_oldTime;
$.ajaxSetup ({ cache: false });

$(function(){
	
	try {
		videoOption_publicMethod.loadEditor("thirStep_videoOption_question","no");
		videoOption_publicMethod.loadEditor("thirdstep_videoOption_explain","no");
	} catch (e) {
		console.log(e);
	}
	
});

/**
 * 小节视频弹窗
 * 
 * */
var layer_videoOptions=function(width,height,id,title){
	var offset_top=0;
	var offset_left=($(document).width()-810)/2;
	
	//关闭之前的弹窗
	layer.closeAll();
	layer.open({
		  type:1,
		  offset:[offset_top,offset_left],
		  shift:5,
		  shade: [0.5, '#393D49'],
		  title :" ",
		  area:[width,height],
		  fix: false, //不固定
		  move: false,
		  zIndex:900,
		  content:$(id),
		  success:function(){
			 
			  videoOption_publicMethod.setMask();
		  },
		  end:function(){//关闭弹窗
			  console.log("PlayerStarter.playerArray:",PlayerStarter.playerArray);
		  }
	
		}); 
};


/**
 * 视频设置公用方法
 * 
 * */

var videoOption_publicMethod={
	
	//记录页面数据
	record:function(){
		
		try {
			$thirdstep_videoset_title=$("#thirdstep_videoset_title").val();//Title
			$thirdstep_videoset_time=videoOption_lessonTestPublicMethod.getTimerSecond();//timer
			$thirdstep_videoset_oldTime=$("#thridStep-videoOption_oldTime").val();
		} catch (e) {
			console.log(e);
		}
		
	},

	//清空页面数据
	
	clean:function(){
		$thirdstep_videoset_title="";
		$thirdstep_videoset_time="";
		$thirdstep_videoset_timeList=[];
		$thirdstep_videoset_deleteOptionList=[];
		$thirdstep_videoset_oldTime="";
		
		$("#thirdstep_videoset_title").val("");
		$("#thirdstep_videoset_chapterId").val("");
		$("#thirdstep_videoset_lessonId").val("");
		$("#thirdstep_videoset_lessonVideoId").val("");
		$("#thirdStep-videoOption_testQuestionId").val("");
		$("#thirdStep-videoOption_lessonTestQuestionId").val("");
		$("#thridStep-videoOption_oldTime").val("");
		$("#thirdStep-en-show .delete").attr("data-subTitleId","");
		$("#thirdStep-zh-show .delete").attr("data-subTitleId","");
		$("#thirdStep-videoSrc").val("");
		$("#thirdStep-videoSrc").attr("src","");
		$("#thirdStep-videoSrc").attr("data-videosec","");
		$("#thirStep_videoOption_timer").find(".getFocus.quizinput1").val("");//timer
		$("#thirStep_videoOption_timer").find(".getFocus.quizinput2").val("");//timer
		$("#thirdStep_videoOption_videoDotShow").html("");
		videoOption_publicMethod.setContentEditor("thirStep_videoOption_question","");
		videoOption_publicMethod.setContentEditor("thirdstep_videoOption_explain","");
		
		$("#thirdStep-en-show").hide();
		$("#thirdStep-zh-show").hide();
		$("#thirdstep_videoset_havatime").hide();
		$("#thirdstep_videoset_outtime").hide();
		
		$("#thirdstep_videoset_title").unbind();
		$("#thirdStep-en-show .delete").unbind();
		$("#thirdStep-zh-show .delete").unbind();
		$("#thirStep_videoOption_timer").find(".getFocus.quizinput1").unbind();
		$("#thirStep_videoOption_timer").find(".getFocus.quizinput2").unbind();
		$('#thirdStep_videoOption_addOptional>a').unbind();
		$("#thirdStep-testQuestion-save").unbind();
		$("#thirdStep-testQuestion-delete").unbind();
		videoOption_lessonTestQuestion.cleanInfo();
	},
	
	//非空验证
	isEmpty:function(obj){
		
		if(obj ==-1){
			return true;
		}
		if(obj == ""){
			return true;
		}
		if(obj == null){
			return true;
		}
		if(obj == undefined){
			return true;
		}
		if(obj.length == 0){
			return true;
		}

	},
	
	//layer 消息框
	layer_msg:function(content){
		
		   layer.msg(content, {
			   icon: 1,//1成功 2失败
			   offset: 'rb',
			   time: 2000 //2秒关闭（如果不配置，默认是3秒）
			}, function(){
			  //do something
			});  
		
	},
	
	//layer 提示框
	layer_openMsg:function(content){
		
		layer.open({
			title:" ",
			icon:0,
			content:"<div class='thirdstep_wordWrap'>"+content+"</div>",
			shade:0.6,
			skin: 'layui-layer-zhs',
			btn: [zLocale.public_confim] //按钮  
		});
		
	},
	
	//layer 删除弹题确认框
	layer_confirmMsg:function(content,callback){
		if(content ==""){
			content=zLocale.public_message;//默认删除提示信息
		}
		 layer.confirm("<div class='thirdstep_wordWrap'>"+content+"</div>", {
            title:' ',
            skin: 'layui-layer-zhs',
            icon:0,
            shade:0.6,
            btn: [zLocale.public_confim,zLocale.public_cancel] //按钮
        }, function(index,layero){
        	
        	try {
        		callback();
        		
                layer.close(index) ;
			} catch (e) {
				console.log(e);
			}
			return true;
        });

	},
	
	//初始化百度编辑器
	loadEditor:function(id,is_answer){
		
		try {
			if(is_answer =="no"){
				newEditor(id,660,70,"T");
			}else if(is_answer =="yes"){
				newEditor(id,610,63,"T");
			}
		} catch (e) {
			console.log(e);
		}
		
	},
	
	
	//设置百度编辑器的值  editorName:id名称
	setContentEditor:function(editorName,text){
		
		try {
			var Editor=UE.getEditor(editorName);
			loadEditorText(Editor, text);
		} catch (e) {
			console.log(e);
		}
	},
	
	//获取格式文本百度编辑器的值
	getContentEditor:function(editorName){
		
		try {
			var Editor=UE.getEditor(editorName);
			return plainTxt(Editor);
		} catch (e) {
			console.log(e);
		}
	},
	
	//获取纯文本百度编辑器的值
	getTextEditor:function(editorName){
		
		try {
			var Editor=UE.getEditor(editorName);
			return editorText(Editor);
		} catch (e) {
			console.log(e);
		}
	},
	
	//销毁百度编辑器
	deleteEditor:function(editorName){
		
		try {
			var Editor=UE.getEditor(editorName);
			return deleteEditor(Editor);
		} catch (e) {
			console.log(e);
		}
	},
	
	//禁用百度编辑器
	setDisableEditor:function(editorName){
		
		try {
			DisableEditor(editorName);
		} catch (e) {
			console.log(e);
		}
	},
	
	//启用百度编辑器
	setEnableEditor:function(editorName){
		
		try {
			EnableEditor(editorName);
		} catch (e) {
			console.log(e);
		}
	},
	
	//设置弹题区域遮罩层
	setMask:function(){
		var width=$("#thirdStep_videoOption_lessonTestQuestionShow").width();
		var height=$("#thirdStep_videoOption_lessonTestQuestionShow").height();
		
		$("#thirdStep_videoOption_mask").width(width);
		$("#thirdStep_videoOption_mask").height(height);
	},
	
	//显示遮罩层
	showMask:function(){
		$("#thirdStep_videoOption_mask").show();
	},
	//隐藏遮罩层
	hideMask:function(){
		$("#thirdStep_videoOption_mask").hide();
	}
	
};


/**
 * 视频设置播放器操作事件
 * 
 * */

var videoOption_videoEdit={

	//设置播放器的播放进度
	setTime:function(time){

		var testQuestionId=$("#thirdStep-videoOption_testQuestionId").val();
		if(videoOption_publicMethod.isEmpty(testQuestionId)){
			if(!videoOption_publicMethod.isEmpty(time)){
				videoOption_lessonTestQuestion.loadTimer(time);
			}
		}

	},

};


/**
 * 视频设置公共按钮绑定事件
 * */

var videoOption_btnBind={
	
	//title绑定
	titleBind:function(){
		
		$("#thirdstep_videoset_title").bind("blur",function(){
			var lessonName=$("#thirdstep_videoset_title").val();
			
			try {
				//如果内容不该变，不做修改
				if($thirdstep_videoset_title!=lessonName){
		
					var lessonVideoId=$("#thirdstep_videoset_lessonVideoId").val();
					videoOption_lessonVideo.updateLessonVideo(lessonVideoId, lessonName);
				}
				
			} catch (e) {
				console.log(e);
			}
			
		});
		
	},
	
	//title keyUp绑定
	titleKeyUp:function(){
		var length=$("#thirdstep_videoset_title").val().length;
		if(length >0){
			
			$(".videoOption-titleLength").html(120-length);
			
			$("#thirdstep_videoset_title").keyup(function(){
				var length=$("#thirdstep_videoset_title").val().length;
				$(".videoOption-titleLength").html(120-length);
				
			});
			
		}
		
	},
	
	//中英文字幕的删除按钮绑定
	subtitleBind:function(){
		
		try {
			
			$("#thirdStep-en-show .delete").bind("click",function(){
				videoOption_subTitleInfo.removeSubTitleInfo("#thirdStep-en-show",$("#thirdStep-en-show .delete").attr("data-subTitleId"));
			});
			$("#thirdStep-zh-show .delete").bind("click",function(){
				videoOption_subTitleInfo.removeSubTitleInfo("#thirdStep-zh-show",$("#thirdStep-zh-show .delete").attr("data-subTitleId"));
			});
		} catch (e) {
			console.log(e);
		}
		
	},
	
	//视频打点设置文本框事件绑定
	videoQuizBind:function(){
		
		//失焦绑定
		$("#thirStep_videoOption_timer").find(".getFocus.quizinput1").unbind("click").bind("blur",function(){
			videoOption_lessonTestPublicMethod.checkTimer1();
			videoOption_lessonTestQuestion.timerBlur();
		});
		$("#thirStep_videoOption_timer").find(".getFocus.quizinput2").unbind("click").bind("blur",function(){
			videoOption_lessonTestPublicMethod.checkTimer2();
			videoOption_lessonTestQuestion.timerBlur();
		});
		
		//获焦绑定
		$("#thirStep_videoOption_timer").find(".getFocus.quizinput1").unbind("click").bind("focus",function(){
			$(this).select();
		});
		
		$("#thirStep_videoOption_timer").find(".getFocus.quizinput2").unbind("click").bind("focus",function(){
			$(this).select();
		});
	},
	
	//添加选项框按钮绑定
	addOptionalBind:function(){
		
		$("#thirdStep_videoOption_addOptional>a").bind("click",function(){
			var lastAnswer=$("#thirdstep_videoset_answerInfo>div:last");
			var index=lastAnswer.data("index");
			
			if(videoOption_publicMethod.isEmpty(index)){
				index=0;
			}
			videoOption_testQuestion.loadTestQuestionAnswer(++index);
			
			//加载试题删除按钮绑定
			videoOption_testQuestion.deleteOptionsBind();
		});
	},
	
	//save、delete试题
	saveAndDeleteBind:function(){
		
		//视频弹题save、delete按钮绑定
		$("#thirdStep-testQuestion-save").unbind("click").bind("click",function(){
			videoOption_testQuestion.isSaveOrUpdate();
		});
		
		$("#thirdStep-testQuestion-delete").unbind("click").bind("click",function(){
			var testQuestionId= $("#thirdStep-videoOption_testQuestionId").val();
			//存在试题id跟关联id走update
			if(!videoOption_publicMethod.isEmpty(testQuestionId)){
				
				videoOption_publicMethod.layer_confirmMsg("",function(){
	        		
					videoOption_lessonTestQuestion.removeLessonTestInfo();

				});
			}else {
				videoOption_lessonTestQuestion.cleanInfo();
			}
				
		});
		
	}
	
};

/**
 * 小节操作 查询信息、修改Title
 * 
 * */

var videoOption_lessonVideo={
		
	//根据小节id获取小节详情
	getLessonVideoInfo:function(lessonId,lessonVideoId){
		videoOption_publicMethod.clean();
		var dataParm = {"lessonVideoId":lessonVideoId};
		
		$.ajax({
			type: "post",
		    url: basePath+"/course/thirdStep/lessonVideo/detail",
		    data:dataParm,
//		    cache : false,
		    async: false, //异步请求
		    dataType : 'json',	
		    beforeSend:function(){},
		    success: function(data){
		    	if(data.success==true){
		    		
		    		$("#thirdstep_videoset_chapterId").val(data.result.chapterId);//chapterId
		    		$("#thirdstep_videoset_lessonId").val(data.result.lessonId);//lessonId
		    		$("#thirdstep_videoset_lessonVideoId").val(data.result.id);//lessonVideoId
		    		$("#thirdstep_videoset_title").val(data.result.lessonName);//Title
		    		$("#thirdStep-videoSrc").val(data.result.videoId);//videoId
		    		$("#thirdStep-videoSrc").attr("src",data.result.videoUrl);//videoUrl
		    		$("#thirdStep-videoSrc").attr("data-videosec",data.result.videoSec);

		    		//判断视频是否转码
		    		videoOption_lessonVideo.isTranscoding(data);
		    		
		    	}
		    },
		    error:function(data){},
		    complete:function(){}
		});
		
	},
	
	
	//判断视频是否转码成功:存在视频时长则转码成功，否则转码失败
	isTranscoding:function(data){
		var videoSec=data.result.videoSec;
		
		if(!videoOption_publicMethod.isEmpty(videoSec)){
			videoOption_lessonVideo.loadSuccessTranscodingInfo();
			$("#thirdStep-testQuestion-save").show();
			$("#thirdStep-testQuestion-delete").show();
		}else {
			videoOption_lessonVideo.loadFailureTranscodingInfo();
			$("#thirdStep-testQuestion-clean").show();
		}

	    //视频弹框
	    layer_videoOptions("820px","auto","#thirdStep-videoOptionsShow","");
		
	},
	

	 // 加载转码成功的字幕信息、视频打点信息
	loadSuccessTranscodingInfo:function(){
		
		
		try {
			//记录当前页面数据
			videoOption_publicMethod.record();
			
			//获取字幕信息
			videoOption_subTitleInfo.getSubTitleInfo();
			//初始化字幕上传组件
			thirdStep_uploadAndPlay.loadSubTitleUpload();
			//初始化播放器
			thirdStep_uploadAndPlay.loadLessonVideoPlayer();
			
	
			//加载视频打点
			videoOption_lessonTestQuestion.getLessTestListInfo();
			//默认加载试题选项
			videoOption_testQuestion.loadTestQuestionAnswerList();
			
			
			//title按钮失焦绑定
			videoOption_btnBind.titleBind();
			//title按钮失焦绑定
			videoOption_btnBind.titleKeyUp();
			//中英文字幕删除按钮绑定
			videoOption_btnBind.subtitleBind();
			//视频打点时间失焦绑定
			videoOption_btnBind.videoQuizBind();
			//添加试题按钮绑定
			videoOption_btnBind.addOptionalBind();
			//视频弹题save、delete按钮绑定
			videoOption_btnBind.saveAndDeleteBind();
			
			//隐藏遮罩层
			videoOption_publicMethod.hideMask();
		} catch (e) {
			console.log(e);
		}
		
	},
	
	//加载转码失败信息
	loadFailureTranscodingInfo:function(){
		
		try {
			//记录当前页面数据
			videoOption_publicMethod.record();
			
			//获取字幕信息
			videoOption_subTitleInfo.getSubTitleInfo();
			//初始化字幕上传组件
			thirdStep_uploadAndPlay.loadSubTitleUpload();
			//初始化视频播放器
			thirdStep_uploadAndPlay.loadLessonVideoPlayer();
			
			//默认加载试题选项
			videoOption_testQuestion.loadTestQuestionAnswerList("false");
			
			
			//title按钮失焦绑定
			videoOption_btnBind.titleBind();
			//title按钮失焦绑定
			videoOption_btnBind.titleKeyUp();
			//中英文字幕删除按钮绑定
			videoOption_btnBind.subtitleBind();
			
			//显示遮罩层
			videoOption_publicMethod.showMask();
		} catch (e) {
			console.log(e);
		}
	},
	
	//修改小节Title
	updateLessonVideo:function(lessonVideoId,lessonName){
		
		var dataParm = {
				"id":lessonVideoId,
				"lessonName":lessonName
			};
			
			$.ajax({
				type: "post",
			    url: basePath+"/course/thirdStep/lessonVideo/update",
			    data:dataParm,
//			    cache : false,
			    dataType : 'json',	
			    beforeSend:function(){},
			    success: function(data){
			    	if(data.success==true){
			    		
			    		//记录当前页面数据
			    		videoOption_publicMethod.record();
			    	}
			    },
			    error:function(data){},
			    complete:function(){}
			});
		
	}
	
};


/**
 * 字幕操作
 * 
 * */

var videoOption_subTitleInfo={
		
	//根据视频Id获取字幕信息
	getSubTitleInfo:function(){
		
		var videoId=$("#thirdStep-videoSrc").val();
		var dataParm = {"videoId":videoId,"language":-1};
		
		$.ajax({
			type: "post",
		    url: basePath+"/course/thirdStep/searchVideoSubtitleInfoByVideoId",
		    data:dataParm,
//		    cache : false,
		    dataType : 'json',	
		    beforeSend:function(){},
		    success: function(data){
		    	if(data.success==true){
		    		try {
		    			
		    			$.each(data.result,function(index,SubTitle){
		    				
			    			//加载字幕信息
			    			videoOption_subTitleInfo.loadSubTitleInfo(SubTitle);
				    	});
		    			
					} catch (e) {
						console.log(e);
					}
		    	}
		    },
		    error:function(data){},
		    complete:function(){}
		});
		
	},
	
	//加载字幕信息 
	loadSubTitleInfo:function(SubTitle){
		
		//language  -1 全部,0中文,1英文,2中/英
		if(SubTitle.language ==1){
			$("#thirdStep-en-show .uploadname").text(SubTitle.title);
			$("#thirdStep-en-show .delete").attr("data-subTitleId",SubTitle.id);
			$("#thirdStep-en-show").show();
			
		}else if(SubTitle.language ==0){
			$("#thirdStep-zh-show .uploadname").text(SubTitle.title);
			$("#thirdStep-zh-show .delete").attr("data-subTitleId",SubTitle.id);
			$("#thirdStep-zh-show").show();
		}
	},
	
	//根据字幕id删除字幕信息
	removeSubTitleInfo:function(obj,id){
		
		var dataParm = {"id":id};
		
		$.ajax({
			type: "post",
		    url: basePath+"/course/thirdStep/delVideoSubtitleInfo",
		    data:dataParm,
//		    cache : false,
		    dataType : 'json',	
		    beforeSend:function(){},
		    success: function(data){
		    	if(data.success==true){
		    		//删除成功，更新数据
		    		$(obj+" .uploadname").text(""); 
		    		$(obj+" .delete").attr("data-subTitleId","");
		    		$(obj).hide();
		    	}
		    },
		    error:function(data){},
		    complete:function(){}
		});
		
	},
	
	//判断该字幕是否存在
	existsSubtitle:function(type){
		var $subTitleId;
		var content;
		if(type=="en"){
			$subTitleId=$("#thirdStep-en-show .delete").attr("data-subTitleId");
			content=$("#thirdStep_videoset_enSutitle").val();
			language=1;
			
		}else if(type =="zh"){
			$subTitleId=$("#thirdStep-zh-show .delete").attr("data-subTitleId");
			content=$("#thirdStep_videoset_zhSutitle").val();		
		}
		
		if(!videoOption_publicMethod.isEmpty($subTitleId)){
			
			videoOption_publicMethod.layer_confirmMsg(content,function(){
        		
				videoOption_lessonTestQuestion.removeLessonTestInfo();

			});
		}
	},
	
	//判断字幕走Add还是走Update
	isAddOrisUpdate:function(data,type){
		
		var $subTitleId;
		var language;//字幕语言（ 0中文、1英文、2中文/英文）
		var content;
		
		if(type=="en"){
			$subTitleId=$("#thirdStep-en-show .delete").attr("data-subTitleId");
			content=$("#thirdStep_videoset_enSutitle").val();
			language=1;
		}else if(type =="zh"){
			$subTitleId=$("#thirdStep-zh-show .delete").attr("data-subTitleId");
			content=$("#thirdStep_videoset_zhSutitle").val();
			language=0;
		}
		
		//如果data-subTitleId属性有值走update,否则走Add
		try {
			if(!videoOption_publicMethod.isEmpty($subTitleId)){
				
				videoOption_publicMethod.layer_confirmMsg(content,function(){
	        		
					videoOption_subTitleInfo.updateSubTitleInfo(data, language, $subTitleId);

				});
				
				
			}else{
				videoOption_subTitleInfo.addSubTitleInfo(data, language);
			}
		} catch (e) {
			console.log(e);
		}
		
	},
	
	//修改字幕信息
	updateSubTitleInfo:function(data,language,id){
		
		var videoId=$("#thirdStep-videoSrc").val();
		var dataParm = {
			"id":id,//字幕id
			"videoId":videoId,//视频id
			"title":data.fileName,//字幕名称
			"path":data.filePath,//字幕路径
			"language":language//字幕语言（ 0中文、1英文、2中文/英文）
		};
		
		$.ajax({
			type: "post",
		    url: basePath+"/course/thirdStep/updateVideoSubtitleInfo",
		    data:dataParm,
//		    cache : false,
		    dataType : 'json',	
		    beforeSend:function(){},
		    success: function(data){
		    	if(data.success==true){
		    		try {
		    			
		    			//重新加载字幕信息
			    		videoOption_subTitleInfo.getSubTitleInfo();
					} catch (e) {
						console.log(e);
					}
		    	}
		    },
		    error:function(data){},
		    complete:function(){}
		});
		
	},
	
	//添加字幕信息
	addSubTitleInfo:function(data,language){
		
		var videoId=$("#thirdStep-videoSrc").val();
		var dataParm = {
					"videoId":videoId,//视频id
					"title":data.fileName,//字幕名称
					"path":data.filePath,//字幕路径
					"language":language//字幕语言（ 0中文、1英文、2中文/英文）
				};
		
		$.ajax({
			type: "post",
		    url: basePath+"/course/thirdStep/addVideoSubtitleInfo",
		    data:dataParm,
//		    cache : false,
		    dataType : 'json',	
		    beforeSend:function(){},
		    success: function(data){
		    	if(data.success==true){
		    		try {
		    			
		    			//重新加载字幕信息
		    			videoOption_subTitleInfo.getSubTitleInfo();
					} catch (e) {
						console.log(e);
					}
		    	}
		    },
		    error:function(data){},
		    complete:function(){}
		});
		
	},
	
	
};

/**
 * 视频弹题公共方法
 * 
 * */

var videoOption_lessonTestPublicMethod={
		
	//视频打点数据校验
	checkLessonTestInfo:function(){
		var flag=true;
		
		try {
			
			var time=videoOption_lessonTestPublicMethod.getTimerSecond();
			if(!videoOption_lessonTestPublicMethod.checkAnswers()){
				
				flag= false;//答案
			}
			if(!videoOption_lessonTestPublicMethod.checkQuestion()){
				flag= false;//题目
				var content=$("#thirdstep_content_not_null").val();
				videoOption_publicMethod.layer_openMsg(content);
			}
			if(!videoOption_lessonTestPublicMethod.checkTimerIsTrue(true)){
				flag=false;//时长+是否存在
			}
			if(!videoOption_lessonTestPublicMethod.checkTimer()){
				flag=false;//时间
			}
		} catch (e) {
			console.log(e);
		}
			
		return flag;
	},
	
	//限制视频打点时间分钟数
	checkTimer1:function(){
		
		var timer1=$("#thirStep_videoOption_timer").find(".getFocus.quizinput1").val();
		if(videoOption_publicMethod.isEmpty(timer1)){
			$("#thirStep_videoOption_timer").find(".getFocus.quizinput1").val("");//timer
			return;
		}
		timer1=parseInt(timer1);
		if(timer1 <=0){
			$("#thirStep_videoOption_timer").find(".getFocus.quizinput1").val("");//timer
		}
	},
	
	//限制视频打点时间秒数
	checkTimer2:function(){
	
		//限制秒数在0-59之间
		var timer2=$("#thirStep_videoOption_timer").find(".getFocus.quizinput2").val();
		if(videoOption_publicMethod.isEmpty(timer2)){
			$("#thirStep_videoOption_timer").find(".getFocus.quizinput2").val("");//timer
			return;
		}
		timer2=parseInt(timer2);
		if(timer2 <=0){
			$("#thirStep_videoOption_timer").find(".getFocus.quizinput2").val("");//timer
		}else if(timer2 >=60){
			$("#thirStep_videoOption_timer").find(".getFocus.quizinput2").val("59");
		}
	},

	//检查timer
	checkTimer:function(){
		
		var timer1=$("#thirStep_videoOption_timer").find(".getFocus.quizinput1").val();
		var timer2=$("#thirStep_videoOption_timer").find(".getFocus.quizinput2").val();
		
		if(timer1.length ==0 && timer1!=0){
			return false;
		}
		if(timer2.length ==0 && timer2!=0){
			return false;
		}	
		return true;
	},
	
	//检查timer 正确完整性
	checkTimerIsTrue:function(_isShow){
		var time=videoOption_lessonTestPublicMethod.getTimerSecond();
		var testQuestionId=$("#thirdStep-videoOption_testQuestionId").val();
		
		//检查视频时长
		if(!videoOption_lessonTestPublicMethod.checkPositon()){
			$("#thirdstep_videoset_havatime").hide();
			$("#thirdstep_videoset_outtime").show();
			if(_isShow==true){
				var content=$("#thirdstep_videoset_outtime").html();
				videoOption_publicMethod.layer_openMsg(content);
			}
			return false;
		}else{
			$("#thirdstep_videoset_outtime").hide();
		}
		
		//判断走save还是update
		if(videoOption_publicMethod.isEmpty(testQuestionId)){
			
			//检查时间是否存在(save)
			if(!videoOption_lessonTestPublicMethod.checkTimer_isExist(time)){
				
				$("#thirdstep_videoset_outtime").hide();
				$("#thirdstep_videoset_havatime").show();

				if(_isShow==true){
					
					var content=$("#thirdstep_videoset_havatime").html();
					videoOption_publicMethod.layer_openMsg(content);
				}
				return false;
			}else{
				$("#thirdstep_videoset_havatime").hide();
			}
			
		}else{
			
			//检查时间点是否存在、存在的时间是否是该水滴的时间
			if(!videoOption_lessonTestPublicMethod.checkTimer_isExist(time)){
				
				$("#thirdstep_videoset_havatime").show();
				if(_isShow==true){
					
					var content=$("#thirdstep_videoset_havatime").html();
					videoOption_publicMethod.layer_openMsg(content);
				}
				return false;
			}else{
				$("#thirdstep_videoset_havatime").hide();
			}
		}
		return true;
	},
	
	//检查打点的位置
	checkPositon:function(){
		
			var time=videoOption_lessonTestPublicMethod.getTimerSecond();
			var leftPostion=videoOption_lessonTestPublicMethod.getVideoTimerPosition(time);
			
			//视频超出时长
			if(leftPostion > $thirdstep_videoset_videoWidth){
				$("#thirdstep_videoset_havatime").hide();
				$("#thirdstep_videoset_outtime").show();
				return false;
			}
			return true;
	},
	
	//检查题目
	checkQuestion:function(){
		
		var question=videoOption_publicMethod.getContentEditor("thirStep_videoOption_question");
		
		if(question.trim().length ==0){
			return false;
		}
		
		return true;
	},
	
	//检查答案
	
	checkAnswers:function(){
		
		var result=false;
		var answer=$("#thirdstep_videoset_answerInfo .uploadlanguage-div.uploadlanguage-m");
		var length=0;
		
		try {
			answer.each(function(index,answer){
				var flag=$(this).find("input").prop("checked");
				var editorIndex=$(answer).attr("data-index");
				var text=videoOption_publicMethod.getTextEditor("thirdstep_videoOption_answer"+editorIndex);
				
				//至少有两个选项，其中有一个为正确答案
				if(flag ==true && text.trim().length >0){
					result=true;
					length++;
				}else if(flag ==false && text.trim().length >0){
					length++;
				}
				
			});
			
			//提示信息：
			if(length <2){
				
				//至少两个选项
				var content=$("#thirdstep_muchoice_more_two").val();
				videoOption_publicMethod.layer_openMsg(content);
			}else if(length >=2 && result==false){
				
				//至少有一个正确答案
				var content=$("#thirdstep_muchoice_answer").val();
				videoOption_publicMethod.layer_openMsg(content);
			}
			
			if(result ==true && length >=2){
				result =true;
			}else{
				result =false;
			}
		} catch (e) {
			console.log(e);
		}
		
		return result;
	},
	
	//检查选项是否是唯一答案和是否有两个选项
	checkAnswersIsResult:function(checked){
		
		var result=false;
		var resultNum=0;
		var answer=$("#thirdstep_videoset_answerInfo .uploadlanguage-div.uploadlanguage-m");
		var length=0;
		
		answer.each(function(index,answer){
			var flag=$(this).find("input").prop("checked");
			var optionId=$(this).find(".deleteico").attr("data-optionid");

			//至少有一个正确答案
			if(flag ==true && optionId.trim().length >0){
				resultNum++;
				length++;
			}else if(flag ==false && optionId.trim().length >0){
				length++;
			}
			
		});
		
		if(length ==2)return false;
		if(resultNum <=1 && length >=2 && checked ==true){
			result=false;
		}else{
			result=true;
		}

		return result;	
	},
	
	//检查答案解析
	checkExplain:function(){
		
		var explain=videoOption_publicMethod.getContentEditor("thirdstep_videoOption_explain");
		
		if(explain.trim().length ==0){
			return false;
		}
		
		return true;
	},
	
	//获取视频打点数据Demo
	getLessonTestDemo:function(questionId){
		
		var time=videoOption_lessonTestPublicMethod.getTimerSecond();
		var testQuestionId=questionId;
		var lessonId=$("#thirdstep_videoset_lessonId").val();
		var smallLessonId=$("#thirdstep_videoset_lessonVideoId").val();
		
		var dataParm = {
				"time":time,//时间
				"testQuestionId":testQuestionId,//试题id
				"lessonId":lessonId,//节id
				"smallLessonId":smallLessonId //小节id
		};
		
		return dataParm;
	},
	
	//获取当前视频打点时间秒数
	getTimerSecond:function(){
		
		try {
			var timer1=$("#thirStep_videoOption_timer").find(".getFocus.quizinput1").val();
			var timer2=$("#thirStep_videoOption_timer").find(".getFocus.quizinput2").val();
			
			if(videoOption_publicMethod.isEmpty(timer1))timer1="0";
			if(videoOption_publicMethod.isEmpty(timer2))timer2="0";
			timer1=parseInt(timer1);
			timer2=parseInt(timer2);
			
			return parseInt(timer1*60)+parseInt(timer2);
		} catch (e) {
			console.log(e);
			return 0;
		}
	},
	
	//获取视频打点的位置: 时间/总时间*播放器的宽度-小水滴的一半宽度(以中心轴为准)
	getVideoTimerPosition:function(time){
		
		try {
			var videosec=$("#thirdStep-videoSrc").attr("data-videosec");
			var leftPostion=time/videosec*$thirdstep_videoset_videoWidth-($thirdstep_videoset_quizWidth/2);
			
			if(leftPostion <0){
				leftPostion=0;
			}
			
			return leftPostion;
		} catch (e) {
			console.log(e);
			return 0;
		}
	},
	
	//判断打点时间是否存在
	checkTimer_isExist:function(time){
		var testQuestionId=$("#thirdStep-videoOption_testQuestionId").val();
		
		//获取数组中元素的下标
		var index = $.inArray(time,$thirdstep_videoset_timeList);
		
		if(videoOption_publicMethod.isEmpty(testQuestionId)){
			
			//save：index !=-1表示时间点存在
			if(index !=-1){
				return false;
			}
		}else if(!videoOption_publicMethod.isEmpty(testQuestionId)){
			
			//update：index !=-1表示时间点存在 、time !=$thirdstep_videoset_oldTime表示时间不是该水滴的时间
			if(index !=-1 && time !=$thirdstep_videoset_oldTime){
				return false;
			}
		}
		return true;
	},
	
	//试题相关按钮可用
	testQuestionBind_enable:function(){
		
		$("#thirStep_videoOption_timer").find(".getFocus.quizinput1").attr("disabled",false);
		$("#thirStep_videoOption_timer").find(".getFocus.quizinput2").attr("disabled",false);
		
		videoOption_publicMethod.setEnableEditor("thirStep_videoOption_question");
		videoOption_publicMethod.setEnableEditor("thirdstep_videoOption_explain");
		
		videoOption_lessonTestPublicMethod.testQuestionOption_isEnableOrUnEnable(false);
		
		$("#thirdStep-testQuestion-save").attr("disabled",false);
		$("#thirdStep-testQuestion-delete").attr("disabled",false);
	},
	
	//试题相关按钮不可用
	testQuestionBind_unEnable:function(){
		
		$("#thirStep_videoOption_timer").find(".getFocus.quizinput1").attr("disabled",true);
		$("#thirStep_videoOption_timer").find(".getFocus.quizinput2").attr("disabled",true);
		
		videoOption_publicMethod.setDisableEditor("thirdstep_videoOption_explain");
		videoOption_publicMethod.setDisableEditor("thirStep_videoOption_question");
		
		videoOption_lessonTestPublicMethod.testQuestionOption_isEnableOrUnEnable(true);
		
		$("#thirdStep-testQuestion-save").attr("disabled",true);
		$("#thirdStep-testQuestion-delete").attr("disabled",true);
	},
	
	//设置试题选项文本框、复选框、删除按钮是否可用
	testQuestionOption_isEnableOrUnEnable:function(flag){
		
		var answer=$("#thirdstep_videoset_answerInfo .uploadlanguage-div.uploadlanguage-m");
		
		answer.each(function(index,testQuestion){
			$(testQuestion).find("input").attr("disabled",flag);	
			$(testQuestion).find("textarea").attr("disabled",flag);
			$(testQuestion).find("span").attr("disabled",flag);
		});
	}
	
};

/**
 * 视频打点操作
 * 
 * */

var videoOption_lessonTestQuestion={
	
	//根据小节id、节id获取视频打点信息
	getLessTestListInfo:function(){
		
		var lessonId=$("#thirdstep_videoset_lessonId").val();//lessonId
		var smallLessonId=$("#thirdstep_videoset_lessonVideoId").val();//lessonVideoId
		var dataParm = {
				"lessonId":lessonId,//节id
				"smallLessonId":smallLessonId //小节id
			};
		$.ajax({
			type: "post",
		    url: basePath+"/course/thirdStep/lessonTestQuestion/getLessonTestQuestionListInfo",
		    data:dataParm,
//		    cache : false,
		    dataType : 'json',
		    beforeSend:function(){},
		    success: function(data){
		    	
		    	if(data.success==true){
		    		
		    		$("#thirdStep_videoOption_videoDotShow").html("");
		    		videoOption_lessonTestQuestion.loadVideoDot(data);
		    	}
		    },
		    error:function(data){},
		    complete:function(){}
		});
	},
	
	//加载视频打点效果
	loadVideoDot:function(data){
		
		$thirdstep_videoset_timeList=[];
		$.each(data.result, function(index,lessonTest) {
			var videoOptionTime=lessonTest.time;
			var leftValue=videoOption_lessonTestPublicMethod.getVideoTimerPosition(videoOptionTime);
			var str="<span class='question-ico' style='z-index:"+ (index+1) +";left:"+leftValue+"px;' data-index='testQuestionId"+ index +"'>Q"+ index +""+
					"<input type='hidden' data-testQuestionId='"+lessonTest.testQuestionId+"' data-lessonTestQuestionId='"+lessonTest.lessonTestQuestionId+"' data-timer='"+lessonTest.timer+"' data-time='"+lessonTest.time+"'>" +
					"</span>";
			
			$("#thirdStep_videoOption_videoDotShow").append(str);
			
			if(videoOption_lessonTestPublicMethod.checkTimer_isExist(videoOptionTime)){
				
				$thirdstep_videoset_timeList.push(videoOptionTime);
			}
			
		});
		
		//绑定点击事件
		videoOption_lessonTestQuestion.videoOption_bind();
	},
	
	//视频打点小水滴事件绑定
	videoOption_bind:function(){
		
		var lessonTestDemo=$("#thirdStep_videoOption_videoDotShow>span");
		
		try {
			
			lessonTestDemo.each(function(index,lessonTestQuestion){
				
				//对元素进行一次解除绑定
				$(lessonTestQuestion).unbind("click").live("click",function(){ 
	                $(this).siblings().removeClass("selected");
	                $(this).addClass("selected");

					videoOption_lessonTestQuestion.cleanInfo();
					
					var testQuestionId=$(lessonTestQuestion).find("input").data("testquestionid");
					var lessonTestQuestionId=$(lessonTestQuestion).find("input").data("lessontestquestionid");
					var time=$(lessonTestQuestion).find("input").data("time");
					$("#thirdStep-videoOption_testQuestionId").val(testQuestionId);
					$("#thirdStep-videoOption_lessonTestQuestionId").val(lessonTestQuestionId);
					
					//改变播放器的播放进度
					if(time !=null){
						ablePlayerX("thirdStep_videoOption_aspUpload").seek(time);
						videoOption_lessonTestQuestion.loadTimer(time);
					}
					
					$("#thridStep-videoOption_oldTime").val(time);
					videoOption_publicMethod.record();
					
					//加载试题
					videoOption_testQuestion.getQuestionInfo();
				});
				
				
			});
		} catch (e) {
			console.log(e);
		}


        //小水滴 事件start
        var has_drop_overlap_events=$("#thirdStep_videoOption_videoDotShow").data("_drop_overlap_events");

        if(!has_drop_overlap_events){
            var $dotContainer = $("#thirdStep_videoOption_videoDotShow");
            var zindexBase = 10;

            $dotContainer.delegate(".question-ico","mousemove",function (e) {

                var $children = $dotContainer.children();
                var minIdx=$children.length-1;
                var minDis = -1;

                $children.each(function (idx,ele) {
                    if($(ele).hasClass("selected")){
                        $(ele).css("z-index",zindexBase+$children.length);
                        return ;
                    }
                    $(ele).css("z-index",zindexBase+idx);
                });

                //中线算法
                for (var i = 0; i < $children.length; i++) {
                    var $one = $children.eq(i);
                    var midX = $one.offset().left+$one.width()/2;
                    var curDis =  Math.abs(e.pageX-midX);

                    if(minDis < 0){
                        minIdx = i;
                        minDis = curDis;
                        continue;
                    }

                    if(curDis<minDis){
                        minIdx = i;
                        minDis = curDis;
                    }
                }
                console.log('calc rs:'+minIdx);
                $dotContainer.children().eq(minIdx).css("z-index",zindexBase+$children.length+100);
            });

            $dotContainer.delegate(".question-ico","mouseout",function (e) {
             
                var $dotContainer = $("#thirdStep_videoOption_videoDotShow");
                var $children = $dotContainer.children();
                var isMouseInDrop=false;
                
                for (var i = 0; i < $children.length; i++) {
                    var $obj = $children.eq(i);
                    if(e.pageX>=$obj.offset().left&&e.pageX<=$obj.offset().left+$obj.width()){
                        if(e.pageY>=$obj.offset().top&&e.pageY<=$obj.offset().top+$obj.height()){
                            isMouseInDrop=true;
                        }
                    }
                }
                console.log("isMouseInDrop:"+isMouseInDrop);
                if(isMouseInDrop){
                    return;
                }

                $children.each(function (idx,ele) {
                    if($(ele).hasClass("selected")){
                        return ;
                    }
                    $(ele).css("z-index",zindexBase+idx);
                });
                $children.filter(".selected").css("z-index",zindexBase+$children.length);
            });

            $("#thirdStep_videoOption_videoDotShow").data("_drop_overlap_events",true);
        }

        //小水滴 事件end

	},
	
	//根据id获取视频打点对象
	getLessTestInfoById:function(){
		
		var lessonTestQuestionId=$("#thirdStep-videoOption_lessonTestQuestionId").val();
		var dataParm = {
				"lessonTestQuestionId":lessonTestQuestionId//id
			};
		
		$.ajax({
			type: "post",
		    url: basePath+"/course/thirdStep/lessonTestQuestion/getLessonTestQuestionInfo",
		    data:dataParm,
//		    cache : false,
		    dataType : 'json',
		    beforeSend:function(){},
		    success: function(data){
		    	if(data.success==true){
		    		
		    		//加载打点时间
		    		videoOption_lessonTestQuestion.loadTimer(data);
		    	}
		    },
		    error:function(data){},
		    complete:function(){}
		});
	},
	
	//加载视频弹题时间
	loadTimer:function(time){
		if(time==0){
			$("#thirStep_videoOption_timer").find(".getFocus.quizinput1").val("00");
			$("#thirStep_videoOption_timer").find(".getFocus.quizinput2").val("00");
		}else if(!videoOption_publicMethod.isEmpty(time)){
			var m=parseInt(time/60);
			var s=time%60;
			if(m<10)m="0"+m;
			if(s<10)s="0"+s;
			$("#thirStep_videoOption_timer").find(".getFocus.quizinput1").val(m);
			$("#thirStep_videoOption_timer").find(".getFocus.quizinput2").val(s);
		}
		
	},
	
	//添加视频打点效果
	saveLessTestInfo:function(questionId){
		var dataParm=videoOption_lessonTestPublicMethod.getLessonTestDemo(questionId);
		
		$.ajax({
			type: "post",
		    url: basePath+"/course/thirdStep/lessonTestQuestion/save",
		    data:dataParm,
//		    cache : false,
		    dataType : 'json',
		    beforeSend:function(){},
		    success: function(data){
		    	if(data.success==true){
		    		
		    		try {
		    			videoOption_lessonTestQuestion.cleanInfo();
			    		videoOption_testQuestion.loadTestQuestionAnswerList();
			    		videoOption_lessonTestQuestion.getLessTestListInfo();//重新加载数据
			    		//videoOption_publicMethod.layer_msg("保存试题成功！");
					} catch (e) {
						console.log(e);
					}
		    	}
		    },
		    error:function(data){},
		    complete:function(){}
		});
		
	},
	
	//视频打点时间失焦操作事件
	timerBlur:function(){
		if(videoOption_lessonTestPublicMethod.checkTimerIsTrue(false)){
			
			var testQuestionId=$("#thirdStep-videoOption_testQuestionId").val();
			if(!videoOption_publicMethod.isEmpty(testQuestionId)){
				var time=videoOption_lessonTestPublicMethod.getTimerSecond();
				
				//如果时间不变，不做修改
				if($thirdstep_videoset_time!=time){
					videoOption_lessonTestQuestion.updateLessonTestInfo();
				}			
			}
			
		}
	},
	
	//改变视频打点的位置
	changeTimerPostion:function(){
		
		var selected=$("#thirdStep_videoOption_videoDotShow>.question-ico.selected");
		var time=videoOption_lessonTestPublicMethod.getTimerSecond();
		var leftPostion=videoOption_lessonTestPublicMethod.getVideoTimerPosition(time);
		selected.css("left",leftPostion);
	},
	
	//修改视频打点时间
	updateLessonTestInfo:function(){
		
		var lessonTestQuestionId=$("#thirdStep-videoOption_lessonTestQuestionId").val();//视频弹题关联id
		var time=videoOption_lessonTestPublicMethod.getTimerSecond();
		var dataParm = {
				"lessonTestQuestionId":lessonTestQuestionId,
				"time":time
		};
		
		$.ajax({
			type: "post",
		    url: basePath+"/course/thirdStep/lessonTestQuestion/update",
		    data:dataParm,
//		    cache : false,
		    dataType : 'json',
		    beforeSend:function(){},
		    success: function(data){
		    	if(data.success==true){
		    		
		    		//修改数组中的time
		    		try {
		    			videoOption_lessonTestQuestion.getLessTestListInfo();
			    		var nowTime=videoOption_lessonTestPublicMethod.getTimerSecond();
			    		$("#thridStep-videoOption_oldTime").val(nowTime);
			    		videoOption_publicMethod.record();
					} catch (e) {
						console.log(e);
					}
		    		
		    	}
		    },
		    error:function(data){},
		    complete:function(){}
		});
	},
	
	//清空视频打点表单数据
	cleanInfo:function(){
		
		$("#thirStep_videoOption_timer").find(".getFocus.quizinput1").val("");//timer
		$("#thirStep_videoOption_timer").find(".getFocus.quizinput2").val("");//timer
		$("#thirdstep_videoset_outtime").hide();
		$("#thirdstep_videoset_havatime").hide();
		videoOption_publicMethod.setContentEditor("thirStep_videoOption_question","");
		videoOption_publicMethod.setContentEditor("thirdstep_videoOption_explain","");
		$("#thirdStep-videoOption_testQuestionId").val("");//testQuestionId
		$("#thirdStep-videoOption_lessonTestQuestionId").val("");//lessonTestQuestionId
		$("#thridStep-videoOption_oldTime").val("");
		$("#thirdstep_videoset_answerInfo .uploadlanguage-div.uploadlanguage-m").each(function(index,answer){
			//answer
			if(index ==0){
				$(answer).find("input").prop("checked",true);
			}else {
				$(answer).find("input").prop("checked",false);
			}
			var editorName=$(answer).find(".thirstep_videoOption_editor").attr("id");
			videoOption_publicMethod.setContentEditor(editorName,"");
		});
		
	},
	
	//删除视频弹题信息
	removeLessonTestInfo:function(){
		
		var lessonTestQuestionId=$("#thirdStep-videoOption_lessonTestQuestionId").val();//视频弹题关联id
		if(videoOption_publicMethod.isEmpty(lessonTestQuestionId)){
			videoOption_lessonTestQuestion.cleanInfo();
			return;
		}
		var dataParm = {
				"lessonTestQuestionId":lessonTestQuestionId
		};
		$.ajax({
			type: "post",
		    url: basePath+"/course/thirdStep/lessonTestQuestion/remove",
		    data:dataParm,
//		    cache : false,
		    dataType : 'json',
		    beforeSend:function(){},
		    success: function(data){
		    	if(data.success==true){
		    		
		    		try {
		    			videoOption_lessonTestQuestion.cleanInfo();
			    		videoOption_testQuestion.loadTestQuestionAnswerList();
			    		videoOption_lessonTestQuestion.getLessTestListInfo();//重新加载数据
					} catch (e) {
						console.log(e);
					}
		    	}
		    },
		    error:function(data){},
		    complete:function(){}
		});
		
	},
};

/**
 * 试题选项操作
 * 
 * */

var videoOption_testQuestion={
		
	//选项删除按钮绑定(异步操作)
	deleteTestQuestionOptionBind:function(){
		
		var deleteOptions=$("#thirdstep_videoset_answerInfo .uploadlanguage-div.uploadlanguage-m .deleteico");
		deleteOptions.each(function(index,testQuestion){
			
			$(testQuestion).unbind("click").live("click",function(){
				
				var optionId=$(testQuestion).data("optionid");
				var editorName=$(testQuestion).prev().attr("id");
				var editorIndex=$(testQuestion).parent().attr("data-index");
				console.log(editorName+"==index:"+editorIndex);
				
				//如果optionId不为空删除选项，为空移除页面显示
				if(!videoOption_publicMethod.isEmpty(optionId)){
					var checked=false;
					var flag=$(testQuestion).parent().find("input").prop("checked");
					var text=videoOption_publicMethod.getTextEditor(editorName);
					if(flag ==true && text.trim().length >0){
						checked=true;
					}

					if(videoOption_lessonTestPublicMethod.checkAnswersIsResult(checked)){
						
						videoOption_testQuestion.removeQuestionInfoById(optionId);
						videoOption_publicMethod.deleteEditor(editorName);
						$(testQuestion).parent().remove();
					}else{
						var content=$("#thirdStep_videoset_checkAnswer").val();
						videoOption_publicMethod.layer_openMsg(content);
					}
				
				}else{
					var length=$('#thirdstep_videoset_answerInfo').children('.uploadlanguage-div.uploadlanguage-m').length;
					if(length <=2){
						return;
					}
					 videoOption_publicMethod.deleteEditor(editorName);
					 $(testQuestion).parent().remove();
				}
				

			})
			
		});
	},
	
	//删除选项按钮绑定(同步操作)
	deleteOptionsBind:function(){
		
		var deleteOptions=$("#thirdstep_videoset_answerInfo .uploadlanguage-div.uploadlanguage-m .deleteico");
		deleteOptions.each(function(index,testQuestion){
			
			$(testQuestion).unbind("click").live("click",function(){
				
				var optionId=$(testQuestion).data("optionid");
				var editorName=$(testQuestion).prev().attr("id");
				var editorIndex=$(testQuestion).parent().attr("data-index");
				
				//如果optionId不为空删除选项，为空移除页面显示
				if(!videoOption_publicMethod.isEmpty(optionId)){
					
					var index = $.inArray(optionId,$thirdstep_videoset_deleteOptionList);
					if(index ==-1){
						$thirdstep_videoset_deleteOptionList.push(optionId);
					}
				}
				videoOption_publicMethod.deleteEditor(editorName);
				$(testQuestion).parent().remove();
			
			})
			
		});
	},
	
	//清除选项模板内容
	cleanOptionDemo:function(){
		
		var $testQuestion=$("#thirdstep_videoset_answerModel");
		$testQuestion.find("input").attr("checked",false);
		$testQuestion.find(" .uploadlanguage-div.uploadlanguage-m").attr("data-index","");
		$testQuestion.find(".uploadlanguage-div .deleteico").attr("data-optionId","");
		$testQuestion.find("textarea").html("");
	},
	
	//加载默认试题选项(4个)
	loadTestQuestionAnswerList:function(flag){
		
		var $answerInfo=$("#thirdstep_videoset_answerInfo");
		$answerInfo.html("");
		for(var i=0;i<=3;i++){
			videoOption_testQuestion.loadTestQuestionAnswer(i);
		}
		
		//加载试题删除按钮绑定
		if(flag!="false"){
			videoOption_testQuestion.deleteOptionsBind();
		}
		
	},
	
	//加载试题选项(单个)
	loadTestQuestionAnswer:function(i){
		
		videoOption_testQuestion.cleanOptionDemo();
		var $testQuestion=$("#thirdstep_videoset_answerModel");
		var $answerInfo=$("#thirdstep_videoset_answerInfo");
		if(i==0){
			$testQuestion.find("input").attr("checked",true);
		}else{
			$testQuestion.find("input").attr("checked",false);
		}
		$testQuestion.find(" .uploadlanguage-div.uploadlanguage-m").attr("data-index",i);
		$testQuestion.find(" .uploadlanguage-div.uploadlanguage-m div").attr("id","thirdstep_videoOption_answer"+i);
		$answerInfo.append($testQuestion.html());
		videoOption_publicMethod.loadEditor("thirdstep_videoOption_answer"+i, "yes");
	},
	
	
	//获取试题Demo(save)
	getQuestionDemoToSave:function(){
		var chapterId=$("#thirdstep_videoset_chapterId").val();
		var question=videoOption_publicMethod.getContentEditor("thirStep_videoOption_question");
		var optionList=[];
		var answerInfo=$("#thirdstep_videoset_answerInfo .uploadlanguage-div.uploadlanguage-m");
		
		answerInfo.each(function(index,testQuestion){
			var flag=$(testQuestion).find("input").prop("checked");
			var editorName=$(testQuestion).find(".thirstep_videoOption_editor").attr("id");
			console.log(editorName);
			
			var content=videoOption_publicMethod.getContentEditor(editorName);
			var contentTxt=videoOption_publicMethod.getTextEditor(editorName);
			
			//至少有一个正确答案
			if(flag ==true && contentTxt.trim().length >0){
				var option={"content":content,"isResult":true,"sort":++index};
				optionList.push(option);
			}else if(flag ==false && contentTxt.trim().length >0){
				var option={"content":content,"isResult":false,"sort":++index};
				optionList.push(option);
			}
		});
		
		var explain=videoOption_publicMethod.getContentEditor("thirdstep_videoOption_explain");
		var dataParm = {
				"upQuestions":"yes",
				"courseId":$("#courseId").val(),
				"type":2,//2.选择题3.填空
				"name":question,
				"optionListString":JSON.stringify(optionList)+"",//选项
				"explain":explain
		};
		return dataParm;
		
	},
	
	//获取试题Demo(update)
	getQuestionDemoToUpdate:function(){
		
		var testQuestionId=$("#thirdStep-videoOption_testQuestionId").val();
		var optionListString=[];//选项
		var question=videoOption_publicMethod.getContentEditor("thirStep_videoOption_question");
		var explain=videoOption_publicMethod.getContentEditor("thirdstep_videoOption_explain");
		var answerInfo=$("#thirdstep_videoset_answerInfo .uploadlanguage-div.uploadlanguage-m");
		
		answerInfo.each(function(index,testQuestion){
			var optionId=$(testQuestion).find("span").data("optionid");
			var flag=$(testQuestion).find("input").prop("checked");
			var editorName=$(testQuestion).find(".thirstep_videoOption_editor").attr("id");
			console.log(editorName);

			var content=videoOption_publicMethod.getContentEditor(editorName);
			var contentTxt=videoOption_publicMethod.getTextEditor(editorName);
			var index=$(testQuestion).data("index");
			
			//至少有一个正确答案
			if(contentTxt.trim().length >0){
				var option={"id":optionId,"content":content,"isResult":flag,"sort":++index};
				optionListString.push(option);
			}
			
		});
		
			if(optionListString.length>=1){
				optionListString=JSON.stringify(optionListString);
			}else{
				optionListString="";
			} 

		var dataParm = {
				"courseId":$("#courseId").val(),
				"isDel":"1",//是否为删除选项 0代表删除
				"type":2,//2.选择题3.填空
				"id":testQuestionId,
				"name":question,
				"optionListString":optionListString,//选项
				"explain":explain
		};
		return dataParm;
		
	},
	
	//判断试题走save还是走update
	isSaveOrUpdate:function(){
		
		//检查弹题信息完整性
		if(videoOption_lessonTestPublicMethod.checkLessonTestInfo()){

			try {
				var testQuestionId= $("#thirdStep-videoOption_testQuestionId").val();
				
				//存在试题id跟关联id走update
				if(!videoOption_publicMethod.isEmpty(testQuestionId)){
					
					//删除选项
					if($thirdstep_videoset_deleteOptionList.length >0){
						videoOption_testQuestion.removeOptions();
					}
					
					//修改试题
					videoOption_testQuestion.updateQuestionInfoById();
					
				}else {
					videoOption_testQuestion.saveQuestionInfo();
				}
			} catch (e) {
				console.log(e);
			}
		}
		
	},
	
	
	//根据试题id获取试题和选项信息
	getQuestionInfo:function(questionId){
		
		var questionId=$("#thirdStep-videoOption_testQuestionId").val();
		var dataParm = {
				"questionId":questionId
		};
		
		$.ajax({
			type: "post",
		    url: basePath+"/course/thirdStep/StepQuiz/getQuestion",
		    data:dataParm,
		    async:false,
		    timeout:5000,
		    cache : false,
		    dataType : 'json',
		    beforeSend:function(){},
		    success: function(data){
		    	if(!videoOption_publicMethod.isEmpty(data)){
		    		
		    		videoOption_testQuestion.loadQuestionInfo(data);
		    	}
		    },
		    error:function(data){},
		    complete:function(){}
		});
		
	},
	
	
	//加载试题信息
	loadQuestionInfo:function(data){
		
		$("#thirdStep-videoOption_testQuestionId").val(data.id);
		//设置百度编辑器的值
		videoOption_publicMethod.setContentEditor("thirStep_videoOption_question", data.name);
		videoOption_testQuestion.setQuestionanswerInfo(data);
		
		if(!videoOption_publicMethod.isEmpty(data.explain)){
			videoOption_publicMethod.setContentEditor("thirdstep_videoOption_explain", data.explain);
		}
	},
	
	
	//组装试题答案
	setQuestionanswerInfo:function(data){
		var $testQuestion=$("#thirdstep_videoset_answerModel");
		var $answerInfo=$("#thirdstep_videoset_answerInfo");
		$answerInfo.html("");
		$thirdstep_videoset_deleteOptionList=[];
		$.each(data.optionList,function(index,answer){
			
			$testQuestion.find("input").attr("checked",answer.isResult); 
			$testQuestion.find(".uploadlanguage-div").attr("data-index",index);
			$testQuestion.find(".uploadlanguage-div .deleteico").attr("data-optionId",answer.id);
			$testQuestion.find(".uploadlanguage-div.uploadlanguage-m div").attr("id","thirdstep_videoOption_answer"+index);
			
			$answerInfo.append($testQuestion.html());
			videoOption_publicMethod.loadEditor("thirdstep_videoOption_answer"+index, "yes");
			videoOption_publicMethod.setContentEditor("thirdstep_videoOption_answer"+index, answer.content);
		});
		
		//试题删除按钮绑定
		videoOption_testQuestion.deleteOptionsBind();
		videoOption_testQuestion.cleanOptionDemo();
	},
	
	
	//保存试题
	saveQuestionInfo:function(){
		
		var dataParm =videoOption_testQuestion.getQuestionDemoToSave();
		$.ajax({
			type: "post",
		    url: basePath+"/course/thirdStep/StepQuiz/saveQuestion",
		    data:dataParm,
//		    cache : false,
		    dataType : 'json',
		    beforeSend:function(){},
		    success: function(data){
		    	if(data.success==true){
		    		
		    		try {
		    			videoOption_lessonTestQuestion.saveLessTestInfo(data.result.questionid);
					} catch (e) {
						console.log(e);
					}
		    	}
		    },
		    error:function(data){},
		    complete:function(){}
		});
		
	},
	
	//删除多个选项
	removeOptions:function(){
		
		try {
			$.each($thirdstep_videoset_deleteOptionList,function(index,optionId){
				
				if(!videoOption_publicMethod.isEmpty(optionId)){
					
					var dataParm = {
							"isDel":"0",
							"optionId":optionId,
							"type":2
					};
					
					videoOption_testQuestion.removeQuestionInfoById(dataParm);
				}
			});
		} catch (e) {
			console.log(e);
		}
	},
	
	//删除单个选项选项
	removeQuestionInfoById:function(dataParm){

			$.ajax({
				type: "post",
			    url: basePath+"/course/thirdStep/StepQuiz/updateQuestion",
			    data:dataParm,
//			    cache : false,
			    dataType : 'json',
			    beforeSend:function(){},
			    success: function(data){

			    	videoOption_lessonTestQuestion.getLessTestListInfo();
			    },
			    error:function(data){},
			    complete:function(){}
			});
	},
	
	//修改试题和选项
	updateQuestionInfoById:function(){
		
		var dataParm=videoOption_testQuestion.getQuestionDemoToUpdate();
	
		$.ajax({
			type: "post",
		    url: basePath+"/course/thirdStep/StepQuiz/updateQuestion",
		    data:dataParm,
//		    cache : false,
		    dataType : 'json',
		    beforeSend:function(){},
		    success: function(data){
		    	videoOption_lessonTestQuestion.cleanInfo();
		    	videoOption_testQuestion.loadTestQuestionAnswerList();
		    },
		    error:function(data){},
		    complete:function(){}
		});
	},
};
