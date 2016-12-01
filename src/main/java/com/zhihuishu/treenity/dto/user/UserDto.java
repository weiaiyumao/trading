package com.zhihuishu.treenity.dto.user;

import java.io.Serializable;
import java.util.Date;

public class UserDto implements Serializable {

	private static final long serialVersionUID = 1L;

	private Long userId ;			// 用户ID
	private String username ;		// 用户名(帐号)
	private String realname ;		// 用户真实姓名
	private String email ;			// 用户邮箱
	private String mobile ;			// 用户手机
	private String password ;		// 用户密码
	private String avatar ;			// 用户头像
	private Integer gender ;		// 用户性别
	private Date createTime ;		// 用户创建时间
	private Date updateTime ;		// 用户更新时间
	private Date lastLoginTime ;	// 最后登录时间
	private Integer loginCount ;	// 登录次数
	private Integer isAuth ;		// 是否认证：0未认证、1已认证
	private String source ;			// 注册来源
	private Integer isLock ;		// 是否锁定：0未锁定、1已锁定
	private Date unlockedTime ;		// 解除锁定时间
	private Integer bindType ;		// 是否绑定手机：0未绑定、1已绑定
	private Integer isDeleted ;	

	public Long getUserId() {
		return userId;
	}

	public void setUserId(Long userId) {
		this.userId = userId;
	}

	public String getUsername() {
		return username;
	}

	public void setUsername(String username) {
		this.username = username;
	}

	public String getRealname() {
		return realname;
	}

	public void setRealname(String realname) {
		this.realname = realname;
	}

	public String getEmail() {
		return email;
	}

	public void setEmail(String email) {
		this.email = email;
	}

	public String getMobile() {
		return mobile;
	}

	public void setMobile(String mobile) {
		this.mobile = mobile;
	}

	public String getAvatar() {
		return avatar;
	}

	public void setAvatar(String avatar) {
		this.avatar = avatar;
	}

	public Date getCreateTime() {
		return createTime;
	}

	public void setCreateTime(Date createTime) {
		this.createTime = createTime;
	}

	public Date getUpdateTime() {
		return updateTime;
	}

	public void setUpdateTime(Date updateTime) {
		this.updateTime = updateTime;
	}

	public Date getLastLoginTime() {
		return lastLoginTime;
	}

	public void setLastLoginTime(Date lastLoginTime) {
		this.lastLoginTime = lastLoginTime;
	}

	public Integer getLoginCount() {
		return loginCount;
	}

	public void setLoginCount(Integer loginCount) {
		this.loginCount = loginCount;
	}

	public String getPassword() {
		return password;
	}

	public void setPassword(String password) {
		this.password = password;
	}

	public Integer getGender() {
		return gender;
	}

	public void setGender(Integer gender) {
		this.gender = gender;
	}

	public Integer getIsAuth() {
		return isAuth;
	}

	public void setIsAuth(Integer isAuth) {
		this.isAuth = isAuth;
	}

	public Integer getIsLock() {
		return isLock;
	}

	public void setIsLock(Integer isLock) {
		this.isLock = isLock;
	}

	public Date getUnlockedTime() {
		return unlockedTime;
	}

	public void setUnlockedTime(Date unlockedTime) {
		this.unlockedTime = unlockedTime;
	}

	public Integer getBindType() {
		return bindType;
	}

	public void setBindType(Integer bindType) {
		this.bindType = bindType;
	}

	public Integer getIsDeleted() {
		return isDeleted;
	}

	public void setIsDeleted(Integer isDeleted) {
		this.isDeleted = isDeleted;
	}

	public String getSource() {
		return source;
	}

	public void setSource(String source) {
		this.source = source;
	}

}
