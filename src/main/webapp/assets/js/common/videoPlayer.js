/***
 * 视频播放器
 * @author JinXing
 * @date 2019年9月21日 下午12:36
 */
//页面层
$(function(){
	videoInit();
	lessonVideo();
});

//播放器初始化时间
function videoInit(){
	$("#PromoVideo").bind("click",function(){			
		var id=$("#videoSrc").val();
		var src=$("#videoSrc").attr("src");//主片花   
		if(!isEmpty(id) && !isEmpty(src)){
			videoShow();
			videoPlayer(id,"");
			$("#videoPlayer").show();
		}
	});

}

/**
 * 小节视频播放
 */
function lessonVideo(){
	$("#video-ul li:lt(2)").bind("click",function(){
		var index=$("#video-ul li").index(this); 
		var id=$("#video-ul input:eq("+index+")").val();
		var src=$("#video-ul input:eq("+index+")").attr("src");  //小节视频
		if(!isEmpty(id) && !isEmpty(src)){
			videoShow();
			videoPlayer(id,"");
			$("#videoPlayer").show();
		}
	});

}


//播放器弹窗
function videoShow(){
	
	//关闭之前的弹窗
	layer.closeAll();
	layer.open({
		  type:1,
		  shift:5,
		  shade: [0.5, '#393D49'],
		  title :" ",
		  area: ['850px', '520px'],
		  fix: false, //不固定
		  move: false,
		  zIndex:9900,
		  content:$("#videoPlayer"),
		  end:function(){//关闭弹窗

		  }
	
		}); 
	
};
//播放器
var videoPlayer=function (id,src) {
	
	//国际化 1.中文 2.英文
	var langurage=1;
	if(z_locale==1)langurage=1;
	if(z_locale==2)langurage=0;
	
    $("#videoPlayer").Ableplayer({
      "id": id, //   视频ID   必填   id和src  二选一
      "src":src,
      "autostart": true, // 是否自动播放    默认true
      "defaltplayertype": 1, //1:自动    2:乐视    3:VJS   默认1
      "image":"",//封面图片 默认空
      "mp3Mode":false,//mp3模式    默认false
      "langurage":langurage,// 0英文   1中文    默认1
      "debugMode":false//debug模式(会多一些日志)  默认false
    }, {
        onReady:function () {//初始化完成

            console.log("onReady")
        },
        onComplete: function () {//播放完成

            console.log("onComplete");
        },
        onPause: function () {//暂停
        	
        	//var num=parseInt(ablePlayerX("videoPlayer").getPosition());
//        	console.log("nowTime:"+num+",isNaN:"+isNaN(num));
//            console.log("onPause");
        },
        onPlay: function () {//播放

            console.log("onPlay");
        },
        onExitFullScreen:function () {//退出全屏
            console.log("onExitFullScreen");
        },
        onTime:function (time) {//观看进度改变时   time为当前进度
//            console.log("onTime:"+time);
        }
    });
};

//ablePlayerX("mediaplayer").seek(second)) //跳转到视频的第几秒开始播放
//ablePlayerX("mediaplayer").play()//播放
//ablePlayerX("mediaplayer").pause()//暂停
//ablePlayerX("mediaplayer").getDuration()//获取视频时长
//ablePlayerX("mediaplayer").getPosition()//获取当前播放进度
//ablePlayerX("mediaplayer").dispose()//销毁视频
//ablePlayerX("mediaplayer").getFullStatus() // 查询是否为全屏状态
//ablePlayerX("mediaplayer").exitFullPlay()//退出全屏
//ablePlayerX("mediaplayer").resize(width,height)//改变播放器大小
//ablePlayerX("mediaplayer").insertPopup(htmlStr)//在播放器上显示一个弹出层
//ablePlayerX("mediaplayer").removePopup()//移除播放器上的弹出层
//ablePlayerX("mediaplayer").sendDanmu("1111111");//发送弹幕
//ablePlayerX("mediaplayer").addCourseInfo(courseInfo);//添加课程信息
//注意:
//1,为了更好的嵌入各个复杂的页面环境中,播放器自带z-index样式为9999
//2,播放器容器宽度小于575,335,190将隐藏部分按钮
