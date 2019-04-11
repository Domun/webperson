$(function () {
    $("#project").css("height", $(window).height() - $(".header").css("height").split("px")[0]);
    var prodata;
    var startnum = 0;
    var everynum = 0;
    // 项目案例 列表 数据调用
    $.ajax({
        type: 'GET',
        url: './assets/data/project/link.json',
        dataType: "json",
        beforeSend: function (req) {
        },
        success: function (data, textStatus) {
            console.log("请求成功")
            if (data.ret === textStatus) {
                // console.log(data);
                prodata = data.data;
                everynum = data.everynum;
                showProlist(startnum, data.everynum);
            }
        },
        error: function (error) {
            console.log("error");//请求出错处理
        }
    });

    
    // 项目案例 列表 添加
    function showProlist(startnum, lastnum) {
        // console.log(everynum);
        $(".prolist_block").html("");
        $(".pagelist_block").html("");
        var everydata = prodata.slice(startnum, lastnum);
        // console.log(everydata);
        var proItem = '<ul class="pro-items">';
        for (var i = 0; i < everydata.length; i++) {
            proItem += '<li class="pro-item"> <img class="pro-items-img" src="' + everydata[i].img + '"> <div class="pro-items-main"> <h3> ' +(i+1)+'.&nbsp;'+ everydata[i].name + ' </h3> <p> ' + everydata[i].describe + ' </p> </div></li>';
        };
        // proItem += '<li class="pro-item"> <img class="pro-items-img" src="assets/img/project/update.jpg"> <div class="pro-items-main"> <h3> 持续更新中。。。</h3> <p> 吾随疾风前行，而后一许流星。。</p> </div></li> </ul>';
        $(".prolist_block").append(proItem);

        // 点击li跳转 csdn 页面
        $(".pro-item").each(function (index) {
            $(this).click(function () {
                //alert(index)
                window.location.href = prodata[index].link;
            })
        });

        // 点击分页 分数据
        var pagenum = Math.ceil(prodata.length / everynum); // 向上取整 , 计算有几页
        // console.log(pagenum);
        var pageItem = '<ul class="page-items">';
        for (var i = 0; i < pagenum; i++) {
            pageItem += '<li class="page-item">' + (i + 1) + '</li>';
        };
        pageItem += '<li class="page_num">共' + (pagenum) + '页&nbsp;(thanks for CSDN)</li></ul>';
        $(".pagelist_block").append(pageItem);

        // 点击pagenum 显示分页数据
        $(".page-item").each(function (index) {
            $(this).click(function () {
                // showProlist(data, everynum)
                showProlist(index * everynum, index * everynum + everynum);
            })
        });
    }

});