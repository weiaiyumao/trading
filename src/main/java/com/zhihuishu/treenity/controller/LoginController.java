package com.zhihuishu.treenity.controller;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.zhihuishu.treenity.consts.Constants;
import com.zhihuishu.treenity.consts.WebConsts;
import com.zhihuishu.treenity.log.LoggerCollectionEnum;
import com.zhihuishu.user.openapi.common.CertifyQueryOpenService;
import com.zhihuishu.user.openapi.common.UserQueryOpenService;
/**
 * 登录控制器
 * @author huyue
 * @date 2016年8月10日 下午1:33:48
 */
@Controller
@RequestMapping("/")
public class LoginController extends BaseController {
	
	@Resource
	private UserQueryOpenService userQueryOpenService;
	
	@Resource
	private CertifyQueryOpenService certifyQueryOpenService;
	
	/**
	 * 
	 * @Description 跳转登录页面
	 * @author shisong
	 * @date 2016年9月21日 下午1:29:11
	 * @modifyNote 
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/login")
	private ModelAndView index() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/login/login");
		return mav;
	}
	
	/**
	 * 
	 * @Description 跳转登出
	 * @author shisong
	 * @date 2016年9月21日 下午1:33:10
	 * @modifyNote 
	 * @return
	 */
	@RequestMapping("/logout")
	public String loginOut(HttpSession session){
		
		try {
			if(null != this.getLoginUID()&& this.getLoginUID() > 0L){
				this.saveLogger(String.format("登出用户ID：%d！", this.getLoginUID()),LoggerCollectionEnum.loginInfoColletcion.getTableName(),"treenity_login","loginout",null);
				session.removeAttribute("_const_cas_assertion_");
				session.removeAttribute(WebConsts.SESSION_LOGIN_USER);
				session.removeAttribute(WebConsts.SESSION_LOGIN_USER_ID);
				session.removeAttribute(WebConsts.SESSION_LOGIN_USERNAME);
				session.removeAttribute("FtpUrlSuffixImg");
				session.removeAttribute(Constants.CURRENT_SELECT_COURSEID);
				session.removeAttribute(Constants.CURRENT_SELECT_COURSENAME);
			}
		} catch (Exception e) {
			e.printStackTrace();
			this.saveLogger(String.format("登出用户ID：%d！登出异常", e.getMessage()),LoggerCollectionEnum.loginInfoColletcion.getTableName(),"treenity_login","loginout",null);
		}
		
		return "login/logout";
	}
	
	
	/**
	 * 由于本系统的登录是调用其他项目的登录方法，为了不破坏原业务，所以登录的日志单独写
	 * @Description
	 * @author shisong
	 * @date 2016年9月27日 下午2:29:40
	 * @modifyNote 
	 * @return
	 */
	@RequestMapping("/log")
	public String loginLog(){
		try {
			if(null != this.getLoginUID()&& this.getLoginUID() > 0L){
				//登录成功日志
				this.saveLogger(String.format("登录用户ID：%d！", this.getLoginUID()),LoggerCollectionEnum.loginInfoColletcion.getTableName(),"treenity_login","login",null);
			}
		} catch (Exception e) {
			e.printStackTrace();
			this.saveLogger(String.format("登录用户ID：%d登录异常！", e.getMessage()),LoggerCollectionEnum.loginInfoColletcion.getTableName(),"treenity_login","login",null);
		}
		
		return "redirect:course/home";
	}
	
	
}
