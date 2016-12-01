package com.zhihuishu.treenity.service.course.impl;

import java.util.Map;

import javax.annotation.Resource;

import org.springframework.beans.factory.annotation.Autowired;
import org.springframework.stereotype.Service;

import com.zhihuishu.micro.course.openapi.course.CcCourseOpenService;
import com.zhihuishu.micro.course.openapi.course.dto.CcCourseOpenDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.treenity.service.course.CcCourseService;
import com.zhihuishu.treenity.service.impl.BaseService;


@Service("ccCourseService")
public class CcCourseServiceImpl extends BaseService implements CcCourseService {
    
	@Autowired
	private CcCourseOpenService ccCourseOpenService;

	@Override
	public void updateCcCourse(CcCourseOpenDto ccCourseOpenDto) throws RemoteException {
		// TODO Auto-generated method stub
		
	}

	@Override
	public Map<String, Integer> findProgressByCourseId(Long courseId)throws RemoteException {
		RemoteResult<Map<String, Integer>> map=ccCourseOpenService.findProgressByCourseId(courseId);
		if(map.isSuccess()){
			return map.getResult();
		}
		return null;
	}

	
	@Override
	public void delProgressByCourseId(Long courseId) throws RemoteException {
          ccCourseOpenService.delProgressByCourseId(courseId);
	}
	
	

}
