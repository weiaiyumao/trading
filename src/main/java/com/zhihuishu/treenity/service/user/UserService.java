package com.zhihuishu.treenity.service.user;

import com.zhihuishu.treenity.dto.user.UserDto;

/**
 * 
 * @author huyue
 * @date 2016年8月9日 下午7:45:40
 */
public interface UserService {
	/**
	 * <pre>
	 * 根据帐号查询用户基本信息，帐号指：手机、邮箱、用户名，区分规则是：
	 * 		1、长度为11位，并全是数字，并且首位是1，表示是手机
	 * 		2、非手机，但包含@和.表示是邮箱
	 * 		3、其它一律算作用户名
	 * <b style="color:#F00;">在明确知道帐号类型时，请不要使用此方法(性能)，应使用下面三个方法之一代替：</b>
	 * {@link #getByMobile(String)}
	 * {@link #getByEmail(String)}
	 * {@link #getByUsername(String)}
	 * </pre>
	 * @param account
	 * @return
	 */
	UserDto getByAccount(String account) ;
}
