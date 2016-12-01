package com.zhihuishu.treenity.controller.course;


import java.util.Set;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhihuishu.micro.bbs.openapi.onlineschool.dto.OnlinePostModelOpenDto;
import com.zhihuishu.micro.course.openapi.course.dto.CourseDataOpenDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.treenity.controller.BaseController;
import com.zhihuishu.treenity.log.LoggerCollectionEnum;
import com.zhihuishu.treenity.service.course.BBSCourseService;
import com.zhihuishu.treenity.service.course.CourseDataService;
import com.zhihuishu.treenity.util.RequestUtil;

import net.sf.json.JSONObject;
/**
 * 
 * @author shehuaiyang
 * @date 2016年10月28日 上午9:55:41
 * @modifyNote
 * @version 1.0
 */
@Controller
@RequestMapping("/course/thirdStep/courseData")
public class ThirdStepCourseDataController extends BaseController {
	
	
	@Resource
	private BBSCourseService bbsCourseService;
	
	@Resource
	private CourseDataService courseDataService;
	
     /**
	 * 查询章讨论列表
	 * @Description
	 * @author shehuaiyang
	 * @date 2016年10月18日 下午3:33:15
	 * @modifyNote 
	 * @param courseId
	 * @param chapterId
	 * @return
	 */
    @Override
    protected LoggerCollectionEnum getCollectionEnum() {
        return LoggerCollectionEnum.disscussionCollection;
    }
	@ResponseBody
	@RequestMapping("/create")
	public CourseDataOpenDto saveCourseData(CourseDataOpenDto courseDataOpenDto,Integer dataId) throws com.zhihuishu.micro.bbs.openapi.remote.RemoteException {
		String message = RequestUtil.fromRequestToJsonStr(this.getRequest());
		CourseDataOpenDto   courseData = new CourseDataOpenDto();
		try {
			courseData= courseDataService.saveData(courseDataOpenDto);
			OnlinePostModelOpenDto  onlinePostModelOpenDto    =  this.bbsCourseService.findModelById(dataId);
			Set<Integer> dataIds = onlinePostModelOpenDto.getDataIds();
			dataIds.add(courseData.getId());
			bbsCourseService.updateModel(onlinePostModelOpenDto);
			saveLogger(String.format("保存资料信息%s", message),LoggerCollectionEnum.courseDataCollection.getTableName(),"treenity_courseData","saveCourseData",null);
		} catch (RemoteException e) {
			saveLogger(String.format("保存资料信息，ID：%d，出现异常：%s", courseData.getId(),e.getMessage()),LoggerCollectionEnum.courseDataCollection.getTableName(),"treenity_courseData","saveCourseData",null);
		}
		return courseData;

	}
	/**
	 * 根据资料id删除资料
	 * @Description
	 * @author shehuaiyang
	 * @date 2016年10月24日 下午7:49:29
	 * @modifyNote 
	 * @param postId
	 * @return
	 * @throws com.zhihuishu.micro.bbs.openapi.remote.RemoteException
	 */
	@ResponseBody
	@RequestMapping("/delete")
	public String deleteCourseData(@RequestParam(value="discussionReferId",required=true)Integer discussionReferId) {
		String message = RequestUtil.fromRequestToJsonStr(this.getRequest());
		JSONObject jsonObject = new JSONObject();
		try {
			boolean b = courseDataService.delCourseData(discussionReferId);
			saveLogger(String.format("删除资料信息%s", message),LoggerCollectionEnum.courseDataCollection.getTableName(),"treenity_courseData","deleteCourseData",null);
            if(b){
            	jsonObject.put("success", "0");
            }else{
            	jsonObject.put("success", "1");
            }
		} catch (RemoteException e) {
			saveLogger(String.format("删除资料信息，ID：%d，出现异常：%s", discussionReferId,e.getMessage()),LoggerCollectionEnum.courseDataCollection.getTableName(),"treenity_courseData","deleteCourseData",null);
		}
		return jsonObject.toString();

	}
	
}
