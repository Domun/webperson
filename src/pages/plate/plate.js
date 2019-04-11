$(function () {
    $.ajax({
        type: 'GET',
        url: './assets/data/plate/painting.json',
        dataType: "json",
        beforeSend: function (req) {
        },
        success: function (data, textStatus) {
            console.log("请求成功")
            if (data.ret === textStatus) {
                // console.log(data);
                showPlate(data.data)
            }
        },
        error: function (error) {
            console.log("error");//请求出错处理
        }
    });
})
function showPlate(data) {
    var plateItems = '<ul class="plate-items">';
    for (var i = 0; i < data.length; i++) {
        plateItems += '<li class="plate-item"> <img class="plate-img" src="' + data[i].img + '"> <div class="plate-block"><h3>' + data[i].name + '</h3><p>' + data[i].describe + '</p></div></li>';
    }
    plateItems += '</ul>';
    $(".plate_main").append(plateItems);
    // 点击plate-item 显示大图
    $(".plate-item").each(function (i) {
        $(".plate-item").eq(i).click(function () {
            $(".mask-img").attr("src",data[i].img)
            $(".img_mask").fadeIn(500);
        })
    });
    $(".mask_none").click(function () {
        $(".img_mask").fadeOut(500);
        // $(".img_mask");
    })
}
