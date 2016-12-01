package com.zhihuishu.treenity.controller.course;


import com.zhihuishu.micro.course.openapi.course.CourseLessonVideoOpenService;
import com.zhihuishu.micro.course.openapi.course.dto.CourseLessonVideoDto;
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
@RequestMapping("/course/thirdStep/lessonVideo")
public class ThirdStepLessonVideoController extends BaseController {

    @Resource
    private CourseLessonVideoOpenService treenityCourseLessonVideoOpenService;

    @Override
    protected LoggerCollectionEnum getCollectionEnum() {
        return LoggerCollectionEnum.lessonVideoCollection;
    }

    @ResponseBody
    @RequestMapping("/list")
    public RemoteResult<List<CourseLessonVideoDto>> chapterList(@RequestParam(value = "courseId", required = false) final Long courseId) {
        RemoteResult<List<CourseLessonVideoDto>> listRemoteResult = new ResultRequestAndParser<List<CourseLessonVideoDto>>("小节列表", "treenity_step3_lessonVideoList", "查询", "query") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
                RemoteResult<List<CourseLessonVideoDto>> rs = treenityCourseLessonVideoOpenService.queryListByCourseId(courseId);
                return rs;
            }
        }.get();
        return listRemoteResult;
    }

    @ResponseBody
    @RequestMapping("/detail")
    public RemoteResult<CourseLessonVideoDto> lessonVideoDetail(@RequestParam(value = "lessonVideoId", required = false) final Integer lessonVideoId) {
        RemoteResult<CourseLessonVideoDto> listRemoteResult = new ResultRequestAndParser<CourseLessonVideoDto>("小节详情", "treenity_step3_lessonVideoDetail", "查询", "query") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
                RemoteResult<CourseLessonVideoDto> rs = treenityCourseLessonVideoOpenService.queryDetailByLvId(lessonVideoId);
                return rs;
            }
        }.get();
        return listRemoteResult;
    }

    @ResponseBody
    @RequestMapping(value = "/create",method = {RequestMethod.POST,RequestMethod.GET})
    public RemoteResult<CourseLessonVideoDto> chapterCreate(final CourseLessonVideoDto dto) {
        RemoteResult<CourseLessonVideoDto> result = new ResultRequestAndParser<CourseLessonVideoDto>("小节", "treenity_step3_lessonVideo", "创建", "create") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
                RemoteResult<CourseLessonVideoDto> rs = treenityCourseLessonVideoOpenService.createByDto(dto, curUserId);
                return rs;
            }
        }.get();
        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/replace",method = {RequestMethod.POST,RequestMethod.GET})
    public RemoteResult<CourseLessonVideoDto> videoReplace(final CourseLessonVideoDto dto) {
        final Integer lvId = dto.getId();
        dto.setId(null);

        RemoteResult<CourseLessonVideoDto> result = new ResultRequestAndParser<CourseLessonVideoDto>("小节", "treenity_step3_lessonVideo", "替换", "replace") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
                RemoteResult<Void> deleteRs = treenityCourseLessonVideoOpenService.deleteById(lvId.intValue(), curUserId);

                RemoteResult<CourseLessonVideoDto> createRs = treenityCourseLessonVideoOpenService.createByDto(dto, curUserId);
                return createRs;
            }
        }.get();
        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/delete",method = {RequestMethod.POST,RequestMethod.GET})
    public RemoteResult<Void> chapterDelete(final Long lessonVideoId, final String sortList) {
        final List<CourseLessonVideoDto> courseChapterDtos = stringToDtoList(sortList, CourseLessonVideoDto.class);

        RemoteResult<Void> result = new ResultRequestAndParser<Void>("小节", "treenity_step3_lessonVideo", "删除", "delete") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
                RemoteResult<Void> rs = treenityCourseLessonVideoOpenService.deleteById(lessonVideoId.intValue(), curUserId);
                if (courseChapterDtos.size()>0) {
                    treenityCourseLessonVideoOpenService.sortByDtoList(courseChapterDtos, curUserId);
                }
                return rs;
            }
        }.get();
        return result;
    }

    @ResponseBody
    @RequestMapping("/update")
    public RemoteResult<Void> chapterUpdate(final CourseLessonVideoDto chapter) {
        RemoteResult<Void> result = new ResultRequestAndParser<Void>("小节", "treenity_step3_lessonVideo", "更新", "update") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
                RemoteResult<Void> rs = treenityCourseLessonVideoOpenService.updateByDto(chapter, curUserId);
                return rs;
            }
        }.get();
        return result;
    }

    @ResponseBody
    @RequestMapping("/sort")
    public RemoteResult<Void> chapterSort(final String sortList) {
        final List<CourseLessonVideoDto> chapterList = stringToDtoList(sortList, CourseLessonVideoDto.class);

        RemoteResult<Void> result = new ResultRequestAndParser<Void>("小节", "treenity_step3_lessonVideo", "排序", "sort") {
            @Override
            public RemoteResult<Void> request(Long curUserId) throws RemoteException {
                RemoteResult<Void> rs = treenityCourseLessonVideoOpenService.sortByDtoList(chapterList, curUserId);
                return rs;
            }
        }.get();
        return result;
    }



}
