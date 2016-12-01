package com.zhihuishu.treenity.service.course;

import java.util.List;

import com.zhihuishu.micro.course.openapi.course.dto.CourseChapterDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.dto.WebStep3Dto;

/**
 * @author Jiangli
 * @date 2016/10/27 9:16
 */
public interface ChapterNonlazyService {

    RemoteResult<WebStep3Dto> queryListByCourseIdNonLazy(long courseId, long userId) throws RemoteException;

    /**
     * 根据课程Id  查询章节信息
     * @Description
     * @author shisong
     * @date 2016年11月2日 下午1:51:38
     * @modifyNote 
     * @param courseId
     * @return
     * @throws RemoteException
     */
	List<CourseChapterDto> queryChapterListByCourseId(Long courseId)  throws RemoteException;
}
