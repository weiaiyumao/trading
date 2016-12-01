package com.zhihuishu.treenity.controller.course;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpSession;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.http.HttpStatus;
import org.springframework.http.ResponseEntity;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.able.dto.ExamForOverseasDto;
import com.zhihuishu.micro.course.openapi.course.MeetCourseOpenService;
import com.zhihuishu.micro.course.openapi.course.ScoreAssessRuleOpenService;
import com.zhihuishu.micro.course.openapi.course.dto.CourseChapterDto;
import com.zhihuishu.micro.course.openapi.course.dto.CourseClipsOpenDto;
import com.zhihuishu.micro.course.openapi.course.dto.CourseOpenDto;
import com.zhihuishu.micro.course.openapi.course.dto.MeetCourseOpenDto;
import com.zhihuishu.micro.course.openapi.course.dto.ScoreAssessRuleOpenDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.controller.BaseController;
import com.zhihuishu.treenity.dto.WebStep3Dto;
import com.zhihuishu.treenity.log.LoggerCollectionEnum;
import com.zhihuishu.treenity.service.course.ChapterNonlazyService;
import com.zhihuishu.treenity.service.course.CourseService;
import com.zhihuishu.treenity.service.course.CourseSpeakerService;
import com.zhihuishu.treenity.service.course.ThirdStepQuizService;

/**
 * 
 * @author shisong
 * @date 2016年10月29日 下午1:38:39
 * @modifyNote
 * @version 1.0
 */
@Controller
@RequestMapping("/course/sixthStep")
public class SixthStepController extends BaseController {

	@Resource
	private CourseService courseService;

	@Resource
	private CourseSpeakerService courseSpeakerCourse;

	@Resource
	private MeetCourseOpenService meetCourseOpenService;
	
	@Resource
	private ScoreAssessRuleOpenService scoreAssessRuleOpenService;
	
	@Resource
    private ChapterNonlazyService chapterNonlazyService;
	
	@Resource
    private ThirdStepQuizService thirdStepQuizService;

	/**
	 * 页面跳转
	 * 
	 * @Description
	 * @author shisong
	 * @date 2016年11月2日 上午9:53:50
	 * @modifyNote 
	 * @param courseId
	 * @param session
	 * @return
	 * @throws RemoteException
	 */
	@ResponseBody
	@RequestMapping(value = "")
	private ModelAndView index(@RequestParam(value = "courseId", required = false) Long courseId, HttpSession session)
			throws RemoteException {
		ModelAndView mav = new ModelAndView();
		if (super.isLoginUserByCourseId(mav, courseId, session)) {
			return mav;
		}
		mav.addObject("courseId", courseId);
		mav.setViewName("/course/sixthStep");
		return mav;
	}

	/**
	 * 查询课程的基础信息 根据courseId
	 * 
	 * @Description
	 * @author shisong
	 * @date 2016年10月19日 下午2:15:46
	 * @modifyNote
	 * @param courseId 课程ID
	 * @return
	 * @throws RemoteException
	 */
	@ResponseBody
	@RequestMapping(value = "/queryCourseInfo", method = RequestMethod.POST)
	private CourseOpenDto queryCourseInfo(@RequestParam(value = "courseId", required = false) Long courseId)
			throws RemoteException {
		CourseOpenDto courseInfo = new CourseOpenDto();
		if (null != courseId) {
			try {
				courseInfo = courseService.loadCourse(courseId);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return courseInfo;
	}

	/**
	 * 查询课程的片花信息 根据clipsId
	 * 
	 * @Description
	 * @author shisong
	 * @date 2016年10月19日 下午2:16:03
	 * @modifyNote
	 * @param clipsId 片花ID
	 * @return
	 * @throws RemoteException
	 */
	@ResponseBody
	@RequestMapping(value = "/queryCourseClips", method = RequestMethod.POST)
	private CourseClipsOpenDto queryCourseClips(@RequestParam(value = "clipsId", required = false) Long clipsId)
			throws RemoteException {
		CourseClipsOpenDto courseClips = new CourseClipsOpenDto();
		if (null != clipsId) {
			try {
				courseClips = courseService.queryClipseOpenDto(clipsId);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return courseClips;

	}

	/**
	 * 查询教学团队 根据courseId
	 * 
	 * @Description
	 * @author shisong
	 * @date 2016年10月25日 上午8:38:20
	 * @modifyNote
	 * @param courseId 课程ID
	 * @return
	 * @throws RemoteException
	 */
	@ResponseBody
	@RequestMapping(value = "querySpeaker", method = RequestMethod.POST)
	private Map<String, Boolean> querySpeaker(@RequestParam(value = "courseId", required = false) Long courseId)
			throws RemoteException {
		Map<String, Boolean> resultMap = new HashMap<String, Boolean>();
		if (null != courseId) {
			try {
				resultMap = courseSpeakerCourse.findCourseSpeakerIsComplete(courseId);
			} catch (Exception e) {
				e.printStackTrace();
			}
		}
		return resultMap;
	}

	/**
	 * 查询见面课 根据courseId
	 * 
	 * @Description
	 * @author shisong
	 * @date 2016年10月27日 下午2:34:13
	 * @modifyNote
	 * @param courseId 课程ID
	 * @return
	 * @throws RemoteException
	 */
	@ResponseBody
	@RequestMapping(value = "/queryMeetCourse", method = RequestMethod.POST)
	private List<MeetCourseOpenDto> queryMeetCourse(@RequestParam(value = "courseId", required = false) Long courseId)
			throws RemoteException {
		List<MeetCourseOpenDto> meetCourseList = new ArrayList<MeetCourseOpenDto>();
		RemoteResult<List<MeetCourseOpenDto>> result = meetCourseOpenService.getMeetCourseList(courseId);
		if (result.isSuccess()) {
			meetCourseList = result.getResult();
		}
		return meetCourseList;
	}
	
	/**
	 * 查询成绩规则 根据courseId
	 * 
	 * @Description
	 * @author shisong
	 * @date 2016年10月31日 下午6:18:50
	 * @modifyNote 
	 * @param courseId 课程ID
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value="queryAssessmentStrategy",method=RequestMethod.POST)
	public ScoreAssessRuleOpenDto queryAssessmentStrategy(@RequestParam(value = "courseId", required = false) Long courseId){
		ScoreAssessRuleOpenDto assessRuleOpenDto = new ScoreAssessRuleOpenDto();
		try {
			RemoteResult<ScoreAssessRuleOpenDto> result = scoreAssessRuleOpenService.findByCourseId(courseId);
			if(result.isSuccess()){
				assessRuleOpenDto = result.getResult();
			}
		} catch (Exception e) {
			e.printStackTrace();
		}
		return assessRuleOpenDto;
	}
	
	/**
	 * 查询期末考试	根据courseId,userId
	 * 
	 * @Description
	 * @author shisong
	 * @date 2016年11月2日 上午9:52:31
	 * @modifyNote 
	 * @param courseId
	 * @return
	 * @throws RemoteException
	 */
	@ResponseBody
	@RequestMapping(value="queryFinalExam",method=RequestMethod.POST)
	public ExamForOverseasDto queryFinalExam(@RequestParam(value = "courseId", required = false) Integer courseId) throws RemoteException{
		Integer userId = this.getLoginUID().intValue();
		ExamForOverseasDto examForOverseasDto = new ExamForOverseasDto();
		try {
			examForOverseasDto = thirdStepQuizService.getFinalExamByCourseId(courseId, userId);
			// TODO 等期末考试完成后 要删除
			/*examForOverseasDto.setTitle("23465");
			examForOverseasDto.setLimitTime(120);*/
		} catch (Exception e) {
			e.printStackTrace();
		}
		
		return examForOverseasDto;
	}
	
	/**
	 * 查询章节信息 根据courseId
	 * 
	 * @Description
	 * @author shisong
	 * @date 2016年11月2日 下午1:52:45
	 * @modifyNote 
	 * @param courseId
	 * @return
	 * @throws RemoteException
	 */
	@ResponseBody
	@RequestMapping(value="queryChapter",method=RequestMethod.POST)
	public List<CourseChapterDto> queryChapter(@RequestParam(value = "courseId", required = false) Long courseId) throws RemoteException{
		List<CourseChapterDto> chapterList = new ArrayList<CourseChapterDto>();
		try {
			chapterList = chapterNonlazyService.queryChapterListByCourseId(courseId);
		} catch (Exception e) {
			e.printStackTrace();
		}
		/*//TODO 联合测试时，需要删除
		for (CourseChapterDto courseChapterDto : chapterList) {
			courseChapterDto.setIsPass(1);
		}*/
		return chapterList;
	}
	

	/**
	 * 发布课程 根据courseId 修改state字段
	 * 
	 * @Description
	 * @author shisong
	 * @date 2016年10月25日 下午2:20:35
	 * @modifyNote
	 * @param courseId 课程ID
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/releaseCourse", method = RequestMethod.POST)
	private RemoteResult<CourseOpenDto> releaseCourse(@RequestParam(value = "courseId", required = false)final Long courseId){
		RemoteResult<CourseOpenDto> result = new ResultRequestAndParser<CourseOpenDto>("第六步发布课程",
				"treenity_sixthStep_releaseCourse", "发布课程", "releaseCourse") {

					@Override
					public RemoteResult<CourseOpenDto> request(Long curUserId) throws RemoteException {
						RemoteResult<CourseOpenDto> result = null;
						CourseOpenDto courseInfo = new CourseOpenDto();
						courseInfo = courseService.loadCourse(courseId);
						courseInfo.setState(0);
						courseInfo.setReleaseStatus(1);
						result = courseService.releaseCourse(courseInfo, curUserId);
						return result;
					}
		}.get();
		
		
		return result;
	}
	/*private Map<String, Object> releaseCourse(
			) {
		Long updateUser = this.getLoginUID();
		Map<String, Object> resultMap = new HashMap<String, Object>();

		CourseOpenDto courseInfo = new CourseOpenDto();
		if (null != courseId) {
			try {
				courseInfo = courseService.loadCourse(courseId);
				courseInfo.setState(0);
				courseInfo.setReleaseStatus(1);
				courseService.updateCourseInfo(courseInfo, updateUser);
				resultMap.put("result", true);
			} catch (Exception e) {
				e.printStackTrace();
				resultMap.put("result", false);
			}
		}

		return resultMap;
	}*/
	@Override
	protected LoggerCollectionEnum getCollectionEnum() {
		return LoggerCollectionEnum.releaseCourseCollection;
	}
}
