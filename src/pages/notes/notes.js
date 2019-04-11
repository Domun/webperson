$(function () {
    $("#notes").css("height", $(window).height() - $(".header").css("height").split("px")[0]);
    //定义数据
    var notesData;
    var itemsData;
    $.ajax({
        type: 'GET',
        url: './assets/data/notes/notes.json',
        dataType: "json",
        beforeSend: function (req) {

        },
        success: function (data, textStatus) {
            console.log("请求成功")
            if (data.ret === textStatus) {
                // console.log(data)
                notesData = data.data;
                itemsData = notesData[0].article[0].content;
                showside();
                shownotes();
                addnotes(itemsData);
            }
        },
        error: function (error) {
            console.log("error");//请求出错处理
            $(".notes_main").html("出错鸟......")
        }
    });
    function showside() {
        // console.log(notesData)
        var sidenavs = '<div class="sidenavs">';
        for (var i = 0; i < notesData.length; i++) {

            sidenavs += '<div class="sidenav"><h2 class="sidenav-h2">' + notesData[i].caption + '</h2> <ul class="sidenavs-subs">';

            for (var j = 0; j < notesData[i].article.length; j++) {

                sidenavs += '<li class="sidenavs-sub"><p class="sidenavs-sub-p">' + notesData[i].article[j].title + '</p></li>';

            }
            sidenavs += '</ul> </div>';
        }
        sidenavs += '</div>';

        $(".aside").append(sidenavs);
    };
    function shownotes() {
        $(".sidenav").eq(0).addClass("onnav");
        $(".sidenavs-sub").eq(0).addClass("on");
        // 头部 标签区
        $(".content_header_title").html(notesData[0].caption);
        $(".content_header_tab").html(notesData[0].article[0].title);

        //点击 sidenavs-sub 切换 笔记内容;
        $(".sidenav").each(function (i) {
            $(this).find(".sidenavs-sub").each(function (j) {
                $(this).click(function () {
                    // console.log(i,j)
                    $(".content_header_title").html(notesData[i].caption);
                    $(".content_header_tab").html(notesData[i].article[j].title);
                    // 添加on 变红色
                    $(".sidenav").siblings().removeClass("onnav");
                    $(".sidenav").eq(i).addClass("onnav");
                    $(".sidenavs-sub").removeClass("on");
                    $(this).addClass("on");
                    itemsData = notesData[i].article[j].content;
                    addnotes(itemsData);
                })
            });

        })
    }
    function addnotes() {
        $(".content_main").html(" ");
        var contentBlock = '<div class="content-blocks">';
        for (var i = 0; i < itemsData.length; i++) {
            contentBlock += '<div class="content-block"> <h4>' + itemsData[i].order + '：</h4><ul class="content-block-items">';
            for (var j = 0; j < itemsData[i].txt.length; j++) {
                contentBlock += '<li class="content-block-item">' + itemsData[i].txt[j] + '</li>';
            }
            contentBlock += '</ul> </div>';
        };
        contentBlock += '</div>';

        $(".content_main").append(contentBlock);

    }
})