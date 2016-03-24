/**
 * Created by eva on 16/2/19.
 */
//顶部广告
/*
$(function(){
setTimeout(function(){
    $('#top_bigAd').animate({'height':'0'},2000,function(){
        $('#top_ad').animate({'height':'100px'},1000)
    })
},3000)
});*/

//详细列表缓慢下拉效果（通用）
$(function(){
    $('.scrollx').hover(function(){
        $(this).find('.scrolly').stop().slideDown('fast');
        $(this).find('.phone').addClass('h');
    },function(){
        $(this).find('.scrolly').stop().slideUp('fast');
        $(this).find('.phone').removeClass('h');
    })
});


//大图轮播效果
$(function(){
    var timer;
    var index = 0;
    var arr = ['#7701A1','#99CCE1','rgb(169, 231, 255)','rgb(255, 210, 55)','rgb(255, 48, 123)','rgb(255, 60, 106)',
    'rgb(249, 88, 0)','rgb(94, 0, 174)','rgb(253, 180, 181)','rgb(254, 243, 125)','rgb(253, 53, 79)','rgb(13, 129, 120)',
        'rgb(249, 24, 68)','rgb(204, 232, 254)','rgb(248, 239, 208)','rgb(54, 169, 250)','rgb(0, 85, 193)','rgb(252, 215, 246)',
        'rgb(225, 33, 118)','rgb(254, 243, 254)','rgb(224, 2, 17)'];
    var bbg = $('.layout_pic');
    var lbtn = $('.layout_pic .ng_main_pic .banner-prev');
    var rbtn = $('.layout_pic .ng_main_pic .banner-next');//获得左右按钮
    var pics = $('.ng_main_pic .banner-pic ul li');//获得所有大图的集合
    var lis = $('.ng_main_pic .banner-ctrl li');//获得.banner-ctrl下所有li标签的集合
    var lii = $('.ng_main_pic .banner-ctrl li .ctrl-dot i');//获得.ctrl-dot下所有i标签的集合

//定义一个每秒运行的函数轮播图片
    function change(){
        pics.css('display','none');
        pics.eq(index).css('display','block');

        //让小按钮变成黄色
        lii.removeClass('yellow');
        lii.eq(index).addClass('yellow');

        //选中这个li标签
        lii.parent().removeClass('current');
        lii.eq(index).parent().addClass('current');

        //让li标签宽度变高同时改变成选中的颜色
        lii.parents('li').find('.bg').removeClass('current');
        lii.eq(index).parents('li').find('.bg').addClass('current');

        //让最外面背景改变
        bbg.css('background',arr[index]);
        index+=1;
        if(index>=pics.length){index=0};
    }
    timer = setInterval(change,2000);

    //点击左右按钮进行大图切换
    lbtn.click(function(){
        clearInterval(timer);//点击之后清空定时器
        if(index == 0){
            index = pics.length;
        }
        index--;

        bbg.css('background',arr[index]);
        pics.css('display','none');
        pics.eq(index).css('display','block');

        //让小按钮变成黄色
        lii.removeClass('yellow');
        lii.eq(index).addClass('yellow');

        //选中这个li标签
        lii.parent().removeClass('current');
        lii.eq(index).parent().addClass('current');

        //让li标签宽度变高同时改变成选中的颜色
        lii.parents('li').find('.bg').removeClass('current');
        lii.eq(index).parents('li').find('.bg').addClass('current');
    });

    rbtn.click(function(){
        clearInterval(timer);
        if(index == pics.length){
            index = 0;
        }
        index++;

        bbg.css('background',arr[index]);
        pics.css('display','none');
        pics.eq(index).css('display','block');

        //让小按钮变成黄色
        lii.removeClass('yellow');
        lii.eq(index).addClass('yellow');

        //选中这个li标签
        lii.parent().removeClass('current');
        lii.eq(index).parent().addClass('current');

        //让li标签宽度变高同时改变成选中的颜色
        lii.parents('li').find('.bg').removeClass('current');
        lii.eq(index).parents('li').find('.bg').addClass('current');
    });

//鼠标移动到大图时候暂停定时器，离开时启动
    $('.banner-pic').mouseenter(function(){
        clearInterval(timer);
    });
    $('.banner-pic').mouseleave(function(){
        timer = setInterval(change,2000);
    });

    //鼠标放在li标签时  让li被选中current状态
    lis.mouseenter(function(){
        clearInterval(timer);

        //清除自动轮播时候的li及其子元素上的样式
        lii.parent().removeClass('current');
        lii.parents('li').find('.bg').removeClass('current');

        //给选中的li加上相应的鼠标移入事件
        $(this).addClass('mouse-hover').siblings().removeClass('mouse-hover');
        $(this).find('.title-item p:first-child i').addClass('yellow');

        //找到class为yellow的i 确认他现在的下标值 赋值给index并更改图片
        index = $(this).index();
        bbg.css('background',arr[index]);
        pics.css('display','none');
        pics.eq(index).css('display','block');
    });

    //鼠标离开li标签
    lis.mouseleave(function(){
        clearInterval(timer);
        $(this).find('.title-item p:last-child i').removeClass('yellow');
        timer = setInterval(change,2000);
        $(this).removeClass('mouse-hover');
        $(this).find('.bg').addClass('current');
        $(this).find('.ctrl-dot').addClass('current');
        $(this).find('.ctrl-dot i:first-child').addClass('yellow');
        lii.eq(index).addClass('yellow');
    });

    //鼠标移动到p标签上
    $('.title-item p').mouseenter(function(){
        index = $('.title-item p').index(this);
        bbg.css('background',arr[index]);
        pics.css('display','none');
        pics.eq(index).css('display','block');
        $(this).find('i').removeClass('yellow');
        $(this).siblings().find('i').removeClass('yellow');
        $(this).children('i').addClass('yellow');
    });

    //鼠标离开p标签
    $('.title-item p').mouseleave(function(){
        lii.eq(index).addClass('yellow');
        lii.eq(index).siblings().removeClass('yellow');
    })
});


//主要楼层区域的tab切换
$(function(){
    var li_tab = $('.floor-head .tab li');
    li_tab.mouseenter(function(){
        $(this).addClass('on');
        $(this).siblings().removeClass('on');

        var num = $(this).index();
        $(this).parents('.floor').find('.J-domLazy').eq(num).css('display','block');
        $(this).parents('.floor').find('.J-domLazy').eq(num).siblings('.J-domLazy').css('display','none');
    })
});