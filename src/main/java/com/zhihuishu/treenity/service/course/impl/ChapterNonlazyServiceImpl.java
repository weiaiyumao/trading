package com.zhihuishu.treenity.service.course.impl;

import com.able.dto.ExamForOverseasDto;
import com.able.onlineExam.openapi.overseas.IOverseasCourseService;
import com.zhihuishu.micro.bbs.openapi.onlineschool.IBBSOpenServiceForOverseaCreateCourse;
import com.zhihuishu.micro.bbs.openapi.onlineschool.dto.OnlinePostModelOpenDto;
import com.zhihuishu.micro.course.openapi.course.CourseChapterOpenService;
import com.zhihuishu.micro.course.openapi.course.CourseDataOpenService;
import com.zhihuishu.micro.course.openapi.course.dto.CourseChapterDto;
import com.zhihuishu.micro.course.openapi.course.dto.CourseDataOpenDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.toolkit.helper.BeanHelper;
import com.zhihuishu.treenity.dto.StepCostTimeDto;
import com.zhihuishu.treenity.dto.WebChapterDto;
import com.zhihuishu.treenity.dto.WebDiscussionDto;
import com.zhihuishu.treenity.dto.WebStep3Dto;
import com.zhihuishu.treenity.service.course.ChapterNonlazyService;
import org.springframework.stereotype.Service;
import org.springframework.util.CollectionUtils;

import javax.annotation.Resource;
import java.util.*;

/**
 * @author Jiangli
 * @date 2016/10/27 9:16
 */
@Service("treenityChapterNonlazyService")
public class ChapterNonlazyServiceImpl implements ChapterNonlazyService {
    @Resource
    IOverseasCourseService treenityOverseasCourseService;
    @Resource
    IBBSOpenServiceForOverseaCreateCourse treenityMeetIBBSOpenServiceForOverseaCreateCourse;
    @Resource
    CourseDataOpenService treenityCourseDataOpenService;
    @Resource
    private CourseChapterOpenService treenityCourseChapterOpenService;

    public <T> T convert(Object src, Class<T> cls) {
        try {
            T one = cls.newInstance();
            BeanHelper.copyProperties(src, one);
            return one;
        } catch (Exception e) {
            e.printStackTrace();
        }
        return null;
    }

    @Override
    public RemoteResult<WebStep3Dto> queryListByCourseIdNonLazy(long courseId, long userId) throws RemoteException {
        RemoteResult<WebStep3Dto> result = new RemoteResult<WebStep3Dto>();
        WebStep3Dto data = new WebStep3Dto();
        result.setResult(data);
        try {
            List<WebChapterDto> dataList = new LinkedList<WebChapterDto>();
            data.setChapterList(dataList);
            List<StepCostTimeDto> costTimes = new ArrayList<StepCostTimeDto>();
            data.setCostTimes(costTimes);

            //temp variable
            List<Integer> chapterIds = new LinkedList<Integer>();//章id列表 用来查询测试列表
            Map<String, Integer> chapterIdxMap = new HashMap<String, Integer>();//chapterId -> index in List<WebChapterDto>
            ////用来收集章讨论信息 优化请求
            List<WebDiscussionDto> discussionWebList = new LinkedList<WebDiscussionDto>();//课程下所有的章讨论列表 用来索引
            Map<String, Integer> referIdxMap = new HashMap<String, Integer>();//refer dataId -> index in List<WebDiscussionDto>
            Set<Integer> referIds = new HashSet<Integer>();//所有附件id列表，来源于discussion的dataIds
            ////收集耗时
            StopWatch stopWatch = new StopWatch();
            StopWatch globalStopWatch = new StopWatch();
            StopWatch discussionStopWatch = new StopWatch();
            String msg = "ok";

            //convert chapterList(chapter,lesson,lessonVideo  Only)
            stopWatch.record();
            msg = "ok";
            RemoteResult<List<CourseChapterDto>> listRemoteResult = treenityCourseChapterOpenService.queryListByCourseIdNonLazy(courseId);
            if (!listRemoteResult.isSuccess()) {
                msg = "CourseChapterOpenService.queryListByCourseIdNonLazy failed";
            }
            costTimes.add(new StepCostTimeDto("chapter(s)[lesson(s)[lessonVideo(s)]]", stopWatch.costTs(), msg));
            if (!listRemoteResult.isSuccess()) {
                throw new Exception("调用(课程下)章列表接口出错");//下面没必要执行
            }
            data.setSectionSuccess(true);

            List<CourseChapterDto> chapterList = listRemoteResult.getResult();
            for (int i = 0; i < chapterList.size(); i++) {
                CourseChapterDto courseChapterDto = chapterList.get(i);

                //collect
                Integer chapterId = courseChapterDto.getId();
                if (chapterId == null) {
                    continue;
                }
                chapterIds.add(chapterId);
                chapterIdxMap.put(String.valueOf(chapterId), i);

                //convert
                WebChapterDto one = new WebChapterDto();
                BeanHelper.copyProperties(courseChapterDto, one);
                dataList.add(one);

            }

            stopWatch.record();

            //final exam
            msg = "ok";
            ExamForOverseasDto finalExam = null;
            try {
                finalExam = treenityOverseasCourseService.getFinalExamByCourseId((int) courseId, (int) userId);
                data.setFinalExam(finalExam);
                data.setFinalExamSuccess(true);
            } catch (Exception e) {
                e.printStackTrace();

                msg = "IOverseasCourseService.getFinalExamByCourseId failed e:" + e.getMessage();
//                throw new Exception("调用考试-(课程下)期末考试接口出错");

                result.setSuccess(false);
                result.setErrorCode(1);
            } finally {
                costTimes.add(new StepCostTimeDto("finalExam[question(s)]", stopWatch.costTs(), msg));
            }


            if (chapterIds.size() > 0) {
                //query&inject chapter-exam
                stopWatch.record();

                msg = "ok";
                List<ExamForOverseasDto> chapterExams = null;
                try {
                    chapterExams = treenityOverseasCourseService.getExamListByChapterIdList(chapterIds, (int) userId);

                    if (chapterExams != null) {
                        for (ExamForOverseasDto chapterExam : chapterExams) {
                            //collect
                            Integer chapterId = chapterExam.getChapterId();
                            Integer index = chapterIdxMap.get(String.valueOf(chapterId));
                            if (index == null) {
                                continue;
                            }
                            WebChapterDto webChapterDto = dataList.get(index);
                            webChapterDto.setExam(chapterExam);
                        }
                    }

                    data.setExamSuccess(true);
                } catch (Exception e) {
                    e.printStackTrace();

                    msg = "IOverseasCourseService.getExamListByChapterIdList failed e:" + e.getMessage();
//                    throw new Exception("调用考试-(所有)章节测试接口出错");

                    result.setSuccess(false);
                    result.setErrorCode(2);
                } finally {
                    costTimes.add(new StepCostTimeDto("exam(s)[quesions]]", stopWatch.costTs(), msg));
                }
            } else {
                data.setExamSuccess(true);
            }

            try {
                msg = "ok";
                discussionStopWatch.record();

                //query&inject chapter-discussion
                //TODO 请求低效 -> 应该改成传一个List<chappterId>->得到所有discussions及discussion下面的refers
                for (int i = 0; i < dataList.size(); i++) {
                    WebChapterDto webChapterDto = dataList.get(i);
                    Integer chapterId = webChapterDto.getId();

                    //record
                    stopWatch.record();
                    com.zhihuishu.micro.bbs.openapi.remote.RemoteResult<List<OnlinePostModelOpenDto>> chapterDiscussions = treenityMeetIBBSOpenServiceForOverseaCreateCourse.findDiscussListByCourseIdAndChapterId((int) courseId, chapterId);
                    costTimes.add(new StepCostTimeDto("chapter-" + i + "-[discussion-list]", stopWatch.costTs()));

                    if (chapterDiscussions.isSuccess()) {
                        List<OnlinePostModelOpenDto> discussionsOfChapter = chapterDiscussions.getResult();
                        if (discussionsOfChapter == null) {
                            continue;
                        }

                        List<WebDiscussionDto> webDiscussionDtos = new LinkedList<WebDiscussionDto>();
                        webChapterDto.setDiscussionList(webDiscussionDtos);

                        //convert
                        for (int j = 0; j < discussionsOfChapter.size(); j++) {
                            OnlinePostModelOpenDto onlinePostModelOpenDto = discussionsOfChapter.get(j);

//                    for (OnlinePostModelOpenDto onlinePostModelOpenDto : discussionsOfChapter) {
                            //为了获得dataIds 必须再次请求详情接口
                            stopWatch.record();
                            com.zhihuishu.micro.bbs.openapi.remote.RemoteResult<OnlinePostModelOpenDto> discussionWithDataIds = treenityMeetIBBSOpenServiceForOverseaCreateCourse.findModelById(onlinePostModelOpenDto.getId());
                            costTimes.add(new StepCostTimeDto("chapter-" + i + "-" + j + "-[discussion-detail]", stopWatch.costTs()));
                            if (!discussionWithDataIds.isSuccess()) {
                                continue;
                            }

                            OnlinePostModelOpenDto modelWithDataIds = discussionWithDataIds.getResult();
                            WebDiscussionDto one = new WebDiscussionDto();
                            BeanHelper.copyProperties(modelWithDataIds, one);
                            webDiscussionDtos.add(one);

                            Set<Integer> dataIds = one.getDataIds();
                            if (dataIds != null) {
                                //collect
                                discussionWebList.add(one);
                                int curIdx = discussionWebList.size() - 1;
                                for (Integer dataId : dataIds) {
                                    referIdxMap.put(String.valueOf(dataId), curIdx);
                                    referIds.add(dataId);
                                }
                            }
                        }
                    }

                }

                //query&inject chapter-discussion-refer 请求附件
                if (!CollectionUtils.isEmpty(referIds)) {
                    stopWatch.record();
                    RemoteResult<List<CourseDataOpenDto>> discussionReferResult = treenityCourseDataOpenService.searcherCourseDataOpenLists(referIds);
                    costTimes.add(new StepCostTimeDto("chapter[discussion[refer]]", stopWatch.costTs()));
                    if (discussionReferResult.isSuccess()) {
                        List<CourseDataOpenDto> discussionReferList = discussionReferResult.getResult();

                        for (CourseDataOpenDto courseDataOpenDto : discussionReferList) {
                            Integer referId = courseDataOpenDto.getId();
                            Integer idx = referIdxMap.get(String.valueOf(referId));
                            if (idx == null) {
                                continue;
                            }
                            WebDiscussionDto webDiscussionDto = discussionWebList.get(idx);
                            List<CourseDataOpenDto> referList = webDiscussionDto.getReferList();
                            if (referList == null) {
                                referList = new LinkedList<CourseDataOpenDto>();
                                webDiscussionDto.setReferList(referList);
                            }
                            referList.add(courseDataOpenDto);
                        }
                    }
                }

                data.setDiscussionSuccess(true);

                data.setChapterSuccess(data.getSectionSuccess()&&data.getExamSuccess()&&data.getDiscussionSuccess());
            } catch (Exception e) {
                e.printStackTrace();

                msg = "findDiscussListByCourseIdAndChapterId|findModelById|searcherCourseDataOpenLists failed e:" + e.getMessage();
//                    throw new Exception("调用考试-(所有)章节测试接口出错");

                result.setSuccess(false);
                result.setErrorCode(3);
            } finally {
                costTimes.add(new StepCostTimeDto("[sum]discussions(s)[refer(s)]]", discussionStopWatch.costTs(), msg));
            }

            costTimes.add(new StepCostTimeDto("[sum]total", globalStopWatch.costTs()));

        } catch (Exception e) {
            e.printStackTrace();

            result.setSuccess(false);
            result.setErrorCode(-1);
        }

        return result;
    }

    @Override
    public List<CourseChapterDto> queryChapterListByCourseId(Long courseId) throws RemoteException {
        List<CourseChapterDto> chapterDtos = new ArrayList<CourseChapterDto>();
        if (null != courseId) {
            RemoteResult<List<CourseChapterDto>> result = treenityCourseChapterOpenService.queryListByCourseId(courseId);
            if (result.isSuccess()) {
                chapterDtos = result.getResult();
            }
        }
        return chapterDtos;
    }

    class StopWatch {
        private long startTs = 0;

        public StopWatch() {
            record();
        }

        public long costTs() {
            return System.currentTimeMillis() - startTs;
        }

        public void record() {
            startTs = System.currentTimeMillis();
        }
    }
}
