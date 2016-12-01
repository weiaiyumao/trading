package com.zhihuishu.treenity.controller.course;

import java.util.List;

import javax.annotation.Resource;

import org.aspectj.internal.lang.annotation.ajcDeclareAnnotation;
import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.able.commons.dto.BaseVideoDto;
import com.able.commons.httpinvoker.IFileCommonsInvoker;
import com.zhihuishu.treenity.controller.BaseController;
import com.zhihuishu.treenity.service.course.CourseService;
/***
 * @Title Dubbo服务调用接口
 * @author JinXing
 * @date 2016年9月20日 下午16：22
 * */

@Controller
@RequestMapping("/course/common/index")
public class FileController extends BaseController{
	
	@Autowired
	private IFileCommonsInvoker IFileCommonsInvoker;
	
	@Resource
	private CourseService courseService;
	
	/***
	 * 根据VideoId获取上传视频的封面
	 * @param ids VideoId
	 * Return BaseVideoDto
	 * */
	@RequestMapping("/file/findVideoByIds")
	public @ResponseBody List<BaseVideoDto> findVideoByIds(
			@RequestParam(value="ids",required=false) String ids){
		List<BaseVideoDto> list = IFileCommonsInvoker.findVideoByIds(ids);
		return list;
	}

}
