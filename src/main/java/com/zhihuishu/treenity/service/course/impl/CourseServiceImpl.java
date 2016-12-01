
package com.zhihuishu.treenity.service.course.impl;


import java.util.List;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.able.commons.dto.BaseVideoDto;
import com.able.commons.httpinvoker.IFileCommonsInvoker;
import com.zhihuishu.micro.course.openapi.course.CourseOpenService;
import com.zhihuishu.micro.course.openapi.course.dto.CourseClipsOpenDto;
import com.zhihuishu.micro.course.openapi.course.dto.CourseOpenDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.consts.Constants;
import com.zhihuishu.treenity.service.course.CcCourseService;
import com.zhihuishu.treenity.service.course.CourseService;
import com.zhihuishu.treenity.service.impl.BaseService;

@Service("courseService")
public class CourseServiceImpl extends BaseService implements CourseService {
 
	@Resource
	private CourseOpenService courseOpenService ;
	
	@Autowired
	private IFileCommonsInvoker IFileCommonsInvoker;
	
	@Autowired
	private CcCourseService treenityCcCourseOpenService; 
	
	@Override
	public List<CourseOpenDto> userCourseList(long userId) throws RemoteException {
		RemoteResult<List<CourseOpenDto>> remoteResult = courseOpenService.userCourseList(userId);
		if(remoteResult.isSuccess()){
			return remoteResult.getResult();
		}
		return null; 
	}
	
	@Override
	public CourseOpenDto queryCourseInfo(long courseId) throws RemoteException {
		
		RemoteResult<CourseOpenDto> remoteResult = courseOpenService.queryCourseInfo(courseId);
		if(remoteResult.isSuccess()){
			return remoteResult.getResult();
		}
		return null;
	}
	
	@Override
	public void updateCourseInfo(CourseOpenDto course, long updateUser) throws RemoteException {
		//Category 1必修 2选修  默认1
/*		if(course.getCourseCategory()==null){
			course.setCourseCategory(1);
		}*/
		
		RemoteResult<Void> result = courseOpenService.update(course, updateUser);
		if(result.isSuccess()){
			
			result.getResult();
		}
	}

	@SuppressWarnings("unused")
	@Override
	public void remove(long courseId, long deleteUser) throws RemoteException {
		RemoteResult<Void> result= courseOpenService.remove(courseId, deleteUser);
		treenityCcCourseOpenService.delProgressByCourseId(courseId);
		
	}

	@Override
	public CourseOpenDto create(String courseName, long createUser) throws RemoteException {
		RemoteResult<CourseOpenDto> result = courseOpenService.create(courseName, createUser);
		if(result.isSuccess()){
			return result.getResult();
		}
		return null;
		
	}

	@Override
	public void updateCourseName(CourseOpenDto courseOpenDto, long courseId) throws RemoteException {
		@SuppressWarnings("unused")
		RemoteResult<Void> result=courseOpenService.update(courseOpenDto, courseId);
		   
	}



	@Override
	public CourseClipsOpenDto queryClipseOpenDto(long clipsId) throws RemoteException {
		RemoteResult<CourseClipsOpenDto> result = courseOpenService.queryCourseClips(clipsId);
		if(result.isSuccess()){
			return result.getResult();
		}
		return null;
	}
	
	

	@Override
	public CourseClipsOpenDto UpdateClipseCourese(CourseClipsOpenDto clipsOpen) throws RemoteException {
		List<BaseVideoDto> list = IFileCommonsInvoker.findVideoByIds(clipsOpen.getVideoId()+"");
		if(list.size()>0){
			String img = list.get(0).getThumbnailPath();
			if(img.equalsIgnoreCase(Constants.COURSE_PROMOVIDEO_IMG_PATH)){
				clipsOpen.setVideoImage("");
			} else {
				clipsOpen.setVideoImage(img);
			}
		}
		RemoteResult<Void> result = courseOpenService.updateCourseClips(clipsOpen);
		if(result.isSuccess()){
			CourseClipsOpenDto dto = queryClipseOpenDto(clipsOpen.getClipsId());
			result.getResult();
			return dto;
		}
		return null;
	}
	
	
	@Override
	public CourseClipsOpenDto saveUpdateCourese(String ids,CourseClipsOpenDto clipsOpen, long courseId,long updateUser) throws RemoteException {
		CourseClipsOpenDto dto = new CourseClipsOpenDto();
		List<BaseVideoDto> list = IFileCommonsInvoker.findVideoByIds(ids);
		String img=list.get(0).getThumbnailPath();
		if(img.equalsIgnoreCase(Constants.COURSE_PROMOVIDEO_IMG_PATH)){
			clipsOpen.setVideoImage("");
		} else {
			clipsOpen.setVideoImage(img);
			
		}
		RemoteResult<Long> result = courseOpenService.createCourseClips(courseId, clipsOpen);
		if(result.isSuccess()){
			long clipsOpenId = result.getResult();
			CourseOpenDto course = new CourseOpenDto();
			course.setCourseId(courseId);
			course.setLinkCourseId(clipsOpenId);
			updateCourseInfo(course,updateUser);
			dto = queryClipseOpenDto(clipsOpenId);
			return dto;
		}
		return null;
	}
	
	public CourseOpenDto loadCourse(long courseId) throws RemoteException {
		return this.queryCourseInfo(courseId);
	}
	
	
	
	

	/**
	 * 根据VideoId更新片花封面
	 * @param clipsId
	 * @return
	 * @throws RemoteException
	 */
	@Override
	public CourseClipsOpenDto updatePromoVideoImg(String ids,CourseClipsOpenDto clipsOpen, long courseId,long updateUser) throws RemoteException {
		List<BaseVideoDto> list = IFileCommonsInvoker.findVideoByIds(ids);
		String img=list.get(0).getThumbnailPath();
		if(img.equalsIgnoreCase(Constants.COURSE_PROMOVIDEO_IMG_PATH)){
			clipsOpen.setVideoImage("");
		} else {
			clipsOpen.setVideoImage(img);
		}
		courseOpenService.updateCourseClips(clipsOpen);
		CourseClipsOpenDto dto =  queryClipseOpenDto(clipsOpen.getClipsId());
		return dto;
	}
	
	@Override
	public RemoteResult<CourseOpenDto> releaseCourse(CourseOpenDto course, long updateUser) throws RemoteException {
		//Category 1必修 2选修  默认1
/*		if(course.getCourseCategory()==null){
			course.setCourseCategory(1);
		}*/
		RemoteResult<CourseOpenDto> newResult = new RemoteResult<CourseOpenDto>();
		RemoteResult<Void> result = courseOpenService.update(course, updateUser);
		if(result.isSuccess()){
			newResult.setResult(course);
		}
		
		return newResult;
	}

}
