package com.zhihuishu.treenity.controller;



import java.util.Locale;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.ui.Model;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;
import org.springframework.web.servlet.i18n.SessionLocaleResolver;

import com.zhihuishu.treenity.consts.WebConsts;

/**
 * 国际化语言切换控制器
 * @author huyue
 * @date 2016年8月15日 下午7:42:27
 */
@Controller
@RequestMapping("/global")
public class GlobalController extends BaseController {
	
	@RequestMapping(value="/index")
	private ModelAndView changeLocale(HttpServletRequest request, HttpServletResponse response,Model model
			,@RequestParam(value="langType")int langType,@RequestParam(value="targetUrl",required=false)String targetUrl) {
		Locale locale = Locale.getDefault();
		if(langType == WebConsts.LOCALE_ZH){
			locale = new Locale("zh"); 
		}else if(langType == WebConsts.LOCALE_EN){
			locale = new Locale("en"); 
		}
    	request.getSession().setAttribute(SessionLocaleResolver.LOCALE_SESSION_ATTRIBUTE_NAME,locale);
    	
		ModelAndView mav = new ModelAndView();
		if(StringUtils.isNotBlank(targetUrl)){
			mav.setViewName("redirect:"+targetUrl);
		}else{
			mav.setViewName("redirect:/");
		}
		return mav;
	}
	
	@ResponseBody
	@RequestMapping("/test")
	private ModelAndView test() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/globalTest");
		return mav;
	}
}