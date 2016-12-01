package com.zhihuishu.treenity.controller.course;


import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.PathVariable;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.config.support.Parameter;
import com.zhihuishu.micro.course.openapi.course.dto.CourseClipsOpenDto;
import com.zhihuishu.micro.course.openapi.course.dto.CourseOpenDto;
import com.zhihuishu.micro.course.openapi.course.dto.CourseSpeakerOpenDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.treenity.controller.BaseController;
import com.zhihuishu.treenity.dto.user.UserDto;
import com.zhihuishu.treenity.log.LoggerCollectionEnum;
import com.zhihuishu.treenity.service.course.CourseService;
import com.zhihuishu.treenity.service.course.CourseSpeakerService;
import com.zhihuishu.treenity.util.RequestUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/***
 * @author User zhouzha
 *
 */
@Controller
@RequestMapping("/course/firstStep")
public class FirstStepController extends BaseController {
	
	@Resource
	private CourseService courseService;
	
	@Resource
	private CourseSpeakerService courseSpeakerCourse;
	
	@ResponseBody
	@RequestMapping(" ")
	private ModelAndView index(HttpServletRequest request,@RequestParam(value="courseId",required=false)Long courseId) throws RemoteException {
		ModelAndView mv = new ModelAndView();
		if(this.isLoginUserByCourseId(mv, courseId, request.getSession())){
			return mv;
		}
		mv.addObject("courseId", courseId);
		mv.setViewName("/course/firstStep");
		return mv;
	}
	
	/**
	 * 根据课程Id 来修改相应的课程
	 * @param course
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "updateCourseInfo")
	public String updateCourseInfo(HttpServletRequest request,CourseOpenDto course){
		String message = RequestUtil.fromRequestToJsonStr(this.getRequest());
		JSONObject jsonObject = new JSONObject();
		UserDto user = this.getLoginUser();
		if(user == null){
			 jsonObject.put("success", "0");
			 return jsonObject.toString();
		}
		long updateUser = user.getUserId();
		try {
			 courseService.updateCourseInfo(course, updateUser);
			 this.saveLogger(String.format("修改课程信息%s", message),LoggerCollectionEnum.courseCollection.getTableName(),"treenity_course","updateCourseInfo",course.getCourseId());
		} catch (RemoteException e) {
			this.saveLogger(String.format("修改课程信息，课程ID为：%d，出现异常：%s", course.getCourseId(),e.getMessage()),LoggerCollectionEnum.courseCollection.getTableName(),"treenity_course","updateCourseInfo",course.getCourseId());
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 根据课程Id 来查找所有的课程信息
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "queryCourseInfo")
	public CourseOpenDto queryCourseInfo(@RequestParam("courseId")long courseId){
		CourseOpenDto  courseOpenDto = new CourseOpenDto();
		try {
			courseOpenDto = courseService.loadCourse(courseId);
		} catch (RemoteException e) {
			e.printStackTrace();
		}
		return courseOpenDto;
	}
	
	/**
	 * 来查找所有的教师团队（根据 课程Id）
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "courseSpeakearList")
	public JSONObject courseSpeakearList(@RequestParam("courseId")long courseId){
		JSONObject jsonObject = new JSONObject();
		try {
			List<CourseSpeakerOpenDto> courseSpeakearList = courseSpeakerCourse.courseSpeakearList(courseId);
			jsonObject.put("courseSpeakearList", JSONArray.fromObject(courseSpeakearList));
		} catch (RemoteException e) {
		    e.printStackTrace();
		}
		return jsonObject;
	}
	
	
	/**
	 * 删除 教师团队（根据 id 来标志性）
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="delCourseSpeaker")
	public boolean delCourseSpeaker(@RequestParam("id")Integer id){
		String message = RequestUtil.fromRequestToJsonStr(this.getRequest());
		try {
			boolean b =  courseSpeakerCourse.deleteSpeaker(id);
			this.saveLogger(String.format("删除教师团队信息%s", message),LoggerCollectionEnum.courseSpeakerCollection.getTableName(),"treenity_courseSpeaker","delCourseSpeaker",null);
		    return b;
		} catch (RemoteException e) {
			this.saveLogger(String.format("删除教师团队信息，教师团队ID：%d，出现异常：%s", id,e.getMessage()),LoggerCollectionEnum.courseSpeakerCollection.getTableName(),"treenity_courseSpeaker","delCourseSpeaker",null);
		}
		return false;
	}
	
	/**
	 * 修改教师团队
	 * @param courseSpeaker
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="updateSpeakerCourse")
	public String updateSpeakerCourse(CourseSpeakerOpenDto courseSpeaker){
		  String message = RequestUtil.fromRequestToJsonStr(this.getRequest());
		try {
			courseSpeakerCourse.updateSpeakerCourse(courseSpeaker);
			this.saveLogger(String.format("修改教师团队信息%s", message),LoggerCollectionEnum.courseSpeakerCollection.getTableName(),"treenity_courseSpeaker","updateSpeakerCourse",null);
		} catch (RemoteException e) {
			this.saveLogger(String.format("修改教师团队信息，教师团队ID：%d，出现异常：%s", courseSpeaker.getId(),e.getMessage()),LoggerCollectionEnum.courseSpeakerCollection.getTableName(),"treenity_courseSpeaker","updateSpeakerCourse",null);
			e.printStackTrace();
		}
		return null;
	}
	
	/**
	 * 保存教师团队
	 * @param courseSpeaker
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="saveSpeakerCourse")
	public JSONObject saveSpeakerCourse(CourseSpeakerOpenDto courseSpeaker){
		String message = RequestUtil.fromRequestToJsonStr(this.getRequest());
		JSONObject jsonObject = new JSONObject();
		try {
			if(courseSpeaker.getDecription().isEmpty() && courseSpeaker.getImg().isEmpty()
					&& courseSpeaker.getUsername().isEmpty() && courseSpeaker.getJobstatus().isEmpty()){
					return null;
			}
			CourseSpeakerOpenDto speakerOpenDto =courseSpeakerCourse.saveSpeakerCourse(courseSpeaker);
			this.saveLogger(String.format("保存教师团队信息%s",message ),LoggerCollectionEnum.courseSpeakerCollection.getTableName(),"treenity_courseSpeaker","saveSpeakerCourse",null);
			jsonObject.put("speakerOpenDto", JSONArray.fromObject(speakerOpenDto.getId()));
		} catch (RemoteException e) {
			this.saveLogger(String.format("保存教师团队信息，教师团队ID：%d，出现异常：%s", courseSpeaker.getId(),e.getMessage()),LoggerCollectionEnum.courseSpeakerCollection.getTableName(),"treenity_courseSpeaker","saveSpeakerCourse",null);
		}
		return jsonObject;
	}
	
	
	/**
	 * 上传片花
	 * @param request
	 * @param clipsOpen
	 * @param courseId
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="saveUpdateCourese")
	public JSONObject saveUpdateCourese(HttpServletRequest request,@RequestParam(value="ids",required=false) String ids,
										CourseClipsOpenDto clipsOpen, long courseId){
		String message = RequestUtil.fromRequestToJsonStr(this.getRequest());
		JSONObject jsonObject = new JSONObject();
		UserDto user = this.getLoginUser();
		if(user == null){
			 jsonObject.put("success", "0");
			 return jsonObject;
		}
		long updateUser = user.getUserId();
		try {
			CourseClipsOpenDto dto = courseService.saveUpdateCourese(ids,clipsOpen, courseId, updateUser);
			this.saveLogger(String.format("上传片花信息%s", message),LoggerCollectionEnum.courseClipsCollection.getTableName(),"treenity_courseClips","saveUpdateCourese",courseId);
			jsonObject.put("dto", dto);
		} catch (RemoteException e) {
			this.saveLogger(String.format("上传片花信息，片花ID：%d，出现异常：%s", courseId,e.getMessage()),LoggerCollectionEnum.courseClipsCollection.getTableName(),"treenity_courseClips","saveUpdateCourese",courseId);
		}
		return jsonObject;
	}
	
	/**
	 * 修改片花
	 * @param clipsOpen
	 */
	@ResponseBody
	@RequestMapping(value="updateClips")
	public CourseClipsOpenDto updateClips(CourseClipsOpenDto clipsOpen){
		 String message = RequestUtil.fromRequestToJsonStr(this.getRequest());
		try {
			CourseClipsOpenDto dto = courseService.UpdateClipseCourese(clipsOpen);
			this.saveLogger(String.format("修改片花信息%s", message),LoggerCollectionEnum.courseClipsCollection.getTableName(),"treenity_courseClips","updateClips",null);
			return dto;
		} catch (RemoteException e) {
			this.saveLogger(String.format("修改片花信息：片花ID：%d，出现异常：%s", clipsOpen.getClipsId(),e.getMessage()),LoggerCollectionEnum.courseClipsCollection.getTableName(),"treenity_courseClips","updateClips",null);
		}
		return null;
	}
	
	/**
	 * 根据Id 来查找片花
	 * @param clipsId
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="searchCourseClipse")
	public CourseClipsOpenDto searchCourseClipse(long clipsId){
		CourseClipsOpenDto clipsOpen = new CourseClipsOpenDto();
		try {
			clipsOpen = courseService.queryClipseOpenDto(clipsId);
		} catch (RemoteException e) {
		     e.printStackTrace(); 
		}
		return clipsOpen;
	}
	
	/**
	 * 根据VideoId更新片花封面
	 * @param clipsId
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="updatePromoVideoImg")
	public JSONObject updatePromoVideoImg(HttpServletRequest request,@RequestParam(value="ids",required=false) String ids,
			CourseClipsOpenDto clipsOpen, long courseId){
		String message = RequestUtil.fromRequestToJsonStr(this.getRequest());
		JSONObject jsonObject = new JSONObject();
		UserDto user = this.getLoginUser();
		if(user == null){
			 jsonObject.put("success", "0");
			 return jsonObject;
		}
		long updateUser = user.getUserId();
		try {
			CourseClipsOpenDto dto = courseService.updatePromoVideoImg(ids,clipsOpen, courseId, updateUser);
			this.saveLogger(String.format("修改视频封面图片%s", message),LoggerCollectionEnum.courseClipsCollection.getTableName(),"treenity_courseClips","saveUpdateCourese",courseId);
			jsonObject.put("dto", dto);
		} catch (RemoteException e) {
			this.saveLogger(String.format("修改视频封面图片，片花ID：%d，出现异常：%s", courseId,e.getMessage()),LoggerCollectionEnum.courseClipsCollection.getTableName(),"treenity_courseClips","saveUpdateCourese",courseId);
		}
		return jsonObject;
	}
	
}
