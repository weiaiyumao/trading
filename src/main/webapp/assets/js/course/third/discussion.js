var disscussion_postChangeFunc = function (name,val,$new) {
    var name = name;
    var val = val;
    var dataParam = {id:$new.data('discussionId')};
    dataParam[name] = val;
    dataParam.content=val;
    postChangeCommonFunc(dataParam,'disscussion');

    customCheckRowIntegrity($new);
}
//帖子表的增删改查
function _crud_discussion(_event, $container, $chapterRow) {
    if (!initialQueryResult.discussion) {
        $container.html(getErrorDisplayHtml("discussion"));
        return ;
    }
    $container.crudArea({
        init: {
            createComponent: function () {
                var $component = $("<div class='discussionComponent'></div>");
                $component.append($("<div class='discussionItems'></div>"));
                $component.append($(".hidden.container .addDiscussion").clone());
                return $component;
            },
            onInit: function (e) {
                var $this = this;
                if (_event.mode == 'init') {
                    $this.drawProcess(e, _event.discussionList);
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
        add: {//新增帖子
            btnClass: "addDiscussion .discussion-add-btn",
            onAdd: function (e, $btn,newIdx) {
                //TODO get data object through ajax .
            	var $this = this;
                var dataParam = {"courseId" : $("#courseId").val()};
                dataParam.rank = newIdx;
                dataParam.chapterId=$chapterRow.data("chapterId");
                dataParam.content='';
                dataParam.title ='';
                $.ajax({
                    url:basePath+"/course/thirdStep/disscussion/create",
                    data: dataParam,
                    async:true,
                    success: function (json) {
                    	console.log(json);
                    //if (isRequestSuccess(json)) {
                        json = JSON.parse(json);
                        var $new = $this.drawOneProcess(e, json.result);
                       //重新绘制序号
                       $this.drawIndex();

                        //检查完整度
                        customCheckRowIntegrity($new);
                             //}

                    }
                });
            }, containerClass: ".discussionItems"
        },
        draw: {
            create: function (e, data) {
                var $new = $(".hidden.container .discussion").clone();
                if (data) {
                    $new.find("input.discussionInputField[name='title']").val(data.title);
                }

                return $new;
            },
            afterCreated: function (e, $new, data) {
            	// console.log(data);
                if (data) {
                    $new.data('discussionId', data.id);
                }
            },
            draw: function (e, $component, $new, data) {
                $component.children('.discussionItems').append($new);
            },
            afterDrawn: function (e, $component, $new, data) {
                var discussionReferEvent=cloneJSON(e);
                discussionReferEvent.scene = "discussion";
                if(data){
                    discussionReferEvent.data = nullToEmptyArray(data.referList);
                }
                _crud_discussion_refer(discussionReferEvent, $component.find(".discussionReferContainer"), $chapterRow, $new);
            },
            afterAppend: function(e, $component, $new, data) {
                $new.delegate(".discussionInputField","blur",function () {
                    var name = $(this).attr("name");
                    var val = $(this).val();

                    console.log(name);
                    console.log(val);
                    console.log($new.data('discussionId'));
                    
                    disscussion_postChangeFunc(name,val,$new);
                });
            }
        },
        remove: {//删除帖子
            btnClass: "deleteDiscussion",
            onDelete: function (e, $btn, $row,deletedIdx,effectedJsonArray) {
            	var $this = this;
                $.ajax({
                    url:basePath+"/course/thirdStep/disscussion/delete",
                    type:"post",
                    data: {"discussionId": $row.data('discussionId'),"sortList":JSON.stringify(effectedJsonArray)},
                    async:true,
                    success: function (json) {
                    	    
                        $row.remove();
                        //重新绘制序号
                        $this.drawIndex();

                        //检查完整度
                        customCheckRowIntegrity($chapterRow);
                    }
                });
            	
//            	 $row.remove();
//                 //重新绘制序号
//                 $this.drawIndex();

            },containerClass: ".discussionItems",
            sortPostGenerator: function ($effectedRowOneObj,sortAfterDeleted) {
                return {id:$effectedRowOneObj.data('discussionId'),sort:sortAfterDeleted};
            }
        },
        sort: {
            //containerClass 和 draggable必须是直接父子的关系
            containerClass: ".discussionItems",
            handle: ".discussion-handle",
            draggable: ".discussion",
            sortPostUrl: "/discussion/update/sort",
            sortPostData: function (oIdx, nIdx, $obj,evt,jsonArr) {
                console.log($obj);
                console.log(oIdx + ' ' + nIdx);
                console.log(jsonArr);

                return {oIdx:oIdx,nIdx:nIdx,srcId:$obj.data('discussionId'),changed:jsonArr};
            },
            sortPostGenerator: function ($rowOneObj,sort) {
                return {id:$rowOneObj.data('discussionId'),sort:sort};
            }
        },
        index: {
            //containerClass 和 draggable必须是直接父子的关系
            containerClass: ".discussionItems",
            item: ".discussion",
            draw: function ($row, idx) {
                $row.find(".discussionIdx").text(idx + "");
            }
        },
        slide: {
            slideClass: ".discussionTitle",
            addToggleHeaderCls: "ellipsis-blur discussion-title-item-blur",
            toggleHeaderItem: ".discussion-title-item",
            ignoreSlide: ".ignoreSlide,.discussion-handle",
            toggleContent: ".discussionContent"
        },
        title_state:{
            inputStateCls:"discussionTitleInputState",
            inputLimitCls:"discussionTitleLimit",
            inputLimit:120,
            displayStateCls:"discussionTitleDisplayState",
            hiddenCls:"hidden",
            editCls:"editDiscussionTitle",
        },
        integrity:{
            checkRow:function ($row) {
                var $plgThis = this;
                var textVals = $row.find(".discussionInputField");

                var ret = inputAllNotEmpty(textVals) ;

                return ret ;
            },
            whenIntegrityChanged:function ($row,oldIntegrity,newIntegrity) {
                if(newIntegrity){
                    $row.find(".discussionIntegrity").removeClass("hintico").addClass("rightico");
                } else {
                    $row.find(".discussionIntegrity").removeClass("rightico").addClass("hintico");
                }
            }
        }
    });
}
//附件的上传和删除
function _crud_discussion_refer(_event, $container, $chapterRow, $discussionRow) {
//        console.log(_event);
    $container.crudArea({
        init: {
            createComponent: function () {
                var $component = $("<div class='discussionReferComponent'></div>");
                $component.append($("<div class='discussionReferItems'></div>"));
                $component.append($(".hidden.container .addDiscussionRefer").clone());
                return $component;
            },
            dataSrc: _event.data,
            onInitOver:function () {
                var $this = this;
                var $plgThis = this;
                var opt = $plgThis.opt;
                var $component = $plgThis.com;
                var newCls = opt.draw.create().attr("class");

                //上传按钮
                var $addBtn=$component.find(".addDiscussionRefer .refer-add-btn .add-btn-refer");
                var gid = new Date().getTime() +"";
                $addBtn.attr("id",gid);

                //点击时移除hover样式
                $addBtn.click(function () {
                    // console.log("aaaa");
                        $component.find(".addDiscussionRefer .qq-upload-button-hover")
                            // .css("border","1px solid #e5e5e5")
                            .removeClass("qq-upload-button-hover");
                });

                var uploadParam = getDiscussionReferUploadParam();
                // console.log($addBtn.attr("id"));
                uploadParam.targetId=gid;
                // console.log(uploadParam.targetId);
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
                        if (responseJSON != '') {
                            var fileData = responseJSON.data;
                            var dataParam = {"courseId" : $("#courseId").val()};
                            dataParam.dataId = $discussionRow.data("discussionId");
                            dataParam.url= fileData.filePath;
                            dataParam.size = fileData.size;
                            dataParam.suffix = fileData.suffix;
                            dataParam.name = fileData.fileName;
                            console.log(dataParam);
                            $.ajax({
                                url: basePath + "/course/thirdStep/courseData/create",
                                data: dataParam,
                                async: true,
                                type:"POST",
                                success: function (data) {
                                    //var data = eval('(' + json + ')');
                                    var fileName = data.name;
                                    var fileSize = data.size;
                                    var newData = {name:fileName,size:fileSize,id:data.id};
                                    var $new = $this.drawOneProcess({}, newData);

                                    // $component.find(".addDiscussionRefer .refer-add-btn .add-btn-refer .qq-upload-button-selector").removeClass("qq-upload-button-hover");
                                    // console.log($component.find(".addDiscussionRefer .refer-add-btn .add-btn-refer .qq-upload-button-selector"));

                                    $component.find(".addDiscussionRefer .refer-add-btn .add-btn-refer .qq-upload-button-selector input").blur();
                        
                                    //重新绘制序号
                                    $this.drawIndex();

                                }
                            });
                        }
                    }
                }

                try {

                    var realLogic=function () {
                        $component.find(".addDiscussionRefer .refer-add-btn .add-btn-refer").Ableuploader(uploadParam);
                    }

                    if($.isIE){
                        // if($.isIELte9()){
                        setTimeout(realLogic, 0);
                    }else{
                        realLogic();
                    }
                    // console.log(uploadParam);
                    // $component.find(".addDiscussionRefer").Ableuploader(uploadParam);
                    //$("#"+$addBtn.attr("id")).Ableuploader(uploadParam);
                }catch (e){console.log(e);}

            }
            
        },
        draw: {
            create: function (e, data) {
                var $new = $(".hidden.container .discussionRefer").clone();
                if (data) {

                    $new.find(".refer_title_span").text(data.name);
                    $new.find(".refer_size_span").text(numberToFixed(data.size));
                }
                return $new;
            },
            
            
            
            afterCreated: function (e, $new, data) {
                if (data) {
                    $new.data('discussionReferId', data.id);
                }
            },
            draw: function (e, $component, $new, data) {
                $component.children('.discussionReferItems').append($new);
            },
            afterDrawn: function (e, $component, $new, data) {

            }
        },
        remove: {//附件的删除
            btnClass: "deleteDiscussionRefer",
            onDelete: function (e, $btn, $row,deletedIdx,effectedJsonArray) {
                console.log(deletedIdx);
                console.log(effectedJsonArray);
                var $this = this;
                $.ajax({
                    url:basePath+"/course/thirdStep/courseData/delete",
                    type:"post",
                    data: {"discussionReferId": $row.data('discussionReferId'),"sortList":JSON.stringify(effectedJsonArray)},
                    async:true,
                    success: function (json) {
                            $row.remove();
                            $this.drawIndex();
                            //console.log($row);
                            //$row.remove();
                        
                    }
                });

            },containerClass: ".discussionReferItems",
            sortPostGenerator: function ($effectedRowOneObj,sortAfterDeleted) {
                return {id:$effectedRowOneObj.data('discussionReferId'),sort:sortAfterDeleted};
            }
        },
        index: {
            //containerClass 和 draggable必须是直接父子的关系
            containerClass: ".discussionReferItems",
            item: ".discussionRefer",
            draw: function ($row, idx) {
                $row.find(".discussionReferIdx").text(idx + ".");
            }
        }
    });
}
//上传附件允许的格式
var limit_data_suffix = 'doc|docx|jpg|txt|xlsx|xls|word|png|gif|jpeg';
//
function getDiscussionReferUploadParam() {
    //var text=$("#add-btn-refer").val();
    return {
        appName : "createcourse",// 对应应用名称
        modelName : "course",// 可不写，按文件类型命名，视频为video、图片为image、其他文件为file
        userId : "42", // 填写用户ID
        userName : "test",
        fileType : "file", // 上传文件类型三类： image; video; file;
        smallImgSize : "100:100", //图片或者视频的三种裁图大小
        bigImgSize : "223:125",
        middleImgSize : "260:250",
        autoConvert : "true", // true为自动转换，false或者不配置为不自动转换(上传里需要自带文档转换,Flex上传不需要自带转换.)
        vIsUploadLetv : "true", // 是否将视频上传到乐视
        //targetId : "", // 为按钮目标标签ID
        showProgress : "true", // 是否显示任务栏进度条
        buttonWidth : "223",
        buttonHeight : "125",// IE789下设置此按钮高度生效
        buttonText : "",
        fileSizeLimit : "1073741824",//上传视频大小限制，单位B(1kb=1024b)
        z_language : z_locale,//上传进度国际化 1.中文 2.英文
        buttonClass : "",
        allowSuffix : limit_data_suffix,// 限制文件上传类型
        //buttonTextStyle:"{color:#b5b5b5;}",
        videoConvert : "true",
        host : "http://base1.zhihuishu.com/able-commons/"
    };
}
function numberToFixed(param){
	var num = Number(param);
	var val;
 if( num < mathPow(2)){
		  val=(num / 1024).toFixed(2)+"kB";
		  return val;
	  }else if(num > mathPow(2) && num <mathPow(3)){
		  val=(num /mathPow(2)).toFixed(2)+"MB";
		  return val;
	  }else if( num > mathPow(3) && num <mathPow(4)){
		  val=(num /mathPow(3)).toFixed(2)+"GM";
		  return val;
	  }
}
function mathPow(par){
   return Math.pow(1024,par);
}