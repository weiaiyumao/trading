$(function(){
	initUploader();
})

var limit_data_suffix = 'doc|docx|jpg|txt|xlsx|xls|word|png|gif';
function initUploader(){	
	var arr=[];
	$(".refer-add-btn.transition-all").each(function(){	
		if(typeof($(this).attr("id"))!='undefined'){
			arr.push($(this).attr("id"));
	}
	});
	
	for (var num = 0; num < arr.length; num++) {
		var keA=arr[num];
		var key= keA.split('-')[3];
		   addRefer(key);
	}
}
//上传附件
function addRefer(index){
	  //var btnCss = "refer-add-btn transition-all public-icon-bg";
     $("#refer-add-btn-"+index).Ableuploader(
		{
		appName : "createcourse",// 对应应用名称
		modelName : "course",// 可不写，按文件类型命名，视频为video、图片为image、其他文件为file
		userId : "42", // 填写用户ID
		userName : "test",
		fileType : "file", // 上传文件类型三类： image; video; file;
		smallImgSize : "100:100", //图片或者视频的三种裁图大小
		bigImgSize : "223:125",
		middleImgSize : "260:250",
		autoConvert : "true", // true为自动转换，false或者不配置为不自动转换(上传里需要自带文档转换,Flex上传不需要自带转换.)
		vIsUploadLetv : "true", // 是否将视频上传到乐视
		targetId : "", // 为按钮目标标签ID
		showProgress : "true", // 是否显示任务栏进度条
		buttonWidth : "223",
		buttonHeight : "125",// IE789下设置此按钮高度生效
		buttonText : "Add affer",
		fileSizeLimit : "1073741824",//上传视频大小限制，单位B(1kb=1024b)
		z_language : z_locale,//上传进度国际化 1.中文 2.英文
		buttonClass : "",
		allowSuffix : limit_data_suffix,// 限制文件上传类型
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
				var data = responseJSON.data;
				if(data.size != null && data.size !=undefined && data.size !='')
					{
					documentConversion(data,index);
				}
			}
		}
	});
}
function documentConversion(fileData,index){
	var documentName = fileData.fileName;
	var path = fileData.filePath;
	var fileSize = fileData.size;
	var suffix = fileData.suffix;	
	$.ajax({
		type:"post",
		url:basePath+"/course/thirdStep/saveCourseData",
		dataType:'json',
		data:{"url":path,"size":fileSize,"suffix":suffix,"name":documentName,"dataId":index},
	    beforeSend:function(){
	    },
	    success:function(data){
	    	var par = numberToFixed(data.courseData.size);
    	   div  ='<div class="discussion-refer-item clearfix" id="item-refer-discussion'+data.courseData.id+'">';
    	   div +='<em class="refer-icon public-icon-bg fl" id="refer-icon'+data.courseData.id+'"></em>';
    	   div +='<span class="refer-title fl" id="refer-title fl'+data.courseData.id+'">'+data.courseData.name+'('+par+'kb)</span>';
    	   div +='<span class="refer-del-btn" id="refer-del-btn'+data.courseData.id+'" onclick="deletecourseData('+data.courseData.id+');"><em class="public-icon-bg" id="public-icon-bg'+data.courseData.id+'"></em></span>';
    	   div +='</div>';
	    	if($("#discussion-refer-item"+index).find(".discussion-refer-item.clearfix").size()==0){
		    	   $("#discussion-refer-item"+index).append(div);
	    	}else{
	    		$("#discussion-refer-item"+index).find(".discussion-refer-item.clearfix").last().after(div);
	    	}
	    },
	    error:function(){}
	    
	})
}
function selectCourseData(bbsd,inde){
	 $.ajax({
		 type:"post",
		 url:basePath+"/course/thirdStep/selectCourseDatas",
		 dataType:'json',
		 data:{"postId":bbsd},
		 beforeSend:function(){},
		 success:function(data){
			    if(data.courseDataOpenDtos !=null && data.courseDataOpenDtos !=''){
			    	 $.each(data.courseDataOpenDtos,function(index,courseDataOpenDto){			    		
			    		 index++;
			    	   var par = numberToFixed(courseDataOpenDto.size);
			    	   div  ='<div class="discussion-refer-item clearfix" id="item-refer-discussion'+courseDataOpenDto.id+'">';
			    	   div +='<em class="refer-icon public-icon-bg fl" id="refer-icon'+courseDataOpenDto.id+'"></em>';
			    	   div +='<span class="refer-title fl" id="refer-title fl'+courseDataOpenDto.id+'">'+courseDataOpenDto.name+'('+par+'kb)</span>';
			    	   div +='<span class="refer-del-btn" id="refer-del-btn'+courseDataOpenDto.id+'" onclick="deletecourseData('+courseDataOpenDto.id+');"><em class="public-icon-bg" id="public-icon-bg'+courseDataOpenDto.id+'"></em></span>';
			    	   div +='</div>';
			    		 if(index==1){
			    			$("#discussion-refer-item"+bbsd).append(div); 
			    		 }else{
			    	        $("#discussion-refer-item"+bbsd).find(".discussion-refer-item.clearfix").last().after(div);
			    		 }
			    	 })
			    }
		 },
		 error:function(){}
	 })
}
//删除资料
function deletecourseData(courseDataId){
	layer.confirm(zLocale.public_message, {
		title:' ', 
	    skin: 'layui-layer-zhs',
	    icon:0,
	    shade:.6,
	    btn: [zLocale.public_confim,zLocale.public_cancel] //按钮
	 }, function(){
			$("#item-refer-discussion"+courseDataId).remove();
			$.ajax({
				type:"post",
				url:basePath+"/course/thirdStep/deleteCourseData",
				data:{"id":courseDataId},
				dataType:'json',
				success:function(data){
					 if(data.success==0){
			 			 layer.msg(zLocale.public_message_success,{
			 	    	     time: 1000, //1s后自动关闭
			 	    	   });
					 }
				},
				error:function(data){
			
				}
				
			})
    		layer.msg({
	    	     time: 1000, //1s后自动关闭
	    	   });
	 }, function(){
		 // 取消不做操作
	 });
}