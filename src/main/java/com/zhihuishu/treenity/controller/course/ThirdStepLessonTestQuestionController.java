package com.zhihuishu.treenity.controller.course;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;

import com.zhihuishu.micro.course.openapi.course.LessonTestQuestionOpenService;
import com.zhihuishu.micro.course.openapi.course.dto.LessonTestQuestionOpenDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.controller.BaseController;
import com.zhihuishu.treenity.controller.BaseController.ResultRequestAndParser;
import com.zhihuishu.treenity.util.DataFormatConversionTotal;

/**
 * 视频弹题关联
 * @author JinXing
 * @date 2016年10月25日 上午10：22
 * */
@Controller
@RequestMapping("/course/thirdStep/lessonTestQuestion")
public class ThirdStepLessonTestQuestionController extends BaseController{

	@Resource
	private LessonTestQuestionOpenService lessonTestQuestionOpenService;
	
	/**
	 * 获取视频打点信息List
	 * @param lessonId 节Id
	 * @param smallLessonId 小节id	
	 * */
	@ResponseBody
	@RequestMapping("/getLessonTestQuestionListInfo")
	public RemoteResult<List<LessonTestQuestionOpenDto>> getLessonTestQuestionListInfo(final LessonTestQuestionOpenDto lessonTestQuestionOpenDto){
		RemoteResult<List<LessonTestQuestionOpenDto>> result = new ResultRequestAndParser<List<LessonTestQuestionOpenDto>>("小节视频编辑-视频打点", "treenity_step3_lessonVideoEdit_lessonTestQuestion", "根据小节id获取视频打点列表信息", "getSubtitleListInfo") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
            	RemoteResult<List<LessonTestQuestionOpenDto>> rs = lessonTestQuestionOpenService.getLessonTestQuestionListInfo(lessonTestQuestionOpenDto);
                return rs;
            }
        }.get();
        
		return result;
	}
	
	/**
	 * 获取视频打点对象
	 * @param lessonTestQuestionId Id
	 * */
	@ResponseBody
	@RequestMapping(value="/getLessonTestQuestionInfo",method = {RequestMethod.POST, RequestMethod.GET})
	public RemoteResult<LessonTestQuestionOpenDto> getLessonTestQuestionInfo(final Integer lessonTestQuestionId){
		RemoteResult<LessonTestQuestionOpenDto> result = new ResultRequestAndParser<LessonTestQuestionOpenDto>("小节视频编辑-视频打点", "treenity_step3_lessonVideoEdit_lessonTestQuestion", "获取视频打点对象", "getSubtitle") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
            	RemoteResult<LessonTestQuestionOpenDto> rs = lessonTestQuestionOpenService.getLessonTestQuestionInfo(lessonTestQuestionId);
                return rs;
            }
        }.get();
        
		return result;
	}
	
	/**
	 * 删除弹题关联对象
	 * @param id 弹题关联id
	 * @return
	 * */
	@ResponseBody
	@RequestMapping(value="/remove",method = {RequestMethod.POST, RequestMethod.GET})
	public RemoteResult<Integer> remove(final Integer lessonTestQuestionId){
		RemoteResult<Integer> result = new ResultRequestAndParser<Integer>("小节视频编辑-视频打点", "treenity_step3_lessonVideoEdit_lessonTestQuestion", "删除视频打点", "deleteSubtitle") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
            	RemoteResult<Integer> rs = lessonTestQuestionOpenService.remove(lessonTestQuestionId);
                return rs;
            }
        }.get();
        
		return result;
	}
	
	/**
	 * 保存弹题关联对象
	 * @param timer	小节视频打点时间
	 * @param lessonId 节id
	 * @param testQuestionId 试题id
	 * @param smallLessonId  小节id
	 * @return
	 * */
	@ResponseBody
	@RequestMapping(value="/save",method = {RequestMethod.POST, RequestMethod.GET})
	public RemoteResult<LessonTestQuestionOpenDto> save(final LessonTestQuestionOpenDto lessonTestQuestionOpenDto){
		RemoteResult<LessonTestQuestionOpenDto> result = new ResultRequestAndParser<LessonTestQuestionOpenDto>("小节视频编辑-视频打点", "treenity_step3_lessonVideoEdit_lessonTestQuestion", "获取视频打点对象", "getSubtitle") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
            	//将秒转成 00:00 日期格式
            	lessonTestQuestionOpenDto.setTimer(DataFormatConversionTotal.time_longToString(lessonTestQuestionOpenDto.getTime()));
            	RemoteResult<LessonTestQuestionOpenDto> rs = lessonTestQuestionOpenService.save(lessonTestQuestionOpenDto);
                return rs;
            }
        }.get();
        
		return result;
	}
	
	/**
	 * 修改弹题关联对象
	 * @param id 弹题关联id
	 * @param timer	小节视频打点时间
	 * @param lessonId 节id
	 * @param testQuestionId 试题id
	 * @param smallLessonId  小节id
	 * @return
	 * */
	@ResponseBody
	@RequestMapping(value="/update",method = {RequestMethod.POST, RequestMethod.GET})
	public RemoteResult<LessonTestQuestionOpenDto> update(final LessonTestQuestionOpenDto lessonTestQuestionOpenDto){
		RemoteResult<LessonTestQuestionOpenDto> result = new ResultRequestAndParser<LessonTestQuestionOpenDto>("小节视频编辑-视频打点", "treenity_step3_lessonVideoEdit_lessonTestQuestion", "获取视频打点对象", "getSubtitle") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
            	//将秒转成 00:00 日期格式
            	lessonTestQuestionOpenDto.setTimer(DataFormatConversionTotal.time_longToString(lessonTestQuestionOpenDto.getTime()));
            	RemoteResult<LessonTestQuestionOpenDto> rs = lessonTestQuestionOpenService.update(lessonTestQuestionOpenDto);
                return rs;
            }
        }.get();
        
		return result;
	}
	
}
