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

    $(document).mouseup(function(e) {
        var image = $(".cd-img-replace");
        if ($hamburger_icon.is(e.target) || image.is(e.target)) {
            return;
        }
        // if the target of the click isn't the container nor a descendant of the container
        if (!$menu_navigation.is(e.target) && $menu_navigation.has(e.target).length === 0) {
            toggle_panel_visibility($menu_navigation, $shadow_layer, $('body'), true);
        }
    });

    $(document).keyup(function(e) {
        if (e.keyCode == 27) {
            toggle_panel_visibility($menu_navigation, $shadow_layer, $('body'), true);
        }
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
        cursorcolor: "#ccc",
        cursorwidth: "10px",
        cursorborder: "none",
        cursorborderradius: 0
    });

    $('#imagesModal').on('show.bs.modal', function(event) {
        var button = $(event.relatedTarget) // Button that triggered the modal
        var recipient = button[0].dataset['imgsrc'] // Extract info from data-* attributes
        var modal = $(this)
        modal.find('.modal-body img')[0].src = recipient;
    });

});

function toggle_panel_visibility($lateral_panel, $background_layer, $body, shouldCollapse) {
    if (shouldCollapse || $lateral_panel.hasClass('speed-in')) {
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
jQuery(".sub-menu-parent").ready(function($) {
    $(".sub-menu-parent .sub-menu")[0].style.width = $(".sub-menu-parent").width() + "px";
    $(window).on('resize', function() {
        $(".sub-menu-parent .sub-menu")[0].style.width = $(".sub-menu-parent").width() + "px"
    });
});