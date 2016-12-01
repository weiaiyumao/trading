
package com.zhihuishu.treenity.service.course.impl;


import java.util.List;
import java.util.Map;

import javax.annotation.Resource;

import org.springframework.stereotype.Service;

import com.zhihuishu.micro.course.openapi.course.CourseSpeakerOpenService;
import com.zhihuishu.micro.course.openapi.course.dto.CourseSpeakerOpenDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.service.course.CourseSpeakerService;
import com.zhihuishu.treenity.service.impl.BaseService;

@Service("treenityCourseSpeakerService")
public class CourseSpeakerServiceImpl extends BaseService implements CourseSpeakerService {

	@Resource
	private CourseSpeakerOpenService courseSpeakerService;
	
	@Override
	public List<CourseSpeakerOpenDto> courseSpeakearList(long courseId) throws RemoteException {
		RemoteResult<List<CourseSpeakerOpenDto>> result = courseSpeakerService.courseSpeakearList(courseId);
		if(result.isSuccess()){
			return result.getResult();
		}
		return null;
	}

	@Override
	public boolean deleteSpeaker(Integer id) throws RemoteException{
		RemoteResult<Void> result = courseSpeakerService.delete(id);
		if(result.isSuccess()){
			return true;
		}
		return false;
	}
	
	
	@Override
	public CourseSpeakerOpenDto saveSpeakerCourse(CourseSpeakerOpenDto courseSpeaker) throws RemoteException {
		RemoteResult<CourseSpeakerOpenDto> result = courseSpeakerService.save(courseSpeaker);
		if(result.isSuccess()){
			return result.getResult();
		}
		return null;
	}

	@Override
	public CourseSpeakerOpenDto updateSpeakerCourse(CourseSpeakerOpenDto courseSpeaker) throws RemoteException {
		RemoteResult<CourseSpeakerOpenDto> result = courseSpeakerService.update(courseSpeaker);
		if(result.isSuccess()){
			return result.getResult();
		}
		return null;
	}

	@Override
	public Map<String, Boolean> findCourseSpeakerIsComplete(Long courseId) throws RemoteException {
		
		RemoteResult<Map<String, Boolean>> result = courseSpeakerService.findCourseSpeakerIsComplete(courseId);
		if(result.isSuccess()){
			return result.getResult();
		}
		return null;
	}

	

	

}
