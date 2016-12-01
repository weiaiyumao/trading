package com.zhihuishu.treenity.controller;

import java.util.LinkedList;
import java.util.List;

import javax.annotation.Resource;
import javax.servlet.http.HttpServletRequest;
import javax.servlet.http.HttpSession;

import org.apache.commons.beanutils.BeanUtils;
import org.springframework.util.CollectionUtils;
import org.springframework.util.StringUtils;
import org.springframework.web.context.request.RequestAttributes;
import org.springframework.web.context.request.RequestContextHolder;
import org.springframework.web.context.request.ServletRequestAttributes;
import org.springframework.web.servlet.ModelAndView;

import com.zhihuishu.micro.course.openapi.course.dto.CourseOpenDto;
import com.zhihuishu.remote.RemoteException;
import com.zhihuishu.remote.RemoteResult;
import com.zhihuishu.toolkit.log.LoggerTemplate;
import com.zhihuishu.toolkit.log.MDCInfoBuilder;
import com.zhihuishu.treenity.consts.Constants;
import com.zhihuishu.treenity.consts.JudgeHome;
import com.zhihuishu.treenity.consts.WebConsts;
import com.zhihuishu.treenity.dto.user.UserDto;
import com.zhihuishu.treenity.log.LoggerCollectionEnum;
import com.zhihuishu.treenity.service.course.CourseService;
import com.zhihuishu.treenity.util.RequestUtil;

import net.sf.json.JSONArray;
import net.sf.json.JSONObject;

/**
 * 公共控制器父类
 * @author huyue
 * @date 2016年8月9日 下午7:11:29
 */

public abstract class BaseController{

	@Resource
	private CourseService courseService;
	
	protected LoggerTemplate log = LoggerTemplate.getInstance(this.getClass()) ;
//	protected Logger log = LoggerFactory.getLogger(this.getClass()) ;
	
	public HttpServletRequest getRequest(){
		RequestAttributes ra = RequestContextHolder.getRequestAttributes();  
		HttpServletRequest request = ((ServletRequestAttributes)ra).getRequest(); 
		return request;
	}
	
	/**
	 * 获取登录用户
	 * @param session
	 * @return
	 */
	protected UserDto getLoginUser() {
		UserDto user = (UserDto)this.getRequest().getSession().getAttribute(WebConsts.SESSION_LOGIN_USER) ;
		return user != null ? (UserDto) user : null ;
	}
	
	/**
	 * 获取登录用户ID
	 * @param session
	 * @return
	 */
	protected Long getLoginUID() {
		UserDto user = getLoginUser() ;
		return user != null ? user.getUserId() : null ;
	}
	
	protected boolean isLoginUserByCourseId(ModelAndView model,Long courseId,HttpSession session,int... flag) throws RemoteException{
		//是否在home跳转过来的
		int mark = 0;//home跳过来的，等于1的不用做转发。其它情况可能需要
		if(flag != null && flag.length > 0) mark = flag[0];
		if(mark==JudgeHome.IS_HOME) return false;
		
		if (courseId == null) {//课程id为空的时候，转发到home新建课程中
			model.setViewName("redirect:/course/home?isCreate=1");
			return true;
		}
		CourseOpenDto courseInfo = null;
		Long userId = this.getLoginUID();
		List<CourseOpenDto> courseInfos = courseService.userCourseList(userId);
		if(!CollectionUtils.isEmpty(courseInfos)){
			for(CourseOpenDto dto : courseInfos){
				if(dto.getCourseId().equals(courseId)){//当前的地址上的courseId是当前登录人的课程
					courseInfo = dto;
					break;
				}
			}
		}
		if(courseInfo != null){//如果课程不为空，则缓存id与name
			session.setAttribute(Constants.CURRENT_SELECT_COURSEID, courseInfo.getCourseId());
			session.setAttribute(Constants.CURRENT_SELECT_COURSENAME, courseInfo.getName());
			return false;
			
		}else{
			model.setViewName("redirect:/course/courseHome?courseId="+courseId);
			return true;
		}
	}
	
	/**
	 * 保存日志公用方法(所有参数必传)  (能用但是不支持)
	 * @author Rain
	 * @time 2016年9月27日-上午8:53:55
	 * @param message 日志信息
	 * @param tableName 入库表名 长度128
	 * @param moduleName 模板名 长度128
	 * @param methodName 方法名 长度128
	 * @return true or false
	 */
	protected boolean saveLogger(String message,String tableName,String moduleName,String methodName,Long courseId){
		try {
			if (StringUtils.isEmpty(message) || StringUtils.isEmpty(tableName) || StringUtils.isEmpty(moduleName) || StringUtils.isEmpty(methodName) ){
				return false;
			}
			
			MDCInfoBuilder mDCInfoBuilder = MDCInfoBuilder.create();
			mDCInfoBuilder.put("userId", getLoginUID().toString()); //用户
			mDCInfoBuilder.put("courseId", String.valueOf(courseId)); //用户
			mDCInfoBuilder.setType("yewu");
			mDCInfoBuilder.setTag("tag");
			mDCInfoBuilder.setTableName(tableName);//入库的表名(长度128) 有表名默认入库
			mDCInfoBuilder.setModuleName(moduleName);//模块名
			mDCInfoBuilder.setMethodName(methodName);//方法名
			log.info(mDCInfoBuilder.build(), message);
			return true;
		} catch (Exception e) {
			return false;
		}
	}
	
	/**
	 * 新版日志保存日志公用方法(所有参数必传)
	 * @author Rain
	 * @time 2016年11月3日-下午1:59:09
	 * @param message 日志信息
	 * @param tableName 入库表名 长度128
	 * @param moduleName 模板名 长度128
	 * @param methodName 方法名 长度128
	 * @param courseId 课程编号 
	 * @param type 日志类型 长度32
	 * @param tag 日志标识 用于精确搜索时使用 长度32
	 * @return true or false
	 */
	protected boolean saveLogger(String message,String tableName,String moduleName,String methodName,Long courseId,String tag){
		
		try {
			if (StringUtils.isEmpty(message) || StringUtils.isEmpty(tableName) || StringUtils.isEmpty(moduleName) || StringUtils.isEmpty(methodName) || StringUtils.isEmpty(tag)){
				return false;
			}
			
			MDCInfoBuilder mDCInfoBuilder = MDCInfoBuilder.create();
			mDCInfoBuilder.put("userId", getLoginUID().toString()); //用户
			mDCInfoBuilder.put("courseId", String.valueOf(courseId)); //用户
			mDCInfoBuilder.setType("yewu");
			mDCInfoBuilder.setTag(tag);
			mDCInfoBuilder.setTableName(tableName);//入库的表名(长度128) 有表名默认入库
			mDCInfoBuilder.setModuleName(moduleName);//模块名
			mDCInfoBuilder.setMethodName(methodName);//方法名
			
			log.info(mDCInfoBuilder.build(), message);
			return true;
		} catch (Exception e) {
			log.info(e.getMessage());
			return false;
		}
	}

    /**
     * 每个Controller需要重写该方法
     * @return
     */
    protected LoggerCollectionEnum getCollectionEnum(){
        return LoggerCollectionEnum.chapterCollection;
    }

    @SuppressWarnings("unchecked")
	protected <T> List<T> stringToDtoList(String listString, Class<T> cls) {
        List<T> result = new LinkedList<T>();

        JSONArray jsonArray = JSONArray.fromObject(listString);
        for (Object o : jsonArray) {
            JSONObject obj = (JSONObject) o;
            try {
                T dto = cls.newInstance();
                BeanUtils.populate(dto,obj);
                result.add(dto);
            } catch (Exception e) {
                e.printStackTrace();
            }

        }

        return result;
    }

    public abstract class ResultRequestAndParser<T> {
        private String moduleNameCN ="未知模块名";
        private String moduleNameEn ="Unknown Module";
        private String methodNameCN="未知方法";
        private String methodNameEN="Unknown Method";
        private Long courseId;

        public String getModuleNameEn() {
            return moduleNameEn;
        }

        public void setModuleNameEn(String moduleNameEn) {
            this.moduleNameEn = moduleNameEn;
        }

        public String getModuleNameCN() {
            return moduleNameCN;
        }

        public void setModuleNameCN(String moduleNameCN) {
            this.moduleNameCN = moduleNameCN;
        }

        public String getMethodNameCN() {
            return methodNameCN;
        }

        public void setMethodNameCN(String methodNameCN) {
            this.methodNameCN = methodNameCN;
        }

        public String getMethodNameEN() {
            return methodNameEN;
        }

        public void setMethodNameEN(String methodNameEN) {
            this.methodNameEN = methodNameEN;
        }

        public ResultRequestAndParser(String moduleNameCN, String moduleNameEn, String methodNameCN, String methodNameEN) {
            this.moduleNameCN = moduleNameCN;
            this.moduleNameEn = moduleNameEn;
            this.methodNameCN = methodNameCN;
            this.methodNameEN = methodNameEN;
        }

        public abstract RemoteResult<T> request(Long curUserId) throws RemoteException;

        public RemoteResult<T> get(){
            RemoteResult<T>  result = null;
            String message = RequestUtil.fromRequestToJsonStr(getRequest());//courseId

            String courseId = getRequest().getParameter("courseId");
            if (!StringUtils.isEmpty(courseId)) {
                try {
                    this.courseId = Long.parseLong(courseId);
                } catch (Exception e) {
                }
            }
            String msg = null;
            Long updateUser=getLoginUID();
            String tag = "goodRunning";
            try {
                RemoteResult<T> rs = request(updateUser);
                result = rs;
                if (rs.isSuccess()) {
                    msg = String.format("%s-%s：%s！成功",moduleNameCN,methodNameCN, message);
                } else {
                	tag = "customException";
                    msg = String.format("%s-%s：%s 失败 ! 异常:%s", moduleNameCN,methodNameCN,message,getExceptionString(rs));
                }
            } catch (Exception e) {
                e.printStackTrace();
                tag = "systemException";
                msg = String.format("%s-%s：%s！出现异常：%s",moduleNameCN,methodNameCN,message, e.getMessage());
            }

            saveLogger(msg, getCollectionEnum().getTableName(), moduleNameEn, methodNameEN, this.courseId,tag);

            if (result == null) {
                result = new RemoteResult<T>();
                result.setSuccess(false);
                result.setErrorCode(-1);
            }

            return result;

        }

    }

    protected String getExceptionString(RemoteResult<?> rs) {
        String ret = "UNDEFINED";
        if(rs!=null && !rs.isSuccess() && rs.getExceptionStack()!=null){
            Exception exceptionStack = rs.getExceptionStack();
            ret = String.valueOf(exceptionStack);
        }
        return ret;
    }
    
    public static void main(String[] args) {
		System.out.println("treenity_meetCourse-saveOrUpdate".length());
	}
}
