$(function () {

    $("#cv").css("height", $(window).height() - $(".header").css("height").split("px")[0]);
    // 轮播
    slideAni();
    //下载
    $("#download").click(function () {
        downloadCv();
    });
    // 自我评价 数据调用
    $.ajax({
        type: 'GET',
        url: './assets/data/cv/self.json',
        dataType: "json",
        beforeSend: function (req) {

        },
        success: function (data, textStatus) {
            console.log("请求成功")
            if (data.ret === textStatus) {
                showSelf(data.txt);
            }
        },
        error: function (error) {
            console.log("error");//请求出错处理

        }
    });

    // 爱好 数据调用
    $.ajax({
        type: 'GET',
        url: './assets/data/cv/hobby.json',
        dataType: "json",
        beforeSend: function (req) {
        },
        success: function (data, textStatus) {
            console.log("请求成功")
            if (data.ret === textStatus) {
                // console.log(data);
                showHobby(data.data);
            }
        },
        error: function (error) {
            console.log("error");//请求出错处理

        }
    });

    // 专业技能 数据调用
    $.ajax({
        type: 'GET',
        url: './assets/data/cv/skill.json',
        dataType: "json",
        beforeSend: function (req) {
        },
        success: function (data, textStatus) {
            console.log("请求成功")
            if (data.ret === textStatus) {
                // console.log(data);
                showSkill(data.data);
            }
        },
        error: function (error) {
            console.log("error");//请求出错处理

        }
    });
})

// slide
function slideAni() {
    $(".slide-block").slide({
        titCell: ".num ul",
        mainCell: ".slider",
        effect: "leftLoop",
        autoPlay: false,
        delayTime: 700,
        autoPage: true,
        mouseOverStop: true,
        trigger: 'click',
        pnLoop: true,
        // defaultIndex: 3, // 默认 起始位置
        startFun: function (i, c) {
            // console.log(i);
            if (i == 0) {
                $(".outman").removeClass("outani");
            } else if (i == 1) {
                $(".outman").addClass("outani");
                $(".skill-items").removeClass("items-ani");
                $(".skill-charts").removeClass("charts-ani");
            } else if (i == 2) {
                // 专业技能 图表 数据调用
                $.ajax({
                    type: 'GET',
                    url: './assets/data/cv/charts.json',
                    dataType: "json",
                    beforeSend: function (req) {
                    },
                    success: function (data, textStatus) {
                        console.log("请求成功")
                        if (data.ret === textStatus) {
                            // 加载 图表
                            setTimeout(function () {
                                showcharts(data.data);
                                $(".skill-items").addClass("items-ani");
                                $(".skill-charts").addClass("charts-ani");
                            }, 400)
                        }
                    },
                    error: function (error) {
                        console.log("error");//请求出错处理
                    }
                });

            } else if (i == 3) {
                // 项目经验 数据调用
                $.ajax({
                    type: 'GET',
                    url: './assets/data/cv/experience.json',
                    dataType: "json",
                    beforeSend: function (req) {
                    },
                    success: function (data, textStatus) {
                        console.log("请求成功")
                        if (data.ret === textStatus) {
                            setTimeout(function () {
                                // console.log(data.data);
                                showExperience(data.data);
                            }, 400)
                        }
                    },
                    error: function (error) {
                        console.log("error");//请求出错处理
                    }
                });

            }
        }
    });
    $(".slide").css("height", $(window).height() - $(".header").css("height").split("px")[0])
}
// 下载简历事件
function downloadCv() {
    var $eleForm = $("<form method='get'></form>");

    $eleForm.attr("action", "http://index.dodomun.cn/domun-cv.zip");

    $(document.body).append($eleForm);

    //提交表单，实现下载
    $eleForm.submit();
}
//
function showSelf(data) {
    $(".selfMain").html(data)
}
//
function showHobby(data) {
    var hobbyList = '';
    for (var i = 0; i < data.length; i++) {
        hobbyList += '<div class="hobbylist"> <i class="iconfont">' + data[i].icon + '</i> <p>' + data[i].txt + '</p> </div>';
    }
    $(".hobbyMain").append(hobbyList);
}
//
function showSkill(data) {
    // console.log(data);
    var showul = '<ul class="skill-ul">'
    for (var i = 0; i < data.skill.length; i++) {
        showul += '<li class="hobbylist"> <p>' + data.skill[i] + '</p> </li>';
    }
    var skillIcons = '<li class="hobbylist skill-icons">'
    for (var i = 0; i < data.icons.length; i++) {
        skillIcons += '<i class="iconfont">' + data.icons[i] + '</i>';
    }
    skillIcons += "</li>";
    showul += skillIcons+"</ul>";
    $(".skill-items").append(showul);
}
function showcharts(data) {
    //console.log(data)

    var charts_yAxis = [];
    var charts_num = [];
    for (var i = 0; i < data.length; i++) {
        charts_yAxis.push(data[i].yAxis);
        charts_num.push(data[i].num)
    }
    // var charts_num = data.num;
    // console.log(charts_yAxis)
    var myColor = ['#25ABD5'];
    var showskill = echarts.init(document.getElementById('skill_charts'));
    showskill.setOption({
        // backgroundColor: '#fff',
        grid: {
            left: '1%',
            right: '1%',
            bottom: '0%',
            top: '3%',
            containLabel: true
        },
        xAxis: {
            show: false
        },
        yAxis: [{
            show: true,
            data: charts_yAxis,
            inverse: true,
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },
            axisLabel: {
                color: '#f1f1f1',
                fontSize: 16,
                interval: 0,
                margin: 10
            },


        }, {
            show: false,
            inverse: true,
            data: [10, 10, 10, 10, 10, 10, 10, 10, 10],
            axisLabel: {
                textStyle: {
                    fontSize: 18,
                    color: '#fff',
                },
            },
            axisLine: {
                show: false
            },
            splitLine: {
                show: false
            },
            axisTick: {
                show: false
            },

        }],
        series: [{
            type: 'bar',
            yAxisIndex: 0,
            data: charts_num,
            barWidth: 20,
            itemStyle: {
                normal: {
                    barBorderRadius: 20,
                    color: function (params) {
                        var num = myColor.length;
                        return myColor[params.dataIndex % num]
                    },
                }
            },

        }, {
            type: 'bar',
            yAxisIndex: 1,

            data: [10, 10, 10, 10, 10, 10, 10, 10, 10],
            barWidth: 20,
            itemStyle: {
                normal: {
                    color: 'none',
                    borderColor: '#4bc0e5',
                    borderWidth: 3,
                    barBorderRadius: 10,
                }
            }
        },]

    })
}
//
function showExperience(data){
    // console.log(data);
    $(".experience").html("");
    var company = '<div class="exp-bd">';
    for(var i=0;i<data.length;i++){
        company += '<h3 class="exp-company"> <p> <i class="iconfont">&#xe6a7;</i>'+data[i].company+' </p> <p> <i class="iconfont">&#xe625;</i>'+data[i].address+' </p> <p> <i class="iconfont">&#xe7ce;</i>'+data[i].time+' </p></h3> <ul class="exp-items">';
        var exp = data[i].projects;
        for(var j=0;j<data[i].projects.length;j++){
            company += '<li class="exp-item"><h4 class="exp-name">'+data[i].projects[j].name+'</h4> <p class="exp-pro">'+data[i].projects[j].duty+'</p> <p class="exp-use">'+data[i].projects[j].use+'</p> </li>';
            // console.log(data[i].projects[j])
        }
        // for(var j=0;j<data[i].projects[j].length;j++){
            
        // }
        company +='</ul>';
    }
    company +=' </div>';
    
    $(".experience").append(company);
}
