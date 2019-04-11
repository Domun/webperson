$(function () {
    isStorage();
    starbg();
});
function isStorage() {
    // 获取index.html传过来的值
    var pages = window.sessionStorage.getItem("pages");
    // ajax加载的地址
    var mainUrl = "";
    var listnum = 0;
    // 判断路由
    // console.log(pages);
    switch (pages) {
        case "project": mainUrl = 'pages/project/project.html' , listnum = 0;
            break;
        case "cv": mainUrl = 'pages/cv/cv.html' , listnum = 1;
            break;
        case "notes": mainUrl = 'pages/notes/notes.html' , listnum = 2;
            break;
        case "plate": mainUrl = 'pages/plate/plate.html' , listnum = 3;
            break;
        default: mainUrl = 'pages/project/project.html' , listnum = 0;
    };
    ajaxload(mainUrl,listnum);
    // 点击切换事件
    $(".header-item").each(function(index){
        $(this).click(function(){
            switch (index) {
                case 0: mainUrl = 'pages/project/project.html' , listnum = 0 , pages = "project";
                    break;
                case 1: mainUrl = 'pages/cv/cv.html' , listnum = 1 , pages = "cv";
                    break;
                case 2: mainUrl = 'pages/notes/notes.html' , listnum = 2 , pages = "notes";
                    break;
                case 3: mainUrl = 'pages/plate/plate.html' , listnum = 3 , pages = "plate";
                    break;
            };
            window.sessionStorage.setItem("pages",pages);
            ajaxload(mainUrl,listnum);
        })
    })
};
// 调用ajax加载
function ajaxload(mainUrl,listnum) {
    // 判断listnum, ./header-item添加背景色
    $(".header-item").eq(listnum).addClass("item-ani");
    $(".header-item").eq(listnum).siblings().removeClass("item-ani");
    // 加载html文件
    $("#main").html("");
    $.ajax({
        type: 'GET',       //提交数据的类型 POST GET
        url: mainUrl,      //提交的网址
        dataType: "html",  //"xml", "html", "script", "json", "jsonp", "text".
        beforeSend: function () {
            requesting();
        },
        //成功返回之后调用的函数
        success: function (response) {
            // console.log(response)
            $("#main").html(" ");
            $("#main").html(response);
        },
        //调用出错执行的函数
        error: function (error) {
            console.log("error");//请求出错处理
            notfound();
        }
    });
};
// 加载前动画
function requesting(){
    var loadingAni = '<div class="loading-ani"><i class="iconfont loading-icon">&#xe601;</i><p class="loading-txt">正在制造&nbsp;.&nbsp;.&nbsp;.</p></div>';
    $("#main").append(loadingAni);
};
// 星空事件
function starbg() {
    var cols = ['#f5d76e','#f7ca18','#f4d03f','#ececec','#ecf0f1','#a2ded0'];
    var stars = 250;
    for (var i = 0; i <= stars; i++) {

    var size = Math.random()*3;
    var color = cols[parseInt(Math.random()*5)];

        $('#starsBox').prepend('<span style=" width: ' + size + 'px; height: ' + size + 'px; top: ' + Math.random()*100 + '%; left: ' + Math.random()*100 + '%; background: ' + color + '; box-shadow: 0 0 '+ Math.random()*10 +'px' + color + ';"></span>') ;
    };

    setTimeout(function(){ 
        $('#starsBox span').each(function(){  
            $(this).css('top', Math.random()*100 + '%').css('left', Math.random()*100 + '%'); 
    });
    }, 1);

    setInterval(function(){ 
        $('#starsBox span').each(function(){  	
            $(this).css('top', Math.random()*100 + '%').css('left', Math.random()*100 + '%'); 
    });
    }, 100000); 
};
// 404出错事件；
function notfound(){
    setTimeout(function(){
        $(".loading-ani").remove();
        var is404 = '<div class="is404">  <h4> <i class="iconfont icon-404">&#xe604;</i>  </h4>  <img class="img-404" src="./assets/img/rocky.png" alt="img-404"> </div>';
        $("#main").append(is404);
    },1500);
    
};
// 头部信息区域，显示控制

// 显示Project
function showProject() {

}
// 显示Cv
function showCv() {

}
// 显示Notes
function showNotes() {

}
// 显示Plate
function showPlate() {

}
