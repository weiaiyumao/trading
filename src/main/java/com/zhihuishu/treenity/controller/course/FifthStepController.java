package com.zhihuishu.treenity.controller.course;


import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.zhihuishu.micro.course.openapi.course.MeetCourseOpenService;
import com.zhihuishu.micro.course.openapi.course.ScoreAssessRuleOpenService;
import com.zhihuishu.micro.course.openapi.course.dto.MeetCourseOpenDto;
import com.zhihuishu.micro.course.openapi.course.dto.ScoreAssessRuleOpenDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.controller.BaseController;
import com.zhihuishu.treenity.log.LoggerCollectionEnum;

/**
 * 建课第5步：考核标准
 * @author Rain
 * @time 2016年10月27日-上午10:04:25
 *
 */
@Controller
@RequestMapping("/course")
public class FifthStepController extends BaseController {
	
	@Autowired
	private ScoreAssessRuleOpenService scoreAssessRuleOpenService;
	
	@Autowired
	private MeetCourseOpenService meetCourseOpenService;
	
	/**
	 * 跳转 第五步成绩考核页面
	 * @author Rain
	 * @time 2016年11月21日-下午4:37:13
	 * @param requset
	 * @param courseId
	 * @return
	 */
	@RequestMapping("/fifthStep")
	private ModelAndView index(HttpServletRequest requset,Long courseId) {
		
		ModelAndView model = new ModelAndView();
		
		try {
			
			if(this.isLoginUserByCourseId(model, courseId, requset.getSession())){
				return model;
			}
			
		} catch (RemoteException e) {
			e.printStackTrace();
		}
		
		model.addObject("courseId", courseId);
		model.setViewName("/course/fifthStep");
		
		return model; 
	}
	
	/**
	 * 创建或者修改 成绩考核规则 
	 * @author Rain
	 * @time 2016年11月21日-下午4:34:32
	 * @param scoreAssessRuleOpenDto
	 * @return
	 */
	@ResponseBody
    @RequestMapping("/fiveStep/saveOrUpdate")
    public RemoteResult<ScoreAssessRuleOpenDto> saveOrUpdate(final ScoreAssessRuleOpenDto scoreAssessRuleOpenDto) {
        RemoteResult<ScoreAssessRuleOpenDto> result = new ResultRequestAndParser<ScoreAssessRuleOpenDto>("第五步考核标准", "treenity_fiveStep_scoreAssessRule", "创建或者修改", "saveOrUpdate") {
            @Override
            public RemoteResult<ScoreAssessRuleOpenDto> request(Long curUserId) throws RemoteException {
            	RemoteResult<ScoreAssessRuleOpenDto> result = scoreAssessRuleOpenService.saveOrUpdate(scoreAssessRuleOpenDto);
            	return result;
            }
        }.get();
        return result;
    }
	
	/**
	 * 根据id获取成绩考核对象
	 * @author Rain
	 * @time 2016年11月21日-下午4:35:12
	 * @param courseId
	 * @return
	 */
	@ResponseBody
    @RequestMapping("/fiveStep/findByCourseId")
    public RemoteResult<ScoreAssessRuleOpenDto> findByCourseId(final Long courseId) {
        RemoteResult<ScoreAssessRuleOpenDto> result = new ResultRequestAndParser<ScoreAssessRuleOpenDto>("第五步考核标准", "treenity_fiveStep_scoreAssessRule", "根据id获取考核对象", "findByCourseId") {
            @Override
            public RemoteResult<ScoreAssessRuleOpenDto> request(Long curUserId) throws RemoteException {
            	RemoteResult<ScoreAssessRuleOpenDto> result = scoreAssessRuleOpenService.findByCourseId(courseId);
            	return result;
            }
        }.get();
        return result;
    }
	
	/**
	 * 根据课程id获取见面课列表
	 * @author Rain
	 * @time 2016年11月21日-下午4:35:39
	 * @param courseId
	 * @return
	 */
	@ResponseBody
    @RequestMapping("/fiveStep/getMeetCourseList")
    public RemoteResult<List<MeetCourseOpenDto>> getMeetCourseList(final Long courseId) {
        RemoteResult<List<MeetCourseOpenDto>> listRemoteResult = new ResultRequestAndParser<List<MeetCourseOpenDto>>("第五步考核标准", "treenity_step3_lessonList", "获取见面课列表", "getMeetCourseList") {
            @Override
            public RemoteResult<List<MeetCourseOpenDto>> request(Long curUserId) throws RemoteException {
                RemoteResult<List<MeetCourseOpenDto>> rs = meetCourseOpenService.getMeetCourseList(courseId);
                return rs;
            }
        }.get();
        return listRemoteResult;
    }
	
	/**
	 * 修改见面课
	 * @author Rain
	 * @time 2016年11月21日-下午4:36:06
	 * @param meetCourseOpenDto
	 * @return
	 */
	@ResponseBody
    @RequestMapping("/fiveStep/updateMeetCourse")
    public RemoteResult<MeetCourseOpenDto> updateMeetCourse(final MeetCourseOpenDto meetCourseOpenDto) {
        RemoteResult<MeetCourseOpenDto> result = new ResultRequestAndParser<MeetCourseOpenDto>("第五步考核标准", "treenity_fiveStep_scoreAssessRule", "设置见面课考核分数", "updateMeetCourse") {
            @Override
            public RemoteResult<MeetCourseOpenDto> request(Long curUserId) throws RemoteException {
            	RemoteResult<MeetCourseOpenDto> result = meetCourseOpenService.update(meetCourseOpenDto);
            	return result;
            }
        }.get();
        return result;
    }
	
	/**
	 * log 存入的表
	 */
	@Override
	protected LoggerCollectionEnum getCollectionEnum(){
        return LoggerCollectionEnum.scoreAssessRuleCollection;
    }
	
}