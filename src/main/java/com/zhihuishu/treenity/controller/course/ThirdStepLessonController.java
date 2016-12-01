package com.zhihuishu.treenity.controller.course;


import com.zhihuishu.micro.course.openapi.course.CourseLessonOpenService;
import com.zhihuishu.micro.course.openapi.course.dto.CourseLessonDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.controller.BaseController;
import com.zhihuishu.treenity.log.LoggerCollectionEnum;
import org.springframework.stereotype.Controller;
import org.springframework.web.bind.annotation.RequestMapping;
import org.springframework.web.bind.annotation.RequestMethod;
import org.springframework.web.bind.annotation.RequestParam;
import org.springframework.web.bind.annotation.ResponseBody;

import javax.annotation.Resource;
import java.util.List;

/***
 * @author jiangli
 *
 */
@Controller
@RequestMapping("/course/thirdStep/lesson")
public class ThirdStepLessonController extends BaseController {


    @Resource
    private CourseLessonOpenService treenityCourseLessonOpenService;


    @ResponseBody
    @RequestMapping("/list")
    public RemoteResult<List<CourseLessonDto>> chapterList(@RequestParam(value = "courseId", required = false) final Long courseId) {
        RemoteResult<List<CourseLessonDto>> listRemoteResult = new ResultRequestAndParser<List<CourseLessonDto>>("节列表", "treenity_step3_lessonList", "查询", "query") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
                RemoteResult<List<CourseLessonDto>> rs = treenityCourseLessonOpenService.queryListByCourseId(courseId);
                return rs;
            }
        }.get();
        return listRemoteResult;
    }

    @Override
    protected LoggerCollectionEnum getCollectionEnum() {
        return LoggerCollectionEnum.lessonCollection;
    }

    @ResponseBody
    @RequestMapping("/create")
    public RemoteResult<CourseLessonDto> chapterCreate(final CourseLessonDto dto) {
        RemoteResult<CourseLessonDto> result = new ResultRequestAndParser<CourseLessonDto>("节", "treenity_step3_lesson", "创建", "create") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
                RemoteResult<CourseLessonDto> rs = treenityCourseLessonOpenService.createByDto(dto, curUserId);
                return rs;
            }
        }.get();
        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/delete", method = {RequestMethod.POST, RequestMethod.GET})
    public RemoteResult<Void> chapterDelete(final Long lessonId, final String sortList) {
        final List<CourseLessonDto> courseChapterDtos = stringToDtoList(sortList, CourseLessonDto.class);

        RemoteResult<Void> result = new ResultRequestAndParser<Void>("节", "treenity_step3_lesson", "删除", "delete") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
                RemoteResult<Void> rs = treenityCourseLessonOpenService.deleteById(lessonId.intValue(), curUserId);
                treenityCourseLessonOpenService.sortByDtoList(courseChapterDtos, curUserId);
                return rs;
            }
        }.get();
        return result;
    }

    @ResponseBody
    @RequestMapping("/update")
    public RemoteResult<Void> chapterUpdate(final CourseLessonDto chapter) {
        RemoteResult<Void> result = new ResultRequestAndParser<Void>("节", "treenity_step3_lesson", "更新", "update") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
                RemoteResult<Void> rs = treenityCourseLessonOpenService.updateByDto(chapter, curUserId);
                return rs;
            }
        }.get();
        return result;
    }

    @ResponseBody
    @RequestMapping("/sort")
    public RemoteResult<Void> chapterSort(final String sortList) {
        final List<CourseLessonDto> chapterList = stringToDtoList(sortList, CourseLessonDto.class);

        RemoteResult<Void> result = new ResultRequestAndParser<Void>("节", "treenity_step3_lesson", "排序", "sort") {
            @Override
            public RemoteResult<Void> request(Long curUserId) throws RemoteException {
                RemoteResult<Void> rs = treenityCourseLessonOpenService.sortByDtoList(chapterList, curUserId);
                return rs;
            }
        }.get();
        return result;
    }


}
