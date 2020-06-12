var GUI = (function(){
    var win = $(window);
    var html = $('html,body');
    
    var initScrollTop   = function(){
        var scroll_top = $('.back-to-top');
        if(scroll_top.length > 0){
            win.scroll(function () {
                var e = win.scrollTop();
                if (e > 300) {
                    scroll_top.show();
                } else {
                    scroll_top.hide();
                }
            });
            scroll_top.click(function () {
                html.animate({
                    scrollTop: 0
                },500)
            });
        }  
    };
    var initSticky      = function(){
        win.scroll(function(){
            var sticky = $('.sticky'),
                scroll = win.scrollTop();
            if (scroll >= 50) sticky.addClass('fixed');
            else sticky.removeClass('fixed');
        });
    };
    var initScroll      = function(){
        var position = win.scrollTop();
        var m_nav = $('.mobile-nav, .main-nav');
        var btn = $('#btn-menu');
        var top = $('#top');
        win.scroll(function(event){
            var _pos = win.scrollTop();
            if(position > _pos){
                top.addClass('fixed_top');
                // m_nav.addClass('fixed_top');
                btn.addClass('fixed-btn');
                position = _pos;
                if(position < 100){
                    top.removeClass('fixed_top');
                    // m_nav.removeClass('fixed_top');
                }
            }else{
                // m_nav.removeClass('fixed_top');
                btn.removeClass('fixed-btn').addClass('visibility-hidden');
                position = _pos;
                top.removeClass('fixed_top');
            }
        });
    };
    var initDatetime    = function(){
        $('.datetimepicker').datetimepicker({
            timepicker: false,
            format: 'd/m/Y',
            // minDate: new Date()
        });
    };
    function youtubeParser(url){
        // Hàm get link Youtube
        var regExp = /^.*((youtu.be\/)|(v\/)|(\/u\/\w\/)|(embed\/)|(watch\?))\??v?=?([^#\&\?]*).*/;
        var match = url.match(regExp);
        return (match&&match[7].length==11)? match[7] : false;
    }
    var playYoutube     = function(){
        // Play Youtube
        if($('.video_add').length == 0) return;
        $(".video_add").click(function(event) {
            event.preventDefault();
            var html = '<iframe width="100%" height="100%" src="https://www.youtube.com/embed/'+youtubeParser($(this).attr('data-link'))+'?autoplay=1" frameborder="0" allow="accelerometer; autoplay; encrypted-media; gyroscope; picture-in-picture" allowfullscreen></iframe>';
            $(this).html(html);
        });
    }
    var playVideo = function(){
        //Hàm nhấn nút play trong video
        var play = $('.play-btn');
        var video = $('#video_banner');
        var videoReload = $('.text_slide');
        play.click(function(event) {
            event.preventDefault();
            video[0].play();
            $(this).hide();
        });
        videoReload.click(function(event) {
            event.stopPropagation();
            if(video[0].play())
            {
                video[0].pause();
                $('.play-btn').show();
            }
        });
    }
    var initShowForm    = function(){
        var f_search = $('.form-search');
        $('.icon-search').click(function(e){
            e.stopPropagation();
            f_search.find('form').slideToggle(150);
        });
        win.click(function(e) {
            if(win.width() < 992 && f_search.has(e.target).length == 0 && !f_search.is(e.target)){
                f_search.find('form').slideUp(200);
            }
        });
    };
    var initSelect2     = function(){
        $(".select2.v1").select2({
            placeholder: "Giá"
        });
        $(".select2.v2").select2({
            placeholder: "Hướng"
        });
        $(".select2.v3").select2({
            placeholder: "Thành phố"
        });
        $(".select2.v4").select2({
            placeholder: "Quận, Huyện"
        });
        $(".select2.v5").select2({
            placeholder: "Vui lòng chọn"
        });
        $(".select2.v6").select2({
            placeholder: "Từ khóa tìm kiếm, mã tin, số điện thoại"
        });
        $(".select2.v7").select2({
            placeholder: "Đường phố"
        });
        $(".select2.v8").select2({
            placeholder: "Diện tích"
        });
    };
    var menu_mobile = function(){
        var m_nav = $('.main-nav');
        var m_nav_btn = $('#btn-menu');
        var menu = m_nav.children('ul');
        // var tool_bar = $('#action-toolbar');

        if(win.width()<992){
            m_nav_btn.on('click', function (event) {
                event.stopPropagation();
                m_nav_btn.toggleClass('icon-menu icon-x');
                m_nav.toggleClass('active');
                // tool_bar.toggleClass('d-none');
            });
            m_nav.find("ul li").each(function() {
                if($(this).find("ul>li").length > 0){
                    $(this).append('<span class="open-menu icon-add_circle_outlinecontrol_point"></span>');
                }
            });
            $('.open-menu').on('click', function (e) {
                e.stopPropagation(); 
                $(this).prev('ul').slideToggle(250);
                $(this).toggleClass('rotate');
            }); 
        };
        // out click
        win.click(function(e) {
            if(win.width() < 992 && m_nav.has(e.target).length == 0 && !m_nav.is(e.target)){
                m_nav.removeClass('active');
                m_nav_btn.removeClass('icon-x').addClass('icon-menu');
                // tool_bar.removeClass('d-none');
            }
        });
        win.resize(function() {
            if($(this).width()>991){
                m_nav.show();
                menu.show();
                m_nav.find("ul li span").html="";
            }
            else{
                m_nav.removeClass('active');
                m_nav_btn.removeClass('icon-x').addClass('icon-menu');
                // menu.find('ul').hide();
                m_nav.find('li span').removeClass("open-menu icon-add_circle_outlinecontrol_point");
            }
        });
    };
    
    var loadSocial = function(){
        //Load plugins FB,GG
        $(window).bind("load", function () {
            setTimeout(function () {
                $('body').append('<div id="fb-root"></div>');
                $.ajax({
                    global: false,
                    url: "theme/frontend/js/social.js",
                    dataType: "script"
                });
                $.ajax({
                    global: false,
                    url: "https://apis.google.com/js/platform.js",
                    dataType: "script"
                });
                window.___gcfg = {
                    lang: 'vi',
                    parsetags: 'onload'
                };
            }, 3000);
        });
    }
    var loadMap = function()
    {
        //Load map theo src có sẵn
        var src = '<iframe src="https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d14890.305578494519!2d105.5552672859826!3d21.089574545939833!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x3134584e3fdbae5d%3A0x8c283f6d8379d069!2zxJDhuqFpIMSQ4buTbmcsIFRo4bqhY2ggVGjhuqV0LCBIw6AgTuG7mWksIFZp4buHdCBOYW0!5e0!3m2!1svi!2s!4v1577216319152!5m2!1svi!2s" width="100%"></iframe>';
        var maps = $('.maps');
        var action = setTimeout(function(){
            maps.prepend(src);
        }, 3000);
    }
    return {_:function(){
        // initScrollTop();
        // initSticky();
        // initScroll();
        // initDatetime();
        // initShowForm();
        // initSelect2();
        playYoutube();
        menu_mobile();
        // loadMap();
        // loadSocial();
        // playVideo();
    }
    };
})();
$(function() {
    GUI._();
});
wow = new WOW(
    {
        boxClass:     'wow',      
        animateClass: 'animated'
    });
wow.init();






//      var SLIDER=function(){var n=function(n){return n.replace(/([-_][a-z])/g,function(n){return n.toUpperCase().replace("-","").replace("_","")})},r=function(r,t){var a={};for(var e in r){a[n(e)]=r[e]}for(var e in t){a[n(e)]=t[e]}return a},t=$(".tiny-slider");if(0!=t.length)for(var a=0;a<t.length;a++){var e=$(t[a]),o=e.attr("id"),i=e.data(),u=r({container:e[0],items:1,slideBy:"page",mouseDrag:!0,autoplay:!1,controls:!1,autoplayButtonOutput:!1,nav:!1},i||{});null!=o?window[o]=tns(u):tns(u)}}();
    // $(function() {
    //     window['slide-main'].events.on('indexChanged',function(slide,name){
    //         var container = slide.container;
    //         var autoplay = container.getAttribute('data-autoplay') == 'true';

    //         lastIndexSlideMain = slide.displayIndex;
    //         var slideItems = slide.slideItems;
    //         var active = slideItems[slide.index];
    //         var videoExist = active.querySelector('video');
    //         if(videoExist!=null){
    //             if(autoplay){
    //                 window['slide-main'].pause();
    //             }
    //             videoExist.play();
    //             videoExist.onended =function() {
    //                 window['slide-main'].goTo('next');
                    
    //             };
    //         }
    //         else{
    //             if(autoplay){
    //                 window['slide-main'].play();
    //             }
    //         }
    //     });
    // });






    /*$(document).ready(function(){
        $('*').bind('cut copy paste contextmenu', function (e) {
            e.preventDefault();
        })    
    });*/


