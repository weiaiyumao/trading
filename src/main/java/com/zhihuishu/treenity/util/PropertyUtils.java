package com.zhihuishu.treenity.util;

import java.beans.PropertyDescriptor;
import java.lang.reflect.Method;
import java.lang.reflect.Modifier;
import java.util.ArrayList;
import java.util.Collection;
import java.util.Iterator;
import java.util.List;

import org.springframework.beans.BeanUtils;
import org.springframework.beans.FatalBeanException;
import org.springframework.util.Assert;
import org.springframework.util.CollectionUtils;


/**
 * 参考Spring的BeanUtils实现的对象间属性拷贝工具类
 * @see BeanUtils#copyProperties
 * @author	张立坤
 * @date	2014-3-6 下午2:34:04
 */
public final class PropertyUtils {
	
	/**
	 * 属性拷贝，过滤属性为NULL的元素
	 * @param source
	 * @param target
	 * @Date	2013-6-20
	 */
	public static final void copyProperties(Object source ,Object target) {
		copyProperties(source, target, true) ;
	}
	
	/**
	 * 批量拷贝属性(转换)
	 * @param source		源对象集合列表
	 * @param targetType	目标类型
	 * @return
	 * @date 2014-3-12 下午12:40:12
	 */
	public static final <S ,T> List<T> copyProperties(Collection<S> source ,Class<T> targetType) {
		if(CollectionUtils.isEmpty(source) || targetType == null) return null ;
		Iterator<S> iter = source.iterator() ;
		List<T> list = new ArrayList<T>(source.size()) ;
		while(iter.hasNext()) {
			list.add(copyProperties(iter.next(), targetType)) ;
		}
		return list ;
	}
	
	/**
	 * 批量拷贝属性(转换)
	 * @param source		源对象集合列表
	 * @param targetType	目标类型
	 * @return
	 * @date 2014-3-12 下午12:40:12
	 */
	public static final <S ,T> List<T> copyProperties(List<S> source ,Class<T> targetType) {
		if(CollectionUtils.isEmpty(source) || targetType == null) return null ;
		Iterator<S> iter = source.iterator() ;
		List<T> list = new ArrayList<T>(source.size()) ;
		while(iter.hasNext()) {
			list.add(copyProperties(iter.next(), targetType)) ;
		}
		return list ;
	}
	
	/**
	 * 使用转换器批量转换列表数据
	 * @param source
	 * @param convertor
	 * @return
	 */
	public static final <S ,T> List<T> copyProperties(Collection<S> source ,Convertor<T> convertor) {
		if(CollectionUtils.isEmpty(source) || convertor == null) return null ;
		List<T> list = new ArrayList<T>(source.size()) ;
		Iterator<S> iter = source.iterator() ;
		while(iter.hasNext()) {
			T t = convertor.convert(iter.next()) ;
			// 过滤转换后为空的对象
			if(t != null) list.add(t) ;
		}
		return list ;
	}
	
	/**
	 * 
	 * @param source		源对象
	 * @param targetType	目标对象类型
	 * @return				填充后的目标对象实例
	 * @date 2014-3-6 下午2:32:57
	 */
	public static final <T> T copyProperties(Object source ,Class<T> targetType) {
		if(source == null || targetType == null) return null ;
		T t = BeanUtils.instantiate(targetType) ;
		copyProperties(source, t) ;
		return t ;
	}
	
	/**
	 * 属性拷贝方法
	 * @param source			源
	 * @param target			目标
	 * @param isFilterNull		是否过滤Null值
	 * @Date	2013-6-8
	 */
	public static final void copyProperties(Object source ,Object target ,boolean isFilterNull) {

		Assert.notNull(source, "拷贝源对象不能为Null!");
		Assert.notNull(target, "拷贝目标对象不能为Null!");

		Class<?> actualEditable = target.getClass();
		PropertyDescriptor[] targetPds = getPropertyDescriptors(actualEditable);

		try {
			for (PropertyDescriptor targetPd : targetPds) {
				if (targetPd.getWriteMethod() != null) {							// 判断setter是否存在
					PropertyDescriptor sourcePd = getPropertyDescriptor(source.getClass(), targetPd.getName());
					if (sourcePd != null && sourcePd.getReadMethod() != null) {		// 判断getter是否存在
						Method readMethod = sourcePd.getReadMethod();
						if (!Modifier.isPublic(readMethod.getDeclaringClass().getModifiers())) {
							readMethod.setAccessible(true);
						}
						Object value = readMethod.invoke(source);	// 从source中取值
						if(isFilterNull) {							// 是否过滤空值
							if(value == null) {						// 将空值过滤
								continue ;		
							}
						}
						Method writeMethod = targetPd.getWriteMethod();
						if (!Modifier.isPublic(writeMethod.getDeclaringClass().getModifiers())) {
							writeMethod.setAccessible(true);
						}
						writeMethod.invoke(target, value);
					}
				}
			}
		} catch (Throwable ex) {
			throw new FatalBeanException("不能从源对象拷贝属性到目标对象!", ex);
		}
	}
	
	/**
	 * 获取属性描述信息
	 * @param clazz
	 * @param name
	 * @return
	 * @date	2013-5-7
	 */
	private static final PropertyDescriptor getPropertyDescriptor(Class<?> clazz, String name) {
		return BeanUtils.getPropertyDescriptor(clazz, name);
	}

	/**
	 * 获取属性信息信息
	 * @param clazz
	 * @return
	 * @date	2013-5-7
	 */
	private static final PropertyDescriptor[] getPropertyDescriptors(Class<?> clazz) {
		return BeanUtils.getPropertyDescriptors(clazz);
	}

}
