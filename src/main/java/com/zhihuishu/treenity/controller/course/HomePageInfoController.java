package com.zhihuishu.treenity.controller.course;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;
import java.util.regex.Matcher;
import java.util.regex.Pattern;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.alibaba.dubbo.common.utils.CollectionUtils;
import com.zhihuishu.micro.bbs.openapi.onlineschool.dto.OnlinePostModelOpenDto;
import com.zhihuishu.micro.course.openapi.course.CourseChapterOpenService;
import com.zhihuishu.micro.course.openapi.course.CourseLessonVideoOpenService;
import com.zhihuishu.micro.course.openapi.course.MeetCourseOpenService;
import com.zhihuishu.micro.course.openapi.course.ScoreAssessRuleOpenService;
import com.zhihuishu.micro.course.openapi.course.dto.CourseChapterDto;
import com.zhihuishu.micro.course.openapi.course.dto.CourseClipsOpenDto;
import com.zhihuishu.micro.course.openapi.course.dto.CourseLessonDto;
import com.zhihuishu.micro.course.openapi.course.dto.CourseLessonVideoDto;
import com.zhihuishu.micro.course.openapi.course.dto.CourseOpenDto;
import com.zhihuishu.micro.course.openapi.course.dto.CourseSpeakerOpenDto;
import com.zhihuishu.micro.course.openapi.course.dto.MeetCourseOpenDto;
import com.zhihuishu.micro.course.openapi.course.dto.ScoreAssessRuleOpenDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.consts.Constants;
import com.zhihuishu.treenity.controller.BaseController;
import com.zhihuishu.treenity.dto.LessonVideoCountDto;
import com.zhihuishu.treenity.dto.user.UserDto;
import com.zhihuishu.treenity.service.course.BBSCourseService;
import com.zhihuishu.treenity.service.course.CourseService;
import com.zhihuishu.treenity.service.course.CourseSpeakerService;
import com.zhihuishu.treenity.util.StringUtils;
import com.zhihuishu.treenity.util.replaceHtml;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;


@Controller
@RequestMapping("/course/courseHome")
public class HomePageInfoController extends BaseController {

	@Resource
	private CourseService courseService;

	@Resource
	private CourseSpeakerService courseSpeakerService;

	@Resource
	private MeetCourseOpenService meetCourseOpenService;

	@Resource
	private CourseLessonVideoOpenService treenityCourseLessonVideoOpenService;

	@Resource
	private CourseChapterOpenService courseChapterOpenService;

	@Resource
	private ScoreAssessRuleOpenService treenityScoreAssessRuleOpenService;

	@Resource
	private BBSCourseService bbsCourseService;

	
	
	@RequestMapping("")
	public ModelAndView courseHomeInfoToOne(ModelAndView model, HttpServletRequest request,
			@RequestParam(value = "courseId", required = false) Integer courseId)
					throws RemoteException, com.zhihuishu.micro.bbs.openapi.remote.RemoteException {
		model.setViewName("/course/creatcourseHome");
		try {
		  if (courseId == null)
				return model;
			// 查找用户基本信息
			CourseOpenDto courseInfo = courseService.loadCourse(courseId);
			courseInfo.setCourseAcademicPrepare(replaceHtml.getReplace((courseInfo.getCourseAcademicPrepare())));
			model.addObject("courseInfo", courseInfo);
			model.addObject("courseId", courseId);
			request.getSession().setAttribute(Constants.CURRENT_SELECT_COURSEID, courseInfo.getCourseId());
			request.getSession().setAttribute(Constants.CURRENT_SELECT_COURSENAME, courseInfo.getName());
			// 查找主讲人
			List<CourseSpeakerOpenDto> list = courseSpeakerService.courseSpeakearList(courseId);
			model.addObject("mainLecturerInfo", list != null && list.size() > 0 ? list.get(0) : null);

			// 查找见面课程
			RemoteResult<List<MeetCourseOpenDto>> remoteResult = meetCourseOpenService.getMeetCourseList(Long.valueOf(courseId));
			if (remoteResult.isSuccess()) {
				List<MeetCourseOpenDto> meetList = remoteResult.getResult();
				model.addObject("meetCourseInfos", meetList);
			}

			// 查询片花
			if (courseInfo != null && courseInfo.getLinkCourseId() != null) {
				CourseClipsOpenDto clipsDto = courseService.queryClipseOpenDto(courseInfo.getLinkCourseId());
				model.addObject("clipsDto", clipsDto);
			}

		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return courseHomeInfoToTwo(model, courseId);

	}
	
	/**
	 * 1.根据当前课程id查询所有章信息 
	 * 2.遍历所有章，根据章id获取bbs论坛对象 
	 * 3.遍历当前章下所有节，获取小节视频个数
	 * @param model
	 * @param courseId
	 *
	 */
	public ModelAndView courseHomeInfoToTwo(ModelAndView model, Integer courseId)
			throws RemoteException, com.zhihuishu.micro.bbs.openapi.remote.RemoteException {

		LessonVideoCountDto count = new LessonVideoCountDto();
		Map<Integer, Integer> mapCountVideo = new HashMap<Integer, Integer>();
		Map<Integer, Integer> mapCountBbs = new HashMap<Integer, Integer>();
		int countTime = 0;
		model.addObject("assessRule", scoreAssess(courseId));

		// ===查询所有章，节，小节===
		//1.根据当前课程id查询所有章信息
		List<CourseLessonVideoDto> lessonVideoLists = new ArrayList<CourseLessonVideoDto>();
		List<CourseChapterDto> chapterList = null;
		try {
			RemoteResult<List<CourseChapterDto>> chapterDtoList = courseChapterOpenService
					.queryListByCourseIdNonLazy(courseId);
			if (!chapterDtoList.isSuccess()) {
				return model;
			}

			chapterList = chapterDtoList.getResult();   //获取所有章列表
			count.setChaptersCount(chapterList.size()); //所有章个数

			//2.遍历所有章，根据章id获取bbs论坛对象
			for (CourseChapterDto chapter : chapterList) {
				int iniCountVideo = 0;// 每次章循环清空视频个数
				int iniCountBbs = 0; // 每次章循环清空bbs个数
				List<OnlinePostModelOpenDto> bbsDto = bbsCourseService.findDiscussListByCourseIdAndChapterId(courseId,
						chapter.getId());
				if (!CollectionUtils.isEmpty(bbsDto)) {
					iniCountBbs += bbsDto.size();
					mapCountBbs.put(chapter.getId(), iniCountBbs);
				}
				// 3.遍历当前章下所有节.获取小节视频个数,时长
				List<CourseLessonDto> lessonList = chapter.getLessonList();

				if (CollectionUtils.isEmpty(lessonList)) {
					  continue;
				}
                
				    //获取小节视频
				for (CourseLessonDto lesson : lessonList) {
					List<CourseLessonVideoDto> lessonVideoList = lesson.getLessonVideoList();

					if (CollectionUtils.isEmpty(lessonVideoList)) {
						continue;
					}
       
					lessonVideoLists.addAll(lessonVideoList); //所有章信息
					iniCountVideo += lessonVideoList.size();
					mapCountVideo.put(chapter.getId(), iniCountVideo);
					for (CourseLessonVideoDto lessonVideo : lessonVideoList) {
						if (lessonVideo.getVideoSec() != null) {
							countTime += lessonVideo.getVideoSec();  //时长
						}
					}

				}

			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		count.setVideosCount(lessonVideoLists.size());// 获取所有视频个数;
		count.setVideosCountTime(countTime);// 获取视频时长;
		model.addObject("lessonVideoList", lessonVideoLists);
		model.addObject("chapterList", chapterList);// 获取所有章列表信息
		model.addObject("mapCountBbs", mapCountBbs);// 当前章下BBS数
		model.addObject("mapCountVideo", mapCountVideo);// 当前章下video数 
		model.addObject("count", count); // 统计章,视频,总视频时长
		return model;
	}
	
	/**
	 * 返回考核对象
	 * @author liushaowei
	 * @date 2016年11月21日 上午9:52:34
	 * @return
	 *
	 */
	public ScoreAssessRuleOpenDto scoreAssess(Integer courseId) {
		ScoreAssessRuleOpenDto assessRule = null;
		try {
			// 1.考核标准信息 ， 计算总分
			RemoteResult<ScoreAssessRuleOpenDto> assessRuleDto = treenityScoreAssessRuleOpenService
					.findByCourseId(Long.valueOf(courseId));
			if (!assessRuleDto.isSuccess()) {
				return null;
			}
			
			assessRule = assessRuleDto.getResult();
			
			if (assessRule != null) {
				double learningProcessScoresShare = assessRule.getLearningProcessScoresShare() == null ? 0
						: assessRule.getLearningProcessScoresShare();
				double chapterTestScoresShare = assessRule.getChapterTestScoresShare() == null ? 0
						: assessRule.getChapterTestScoresShare();
				double finalExamScoreShare = assessRule.getFinalExamScoreShare() == null ? 0
						: assessRule.getFinalExamScoreShare();
				double meetCourseScoreShare = assessRule.getMeetCourseScoreShare() == null ? 0
						: assessRule.getMeetCourseScoreShare();
				double bbsScore = assessRule.getBbsScore() == null ? 0 : assessRule.getBbsScore();
				assessRule.setTotalScore((learningProcessScoresShare + chapterTestScoresShare + finalExamScoreShare
						+ meetCourseScoreShare + bbsScore));
			}
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return assessRule;
	}



	/**
	 * 
	 * 获取课程名称
	 * @date 2016年10月18日 下午3:49:40
	 * @param model
	 * @param request
	 * @return
	 * @throws RemoteException
	 *
	 */
	@RequestMapping("/getCourseNameByLoginUser")
	@ResponseBody
	public String getCourseNameByLoginUser(ModelAndView model, HttpServletRequest request) throws RemoteException {
		JSONObject jsonObject = new JSONObject();
		UserDto user = this.getLoginUser();
		try {
			if (user == null) {
				jsonObject.put("success", "0");
				return jsonObject.toString();
			}
			List<CourseOpenDto> list = courseService.userCourseList(user.getUserId());
			jsonObject.put("CourseOpenDtos", JSONArray.fromObject(list));
			jsonObject.put("success", "1");
			log.info("size:"+list.size()+" CourseOpenDtoTotal:"+(null != list ?list.toString(): null));
		} catch (Exception e) {
			log.error(e.getMessage());
		}
		return jsonObject.toString();
	}
   
	
	/**
	 * 课程导航选项
	 * @date 2016年11月22日 上午10:24:18
	 * @return
	 */
	@RequestMapping("/requestStep")
	public ModelAndView requestStep(HttpServletRequest request, ModelAndView model, String url, String courseName,
			Long courseId) {
		HttpSession session = request.getSession();
		Object objId = session.getAttribute(Constants.CURRENT_SELECT_COURSEID);
		if (courseId == null) {
			session.removeAttribute(Constants.CURRENT_SELECT_COURSEID);
			session.removeAttribute(Constants.CURRENT_SELECT_COURSENAME);
		} else {
			if (objId == null) {
				session.setAttribute(Constants.CURRENT_SELECT_COURSEID, courseId);
				session.setAttribute(Constants.CURRENT_SELECT_COURSENAME, courseName);
			} else {
				Long id = (Long) objId;
				if (id != null && !(id == courseId || id.equals(courseId))) {
					session.setAttribute(Constants.CURRENT_SELECT_COURSEID, courseId);
					session.setAttribute(Constants.CURRENT_SELECT_COURSENAME, courseName);
				}
			}
		}
		model.setViewName("redirect:" + url + "?courseId=" + courseId);
		return model;
	}
	
	


}