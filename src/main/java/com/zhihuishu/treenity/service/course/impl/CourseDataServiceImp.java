package com.zhihuishu.treenity.service.course.impl;

import java.util.List;
import java.util.Set;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhihuishu.micro.course.openapi.course.CourseDataOpenService;
import com.zhihuishu.micro.course.openapi.course.dto.CourseDataOpenDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.service.course.CourseDataService;
@Service("treenityCourseDataService")
public class CourseDataServiceImp implements CourseDataService {
	
	@Autowired
	private CourseDataOpenService courseDataOpenService;

	@Override
	public List<CourseDataOpenDto> searchCourseDatas(Set<Integer> ids) throws RemoteException {
		RemoteResult<List<CourseDataOpenDto>> result =this.courseDataOpenService.searcherCourseDataOpenLists(ids);
		if(result.isSuccess()){
			 return result.getResult();
		}
		return null;
	}

	@Override
	public CourseDataOpenDto saveData(CourseDataOpenDto courseDataopenDto) throws RemoteException  {
		RemoteResult<CourseDataOpenDto> result = courseDataOpenService.saveCourseDataOpen(courseDataopenDto);
		if(result.isSuccess()){
			return result.getResult();
		}
		return null;
	}

	@Override
	public boolean delCourseData(Integer id) throws RemoteException  {
		RemoteResult<Void> result = courseDataOpenService.deleteCourseDataOpen(id);
		if(result.isSuccess()){
			return true;
		}
		return false;
	}

	@Override
	public List<CourseDataOpenDto> findCourseDatas(Integer bbsId) throws RemoteException {
		RemoteResult<List<CourseDataOpenDto>> result = courseDataOpenService.searchCourseDataOpenLists(bbsId);
		if(result.isSuccess()){
			return result.getResult();
		}
		return null;
	}

}
