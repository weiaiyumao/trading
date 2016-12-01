package com.zhihuishu.treenity.service.course;

import java.util.List;

import java.util.Set;

import com.zhihuishu.micro.course.openapi.course.dto.CourseDataOpenDto;
import com.zhihuishu.remote.RemoteException;

public interface CourseDataService {
/**	
 * 查询所有的资料列表
 * @Description
 * @author shehuaiyang
 * @date 2016年10月14日 下午2:46:09
 * @modifyNote 
 * @param ids
 * @return
 * @throws RemoteException
 */
List<CourseDataOpenDto>  searchCourseDatas(Set<Integer> ids) throws RemoteException;
/**
 * 保存资料信息
 * @Description
 * @author shehuaiyang
 * @date 2016年10月14日 下午2:48:02
 * @modifyNote 
 * @param courseDataopenDto
 * @return
 * @throws RemoteException 
 */
CourseDataOpenDto saveData(CourseDataOpenDto courseDataopenDto) throws RemoteException;
/**
 * 删除资料（逻辑删除）
 * @Description
 * @author shehuaiyang
 * @date 2016年10月14日 下午2:50:05
 * @modifyNote 
 * @param id
 * @return
 * @throws RemoteException 
 */
boolean delCourseData(Integer id) throws RemoteException;
/**
 * 根据章讨论id查询所有的资料
 * @Description
 * @author shehuaiyang
 * @date 2016年10月21日 下午3:04:48
 * @modifyNote 
 * @param bbsId
 * @return
 * @throws RemoteException
 */
List<CourseDataOpenDto> findCourseDatas(Integer bbsId) throws RemoteException;
}
