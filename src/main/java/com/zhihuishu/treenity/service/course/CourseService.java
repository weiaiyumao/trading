package com.zhihuishu.treenity.service.course;

import java.util.List;

import com.zhihuishu.micro.course.openapi.course.dto.CourseClipsOpenDto;
import com.zhihuishu.micro.course.openapi.course.dto.CourseOpenDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;

/**
 * 
 * @author huyue
 *
 */
public interface CourseService {

	/**
	 * 根据登录人的id得到课程信息
	 * @param userId
	 * @return
	 */
	public List<CourseOpenDto> userCourseList(long userId) throws RemoteException;
	
	
	
	/**
	 * 根据课程ID查询课程基本信息
	 * @param courseId
	 * @return
	 * @throws RemoteException
	 */
	public CourseOpenDto queryCourseInfo(long courseId) throws RemoteException ;
	
	
	/**
	 * 根据课程Id 来修改课程 记入日志
	 * @param course
	 * @param updateUser
	 * @throws RemoteException
	 */
	public void updateCourseInfo(CourseOpenDto course ,long updateUser) throws RemoteException;
	
	
	/**
	 * 根据id删除课程
	 * @param courseId
	 * @param deleteUser
	 * @throws RemoteException
	 */
	void remove(long courseId,long deleteUser) throws RemoteException;
	
	/**
	 * 创建课程
	 * @param courseName
	 * @param createUser
	 * @return
	 * @throws RemoteException
	 */
	CourseOpenDto create(String courseName ,long createUser) throws RemoteException ;
	
	
	/**
	 * 修改课程
	 * @param course
	 * @param updateUser
	 * @throws RemoteException
	 */
	public void updateCourseName(CourseOpenDto course ,long courseId) throws RemoteException;
	
	
	
	/**
	 * 添加一个片花 并修改课程中的片花id
	 * @param ids
	 * @param clipsOpen
	 * @param courseId
	 * @param updateUser
	 * @return
	 * @throws RemoteException
	 */
	public CourseClipsOpenDto saveUpdateCourese(String ids,CourseClipsOpenDto clipsOpen, long courseId,long updateUser) throws RemoteException;
	
	
	/**
	 * 修改一个片花
	 * @param clipsOpen
	 * @return
	 * @throws RemoteException
	 */
	public CourseClipsOpenDto UpdateClipseCourese(CourseClipsOpenDto clipsOpen) throws RemoteException;
	
	
	/**
	 * 根据cc_course 中的id 来查询片花
	 * @param clipsId
	 * @return
	 * @throws RemoteException
	 */
	public CourseClipsOpenDto queryClipseOpenDto(long clipsId) throws RemoteException;

	/**
	 * 根据VideoId更新片花封面
	 * @param clipsId
	 * @return
	 * @throws RemoteException
	 */
	public CourseClipsOpenDto updatePromoVideoImg(String ids,CourseClipsOpenDto clipsOpen, long courseId,long updateUser) throws RemoteException;
	
	public CourseOpenDto loadCourse(long courseId) throws RemoteException;
	
	/**
	 * 根据课程Id 来修改课程 记入日志
	 * @param course
	 * @param updateUser
	 * @throws RemoteException
	 */
	public RemoteResult<CourseOpenDto> releaseCourse(CourseOpenDto course ,long updateUser) throws RemoteException;
}
