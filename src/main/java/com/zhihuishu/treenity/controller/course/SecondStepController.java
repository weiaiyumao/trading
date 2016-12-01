package com.zhihuishu.treenity.controller.course;



import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpServletResponse;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.zhihuishu.micro.course.openapi.course.dto.CourseOpenDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.controller.BaseController;
import com.zhihuishu.treenity.log.LoggerCollectionEnum;
import com.zhihuishu.treenity.service.course.CourseService;
import com.zhihuishu.treenity.util.RequestUtil;



/***
 * @author User zhouzha
 *
 */
@Controller
@RequestMapping("/course/secondStep")
public class SecondStepController  extends BaseController{
	
	@Resource
	public CourseService   courseService;
	@ResponseBody
	@RequestMapping("")
	private ModelAndView toSecondStep(Long courseId,HttpServletRequest request) throws RemoteException {
		ModelAndView mav = new ModelAndView();
		if(this.isLoginUserByCourseId(mav, courseId, request.getSession())){
			return mav;
		}
		mav.addObject("courseId", courseId);
		mav.setViewName("/course/secondStep");
		return mav;
	}
	/**
	 * 第二步更新操作
	 */
	@ResponseBody
	@RequestMapping(value="/upSecondStep")
	private void upSecondStep(CourseOpenDto course,HttpServletRequest request,HttpServletResponse response) {
		String message = RequestUtil.fromRequestToJsonStr(this.getRequest());
		Long updateUser=this.getLoginUID();
		try {
			this.saveLogger(String.format("修改见面课详细信息：%s！", message),LoggerCollectionEnum.courseSummaryCollection.getTableName(),"treenity_courseSummary","update",course.getCourseId());
			courseService.updateCourseInfo(course, updateUser);
		} catch (RemoteException e) {
			this.saveLogger(String.format("修改见面课详细信息：%d！出现异常：%s",e.getMessage()),LoggerCollectionEnum.courseSummaryCollection.getTableName(),"treenity_courseSummary","update",course.getCourseId());

			e.printStackTrace();
		}                      
			
	}
	/**
	 * 第二步查询
	 * @throws RemoteException 
	 */
	@ResponseBody
	@RequestMapping(value="/querySecondStep")
	private RemoteResult<CourseOpenDto> querySecondStep(@RequestParam("courseId")long courseId,HttpServletRequest request,HttpServletResponse response) throws RemoteException {
		RemoteResult<CourseOpenDto> result=new RemoteResult<CourseOpenDto>();
		CourseOpenDto courseOpenDto = courseService.loadCourse(courseId);
		result.setResult(courseOpenDto);
		result.setSuccess(true);
		return result;
			
	}
   
}
