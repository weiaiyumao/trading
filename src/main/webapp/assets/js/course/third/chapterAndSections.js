var ueAfterSortBugStart = function ($row) {
    var ne = $row.data(ueJqueryDataAttr);
    var content = ne.getContent();
    var txt = ne.getContentTxt();

    //ue 拖动后值不正常问题
    $row.data("oldUEContent",content);
    $row.data("oldUEContentTxt",txt);
}
var ueAfterSortBugEnd = function ($row,placeholder) {
    var ne = $row.data(ueJqueryDataAttr);
    // console.log(ne);

    // var content = ne.getContent();
    var content = $row.data("oldUEContent");
    var txt = $row.data("oldUEContentTxt");

    //ue 拖动后值不正常问题
    ne.setContent($row.data("oldUEContent"));

    //safari拖动后空白问题
    //webkit拖动后空白问题
    // if($.isSafari){
        ne.setContent("");
        setTimeout(function () {
            if(txt!=placeholder){
                ne.setContent(content);
            }else{
                ne.setContent("",false,true,placeholder);
            }
        },1000);
    // }
}
var chapter_postChangeFunc = function (name,val,$new) {
    var name = name;
    var val = val;
    var dataParam = {id:$new.data('chapterId')};
    dataParam[name] = val;

    // console.log($new.data("container").getIndex($new));
    // console.log($new.data("container").getItems());

    postChangeCommonFunc(dataParam,'chapter');

    customCheckRowIntegrity($new);
}

var section_postChangeFunc = function (name,val,$new) {
    var name = name;
    var val = val;
    var dataParam = {id:$new.data('sectionId')};
    dataParam[name] = val;

    postChangeCommonFunc(dataParam,'lesson');

    customCheckRowIntegrity($new);
}

//TODO placeholderColor 待解决
var bindUEditor = function (areaObj, data, $new, nameAttr, cb, placeholder, defaultCls, actionCls) {
    actionCls = actionCls || 'edui-editor-step3-action';
    defaultCls = defaultCls || 'edui-editor-step3-default';
    var genDespId = "id-"+new Date().getTime()+"-"+nameAttr;
    var $newDiv = $("<div id='"+genDespId+"'></div>");
    $newDiv.addClass(defaultCls);
    // $newDiv.hide();


    var initialVal="";
    if (data&&data[nameAttr]) {
        initialVal = data[nameAttr];
    }
    areaObj.after($newDiv);
    areaObj.hide();
    $newDiv.show();

    // areaObj.val(initialVal);
    // areaObj.height(43);
    // areaObj.on("focus",function () {
    //     areaObj.blur();
    //     areaObj.hide();
    //     $newDiv.show();
    //     nE.focus();
    // });
    //
    // if (isEmpty(initialVal)) {
    //     areaObj.show();
    //     $newDiv.hide();
    // } else {
    //     areaObj.hide();
    //     $newDiv.show();
    // }


        try {
            // var nE = newEditor(genDespId,"100%",50);
            var nE = new UE.Editor({
                initialFrameWidth :"100%",//设置编辑器宽度
                initialFrameHeight:50,//设置编辑器高度
                autoHeightEnabled: true
            });

            // console.log(placeholder);
            // addhint(nE,placeholder);

            nE.render($newDiv[0]);

            nE.ready(function(e) {
                $new.data(ueJqueryDataAttr,nE);

                nE.setContent(initialVal,false,true,placeholder);  //赋值给UEditor

                // if (isEmpty(initialVal)) {
                //     nE.setContent("");
                // } else {
                //     nE.setContent(initialVal);  //赋值给UEditor
                // }
            });



            nE.addListener("blur", function (type, event) {
                var newContent = nE.getContent();
                areaObj.val(newContent);

                cb(nameAttr,newContent,$new);

                $newDiv.removeClass(actionCls);

                var curContent = nE.getContentTxt();
                if (isEmpty(curContent)){
                    nE.setContent("",false,true,placeholder);
                }
            });

            nE.addListener("focus", function (type, event) {
                $newDiv.addClass(actionCls);
            });
            nE.addListener("afterFocus", function (type, event) {
                var curContent = nE.getContentTxt();
                if(curContent==placeholder){
                    // nE.setContent("");
                    nE.setContent("");
                }
            });
            nE.addListener("mouseover", function (type, event) {
                if(!nE.isFocus()){
                    $newDiv.addClass(actionCls);
                }
            });
            nE.addListener("mouseout", function (type, event) {
                if(!nE.isFocus()) {
                    $newDiv.removeClass(actionCls);
                }
            });

            nE.addListener("keyup", function(type, event) {
                var count = nE.getContentLength(true);
                if(count>10000){
                    var contentText = nE.getContentTxt();
                    nE.setContent(contentText.substring(0, 10000));
                }
            });
        }catch (e){
            console.log(e);
        }

}

$(function () {

});

function _crud_chapterContainer(chapterListData) {
    // if (!initialQueryResult.chapter) {
    //     // $(".chapterContainer").html(getErrorDisplayHtml("chapter"));
    //     return ;
    // }
    return $(".chapterContainer").crudArea({
        init: {
            createComponent: function () {
                var $component = $("<div class='chapterComponent'></div>");
                $component.append($("<div class='chapterItems'></div>"));
                $component.append($(".hidden.container .addChapter").clone());
                return $component;
            },
            dataSrc:chapterListData,
            onInitOver:function(e) {
                var $this = this;
                var $plgThis = this;
                var opt = $plgThis.opt;
                var $component = $plgThis.com;

                // console.log(e.initialResultLength);
                // if (e.initialResultLength == 0){
                if (chapterListData.length == 0){
                    $this.fireAddOne();
                }


                // $component.delegate(opt.sort.handle,"mousedown",function (e) {
                //     // console.log(e);
                //     $.scrollYSmoothly(0,0);
                // });
            }
        },
        add: {
            btnClass: "addChapter .chapter-add-btn",
            onAdd: function (e, $btn,newIdx) {
                var $this = this;

                var dataParam = {"courseId" : $("#courseId").val()};
                dataParam.rank = newIdx;
                $.ajax({
                    url:basePath+"/course/thirdStep/chapter/create",
                    data: dataParam,
                    async:true,
                    success: function (json) {
                        if (isRequestSuccess(json)) {
                            var $new = $this.drawOneProcess(e, json.result);

                            //重新绘制序号
                            $this.drawIndex();

                            customCheckRowIntegrity($new);
                        }

                    }
                });

            }, containerClass: ".chapterItems"
        },
        draw: {
            create: function (e, data) {
                var $new = $(".hidden.container .chapter").clone();
                // $new.find("textArea.chapterInputField[name='description']").hide();

                if (data) {
                    $new.find("input.chapterInputField[name='name']").val(data.name);
                    $new.find("textArea.chapterInputField[name='description']").val(data.description);
                    // $new.find("input.chapterInputField[name='limitDay']").val(data.limitDay);
                    $new.find("input.chapterInputField[name='limitDayStr']").val(data.limitDay);
                    // $new.find("input.chapterInputField[name='studyHour']").val(data.studyHour);
                    $new.find("input.chapterInputField[name='studyHourStr']").val(data.studyHour);
                }

                return $new;
            },
            afterCreated: function (e, $new, data) {
                if (data) {
                    $new.data('chapterId', data.id);
                    $new.data('isPass', data.isPass);
                }

            },
            draw: function (e, $component, $new, data) {
                $component.children('.chapterItems').append($new);

            },
            afterDrawn: function (e, $component, $new, data) {
                e.scene = "chapter";
                var sectionEvent=cloneJSON(e);
                var quizEvent=cloneJSON(e);
                var discussionEvent=cloneJSON(e);

                if(data){
                    sectionEvent.lessonList = nullToEmptyArray(data.lessonList);
                }
                if(data){
                    quizEvent.examList = nullToEmptyArray(data.exam);
                }
                if(data){
                    discussionEvent.discussionList = nullToEmptyArray(data.discussionList);
                }

                //section & sectionVideo 同步
                _crud_section(sectionEvent, $new.find(".sectionContainer"), $new);
                _crud_quiz(quizEvent, $new.find(".quizContainer"), $new);
                _crud_discussion(discussionEvent,$new.find(".discussionContainer"), $new);

                // console.log('aaa');
            },
            afterAppend: function(e, $component, $new, data) {
                $new.delegate(".chapterInputField","blur",function () {
                    var name = $(this).attr("name");
                    var val = $(this).val();

                    chapter_postChangeFunc(name,val,$new);
                });

                bindUEditor($new.find("textArea.chapterInputField[name='description']"),data,$new, 'description',chapter_postChangeFunc,zLocale.thirdstep_section_desp);

            }
        },
        remove: {
            btnClass: "deleteChapter",
            onDelete: function (e, $btn, $row,deletedIdx,effectedJsonArray) {
                var $this = this;

                $.ajax({
                    url:basePath+"/course/thirdStep/chapter/delete",
                    type:"post",
                    data: {"chapterId": $row.data('chapterId'),"sortList":JSON.stringify(effectedJsonArray)},
                    async:true,
                    success: function (json) {
                        if (isRequestSuccess(json)) {
                            $row.remove();

                            //重新绘制序号
                            $this.drawIndex();

                            repaintNavTree();

                            //清除课程缓存
                            cleanTreeRedis($("#courseId").val());
                        }
                    }
                });

            },containerClass: ".chapterItems",
            sortPostGenerator: function ($effectedRowOneObj,sortAfterDeleted) {
                return {id:$effectedRowOneObj.data('chapterId'),rank:sortAfterDeleted};
            }
        },
        sort: {
            //containerClass 和 draggable必须是直接父子的关系
            containerClass: ".chapterItems",
            handle: ".chapter-handle",
            // draggable: ".chapter",
            sortPostUrl: basePath+"/course/thirdStep/chapter/sort",
            toTopBeforeSlide:true,
            // ghostClass:"catalog-chapter-hover",
            sortPostData: function (oIdx, nIdx, $obj,evt,jsonArr) {
                repaintNavTree();
                return {"sortList":JSON.stringify(jsonArr)};
                // return {oIdx:oIdx,nIdx:nIdx,srcId:$obj.data('chapterId'),"sortList":JSON.stringify(jsonArr)};
            },
            sortPostGenerator: function ($rowOneObj,sort) {
                return {id:$rowOneObj.data('chapterId'),rank:sort};
            },
            onSortStart: function (evt,$item) {
                $(".catalog-chapter").removeClass("catalog-chapter-hover");
                $item.find(".catalog-chapter").addClass("catalog-chapter-hover");

                ueAfterSortBugStart($item);

                $item.find(".section").each(function (idx, ele) {
                    ueAfterSortBugStart($(ele));
                });


            },
            onSortEnd: function (evt,$item) {
                $(".catalog-chapter").removeClass("catalog-chapter-hover");

                ueAfterSortBugEnd($item,zLocale.thirdstep_chapter_desp);

                $item.find(".section").each(function (idx, ele) {
                    ueAfterSortBugEnd($(ele),zLocale.thirdstep_section_desp);
                });

                // $.scrollSmoothly($item);
            },
            onMove: function (/**Event*/evt, /**Event*/originalEvent) {
                // Example: http://jsbin.com/tuyafe/1/edit?js,output
                // evt.dragged; // dragged HTMLElement
                // evt.draggedRect; // TextRectangle {left, top, right и bottom}
                // evt.related; // HTMLElement on which have guided
                // evt.relatedRect; // TextRectangle
                // originalEvent.clientY; // mouse position
                // return false; — for cancel
                var $item = $(evt.item);
                // console.log($(evt.item));
                // console.log(arguments);
                // $item.siblings().find(".catalog-chapter").removeClass("catalog-chapter-hover");
                // $(".catalog-chapter").removeClass("catalog-chapter-hover");
                // $item.find(".catalog-chapter").addClass("catalog-chapter-hover");

                // return true;
            }
        },
        index: {
            //containerClass 和 draggable必须是直接父子的关系
            containerClass: ".chapterItems",
            item: ".chapter",
            draw: function ($row, idx) {
                $row.find(".chapterIdx").text(idx + "");
                $row.data("index", idx);

                //需要chapter下的section重新绘制序号
                this.com.find(".sectionContainer").crudArea("drawIndex");
            }
        },
        slide: {
            slideClass: ".chapterTitle",
            addToggleHeaderCls: "ellipsis-blur  chapter-title-item-blur",
            toggleHeaderItem: ".chapter-title-item",
            ignoreSlide: ".ignoreSlide,.chapter-handle",
            toggleContent: ".chapterContent"
        },
        title_state:{
            inputStateCls:"chapterTitleInputState",
            inputLimitCls:"chapterTitleLimit",
            inputLimit:120,
            displayStateCls:"chapterTitleDisplayState",
            hiddenCls:"hidden",
            editCls:"editChapterTitle"
        },
        integrity:{
            checkRow:function ($row) {
                var textVals = $row.find(".chapterInputField");
                var ret = inputAllNotEmpty(textVals);
                // var nE = $row.data(ueJqueryDataAttr);
                // if(nE){
                //     // console.log('nE exists!!');
                //     var curContent = nE.getContentTxt();
                //     // console.log(curContent);
                //     ret=ret && !isEmpty(curContent);
                // }

                var sectionGt0 = $row.find(".sectionVideoContainer").crudArea("getItems").length>0;
                var quizGt0 = $row.find(".quizContainer").crudArea("getItems").length>0;
                var discussionGt0 = $row.find(".discussionContainer").crudArea("getItems").length>0;
                 ret = ret && sectionGt0 && quizGt0 && discussionGt0;

                return ret ;
            },
            whenIntegrityChanged:function ($row,oldIntegrity,newIntegrity) {
                // console.log(arguments);
                if(newIntegrity){
                    $row.find(".chapterIntegrity").removeClass("hintico").addClass("rightico");
                } else {
                    $row.find(".chapterIntegrity").removeClass("rightico").addClass("hintico");
                }


                var shouldPost = false;
                //若不为初始化时
                if(oldIntegrity != undefined){
                    // console.log('should post isPass'+newIntegrity);

                    shouldPost = true;
                } else {
                    // 否则
                    var isPassInDB = $row.data('isPass');

                    if(isPassInDB != newIntegrity){
                        shouldPost = true;
                    }
                }

                if(shouldPost){
                    postChangeCommonFunc({id:$row.data('chapterId'),isPass:newIntegrity?1:0},'chapter');
                }
            }
        },
        childrenContainer:function ($new) {
            return [
                $new.find(".sectionContainer"),
                $new.find(".quizContainer"),
                $new.find(".discussionContainer")
            ]
        }
    });
}
function _crud_section(_event, $container, $chapterRow) {
//        console.log(_event);
    if (!initialQueryResult.section) {
        $container.html(getErrorDisplayHtml("section"));
        return ;
    }
    $container.crudArea({
        init: {
            createComponent: function () {
                var $component = $("<div class='sectionComponent'></div>");
                $component.append($("<div class='sectionItems'></div>"));
                $component.append($(".hidden.container .addSection").clone());
                return $component;
            },
            onInit: function (e) {
//                    console.log(e);
                var $this = this;
                if (_event.mode == 'init') {
                    var arr = _event.lessonList;
                    $this.drawProcess(e, arr);
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
                }
            }
        },
        add: {
            btnClass: "addSection",
            onAdd: function (e, $btn,newIdx) {
                var $this = this;

                var dataParam = {"courseId" : $("#courseId").val()};
                dataParam.rank = newIdx;
                dataParam.chapterId=$chapterRow.data("chapterId");
                $.ajax({
                    url:basePath+"/course/thirdStep/lesson/create",
                    data: dataParam,
                    async:true,
                    success: function (json) {
                        if (isRequestSuccess(json)) {
                            var $new = $this.drawOneProcess(e, json.result);

                            //重新绘制序号
                            $this.drawIndex();

                            //检查完整度
                            customCheckRowIntegrity($chapterRow);
                        }

                    }
                });



            }, containerClass: ".sectionItems"
        },
        draw: {
            create: function (e, data) {
                var $new = $(".hidden.container .section").clone();
                // $new.find("textArea.sectionInputField[name='introduction']").hide();
                if (data) {
                    $new.find("input.sectionInputField[name='name']").val(data.name);
                    $new.find("textArea.sectionInputField[name='introduction']").val(data.introduction);
                }
                return $new;
            },
            afterCreated: function (e, $new, data) {
                if (data) {
                    $new.data('sectionId', data.id);
                }
            },
            draw: function (e, $component, $new, data) {
                $component.children('.sectionItems').append($new);
            },
            afterDrawn: function (e, $component, $new, data) {
                _event.scene = "section";

                var lessonVideoEvent=cloneJSON(_event);

                if(data&&data.lessonVideoList){
                    lessonVideoEvent.lessonVideoList = data.lessonVideoList;
                } else {
                    lessonVideoEvent.lessonVideoList = [];
                }

                _crud_section_video(lessonVideoEvent, $new.find(".sectionVideoContainer"), $chapterRow, $new);

            },
            afterAppend: function(e, $component, $new, data) {
                $new.delegate(".sectionInputField","blur",function () {
                    var name = $(this).attr("name");
                    var val = $(this).val();

                    section_postChangeFunc(name,val,$new);
                });

                bindUEditor($new.find("textArea.sectionInputField[name='introduction']"),data,$new, 'introduction',section_postChangeFunc,zLocale.thirdstep_chapter_desp);

            }
        },
        remove: {
            btnClass: "deleteSection",
            onDelete: function (e, $btn, $row,deletedIdx,effectedJsonArray) {
                var $this = this;

                $.ajax({
                    url:basePath+"/course/thirdStep/lesson/delete",
                    type:"post",
                    data: {"lessonId": $row.data('sectionId'),"sortList":JSON.stringify(effectedJsonArray)},
                    async:true,
                    success: function (json) {
                        if (isRequestSuccess(json)) {
                            $row.remove();

                            //重新绘制序号
                            $this.drawIndex();

                            //检查完整度
                            customCheckRowIntegrity($chapterRow);
                        }
                    }
                });
            },containerClass: ".sectionItems",
            sortPostGenerator: function ($effectedRowOneObj,sortAfterDeleted) {
                return {id:$effectedRowOneObj.data('sectionId'),rank:sortAfterDeleted};
            }
        },
        sort: {
            //containerClass 和 draggable必须是直接父子的关系
            containerClass: ".sectionItems",
            handle: ".section-handle",
            draggable: ".section",
            sortPostUrl: basePath+"/course/thirdStep/lesson/sort",
            sortPostData: function (oIdx, nIdx, $obj,evt,jsonArr) {
                repaintNavTree();


                return {sortList:JSON.stringify(jsonArr)};
                // return {oIdx:oIdx,nIdx:nIdx,srcId:$obj.data('sectionId'),changed:jsonArr};
            },
            sortPostGenerator: function ($rowOneObj,sort) {
                return {id:$rowOneObj.data('sectionId'),rank:sort};
            },
            onSortStart: function (evt,$item) {
                // console.log($item.siblings().find(".catalog-section"));
                $(".catalog-section").removeClass("catalog-section-hover");
                $item.find(".catalog-section").addClass("catalog-section-hover");


                ueAfterSortBugStart($item);
            },
            onSortEnd: function (evt,$item) {
                $(".catalog-section").removeClass("catalog-section-hover");
                ueAfterSortBugEnd($item,zLocale.thirdstep_section_desp);
            }
        },
        index: {
            //containerClass 和 draggable必须是直接父子的关系
            containerClass: ".sectionItems",
            item: ".section",
            draw: function ($row, idx) {
                $row.find(".sectionIdx").text(idx + "");
                $row.data("index", idx);

                //需要section下的video重新绘制序号
                this.com.find(".sectionVideoContainer").crudArea("drawIndex");
            }
        },
        slide: {
            slideClass: ".sectionTitle",
            ignoreSlide: ".ignoreSlide,.section-handle",
            addToggleHeaderCls: "ellipsis-blur section-title-item-blur",
            toggleHeaderItem: ".section-title-item",
            toggleContent: ".sectionContent"
        },
        title_state:{
            inputStateCls:"sectionTitleInputState",
            inputLimitCls:"sectionTitleLimit",
            inputLimit:120,
            displayStateCls:"sectionTitleDisplayState",
            hiddenCls:"hidden",
            editCls:"editSectionTitle"
        },
        integrity:{
            checkRow:function ($row) {
                var $plgThis = this;
                var textVals = $row.find(".sectionInputField");

                var val = $row.find(".sectionVideoContainer").crudArea("getItems").length>0;
                var ret = inputAllNotEmpty(textVals) && val;

                // var nE = $row.data(ueJqueryDataAttr);
                // if(nE){
                //     var curContent = nE.getContentTxt();
                //     ret=ret && !isEmpty(curContent);
                // }
                return ret ;
            },
            whenIntegrityChanged:function ($row,oldIntegrity,newIntegrity) {
                if(newIntegrity){
                    $row.find(".sectionIntegrity").removeClass("hintico").addClass("rightico");
                } else {
                    $row.find(".sectionIntegrity").removeClass("rightico").addClass("hintico");
                }
            }
        }
    });
}

function _crud_section_video(_event, $container, $chapterRow, $sectionRow) {
//        console.log(_event);
    var createLvParam = function (uploadJson,newIdx) {
        var fileData = uploadJson.data;
        var fileUrl = fileData.filePath;
        var img="http://base1.zhihuishu.com/able-commons/upload/videoImage?videoId="+fileData.videoId+".jpg";
        var fileSuffix = fileData.suffix;
        var fullFileName = fileData.fileName;
        var filePrefix = fullFileName.substring(0,fullFileName.lastIndexOf(fileSuffix)-1);

        var dataParam = {"courseId" : $("#courseId").val()};
        dataParam.rank = newIdx;
        dataParam.chapterId=$chapterRow.data("chapterId");
        dataParam.lessonId=$sectionRow.data("sectionId");
        dataParam.videoId=fileData.videoId;
        dataParam.videoImg=img;
        dataParam.fileName=fullFileName;
        dataParam.lessonName=filePrefix;
        dataParam.videoUrl=fileData.filePath;
        dataParam.videoNetUrl=fileData.fileUrl;
        // dataParam.videoSec=0;
        return dataParam;
    }

    $container.crudArea({
        init: {
            createComponent: function () {
                var $component = $("<div class='sectionVideoComponent'></div>");
                $component.append($("<div class='sectionVideoItems'></div>"));
                $component.append($(".hidden.container .addSectionVideo").clone());
                return $component;
            },
            dataSrc: _event.lessonVideoList,
            onInitOver:function () {
                var $this = this;
                var $plgThis = this;
                var opt = $plgThis.opt;
                var $component = $plgThis.com;
                var newCls = opt.draw.create().attr("class");


                //编辑按钮
                $component.delegate(".section-video-edit","click",function (e) {
                    var idx = $component.find(".section-video-edit").index(this);
                    var $new = $component.find("." + newCls).eq(idx);
                    
                    var top=$(this).offset().top;
                    //根据小节id、节id加载小节数据
                    videoOption_lessonVideo.getLessonVideoInfo($sectionRow.data("sectionId"),$new.data("sectionVideoId"));

                });


                //上传按钮
                var uploadParam = getSectionVideoUploadParam();
                uploadParam.callbacks ={
                    onFileDialogStart : function(tid) {

                    },
                    onError : function(id, fileName, reason) {

                    },
                    // 上传函数
                    onUpload : function(id, fileName) {

                    },
                    // 回调函数
                    onComplete : function (id, fileName, responseJSON) {
                        var newIdx = $this.getItems().length+1;
                        if (responseJSON != '') {
                            var fileData = responseJSON.data;

                            var dataParam = createLvParam(responseJSON,newIdx);

                            $.ajax({
                                url: basePath + "/course/thirdStep/lessonVideo/create",
                                data: dataParam,
                                async: true,
                                type:"POST",
                                success: function (json) {
                                    if (isRequestSuccess(json)) {
                                        var $new = $this.drawOneProcess({}, json.result);

                                        //重新绘制序号
                                        $this.drawIndex();

                                        //检查完整度
                                        customCheckRowIntegrity($sectionRow);

                                        _hook_after_upload(fileData.videoId);
                                    }

                                }
                            });
                        }
                    }
                }


                try {
                    var generatedId="uploadLv"+new Date().getTime();
                    $component.find(".addSectionVideo .addSectionVideoSpan").attr("id",generatedId);
                    uploadParam.targetId=generatedId;

                    var realLogic=function () {
                        $component.find(".addSectionVideo .addSectionVideoSpan").Ableuploader(uploadParam);

                        $component.find(".addSectionVideo .addSectionVideoSpan .qq-upload-button-selector").addClass("upload-video-btn-tmp");
                        $component.find(".addSectionVideo").addClass("upload-video-btn-tmp");
                    }
                    if($.isIE){
                        setTimeout(realLogic, 0);
                    }else{
                        realLogic();
                    }

                }catch (e){console.log(e);}
            }
        },
        draw: {
            create: function (e, data) {
                var $new = $("<li class='sectionVideo'></li>");
                var $one ;
                if (data&&data.videoSec) {
                    $one =  $(".hidden.container .section-video-item.transcoded").clone();
                    $one.find(".sectionVideoName").text(data.lessonName).attr("title",data.lessonName);
                    // $new.css('background-image', 'url("' + data.image + '")');
                    // $new.css('background-size', 'cover');

                    // if($.isLowerIE()){
                    //     console.log('isLowerIE:'+$.isLowerIE());
                    //     $one.find(".sectionVideoImg")[0].src=data.videoImg+ Date();
                    //
                    //     // var $org = $one.find(".sectionVideoImg");
                    //     // console.log($org.html());
                    //     // $org.wrap("<div></div>").parent().html($org).children().unwrap();
                    //     // $org.css('background', 'url("'+data.videoImg+'") no-repeat!important;');
                    // }else{
                        $one.find(".sectionVideoImg").attr("src", data.videoImg);
                    // }
                } else {
                    $one =  $(".hidden.container .section-video-item.notTranscoded").clone();
                }
                $new.append($one);
                return $new;
            },
            afterCreated: function (e, $new, data) {
                // console.log(data);
                if (data) {
                    // console.log($new);
                    $new.data('sectionVideoId', data.id);
                    // console.log( $new.data('sectionVideoId'));
                }
            },
            draw: function (e, $component, $new, data) {
                $component.children('.sectionVideoItems').append($new);
            },
            afterDrawn: function (e, $component, $new, data) {
                var $this = this;
                var $plgThis = this;

                var rebindReplaceFunc = function ($rowOne) {
                    var replaceUploadParam = getSectionVideoUploadParam();
                    var idx = $plgThis.getIndex($rowOne);

                    replaceUploadParam.buttonClass="";//没样式
                    replaceUploadParam.callbacks ={
                        onFileDialogStart : function(tid) {

                        },
                        onError : function(id, fileName, reason) {

                        },
                        // 上传函数
                        onUpload : function(id, fileName) {

                        },
                        // 回调函数
                        onComplete : function (id, fileName, responseJSON) {
                            if (responseJSON != '') {
                                var fileData = responseJSON.data;
//
                                var replaceParam = createLvParam(responseJSON,idx);
                                replaceParam.id=$rowOne.data("sectionVideoId");

                                $.ajax({
                                    url:basePath+"/course/thirdStep/lessonVideo/replace",
                                    type:"post",
                                    data: replaceParam,
                                    async: true,
                                    type:"POST",
                                    success: function (json) {
                                        if (isRequestSuccess(json)) {
                                            _hook_after_upload(fileData.videoId);

                                            //变为转码中
                                            var afterReplace = $(".hidden.container .section-video-item.notTranscoded").clone();
                                            $rowOne.html(afterReplace);

                                            $rowOne.data('sectionVideoId', json.result.id);
                                            rebindReplaceFunc($new);

                                            //重新绘制序号
                                            $this.drawIndex();

                                        }
                                    }
                                });

                            }
                        }
                    }




                    try {
                        // $rowOne.find(".sectionVideoReplace").css("z-index","99999");
                        var generatedId2="replaceLv"+new Date().getTime();
                        $rowOne.find(".sectionVideoReplace .replaceSectionVideoSpan").attr("id",generatedId2);
                        replaceUploadParam.targetId=generatedId2;
                        replaceUploadParam.buttonWidth ="20";
                        replaceUploadParam.buttonHeight ="20";// IE789下设置此按钮高度生效

                        var realLogic=function () {
                            $rowOne.find(".sectionVideoReplace .replaceSectionVideoSpan").Ableuploader(replaceUploadParam);
                            // console.log('sdsddsdssdsdsd');
                        }

                        if($.isIE){
                        // if($.isIELte9()){
                            setTimeout(function () {
                                realLogic();
                                // $rowOne.find(".sectionVideoReplace").children().css("z-index","999999");
                            }, 0);
                        }else{
                            realLogic();
                        }
                    }catch (e){console.log(e);}
                };

                rebindReplaceFunc($new);

            }
        },
        remove: {
            btnClass: "deleteSectionVideo",
            onDelete: function (e, $btn, $row,deletedIdx,effectedJsonArray) {
                var $this = this;

                $.ajax({
                    url:basePath+"/course/thirdStep/lessonVideo/delete",
                    type:"post",
                    data: {"lessonVideoId": $row.data('sectionVideoId'),"sortList":JSON.stringify(effectedJsonArray)},
                    async:true,
                    success: function (json) {
                        if (isRequestSuccess(json)) {
                            $row.remove();

                            //重新绘制序号
                            $this.drawIndex();

                            //检查完整度
                            customCheckRowIntegrity($sectionRow);
                        }
                    }
                });
            },containerClass: ".sectionVideoItems",
            sortPostGenerator: function ($effectedRowOneObj,sortAfterDeleted) {
                return {id:$effectedRowOneObj.data('sectionVideoId'),sort:sortAfterDeleted};
            }
        },
        sort: {
            //containerClass 和 draggable必须是直接父子的关系
            containerClass: ".sectionVideoItems",
//                handle: ".quizQuestion-handle",没有handle
            draggable: ".sectionVideo",
            filter: $.isIE9?"":".sortIgnore",//ie9会导致替换按钮失效
            sortPostUrl: "/sectionVideo/update/sort",
            sortPostUrl: basePath+"/course/thirdStep/lessonVideo/sort",
            sortPostData: function (oIdx, nIdx, $obj,evt,jsonArr) {
                return {sortList:JSON.stringify(jsonArr)};
            },
            sortPostGenerator: function ($rowOneObj,sort) {
                return {id:$rowOneObj.data('sectionVideoId'),rank:sort};
            }
        },
        index: {
            //containerClass 和 draggable必须是直接父子的关系
            containerClass: ".sectionVideoItems",
            item: ".sectionVideo",
            draw: function ($row, idx) {
                var idxStr = $chapterRow.data("index") + ".";
                idxStr = idxStr + $sectionRow.data("index") + ".";
                idxStr = idxStr + idx;
                $row.find(".sectionVideoIdx").text(idxStr);
            }
        }
    });


}

var _hook_after_upload = function(vidId){
    //TODO 上正式时注释
    if(_debug){
        window.open("http://base1.zhihuishu.com/able-commons//resources/cdn/ableplayer/2.0/demo.html?id="+vidId);
    }
}

function getSectionVideoUploadParam() {
    return {
        appName : "createcourse",// 对应应用名称
        modelName : "sectionVideo",// 可不写，按文件类型命名，视频为video、图片为image、其他文件为file
        userId : "42", // 填写用户ID
        userName : "test",
        fileType : "video", // 上传文件类型三类： image; video; file;
        smallImgSize : "100:100", //图片或者视频的三种裁图大小
        bigImgSize : "115:141",
        middleImgSize : "260:250",
        autoConvert : "true", // true为自动转换，false或者不配置为不自动转换(上传里需要自带文档转换,Flex上传不需要自带转换.)
        vIsUploadLetv : "true", // 是否将视频上传到乐视
        // targetId : "fine-uploader", // 为按钮目标标签ID
        showProgress : "true", // 是否显示任务栏进度条
        multipleUpload : "false",
        buttonWidth : "195",
        buttonHeight : "112",// IE789下设置此按钮高度生效
        buttonText : "",
        z_language : z_locale,//上传进度国际化 1.中文 2.英文
        buttonClass : "",
        allowSuffix : limit_video_suffix,// 限制文件上传类型
        videoConvert : "true",
        host : "http://base1.zhihuishu.com/able-commons/",
    }
}