
package com.zhihuishu.treenity.service.user.impl;


import javax.annotation.Resource;

import org.apache.commons.lang3.StringUtils;
import org.springframework.stereotype.Service;

import com.zhihuishu.treenity.dto.user.UserDto;
import com.zhihuishu.treenity.service.impl.BaseService;
import com.zhihuishu.treenity.service.user.UserService;
import com.zhihuishu.treenity.util.PropertyUtils;
import com.zhihuishu.user.openapi.common.CertifyQueryOpenService;
import com.zhihuishu.user.openapi.common.UserQueryOpenService;
import com.zhihuishu.user.openapi.common.dto.UserOpenDto;
import com.zhihuishu.user.openapi.wrapper.ResultWrapper;

@Service("userService")
public class UserServiceImpl extends BaseService implements UserService {

	@Resource
	private UserQueryOpenService userQueryOpenService ;
	@Resource
	private CertifyQueryOpenService certifyQueryOpenService ;
	
	@Override
	public UserDto getByAccount(String account) {
		if(StringUtils.isBlank(account))return null;
		ResultWrapper<UserOpenDto> rw = userQueryOpenService.getByAccount(account) ;
		if(rw.isSuccessful()) {
			UserOpenDto uod = rw.getResult() ;
			if(uod == null) return null;
			return PropertyUtils.copyProperties(uod, UserDto.class);
		}else{
			return null;
		}
	}

}
