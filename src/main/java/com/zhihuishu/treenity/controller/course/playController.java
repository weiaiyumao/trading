package com.zhihuishu.treenity.controller.course;


import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.servlet.ModelAndView;

import com.zhihuishu.treenity.controller.BaseController;

@Controller
@RequestMapping("/course")
public class playController extends BaseController{
	
	@RequestMapping("/play")
	private ModelAndView index(HttpServletRequest requset,Long courseId) {
		ModelAndView model = new ModelAndView();
		
		model.setViewName("/common/videoPlayer");
		return model; 
	}
	
}
