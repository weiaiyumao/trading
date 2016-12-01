package com.zhihuishu.treenity.controller.course;

import java.util.ArrayList;
import java.util.HashMap;
import java.util.List;
import java.util.Map;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;

import org.springframework.stereotype.Controller;
import org.springframework.util.StringUtils;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.ResponseBody;
import org.springframework.web.servlet.ModelAndView;

import com.able.dto.ExamForOverseasDto;
import com.able.dto.QuestionForOverseasDto;
import com.able.dto.QuestionOptionForOverseasDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.controller.BaseController;
import com.zhihuishu.treenity.log.LoggerCollectionEnum;
import com.zhihuishu.treenity.service.course.ThirdStepQuizService;

/***
 * @author zhouzha
 *
 */
@Controller
@RequestMapping("/course/thirdStep/StepQuiz")
public class ThirdStepQuizController extends BaseController {
	@Resource
	private ThirdStepQuizService thirdStepQuizService;

	/***
	 * 添加试题
	 * @param questionDto
	 *            试题对象
	 * @param examId
	 *            试卷id
	 * @param optionListString
	 *            选项集合
	 * @param upQuestions
	 *            为空这不是视频弹题
	 * @return   
	 */
	@ResponseBody
	@RequestMapping(value = "/saveQuestion", method = RequestMethod.POST)
	public RemoteResult<Map<String, Object>> saveQuestion(final String upQuestions,
			final String optionListString,
			final QuestionForOverseasDto questionDto,
			final Integer examId){
			final Integer userId = Integer.parseInt(getLoginUID().toString());
			List<QuestionOptionForOverseasDto> optionLists = new ArrayList<QuestionOptionForOverseasDto>();
			if (!StringUtils.isEmpty(optionListString)){
				optionLists = stringToDtoList(optionListString,QuestionOptionForOverseasDto.class);
			}
			final List<QuestionOptionForOverseasDto> optionList = optionLists;
			
		RemoteResult<Map<String, Object>> result = new ResultRequestAndParser<Map<String, Object>>("第三步试卷",
				"treenity_thirdStep_ThirdStepQuiz", "添加试题", "saveQuestion") {
			@Override
			public RemoteResult<Map<String, Object>> request(Long curUserId) throws RemoteException {
				RemoteResult<Map<String, Object>> result = thirdStepQuizService.saveQuestion(upQuestions, optionList, questionDto, examId, userId);
				return result;
			}
		}.get();

		return result;
	}
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
	@ResponseBody
	@RequestMapping(value = "/creatExamid", method = RequestMethod.POST)
	public RemoteResult<Integer> creatExamid(final Integer orderNumber,
			final	Integer chapterId,final String whether,final Integer courseId
			){
		final Integer userId = Integer.parseInt(getLoginUID().toString());
		RemoteResult<Integer> result = new ResultRequestAndParser<Integer>("第三步试卷",
				"treenity_thirdStep_ThirdStepQuiz", "创建试卷", "creatExamid") {
			@Override
			public RemoteResult<Integer> request(Long curUserId) throws RemoteException {
				RemoteResult<Integer> result = thirdStepQuizService.creatExamid(orderNumber, chapterId, whether, courseId, userId);
						
				return result;
			}
		}.get();
		
		return result;
	}
	
	
	/***
	 * 加载试题
	 * 
	 * @param examId
	 *            试卷id
	 * @param questionId
	 *            试题id
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/getQuestion", method = RequestMethod.POST)
	public QuestionForOverseasDto getQuestion(Integer examId, Integer questionId) {
		Integer userId = Integer.parseInt(this.getLoginUID().toString());
		QuestionForOverseasDto questionForOverseasDto = thirdStepQuizService.getQuestion(examId, questionId, userId);
		return questionForOverseasDto;
	}

	/***
	 * 删除试题
	 * 
	 * @param questionId
	 * @param examId
	 * @param effectedJsonArray
	 *            发生改变的json对象
	 */
	@ResponseBody
	@RequestMapping(value = "/deleteQuestion", method = RequestMethod.POST)
	public RemoteResult<Boolean> deleteQuestion(final Integer questionId, final Integer examId,
			final String effectedJsonArray) {
		  	final Integer userId = Integer.parseInt(getLoginUID().toString());
		  	
		RemoteResult<Boolean> result = new ResultRequestAndParser<Boolean>("第三步删除试题",
				"treenity_thirdStep_ThirdStepQuiz", "删除试题", "deleteQuestion") {
			@Override
			public RemoteResult<Boolean> request(Long curUserId) throws RemoteException {
				RemoteResult<Boolean> result = thirdStepQuizService.deleteQuestion(questionId, examId, userId);
				updateQuestionSort(examId, effectedJsonArray);
				return result;
			}
		}.get();

		return result;
	}

	/***
	 * 试题排序
	 * 
	 * @param examId
	 * @param changed
	 *            发生改变的json对象
	 * @param questionSortMap
	 *            key：试题id的值 value：试题调整后的序号
	 */
	@ResponseBody
	@RequestMapping(value = "/updateQuestionSort", method = RequestMethod.POST)
	public RemoteResult<Boolean> updateQuestionSort(final Integer examId, final String changed) {
		// 没有 发生改变
		if (changed.equals("")) {
			return new RemoteResult<Boolean>();
		}

		final Integer userId = Integer.parseInt(getLoginUID().toString());
		final Map<Integer, Integer> questionSortMap = new HashMap<Integer, Integer>();
		List<QuestionOptionForOverseasDto> optionList = stringToDtoList(changed, QuestionOptionForOverseasDto.class);
		for (QuestionOptionForOverseasDto questionOptionForOverseasDto : optionList) {
			questionSortMap.put(questionOptionForOverseasDto.getId(), questionOptionForOverseasDto.getSort() + 1);
		}
		
		RemoteResult<Boolean> result = new ResultRequestAndParser<Boolean>("第三步试题排序",
				"treenity_thirdStep_ThirdStepQuiz", " 试题排序", "updateQuestionSort") {
			@Override
			public RemoteResult<Boolean> request(Long curUserId) throws RemoteException {
				RemoteResult<Boolean> result = thirdStepQuizService.updateQuestionSort(examId, questionSortMap, userId);
				return result;
			}
		}.get();
		
		return result;
	}

	/***
	 * 修改试题
	 * 
	 * @param optionId
	 *            选项id
	 * @param type
	 *            选项所属试题的类型
	 * @param userId
	 *            用户id
	 * @param examId
	 *            选项所属试题所在试卷的id
	 * @param optionListString
	 *            选项集合json字符串
	 * @param questionDto
	 *            试题实体
	 * @param isDel
	 *            判断是否为删除选项 0代表删除
	 */
	@ResponseBody
	@RequestMapping(value = "/updateQuestion", method = RequestMethod.POST)
	public RemoteResult<Boolean> updateQuestion(final String isDel, final QuestionForOverseasDto questionDto,
			final String optionListString, final Integer optionId, final Integer type, final Integer examId) {
			final Integer userId = Integer.parseInt(this.getLoginUID().toString());
			final List<QuestionOptionForOverseasDto> optionList = new ArrayList<QuestionOptionForOverseasDto>();
		if (!StringUtils.isEmpty(optionListString)) {
			optionList.addAll(stringToDtoList(optionListString, QuestionOptionForOverseasDto.class));
		}
		RemoteResult<Boolean> result = new ResultRequestAndParser<Boolean>("第三步修改试题",
				"treenity_thirdStep_ThirdStepQuiz", "修改试题", "updateQuestion") {
			@Override
			public RemoteResult<Boolean> request(Long curUserId) throws RemoteException {
				RemoteResult<Boolean> result = thirdStepQuizService.updateQuestion(isDel, questionDto, optionList,
						optionId, type, examId, userId);
				return result;
			}
		}.get();
		return result;
	}

	/**
	 * 期末考试修改
	 * 
	 * @param examDto
	 * @return
	 */
	@ResponseBody
	@RequestMapping(value = "/updateExam", method = RequestMethod.POST)
	public RemoteResult<Boolean> updateExam(final ExamForOverseasDto examDto) {
		RemoteResult<Boolean> result = new ResultRequestAndParser<Boolean>("第三步期末考试",
				"treenity_thirdStep_ThirdStepQuiz", "期末考试修改", "updateExam") {
			@Override
			public RemoteResult<Boolean> request(Long curUserId) throws RemoteException {
				RemoteResult<Boolean> result = thirdStepQuizService.updateExam(examDto,
						Integer.getInteger(getLoginUID().toString()));
				return result;
			}
		}.get();
		return result;
	}

	@ResponseBody
	@RequestMapping(value = "/toupdatapopup", method = { RequestMethod.POST, RequestMethod.GET })
	private ModelAndView toSecondStep(Long courseId, HttpServletRequest request) throws RemoteException {
		ModelAndView mav = new ModelAndView();
		mav.setViewName("/course/third/updata-popup");
		return mav;
	}

	@Override
	protected LoggerCollectionEnum getCollectionEnum() {
		return LoggerCollectionEnum.zTestQurstionCollection;
	}

}
