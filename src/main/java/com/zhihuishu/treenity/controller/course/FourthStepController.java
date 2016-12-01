package com.zhihuishu.treenity.controller.course;


import java.util.List;

import javax.servlet.http.HttpServletRequest;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.zhihuishu.micro.course.openapi.course.MeetCourseOpenService;
import com.zhihuishu.micro.course.openapi.course.dto.MeetCourseOpenDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.controller.BaseController;
import com.zhihuishu.treenity.log.LoggerCollectionEnum;

/**
 * 建课第四步
 * @author Rain
 * @time 2016年9月9日-下午2:04:20
 *
 */
@Controller
@RequestMapping("/course")
public class FourthStepController extends BaseController {
	
	@Autowired
	private MeetCourseOpenService meetCourseOpenService;
	
	/**
	 * 跳转页面
	 * @author Rain
	 * @time 2016年9月9日-下午2:10:03
	 * @return
	 */
	@RequestMapping("/fourStep")
	private ModelAndView index(HttpServletRequest requset,Long courseId) {
		ModelAndView model = new ModelAndView();
		try {
			
			if(this.isLoginUserByCourseId(model, courseId, requset.getSession())){
				return model;
			}
			
			RemoteResult<List<MeetCourseOpenDto>> result = meetCourseOpenService.getMeetCourseList(courseId);
			if (result.isSuccess()){
				model.addObject("MeetCourseDtoList", result.getResult() == null ? new RemoteResult<List<MeetCourseOpenDto>>() : result.getResult() );
				model.addObject("courseId", courseId);
			}
			
		} catch (RemoteException e) {
			e.printStackTrace();
		}
		model.setViewName("/course/fourthStep");
		return model; 
	}			
	
	/**
	 * 创建或者修改见面课
	 * @author Rain
	 * @time 2016年11月21日-下午4:39:07
	 * @param dto
	 * @return
	 */
	@ResponseBody
    @RequestMapping("/fourStep/saveOrUpdate")
    public RemoteResult<MeetCourseOpenDto> saveOrUpdate(final MeetCourseOpenDto dto) {
        RemoteResult<MeetCourseOpenDto> result = new ResultRequestAndParser<MeetCourseOpenDto>("第4步见面课", "treenity_fourthStep_meetCourse", "创建或者修改", "saveOrUpdate") {
            @Override
            public RemoteResult<MeetCourseOpenDto> request(Long curUserId) throws RemoteException {
            	RemoteResult<MeetCourseOpenDto> result = null;
            	if (StringUtils.isEmpty(dto.getMeetCourseId())) {
    				result = meetCourseOpenService.save(dto);
    			} else {
    				result = meetCourseOpenService.update(dto);
    			}
            	return result;
            }
        }.get();
        return result;
    }
	
	/**
	 * 删除见面课
	 * @author Rain
	 * @time 2016年11月21日-下午4:39:26
	 * @param meetCourseId
	 * @return
	 */
	@ResponseBody
    @RequestMapping("/fourStep/remove")
    public RemoteResult<Boolean> remove(final Long meetCourseId) {
        RemoteResult<Boolean> result = new ResultRequestAndParser<Boolean>("第4步见面课", "treenity_fourthStep_meetCourse", "删除见面课信息", "remove") {
            @Override
            public RemoteResult<Boolean> request(Long curUserId) throws RemoteException {
            	RemoteResult<Boolean> result = meetCourseOpenService.remove(meetCourseId);
            	return result;
            }
        }.get();
        return result;
    }
	
	/**
	 *  log 存入的表
	 */
	@Override
	protected LoggerCollectionEnum getCollectionEnum(){
        return LoggerCollectionEnum.meetCourseCollection;
    }
	
}