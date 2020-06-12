var initMenuMobile  = function(){
        var m_nav = $('.mobile-nav');
        var m_nav_btn = m_nav.find('.menu-btn');
        var nav = m_nav.children('ul');
        m_nav.find("ul li").each(function() {
            if($(this).find("ul>li").length > 0){
                $(this).append('<span class="open-menu icon-add_circle_outlinecontrol_point"></span>');
            }
        });
        // fix non-scrolling overflow issue on mobile devices
        m_nav.find('>ul').wrap('<div class="overflow"></div>');
        win.on('load resize', function () {
            var vph = $(window).height() - 57;
            $('.overflow').css('max-height', vph);
        });
        var menu = $('.overflow > ul');      
        // toggle background scrolling
        function bgScrolling() {
            if (menu.hasClass('open')) {
                html.css({
                    'overflow-y': 'hidden',
                    'height': 'auto'
                });
            } else {
                html.css({
                    'overflow-y': 'visible',
                    'height': '100%'
                });
            }
        }
        // menu button click events
        m_nav_btn.on('click', function (e) {
            e.preventDefault();
            e.stopPropagation(); 
            // activate toggles
            m_nav.css("background", "#01a551");
            menu.slideToggle(250);
            menu.toggleClass('open');
            $(this).children().toggleClass('icon-menu icon-x');
            // bgScrolling();
        });
        // list item click events
        $('.open-menu').on('click', function (e) {
            e.preventDefault();
            e.stopPropagation(); 
            $(this).prev('ul').slideToggle(250);
            $(this).toggleClass('rotate');
        });
        // out click
        win.click(function(e) {
            if(win.width() < 992 && m_nav.has(e.target).length == 0 && !m_nav.is(e.target)){
                menu.slideUp(200);
                m_nav_btn.children().removeClass('icon-x').addClass('icon-menu');
            }
        });
    };