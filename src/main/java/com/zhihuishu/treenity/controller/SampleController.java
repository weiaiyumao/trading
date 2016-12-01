package com.zhihuishu.treenity.controller;

import java.io.IOException;

import org.apache.commons.lang3.RandomStringUtils;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.common.json.JSON;
import com.zhihuishu.treenity.dto.user.UserDto;

/**
 * 控制器测试样板，非业务
 */
@Controller
@RequestMapping("/sample")
public class SampleController extends BaseController {
	
	@ResponseBody
	@RequestMapping("/index")
	private ModelAndView index() {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/index");
		return mav;
	}

	/**
	 * 查询用户明细信息，写死用户ID，仅作测试用
	 * @param userId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("{userId}")
	public Object details(@PathVariable("userId")long userId) {
		UserDto user = new UserDto() ;
		
//		MDCLogger.proxy(log ,MDCInfoBuilder.create()
//				.setType("web")
//				.setTag("debug")
//				.setModuleName("测试")
//				.setTableName("zhsuser_sample")
//			.build())
//			.info("测试用户明细查询接口，参数：{}" ,userId);
		
		// 添加一个debug日志记录方法，用于模拟大量日志记录
//		if(log.isDebugEnabled()) debugLog(userId ,user) ;
//		multiLog(100) ;	// 测试多次/小量写入对性能影响
		
		return user ;
	}
	
	/**
	 * 生成指定次数的info日志(512byte)
	 * @param times
	 */
	void multiLog(int times) {
		String msg = RandomStringUtils.randomAlphabetic(512) ;
		for (int i = 0; i < times; i++) {
			log.info(msg);
		}
	}
	
	/**
	 * 模拟大量日志生成情况
	 * @param userId
	 * @param user
	 */
	void debugLog(long userId ,UserDto user) {
		// 记录用户查询结果
		String json = null ;
		try {
			json = JSON.json(user) ;
			log.debug(json);
		} catch (IOException e) {
			e.printStackTrace();
		}
		
		// 故意写入一些异常日志
		try {
			System.out.println(100 / 0) ;
		} catch (Exception e) {
			log.error("模拟异常日志输出!" ,e);
		}

		// 模拟大量日志的情况(10KB)
		log.debug(RandomStringUtils.randomAlphabetic(10240));
		
	}
	
}