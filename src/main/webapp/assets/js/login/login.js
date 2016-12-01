$(function(){
	//当用户输入http://www.treenity.com/login(已登录的情况下)
	//跳转至http://treenity.zhihuishu.com/login
	var currLocation= window.location;
	if("http://www.treenity.com/login" == currLocation){
		window.location.href="http://treenity.zhihuishu.com/login";
	}
	
	//登录
		$("#loginBtn").click(function(){
			//对用户名进行校验
			var usernameFlag = validateUsername();
			if(!usernameFlag){
				return false;
			}
			//对密码进行校验
			var passwordFlag = validateLPassword();
			if(!passwordFlag){
				return false;
			}
			
			//获取用户名密码
			var username = $("#username").val();
			var password = $("#password").val();
			//设置跳转页面
			var url ="http://www.treenity.com/log";
			//调用登录方法
			loginZHS(username,password,url);
		});
	});
	
	
	
	/**
	 * 验证登录用户名
	 */
	validateUsername = function(){
		var username = $("#username").val();
		if ($.trim(username) == "" || username == null) {
			
			addError("loginErrorSpan",zLocale.login_yonghumingbunengweikong);
			return false;
		}
		return true;
	};
	
	/**
	 * 验证登录密码
	 */
	validateLPassword = function(){
		var password = $("#password").val();
		if ($.trim(password) == "" || password == null) {
			addError("loginErrorSpan",zLocale.login_mimabunengweikong);
			return false;
		}else{
			
			return true;
		}
	};
	
	loginZHS = function (username,password,url){
	
		var params = {
			account : username,
			password : password,
			url : url
		};
		$.ajax( {
			url : "http://user.zhihuishu.com/user/checkCommonAccountPasswordAndLogin.do",
			type : "POST",
			dataType : "jsonp",
			jsonp: 'jsoncallback',
			async : false, 
			data : params,
			success : function(data) {
				if(data.result == 'success'){
					if(url == null || url == "" || url == "undefined"){
						
					}else{
						window.location.href = url;
					}
				}else{
					addError("loginErrorSpan",zLocale.login_yonghuminghuomimacuowu);
					
					return false;
				}
			},
			error : function() {
				addError("loginErrorSpan",zLocale.login_yonghuminghuomimacuowu);
				
				return false;
			}
		});
	};
	/**
	 * 添加错误提示
	 * @param id1	输出框后div的id
	 * @param id2	错误显示div的id
	 * @param info	错误信息
	 */
	function addError(id1, info) {
		var obj = $("#" + id1);
		obj.css("display","block");
		obj.html(info);
	}
	/**
	 * 弹窗提示
	 * @param info
	 */
	function alertAddError(info){
		alert(info);
	}
	
	/**
	 * 按下键盘事件
	 * 当按下回车时，实现登录
	 */	
	$(window).keydown(function(event){
  	  if (event.keyCode==13){    
  		$("#loginBtn").click();
      }  
	});