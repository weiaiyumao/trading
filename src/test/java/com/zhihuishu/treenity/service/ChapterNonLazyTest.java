//package com.zhihuishu.treenity.service;
//
//import com.alibaba.dubbo.common.json.JSON;
//import com.zhihuishu.remote.RemoteException;
//import com.zhihuishu.remote.RemoteResult;
//import com.zhihuishu.treenity.SpringIntegrationTestBase;
//import com.zhihuishu.treenity.dto.WebStep3Dto;
//import com.zhihuishu.treenity.service.course.ChapterNonlazyService;
//import org.junit.Test;
//
//import javax.annotation.Resource;
//import java.io.IOException;
//
///**
// * @author Jiangli
// * @date 2016/10/27 9:01
// */
//public class ChapterNonLazyTest extends SpringIntegrationTestBase {
////    Integer courseId = 2006323;
////    Integer chapterId = 122531;
//
////    Integer courseId = 2006677;
////    Integer chapterId = 122700;
//
//    Integer courseId = 2006689;
//
//    Integer userId = -1;
//
//    @Resource
//    ChapterNonlazyService treenityChapterNonlazyService;
//
//    @Test
//    public void func() throws RemoteException, IOException {
//        System.out.println("sdfd");
//        System.out.println(treenityChapterNonlazyService);
//        RemoteResult<WebStep3Dto> rs = treenityChapterNonlazyService.queryListByCourseIdNonLazy(courseId, userId);
//        rs.getResult();
//        System.out.println("!!!!!!!!!!!!!!result:");
//        System.out.println(JSON.json(rs));
//    }
//
//}
