//===================home.jsp
var flag; //undefined
$(document).ready(
	
		function() {
			percentage($("#percentage").val(),null);//加载进度条数
			treesbtnSlaw(); //进度条
			iniLead();
		    firefoxPageJump("progress-tree-wrap");
			$("#lf-location .trees-btn").click(
					function() {
						var courseId = $("[name=courseId]").val();
						if (courseId == '') {
							shine();
							return false;
						}
						//弹窗
						layer.confirm(zLocale.public_message, {
							title : ' ',
							skin : 'layui-layer-zhs',
							icon : 0,
							shade : .6,
							btn : [ zLocale.public_confim,
									zLocale.public_cancel ]
						}, function() {
							$.ajax({
								type : 'post',
								url : 'removeCourse',
								data : {
									"courseId" : courseId
								},
								dataType : 'json',
								success : function(msg) {
									if (msg.result) {
										utilHade();
										window.location.href = basePath
												+ "/course/home";
									}
								}
							});
						});
					});

			// 点击导航改变
			$("#ulAll .el").click(
					function() {
						var liIndex = $(".el").index(this) + 1;
						var courseId = $("#courseId").val();
						var trimName = $.trim($("[name=courseName]").val());// 去空
						//alert(flag);
						if (trimName == " " || trimName == zLocale.home_mingchengkaishi || flag == undefined) {
							shine();
							return false;
							
						} else if (flag) {
							switch (liIndex) {
							case 1:
								location = basePath
										+ "/course/firstStep?courseId="
										+ courseId;
								break;
							case 2:
								location = basePath
										+ "/course/secondStep?courseId="
										+ courseId;
								break;
							case 3:
								location = basePath
										+ "/course/thirdStep?courseId="
										+ courseId;
								break;
							case 4:
								location = basePath
										+ "/course/fourStep?courseId="
										+ courseId;
								break;
							case 5:
								location = basePath
										+ "/course/fifthStep?courseId="
										+ courseId;
								break;
							case 6:
								location = basePath
										+ "/course/sixthStep?courseId="
										+ courseId;
								break;
							}
						}

					})

			//焦点提交
			$("[name=courseName]").blur(function() {
						var courseName = $.trim($("[name=courseName]").val()); //课程名称
						var courseId = $("#courseId").val();
						var htmlName = courseName.replace(/</g, '＜'); //去掉含有html标签
						htmlName = htmlName.replace(/>/g, '＞');
						if (htmlName == "" || htmlName == zLocale.home_mingchengkaishi || htmlName == zLocale.header_xinjiankecheng) {
							return false;
						} else {
							utilShow(htmlName);
							courseCreateToUpdate(htmlName, courseId);
						}

					})

			//导航鼠标动画
			$("#ulAll .el").mouseover(
				function() {
						$(this).css("cursor", "pointer");
						if (flag) {
							$(this).css("background-color", "#0f5b66");
						} else {
							$(this).css("background-color", "#848484").css(
									"cursor", "default");
						}
					}).mouseout(
				function(){
						if (flag) {
							$(this).css("background-color", "#1aa1b5");
						} else {
							$(this).css("background-color", "#c6c6c6");
						}
			});

			//建课编辑  
			$("#editico_id").click(function(event) {
				$(".text_title").show();
				$(".hometit-p").hide();
				var $getFocusIdInput = $("#getFocusId");
				var courseName = document.getElementById("courseName").value;
				$getFocusIdInput.val("").focus().val(courseName); //光标位置
				$("#intoHome").removeAttr("href"); //点击编辑移除跳转
			});

			//进入主页
			$("#intoHome").click(function() {
				if ($("#courseId").val() == "") {
					shine();
					return false;
				}
			})
		});

//建课
function courseCreateToUpdate(courseName, courseId) {
	    $.ajax({
				type : 'post',
				url : 'courseCreateToUpdate',
				data : {
					"name" : courseName,
					"courseId" : courseId
				},
				dataType : 'json',
				success : function(data) {
					if (!data.success) {
						console.log("数据加载异常！");
						return;
					}
					// =====设置头部下拉课程列表的高度start =====
					var titleCourse = $("#header_first_title").text();
					var height = $(".course-list-drop").css("height").replace(/[^0-9]/ig, "") * 1;
					if(titleCourse=="Creating a Course"){
					}else{
						height = height + 43;
					}
					if (height > 330) {
						height = 330;
					}
					$(".course-list-drop").css("height", height);
					// =====设置头部下拉课程列表的高度end =====

					msg = data.result;
					$("#courseName").val(msg.name);
					$("#courseId").val(msg.courseId);
					$("#addprogresstree").addClass("progresstree-" + msg.resultPercent);
					$("#intoHome").attr("href",basePath + '/course/courseHome?courseId='+msg.courseId);
					$("#intoHome").attr("target", "view_window" + msg.courseId);
					$("#header_first_title").html(msg.name);
					if (courseId == "") {
						percentage(msg.progressValue,msg.error);
						treesbtnSlaw();
					}
					iniLead();
					isIE(msg.courseId);
				
				}
			})
}

// 初始文本显示 ini
function utilHade() {
	var courseId = $("#courseId").val();
	var headerTitleText = $("#header_first_title").text();
	var courNameSpan = $(".hometit-p span").text();
	if (courseId == '' && headerTitleText == zLocale.header_xinjiankecheng || headerTitleText == "") {
		$(".hometit-p span").text(" ");
	} else {
		$(".hometit-p span").text(headerTitleText);
		$("#intoHome").attr("href",
				basePath + '/course/courseHome?courseId=' + courseId);
	}
	if (courNameSpan == '' || zLocale.header_xinjiankecheng == '') {
		$(".text_title").show();
		$(".hometit-p").hide();
		$("#getFocusId").focus();
	}
}

// text_title
function utilShow(courseName) {
	$(".hometit-p span").text(courseName);
	$(".hometit-p").show();
	$(".text_title").hide();
}

//初始导航color
function iniLead(){
		var isCourseId = $("#courseId").val();
		if (isCourseId!= "") {
			$("#ulAll .el").css("background-color", "#1aa1b5");
			flag = true;
		} else {
			$("#ulAll .el").css("background-color", "#c6c6c6");
			flag = false;
		}
		if($(window).height()>668){
			var treeMargin = ($(window).height()-570)/2;
			$(".createcoursehome-div").css({"margin-top":treeMargin,"margin-bottom":treeMargin});
		}
	}

//边框闪烁
var i = 0;
function shine() {
	var timesRun = 0;
	var interval = setInterval(function() {
		var obj = document.getElementById("getFocusId");
		if (i == 0) {
			obj.style.borderColor = "#e2e2e2";
			i = 1;
		} else if (i == 1) {
			obj.style.borderColor = "#1aa1b5";
			i = 0;
		}
		timesRun += 1;
		if (timesRun === 6) {
			clearInterval(interval); //关闭
		}
	}, 200);
	scrollTop();
}

//火狐，谷歌
function scrollTop() {
	$(document.documentElement).animate({
		scrollTop : 0
	}, 200);
	$(document.body).animate({
		scrollTop : 0
	}, 200);

}

//回车按键建课
$(function() {
	$('#getFocusId').bind('keypress', function(event) {
		if (event.keyCode == "13") {
			$("[name=courseName]")[0].blur();
		}
	});
});

//删除动画
var treesbtnSlaw = function() {
	$("#treesbtnSlaw").hover(function() {
		$("#delteimg").stop().animate({
			"width" : "45px"
		}, 100);
	}, function() {
		$("#delteimg").stop().animate({
			"width" : "0px"
		}, 100);
	});
	if ($(".progresstree-1-10").length > 0) {
		treePlay1();
	}
	if ($(".progresstree-11-20").length > 0) {
		treePlay2();
	}
	if ($(".progresstree-21-30").length > 0) {
		treePlay3();
	}
	if ($(".progresstree-31-40").length > 0) {
		treePlay4();
	}
	if ($(".progresstree-41-50").length > 0) {
		treePlay5();
	}
	if ($(".progresstree-51-60").length > 0) {
		treePlay6();
	}
	if ($(".progresstree-61-70").length > 0) {
		treePlay7();
	}
	if ($(".progresstree-71-80").length > 0) {
		treePlay8();
	}
	if ($(".progresstree-81-90").length > 0) {
		treePlay9();
	}
	if ($(".progresstree-91-99").length > 0) {
		treePlay10();
	}
	if ($(".progresstree-100").length > 0) {
		treePlay11();
	}
}
function treePlay1() {
	var anim = frameAnimation.anims($('.progresstree-1-10'), 7200, 20, 1, 1);
	anim.start();
}
function treePlay2() {
	var anim = frameAnimation.anims($('.progresstree-11-20'), 7200, 20, 1.2, 1);
	anim.start();
}
function treePlay3() {
	var anim = frameAnimation.anims($('.progresstree-21-30'), 7200, 20, 1.5, 1);
	anim.start();
}
function treePlay4() {
	var anim = frameAnimation.anims($('.progresstree-31-40'), 7200, 20, 1.8, 1);
	anim.start();
}
function treePlay5() {
	var anim = frameAnimation.anims($('.progresstree-41-50'), 7200, 20, 2, 1);
	anim.start();
}
function treePlay6() {
	var anim = frameAnimation.anims($('.progresstree-51-60'), 7200, 20, 2.2, 1);
	anim.start();
}
function treePlay7() {
	var anim = frameAnimation.anims($('.progresstree-61-70'), 7560, 21, 2.3, 1);
	anim.start();
}
function treePlay8() {
	var anim = frameAnimation.anims($('.progresstree-71-80'), 8640, 24, 2.4, 1);
	anim.start();
}
function treePlay9() {
	var anim = frameAnimation.anims($('.progresstree-81-90'), 9720, 27, 2.5, 1);
	anim.start();
}
function treePlay10() {
	var anim = frameAnimation.anims($('.progresstree-91-99'), 9720, 27, 2.5, 1);
	anim.start();
}
function treePlay11() {
	var anim = frameAnimation.anims($('.progresstree-100'), 10800, 30, 2.6, 1);
	anim.start();
}
(function(window) {
	window.frameAnimation = {
		anims : (function() {
			/*
			obj=>需要执行背景动画的对象；
			width:图片的总宽度
			steps=>需要的帧数；
			eachtime=>一次完整动画需要的时间；
			times=>动画执行的次数 0表示无限反复
			 */
			return function(obj, height, steps, eachtime, times, callback) {
				var runing = false;
				var handler = null; //obj,width,steps,eachtime,times定时器
				var step = 0; //当前帧
				var time = 0; //当前第几轮
				var speed = eachtime * 1000 / steps; //间隔时间
				var oneStepHeight = height / steps;
				function _play() {
					if (step >= steps) {
						step = 0;
						time++;
					}
					if (0 == times || time < times) {
						if (step == 0) {
							obj.css('background-position', '0 0');
						} else {
							obj.css('background-position', '0' + -oneStepHeight
									* step + 'px');
						}
						step++;
					} else {
						control.stop();
						callback && callback();
					}
				}

				var control = {
					start : function() {
						if (!runing) {
							runing = true;
							step = time = 0;
							handler = setInterval(_play, speed);
						}
						return this;
					},
					stop : function(restart) {
						if (runing) {
							runing = false;
							if (handler) {
								clearInterval(handler);
								handler = null;
							}
							if (restart) {
								obj.css('background-position', '0 0');
								step = 0;
								time = 0;
							}
						}
					},
					dispose : function() {
						this.stop();
					}
				};
				return control;
			}
		})()
	}
})(window);

function percentage(percentageNumber,error) {
	//异常 
	if(error!=null){
		var $percent=$("#percentfontId");
		$percent.text(zLocale.home_error).css("font-size",16);
		return false;
	}
	 
	var i = 0;
	var end = setInterval(function() {
		if (i >= percentageNumber) {
			clearInterval(end);
		}
		$("#percentfontId").text(i + "%");
		i++;
	}, 30);
}




/**
 * url改变方式
 */
function isIE(id){
	var browser = navigator.appName;
	//var b_version = navigator.appVersion;
	//var version = b_version.split(";");
	if (browser == "Microsoft Internet Explorer") {
		//var trim_Version = version[1].replace(/[ ]/g, "");
    	//if(trim_Version == "MSIE8.0" || trim_Version == "MSIE9.0" || trim_Version == "MSIE10.0") {
		  window.location = basePath + "/course/home?courseId=" + id;
		//}
	} else {
		// 替换地址
		var url = basePath + "/course/home?courseId=" + id;
		history.replaceState(basePath + "/course/home?isCreate=1", "", url);
	}
}

