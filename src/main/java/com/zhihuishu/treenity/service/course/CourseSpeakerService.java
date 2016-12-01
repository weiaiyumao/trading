package com.zhihuishu.treenity.service.course;


import java.util.List;
import java.util.Map;

import com.zhihuishu.micro.course.openapi.course.dto.CourseSpeakerOpenDto;
import com.zhihuishu.remote.RemoteException;

/**
 * 
 */
public interface CourseSpeakerService {
	/**
	 * 根据课程id 查询所有的教学团队
	 * @param courseId
	 * @return
	 * @throws RemoteException
	 */
	public List<CourseSpeakerOpenDto> courseSpeakearList(long courseId) throws RemoteException;
	

	/**
	 * 根据 id 来删除该课程(修改标识符)
	 * @param id
	 * @return
	 * @throws RemoteException
	 */
	public boolean deleteSpeaker(Integer id) throws RemoteException;
	
	
	/**
	 * 保存教学团队
	 * @param courseSpeaker
	 * @return
	 * @throws RemoteException
	 */
	public CourseSpeakerOpenDto saveSpeakerCourse(CourseSpeakerOpenDto courseSpeaker) throws RemoteException;
	
	/**
	 * 修改教学团队
	 * @param courseSpeaker
	 * @return
	 * @throws RemoteException
	 */
	public CourseSpeakerOpenDto updateSpeakerCourse(CourseSpeakerOpenDto courseSpeaker) throws RemoteException;
	
	/**
	 * 查询教学团队是否完整
	 * @Description
	 * @author shisong
	 * @date 2016年10月21日 下午5:29:56
	 * @modifyNote 
	 * @param courseId
	 * @return
	 */
	public Map<String, Boolean> findCourseSpeakerIsComplete(Long courseId) throws RemoteException;
	
}
