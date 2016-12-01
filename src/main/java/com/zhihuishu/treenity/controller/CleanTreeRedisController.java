package com.zhihuishu.treenity.controller;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhihuishu.micro.course.openapi.course.CcCourseOpenService;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.log.LoggerCollectionEnum;
/**
 * 第一步清空课程缓存
 * @author shehuaiyang
 * @date 2016年11月7日 上午10:36:57
 * @modifyNote
 * @version 1.0
 */
@Controller
@RequestMapping("/course")
public class CleanTreeRedisController extends BaseController {
	
	@Resource
	private CcCourseOpenService ccCourseOpenService;
	
	/**
	 * 
	 * @Description
	 * @author shehuaiyang
	 * @date 2016年11月7日 下午3:46:18
	 * @modifyNote 
	 * @param courseId
	 * @return
	 */
	@ResponseBody
	@RequestMapping("/cleanTreeRedis")
	private Boolean clean(@RequestParam(value="courseId") final Long courseId) {                  
	        RemoteResult<Void> result = new ResultRequestAndParser<Void>("建课业务", "zhihuishu-treenity", "清除课程缓存", "clean") {
	            @Override
	            public RemoteResult<Void> request(Long curUserId) throws RemoteException {
	            	RemoteResult<Void> result= ccCourseOpenService.delProgressByCourseId(courseId);
	            	return result;
	            }
	        }.get();
			return result.isSuccess();
	}
	@Override
	   protected LoggerCollectionEnum getCollectionEnum(){
	        return LoggerCollectionEnum.courseCollection;	    }
	
}
