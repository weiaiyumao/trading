/**
 * 建课第三步上传与播放
 * @author JinXing
 * @Date 2016年11月4日 13:34
 */

var thirdStep_uploadAndPlay={
		
	//加载小节字幕上传组件
	loadSubTitleUpload:function(){
		
		//上传进度国际化 1.中文 2.英文
		try {
			if(z_locale==1){
				thirdStep_uploadAndPlay.thirdStep_subTitle_aspUpload("thirdStep-en-subTitle","英文字幕","en","english-btn fl");
				thirdStep_uploadAndPlay.thirdStep_subTitle_aspUpload("thirdStep-zh-subTitle","中文字幕","zh","chinese-btn fl");
			}else if(z_locale==2){
				thirdStep_uploadAndPlay.thirdStep_subTitle_aspUpload("thirdStep-en-subTitle","English","en","english-btn fl");
				thirdStep_uploadAndPlay.thirdStep_subTitle_aspUpload("thirdStep-zh-subTitle","Chinese","zh","chinese-btn fl");
			}
			
			//更新字幕内容
			$("#thirdStep-en-subTitle .qq-drop-processing-selector").html("");
			$("#thirdStep-zh-subTitle .qq-drop-processing-selector").html("");
			
		} catch (e) {
			console.log(e);
		}
		
	},
	
	//初始化小节字幕上传组件
	thirdStep_subTitle_aspUpload:function(key,text,type,btnClass){
		
		$('#'+key).Ableuploader({
			appName : "createcourse",// 对应应用名称
			modelName : "course",// 可不写，按文件类型命名，视频为video、图片为image、其他文件为file
			userId : "42", // 填写用户ID
			userName : "temp",
			fileType : "image", // 上传文件类型三类： image; video; file;
			smallImgSize : "100:100", //图片或者视频的三种裁图大小
			bigImgSize : "115:141",
			middleImgSize : "260:250",
			autoConvert : "true", // true为自动转换，false或者不配置为不自动转换(上传里需要自带文档转换,Flex上传不需要自带转换.)
			vIsUploadLetv : "true", // 是否将视频上传到乐视
			targetId : key, // 为按钮目标标签ID
			showProgress : "true", // 是否显示任务栏进度条
			multipleUpload : "false",
			buttonWidth : "70",//IE789下设置此按钮高度生效
			buttonHeight : "30",// IE789下设置此按钮高度生效
			buttonText : text,
			z_language : z_locale,//上传进度国际化 1.中文 2.英文
			buttonClass : btnClass,
			allowSuffix : limit_subTitle_suffix,// 限制文件上传类型为vtt字幕
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
					
					if(responseJSON.data !=null){
						videoOption_subTitleInfo.isAddOrisUpdate(responseJSON.data,type);
					}
					
				},
				onCancel : function(id,fileName){
					
				},
				onDelete : function(id) {

				},
				onDeleteComplete : function(id, xhrOrXdr,
						isError) {
					
				}
			}
		});
		
	},
	
	//初始化小节播放器组件
	loadLessonVideoPlayer:function(){

		try {
			var id=$("#thirdStep-videoSrc").val();
			thirdStep_uploadAndPlay.thirdStep_lessonVideoPlayer_aspUpload(id,"");
		} catch (e) {
			console.log(e);
		}
	},
	
	//视频设置视频播放器
	thirdStep_lessonVideoPlayer_aspUpload:function(id,src){

		//国际化 1.中文 2.英文
		var langurage=1;
		if(z_locale==1)langurage=1;
		if(z_locale==2)langurage=0;
		
	    $("#thirdStep_videoOption_aspUpload").Ableplayer({
	      "id": id, //   视频ID 必填   id和src  二选一
	      "src":src,
	      "autostart": false, // 是否自动播放    默认true
	      "defaltplayertype": 1, //1:自动    2:乐视    3:VJS   默认1
	      "image":"",//封面图片 默认空
	      "mp3Mode":false,//mp3模式    默认false
	      "langurage":langurage,// 0英文   1中文    默认1
	      "debugMode":false//debug模式(会多一些日志)  默认false
	    }, {
	        onReady:function () {//初始化完成
	        	console.log("PlayerStarter.playerArray:",PlayerStarter.playerArray);
	            console.log("onReady")
	        },
	        onComplete: function () {//播放完成

	            console.log("onComplete");
	        },
	        onPause: function () {//暂停        	
	        	try {
	        		
	        		var time=parseInt(ablePlayerX("thirdStep_videoOption_aspUpload").getPosition());
		        	videoOption_videoEdit.setTime(time);
		        	console.log("nowTime:"+time);
		            console.log("onPause");
				} catch (e) {
					console.log(e);
				}
	        },
	        onPlay: function () {//播放
	            console.log("onPlay");
	        },
	        onExitFullScreen:function () {//退出全屏
	            console.log("onExitFullScreen");
	        },
	        onTime:function (time) {//观看进度改变时   time为当前进度
//	            console.log("onTime:"+time);
	        }
	    });
		
	}
	
};

