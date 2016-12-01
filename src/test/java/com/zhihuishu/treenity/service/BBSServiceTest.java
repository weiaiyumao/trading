//package com.zhihuishu.treenity.service;
//
//import com.zhihuishu.micro.bbs.openapi.onlineschool.IBBSOpenServiceForOverseaCreateCourse;
//import com.zhihuishu.micro.bbs.openapi.onlineschool.dto.OnlinePostModelOpenDto;
//import com.zhihuishu.micro.bbs.openapi.remote.RemoteException;
//import com.zhihuishu.micro.bbs.openapi.remote.RemoteResult;
//import com.zhihuishu.treenity.SpringIntegrationTestBase;
//
//import org.junit.Ignore;
//import org.junit.Test;
//import org.springframework.test.annotation.Rollback;
//
//import java.util.List;
//
//import javax.annotation.Resource;
//
///**
// * @author Jiangli
// * @date 2016/10/27 9:01
// */
//public class BBSServiceTest extends SpringIntegrationTestBase {
//    Integer courseId = 2006660;
//    Integer chapterId = 540;
//    Integer userId = 1;
//
//    @Resource
//    IBBSOpenServiceForOverseaCreateCourse treenityMeetIBBSOpenServiceForOverseaCreateCourse;
//
//    @Test
//    public void test() throws RemoteException {
//        System.out.println("sdfd");
//        RemoteResult<List<OnlinePostModelOpenDto>> result = treenityMeetIBBSOpenServiceForOverseaCreateCourse.findDiscussListByCourseIdAndChapterId(courseId, chapterId);
//        System.out.println(result.getResult().size());
//    }
//    @Test @Ignore
//    public void testSave() throws RemoteException {
//    OnlinePostModelOpenDto	onlinePostModelOpenDto = new OnlinePostModelOpenDto();
//    onlinePostModelOpenDto.setCourseId(courseId);
//    onlinePostModelOpenDto.setChapterId(chapterId);
//    onlinePostModelOpenDto.setTitle("ooooo");
//    onlinePostModelOpenDto.setContent("oooo");
//    this.treenityMeetIBBSOpenServiceForOverseaCreateCourse.saveModel(onlinePostModelOpenDto);
//    }
//    @Rollback(false)
//    @Test 
//    public void testUpate() throws RemoteException{
//    OnlinePostModelOpenDto	onlinePostModelOpenDto = new OnlinePostModelOpenDto();
//    onlinePostModelOpenDto.setId(2461698);
//    onlinePostModelOpenDto.setTitle("kkkkkk");
//    onlinePostModelOpenDto.setContent("");
//    this.treenityMeetIBBSOpenServiceForOverseaCreateCourse.updateModel(onlinePostModelOpenDto);
//    }
//}
