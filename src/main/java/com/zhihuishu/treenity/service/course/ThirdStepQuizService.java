package com.zhihuishu.treenity.service.course;

import java.util.List;
import java.util.Map;

import com.able.dto.ExamForOverseasDto;
import com.able.dto.QuestionForOverseasDto;
import com.able.dto.QuestionOptionForOverseasDto;
import com.zhihuishu.remote.RemoteResult;
/**
 * 海外建课接口类
 * @description
 * @author zhouzha
 * @date: 2016年10月14日 上午9:56:16
 * @email zhouzha@able-elec.com
 * @version 
 * Copyright © 2003-2016 Zhihuishu. All rights reserved.
 */
public interface ThirdStepQuizService {

	/**
	 * 根据章ID列表查询章测试试卷列表
	  * @Description 
	  * @author zhouzha
	  * @date: 2016年10月13日 下午7:34:23
	  * @param chapterIdList 章id列表
	  * @param userId 用户id
	  * @return
	 */
	public List<ExamForOverseasDto> getExamListByChapterIdList(List<Integer> chapterIdList,
			Integer userId);
	/**
	 * 根据课程id 查询期末考试信息
	  * @Description 
	  * @author zhouzha
	  * @date: 2016年10月13日 下午7:37:05
	  * @param courseId 课程id
	  * @param userId 用户id
	  * @return
	 */
	public ExamForOverseasDto getFinalExamByCourseId(Integer courseId,Integer userId);
	/**
	 * 创建试卷
	  * @Description 
	  * @author zhouzha
	  * @date: 2016年10月14日 上午9:52:56
	  * @param examDto 试卷实体
	  * @param userId 用户id
	  * @return
	 */
	public Integer createExam(ExamForOverseasDto examDto,Integer userId);
	
	/**
	 * 根据试卷id删除试卷
	  * @Description 
	  * @author zhouzha
	  * @date: 2016年10月13日 下午7:55:46
	  * @param examId 试卷id
	  * @param userId 用户id
	 */
	public void deleteExamById(Integer examId,Integer userId);
	/**
	 * 添加题目
	  * @Description 
	  * @author zhouzha
	  * @date: 2016年10月13日 下午8:05:26
	  * @param questionDto 试题实体
	  * @param examId 试卷id
	  * @param userId 用户id
	  * @return
	 */
	public Integer saveQuestion(QuestionForOverseasDto questionDto,Integer examId,
			Integer userId);
	/**
	 * 删除题目
	  * @Description 
	  * @author zhouzha
	  * @date: 2016年10月13日 下午8:07:12
	  * @param questionId 试题id
	  * @param examId 所属试卷id
	  * @param userId 用户id
	 */
	public RemoteResult<Boolean> deleteQuestion(Integer questionId,Integer examId,Integer userId);
	/**
	 * 查询题目
	  * @Description 
	  * @author zhouzha
	  * @date: 2016年10月13日 下午8:08:42
	  * @param examId 试题所属试卷id
	  * @param questionId 试题id
	  * @param userId 用户id
	  * @return
	 */
	public QuestionForOverseasDto getQuestion(Integer examId,Integer questionId,
			Integer userId);
	/**
	 * 根据题目对象修改修改题目
	  * @Description 
	  * @author zhouzha
	  * @date: 2016年10月13日 下午8:11:10
	  * @param questionDto 试题实体
	  * @param userId 用户id
	  * @param examId 试卷id
	 */
	public void updateQuestion(QuestionForOverseasDto questionDto,Integer userId,Integer examId);
	/**
	 * 根据试卷id 试题对象集合 做排序修改
	  * @Description 
	  * @author zhouzha
	  * @date: 2016年10月13日 下午8:15:00
	  * @param examId 试题所属试卷id
	  * @param questionSortMap 试题id和序号map
	  * 	key：试题id的值 value：试题调整后的序号
	  * @param userId 用户id
	 */
	public RemoteResult<Boolean> updateQuestionSort(Integer examId,Map<Integer, Integer> questionSortMap,
			Integer userId);
	/**
	 * 新增选项
	  * @Description 
	  * @author zhouzha
	  * @date: 2016年10月26日 上午11:37:54
	  * @param userId 用户id
	  * @param type 选项所属试题类型
	  * @param examId 选项所属试题的所在试卷id
	  * @param option 选项实体
	 */
	public void saveQuestionOption(Integer userId,Integer type,Integer examId,
			QuestionOptionForOverseasDto option);
	/**
	 * 修改选项
	  * @Description 
	  * @author zhouzha
	  * @date: 2016年10月26日 上午11:42:21
	  * @param userId 用户id
	  * @param type 选型所属试题的类型
	  * @param option 选项实体
	 */
	public void updateQuestionOption(Integer userId,Integer type,
			QuestionOptionForOverseasDto option);
	/**
	 * 删除选型
	  * @Description 
	  * @author zhouzha
	  * @date: 2016年10月26日 上午11:43:23
	  * @param optionId 选项id
	  * @param type 选项所属试题的类型
	  * @param userId 用户id
	  * @param examId 选项所属试题所在试卷的id
	 */
	public RemoteResult<Boolean> deleteQuestionOption(Integer optionId,Integer type,Integer userId,Integer examId);
	/***
	 * 修改期末考试信息
	 * @param examDto 试卷实体
	 * @param userId  用户id
	 */
	public RemoteResult<Boolean> updateExam(ExamForOverseasDto examDto, Integer userId);
	
	/**
	 * 修改试题
	 * @param isDel
	 * @param questionDto
	 * @param optionListString
	 * @param optionId
	 * @param type
	 * @param examId
	 * @return
	 */
	public RemoteResult<Boolean> updateQuestion(String isDel,QuestionForOverseasDto questionDto,List<QuestionOptionForOverseasDto> optionList,Integer optionId,Integer type,Integer examId,Integer userId);

	/***
	 * 创建试卷/添加试题
	 * @param chapterId
	 *            章节ID
	 * @param whether
	 *            是否为章测试或者期末考试
	 * @param questionDto
	 *            试题对象
	 * @param examId
	 *            试卷id
	 * @param optionList
	 *            选项集合
	 * @param orderNumber
	 *            选项序号
	 * @param upQuestions
	 *            为空这不是视频弹题
	 * @return
	 */
	/*public RemoteResult<Map<String, Object>> saveQuestion( String upQuestions,
			Integer orderNumber, List<QuestionOptionForOverseasDto> optionList, Integer chapterId, String whether,
			QuestionForOverseasDto questionDto, Integer examId,Integer userId);
*/
	public RemoteResult<Map<String, Object>> saveQuestion(String upQuestions, 
			List<QuestionOptionForOverseasDto> optionList, 
			 QuestionForOverseasDto questionDto,
			Integer examId,Integer userId);
	/***
	 * 创建试卷
	 * @param chapterId
	 *            章节ID
	 * @param whether
	 *            是否为章测试或者期末考试
	 * @param orderNumber
	 *            选项序号
	 * @param courseId
	 *            课程id
	 * @return
	 */
	public RemoteResult<Integer> creatExamid(Integer orderNumber,
			Integer chapterId, String whether,Integer courseId,
			Integer userId);
};

