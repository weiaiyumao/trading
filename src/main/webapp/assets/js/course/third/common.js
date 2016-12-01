var ueJqueryDataAttr = "_description_ue_";
var _debug=false;
var baiduEditor;
function isRequestSuccess(json) {
    return json.errorCode==0&&json.success;
}

function numberOnly(obj,n,zeroStart){
    obj.value=subStringToNumber(obj.value,n,zeroStart);
}

function subStringToNumber(val,n,zeroStart){
    var ret = val;
    ret=ret.replace(/[^\d]/g,'');
    if(!zeroStart&&ret.length==n){
        ret=ret.replace(/^0*/g,'');
    }
    return ret;
}

function numberOnlyForPaste(n,zeroStart){
    // console.log(arguments);
    // console.log('aaa');
    // clipboardData.setData('text', subStringToNumber(clipboardData.getData('text'),n,zeroStart));
}
function cloneJSON(e) {
    return $.extend({}, e);
}

function isEmpty(str) {
    return str==null || str==undefined || str=='';
}
function isNullObj(obj) {
    return obj == null || obj==undefined;
}
function nullToEmptyArray(arr) {
    if(isNullObj(arr)) {
        return [];
    }
    if(arr instanceof Array){
        return arr;
    }
    if(typeof arr == "object"){
        return [arr];
    }
    return [];

}
function nullToEmptyObject(arr) {
    if(isNullObj(arr)) {
        return {};
    }
    return arr;
}
function inputAllNotEmpty($arr) {
    var ret = true;
    $arr.each(function (idx,ele) {
        if(isEmpty($(ele).val())) {
            ret =  false;
        }
    });
    return ret;
}
function repaintNavTree() {
    // console.log('called');
    $(".slide").treenityNavTree("refreshCatalog");
    // console.log( $('#sideCatalog-catalog dl').height());
    // console.log( $('#sideCatalog-catalog ').height());
}

var customCheckRowIntegrity = function ($row) {
    $row.data("container").checkRowIntegrity($row);

    repaintNavTree();
}

var postChangeCommonFunc = function (dataParam,module) {
    $.ajax({
        url:basePath+"/course/thirdStep/"+module+"/update",
        data: dataParam,
        type:"post",
        async:true,
        success: function (json) {

        }
    });
}

var initialQueryResult={
    chapter:false,
    section:false,
    quiz:false,
    discussion:false,
    finalExam:false
}

function getErrorDisplayHtml(module) {
    return "<div>该部分加载失败</div>";
}
function getUEPlainText(str) {
    return str.replace(/(<\/?((p)|(br))\/?>)|(&nbsp;)/ig, "");
}


function initBaiduEditor() {
    baiduEditor = new UE.Editor({
        initialFrameWidth :"100%",//设置编辑器宽度
        initialFrameHeight:50,//设置编辑器高度
        autoHeightEnabled: true
    });


    baiduEditor.render($("#baiduEditor")[0]);
}

function thirdStepSuccessCallback(json) {
    initBaiduEditor();

    $(".stepconter-div.stepconter-third").css("visibility","visible");
    $(".stepconter-div.stepconter-third").show();

    //置顶
    $('.srollbar-up-btn').bind('click', function(){
        $('body,html').animate({scrollTop: 0}, 'fast');
    })

    $(".slide").treenityNavTree({});

    var result = json.result;

    initialQueryResult.chapter = result.chapterSuccess;
    initialQueryResult.finalExam = result.finalExamSuccess;
    initialQueryResult.section = result.sectionSuccess;
    initialQueryResult.quiz = result.examSuccess;
    initialQueryResult.discussion = result.discussionSuccess;

    // showRequestFailedDialog();

    //绘制部分or整体
    var chapterList = nullToEmptyArray(result.chapterList);
    var finalExamList =  nullToEmptyArray(result.finalExam);
    // console.log(result.chapterList);
    // console.log(result.finalExam);
    var crudChapter = _crud_chapterContainer(chapterList);
    var crudFinalExam = _crud_finalExamContainer(finalExamList);
    if (crudChapter){
        crudChapter.checkIntegrity();
    }
    if (crudFinalExam){
        crudFinalExam.checkIntegrity();
    }

    repaintNavTree();

    //初始跳转
    if(!isEmpty($("#initialHash").val())){
        setTimeout(function () {
            window.location.hash="";
            window.location.hash="#"+$("#initialHash").val();
        },300);
    }


}


$(function(){

    $(".errorCat").errorCat({
        ajax:{
            url:basePath+"/course/thirdStep/chapter/listAll",
            data: {"courseId" : $("#courseId").val()},
            async:true
        },
        hasError:function thirdStepCheckError(json) {
            if(_debug){
                // console.log('_debug');
                return false;
            }
            // return false;
            return json.errorCode != 0;
            // return true;
        },
        whenError:function (json) {
            // console.log(arguments);
            // $(".stepconter-div.stepconter-third").css("visibility","visible");
            $(".stepconter-div.stepconter-third").hide();
        },
        whenSuccess:thirdStepSuccessCallback
    });

});