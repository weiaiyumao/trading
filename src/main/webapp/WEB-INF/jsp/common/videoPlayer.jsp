<%@ page language="java" pageEncoding="UTF-8" %>
<meta http-equiv="Content-Type" content="text/html;charset=utf-8" />
<!DOCTYPE html>
<html>
<head>
    <meta charset="utf-8">
    <title>播放器</title>
    <!-- jquery -->
    <script src="http://ajax.aspnetcdn.com/ajax/jQuery/jquery-1.12.4.min.js"></script>


    <!-- 需要引入的js -->
    <script type="text/javascript" charset="utf-8" src="http://yuntv.letv.com/player/vod/bcloud.js"></script>
    <link rel="stylesheet" type="text/css" href="http://lc.zhihuishu.com/ableVideoPlayer2.0/css/videoPlayer.min.css"/>
    <script src="http://lc.zhihuishu.com/ableVideoPlayer2.0/js/videoPlayer.min.js"></script>

</head>


<body>

<!-- 播放器区域 -->
<div style="width:800px; height:450px;z-index:0;float: left"  id="container"></div>


<div style="float: left">
    视频ID:<input id="videoId"/><input id="changeBtn" type="button" value="切换"/>
</div>
</body>



<script>
    
    
    
    var initPlayer=function (id) {
        $("#container").Ableplayer({
            "id": id, //   视频ID   必填   id和src  二选一
//      "src":"http://192.168.20.246/video.zhihuishu.com/testzhs/createcourse/course_second/201607/a4eaa3f18772400db2b0507b8e4acf95_500.mp4",
//        "autostart": false, // 是否自动播放    默认true
       "defaltplayertype": 3, //1:自动    2:乐视    3:VJS   默认1
//        "image":"",//封面图片 默认空
//        "mp3Mode":true,//mp3模式    默认false
        "debugMode":true//debug模式(会多一些日志)  默认false
        }, {
            onReady:function () {//初始化完成
            	console.log("PlayerStarter.playerArray:",PlayerStarter);
                console.log("onReady")
            },
            onComplete: function () {//播放完成

                console.log("onComplete");
            },
            onPause: function () {//暂停
            	console.log("PlayerStarter.playerArray:",PlayerStarter.playerArray);
                console.log("onPause");
            },
            onPlay: function () {//播放

                console.log("onPlay");
            },
            onExitFullScreen:function () {//退出全屏
                console.log("onExitFullScreen");
            },
            onTime:function (time) {//观看进度改变时   time为当前进度
//                console.log("onTime:"+time);
            }
        });
    };


    initPlayer(128929);


    $("#changeBtn").click(function () {
        initPlayer($("#videoId").val());
    });

    $(document).keyup(function(event){
        if(event.keyCode==13){
            $("#changeBtn").trigger("click");
        }
    });




//    ablePlayerX("mediaplayer").seek(second)) //跳转到视频的第几秒开始播放
//    ablePlayerX("mediaplayer").play()//播放
//    ablePlayerX("mediaplayer").pause()//暂停
//    ablePlayerX("mediaplayer").getDuration()//获取视频时长
//    ablePlayerX("mediaplayer").getPosition()//获取当前播放进度
//    ablePlayerX("mediaplayer").dispose()//销毁视频
//    ablePlayerX("mediaplayer").getFullStatus() // 查询是否为全屏状态
//    ablePlayerX("mediaplayer").exitFullPlay()//退出全屏
//    ablePlayerX("mediaplayer").resize(width,height)//改变播放器大小
//    ablePlayerX("mediaplayer").insertPopup(htmlStr)//在播放器上显示一个弹出层
//    ablePlayerX("mediaplayer").removePopup()//移除播放器上的弹出层
//    ablePlayerX("mediaplayer").sendDanmu("1111111");//发送弹幕
//    ablePlayerX("mediaplayer").addCourseInfo(courseInfo);//添加课程信息



//注意:
//1,为了更好的嵌入各个复杂的页面环境中,播放器自带z-index样式为9999
//2,播放器容器宽度小于575,335,190将隐藏部分按钮



</script>



</html>
