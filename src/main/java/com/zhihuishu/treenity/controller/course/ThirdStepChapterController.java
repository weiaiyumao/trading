package com.zhihuishu.treenity.controller.course;


import com.zhihuishu.micro.course.openapi.course.CourseChapterOpenService;
import com.zhihuishu.micro.course.openapi.course.dto.CourseChapterDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.controller.BaseController;
import com.zhihuishu.treenity.dto.WebStep3Dto;
import com.zhihuishu.treenity.log.LoggerCollectionEnum;
import com.zhihuishu.treenity.service.course.ChapterNonlazyService;
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
@RequestMapping("/course/thirdStep/chapter")
public class ThirdStepChapterController extends BaseController {


    @Resource
    private CourseChapterOpenService treenityCourseChapterOpenService;

    @Resource
    private ChapterNonlazyService treenityChapterNonlazyService;

    @Override
    protected LoggerCollectionEnum getCollectionEnum() {
        return LoggerCollectionEnum.chapterCollection;
    }


    @ResponseBody
    @RequestMapping("/list")
    public RemoteResult<List<CourseChapterDto>> chapterList(@RequestParam(value = "courseId", required = false) final Long courseId) {
        RemoteResult<List<CourseChapterDto>> listRemoteResult = new ResultRequestAndParser<List<CourseChapterDto>>("章列表", "treenity_step3_chapterList", "查询", "query") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
//                RemoteResult<List<CourseChapterDto>> rs = treenityCourseChapterOpenService.queryListByCourseId(courseId);
                //章-节-小节 数据
                RemoteResult<List<CourseChapterDto>> rs = treenityCourseChapterOpenService.queryListByCourseIdNonLazy(courseId);
                return rs;
            }
        }.get();
        return listRemoteResult;
    }

    @ResponseBody
    @RequestMapping("/listAll")
    public RemoteResult<WebStep3Dto> listAll(@RequestParam(value = "courseId", required = false) final Long courseId) {
        RemoteResult<WebStep3Dto> listRemoteResult = new ResultRequestAndParser<WebStep3Dto>("第三步列表全数据", "treenity_step3_chapterAllDataList", "查询", "query") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
                //章-节-小节 数据
                //章讨论 数据
                //章测试 数据
                RemoteResult<WebStep3Dto> rs = treenityChapterNonlazyService.queryListByCourseIdNonLazy(courseId, curUserId);
                return rs;
            }
        }.get();
        return listRemoteResult;
    }

    @ResponseBody
    @RequestMapping("/create")
    public RemoteResult<CourseChapterDto> chapterCreate(@RequestParam(value = "courseId", required = false) final Long courseId, @RequestParam(value = "rank", required = false) final Integer rank) {
        RemoteResult<CourseChapterDto> result = new ResultRequestAndParser<CourseChapterDto>("章", "treenity_step3_chapter", "创建", "create") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
                CourseChapterDto courseChapterDto = new CourseChapterDto();
                courseChapterDto.setCourseId(courseId);
                courseChapterDto.setRank(rank);
                RemoteResult<CourseChapterDto> rs = treenityCourseChapterOpenService.createByCourseId(courseChapterDto, curUserId);
                return rs;
            }
        }.get();
        return result;
    }

    @ResponseBody
    @RequestMapping(value = "/delete",method = {RequestMethod.POST,RequestMethod.GET})
    public RemoteResult<Void> chapterDelete(final Long chapterId,final String sortList) {
        final List<CourseChapterDto> courseChapterDtos = stringToDtoList(sortList, CourseChapterDto.class);

        RemoteResult<Void> result = new ResultRequestAndParser<Void>("章", "treenity_step3_chapter", "删除", "delete") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
                RemoteResult<Void> rs = treenityCourseChapterOpenService.deleteById(chapterId.intValue(), curUserId);
                treenityCourseChapterOpenService.sortByDtoList(courseChapterDtos, curUserId);
                return rs;
            }
        }.get();
        return result;
    }

    @ResponseBody
    @RequestMapping("/update")
    public RemoteResult<Void> chapterUpdate(final CourseChapterDto chapter,  String limitDayStr, String  studyHourStr) {
        chapter.setLimitDay(convertToNullableInt(limitDayStr));
        chapter.setStudyHour(convertToNullableInt(studyHourStr));
        RemoteResult<Void> result = new ResultRequestAndParser<Void>("章", "treenity_step3_chapter", "更新", "update") {
            @Override
            public RemoteResult request(Long curUserId) throws RemoteException {
                RemoteResult<Void> rs = treenityCourseChapterOpenService.updateByDto(chapter, curUserId);
                return rs;
            }
        }.get();
        return result;
    }

    private Integer convertToNullableInt(String limitDayStr) {
        if (limitDayStr == null) {
            return null;
        }
        if ("".equals(limitDayStr.trim())) {
            return -1;
        }
        return Integer.parseInt(limitDayStr);
    }
    @ResponseBody
    @RequestMapping("/sort")
    public RemoteResult<Void> chapterSort(final String sortList) {
        final List<CourseChapterDto> chapterList = stringToDtoList(sortList, CourseChapterDto.class);

        RemoteResult<Void> result = new ResultRequestAndParser<Void>("章", "treenity_step3_chapter", "排序", "sort") {
            @Override
            public RemoteResult<Void> request(Long curUserId) throws RemoteException {
                RemoteResult<Void> rs = treenityCourseChapterOpenService.sortByDtoList(chapterList, curUserId);
                return rs;
            }
        }.get();
        return result;
    }



}
