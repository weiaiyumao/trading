package com.zhihuishu.treenity.web;

import java.io.IOException;
import java.security.Principal;

import javax.servlet.Filter;
import javax.servlet.FilterChain;
import javax.servlet.FilterConfig;
import javax.servlet.ServletException;
import javax.servlet.ServletRequest;
import javax.servlet.ServletResponse;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;
import javax.servlet.http.HttpSession;

import org.apache.commons.lang3.StringUtils;
import org.springframework.web.context.support.WebApplicationContextUtils;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.util.WebUtils;

import com.zhihuishu.treenity.consts.Constants;
import com.zhihuishu.treenity.consts.WebConsts;
import com.zhihuishu.treenity.dto.user.UserDto;
import com.zhihuishu.treenity.service.user.UserService;


/**
 *  登录过滤器
 * @author shisong
 * @date 2016年9月21日 下午1:35:00
 * @modifyNote
 * @version 1.0
 */
public class CasFilter implements Filter  {

	//protected Logger log = LoggerFactory.getLogger(this.getClass()) ;
	
	private UserService userService;
	
	@Override
	public void destroy() {}

	@Override
	public void doFilter(ServletRequest req, ServletResponse resp,
			FilterChain chain) throws IOException, ServletException {

		HttpServletRequest request = (HttpServletRequest) req ;
		HttpServletResponse response=(HttpServletResponse) resp;
		HttpSession session = request.getSession();
		
		// 过滤Dubbo、登录页、静态资源等请求
		String requestURI = request.getRequestURI();
		if(StringUtils.containsAny(requestURI, "/assets","/login")){
			chain.doFilter(request, response);
			return;
		}
		
		//session中是否已存在登录用户信息
		UserDto loginUser = (UserDto) session.getAttribute(WebConsts.SESSION_LOGIN_USER);
		if(loginUser != null){
				chain.doFilter(request, response);
				return;
		}
		Principal principal = request.getUserPrincipal();
		if(principal != null){
			//获取当前用户的账号
			String account = principal.getName();
		
			if(StringUtils.isNotBlank(account)){
				loginUser = userService.getByAccount(account);
				if(loginUser != null){
					
					// 完善用户头像
		        	if(StringUtils.isBlank(loginUser.getAvatar())) {
		        		// 为空是，填充默认用户头像
		        		/*loginUser.setAvatar(request.getContextPath() + "/web/images/user_default.jpg");*/
		        		loginUser.setAvatar(Constants.FTP_URL_SUFFIX_IMG + "testzhs/ablecommons/demo/201609/aaf44ddde4db40ee9a71b85fdcff9870.png");
		        	} else if(!StringUtils.startsWithIgnoreCase(loginUser.getAvatar(), "http")) {
		        		// 非以http开头时，添加前缀
		        		loginUser.setAvatar(Constants.FTP_URL_SUFFIX_IMG + loginUser.getAvatar());
		        	}
		        	
		        	session.setAttribute("FtpUrlSuffixImg", loginUser.getAvatar());
					
					WebUtils.setSessionAttribute(request, WebConsts.SESSION_LOGIN_USER, loginUser);
					WebUtils.setSessionAttribute(request, WebConsts.SESSION_LOGIN_USER_ID, loginUser.getUserId());		
					WebUtils.setSessionAttribute(request, WebConsts.SESSION_LOGIN_USERNAME, loginUser.getUsername());
					
					
					chain.doFilter(request, response);
					return;
				}
					
				
			}else{
				//清空session的信息
				WebUtils.setSessionAttribute(request, WebConsts.SESSION_LOGIN_USER, null);
				WebUtils.setSessionAttribute(request, WebConsts.SESSION_LOGIN_USER_ID, null);		
				WebUtils.setSessionAttribute(request, WebConsts.SESSION_LOGIN_USERNAME, null);
				session.setAttribute("FtpUrlSuffixImg", null);
				redirectLoginPage();
			}
		
		}
		
	}

	/**
	 * 重定向到登录页
	 * @param request
	 * @param response
	 * @throws IOException
	 */
	private void redirectLoginPage() {
		new ModelAndView("http://treenity.zhihuishu.com/login");
	}
	
	@Override
	public void init(FilterConfig cfg) throws ServletException {
		userService=WebApplicationContextUtils.getWebApplicationContext(cfg.getServletContext())
				.getBean("userService", UserService.class) ;
	}
   
}
	
