package com.zhihuishu.treenity.service.course.impl;

import java.util.List;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.zhihuishu.micro.course.openapi.course.LessonTestQuestionOpenService;
import com.zhihuishu.micro.course.openapi.course.dto.LessonTestQuestionOpenDto;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.service.course.LessonTestQuestionService;
import com.zhihuishu.treenity.service.impl.BaseService;
import com.zhihuishu.treenity.util.CheckObjectIsNull;

@Service("lessonTestQuestionService")
public class LessonTestQuestionServiceImpl extends BaseService implements LessonTestQuestionService{
	
	@Resource
	private LessonTestQuestionOpenService lessonTestQuestionOpenService;
	
	/**
	 * 加载数据
	 * 根据小节id、节id获取视频弹题关联List
	 * @param lessonId 节Id
	 * @param smallLessonId 小节id	
	 * @return
	 * */
	public RemoteResult<List<LessonTestQuestionOpenDto>> getLessonTestQuestionListInfo(LessonTestQuestionOpenDto lessonTestQuestionOpenDto){
		RemoteResult<List<LessonTestQuestionOpenDto>> result=new RemoteResult<List<LessonTestQuestionOpenDto>>();
		if(CheckObjectIsNull.isEmpty(lessonTestQuestionOpenDto)){
			result.setResult(null);
			result.setSuccess(false);
			return result;
		}
		
		result=lessonTestQuestionOpenService.getLessonTestQuestionListInfo(lessonTestQuestionOpenDto);	
		return result;
	}
	 /**
	 * 加载数据
	 * 根据id获取视频弹题关联对象
	 * @param lessonTestQuestionId 
	 * @return
	 * */
	public RemoteResult<LessonTestQuestionOpenDto> getLessonTestQuestionInfo(Integer lessonTestQuestionId){
		RemoteResult<LessonTestQuestionOpenDto> result=new RemoteResult<LessonTestQuestionOpenDto>();
		if(CheckObjectIsNull.isEmpty(lessonTestQuestionId)){
			result.setResult(null);
			result.setSuccess(false);
			return result;
		}
		
		result=lessonTestQuestionOpenService.getLessonTestQuestionInfo(lessonTestQuestionId);
		return result;
	}
 
	
	/**
	 * 保存弹题关联对象
	 * @param timer	小节视频打点时间
	 * @param lessonId 节id
	 * @param testQuestionId 试题id
	 * @param smallLessonId  小节id
	 * @param isDelete	是否删除  0.否1.是  默认保存0	
	 * @return
	 * */
	public RemoteResult<LessonTestQuestionOpenDto> save(LessonTestQuestionOpenDto lessonTestQuestionOpenDto){
		RemoteResult<LessonTestQuestionOpenDto> result=new RemoteResult<LessonTestQuestionOpenDto>();
		if(CheckObjectIsNull.isEmpty(lessonTestQuestionOpenDto)){
			result.setResult(null);
			result.setSuccess(false);
			return result;
		}
		
		result=lessonTestQuestionOpenService.save(lessonTestQuestionOpenDto);
		return result;
	}
	
	/**
	 * 删除弹题关联对象
	 * @param id 弹题关联id
	 * @return
	 * */
	public RemoteResult<Integer> remove(Integer id){
		RemoteResult<Integer> result=new RemoteResult<Integer>();
		if(CheckObjectIsNull.isEmpty(id)){
			result.setResult(null);
			result.setSuccess(false);
			return result;
		}
		
		result=lessonTestQuestionOpenService.remove(id);
		return result;
	}
	
	/**
	 * 修改弹题关联对象
	 * @param id 弹题关联id
	 * @param timer	小节视频打点时间
	 * @param lessonId 节id
	 * @param testQuestionId 试题id
	 * @param smallLessonId  小节id
	 * @param isDelete	是否删除  0.否1.是  默认保存0	
	 * @return
	 * */
	public RemoteResult<LessonTestQuestionOpenDto> update(LessonTestQuestionOpenDto lessonTestQuestionOpenDto){
		RemoteResult<LessonTestQuestionOpenDto> result=new RemoteResult<LessonTestQuestionOpenDto>();
		if(CheckObjectIsNull.isEmpty(lessonTestQuestionOpenDto) || CheckObjectIsNull.isEmpty(lessonTestQuestionOpenDto.getLessonTestQuestionId())){
			result.setResult(null);
			result.setSuccess(false);
			return result;
		}
		
		result=lessonTestQuestionOpenService.update(lessonTestQuestionOpenDto);
		return result;
	}
	
}
