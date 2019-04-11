$(function () {
    $(".scroll-box").css("height",$(window).height());
    //星空背景
    starbg();
    //当浏览器大小变化时   
    $(window).resize(function () {
        $(".scroll-box").css("height",$(window).height());
    });
    
    // ajax调用mock数据
    $.ajax({
        type: 'GET',
        url: './src/assets/data/prolist.json',
        //async: true为异步请求。false为同步请求;(default:true)
        //data: '请求成功',//提交的数据
        dataType: "json",
        beforeSend: function (req) {
        // req.setRequestHeader('token','12222');  
        console.log("正在请求");
        requesting(); 
        },
        success: function (data,textStatus) {//textStatus为描述状态的字符串//succes
            // console.log(data); 
            // console.log(textStatus);
            console.log("请求成功")
            if(data.ret === textStatus){
                showprolist(data);
                proiconani();
            }   
        },
        error: function (error) {
            console.log("error");//请求出错处理
            notfound();
        }
    });
    // 鼠标悬浮图标动画
    
})
// 星空事件
function starbg() {
    var cols = ['#f5d76e','#f7ca18','#f4d03f','#ececec','#ecf0f1','#a2ded0'];
    var stars = 250;
    for (var i = 0; i <= stars; i++) {

    var size = Math.random()*3;
    var color = cols[parseInt(Math.random()*4)];

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

// 等待加载前，加载动画
function requesting(){
    var loadingAni = '<div class="loading-ani"><i class="iconfont loading-icon">&#xe601;</i><p class="loading-txt">正在制造&nbsp;.&nbsp;.&nbsp;.</p></div>';
    $(".prolist-block").append(loadingAni);
}
// 页面动态加载pro list事件
function showprolist(data){
    //console.log(data);
    $(".prolist-block").html(" ");
    var prolist = data.data;
    var pro_ul = '<ul class = "pro_ul">'
    for(var i = 0; i < prolist.length; i++){
        pro_ul += '<li class="pro-li"><img class="aniimg aniimg'+i+'" src="'+prolist[i].img+'"><div class="icon-img"><i class="iconfont proicon">'+prolist[i].icon+'</i></div><p class="list-title">'+prolist[i].title+'</p><p class="list-desc">'+prolist[i].describe+'</p></li>'
    }
    pro_ul += '</ul>';
    $(".prolist-block").append(pro_ul);
    $(".pro-li").each(function (index){
        $(this).click(function () {
            window.sessionStorage.setItem("pages",prolist[index].link);
            window.location.href = "src/main.html";
        })
    })
};
// 鼠标悬浮图标动画
function proiconani(){
    $(".proicon").each(function (index) {
        $(this).mouseenter(function (){
           // console.log(index)
           $(".list-title").eq(index).addClass("opacityani");
           $(".list-desc").eq(index).addClass("opacityani");
           $(".aniimg").eq(index).fadeOut(500)
           $(".pro-li").eq(index).addClass("pro-li-border");
        })
    });
    $(".pro-li").each(function (index) {
        $(this).mouseleave(function () {
            $(".list-title").eq(index).removeClass("opacityani");
            $(".list-desc").eq(index).removeClass("opacityani");
            $(".aniimg").eq(index).fadeIn(500);
            $(".pro-li").eq(index).removeClass("pro-li-border");
        })
    });
}
// 404出错事件；
function notfound(){
    setTimeout(function(){
        $(".loading-ani").remove();
        var is404 = '<div class="is404">  <h4> <i class="iconfont icon-404">&#xe604;</i>  </h4>  <img class="img-404" src="./src/assets/img/rocky.png" alt="img-404"> </div>';
        $("#container").html(is404);
    },1000);
}
