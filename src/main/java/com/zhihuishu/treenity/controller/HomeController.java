package com.zhihuishu.treenity.controller;

import java.util.List;
import java.util.Map;

import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.CollectionUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.zhihuishu.micro.course.openapi.course.dto.CourseOpenDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.consts.Constants;
import com.zhihuishu.treenity.consts.FullPercents;
import com.zhihuishu.treenity.consts.JudgeHome;
import com.zhihuishu.treenity.dto.CourseProgressDto;
import com.zhihuishu.treenity.log.LoggerCollectionEnum;
import com.zhihuishu.treenity.service.course.CcCourseService;
import com.zhihuishu.treenity.service.course.CourseService;
import com.zhihuishu.treenity.util.StringUtils;

/**
 * 创建建课首页
 * 
 * @author liushaowei
 * @date 2016年9月21日
 */
@RequestMapping("/course")
@Controller
public class HomeController extends BaseController {

	@Autowired
	private CourseService courseService;

	@Autowired
	private CcCourseService treenityCcCourseOpenService;

	/**
	 * 建课主页
	 * @date 2016年9月14日 下午2:52:16
	 * @return
	 * @throws RemoteException
	 */
	@RequestMapping("/home")
	public ModelAndView toHome(HttpServletRequest request,
			@RequestParam(value = "courseId", required = false) Long courseId, Integer isCreate,HttpSession session)
					throws RemoteException {
		 ModelAndView mv = new ModelAndView();
		if (courseId == null) {
			// 1.1用户为空 去登录页
			if (getLoginUID() == null) {
				mv.setViewName("/login");
				return mv;
			}
			// 1.2是否有传入isCreate值,传入则先清空,进入建课页面
			if (isCreate != null && isCreate == JudgeHome.IS_CREATE) {
				session.removeAttribute(Constants.CURRENT_SELECT_COURSEID);
				session.removeAttribute(Constants.CURRENT_SELECT_COURSENAME);
				mv.addObject("courseProgressDto", progressMapInfo(null));
				return mv;
			}
			
			// 1.3获取用户下有课程数据，拿第一条数据填充
			List<CourseOpenDto> courseList = courseService.userCourseList(getLoginUID());
			if (!CollectionUtils.isEmpty(courseList)) {
				session.setAttribute(Constants.CURRENT_SELECT_COURSEID, courseList.get(0).getCourseId());
				session.setAttribute(Constants.CURRENT_SELECT_COURSENAME, courseList.get(0).getName());
				courseId = courseList.get(0).getCourseId();
				mv.setViewName("course/home");
			}
		
		}

		// 2.1课程id存在 用户对当前课程无访问权限
		if (this.isLoginUserByCourseId(mv, courseId, request.getSession(), courseId != null ? 0 : JudgeHome.IS_HOME)) {
			return mv;
		}

		mv.addObject("courseProgressDto", progressMapInfo(courseId));
		return mv;
	}

	/**
	 * 创建/修改课程
	 * @date 2016年11月21日 上午10:06:45
	 * @return
	 *
	 */
	@ResponseBody
	@RequestMapping("/courseCreateToUpdate")
	public RemoteResult<CourseProgressDto> courseCreateToUpdate(final String name, final Long courseId,
			final CourseOpenDto courseOpenDto) {
		RemoteResult<CourseProgressDto> result = new ResultRequestAndParser<CourseProgressDto>("建课首页",
				"treenity_home_course", "创建或者修改", "saveOrUpdate") {
			@Override
			public RemoteResult<CourseProgressDto> request(Long curUserId) throws RemoteException {

				RemoteResult<CourseProgressDto> result = new RemoteResult<CourseProgressDto>();
				result.setSuccess(true);

				try {
					CourseOpenDto course = new CourseOpenDto();
					if (!StringUtils.isNotEntity(courseId)) {
						// 新增
						course = courseService.create(name, getLoginUID());
					} else {
						// 修改
						courseService.updateCourseInfo(courseOpenDto, getLoginUID());
						course.setCourseId(courseOpenDto.getCourseId());
					}
					// 加载进度
					CourseProgressDto courseProgressDto = progressMapInfo(course.getCourseId());
					courseProgressDto.setCourseId(course.getCourseId());
					courseProgressDto.setName(name);
					result.setResult(courseProgressDto);
				} catch (Exception e) {
					result.setSuccess(false);
					result.setExceptionStack(e);
				}
				return result;
			}
		}.get();
		return result;
	}

	/**
	 * 删除课程
	 * @date 2016年9月14日 下午2:52:16
	 * @param courseId
	 * @param deleteUser
	 * @return
	 */
	@RequestMapping("/removeCourse")
	public @ResponseBody RemoteResult<Boolean> removeCourse(final Long courseId) {
		RemoteResult<Boolean> result = new ResultRequestAndParser<Boolean>("建课首页", "treenity_home_removeCourse", "删除课程",
				"removeCourse") {
			@Override
			public RemoteResult<Boolean> request(Long curUserId) throws RemoteException {
				HttpSession session = getRequest().getSession();
				RemoteResult<Boolean> result = new RemoteResult<Boolean>();
				result.setSuccess(true);
				try {
					// 删除并清除session
					session.removeAttribute(Constants.CURRENT_SELECT_COURSEID);
					session.removeAttribute(Constants.CURRENT_SELECT_COURSENAME);
					courseService.remove(courseId, getLoginUID());
					result.setResult(true);
				} catch (Exception e) {
					result.setSuccess(false);
					result.setExceptionStack(e);
				}
				return result;
			}
		}.get();
		return result;
	}

	/**
	 * home智慧树进度显示
	 * @author liushaowei
	 * @date 2016年11月7日 下午5:43:10
	 * @return
	 */
	public CourseProgressDto progressMapInfo(final Long courseId) {
		CourseProgressDto courseProgressDto = new CourseProgressDto();
		// 课程id不空 则进行计算进度 ，否则默认为0
		try {
			if (courseId != null) {
				Map<String, Integer> mapProgres = treenityCcCourseOpenService.findProgressByCourseId(courseId);
				if (!mapProgres.isEmpty()) {
					Integer progressValue = mapProgres.get("progress"); // 进度key
					String resultPercent = FullPercents.getResultPercent(progressValue);
					courseProgressDto.setProgressValue(progressValue);
					courseProgressDto.setResultPercent(resultPercent);
				
				}
			}
		} catch (Exception e) {
			log.error(e.getMessage());
			courseProgressDto.setError("加载异常!"); 
		}
		return courseProgressDto;
	}

	@Override
	protected LoggerCollectionEnum getCollectionEnum() {
		return LoggerCollectionEnum.courseCollection;
	}

}
