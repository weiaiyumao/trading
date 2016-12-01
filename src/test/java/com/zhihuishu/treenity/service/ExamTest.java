package com.zhihuishu.treenity.service;

import com.able.dto.QuestionForOverseasDto;
import com.able.onlineExam.openapi.overseas.IOverseasCourseService;
import com.zhihuishu.treenity.SpringIntegrationTestBase;
import org.junit.Test;

import javax.annotation.Resource;

/**
 * @author Jiangli
 * @date 2016/10/27 9:01
 */
public class ExamTest extends SpringIntegrationTestBase {
    Integer courseId = 2006663;
    Integer chapterId = 122739;
    Integer userId = -1;
    Integer  questionId=97430;
    Integer  examId=97430;
    Integer  optionId=97304;

    @Resource
    IOverseasCourseService treenityOverseasCourseService;

  /*  @Test
    public void func() {
        System.out.println("sdfd");
        System.out.println(treenityOverseasCourseService);
        ExamForOverseasDto finalExamByCourseId = treenityOverseasCourseService.getFinalExamByCourseId(courseId, userId);
        System.out.println(BeanHelper.describe(finalExamByCourseId));
    }*/

    @Test
    public void func2() {
        System.out.println("sdfd");
        System.out.println(treenityOverseasCourseService);
      /*  ExamForOverseasDto examForOverseasDto = new ExamForOverseasDto();
        examForOverseasDto.setCourseId(courseId);
        examForOverseasDto.setType(2);
        examForOverseasDto.setChapterId(chapterId);*/
       // examForOverseasDto.setOrderNumber(1);
        try {
        	treenityOverseasCourseService.deleteQuestion(questionId, examId, userId);
           // System.out.println(a);
        } catch (Exception e) {
            e.printStackTrace();
        }

    }
}
