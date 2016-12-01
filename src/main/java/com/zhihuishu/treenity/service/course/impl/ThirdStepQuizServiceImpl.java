package com.zhihuishu.treenity.service.course.impl;

import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;

import com.able.dto.ExamForOverseasDto;
import com.able.dto.QuestionForOverseasDto;
import com.able.dto.QuestionOptionForOverseasDto;
import com.able.onlineExam.openapi.overseas.IOverseasCourseService;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.service.course.ThirdStepQuizService;

/***
 * @author zhouzha 章节测试 期末考试
 */
@Service("thirdStepQuizService")
public class ThirdStepQuizServiceImpl implements ThirdStepQuizService {
	@Resource
	public IOverseasCourseService treenityOverseasCourseService;

	@Override
	public List<ExamForOverseasDto> getExamListByChapterIdList(List<Integer> chapterIdList, Integer userId) {
		List<ExamForOverseasDto> examForOverseasDtos = treenityOverseasCourseService
				.getExamListByChapterIdList(chapterIdList, userId);
		return examForOverseasDtos;
	}

	@Override
	public ExamForOverseasDto getFinalExamByCourseId(Integer courseId, Integer userId) {
		ExamForOverseasDto examForOverseasDto = treenityOverseasCourseService.getFinalExamByCourseId(courseId, userId);
		return examForOverseasDto;
	}

	@Override
	public Integer createExam(ExamForOverseasDto examDto, Integer userId) {
		Integer examid = treenityOverseasCourseService.createExam(examDto, userId);
		return examid;
	}

	@Override
	public void deleteExamById(Integer id, Integer userId) {
		treenityOverseasCourseService.deleteExamById(id, userId);

	}

	@Override
	public Integer saveQuestion(QuestionForOverseasDto questionDto, Integer examId, Integer userId) {
		Integer id = treenityOverseasCourseService.saveQuestion(questionDto, examId, userId);
		return id;
	}

	@Override
	public RemoteResult<Boolean> deleteQuestion(Integer questionId, Integer examId, Integer userId) {

		RemoteResult<Boolean> result = new RemoteResult<Boolean>();
		try {
			treenityOverseasCourseService.deleteQuestion(questionId, examId, userId);
			result.setSuccess(true);
			result.setResult(true);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setResult(false);
			result.setExceptionStack(e);
		}
		return result;
	}

	@Override
	public QuestionForOverseasDto getQuestion(Integer examId, Integer questionId, Integer userId) {
		QuestionForOverseasDto questionForOverseasDto = treenityOverseasCourseService.getQuestion(examId, questionId,
				userId);

		return questionForOverseasDto;
	}

	@Override
	public RemoteResult<Boolean> updateQuestionSort(Integer examId, Map<Integer, Integer> questionSortMap,
			Integer userId) {

		RemoteResult<Boolean> result = new RemoteResult<Boolean>();
		try {
			treenityOverseasCourseService.updateQuestionSort(examId, questionSortMap, userId);
			result.setSuccess(true);
			result.setResult(true);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setResult(false);
			result.setExceptionStack(e);
		}
		return result;
	}

	@Override
	public void updateQuestion(QuestionForOverseasDto questionDto, Integer userId, Integer examId) {
		treenityOverseasCourseService.updateQuestion(questionDto, userId, examId);

	}

	@Override
	public void saveQuestionOption(Integer userId, Integer type, Integer examId, QuestionOptionForOverseasDto option) {
		treenityOverseasCourseService.saveQuestionOption(userId, type, examId, option);
	}

	@Override
	public void updateQuestionOption(Integer userId, Integer type, QuestionOptionForOverseasDto option) {
		treenityOverseasCourseService.updateQuestionOption(userId, type, option);
	}

	@Override
	public RemoteResult<Boolean> deleteQuestionOption(Integer optionId, Integer type, Integer userId, Integer examId) {
		treenityOverseasCourseService.deleteQuestionOption(optionId, type, userId, examId);
		RemoteResult<Boolean> result = new RemoteResult<Boolean>();
		try {
			treenityOverseasCourseService.deleteQuestionOption(optionId, type, userId, examId);
			result.setSuccess(true);
			result.setResult(true);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setResult(false);
			result.setExceptionStack(e);
		}
		return result;
	}

	@Override
	public RemoteResult<Boolean> updateExam(ExamForOverseasDto examDto, Integer userId) {
		RemoteResult<Boolean> result = new RemoteResult<Boolean>();
		try {
			treenityOverseasCourseService.updateExam(examDto, userId);
			result.setSuccess(true);
			result.setResult(true);
		} catch (Exception e) {
			result.setSuccess(false);
			result.setResult(false);
			result.setExceptionStack(e);
		}
		return result;
	}

	@Override
	public RemoteResult<Boolean> updateQuestion(String isDel, QuestionForOverseasDto questionDto,
			List<QuestionOptionForOverseasDto> optionList, Integer optionId, Integer type, Integer examId,
			Integer userId) {

		RemoteResult<Boolean> result = new RemoteResult<Boolean>();
		result.setResult(true);
		result.setSuccess(true);

		Assert.notNull(isDel, "isDel must not be null");

		try {

			// 删除选项
			if (isDel.equals("0")) {
				treenityOverseasCourseService.deleteQuestionOption(optionId, type, userId, examId);
				return result;
			}

			// 修改试题
			questionDto.setUserId(userId);
			treenityOverseasCourseService.updateQuestion(questionDto, userId, examId);

			if (CollectionUtils.isEmpty(optionList)) {
				return result;
			}

			for (QuestionOptionForOverseasDto option : optionList) {

				if (option.getId() != 0) {
					// 修改选项
					option.setQuestionId(questionDto.getId());
					treenityOverseasCourseService.updateQuestionOption(userId, type, option);
				}

				if (option.getId() == 0) {
					// 新增选项
					option.setId(null);
					option.setQuestionId(questionDto.getId());
					treenityOverseasCourseService.saveQuestionOption(userId, type, examId, option);
				}
			}

		} catch (Exception e) {
			result.setResult(false);
			result.setSuccess(false);
		}

		return result;
	}

	public RemoteResult<Map<String, Object>> saveQuestion1(String upQuestions, Integer orderNumber,
			List<QuestionOptionForOverseasDto> optionList, Integer chapterId, String whether, QuestionForOverseasDto questionDto,
			Integer examId,Integer userId) {
		RemoteResult<Map<String, Object>> result = new RemoteResult<Map<String,Object>>();
		result.setSuccess(true);
		 Integer newexamid=null;
		try {
			 if (!CollectionUtils.isEmpty(optionList)) {
				 questionDto.setOptionList(optionList);
			 }
			 
			 Map<String, Object> mapid = new HashMap<String, Object>();
			 // 试卷不存在
			 if (examId == null && upQuestions == null) {
				 
				 ExamForOverseasDto examDto = new ExamForOverseasDto();
				 
				 // 是否为期末试卷 或者为章节测试 1:期末考试 2：章测试
				 if (whether.equals("1")) { 
					 examDto.setType(1);
				 } else if (whether.equals("2")) {
					 examDto.setType(2);
					 examDto.setChapterId(chapterId);
					 examDto.setOrderNumber(orderNumber);
				 }
				 
				 examDto.setCourseId(questionDto.getCourseId());
				 examDto.setTotalQuestionNumber(0);
				 examDto.setTotalScore("0");
				 
				  newexamid = treenityOverseasCourseService.createExam(examDto, userId);
				 examId = newexamid;
			 }
			 
			 
			 mapid.put("examId", examId);
			 Integer questionid = null;
			 if (!CollectionUtils.isEmpty(optionList)||questionDto.getName()!=null) {
				 questionid = treenityOverseasCourseService.saveQuestion(questionDto, examId,
				 userId);
			 }
			 
			 mapid.put("questionid", questionid);
			 mapid.put("name", questionDto.getName());
			 mapid.put("explain", questionDto.getExplain());
			 mapid.put("score", questionDto.getScore());
			 mapid.put("result", questionDto.getResult());
			 mapid.put("optionList", questionDto.getOptionList());

			 result.setResult(mapid);
		} catch (Exception e) {
			result.setResult(null);
			result.setSuccess(false);
		}
		
		return result;
	}
	@Override
	public RemoteResult<Integer> creatExamid(Integer orderNumber,
			Integer chapterId, String whether,Integer courseId,
			Integer userId) {
		RemoteResult<Integer> result = new RemoteResult<Integer>();
		try {
				 ExamForOverseasDto examDto = new ExamForOverseasDto();
				 // 是否为期末试卷 或者为章节测试 1:期末考试 2：章测试
				 if (whether.equals("1")) { 
					 examDto.setType(1);
				 } else if (whether.equals("2")) {
					 examDto.setType(2);
					 examDto.setChapterId(chapterId);
					 examDto.setOrderNumber(orderNumber);
				 }
				 
				 examDto.setCourseId(courseId);
				 examDto.setTotalQuestionNumber(0);
				 examDto.setTotalScore("0");
				 Integer  newexamid = treenityOverseasCourseService.createExam(examDto, userId);
				 result.setResult(newexamid);
		} catch (Exception e) {
			result.setResult(null);
			result.setSuccess(false);
		}
		
		return result;
	}
	
	
	@Override
	public RemoteResult<Map<String, Object>> saveQuestion(String upQuestions, 
			List<QuestionOptionForOverseasDto> optionList, 
			 QuestionForOverseasDto questionDto,
			Integer examId,Integer userId) {
		RemoteResult<Map<String, Object>> result = new RemoteResult<Map<String,Object>>();
		result.setSuccess(true);
		try {
			 if (!CollectionUtils.isEmpty(optionList)) {
				 questionDto.setOptionList(optionList);
			 }
			 
			 Map<String, Object> mapid = new HashMap<String, Object>();
			 
			  Integer    questionid = treenityOverseasCourseService.saveQuestion(questionDto, examId,userId);
		    mapid.put("examId", examId);
			 mapid.put("questionid", questionid);
			 mapid.put("name", questionDto.getName());
			 mapid.put("explain", questionDto.getExplain());
			 mapid.put("score", questionDto.getScore());
			 mapid.put("result", questionDto.getResult());
			 mapid.put("optionList", questionDto.getOptionList());

			 result.setResult(mapid);
		} catch (Exception e) {
			result.setResult(null);
			result.setSuccess(false);
		}
		
		return result;
	}
}
