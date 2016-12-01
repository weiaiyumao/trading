package com.zhihuishu.treenity.service.course;

import java.util.Map;

import com.zhihuishu.micro.course.openapi.course.dto.CcCourseOpenDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;

public interface CcCourseService {

	/**
	 * 课程发布，修改CcCourse表中的字段(暂时不用)
	 * @Description
	 * @author shisong
	 * @date 2016年10月27日 下午6:52:36
	 * @modifyNote 
	 * @param ccCourseOpenDto
	 * @return
	 * @throws RemoteException
	 */
	void updateCcCourse(CcCourseOpenDto ccCourseOpenDto) throws RemoteException;
	
	/**
	 * 根据课程id查询课程完整度的信息
	 * @author yulijin
	 * @date 2016年11月2日 下午3:14:01 
	 * @param courseId
	 * @return key(String):progress：完整度百分比，mold（课程模式）:1老版建课、2新版本建课、3私有云建课、4海外建课、10微课程，
     *         filledTotalCount:必填项总数，unFilledCount：未填数
	 * @throws RemoteException
	 */
    Map<String, Integer> findProgressByCourseId(Long courseId) throws RemoteException;
    
    /**
     * 根据课程id清除redis中的课程完整的信息
     * @author yulijin
     * @date 2016年11月2日 下午3:15:12 
     * @param courseId
     * @return
     * @throws RemoteException
     */
    void delProgressByCourseId(Long courseId) throws RemoteException;
    
}
