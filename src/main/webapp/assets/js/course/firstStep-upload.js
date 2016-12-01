var imgIndex;
var _debug;
$(function() {
	// 单张图片上传
	uploadCourseImage();
	//初始化公共图片上传组件
	initUploader();
	uploadPromoVideo();
	$("#uploadCourseImage1").bind("click",function(){
		uploadCourseImage();
	});
});

// 单张图片上传 ---上传图片课程
function uploadCourseImage() {
	// 判断当前是否已经上传过图片
	var courseImg = $("#course_Image").val();
	var btnCss = "singlePhoto uploadBtn_courseTitle";
	var number = "";
	if (courseImg != "") {
		btnCss = "singlePhoto setedit_editico";
		number = "1";
	}
	
	$('#uploadCourseImage').Ableuploader(
			{
			appName : "createcourse",// 对应应用名称
			modelName : "course",// 可不写，按文件类型命名，视频为video、图片为image、其他文件为file
			userId : "42", // 填写用户ID
			userName : "test",
			fileType : "image", // 上传文件类型三类： image; video; file;
			smallImgSize : "100:100", //图片或者视频的三种裁图大小
			bigImgSize : "730:410",
			middleImgSize : "260:250",
			autoConvert : "true", // true为自动转换，false或者不配置为不自动转换(上传里需要自带文档转换,Flex上传不需要自带转换.)
			vIsUploadLetv : "true", // 是否将视频上传到乐视
			targetId : "uploadCourseImage",// 为按钮目标标签ID
			showProgress : "true", // 是否显示任务栏进度条
			buttonWidth : "223",
			buttonHeight : "125",// IE789下设置此按钮高度生效
			buttonText : "",
			z_language : z_locale,//上传进度国际化 1.中文 2.英文
			buttonClass : "",
			allowSuffix : limit_img_suffix,// 限制文件上传类型
			videoConvert : "true",
			host : "http://base1.zhihuishu.com/able-commons/",
			callbacks : {
				onFileDialogStart : function(tid) {
					
				},
				onError : function(id, fileName, reason) {
				},
				onUpload : function(id, fileName) {
					
				},
				// 回调函数
				onComplete : function(id, fileName, responseJSON) {
					if (responseJSON != '') {
						
						var fileData = responseJSON.data;
						var fileUrl = fileData.filePath;
						
						$("#course_Image").val(fileUrl);
						$(".singlePhoto>img").attr("src",fileData.filePath);
						if (btnCss == "singlePhoto uploadBtn_courseTitle") {
							
							// 上传成功改变上传的Css样式
							$(".singlePhoto>img").attr("src",fileData.filePath);
							$(".singlePhoto>img").addClass("layerImageShow");
		    	    		$(".singlePhoto>img").show();
		    	    		
		    	    		$("#_uploadCourseImageDiv").removeClass("uploadBtn_courseTitle");
		    	    		$("#_uploadCourseImageDiv").addClass("setedit_editico");
							
							//图片弹窗绑定
							//public_ImageShow();
								
						}
						
						$("#tit-p-courseimg").prev().remove();
						$("#tit-p-courseimg").before('<span class="rightico"></span>');
						var value= $("#courseId").val();
						if(number ==""){
							 $.ajax({
								 type:"post",
								 url:basePath+"/course/cleanTreeRedis",
					 			 data:{"courseId" : value},
				 			      dataType:'json',
				 			      success:function(data){
				 			      	
				 			    }
							 })							
						}
						updateCourse("img",fileData.filePath);//完成之后 修改
					}
					
				}
			}
		});
}


//初始化图片上传按钮
function initUploader(){
	var arr=[];
	$(".manyPhoto .setedit_editico>span").each(function(){
		
		if(typeof($(this).attr("id"))!='undefined'){
			arr.push($(this).attr("id"));
		}
	});
	for (var num = 0; num < arr.length; num++) {
		var key=arr[num];
		var btnCss="manyPhoto setedit_editico";
		public_courseInstructor_aspUpload(key,btnCss);
	}
	
	loadAspUpload();
};

//初始化单个上传组件
function loadAspUpload(){
	
	var arr=[];
	$(".manyPhoto .uploadBtn_courseInstructor>span").each(function(){	
		if(typeof($(this).attr("id"))!='undefined'){
			arr.push($(this).attr("id"));
		}
	});
	console.log(arr);
	for (var num = 0; num < arr.length; num++) {
		var key=arr[num];
		var btnCss="manyPhoto uploadBtn_courseInstructor";
		public_courseInstructor_aspUpload(key,btnCss);
	};
	
};



/**
 * 上传教学团队
 */

function public_courseInstructor_aspUpload(key,btnCss) {
	$('#'+key).Ableuploader({
			appName : "createcourse",// 对应应用名称
			modelName : "course",// 可不写，按文件类型命名，视频为video、图片为image、其他文件为file
			userId : "42", // 填写用户ID
			userName : "test",
			fileType : "image", // 上传文件类型三类： image; video; file;
			smallImgSize : "100:100", //图片或者视频的三种裁图大小
			bigImgSize : "115:141",
			middleImgSize : "260:250",
			autoConvert : "true", // true为自动转换，false或者不配置为不自动转换(上传里需要自带文档转换,Flex上传不需要自带转换.)
			vIsUploadLetv : "true", // 是否将视频上传到乐视
			targetId : key, // 为按钮目标标签ID
			showProgress : "true", // 是否显示任务栏进度条
			multipleUpload : "false",
			buttonWidth : "115",
			buttonHeight : "141",// IE789下设置此按钮高度生效
			buttonText : "",
			z_language : z_locale,//上传进度国际化 1.中文 2.英文
			buttonClass : "",
			allowSuffix : limit_img_suffix,// 限制文件上传类型
			videoConvert : "true",
			host : "http://base1.zhihuishu.com/able-commons/",
			callbacks : {
				onFileDialogStart : function(tid) {
					
				},
				onError : function(id, fileName, reason) {
	
				},
				// 上传函数
				onUpload : function(id, fileName) {
	
				},
				// 回调函数
				onComplete : function(id, fileName, responseJSON) {
					if (responseJSON != '') {
						var data = responseJSON.data;
						var id = key.split("-");
						//新增图片改变样式
						if(btnCss="manyPhoto uploadBtn_courseInstructor"){
							$("#firstStep_courseInstructorImg-"+id[1]).attr("src",data.filePath);
							$("#firstStep_courseInstructorImg-"+id[1]).show();
							$("#courseInstructorImgsDiv-"+id[1]).removeClass("uploadBtn_courseInstructor");
							$("#courseInstructorImgsDiv-"+id[1]).addClass("setedit_editico");
							//图片弹窗绑定
							//public_ImageShow();
						}
						
						addUpdateCourseInstructor(id[1]);
						
					}
					searchInstructorFull(httpInstructorEN,httpInstructorZH);
				}
			}
	});
}

// 上传课程片花
function uploadPromoVideo(){
	// 判断当前是否已经上传过视频
	var videoId = $("#videoSrc").val();
	var videoImg= $("#videoSrc").attr("src");
	var btnCss = "uploadPromo-div uploadBtn_promoVideo";
	if (videoId != "" && videoImg !="") {
		btnCss = "uploadPromo-div setedit_editico";
	}
	//alert(courseImg);
	$('#uploadPromoVideo').Ableuploader(
			{
			appName : "createcourse",// 对应应用名称
			modelName : "course",// 可不写，按文件类型命名，视频为video、图片为image、其他文件为file
			userId : "42", // 填写用户ID
			userName : "test",
			fileType : "image", // 上传文件类型三类： image; video; file;
			smallImgSize : "100:100", //图片或者视频的三种裁图大小
			bigImgSize : "223:125",
			middleImgSize : "260:250",
			autoConvert : "true", // true为自动转换，false或者不配置为不自动转换(上传里需要自带文档转换,Flex上传不需要自带转换.)
			vIsUploadLetv : "true", // 是否将视频上传到乐视
			targetId : "uploadPromoVideo", // 为按钮目标标签ID
			showProgress : "true", // 是否显示任务栏进度条
			buttonWidth : "223",
			buttonHeight : "125",// IE789下设置此按钮高度生效
			buttonText : "",
			fileSizeLimit : "1073741824",//上传视频大小限制，单位B(1kb=1024b)
			z_language : z_locale,//上传进度国际化 1.中文 2.英文
			buttonClass : "",
			allowSuffix : limit_video_suffix,// 限制文件上传类型
			videoConvert : "true",
			host : "http://base1.zhihuishu.com/able-commons/",
			callbacks : {
				onFileDialogStart : function(tid) {
				},
				onError : function(id, fileName, reason) {
				},
				onUpload : function(id, fileName) {
				},
				// 回调函数
				onComplete : function(id, fileName, responseJSON) {
					if (responseJSON != '') {
						var fileData = responseJSON.data;
						var fileUrl = fileData.filePath;
						var ids=fileData.videoId;
						//手动转码
						if(_debug==true){
						   window.open("http://base1.zhihuishu.com/able-commons//resources/cdn/ableplayer/2.0/demo.html?id="+ids);
						}
						
						$("#videoSrc").val(ids);
						$("#videoSrc").attr("src",fileUrl);
						
						//上传之后默认视频转码中图片
						$("#uploadPromoVideo-div #PromoVideo>img").attr("src",promoVideoImg);
						$("#uploadPromoVideo-div #PromoVideo>img").show();
						$("#uploadPromoVideo-div #PromoVideo>.message").show();
	    	    		$("#uploadPromoVideo-div #PromoVideo>.imageIcon").hide();

						if (btnCss == "uploadPromo-div uploadBtn_promoVideo") {
							// 上传成功改变上传的Css样式
		    	    	
		    	    		$("#uploadBtn_promoVideo-Div").removeClass("uploadBtn_promoVideo");
		    	    		$("#uploadBtn_promoVideo-Div").addClass("setedit_editico");
							
							$("#tit-p-pianhua").prev().remove();
							$("#tit-p-pianhua").before('<span class="rightico"></span>');
							
							
							var value= $("#courseId").val();
								 $.ajax({
									 type:"post",
									 url:basePath+"/course/cleanTreeRedis",
						 			 data:{"courseId" : value},
					 			      dataType:'json',
					 			      success:function(data){
					 			    		
					 			    }
								 });						
							uploadPromoVideo();
						}

						uploadClips(ids,fileUrl);
						
					}
					
				}
			}
		});
}

//上传片花  ids是videoid  filePath 是上传的路径
function uploadClips(ids,filePath){
	var value = $("#linkCourseId").val();
	if(value !=""){//修改
		$.ajax({
			type: "post",
		    url: basePath+"/course/firstStep/updateClips",
		    data:{
		    	"clipsId" : $("#linkCourseId").val(),
		    	"videoId" : ids,
		    	"videoPath" : filePath,
		    	},
		    dataType : 'json',	
		    beforeSend:function(){},
		    success: function(data){
		    	if(data!=null){
		    		if(data.videoImage == "" || data.videoImage == null){
		    			$("#PromoVideo-id").attr("src",promoVideoImg);
	    			} else {
	    				$("#PromoVideo-id").attr("src",data.videoImage);
	    			}
	    			$("#PromoVideo").addClass("uploadPromo-div PromoVideo");
	    			videoInit();
		    	}
		    },
		    error:function(data){},
		    complete:function(){}
		});
	} else{//走上传
		$.ajax({
			type: "post",
		    url: basePath+"/course/firstStep/saveUpdateCourese",
		    data:{
		    	"courseId" : $("#courseId").val(),
		    	"ids" : ids,
		    	"videoPath" : filePath,
		    	},
		    dataType : 'json',	
		    beforeSend:function(){},
		    success: function(data){
		    	if(data!=null){
		    		if(data.dto != null && data.dto != ""){
		    			$("#linkCourseId").val(data.dto.clipsId);
		    			if(data.dto.videoImage == "" || data.dto.videoImage == null){
			    			$("#PromoVideo-id").attr("src",promoVideoImg);
		    			} else {
		    				$("#PromoVideo-id").attr("src",data.dto.videoImage);
		    			}
		    			$("#PromoVideo").addClass("uploadPromo-div PromoVideo");
		    			videoInit();
		    		}
		    	}
		    },
		    error:function(data){},
		    complete:function(){}
		});
	}
}

