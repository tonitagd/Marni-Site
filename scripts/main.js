jQuery(document).ready(function($) {
    //if you change this breakpoint in the style.css file (or _layout.scss if you use SASS), don't forget to update this value as well
    var $L = 1200,
        $menu_navigation = $('#main-nav'),
        $hamburger_icon = $('#cd-hamburger-menu'),
        $shadow_layer = $('#cd-shadow-layer');

    //open lateral menu on mobile
    $hamburger_icon.on('click', function(event) {
        event.preventDefault();
        toggle_panel_visibility($menu_navigation, $shadow_layer, $('body'));
    });


    //move #main-navigation inside header on laptop
    //insert #main-navigation after header on mobile
    move_navigation($menu_navigation, $L);
    $(window).on('resize', function() {
        move_navigation($menu_navigation, $L);

        if ($(window).width() >= $L && $menu_navigation.hasClass('speed-in')) {
            $menu_navigation.removeClass('speed-in');
            $shadow_layer.removeClass('is-visible');
            $('body').removeClass('overflow-hidden');
        }
    });

    $("main").niceScroll({
        cursorcolor:"#ccc",
        cursorwidth:"10px",
        cursorborder:"none",
        cursorborderradius:0
    });
});

function toggle_panel_visibility($lateral_panel, $background_layer, $body) {
    if ($lateral_panel.hasClass('speed-in')) {
        // firefox transitions break when parent overflow is changed, so we need to wait for the end of the trasition to give the body an overflow hidden
        $lateral_panel.removeClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
            $body.removeClass('overflow-hidden');
        });
        $background_layer.removeClass('is-visible');

    } else {
        $lateral_panel.addClass('speed-in').one('webkitTransitionEnd otransitionend oTransitionEnd msTransitionEnd transitionend', function() {
            $body.addClass('overflow-hidden');
        });
        $background_layer.addClass('is-visible');
    }
}

function move_navigation($navigation, $MQ) {
    var $body = $('body');
    if ($(window).width() >= $MQ) {
        $navigation.detach();
        $navigation.appendTo('body>header');
        $body.removeClass('mobile');
    } else {
        $navigation.detach();
        $navigation.insertAfter('body>header');
        $body.addClass('mobile');
    }
}

function loadLanguage(language) {
    var languages = ['/bg/', '/en/'];
    var sitePath = location.pathname;

    for (var i = 0; i < languages.length; i++) {
        sitePath = sitePath.replace(languages[i], "/" + language + "/");
    }

    if (location.pathname !== sitePath) {
        location.pathname = sitePath;
    }
}