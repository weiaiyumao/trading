package com.zhihuishu.treenity.service.course;

import java.util.List;

import com.zhihuishu.micro.course.openapi.course.dto.LessonTestQuestionOpenDto;
import com.zhihuishu.remote.RemoteResult;

/***
 * @author JinXing
 * */
public interface LessonTestQuestionService {
	/**
	 * 加载数据
	 * 根据小节id、节id获取视频弹题关联List
	 * @param lessonId 节Id
	 * @param smallLessonId 小节id	
	 * @return
	 * */
	public RemoteResult<List<LessonTestQuestionOpenDto>> getLessonTestQuestionListInfo(LessonTestQuestionOpenDto lessonTestQuestionOpenDto);
	 /**
	 * 加载数据
	 * 根据id获取视频弹题关联对象
	 * @param lessonTestQuestionId 
	 * @return
	 * */
	public RemoteResult<LessonTestQuestionOpenDto> getLessonTestQuestionInfo(Integer lessonTestQuestionId);	 
 
	
	/**
	 * 保存弹题关联对象
	 * @param timer	小节视频打点时间
	 * @param lessonId 节id
	 * @param testQuestionId 试题id
	 * @param smallLessonId  小节id
	 * @param isDelete	是否删除  0.否1.是  默认保存0	
	 * @return
	 * */
	public RemoteResult<LessonTestQuestionOpenDto> save(LessonTestQuestionOpenDto lessonTestQuestionOpenDto);
	
	/**
	 * 删除弹题关联对象
	 * @param id 弹题关联id
	 * @return
	 * */
	public RemoteResult<Integer> remove(Integer id);
	
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
	public RemoteResult<LessonTestQuestionOpenDto> update(LessonTestQuestionOpenDto lessonTestQuestionOpenDto);
}
