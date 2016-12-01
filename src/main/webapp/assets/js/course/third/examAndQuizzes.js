//第三步试题添加百度编辑器下标
window.edIndex = 0;
var $curAdd;
var $curAddQuiz;
var curQuizAddParam;
var upData;
$(function () {

});

var finalExam_postChangeFunc = function (name,val,$new) {
    var name = name;
    var val = val;
    var dataParam = {id:$new.data('quizId')};
     dataParam.courseId =$("#courseId").val();
     dataParam[name=="duration"?"limitTime":name] = val;
    $.ajax({
        url:basePath + "/course/thirdStep/StepQuiz/updateExam",
        data: dataParam,
        type:"post",
        async:true,
        success: function (json) {
            // if (isRequestSuccess(json)) {
                customCheckRowIntegrity($new);
            // }
        }
    });
}


function _crud_finalExamContainer(finalExamListData) {
    if (!initialQueryResult.finalExam) {
        $(".finalExamContainer").html(getErrorDisplayHtml("finalExam"));
        return ;
    }


    return $(".finalExamContainer").crudArea({
        init: {
//				dataSrc:[{},{}] ,//
            createComponent: function () {
                var $component = $("<div class='final_examComponent'></div>");
                $component.append($("<div class='final_examItems'></div>"));
                $component.append($("<div class='addFinalExamHide'></div>"));
                return $component;
            },
            dataSrc:finalExamListData,
            onInitOver:function(e) {
                var $this = this;
                // console.log(e.initialResultLength);
                // if (e.initialResultLength == 0){
                if (finalExamListData.length == 0){
                    $this.fireAddOne();
                    // $this.drawOneProcess(e, {});

                }
            }
        },
        add: {
            btnClass: "addFinalExamHide",
            onAdd: function (e, $btn,newIdx) {
                var $this = this;

                var dataParam = {"courseId" : $("#courseId").val()};
                dataParam.whether=1;
                $.ajax({
                    // url:basePath+"/course/thirdStep/StepQuiz/saveQuestion",
                    url:basePath+"/course/thirdStep/StepQuiz/creatExamid",
                    data: dataParam,
                    async:true,
                    type:"post",
                    success: function (json) {
                        console.log(json);
                         if (isRequestSuccess(json)) {

                             var rs = {};
                             rs.id=json.result;
                             var $new = $this.drawOneProcess(e, rs);

	                        // json.result.id=json.result.examId;
	                        // var $new = $this.drawOneProcess(e, json.result);

                             customCheckRowIntegrity($new);
                         }

                    }
                });

            }, containerClass: ".final_examItems"
        },
        draw: {
            create: function (e, data) {
                var $new = $(".hidden.container .final_exam").clone();
                if (data) {
                    // $new.find(".final_examTitle").text(data.name);
                    // console.log(data.title);
                    // console.log( $new.find("input.finalExamInputField[name='title']"));
                    $new.find("input.finalExamInputField[name='title']").val(data.title);
                    $new.find("textArea.finalExamInputField[name='duration']").val(data.limitTime);
                    $new.find("textArea.finalExamInputField[name='description']").val(data.description);
                    $new.find(".fullMark").text(data.totalScore);
                    $new.find(".totalNumber").text(data.totalQuestionNumber);
                }
                return $new;
            },
            afterCreated: function (e, $new, data) {
                if (data) {
                    $new.data('quizId', data.id);
                }
            },
            draw: function (e, $component, $new, data) {
                $component.children('.final_examItems').append($new);
            },
            afterDrawn: function (e, $component, $new, data) {
                e.scene = "final_exam";
                if (data) {
                    e.data = data.questionList;
                }
                _crud_quiz_question($.extend({}, e), $component.find(".quizQuestionContainer"), null, $new);
            },
            afterAppend: function(e, $component, $new, data) {
                $new.delegate(".finalExamInputField","blur",function () {
                    var name = $(this).attr("name");
                    var val = $(this).val();

                    finalExam_postChangeFunc(name,val,$new);
                });

                bindUEditor($new.find("textArea.finalExamInputField[name='description']"),data,$new, 'description',finalExam_postChangeFunc,zLocale.thirdstep_exam_description,'edui-editor-step3-finalExam-default','edui-editor-step3-finalExam-action');

            }
        },
        slide: {
            slideClass: ".final_examTitle",
            ignoreSlide: ".ignoreSlide",
            addToggleHeaderCls: "ellipsis-blur   exam-title-item-blur",
            toggleHeaderItem: ".exam-title-item",
            toggleContent: ".final_examContent",
            toggleMark:".exam-btn-toggle"
        },
        title_state:{
            inputStateCls:"finalExamTitleInputState",
            inputLimitCls:"finalExamTitleLimit",
            inputLimit:120,
            displayStateCls:"finalExamTitleDisplayState",
            hiddenCls:"hidden",
            editCls:"editFinalExamTitle",
        },
        integrity:{
            checkRow:function ($row) {
                var $plgThis = this;

                // console.log($row.find(".quizQuestionContainer").crudArea("getItems"));
                var val = $row.find(".quizQuestionContainer").crudArea("getItems").length>0;
                var ret = val;

                var titleNotNull = !isEmpty($row.find("input.finalExamInputField[name='title']").val());
                // console.log(titleNotNull);
                var durationNotNull = !isEmpty($row.find("textArea.finalExamInputField[name='duration']").val());
                // console.log(durationNotNull);
                ret = ret & titleNotNull & durationNotNull;
                return ret ;
            },
            whenIntegrityChanged:function ($row,oldIntegrity,newIntegrity) {
                if(newIntegrity){
                    $row.find(".final_examIntegrity").removeClass("hintico").addClass("rightico");
                } else {
                    $row.find(".final_examIntegrity").removeClass("rightico").addClass("hintico");
                }

                var shouldPost = false;
                //若不为初始化时
                if(oldIntegrity != undefined){
                    // console.log('should post isPass'+newIntegrity);

                    shouldPost = true;
                }

                if(shouldPost){
                    //清除课程缓存
                    cleanTreeRedis($("#courseId").val());
                }

            }
    }

    });
}
function _crud_quiz(_event, $container, $chapterRow) {
    if (!initialQueryResult.quiz) {
        $container.html(getErrorDisplayHtml("quiz"));
        return ;
    }
    $container.crudArea({
        init: {
            createComponent: function () {
                var $component = $("<div class='quizComponent'></div>");
                $component.append($("<div class='quizItems'></div>"));
                $component.append($("<div class='addQuizHide'></div>"));
                return $component;
            },
            onInit: function (e) {
                var $this = this;
                // if (_event.mode == 'init') {
                //     if (_event.examList.length==0){
                //         $this.drawProcess(e, [{}]);
                //     }else {
                //         $this.drawProcess(e, _event.examList);
                //     }
                // }
                // else if (_event.mode == 'add') {
                //     //初始化组件
                //     $this.drawProcess(e, [{}]);
                // }

                if (_event.mode == 'init') {
                    $this.drawProcess(e, _event.examList);
                } else if (_event.mode == 'add') {
                    //初始化组件
                    $this.drawProcess(e, []);

                }
            },
            onInitOver: function (e) {
                var $this = this;
                if (_event.mode == 'add') {
                    //自动添加一个新的
                    $this.fireAddOne();
                    // $this.drawOneProcess(e, {});
                }

                if (_event.mode == 'init' && _event.examList.length==0) {
                    $this.fireAddOne();
                }

            }
        },
        add: {
            btnClass: "addQuizHide",
            onAdd: function (e, $btn,newIdx) {
                var $this = this;

                var dataParam = {"courseId" : $("#courseId").val()};
                dataParam.whether=2;
                dataParam.chapterId=$chapterRow.data("chapterId");
                dataParam.orderNumber=$chapterRow.data("container").getIndex($chapterRow);
                $.ajax({
                    // url:basePath+"/course/thirdStep/StepQuiz/saveQuestion",
                    url:basePath+"/course/thirdStep/StepQuiz/creatExamid",
                    data: dataParam,
                    async:true,
                    type:"post",
                    success: function (json) {
                        console.log(json);
                        if (isRequestSuccess(json)) {

                            var rs = {};
                            rs.id=json.result;
                            var $new = $this.drawOneProcess(e, rs);

                            customCheckRowIntegrity($new);
                        }

                    }
                });

            }, containerClass: ".quizItems"
        },
        draw: {
            create: function (e, data) {
                var $new = $(".hidden.container .quiz").clone();
                if (data) {
                    $new.find(".fullMark").text(data.totalScore);
                    $new.find(".totalNumber").text(data.totalQuestionNumber);
                }

                return $new;
            },
            afterCreated: function (e, $new, data) {
                if (data) {
                    $new.data('quizId', data.id);
                }
            },
            draw: function (e, $component, $new, data) {
                $component.children('.quizItems').append($new);
            },
            afterDrawn: function (e, $component, $new, data) {
                var quizQuestionEvent=cloneJSON(e);
                quizQuestionEvent.scene = "quiz";
                if(data){
                    quizQuestionEvent.data = nullToEmptyArray(data.questionList);
                }
                _crud_quiz_question(quizQuestionEvent, $component.find(".quizQuestionContainer"), $chapterRow, $new);
            }
        },
        slide: {
            slideClass: ".quizTitle",
            ignoreSlide: ".ignoreSlide,.quiz-handle",
            toggleContent: ".quizContent"
        },
        integrity:{
            checkRow:function ($row) {
                var $plgThis = this;

                // console.log($row.find(".quizQuestionContainer").crudArea("getItems"));
                var val = $row.find(".quizQuestionContainer").crudArea("getItems").length>0;
                var ret = val;

                return ret ;
            },
            whenIntegrityChanged:function ($row,oldIntegrity,newIntegrity) {
                if(newIntegrity){
                    $row.find(".quizIntegrity").removeClass("hintico").addClass("rightico");
                } else {
                    $row.find(".quizIntegrity").removeClass("rightico").addClass("hintico");
                }

                // var shouldPost = false;
                // //若不为初始化时
                // if(oldIntegrity != undefined){
                //     // console.log('should post isPass'+newIntegrity);
                //
                //     shouldPost = true;
                // }
                //
                // if(shouldPost){
                //     $.ajax( {
                //         url : basePath+"/course/cleanTreeRedis",
                //         type : "POST",
                //         data: {"courseId":$("#courseId").val()}
                //     });
                // }

            }
        }
    });
}
function _crud_quiz_question_replace_problem($quizQuestionRow,str) {
    baiduEditor.ready(function(e) {
        baiduEditor.setContent(str);  //赋值给UEditor
        var plainTxt = baiduEditor.getContentTxt();

        $quizQuestionRow.find(".quizProblem").text(plainTxt);
        $quizQuestionRow.find(".quizProblem").attr("title",plainTxt);
    });
}
function _crud_quiz_question(_event, $container, $chapterRow, $quizRow) {
    $container.crudArea({
        init: {
            createComponent: function () {
                var $component = $("<div class='quizQuestionComponent'></div>");
                $component.append($("<div class='quizQuestionItems'></div>"));
                $component.append($(".hidden.container .addQuizQuestion").eq(0).clone());
                return $component;
            },
            dataSrc: _event.data,
            onInitOver:function () {
                var $this = this;
                var $plgThis = this;
                var opt = $plgThis.opt;
                var $component = $plgThis.com;

                // $component.on("mousedown",".question-item-editable",function (e) {
                //     console.log("click");
                //     console.log(e);
                // });
            }
        },
        add: {
            btnClass: "addQuizQuestion .quiz-add-btn",
            onAdd: function (e, $btn,newIdx) {
            	$curAdd=this;
            	$curAddQuiz=$quizRow;
            	curQuizAddParam = {};
                if ($chapterRow){
                    console.log('chapterId'+$chapterRow.data('chapterId'));
                    curQuizAddParam.chapterId=$chapterRow.data('chapterId');
                    curQuizAddParam.chapterIdx = $chapterRow.data("container").getIndex($chapterRow);
                }
                if ($quizRow){
                    console.log('quizId'+$quizRow.data('quizId'));
                    curQuizAddParam.quizId=$quizRow.data('quizId');
                   
                }
                curQuizAddParam.curQuizindex=newIdx;
                console.log(curQuizAddParam);
            if(_event.scene=="quiz"){//章测试
            	layer.closeAll();//关闭全部窗口
        		$("#testPaperType").val(0);//设置试卷类型【0：章测试；1：期末考试】
        		layerQuestionType("#testType","790px","auto",zLocale.thirdstep_wentileixing,"add");
            }else if(_event.scene=="final_exam"){
            	//期末考试
            		layer.closeAll();//关闭全部窗口
            		$("#testPaperType").val(1);
            		layerQuestionType("#testType","790px","auto",zLocale.thirdstep_wentileixing,"add");
            	}
            },
            containerClass: ".quizQuestionItems"
        },
        draw: {
            create: function (e, data) {
                var $new = $(".hidden.container .quizQuestion").eq(0).clone();
                if (data) {
                    _crud_quiz_question_replace_problem($new,data.name);

                    if(data.type == 2){
                    	$new.find(".questionItemType").html($(".hidden.questions .question-item-type-choice").clone());
                    }else if (data.type == 3){
                    	$new.find(".questionItemType").html($(".hidden.questions .question-item-type-blank").clone());
                    }else if (data.type == 14){
                    	$new.find(".questionItemType").html($(".hidden.questions .question-item-type-true-fales").clone());
                    }else if (data.type == 4){
                    	$new.find(".questionItemType").html($(".hidden.questions .question-item-type-essay").clone());
                    }
                    
                }
                return $new;
            },
            afterCreated: function (e, $new, data) {
                if (data) {
                    $new.data('quizQuestionId', data.id);
                      $new.data('score', data.score);
                    
                    if (data.quizId && !$quizRow.data('quizId')) {
                    	$quizRow.data('quizId',data.quizId);
                    }
                }
            },
            draw: function (e, $component, $new, data) {
                $component.children('.quizQuestionItems').append($new);
            },
            afterDrawn: function (e, $component, $new, data) {
                //编辑事件
                $new.find(".question-item-editable").click(function () {
                	
                    var isMoving = $(this).parent().parent().data("_sort_moving");
                    if(isMoving){
                        return;
                    }
                    $curAdd=$new;
                    $curAddQuiz=$quizRow;

                    $.ajax({
                        type: "POST",
                        url: basePath + "/course/thirdStep/StepQuiz/getQuestion",
                        data:{"examId":$quizRow.data('quizId'),"questionId":data.id},
                        dataType:"json",
                        async:true,
                        success: function(datat){
                            upData=datat;
                            upData.examId=$quizRow.data('quizId');
                            $("#topicType").val(data.type);//设置试题类型【2：选择；3：填空；14：判断；4：问答】
                            layerQuestionType("#testType"+data.type,"790px","auto",data.type==2?zLocale.thirdstep_xuanzheti:data.type==3?zLocale.thirdstep_tiankongti:data.type==14?zLocale.thirdstep_panduanti:zLocale.thirdstep_wendati,datat,"N");
                        }
                    });


                });
            }
        },
        remove: {
            btnClass: "deleteQuizQuestion",
            onDelete: function (e, $btn, $row,deletedIdx,effectedJsonArray) {
            	var $this = this;
                var postParam = {effectedJsonArray:effectedJsonArray==""?"":JSON.stringify(effectedJsonArray),questionId: $row.data('quizQuestionId'),examId:$quizRow.data('quizId')};
                $.ajax({
          		   type: "POST",
          		   url: basePath + "/course/thirdStep/StepQuiz/deleteQuestion",
          		   data:postParam,
          		   dataType:"json",
          		   success: function(data){
          			 $quizRow.find(".fullMark").text($quizRow.find(".fullMark").text()*1-$row.data('score')*1);
          			 $quizRow.find(".totalNumber").text($quizRow.find(".totalNumber").text()*1-1);   
          			 $row.remove();
          			 $this.drawIndex();

                       //检查quiz完整度
                       customCheckRowIntegrity($quizRow);
          		   }
          		});
              /*  console.log($row);
           console.log(postParam);
                console.log(deletedIdx);
               console.log(effectedJsonArray);*/
                
            },
            containerClass: ".quizQuestionItems",
            sortPostGenerator: function ($effectedRowOneObj,sortAfterDeleted) {
                return {id:$effectedRowOneObj.data('quizQuestionId'),sort:sortAfterDeleted};
            }
        },
        sort: {
            //containerClass 和 draggable必须是直接父子的关系
            containerClass: ".quizQuestionItems",
            // handle: ".quizQuestion-handle",
            draggable: ".quizQuestion",
            // draggable: ".question-item-sortable",
            sortPostUrl:  basePath + "/course/thirdStep/StepQuiz/updateQuestionSort",//"/quiz_question/update/sort",
            sortPostData: function (oIdx, nIdx, $obj,evt,jsonArr) {
                console.log($obj);
                console.log(oIdx + ' ，' + nIdx);
                console.log(jsonArr);

                return {examId:$quizRow.data('quizId'),oIdx:oIdx,nIdx:nIdx,srcId:$obj.data('quizQuestionId'),changed:JSON.stringify(jsonArr)};
            },
            sortPostGenerator: function ($rowOneObj,sort) {
                return {id:$rowOneObj.data('quizQuestionId'),sort:sort};
            }
        },
        index: {
            //containerClass 和 draggable必须是直接父子的关系
            containerClass: ".quizQuestionItems",
            item: ".quizQuestion",
            draw: function ($row, idx) {
                $row.find(".quizQuestionIdx").text(idx + "");
            }
        }
    });
}