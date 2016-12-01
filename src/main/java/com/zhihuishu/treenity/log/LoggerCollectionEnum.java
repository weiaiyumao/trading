package com.zhihuishu.treenity.log;

/**
 * 日志集合表明
 * @author Administrator
 *
 */
public enum LoggerCollectionEnum {
	courseDataCollection("courseDataCollection"),
    disscussionCollection("disscussionCollection"),
	chapterCollection("chapterCollection"),
	lessonCollection("lessonCollection"),
	lessonVideoCollection("lessonVideoCollection"),
	courseCollection("courseCollection"),
	meetCourseCollection("meetCourseCollection"),
	courseSpeakerCollection("courseSpeakerCollection"),
	loginInfoColletcion("loginInfoColletcion"),
	courseSummaryCollection("courseSummaryCollection"),
	courseClipsCollection("courseClipsCollection"),
	scoreAssessRuleCollection("scoreAssessRuleCollection"),
	examCollection("examCollection"),//试卷表(包含章测试试卷、期末试卷)
	zTestQurstionCollection("zTestQurstionCollection"),// 试题表
	zTestQurstionOptionsCollection("zTestQurstionOptionsCollection"),//试题选项表(针对选择题和判断题)
	zTestQurstionWorkExamRelationCollection("zTestQurstionWorkExamRelationCollection"),//试卷和试题关联表
	releaseCourseCollection("releaseCourseCollection");//发布课程关联
	
	private String tableName;
	LoggerCollectionEnum(String tableName){
		this.tableName=tableName;
	}

	public String getTableName() {
	/*	SimpleDateFormat dateFormat=new SimpleDateFormat("yyyy_MM");
		
		return tableName+dateFormat.format(new Date());*/
		return tableName;
	}

	/*public void setTableName(String tableName) {
		this.tableName = tableName;
	}*/
	
}
